var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var ping = require('ping');

var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/register',fun ction(req,res){
 var formbody=req.body;
 var jsondata='{"name":"'+formbody.email+'","password":"'+formbody.psw+'","repeat_password":"'+formbody.psw_repeat+'"}';
 var jsonobj=JSON.parse(jsondata);
 var jsoncontent=JSON.stringify(jsonobj);
 fs.writeFile('output.json',jsoncontent,'utf8',function(err)
 {
   if(err){
     console.log("error")
   }
   console.log("entered");
 });
 res.render('login.ejs');
});



app.post('/login',function(req,res){
 var formbody=req.body;
 var jsondata='{"name":"'+formbody.email+'","password":"'+formbody.psw+'","repeat_password":"'+formbody.psw_repeat+'"}';
 var jsonobj=JSON.parse(jsondata);
 var jsoncontent=JSON.stringify(jsonobj);
 fs.writeFile('output.json',jsoncontent,'utf8',function(err)
 {
   if(err){
     console.log("error")
   }
   console.log("entered");
 });
 res.send('success your login form');
});

/*app.post('/login',function(req,res){
  var form=req.body;
var jsondata=fs.readFile('output.json');
var json=JSON.stringify(jsondata);
var data=Json.parse(json);
function(req,res,err){

if(err)
{
  console.log('error');
}
if(form.uname==json.email&&form.psw==json.psw)
{
  res.render('home.ejs');
}
  res.render('error');
}
});*/

}
 app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
