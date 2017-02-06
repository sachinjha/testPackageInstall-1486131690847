
/**
 * Module dependencies.
 */

var express = require('express')
var  routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true, saveUninitialized: true, 
                  secret: 'uwotm8' }));

// parse application/json
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse multipart/form-data
app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer (app);
// delete this line if NOT using socket.io
var io = require('socket.io').listen(server);   

server.listen(app.get('port'), function(){
   console.log('Express server on port ' + app.get('port'));
});
