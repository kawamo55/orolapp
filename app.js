//
// Project template
//
// api_key=dxnVkKSN7rAUvcIsHlgnAD5KUMIOLc7ydh6M6Xnc
// 

var express = require("express");
var app = express();

var serv = app.listen(8009,function(){
	console.log("listening to port:"+serv.address().port);
});

app.set('view engine','ejs');

app.get("/",function(req, res, next) {
	res.render("index.ejs",{});
});

