var ucarving = (function(fabric){
  function _uqcarving(options){
    this.cdir   = "img/textdesign/";
  	this.init(options);
  }
  _uqcarving.prototype = Object.assign(new ubase(), {
    init: function(options){
      this.canvas = new fabric.Canvas(options['canvasid']);
      this.cWidth   = options.cWidth  || 500;
      this.cHeight  = options.cHeight || 400;
      this.coors    = options.custom.coors || 150;
      this.imgIn    = options.in    ? this.picurl + this.cdir + options.in  : false;
      this.imgOut   = options.out   ? this.picurl + this.cdir + options.out : false;
      this.sku      = options.sku  || '';
      this.type     = options.type || '';
	    this.isOption = options.custom.isOption || '0';
      this.defaultText = options.defaultText || '';
      this.defaultFamily = options.defaultFamily || 'TimesNewRoman';
      this.defaultSize = options.defaultSize || 30;
      this.text = [];
      this.setCanvaSize();
      this.setObject(this, this.imgIn, this.imgOut);
      this.canvas.selection = false;
    },
    setObject: function(_this, imgIn, imgOut, existText = 0){
      _this.canvas.setOverlayImage(imgOut+'?'+Math.random(), _this.canvas.renderAll.bind(_this.canvas), {
        scaleX: _this.scale,
        scaleY: _this.scale,
        crossOrigin: 'anonymous'
      });
      _this.canvas.setBackgroundImage(imgIn+'?'+Math.random(), _this.canvas.renderAll.bind(_this.canvas), {
        scaleX: _this.scale,
        scaleY: _this.scale,
        backgroundImageOpacity: 1,
        backgroundImageStretch: false,
        crossOrigin: 'anonymous'
      });
      if(existText!=0){return;}
      _this.coors.forEach(function(v,i){
        var angle = v.angle || 0;
		    var size = v.size || 30;
        // if(v.direction=='vertical'){
        //   _this.defaultText = _this.textToVertical(_this.defaultText);
        // }
        _this.text[i] = new fabric.Text('', {originX: 'center',originY: 'center', left: v.left * _this.scale, top: v.top * _this.scale, angle: angle, hasControls: false, borderColor: '#EEE', borderDashArray: [5, 10], fontSize: size,'fill': v.textColor || "#000" });
        _this.text[i].setShadow({
            color: v.shadowColor,
            blur: -10,
            offsetX: 1.5,
            offsetY: 1.5
        });
        if(v.banDrag == 1){
            _this.text[i].lockMovementX = true;
            _this.text[i].lockMovementY = true;
            _this.text[i].set('borderScaleFactor', 0);
        }
        _this.canvas.add(_this.text[i]);
        _this.canvas.renderAll();
      })
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
    loadAndUse: function(_this, i, font){
      var myfont = new FontFaceObserver(font)
      myfont.load()
      .then(function() {
        var obj = _this.text[i];
        if(obj){
          obj.set('fontFamily', font);
          _this.canvas.renderAll();
        }
      }).catch(function(e) {
        console.log('error: ', e);
      });
    },
    changeFont: function(i, font){
      this.loadAndUse(this, i, font);
    },
    changeSize: function(i, size){
      var obj = this.text[i];
      if(obj){
        obj.set('fontSize', size);
        this.canvas.renderAll();
      }
    },
    changeText: function(text, i){
	  var obj = this.text[i];
      if(obj){
        if(this.coors[i].direction=='vertical'){
          text = this.textToVertical(text);
        }
        obj.set('text', text);
        this.canvas.renderAll();
      }
    },
    convertChar: function (str){
      var specialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      if(specialJson[str] != undefined){str = specialJson[str];}
      var mono=new Array();
      mono['A']="1";
      mono['B']="2";
      mono['C']="3";
      mono['D']="4";
      mono['E']="5";
      mono['F']="6";
      mono['G']="7";
      mono['H']="8";
      mono['I']="9";
      mono['J']="0";
      mono['K']="!";
      mono['L']="@";
      mono['M']="#";
      mono['N']="$";
      mono['O']="%";
      mono['P']="^";
      mono['Q']="&";
      mono['R']="*";
      mono['S']="(";
      mono['T']=")";
      mono['U']="-";
      mono['V']="=";
      mono['W']="[";
      mono['X']="]";
      mono['Y']="|";
      mono['Z']=":";
      return mono[str.toUpperCase()];
  },
	wrapCanvasText: function(t, canvas, fontFamily, fontSize, maxW, maxH){
      if (typeof maxH === "undefined") {
        maxH = 0;
      }

      // var words = t.text.split(" ");
      var words = t.split(" ");
      var formatted = '';

      // clear newlines
      // var sansBreaks = t.text.replace(/(\r\n|\n|\r)/gm, "");
      var sansBreaks = t.replace(/(\r\n|\n|\r)/gm, "");
      // calc line height
      var lineHeight = new fabric.Text('sdfsdf', {
        fontFamily: fontFamily,
        fontSize: 25 //t.fontSize
      }).height;

      // adjust for vertical offset
      var maxHAdjusted = maxH > 0 ? maxH - lineHeight : 0;
      var context = canvas.getContext("2d");


      context.font = fontSize + "px " + fontFamily;
      var currentLine = "";
      var breakLineCount = 0;

      for (var n = 0; n < words.length; n++) {

        var isNewLine = currentLine == "";
        var testOverlap = currentLine + ' ' + words[n];

        // are we over width?
        var w = context.measureText(testOverlap).width;

        if (w < maxW) { // if not, keep adding words
          currentLine += words[n] + ' ';
          formatted += words[n] += ' ';
        } else {

          // if this hits, we got a word that need to be hypenated
          if (isNewLine) {
            var wordOverlap = "";

            // test word length until its over maxW
            for (var i = 0; i < words[n].length; ++i) {

              wordOverlap += words[n].charAt(i);
              var withHypeh = wordOverlap + "-";

              if (context.measureText(withHypeh).width >= maxW) {
                // add hyphen when splitting a word
                withHypeh = wordOverlap.substr(0, wordOverlap.length - 2) + "";  //»Ø³µ·Ö¸ô
                // update current word with remainder
                words[n] = words[n].substr(wordOverlap.length - 1, words[n].length);
                formatted += withHypeh; // add hypenated word
                break;
              }
            }
          }
          n--; // restart cycle
          formatted += '\n';
          breakLineCount++;
          currentLine = "";
        }
        if (maxHAdjusted > 0 && (breakLineCount * lineHeight) > maxHAdjusted) {
          // add ... at the end indicating text was cutoff
          formatted = formatted.substr(0, formatted.length - 3) + "...\n";
          break;
        }
      }
      // get rid of empy newline at the end
      formatted = formatted.substr(0, formatted.length - 1);

      return formatted;
    }
  });
  _uqcarving.prototype.constructor = _uqcarving;
  return _uqcarving;
})(fabric);