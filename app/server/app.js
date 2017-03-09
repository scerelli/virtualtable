const express = require('express');
const http = require('http');

const app        = express();
const server     = http.createServer(app);
const io         = require('socket.io').listen(server);
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const configDB     = require('./config/db.js');
const port         = process.env.PORT || 3000;
const router       = require('./router');

mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


server.listen(port);
console.log(`🎉 Server is running on port: ${port}. 🎉`)


// io.on('connection', socket => {
//   console.log(socket)
//   console.log("Connected succesfully to the socket ...");
//   var news = [
//       { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
//       { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
//       { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
//       { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
//   ];
//   setInterval(() => {
//     socket.emit('news', news);
//   }, 10000);

// })

router(app);
