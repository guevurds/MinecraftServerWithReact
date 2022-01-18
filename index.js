const 
    proc = require('child_process'),
    util = require('util'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    { Server } = require('socket.io'),
    io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
      
io.on('connection', (socket) => {
    socket.on("start minecraft server", ()=> {
        mc_server = proc.spawn(
            "java",
           ['-Xms1024M', '-Xmx1024M', '-jar', 'forge-1.12.2-14.23.5.2838-universal.jar'],
           { cwd: "../../rlserver2"}
       )
       
       mc_server.stdout.on('data', function (data) {
           if (data) {
                socket.emit('logServer', ""+data);
           }
       });
       
       mc_server.stderr.on('data', function (data) {
           if (data) {
                socket.emit('logServer', ""+data);
           }
       });


    })
});
   
server.listen(80, () => {
    console.log('listening on *:80');
});


    function startMinecraftServer(socket) {
    

}