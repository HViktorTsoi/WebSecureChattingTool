var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({
    port: 9989
})

var userList = new Array()

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
            userList[msg.user.uid] = {
                websocket: this,
                user: msg.user
            }
            wss.sendUserList()
        }
        // 退出聊天请求
        else if (msg.type === 'quit') {
            console.log(msg.uid, ' quiting')
            delete userList[msg.uid]
            wss.sendUserList()
        }
        // 消息
        else if (msg.type === 'msg') {
            var websocket = userList[msg.to].websocket
            websocket.send(JSON.stringify(msg))
            console.log(msg)
        }
    })
    ws.on('close', function (close) {
        for (var uid in userList) {
            if (userList[uid].websocket == this) {
                delete userList[uid]
                break
            }
        }
        wss.sendUserList()
    })
})
wss.on('error', function (ws) {
    console.log('ERROR!')
})
