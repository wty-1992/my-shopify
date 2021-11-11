/*!
* zen-photo.js
* @author   andy
* @date     2018-12-06
*/
var uphoto = (function(fabric){
  function _uphoto(options){
    this.init(options);
  }
  _uphoto.prototype =  Object.assign(new ubase(),{
    request: {},
    init: function(options){
      this.canvas = new fabric.Canvas(options['canvasid']);
      this.cWidth     = options.cWidth;
      this.cHeight    = options.cHeight;
      this.baseImg    = options.baseImg ? this.picurl + this.pdir + options.baseImg : false;
      this.type       = options.type;
      this.sku        = options.sku;
      this.setCanvaSize();
      this.setObject(this, this.baseImg);
      this.setBindMethod(this);
      this.canvas.selection = false;
    },
    setObject: function(_this, baseImg){
      _this.canvas.setOverlayImage(baseImg, _this.canvas.renderAll.bind(_this.canvas), {
        originX: 'left',
        originY: 'top',
        scaleX: _this.scale,
        scaleY: _this.scale,
        crossOrigin: 'anonymous'
      });
    },
    adjuster: function(action){
      var degreee;
      var obj = this.getBs();
      if(obj){
        switch(action) {
          case 'move-left':
            obj.set({'left':obj.left-5});
            break;
          case 'move-right':
            obj.set({'left':obj.left+5});
            break;
          case 'move-up':
            obj.set({'top':obj.top-5});
            break;
          case 'move-down':
            obj.set({'top':obj.top+5});
            break;
          case 'zoom-big':
            obj.set({'scaleX':obj.scaleX+0.01, 'scaleY':obj.scaleY+0.01});
            break;
          case 'zoom-small':
            obj.set({'scaleX':obj.scaleX-0.01, 'scaleY':obj.scaleY-0.01});
            break;
          case 'rotate-left':
            obj.set({angle: obj.angle-45}).setCoords();
            break;
          case 'rotate-right':
            obj.set({angle: obj.angle+45}).setCoords();
            break;
          case 'reset':
            obj.set({left: this.cWidth/2, top: this.cHeight/2, angle: 0}).setCoords();
            break;
        }
        this.setCoor();
        
//         if(action=='move-left'){
//           obj.set({angle: obj.angle-45}).setCoords();
//         }else if(action=='move-right'){
//           obj.set({angle: obj.angle-45}).setCoords();
//         }else if(action=='rotate-left'){
//           obj.set({angle: obj.angle-45}).setCoords();
//         }else if(action=='rotate-right'){
//           obj.set({angle: obj.angle+45}).setCoords();
//         }else if(action=='reset'){
//           obj.set({left: this.cWidth/2, top: this.cHeight/2, angle: 0}).setCoords();
//         }
//         this.setCoor();
      }
    },
    rotate: function(direction){
      var obj = this.getBs();
      if(obj){
      	var degree = direction == "rotate_left" ? -45 : 45;
        obj.set({angle: obj.angle+degree}).setCoords();
        this.setCoor();
      }
    },
    reset: function(){
      var obj = this.getBs();
      if(obj){
        obj.set({left: this.cWidth/2, top: this.cHeight/2, angle: 0}).setCoords();
        this.setCoor();
      }
    },
    setBindMethod: function(_this) {
      ["moving", "rotating", "scaling", "wheel"].forEach(function(v){
        var evt = v == "wheel" ? "mouse:" + v : "object:" + v;
        _this.canvas.observe(evt, function (e) {
          _this.setCoor();
        });
      });
      this.listenWheel(this, true);
    },
    compress: function(_this, base64){
      var img = new Image();
      img.src = base64;
      img.onload = function(){
        var quality = 0.5;
        var canvas = document.createElement('canvas');  //create a canvas
        var ctx = canvas.getContext('2d');
        var anw = document.createAttribute("width");    //create a node of attribute
        anw.nodeValue = this.width;
        var anh = document.createAttribute("height");
        anh.nodeValue = this.height;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(this, 0, 0, this.width, this.height);
        base64 = canvas.toDataURL('image/png', quality );  // the value of quality is set more smaller more vaguer
        _this.request.originImage = base64;
      }
    },
    change: function(_this, base64){
      if(_this.canvas.getObjects().length>0){
        var obj = this.getBs();
      }
      if(obj && obj.type==='image'){
        obj.setSrc(base64,function (){
          _this.scale = _this.height>obj.height ? 1 : _this.height/obj.height;
          obj.set({left:_this.width/2, top:_this.height/2, scaleX: _this.scale, scaleY: _this.scale});
          _this.canvas.renderAll(true);
          _this.setCoor();
        });
      }else{
        fabric.Image.fromURL(base64, function(img) {
          img.hasControls = false;
          img.hasBorders  = false;
          img.set({originX: 'center',originY: 'center'});
          _this.scale = _this.height>img.height ? 1 : _this.height/img.height;
          img.set({left:_this.width/2, top:_this.height/2, scaleX: _this.scale, scaleY: _this.scale});
          _this.canvas.add(img);
          _this.canvas.sendToBack(img);
          _this.canvas.renderAll();
          _this.setCoor();
        }.bind(this),{
          crossOrigin: 'anonymous'
        });
      }
    },
    setCoor: function(){
      var bs = this.getBs();
      if(bs){
        this.request.scaleX = bs.scaleX;
        this.request.scaleY = bs.scaleY;
        this.request.left   = bs.left;
        this.request.top    = bs.top;
        this.request.angle  = bs.angle;
        this.canvas.renderAll();
      }
    },
    addObject: function(_this, layerObject) { //0:imgLink, 1:index, 2:opacity, 3:selectable, 4:hasBorders, 5:hasControls, 6:reconame
      fabric.Image.fromURL(layerObject[0], function(img) {
        img.set({originX: 'center',originY: 'center'});
        if(_this.isMobile==1){
          img.set({left:_this.width/2, top:_this.height/2, scaleX: 150/img.width, scaleY: 150/img.width});
        }else{
          img.set({left:_this.cWidth/2, top:_this.cHeight/2, scaleX: 300/img.width, scaleY: 300/img.width});
        }
        var index = layerObject[1];
        var obj = _this.canvas.item(index);
        img.opacity     = layerObject[2];
        img.selectable  = layerObject[3];
        img.hasBorders  = layerObject[4];
        img.hasControls = layerObject[5];
        _this.canvas.remove(obj).add(img).moveTo(img, index).renderAll();
        _this.setCoor();
      });

    },  /* END addObject */
    listenWheel: function(_this, useCapture){
      var obj = _this.canvas.wrapperEl;
      if(obj != undefined){	
        var mousewheelevt=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel"//FF doesn't recognize mousewheel as of FF3.x
        if(obj.attachEvent){ //if IE (and Opera depending on user setting)
          obj.attachEvent("on"+mousewheelevt, handler, useCapture);
        }else if(obj.addEventListener){ //WC3 browsers
          obj.addEventListener(mousewheelevt, handler, useCapture);
        }
        function handler(event) {
          var delta =0;
          var event =window.event ||event ;
          var delta =event.detail ?-event.detail/3 : event.wheelDelta/120;
          if(event.preventDefault)
            event.preventDefault();
          var target = _this.canvas.findTarget(event);
          if(target){
            var delta = delta/200;
            if (target.width*target.scaleX>=50 || delta>0) {
              target.scaleX += delta;
              target.scaleY += delta;
            }else{
              target.scaleX = 0.01;
              target.scaleY = 0.01;
            }
            target.setCoords();
            _this.setCoor();
            return false;
          }
        }
      }
    }  /* END listenWheel */
  });      /* END _uqcanvas.prototype */
  _uphoto.prototype.constructor = _uphoto;
  return _uphoto;
})(fabric);