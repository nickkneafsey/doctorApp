var request = require('request');
// var options = {
// 	url: 'https://drchrono.com/api/clinical_note_templates',
// 	headers: {
// 		'Authorization': "Bearer a1kFoACNuCsHiGg95doQf927NZrpJZ"
// 	}
// }

var setOptions = function(auth, end) {
	return {
		url: 'https://drchrono.com/api/' + end,
		headers: {
			'Authorization': auth
		}
	}
};

var sendResponse = function(options, res) {
	request(options, function(err, resp, body){
		if (!err && resp.statusCode == 200) {
			console.log(body)
			res.send(body);
		}
	});
}

module.exports = {
	handleRoute: function(req, res) {
		var auth = req.headers.auth;
		var end = req.headers.end;
		var options = setOptions(auth, end);
		sendResponse(options, res);
	}
	// getClinicalNoteTemplates: function(req, res) {
	// 	var auth = req.headers.auth;
	// 	var end = req.headers.end;
	// 	var options = setOptions(auth, end);
	// 	sendResponse(options, res);
	// },
	// getPatients: function(req, res) {
	// 	var auth = req.headers.auth;
	// 	var end = req.headers.end;
	// 	var options = setOptions(auth, end);
	// 	sendResponse(options, res);
	// },
	// getClinicalNotes: function(req, res) {
	// 	var auth = req.headers.auth;
	// 	var end = req.headers.end;
	// 	var options = setOptions(auth, end);
	// 	sendResponse(options, res);
	// }
}