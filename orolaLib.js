// 
// 近日点の日付
// 磁極2019年度位置
// 磁北極：｛北緯、東経換算角度}
// 磁南極：｛南緯、東経換算角度}
// 磁極座標から地磁気極座標に変更
// 地磁気北極：｛北緯、東経換算角度}
// 地磁気南極：｛南緯、東経換算角度}
// 地球半径(赤道半径) m単位
var econst_val = {
	pi:		3.141592,
	pd_string:	'2019-01-04T00:00:00',
//	mgnorth_deg:	{ N:86.5, E:175.3 },
//	mgsouth_deg:	{ S:64.1, E:136.1 },
	mgnorth_deg:	{ N:80.6, E:286.9 },
	mgsouth_deg:	{ S:80.6, E:106.9 },
	e_radius:	6378100,
	orola_gl:	150000
}

// 太陽地球館距離
// 現在未実装
// d => Date
var SE_dist = function(d) {
	var dst=0.0,rad;
	rad = 2 * econst_val.pi * d / 365.24

	return dst
}
//

// 日付,緯度夜間時間算出
// 現在未実装
// d => Date,agl => +North, -South (degree)
var getNightTime = function(d,agl) {
	var st,ed;

	return {ST:st, ED:ed}
} 
//

// 基準日としての近日点を返す。
var perihelion = function() {
	return new Date(econst_val.pd_string);
}

// 北極側のオーロラベルトの緯度経度算出　60度、70度
// d => 東経換算経度, a => オーロラベルトの北緯
var north_oangle = function(d,a) {
	var n=0.0,e=0.0,r=0.0;

	n = econst_val.pi / 2 - deg2rad(econst_val.mgnorth_deg.N);
	e = deg2rad(econst_val.mgnorth_deg.E);
	r = deg2rad(d) - e;
	if (r < 0) r += (2 * econst_val.pi);
	n = deg2rad(a) - (n * Math.cos(r));
	n = rad2deg(n);
	e = d;

	return { N:n, E:e } 
}

// East d=0->360 
var north_oangle60 = function(d) {
	return north_oangle(d, 60);
}


// East d=0->360 
var north_oangle70 = function(d) {
	return north_oangle(d, 70);
}


// 南極側のオーロラベルトの緯度経度算出　60度、70度
// d => 東経換算経度, a => オーロラベルトの南緯
var south_oangle = function(d,a) {
	var n=0.0,e=0.0,r=0.0;

	n = econst_val.pi / 2 - deg2rad(econst_val.mgsouth_deg.S);
	e = deg2rad(econst_val.mgsouth_deg.E);
	r = deg2rad(d) - e;
	if (r < 0) r += (2 * econst_val.pi);
	n = deg2rad(a) - (n * Math.cos(r));
	n = rad2deg(n);
	e = d;

	return { S:n, E:e } 
}

// East d=0->360 
var south_oangle60 = function(d) {
	return south_oangle(d, 60);
}


// East d=0->360 
var south_oangle70 = function(d) {
	return south_oangle(d, 70);
}

// オーロラがみえる範囲の緯度角度変換値
// 高度取りあえず150Kmで計算
var orola_Va = function( ) {
	return(Math.acos((econst_val.e_radius / (econst_val.e_radius + econst_val.orola_gl))));
}

// radian変換
var deg2rad = function(deg) {
	return(deg * econst_val.pi / 180);
}

// degree変換
var rad2deg = function(rad) {
	return(rad * 180 / econst_val.pi);
}

exports.econst_val = econst_val;
exports.SE_dist = SE_dist;
exports.getNightTime = getNightTime;
exports.perihelion = perihelion;
exports.north_oangle60 = north_oangle60;
exports.north_oangle70 = north_oangle70;
exports.south_oangle60 = south_oangle60;
exports.south_oangle70 = south_oangle70;
exports.orola_Va=orola_Va;
exports.deg2rad = deg2rad;
exports.rad2deg = rad2deg;

