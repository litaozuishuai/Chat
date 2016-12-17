/**
 * Created by Administrator on 2016/12/13.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];

//express内置的加载服务器中的静态文件  ，当然我们也可以用原生Node写

app.use('/', express.static(__dirname + '/www'));

server.listen(process.env.PORT || 3000);

io.sockets.on('connection', function(socket) {
    console.log("已经连接成功")

    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.userIndex = users.length;
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
            console.log("已经登录成功")
        };
    });

    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            users.splice(socket.userIndex, 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
            console.log("用户离开")
        }
    });

    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
        console.log("发送信息中")
    });

    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
        console.log("发送图片中")
    });
});
console.log("服务已经开启，请在3000端口登入")