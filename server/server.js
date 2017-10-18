var WebSocketServer = require('ws').Server
var crypto = require('crypto')

var aesjs = require('aes-js')
var Base64 = require('js-base64').Base64

// 加密函数
function WS_encrypt (plain, key) {
    if (!key) {
        throw new Error("空密钥")
    }
    plain = Base64.encode(plain)
    var textBytes = aesjs.utils.utf8.toBytes(plain)
    var aesCtr = new aesjs.ModeOfOperation.ctr(JSON.parse(Base64.decode(key)), new aesjs.Counter(5))
    var enCryptedPlain = aesjs.utils.hex.fromBytes(aesCtr.encrypt(textBytes))
    return enCryptedPlain
}
// 解密函数
function WS_decrypt (msg, key) {
    if (!key) {
        throw new Error("空密钥")
    }
    var encryptedBytes = aesjs.utils.hex.toBytes(msg)
    var aesCtr_2 = new aesjs.ModeOfOperation.ctr(JSON.parse(Base64.decode(key)), new aesjs.Counter(5))
    var decryptedMsg = aesjs.utils.utf8.fromBytes(aesCtr_2.decrypt(encryptedBytes))
    msg = Base64.decode(decryptedMsg)
    return msg
}


var wss = new WebSocketServer({
    port: 9989
})

var userList = new Array()
var deadQueue = new Array()
var pulseTime = 5000
//广播  
wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each (client) {
        client.send(data);
    });
};
// 密钥生成函数
wss.genEncryptKey = function genEncryptKey (user) {
    var iterTimes = 5
    key = crypto.createHash('md5').update(user.uid + new Date().toLocaleString()).digest('base64')
    for (let i = 0; i < iterTimes; ++i) {
        key = crypto.createHash('md5').update(key).digest('base64')
    }
    key_256bit = new Array()
    key = key.split('')
    key.forEach(function (element) {
        key_256bit.push(element.charCodeAt() + Math.ceil(Math.random() * 100))
    });
    return Base64.encode(JSON.stringify(key_256bit))
}

wss.sendUserList = function sendUserList () {
    var userInfoList = []
    for (var key in userList) {
        var el = userList[key]
        userInfoList.push(el.user)
    }
    this.broadcast(JSON.stringify({
        type: 'userList',
        userList: userInfoList
    }))
    console.log(userInfoList)
}

wss.on('connection', function (ws, request) {
    ws.on('message', function (msg) {
        msg = JSON.parse(msg)
        // 加入聊天请求
        if (msg.type === 'join') {
            // 更新用户ID所对应的websocket实例
            if (!userList[msg.user.uid]) {
                userList[msg.user.uid] = {}
            }
            userList[msg.user.uid].websocket = this
            userList[msg.user.uid].user = msg.user
            this.uid = msg.user.uid
            // 如果有死亡信号说明是刷新之后的新请求则消除死亡信号 否则说明是正常的连接请求
            if (deadQueue[msg.user.uid]) {
                deadQueue[msg.user.uid] = false
            } else {
                userList[msg.user.uid].encryptKey = wss.genEncryptKey(msg.user)
                wss.sendUserList()
                console.log('为用户生成了加密的秘钥：', userList[msg.user.uid].encryptKey)
                this.send(JSON.stringify({
                    type: 'key',
                    key: userList[msg.user.uid].encryptKey
                }))
            }
        }
        // 退出聊天请求
        else if (msg.type === 'quit') {
            console.log(msg.uid, ' quiting')
            delete userList[msg.uid]
            wss.sendUserList()
        }
        // 消息
        else if (msg.type === 'msg') {
            try {

                // 先用本方的key对收到的消息解密
                msg.msg = WS_decrypt(msg.msg, userList[msg.uid].encryptKey)
                // 获取对方的websocket实例
                var websocket = userList[msg.to].websocket
                // 再用对方的key加密
                msg.msg = WS_encrypt(msg.msg, userList[msg.to].encryptKey)

                console.log('加密后：', msg.msg, ' 密钥：', websocket.encryptKey)

                websocket.send(JSON.stringify(msg))
                console.log('发送消息', msg)
            }
            catch (e) {
                // 如果有问题就返回给发送方 该用户已经离线
                console.log(e)
                var t = msg.uid
                msg.uid = msg.to
                msg.to = t
                msg.msg = WS_encrypt('【系统消息】用户已经离线', userList[msg.to].encryptKey)
                this.send(JSON.stringify(msg))
            }
        }
    })
    ws.on('close', function (close) {
        console.log('请求断开连接', close)
        // 在死亡信号队列中加入正在断开连接的socket 等待一段时间后看是否进行了重新连接
        deadQueue[this.uid] = true
        var that = this
        setTimeout(function () {
            if (deadQueue[that.uid]) {
                console.log("删除用户中。。。")
                for (var uid in userList) {
                    if (userList[uid].websocket == that) {
                        delete userList[uid]
                        deadQueue[that.uid] = false
                        break
                    }
                }
                wss.sendUserList()
            }
        }, pulseTime)
    })
})
wss.on('error', function (ws) {
    console.log('ERROR!')
})
