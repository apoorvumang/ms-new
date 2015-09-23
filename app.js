/**
 * Module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');
mysql = require('./connection-settings.js');


var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
}

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);
app.get('/patient/:view', routes.patient);
app.get('/dash', routes.dash);

// JSON API
app.get('/api/name', api.name);
app.get('/api/patient/:id', api.getPatient);
app.get('/api/patient/dob/:dob', api.getPatientDOB);
app.get('/api/patient/name/:name', api.getPatientName);
app.get('/api/patient/idrange/:startID/:endID', api.getPatientRange);
app.get('/api/patient/siblings/:id', api.getSiblings);
app.get('/api/patientAndSiblings/:id', api.getPatientAndSiblings);
app.get('/api/schedule/:id', api.getSchedule);
app.post('/api/patient/sms', api.postSMS);


// redirect all others to the index (HTML5 history)

app.get('*', routes.index);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'drmahima_com'
// });

// connection.connect();

mysql.connection.query('SELECT name FROM patients WHERE id=69', function (err, rows, fields) {
    if (err) throw err;

    console.log('The name is: ', rows[0].name);
});