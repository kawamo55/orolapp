
var t = require('./orolaLib.js');
//var ds = t.econst_val.pd_string;
//var d = new Date(t.econst_val.pd_string);
//

var d = t.perihelion();
console.log(d);

var ona = t.north_oangle60(0);
console.log("Agl:00 60N:"+ona.N.toString()+" E:"+ona.E.toString());
var ona = t.north_oangle70(0);
console.log("Agl:00 70N:"+ona.N.toString()+" E:"+ona.E.toString());

var ona = t.north_oangle60(90);
console.log("Agl:90 60N:"+ona.N.toString()+" E:"+ona.E.toString());
var ona = t.north_oangle70(90);
console.log("Agl:90 70N:"+ona.N.toString()+" E:"+ona.E.toString());

var osa = t.south_oangle60(0);
console.log("Anl:00 60S:"+osa.S.toString()+" E:"+osa.E.toString());
var osa = t.south_oangle70(0);
console.log("Anl:00 70S:"+osa.S.toString()+" E:"+osa.E.toString());

var osa = t.south_oangle60(90);
console.log("Agl:90 60S:"+osa.S.toString()+" E:"+osa.E.toString());
var osa = t.south_oangle70(90);
console.log("Agl:90 70S:"+osa.S.toString()+" E:"+osa.E.toString());

var ona = t.north_oangle60(141);
console.log("hokkaido");
console.log("Agl:141 60N:"+ona.N.toString()+" E:"+ona.E.toString());

var va_rad = t.orola_Va();
console.log("View Angle radian="+va_rad.toString());

var va_deg = t.rad2deg(va_rad);
console.log("View Angle degree="+va_deg.toString());

var SEDist = t.SE_dist(new Date('2019/10/20'));
console.log("Distance on 2019.10.20: "+SEDist.toString());

var NightAngle = t.getNightAngle(new Date('2019/10/19'), 10);
console.log("Start: "+NightAngle.ST.toString()+" End: "+NightAngle.ED.toString());
