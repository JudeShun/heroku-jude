var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// var userCount = 0; 


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {
  socket.on('chatmessage', function (msg) {
    io.emit('chatmessage', msg);
  })

  // userCount++;
	// io.sockets.emit('userCount', { userCount: userCount });
	// socket.on('disconnect', function () {
	// 	userCount--;
	// 	io.sockets.emit('userCount', { userCount: userCount });
	// });

  socket.on('newuser', function(name){
    socket.emit('newuser', name);
  })

  socket.on('userconnected', function(name){
    socket.broadcast.emit('userconnected', name);
  })
});


	// socket.on('userCount', function (data) {
	// 	console.log(data.userCount);
	// 	userCount = data.userCount;
	// 	$('#user').text(userCount);
	// });




http.listen(port, function () {
  console.log('listening on *:' + port);
});