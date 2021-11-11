var curvecarving = (function(fabric){
  function _curvecarving(options){
    this.picurl = options.picurl;
    this.cdir   = "img/textdesign/";
  	this.init(options);
  }
  _curvecarving.prototype = Object.assign(new ubase(), {
    init: function(options){
      this.canvas = new fabric.Canvas(options['canvasid']);
      this.cWidth   = options['cWidth']  || '';
      this.cHeight  = options['cHeight'] || '';
      this.sku      = options['sku']  || '';
      this.type     = options['type'] || '';
      this.baseImg  = options['baseImg'] || '';
      this.path     = options['path'] || '';
      this.textpath = [];
      this.defaultFont = options['font'] || 'holyunion';
      this.defaultFontSize = options['size'] || 30;
      this.setCanvaSize();
      this.setObject();
      this.canvas.selection = false;
      this.initPath();
    },
    setObject: function(_this=this){
      _this.canvas.setBackgroundImage(_this.baseImg, _this.canvas.renderAll.bind(_this.canvas), {
        originX: 'left',
        originY: 'top',
        scaleX: _this.scale,
        scaleY: _this.scale,
        backgroundImageOpacity: 1,
        backgroundImageStretch: false,
        crossOrigin: 'anonymous'
      });
    },
    setTextSize: function(_this=this){
      _this.textpath.forEach(function(v,i){
        var size =  _this.path[i].size ? _this.path[i].size : 30;
        v.setFontSize(size);
      })
    },
    initPath:function(_this=this){
      _this.stage = new Konva.Stage({
        container: 'container',
        width: _this.cWidth,
        height: _this.cHeight
      });
      _this.layer = new Konva.Layer();
      _this.path.forEach(function(v, i){
        _this.textpath[i] = new Konva.TextPath({
          x: 0,
          y: 0,
          align: 'center',
          fill: v.textColor || '#000',
          fontSize: v.size || 50,
          fontFamily: _this.defaultFont,
          text: '',
          data: v.path
        });
        _this.layer.add(_this.textpath[i]);
      })
      _this.stage.add(_this.layer);
      _this.img = new Image();
      _this.imgObj = new fabric.Image(_this.img); 
      _this.imgObj.lockMovementX = true;
      _this.imgObj.lockMovementY = true;
      _this.imgObj.selectable = false;
      _this.canvas.add(_this.imgObj);
      _this.img.onload = function(){
		    _this.imgObj.setElement(_this.img);
        _this.imgObj.set({left:0, top:0, scaleX: _this.scale, scaleY: _this.scale});
        _this.canvas.renderAll(true); 
      };
    },
    loadAndUse: function(i, font, _this=this){
      var myfont = new FontFaceObserver(font)
      myfont.load()
      .then(function() {
	    var obj = _this.textpath[i];
  		if(obj){
  		  obj.setFontFamily(font);	
            _this.layer.draw();
            _this.img.src = _this.stage.toDataURL();
  		}
      }).catch(function(e) {
        console.log(e)
      });
    },
    changeFont:function(i, font){
      //_this.textpath.forEach(function(v){
        this.loadAndUse(i, font);
      //});
    },
	  changeSize: function(i, size){
      var obj = this.textpath[i];
      if(obj){
        obj.setFontSize(size);	
        this.layer.draw();
        var dataURL = this.stage.toDataURL();
        this.img.src = dataURL;
      }
    },
    changeText:function(text, i){
      this.textpath[i].setText(text);
	    this.layer.draw();
      var dataURL = this.stage.toDataURL();
      this.img.src = dataURL;
    },
  });
  _curvecarving.prototype.constructor = _curvecarving;
  return _curvecarving;
})(fabric);