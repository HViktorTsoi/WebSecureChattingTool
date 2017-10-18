import Vue from 'vue'
import Vuex from 'vuex'

var aesjs = require('aes-js')
var Base64 = require('js-base64').Base64
Vue.use(Vuex)

// 加密函数
function WS_encrypt (plain, key) {
  plain = Base64.encode(plain)
  var textBytes = aesjs.utils.utf8.toBytes(plain)
  var aesCtr = new aesjs.ModeOfOperation.ctr(JSON.parse(Base64.decode(key)), new aesjs.Counter(5))
  var enCryptedPlain = aesjs.utils.hex.fromBytes(aesCtr.encrypt(textBytes))
  return enCryptedPlain
}
// 解密函数
function WS_decrypt (msg, key) {
  var encryptedBytes = aesjs.utils.hex.toBytes(msg)
  var aesCtr2 = new aesjs.ModeOfOperation.ctr(JSON.parse(Base64.decode(key)), new aesjs.Counter(5))
  var decryptedMsg = aesjs.utils.utf8.fromBytes(aesCtr2.decrypt(encryptedBytes))
  msg = Base64.decode(decryptedMsg)
  return msg
}

export default new Vuex.Store({
  state: {
    ws: null,
    chatHistoryList: {},
    userList: [],
    uid: 0,
    curChattingTarget: {},
    nickName: null,
    serverInfo: {},
    encryptKey: null
  },

  getters: {
    getCurChattingTargetHisToryList (state) {
      return state.chatHistoryList[state.curChattingTarget.uid]
    }
  },

  mutations: {
    injectWebSocket: (state, ws) => {
      state.ws = ws
    },
    setUID: (state, uid) => {
      state.uid = uid
    },
    setEncryptKey: (state, key) => {
      state.encryptKey = key
    },
    setLoginInfo: (state, loginInfo) => {
      state.nickName = loginInfo.nickName
      state.serverInfo = loginInfo.serverInfo
    },
    setUserList: (state, userListFromServer) => {
      var oldUserList = state.userList
      state.userList = []
      // 查找新加入的用户
      userListFromServer.forEach(function (element) {
        if (element.uid !== state.uid) {
          var oldMsgCount = 0
          for (var idx in oldUserList) {
            if (oldUserList[idx].uid === element.uid) {
              oldMsgCount = oldUserList[idx].msgCount
              break
            }
          }
          state.userList.push({
            ...element,
            msgCount: oldMsgCount
          })
        }
      })
    },
    updateUserList: (state, msg) => {
      for (var idx in state.userList) {
        if (state.userList[idx].uid === msg.uid && msg.uid !== state.curChattingTarget.uid) {
          state.userList[idx].msgCount += 1
          state.userList[idx].lastMsgTime = msg.time
        }
      }
    },
    clearUserListMsgCount: (state, user) => {
      for (var idx in state.userList) {
        if (state.userList[idx].uid === user.uid) {
          state.userList[idx].msgCount = 0
          delete state.userList[idx].lastMsgTime
        }
      }
    },
    setCurChattingTarget: (state, user) => {
      state.curChattingTarget = {
        uid: user.uid,
        nickName: user.nickName
      }
      if (!state.chatHistoryList[state.curChattingTarget.uid]) {
        state.chatHistoryList[state.curChattingTarget.uid] = []
      }
    },
    addToChatHistoryList: (state, chat) => {
      if (chat.isSelf) {
        state.chatHistoryList[state.curChattingTarget.uid].push(chat)
      } else {
        if (!state.chatHistoryList[chat.from]) {
          state.chatHistoryList[chat.from] = []
        }
        state.chatHistoryList[chat.from].push(chat)
      }
    },
    recoverState: (state, stateBak) => {
      state = stateBak
    }
  },

  actions: {
    // 初始化websocket
    initWebSocket: ({ dispatch, commit, state }) => {
      var ws = new WebSocket('ws://' + state.serverInfo.host + ':' + state.serverInfo.port)
      // 生成的唯一id
      dispatch('initUID')
      ws.onopen = function () {
        // 发送加入聊天请求
        ws.send(JSON.stringify({
          type: 'join',
          user: {
            uid: state.uid,
            nickName: state.nickName
          }
        }))
      }
      // 收到消息时的处理函数
      ws.onmessage = function (evt) {
        var msg = evt.data
        msg = JSON.parse(msg)
        // 如果收到的是用户列表
        if (msg.type === 'userList') {
          commit('setUserList', msg.userList)
        } else if (msg.type === 'msg') {
          // 如果收到的是消息
          // 先进行消息解密
          msg.msg = WS_decrypt(msg.msg, state.encryptKey)
          commit('addToChatHistoryList', {
            clientTime: msg.time,
            content: msg.msg,
            nickName: state.userList.find(function (user, index, arr) {
              return user.uid === msg.uid
            }).nickName,
            isSelf: false,
            to: msg.to,
            from: msg.uid
          })
          if (state.curChattingTarget.uid === msg.uid) {
            commit('setCurChattingTarget', state.curChattingTarget)
          } else {
            commit('updateUserList', msg)
          }
        } else if (msg.type === 'key') {
          // 如果收到的是密钥
          commit('setEncryptKey', msg.key)
        }
      }
      ws.onclose = function (evt) {
        alert('服务器已经关闭，请退出后重新登录！')
      }
      commit('injectWebSocket', ws)
    },
    // 初始化用户唯一id
    initUID: ({ commit }) => {
      if (localStorage.uid) {
        commit('setUID', localStorage.uid)
      } else {
        var d = new Date().getTime()
        var uuid = 'zxxxxxxxxaxxxxb4xxxdyxxxexxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        localStorage.uid = uuid
        commit('setUID', localStorage.uid)
      }
    },
    // 处理发送消息事件
    sendMsg: ({ commit, state }, msg) => {
      // 时间处理
      var clientTime = Math.round(new Date().getTime() / 1000)
      // AES加密
      var encryptedMsg = WS_encrypt(msg, state.encryptKey)
      console.log('加密后：', encryptedMsg, ' 密钥：', state.encryptKey)

      // 发送消息
      state.ws.send(JSON.stringify({
        type: 'msg',
        time: clientTime,
        uid: state.uid,
        to: state.curChattingTarget.uid,
        msg: encryptedMsg
      }))
      // 更新本地的对话历史列表
      commit('addToChatHistoryList', {
        clientTime: clientTime,
        isSelf: true,
        content: msg,
        nickName: state.nickName
      })
      commit('setCurChattingTarget', state.curChattingTarget)
    },
    switchChattingTarget: ({ commit, state }, user) => {
      commit('setCurChattingTarget', user)
      commit('clearUserListMsgCount', user)
    }
  }
})
