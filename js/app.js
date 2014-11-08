(function () {
  
  var r = Raphael("container", 320, 480),
    fadeCircles = r.set(),
    fillCircles = r.set(),
    total = 120,
    seconds_total = 30,
    RADIUS = 80,
    RADIUS_FILL = 65,
    CENTER_X = 160,
    CENTER_Y = 240,
    init = true,
    tmEle = document.getElementById("time"),
    dtEle = document.getElementById("date");  
  
  // make the fade circles for the animation
  for (var value = 0; value < total; value++) {
    var alpha = 360 / total * value,
        a = alpha * Math.PI / 180,
        x = CENTER_X + RADIUS * Math.cos(a),
        y = CENTER_Y - RADIUS * Math.sin(a);
    fadeCircles.push(r.circle(x, y, 2));
  }
  fadeCircles.attr({fill: "#fff", stroke: "none", "fill-opacity": 0});
  
  // make the transparent circle in the middle
  r.circle(CENTER_X, CENTER_Y, RADIUS).attr({fill: "#182831", opacity: .7, stroke: "#222", "stroke-opacity": .2, "stroke-width": 4});
  
  // make the fill cicles for the seconds
  for( var val = 0; val < seconds_total; val++ ) {
    var alpha = 360 / seconds_total * val,
        a = (90 - alpha) * Math.PI / 180,
        x = CENTER_X + RADIUS_FILL * Math.cos(a),
        y = CENTER_Y - RADIUS_FILL * Math.sin(a);
        str = "#aaa";
    fillCircles.push(r.circle(x, y, 2)).attr({fill: str, stroke: str});
  }
  fillCircles.attr({"fill-opacity": 0});
  
  function animateFade(ele){
    // check to make sure that current element isnt already in animation
    if( ele.status().length == 0) {
      ele.attr({"fill-opacity": .3});
      ele.animate({r: 80, "fill-opacity": 0}, 12000, "linear", function(){
        ele.attr({r: 2, "fill-opacity": 0});
      });
    }
  }
  
  function updateSec(s){
    var i = Math.floor(Math.random()*total),
      j = Math.floor(s/2),
      k = Math.floor(Math.random()*total);
    animateFade(fadeCircles[i]);
    setTimeout(function(){ animateFade(fadeCircles[k]); }, 500);
    if( s%2 == 0 ){
      if( j == 0 ){
        fillCircles.attr({"fill-opacity": 0, "stroke-opacity": 1});
        fillCircles[j].attr({"fill-opacity": 1, "stroke-opacity": 0});
      } else {
        for(var cFill = j; cFill >= 0; cFill--){
          fillCircles[cFill].attr({"fill-opacity": 1, "stroke-opacity": 0});
        }
      }
    }
  }
  
  function updateTime(dt){
    var h = dt.getHours(),
      m = dt.getMinutes(),
      tmStr = "" + ((h < 10) ? "0" + h : h ) + ":" + ((m < 10) ? "0" + m : m ),
      dtStr = "" + (dt.getMonth()+1) + "." + dt.getDate() + "." + dt.getFullYear();
    tmEle.innerHTML = tmStr;
    dtEle.innerHTML = dtStr;
  }
  
  (function () {
    var dt = new Date;
    updateSec(dt.getSeconds());
    updateTime(dt);
    setTimeout(arguments.callee, 1000);
    init = false;
  })();
  
})();