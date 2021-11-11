/*
*   @author  by Coman 2018.12.06  <420500235@qq.com>
*   LAST UPDATED 2018.12.10
*   Customize the name necklace.
*/

var Uqname = (function (){
  function _uqname(jsonStr){
    this.init(jsonStr);
  }

  _uqname.prototype = Object.assign(new ubase(), {
    init:function (jsonStr){ // 变量初始化
    //   this.pdiamond = jsonStr.pdiamond || 0;
      this.tertiusType = jsonStr.json.tertiusType || '';
      this.secondType = jsonStr.json.secondtype || '';
      this.lines = jsonStr.json.lines || '';
      this.specialSymbol = jsonStr.json.specialSymbol || '';
      this.textType = jsonStr.json.textType || '';
      this.supportLanguage = jsonStr.json.supportLanguage || '';
      this.ischange = jsonStr.json.ischange || '';
      this.fontfamily = jsonStr.fontfamily || 'BrushScriptStd';
      this.class = jsonStr.json.class || 'silver';
      this.textInfo = jsonStr.json.text || [];
      this.text = [];
      this.setObject();         
    },
    setObject: function(_this=this){ // 设置对象
      _this.textInfo.forEach(function(v,i){
          _this.text[i] = {};
          _this.text[i].config = v;
      });
    },
    process: function(str, i){ // 过滤输入框 
        str = this.text[i].text = this.checkTextType(str);
        console.log('this.secondType', this.secondType);
        if(this.secondType == 'MonogramsThree'){ // 三个
            this.text[i].showText = this.text[i].text = this.convertMonogram(str); 
        }else if(this.secondType == 'MonogramsFive'){ // 五个
            this.text[i].showText = this.convertMonogramFive(str);
            this.text[i].text = ((str[0]||'')+(str[1]||'')).toLowerCase()+(str[2].toUpperCase()||'')+((str[3]||'')+(str[4]||'')).toLowerCase();
        }else if(this.secondType == 'CircleThree'){ // 三个
            this.text[i].showText = this.convertCircleThree(str);
            this.text[i].text = (str[0]?str[0].toLowerCase():'')+(str[1]?str[1].toUpperCase():'')+(str[2]?str[2].toLowerCase():'');
        }else if(this.secondType == 'CircleTwo'){ // 两个
            this.text[i].showText = this.text[i].text = this.convertCircleTwo(str);
        }else if(this.secondType == 'HollowOut'){ // 全大写
            this.text[i].showText = this.text[i].text = str.toUpperCase();
        }else if(this.secondType == 'Any'){ // 无限制
            this.text[i].showText = this.text[i].text = this.tertiustypeSetval(str);
        }else {  
            this.text[i].showText = this.text[i].text = (str.charAt(0)?str.charAt(0).toUpperCase():'')+(str.substr(1)?str.substr(1):'');  
            this.text[i].showText = this.text[i].text = this.tertiustypeSetval(this.text[i].text);     
        }
        this.text[i].showText = this.replaceShowtext(this.text[i].showText);
        this.text[i].showText = this.lastVariationTransformEn(this.text[i].showText);
        this.text[i].showText = this.showtextSpecialSymbol(this.text[i].showText, i);
    },
    tertiustypeSetval: function (text){ // 大小写 or 首字母大写
        return this.tertiusType == 'initialUpper'?this.initialUpper(text):(this.tertiusType == 'upperCase'?text.toUpperCase():text);
    },
    checkTextType: function (val){  // 检查输入框
        if(this.textType == 1){ //允许输入字母/小语种
          val = val.replace(/[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀàÇÊËçêëáÁãÃàÀâÂçÇéÉêÊíÍóÓõÕòÒôÔúÚùÙûÛäÄöÖüÜßßñÑèÈëËïÏîÎœŒ]/g, "");
        }else if(this.textType == 2){ //只允许输入英语和法语
          val = val.replace(/[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàÀâÂçÇéÉèÈêÊëËïÏîÎôÔùÙûÛœŒ]/g, "");
        }else if(this.textType == 3){ //只允许输入英文字母
          val = val.replace(/[^a-zA-Z]/g, "");
        }else if(this.textType == 4){ //只允许输入阿拉伯文
          val = val.replace(/[^ؠءآأؤإئابةتثجحخدذرزسشصضطظعغػؼؽؾؿـفقكلمنهوىيپٿڀځڂڃڄڅچڇڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙښڛڜڝڞڟڠڡڢڣڤڥڦڧڨکڪګڬڭڮگڰڱڲڳڴڵڶڷڸڹںڻڼڽھڿۀہۂۃۄۅۆۇۈۉۊۋیۍێۏېۑےۓۮۯ]/g, ""); 
        }else if(this.textType == 5){ //允许输入阿拉伯和英文
          val = val.replace(/[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZؠءآأؤإئابةتثجحخدذرزسشصضطظعغػؼؽؾؿـفقكلمنهوىيپٿڀځڂڃڄڅچڇڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙښڛڜڝڞڟڠڡڢڣڤڥڦڧڨکڪګڬڭڮگڰڱڲڳڴڵڶڷڸڹںڻڼڽھڿۀہۂۃۄۅۆۇۈۉۊۋیۍێۏېۑےۓۮۯ]/g, ""); 
        }
        return val;
      },
    replaceShowtext: function (val){ // 替换显示区域
      var specialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      if(this.supportLanguage == '' || this.supportLanguage == 1 || this.supportLanguage == 3 || this.supportLanguage == 4){
        var specialJson = {};
        if(this.supportLanguage == 4){
            val = val.replace(/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, "");
        }
      }else if(this.supportLanguage == 0){
        var specialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      }else if(this.supportLanguage == 2){
        var specialJson = {'á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      }
      var newshowtextval = '';
      for(var i=0;i<val.length;i++){
        if(typeof specialJson[val.charAt(i)] == 'undefined'){
          newshowtextval += val.charAt(i);
        }else{
          newshowtextval += specialJson[val.charAt(i)];
        }
      }
      if($.trim(newshowtextval) != ''){
        val = newshowtextval;
      }
      return val;
    },
    showtextSpecialSymbol: function (val, i){ // 显示区域特殊符号
      if(this.specialSymbol=='<' || this.specialSymbol=='.' || this.specialSymbol==','){
        val = this.specialSymbol=='.'&&i==0?val:this.specialSymbol+val;
      }
      if(this.specialSymbol=='()' || this.specialSymbol=='[]' || this.specialSymbol=='{}' || this.specialSymbol=='-+'){
        val = $.trim(val)==''?'':this.specialSymbol[0]+val+this.specialSymbol[1];
      }
      return val;
    },
    lastVariationTransformEn: function (val){ // 末尾字符替换
      var lastSpecialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      if(val.length > 1){
        var _showtextval = val.charAt(val.length-1);
        if(lastSpecialJson[_showtextval] != undefined){
            val = val.substr(0,val.length-1) + lastSpecialJson[_showtextval];
            return val;
        }
        if(this.ischange == 1){
          var fontArr = {'a':'1','b':'2','c':'3','d':'4','e':'5','f':'6','g':'7','h':'8','i':'9','j':'0','k':'!','l':'@','m':'#','n':'$','o':'%','p':'^','q':'&','r':'*','s':'(','t':')','u':'-','v':'+','w':'[','x':']','y':'?','z':';'};
          if(typeof fontArr[_showtextval] != 'undefined'){
            val = val.substr(0,val.length-1) + fontArr[_showtextval];
            return val;
          }
        }
      }
      return val;
    },
    convertCircleTwo: function (str){
      return (str[0]?str[0].toLowerCase():'')+(str[1]?str[1].toUpperCase():'');
    },
    convertCircleThree: function (str){
      return (str[0]?str[0].toLowerCase():'')+(str[1]?str[1].toUpperCase():'')+(str[2]?this.convertChar(str[2]):'');
    },
    convertMonogram: function (str){            
      return (str[0]?str[0].toLowerCase():'')+(str[1]?str[1].toUpperCase():'')+(str[2]?str[2].toLowerCase():'');
    },
    initialUpper: function (str){
      return (str.substr(0, 1)?str.substr(0, 1).toUpperCase():'')+(str.substr(1)?str.substr(1).toLowerCase():'');
    },
    convertChar: function (str){
      var specialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
      if(specialJson[str] != undefined){str = specialJson[str];}
//       var mono = {"A":"1","B":"2","C":"3","D":"4","E":"5","F":"6","G":"7","H":"8","I":"9","J":"0","K":"!","L":"@","M":"#","N":"$","O":"%","P":"^","Q":"&","R":"*","S":"(","T":")","U":"-","V":"=","W":"[","X":"]","Y":"|","Z":":"};
      var mono = {"A":"1","B":"2","C":"3","D":"4","E":"5","F":"6","G":"7","H":"8","I":"9","J":"0","K":"!","L":"@","M":"#","N":"$","O":"%","P":"^","Q":"&","R":"*","S":"(","T":")","U":"-","V":"+","W":"[","X":"]","Y":"?","Z":";"};
      return mono[str.toUpperCase()];
    },
    convertMonogramFive: function (str){
      var fontArr = {'a':'1','b':'2','c':'3','d':'4','e':'5','f':'6','g':'7','h':'8','i':'9','j':'0','k':'!','l':'@','m':'#','n':'$','o':'%','p':'^','q':'&','r':'*','s':'(','t':')','u':'-','v':'+','w':'[','x':']','y':'\\','z':';'};
      return (str[0]?fontArr[str[0]]:'')+(str[1]?str[1].toLowerCase():'')+(str[2]?str[2].toUpperCase():'')+(str[3]?str[3].toLowerCase():'')+(str[4]?fontArr[str[4]]:'');
    },
      
    setInputVal: function(i){
      var specialSymbol = this.specialSymbol; // 特殊符号
      var alphaTextVal = '';						// 表单存储值
      if(i == 1){
        var ctext = Uqname.text[0].text;
        if(specialSymbol){
          if(specialSymbol == '='){
            ctext = ctext+specialSymbol;
          }else if(specialSymbol == '()' || specialSymbol == '[]' || specialSymbol == '{}' || specialSymbol == '-+'){
            ctext = $.trim(ctext)==''?'':specialSymbol[0] + ctext + specialSymbol[1];
          }else{
            ctext = specialSymbol+ctext;
          }
        }
        if(jsonCustom.ischange){
          var lastSpecialJson = {'à':'a','À':'A','â':'a','Â':'A','ç':'c','Ç':'C','é':'e','É':'E','ê':'e','Ê':'E','è':'e','È':'E','ë':'e','Ë':'E','ï':'i','Ï':'I','î':'i','Î':'I','ô':'o','Ô':'O','ù':'u','Ù':'U','û':'u','Û':'U','œ':'oe','Œ':'OE','á':'a','Á':'A','ã':'a','Ã':'A','í':'i','Í':'I','ó':'o','Ó':'O','õ':'o','Õ':'O','ò':'o','Ò':'O','ú':'u','Ú':'U','ä':'a','Ä':'A','ü':'u','Ü':'U','ß':'ss','ß':'ss','ñ':'n','Ñ':'N','ö':'o','Ö':'O'};
          if(ctext.length > 1){
            var lastctextval = ctext.charAt(ctext.length-1);
            if(lastSpecialJson[lastctextval] != undefined){
              ctext = ctext.substr(0,ctext.length-1) + lastSpecialJson[lastctextval];
            }
          }
        }
        alphaTextVal = ctext;
      }else if(i == 2){
        var ctext = [Uqname.text[0].text, Uqname.text[1].text];
        if(specialSymbol){
          if(specialSymbol == '/'){
            ctext = Uqname.text[1].text.length > Uqname.text[0].text.length?[Uqname.text[1].text, Uqname.text[0].text]:ctext;
            if(ctext[0].length%2 == 1){
              var strLocation = (ctext[0].length-1)/2;
            }else{
              var strLocation = ctext[0].length/2;
            }
            if(ctext[1].length%2 == 1){
              var strLocation2 = (ctext[1].length-1)/2;
            }else{
              var strLocation2 = ctext[1].length/2;
            }
            ctext[0] = ctext[0].substr(0, strLocation)+'/'+ctext[0].substr(strLocation);
            ctext[1] = ctext[1].substr(0, strLocation2)+'/'+ctext[1].substr(strLocation2);
            specialSymbol = '|';
          }
          alphaTextVal = ctext[0]+specialSymbol+ctext[1];
        }else{
          alphaTextVal = ctext[0]+'|'+ctext[1];
        }
      }else if(i > 2){
        for(var n=0;n<i;n++){
          alphaTextVal += n>0?'|'+Uqname.text[n].text:Uqname.text[n].text;
        }
//       }else if(i == 3){
//         alphaTextVal = Uqname.text[0].text+'|'+Uqname.text[1].text+'|'+Uqname.text[2].text;
//       }else if(i == 4){
//         alphaTextVal = Uqname.text[0].text+'|'+Uqname.text[1].text+'|'+Uqname.text[2].text+'|'+Uqname.text[3].text;
      }
      return alphaTextVal;
    },
    checkQuantity: function(ctext, str_min, str_max){
      /* 数量限制 */
      var on_off = 0;
      if(ctext == ''){
        console.log('empty');
        return on_off = 1;
      }
      if(ctext.length<str_min){
        console.log('str_min');
        return on_off = 1;
      }
      if(ctext.length>str_max){
        console.log('str_max');
        return on_off = 1;
      }
      return on_off;
    }
  });

  return _uqname;
})();