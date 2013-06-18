var express = require('express'),
    app = express(),
    fs = require('fs'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, {
        'log': true
    });

var values = [0, 0, 0, 0],
    sockets = {};

app.use("/js", express.static(__dirname + '/web/js'));
app.use("/css", express.static(__dirname + '/web/css'));
app.use(express.bodyParser());

app.get('/', function(req, res){
    fs.readFile(__dirname + "/web/index.html", "UTF-8", function(err, data){
        res.send(data);
    });
});

var writeToClients = function(){
	Object.keys(sockets).map(function(socket){
		sockets[socket].emit('data', {
			'values': values,
            'timestamp': new Date().getTime()
		});
	});
};

io.sockets.on('connection', function (socket) {
    sockets[socket.id] = socket;

    // socket.on('update', function(data){
    // 	values = data.values;
    //     writeToClients(data.element, data.value);
    // });
    socket.on('updateAll', function(data){
    	values = data.values;
        writeToClients();
    });

    socket.on('disconnect', function(){
        delete sockets[socket.id];
    });
});

server.listen(8001);
console.log('listening on 8001');
