let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path');

let app = express();

mongoose.connect('mongodb://localhost/ghostbook_beta');
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./client/views"))

app.use(bodyParser.json({extended: true}));
app.use(express.static(path.join(__dirname, './client/dist')));

require('./server/config/routes.js')(app);

let port = 8010
let server = app.listen(port, function() {
    console.log(port);
})

let total = 0;

let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {

    console.log("Socket has connected at ", socket.id);

    socket.broadcast.emit('other:connection', {message:'hello friends!'});

    socket.on('message', function(data){
        total += 1;
        console.log(total);
    })


})
