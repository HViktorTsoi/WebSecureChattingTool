var WebSocketServer = require('ws').Server
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
            // 如果有死亡信号则消除死亡信号 否则说明是正常的连接请求
            if (deadQueue[this.uid]) {
                deadQueue[this.uid] = false
            }
            else {
                userList[msg.user.uid] = {
                    websocket: this,
                    user: msg.user
                }
                this.uid = msg.user.uid
                wss.sendUserList()
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
                var websocket = userList[msg.to].websocket
                websocket.send(JSON.stringify(msg))
                console.log('发送消息', msg)
            }
            catch (e) {
                // 如果有问题就返回给发送方 该用户已经离线
                var t = msg.uid
                msg.uid = msg.to
                msg.to = t
                msg.msg = '【系统消息】用户已经离线'
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
                for (var uid in userList) {
                    if (userList[uid].websocket == that) {
                        delete userList[uid]
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
