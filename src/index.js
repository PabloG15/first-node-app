const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const pageRoutes = require('./routes');


//settings
app.set('port',8080)
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));

//middlewares



//routes
app.use(pageRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')))


//server listening
app.listen(app.get('port'), ()=>{
    console.log('Servidor en Puerto: ',app.get('port'));
});