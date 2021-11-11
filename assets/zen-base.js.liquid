var ubase = (function(){
  var _ubase = function(options) {
    this.canvas   = '';
  	this.cWidth   = '';
    this.cHeight  = '';
    this.isMobile = '';
    this.picurl   = 'https://pic.stylelab.com/';
    this.qiniucdn = 'https://spic.qn.cdn.imaiyuan.com/';
  	this.pdir     = 'img/photo/';
  	this.cdir     = 'img/textdesign/';
    this.canvas.selection = false;
  };
  _ubase.prototype = {
    setCanvaSize: function(){
      var width = jQuery(window).width();
      if(width<=414){
        this.width  = width - 70;
        this.isMobile = 1;
      }else if(width>768 && width<=1024){
        this.width  = 240;
        this.isPad = 1;
      }else{
        this.isPc = 1;
        this.width  = 400;
      }
      this.height = this.width * this.cHeight / this.cWidth;
      this.scale = this.width / this.cWidth;
      this.canvas.setWidth(this.width);
      this.canvas.setHeight(this.height);
    },
    getBs:function(){
      if(this.canvas.getObjects().length>0){
        return this.canvas.item(0);
      }
    },
    serverUpload: function(base64, beforeCallback, xhrCallback, successCallback, _this=this) {
      $.ajax({
        type: "POST",
        url : _this.picurl + "pictured/capture",
        dataType: 'json',
        data : {
          width:  _this.cWidth,
          height: _this.cHeight,
          scaleX: _this.request.scaleX * _this.cWidth / _this.width,  
          scaleY: _this.request.scaleY * _this.cWidth / _this.width,  
          left:   _this.request.left   * _this.cWidth / _this.width,  
          top:    _this.request.top    * _this.cWidth / _this.width,  
          angle:  _this.request.angle,
          type:   _this.type,
          sku:    _this.sku,
          bgcolor: _this.request.bgcolor || '',
          origin_data: _this.request.originImage
        },
        beforeSend: function() {
          beforeCallback();
        },
        xhr: function xhr() {
          var xhr = $.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener('progress', function (e) {
              xhrCallback(e);
            }, false);
          }
          return xhr;
        },
        success: function(data){
          if(data.state==200){
            successCallback(data);
          }else if(data.state==500){
            console.log(500);
          }
        }
      });
    },
    cdnAsyncUpload: function(successCallback, _this=this){
      //var blob = this.convertBase64ToBlob(base64);
      return new Promise((resolve, reject)=>{
        $.ajax({
          type: "POST",
          async:false, 
          url: this.picurl + "assist/uptoken",
          dataType: 'json',
          success: function(data){
            //var filename = new Date().Format("yyyyMMddhhmmss") + _this.randomString(6);
            successCallback(data.token, resolve);
          }
        });
      });
    },
    cdnUpload: function(successCallback, _this=this){
      //var blob = this.convertBase64ToBlob(base64);
      $.ajax({
        type: "POST",
		async:false, 
        url: this.picurl + "assist/uptoken",
        dataType: 'json',
        success: function(data){
          //var filename = new Date().Format("yyyyMMddhhmmss") + _this.randomString(6);
          successCallback(data.token);
        }
      });
    },
    convertBase64ToBlob: function(base64){
      var base64Arr = base64.split(',');
      var imgtype = '';
      var base64String = '';
      if(base64Arr.length > 1){
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
      }
      var bytes = atob(base64String);
      var bytesCode = new ArrayBuffer(bytes.length);
      var byteArray = new Uint8Array(bytesCode);

      for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      return new Blob( [bytesCode] , {type : imgtype});
    },
    randomString: function(len){
      var len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var pwd = '';
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
  }
  return _ubase;
})();

if(typeof qiniu=='undefined'){
  var qiniuRegion = ''; 
}else{
  var qiniuRegion = qiniu.region.na0;
}

ubase.util = {
	cdnurl: "https://spic.qn.cdn.imaiyuan.com/",
	picurl: "https://pic.stylelab.com/",
	prefix: "soufeel_",
    diamond: [],
	putExtra: {
		fname: "",
		params: {},
		mimeType: null
	},
	config: {
	  region:qiniuRegion,
	  concurrentRequestLimit:3
	},
	getFilename: function(){
	  return new Date().Format("yyyyMMddhhmmss") + this.randomString(6);
	},
	randomString: function(len){
		var len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var randomstr = '';
		for (i = 0; i < len; i++) {
			randomstr += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return randomstr;
	},
	setShopifyVariant: function(markup, val){
	  $(".selector-wrapper label").each(function( index ) {
        if($.trim($(this).text())==markup){
          $(this).next('select').val(val).trigger('change');
        }
      });
	},
	setSltHide: function(attr){
	  $( ".selector-wrapper label" ).each(function() { 
  		if($.trim($(this).text())==attr){
  		  $(this).parent().hide();
  		}
	  });
	}
}
Personalize = {
	
}
Date.prototype.Format = function(fmt){ 
  var o = {
    "M+": this.getMonth() + 1,  
    "d+": this.getDate(), 
    "h+": this.getHours(), 
    "m+": this.getMinutes(), 
    "s+": this.getSeconds(),  
    "q+": Math.floor((this.getMonth() + 3) / 3), 
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) 
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

$(document).on("hide-qty",function(event,flag){
  if(flag){
    $(".product-form__item--quantity").hide();
  }
})
$(function() {
  $(".common-standar_btn button").attr("disabled",false);
  $(".custom-close").click(function(){
    simpleModal.close();
  })
});