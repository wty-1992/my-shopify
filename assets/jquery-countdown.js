;(function($, undefined) {
  "use strict";

  var pluginName = 'countdown';
  var interVal = null;

  function checkZero(number){
    return number < 0 ? 0 : number;
  }

  function formatNumber(number){
      return number < 10 ? '0' + checkZero(number) : number;
  }

  function doit($elem, data) {
      var EndTime = new Date(parseInt(data.end) * 1000);
      var StartTime = new Date();
      var nMS = EndTime.getTime() - StartTime.getTime();
      if (nMS < 0 && data.cycle > 0){
          data.end = parseInt(StartTime.getTime() / 1000) + parseInt(data.cycle);
      }else if (nMS < 0){
          clearInterval(interVal);
          data.stop($elem);
      }
      var timeObject = {};
      timeObject.d = checkZero(Math.floor(nMS/(1000 * 60 * 60 * 24)));
      timeObject.dd = formatNumber(timeObject.d);
      timeObject.h = checkZero(Math.floor(nMS/(1000*60*60)) % 24);
      timeObject.hh = formatNumber(timeObject.h);
      timeObject.i = checkZero(Math.floor(nMS/(1000*60)) % 60);
      timeObject.ii = formatNumber(timeObject.i);
      timeObject.s = checkZero(Math.floor(nMS/1000) % 60);
      timeObject.ss = formatNumber(timeObject.s);
      timeObject.m = checkZero(Math.floor(nMS/100) % 10);
      timeObject.mm = formatNumber(timeObject.m);
      var string = data.format.replace(/{(dd|hh|ii|ss|mm|d|h|i|s|m)+}/g, (result, key) => {
          return timeObject[key] < 0 ? '00' : timeObject[key];
      });
      $elem.html(string);
  }
  $.fn[pluginName] = function(options) {
      var $this = $(this)
          ,data = $this.data()
          ,js_current
          ;

      data = $.extend({}, $.fn[pluginName].defaults, options, data);

      if (!data.end) {
          console.log('data.end does not exist');
          return;
      }

      interVal = setInterval(function() {doit($this, data);}, 100);
  };

  $.fn[pluginName].defaults = {
      cycle: 0,
      strings: '{d}:{h}:{i}:{s}:{m}',
      stop: function(){}
  };
})(jQuery);