/*
* Serve JSON to our AngularJS client
*/
var mysql = require('../connection-settings.js');

exports.name = function (req, res) {
	mysql.connection.query('SELECT * FROM doctors', function(err, rows, fields) {
		if (err) throw err;
		console.log('The name is: ', rows[0].name);
		res.json({
			name: "a"
		});
	});
};

exports.getPatient = function(req, res) {
	mysql.connection.query('SELECT * FROM patients WHERE id = '+req.params.id, function(err, rows, fields) {
		if (err) {
			console.log(err);
			res.json({});
		}
		else {
			console.log('Got patient, number of rows: ', rows.length);
			res.json(rows[0]);
		}
	});
};

exports.getPatientRange = function(req, res) {
// console.log('SELECT * FROM patients WHERE id BETWEEN '+req.params.startID + ' AND ' + req.params.endID);
	mysql.connection.query('SELECT * FROM patients WHERE id BETWEEN '+req.params.startID + ' AND ' + req.params.endID+ ' LIMIT 50', function(err, rows, fields) {
		if (err) {
			console.log(err);
			res.json([]);
		}
		else {
			console.log('Got patient range, number of rows: ', rows.length);
			res.json(rows);
		}

	});
};

exports.getPatientDOB = function(req, res) {
	var dob = new Date(req.params.dob);
	// console.log('SELECT * FROM patients WHERE DAY(dob) = '+ dob.getDate() + ' AND MONTH(dob) = ' + (dob.getMonth()+1));
	mysql.connection.query('SELECT * FROM patients WHERE DAY(dob) = '+ dob.getDate() + ' AND MONTH(dob) = ' + (dob.getMonth() + 1), function(err, rows, fields) {
		if (err) {
			console.log(err);
			res.json([]);
		}
		else {
			console.log('Got patient from DOB, number of rows: ', rows.length);
			res.json(rows);
		}
	});
};

exports.getPatientName = function(req, res) {
	mysql.connection.query('SELECT * FROM patients WHERE name LIKE \"%'+req.params.name+'%\" LIMIT 50', function(err, rows, fields) {
		if (err) {
			console.log(err);
			res.json([]);
		}
		else {
			console.log('Got patient from Name, number of rows: ', rows.length);
			res.json(rows);
		}
	});
}
