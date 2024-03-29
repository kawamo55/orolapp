//
// Project template
// look in vim setting 
// se tabstop=4
// 

var express = require("express");
var app = express();
var https = require('https');
var htreq = require('request');
var olib = require('./orolaLib.js');
require('date-utils');

function ApiReq(prm) {
	return new Promise(function (reso,reje) {
		htreq(prm,function (error, resp, body) {
			if (!error && resp.statusCode == 200) {
				reso(body);
			} else {
				reje(null);
			}
		});
	});
}

async function readbody(url,sta,edd,key) {
// console.log(url+sta+edd+key);
	var opt = {
		url: url+sta+edd+key,
		method: 'GET',
		json: true
	}
	return await ApiReq(opt);
}

app.use(express.static('public'));

var serv = app.listen(8009,function(){
	console.log("listening to port:"+serv.address().port);
});

app.set('view engine','ejs');

app.get("/",function(req, res, next) {
	var d = new Date();
	var s = "<option value=\""+d.toFormat("YYYY/MM/DD")+"\">";
	s = s+d.toFormat("YYYY/MM/DD")+"</option>";
	d = d.add({"days": 1});
	s = s+"<option value=\""+d.toFormat("YYYY/MM/DD")+"\">";
	s = s+d.toFormat("YYYY/MM/DD")+"</option>";
	res.render("index.ejs",{opdates: s});
});

app.get("/result",function(req, res, next) {
	var vdate = req.query.ViewDate;
	var vlat = req.query.lat;
	var vlon = req.query.lon;
	if (vlon < 0) vlon = 360 - vlon;
	var mess = "";

	// 高度から見た見える位置の範囲
	var vr=olib.orola_Va();

	// 南半球の場合
	if (vlat < 0)  {
		var s60 = olib.south_oangle60(vlon);
		if ((s60.S - olib.rad2deg(vr)) >(-1 * vlat))
			mess = "そこからは見えません";
	} else {
		var n60 = olib.north_oangle60(vlon);
		if ((n60.N - olib.rad2deg(vr)) > vlat)
			mess = "そこからは見えません";
	}

	if (mess == "") {
		var url = "https://api.nasa.gov/DONKI/CME";
		var key = "&api_key=dxnVkKSN7rAUvcIsHlgnAD5KUMIOLc7ydh6M6Xnc"

		var vd = new Date(vdate);
		var edd = "&endDate="+vd.toFormat("YYYY-MM-DD");
		var dst = olib.SE_dist(vd);
		// 最低速度を100km/sとする。
		var dw = Math.floor((dst / 100) / (24 * 3600)+0.5);
		var sta = "?startDate="+vd.remove({"days": dw}).toFormat("YYYY-MM-DD");
		mess = "出るかも！？";
		var body = readbody(url,sta,edd,key);
		if (body != null) console.log(body);
			else		console.log('request error');
		if (body.length==0) mess="ここ数日は出ません。";
	}

	res.render("result.ejs", {Resp: mess} );
});

