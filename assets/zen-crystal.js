/*
*   @author  by Coman 2018.12.06  <420500235@qq.com>
*   LAST UPDATED 2018.12.10
*   Customize the crystal.
*/

var ColorMagic = (function(fabric){
function _colorMagic(options){
  this.init(options);
}
_colorMagic.prototype = Object.assign(new ubase(), {
  init: function(options){
    this.config = options;
    this.canvas = new fabric.Canvas(options['canvasid']);
    this.cWidth   = options['cWidth']  || '';
    this.cHeight  = options['cHeight'] || '';
    this.path     = options['path'] || '';
    this.text = [];
    this.textpath = [];
    this.custom = options['custom'] || '';
    this.defaultFont = options['defaultFont'] || 'holyunion';
    //this.defaultFontSize = options['size'] || 30;
    this.canvas.selection = false;
    this.setCanvaSize();
    this.setBackground();
    if(options['overLay']){
      this.setOverlay();
    }
    this.setBgAndObj();
    this.canvas.renderAll();
    },
    setOverlay: function(_this=this){ 
      _this.canvas.setOverlayImage(_this.config["overLay"], _this.canvas.renderAll.bind(_this.canvas), {
      scaleX: _this.scale,
      scaleY: _this.scale,
      crossOrigin: 'anonymous'
    });
  },
setBackground: function(_this=this){ 
    _this.canvas.setBackgroundImage(_this.config["bg"], _this.canvas.renderAll.bind(_this.canvas), {
      scaleX: _this.scale,
      scaleY: _this.scale,
      crossOrigin: 'anonymous'
    });
  },
  setBgAndObj: function(){
    var j = 0;
    if(this.config["diamond"][j]){
      this.setDiamond(j);
    }
  },
setDiamond: function(j,_this=this){
    fabric.Image.fromURL(_this.config["diamond"][j], function (oImg) {
      oImg.lockMovementX = true;
      oImg.lockMovementY = true;
      oImg.selectable    = false;
      oImg.scaleX = _this.scale;
      oImg.scaleY = _this.scale;

      // var BlendColor = new fabric.Image.filters.BlendColor({
      //   color: '',
      //   mode: 'add',
      //   alpha: 1
      // });
      // var Contrast = new fabric.Image.filters.Contrast({});       // 对比度
      // var Brightness = new fabric.Image.filters.Brightness({});   // 亮度
      // var Saturation = new fabric.Image.filters.Saturation({});   // 色饱和度
      // var HueRotation = new fabric.Image.filters.HueRotation({}); // 色调

      // oImg.filters.push(BlendColor, Contrast, Brightness, Saturation, HueRotation);
      // console.log('FFFFFFFsfdsfFFF');
      // oImg.applyFilters();
      _this.canvas.add(oImg);
      j++;
      if(_this.config["diamond"][j]){
        _this.setDiamond(j);
      }else{
        _this.config.callback(_this);
      }
    }.bind(this),{
        crossOrigin: 'anonymous'
    })
  },

  getColor: function(key){
    // #4d0875 紫色 - 作为调试底色
    // 色值-对比度-亮度-色饱和度-色调
    var color = {
      // 12月生日石
      'pomegranate':['#4d0875', '0.011618', '-0.235405', '0.713477', '-1.59'],  //1月中石榴红
      'hyacinth':['#4d0875', '-0.0981', '-0.0471', '0.474296', '-0.086'],       //2月中紫蓝 
      'bodegablue':['#4d0875', '0.105722', '-0.090328', '0.046907', '-0.524'],  // 3月浅海蓝
      'whitezirconium':['#4d0875', '-0.01975', '0.011618', '-1', '-0.524'],     // 4月白锆
      'greenzirconium':['#4d0875', '-0.086407', '-0.160906', '0.180221', '-0.85'],// 5月绿锆
      'pink':['#4d0875', '-0.133459', '0.172379', '-0.039355', '-1.604'],       // 6月粉红
      'redsteel':['#4d0875', '-0.204037', '-0.243247', '0.99971', '-1.654'],    // 7月红钢
      'olive':['#4d0875', '-0.192274', '-0.015829', '-0.05896', '-1.148'],      // 8月中橄榄
      'bluezirconium':['#4d0875', '-0.243247', '-0.231484', '0.368429', '-0.322'],// 9月蓝锆
      'rosered':['#4d0875', '-0.078565', '-0.05896', '0.733082', '0.198'],      // 10月玫红刚
      'champagne':['#4d0875', '-0.141301', '0.062591', '0.733082', '0.662'],    // 11月中香槟
      'spinel':['#4d0875', '-0.035434', '-0.086407', '0.611531', '1.646'],       // 12月-尖晶
      
      // ALEX 12生日石钻
      'alexred':['#4d0875', '0.023381', '-0.211879', '0.301772', '-1.62'],
      'alexpinkishpurple':['#4d0875', '0.023381', '-0.266773', '-0.274615', '-0.096'],
      'alexseablue':['#4d0875', '0.023381', '-0.055039', '-0.721609', '-0.414'],
      'alexwhite':['#4d0875', '0.023381', '-0.055039', '-1', '-0.414'],
      'alexgreen':['#4d0875', '-0.070723', '-0.376561', '0.552716', '1.234'],
      'alexlightpurple':['#4d0875', '-0.011908', '-0.149143', '-0.478507', '1.776'],
      'alexrosepink':['#4d0875', '0.101801', '-0.086407', '-0.160906', '-1.66'],
      'alexolive':['#4d0875', '-0.000145', '-0.13738', '0.082196', '-1.148'],
      'alexblue':['#4d0875', '-0.125617', ' -0.125617', ' 0.152774', '1.582'],
      'alexpink':['#4d0875', '0.117485', '0.015539', '-0.68632', '-1.52'],
      'alexamber':['#4d0875', '0.074354', '-0.145222', '0.168458', '0.554'],
      'alexlightblue':['#4d0875', '0.074354', '-0.047197', '-0.109933', '1.428'],
      
      //原版水钻颜色	
      'originalwhite':['#4d0875', '0.011618', '0.01946', '-1', '1.428'],
      'originalcolorwhite':['#4d0875', '0.011618', '0.062591', '-0.88237', '1.428'],
      'originalcolorblue':['#4d0875', '-0.015829', '-0.051118', '0.133169', '1.52'],
      'originallightyellow':['#4d0875', '0.039065', '0.05867', '-0.247168', '0.684'],
      'originalolive':['#4d0875', '0.007697', '-0.05896', '-0.317746', '-1.094'],
      'originalperidot':['#4d0875', '0.007697', '-0.05896', '-0.705925', '-1.094'],
      'originalaquamarine':['#4d0875', '0.007697', '-0.031513', '-0.392245', '-0.406'],
      'originalblack':['#4d0875', '-0.172669', '-0.564769', '-1', '0.444'],
      'originalblackdiamond':['#4d0875', '-0.004066', '-0.25501', '-1', '0.444'],
      'originalred':['#4d0875', '-0.05896', '-0.396166', '0.054749', '0.43'],
      'originalcitrine':['#4d0875', '0.042986', '-0.133459', '0.246878', '0.592'],
      'originalgold':['#4d0875', '-0.207958', '0.13709', '0.517427', '0.7'],
      'originalstarlite':['#4d0875', '-0.086407', '-0.023671', '0.99971', '-0.514'],
      'originalblue':['#4d0875', '-0.117775', '0.003776', '0.670346', '-0.306'],
      'originalgreen':['#4d0875', '-0.188353', '-0.41185', '0.533111', '1.04'],
      'originalrosered':['#4d0875', '-0.188353', '0.011618', '0.41156', ' 0.244'],
      'originalcymbidium':['#4d0875', '-0.188353', '-0.325588', '0.05867', '1.606'],
      'originalpinkishpurple':['#4d0875', '-0.204037', '0.035144', '0.623294', '1.822'],
      'originallightred':['#4d0875', '-0.156985', '-0.172669', '0.99971', '-1.574'],
      'originallightrosered':['#4d0875', '-0.156985', '0.078275', '0.062591', '-1.636'],
      'originallightpurple':['#4d0875', '-0.125617', '0.070433', '-0.404008', '-2'],
      'originalpink':['#4d0875', '-0.192274', '0.003776', '-0.588295', '-1.698'],
      'originalpurplishred':['#4d0875', '-0.102091', '-0.243247', '0.003776', '-1.868'],
      'originalviolet':['#4d0875', '-0.102091', '0.109643', '-0.494191', '-1.946'],
      'originalpurple':['#4d0875', '-0.102091', '-0.427534', '-0.494191', '-1.946']
        };
    return color[key];
  },
  setColor: function(obj, key){
    var color = this.getColor(key);

    obj.filters = [];
    var BlendColor = new fabric.Image.filters.BlendColor({
        color: color[0],
        mode: 'add',
        alpha: 1
      });
      var Contrast = new fabric.Image.filters.Contrast({contrast: color[1]});       // 对比度
      var Brightness = new fabric.Image.filters.Brightness({brightness: color[2]});   // 亮度
      var Saturation = new fabric.Image.filters.Saturation({saturation: color[3]});   // 色饱和度
      var HueRotation = new fabric.Image.filters.HueRotation({rotation: color[4]}); // 色调


      // console.log(color[4]);
      // oImg.filters.push(BlendColor, Contrast, Brightness, Saturation, HueRotation);
      obj.filters.push(BlendColor);
      obj.applyFilters();
      this.canvas.renderAll();

      obj.filters.push(Contrast);
      obj.applyFilters();
      this.canvas.renderAll();

      obj.filters.push(Brightness);
      obj.applyFilters();
      this.canvas.renderAll();

      obj.filters.push(Saturation);
      obj.applyFilters();
      this.canvas.renderAll();

      obj.filters.push(HueRotation);
      obj.applyFilters();
      this.canvas.renderAll();
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
        fill: '#000',
        fontSize:  v.textFontSize,
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
initCarvingPath:function(_this=this){
  _this.custom.coors.forEach(function(v,i){
    _this.text[i] = new fabric.Text('', {originX: 'center',originY: 'center', left: v.left * _this.scale, top: v.top * _this.scale, hasControls: false, borderColor: '#EEE', borderDashArray: [5, 10], fontSize: v.textFontSize });
  _this.canvas.add(_this.text[i]);
  _this.canvas.renderAll(true);
  });
  
},
textToVertical: function(text){
  var newText = '';
  for(var i =0; i<text.length;i++){
    if(i == text.length-1){
      var _n = '';
    }else{
      var _n = '\n';
    }
    newText += text[i]+_n;
  }
  return newText;
},
changeText:function(text, i){
  this.textpath[i].setText(text);
  this.layer.draw();
  var dataURL = this.stage.toDataURL();
  this.img.src = dataURL;
},
changeCarvingText:function(text, i){
    var obj = this.text[i];
    if(obj){
      if(this.custom.coors[i].direction=='vertical'){
        text = this.textToVertical(text);
      }
      obj.set('text', text);
      this.canvas.renderAll();
    }
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
loadAndUseCarving: function(i, font, _this=this){
    var myfont = new FontFaceObserver(font)
    myfont.load()
    .then(function() {
      var obj = _this.text[i];
      if(obj){
        obj.set('fontFamily', font);
        _this.canvas.renderAll();
      }
    }).catch(function(e) {
      console.log(e);
    });
  },
changeFont:function(font, i){
    this.loadAndUse(i, font);
  },
changeCarvingFont:function(font, i){
    this.loadAndUseCarving(i, font);
  },
checkQuantity: function(ctext, str_min, str_max){/* 数量检查 */
    var on_off = 0;
    if(ctext == ''){
      return on_off = 1;
    }
    if(ctext.length<str_min){
      return on_off = 1;
    }
    if(ctext.length>str_max){
      return on_off = 1;
    }
    return on_off;
  }
});
_colorMagic.prototype.constructor = _colorMagic;
return _colorMagic;
})(fabric);