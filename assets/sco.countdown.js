/* ==========================================================
 * sco.countdown.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2013 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, devel:true */

;(function($, undefined) {
	"use strict";

	var pluginName = 'scojs_countdown';
	var t;
	
	function doit($elem, data, until) {
		var str = '',
			started = false,
			left = {d: 0, h: 0, m: 0, s: 0},
			interval = data.interval,
			js_current = Math.round((new Date()).getTime() / 1000);
		;

		//如果data.current没设置也是现在的时间，如果设置了，本来就是从这个设置时间倒计时的
		left.s = until - js_current + data.offset * 3600;

		if (left.s <= 0) {
			left.s = 0;
			clearTimeout(t);
		}
		if (Math.floor(left.s / 86400) >= 0 && data.showDay && !data.moreHour) {
		
			left.d = checkTime( Math.floor(left.s / 86400) );
			left.s = left.s % 86400;
			if(data.joinStr){
				var leiD = '<span class="timeone">'+left.d.toString().split("").join('</span><span class="timeone">')+"</span>";
				str += ' ' + '<div class="day-box"><span class="num">' + leiD + '</span></div>';
			}else{
				str += ' ' + '<div class="day-box"><span class="num">' + left.d + '</span>' + '<span class="text">' + data.strings.d + '</span></div>';	
			}
			
		}
		if (Math.floor(left.s / 3600) >= 0) {
			left.h = Math.floor(left.s / 3600);
			left.h = checkTime(left.h);
			left.s = left.s % 3600;
			if(data.moreHour){
				if(data.joinStr){
					var leiH = '<span class="timeone">'+left.h.toString().split("").join('</span><span class="timeone">')+"</span>";
					str += ' ' + '<div class="hour-box"><span class="num">' + leiH + '</span></div>';
				}else{
					str += ' ' + '<div class="hour-box"><span class="num">' + left.h + '</span>' + '<span class="text">' + data.strings.h + '</span></div>';	
				}
			}else{
				if(data.joinStr){
					var leiH = '<span class="timeone">'+left.h.toString().split("").join('</span><span class="timeone">')+"</span>";
					str += ' ' + '<div class="hour-box"><span class="num">' + leiH + '</span></div>';	
				}else{
					str += ' ' + '<div class="hour-box"><span class="num">' + left.h + '</span>' + '<span class="text">' + data.strings.h + '</span></div>';	
				}
			}
			
		}
		if (Math.floor(left.s / 60) >= 0) {
			left.m = Math.floor(left.s / 60);
			left.m = checkTime(left.m);
			left.s = left.s % 60;
			if(data.joinStr){
				var leiM = '<span class="timeone">'+left.m.toString().split("").join('</span><span class="timeone">')+"</span>";
				str += ' ' + '<div class="minute-box"><span class="num">' + leiM + '</span></div>';
			}else{
				str += ' ' + '<div class="minute-box"><span class="num">' + left.m + '</span>' + '<span class="text">' + data.strings.m + '</span></div>';
			}
			
		}
		if (left.s >= 0) {
			left.s = checkTime(left.s);
			if(data.joinStr){
				var leiS = '<span class="timeone">'+left.s.toString().split("").join('</span><span class="timeone">')+"</span>";
				str += ' ' + '<div class="second-box"><span class="num">' + leiS + '</span></div>';
			}else{
				str += ' ' + '<div class="second-box"><span class="num">' + left.s + '</span>' + '<span class="text">' + data.strings.s + '</span></div>';
			}
			
		}
		if(data.showMS ){
			if(left.s >= 0){
				var cur = (new Date()).getMilliseconds()
				var ms  = 1000 - cur;
				var mslength = data.mslength;
				if( mslength >= 3 ){
					mslength = 3;
				}
				if( mslength <= 0 ){
					mslength = 0;
				}
				//if(ms < 0 || ms > 1000){
				//	ms = 0;	
				//}

				ms =  Math.floor(ms /  Math.pow(10, (3-mslength) ));
				str += ' ' + '<div class="msecond-box"><span class="num">' + ms + '</span>' + '<span class="text">' + data.strings.ms + '</span></div>';
			}else{

				str +=	' ' + '<div class="msecond-box"><span class="num">0</span>' + '<span class="text">' + data.strings.ms + '</span></div>';
			}
		}

		$elem.html(str);

		t = setTimeout(function() {doit($elem, data, until);}, interval);
	}
	function checkTime(val){
		if(val < 10 ){
			val = "0" + val;	
			return val; 
		}	
		return val;
	}
	$.fn[pluginName] = function(options) {
		var $this = $(this)
			,data = $this.data()
			,js_current;

		data = $.extend({}, $.fn[pluginName].defaults, options, data);
		if (!data.until) {
			return;
		}
		
		js_current = Math.round(new Date().getTime() / 1000);
		
		//将开始时间调整为本机时间
		if (!data.current) {
			data.current = js_current;
		}

		data.until -= (js_current - data.current);
		doit($this, data, data.until);
	};
	
	
	$.fn[pluginName].defaults = {
		strings: {d: 'day', h: 'hour', m: 'min', s: 'sec'},
		css: {
			dcss:'day-box', 
			hcss:'hour-box', 
			mcss:'minute-box',
			scss:'second-box'
		},
		interval:1000, 	//间隔
		showDay: true,	//显示天
		moreHour: false,
		showMS:false,	//显示毫秒
		mslength:1,		//显示毫秒长度
		reFresh:false,	//是否刷新页面
		joinStr:false   //是否分割显示
	};
	
})(jQuery);
