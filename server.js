var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

function numberify(numString) {
	var splitString = numString.split(',');
	var joinedString = splitString.join('');

	return parseFloat(joinedString);
}

app.get('/scrape', function (req, res) {

	var url = 'http://www.usbr.gov/lc/region/g4000/hourly/hourly.html';
	var url2 = 'http://mead.uslakes.info/Level.asp';

	var final = {
		waterLevel: ''
	};

	request(url2, function (error, resp, html) {

		if (!error) {

			var $ = cheerio.load(html);

			var waterLevel;

			var element = $('div[style="font-family:Arial, Helvetica, sans-serif; font-size:46px; font-weight:bold; color:#09C; text-shadow:#000 1px 1px 1px;"]');

			element.filter(function () {
				var data = $(this);
				waterLevel = data.text();
				final.waterLevel = numberify(waterLevel);
			});
		}

		res.send(waterLevel);
	});

});


app.listen('8080');

console.log('Magic happens on port 8080');

module.exports = app;