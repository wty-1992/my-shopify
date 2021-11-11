var start = (function(){
  var _start = function(option){
    this.picurl = "https://pic.stylelab.com/";
    this.init(option);
  }
  _start.prototype = {
    init: function(option){
      this.fileInput = $(option.id);  //筝�篌�茵���id
      this.preview = $(option.preview);  //蘂�茹���id
      this.idx = option.idx;
      this.cropperOpt = option.cropperOpt[this.idx] && option.cropperOpt[this.idx].aspectRatio;
console.log('this.cropperOpt', this.cropperOpt);
      //this.options = option;
      this.cropPicture = $(option.cropPicture);  //hiden茵���
      this.initModal(this,option.popImg); //cropper��紮���id
      this.custom_json = {};  
      this.hasNoPreview = option.hasNoPreview;
      this.setBindMethod(this);
    },
	setBindMethod: function(_this) {
	  jQuery('.docs-buttons').on('click', '[data-method]', function () {
		var $this = jQuery(this);
        var data = $this.data();
console.log('_this.ucrop', _this.ucrop);
		_this.ucrop.cropper(data.method, data.option, data.secondOption);
	  });
	},
    confirmPhoto: function(_this, result, callBack){
      LOADINGMASK.show().bgcolor('#000');
      _this.modal.close();
      //$('#previe').html(result);
      imgdata = result.toDataURL('image/png');
      var blob = convertBase64ToBlob(imgdata);                  
      $.ajax({
        type: "POST",
        url: "https://pic.stylelab.com/assist/uptoken",
        dataType: 'json',
        beforeSend: function() {
//           jQuery(".tingle-btn--primary").attr('disabled',"disabled");
//           jQuery(".tingle-btn--danger").attr('disabled',"disabled");
//           jQuery("#zcloading").css('display','block'); 
        },
        success: function(data){
          var observer = {
            next(result){
              $(".sbar").text(parseInt(result.total.percent) + "%");
              $('.sbar').css({
                'width': parseInt(result.total.percent) + '%'
              });
              //console.log(result.total.percent);
            },
            error(err){
              console.log(err.message);
            },
            complete(res1){            
              imgSrc = "https://spic.qn.cdn.imaiyuan.com/" + res1.key;                            
              jQuery(".inputImage-area #previewpicture"+_this.idx).attr("src",imgSrc);
              jQuery(".inputImage-area #previewpicture"+_this.idx).show();
              jQuery(".inputImage-area #add-photo"+_this.idx).html("Change");
              jQuery(".inputImage-area #previewpicture"+_this.idx).siblings('.span-text-upload').hide();
              arrayImg[_this.idx] = imgdata;
              jQuery("#crop_picture"+_this.idx).val(imgSrc);              
              jQuery(".tingle-btn--primary").attr('disabled',false);
              jQuery(".tingle-btn--danger").attr('disabled',false);
              jQuery(".zcloading").css('display','none');
              _this.modal.close();
              LOADINGMASK.hide().bgcolor('#fff');
              jQuery(".popbox,.tingle-modal-box__footer").show();
              jQuery(".sbar").css({'width':'0'});
              jQuery(".sbar").html('0%');
              
              //callBack(data);
//               jQuery(".tingle-btn--primary").attr('disabled',false);
//               jQuery(".tingle-btn--danger").attr('disabled',false);
//               jQuery(".zcloading").css('display','none');
//               _this.modal.close();
              
              
//               jQuery("#crop_picture").val(imgSrc);
//               jQuery("#previewpicture").attr("src", imgSrc);
//               jQuery(".tingle-btn--primary").attr('disabled',false);
//               jQuery(".tingle-btn--danger").attr('disabled',false);
//               jQuery(".uploadafterimg1").css('display','block'); 
//               jQuery("#ucpic").val("");
//               jQuery("#zcloading").css('display','none');
//               customModal.close();
            }
          };
          var putExtra = {
            fname: "",
            params: {}, 
            mimeType: null
          };
          var config = {
            region:qiniu.region.na0,
            concurrentRequestLimit:3
          };
          //var filename = new Date().Format("yyyyMMddhhmmss") + randomString(6);
          //var key = 'mycustomgifts_' + filename + '.png';
          var filename=new Date().Format("yyyyMMdd") + '/' + randomString(6);
	      var key = 'scrop/' + filename + '.png';
          var observable = qiniu.upload(blob, key, data.token, putExtra, config);
          observable.subscribe(observer);
        }
      });

      
//       jQuery.ajax({
//         type: "POST",
//         url: _this.picurl + "pictured/generate",
//         dataType: 'json',
//         data : {
//           originImg: imgdata
//         },
//         beforeSend: function() {
//           jQuery(".tingle-btn--primary").attr('disabled',"disabled");
//           jQuery(".tingle-btn--danger").attr('disabled',"disabled");
//           jQuery(".zcloading").css('display','block'); 
//         },
//         success: function(data){
//           if(data.state==200){
//             callBack(data);
//             $(".tingle-btn--primary").attr('disabled',false);
//             $(".tingle-btn--danger").attr('disabled',false);
//             //jQuery(".uploadafterimg1").css('display','block'); 
//             $(".zcloading").css('display','none');
//             _this.modal.close();
//           }else if(data.state==500){
//             //
//           }
//         }
//       });
      
    },
    confirmPhoto2: function(_this, result, type){ // type: 1:crop; 2:原图
      return new Promise((resolve, reject) => {
        if(type == 1){
          imgdata = result.toDataURL('image/png');
          var blob = convertBase64ToBlob(imgdata); 
        }else{
          var blob = result;
        }
          
          jQuery.ajax({
            type: "POST",
            url: "https://pic.stylelab.com/assist/uptoken",
            dataType: 'json',
            beforeSend: function() {

            },
            success: function(data){
              var observer = {                         
                next(result){
                  if(type == 2){
                    jQuery(".sbar").text(parseInt(result.total.percent) + "%");
                    jQuery('.sbar').css({
                      'width': parseInt(result.total.percent) + '%'
                    });
                    //console.log(result.total.percent);
                  }
                },
                error(err){                         
                  console.log(err.message);
                },
                complete(res1){    
                  resolve(res1.key);
                }
              };
              var putExtra = {
                fname: "",                          
                params: {},                         
                mimeType: null                      
              };
              var config = {
                region:qiniu.region.na0,
                concurrentRequestLimit:3
              };
              var filename = new Date().Format("yyyyMMddhhmmss") + randomString(6);
              var key = 'oldsoufeelen_' + filename + '.png';
              var observable = qiniu.upload(blob, key, data.token, putExtra, config);
              observable.subscribe(observer);
            }
          });
        });
    },
    initModal:function(_this,imgId){
      this.modal = new tingle.modal({   //custom canvas modal
        footer: true,
        stickyFooter: false,
    	cssClass: ['custom-custom-multiple'],
        onClose: function() {
          jQuery("#ucpic").val("");
          jQuery(".zcloading").css('display','none');
          //console.log('modal closed');
        },
        onOpen:function(){
          jQuery(".zcloading").css('display','none');
        }
      });
      if(imgId){
        this.modal.setContent('<div class="popbox" style="height: calc(100% - 90px); position: relative;"><img id="'+imgId+'" src="" alt="Picture"><div class="docs-buttons"><button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left"><img src="//cdn.shopify.com/s/files/1/0372/6897/9848/t/31/assets/left_small.png?v=16112268083544290324"/></button><button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right"><img src="//cdn.shopify.com/s/files/1/0372/6897/9848/t/31/assets/right_small.png?v=11590145796199001876"/></button><button type="button" class="btn btn-primary" data-method="reset" title="Reset">Reset </button></div><div class="cropcontent"></div> </div>  <div id="zcloading" class="zcloading" style="display:none;"><img class="cloadingimg" src="https://ik.imagekit.io/soufeel/en/skin/frontend/smartwave/default/images/soufeel-30.gif" /><div class="sprogress" style="display:none;"><div class="sbar" style="width: 0%;">0%</div></div></div>');
        _this.image = $('#'+imgId);
        _this.defOption = {
          viewMode: 1,
          dragMode: 'move'
        };
        _this.options = $.extend(_this.defOption, {aspectRatio: this.cropperOpt}); // ,autoCropArea:1
        //_this.image.cropper({viewMode:1, dragMode:'move', aspectRatio: 1/5});
        _this.image.cropper(_this.options);
        _this.ucrop = _this.image.cropper(_this.options);
        //$(".popbox").html($("#photoBody").contents());
      }
      this.modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--danger', function() {  //�渇�㊤執絮�
        _this.fileInput.val("");
        _this.modal.close();
      });
      this.modal.addFooterBtn('Confirm', 'tingle-btn tingle-btn--primary', function() {  //隋��photo
//         var imageData = _this.image.cropper('getImageData');
//         console.log(imageData.width, imageData.height);
//         if(imageData.width < 1500){
//           alert('current width:'+imageData.width+', recommend width>1500px, height>15px');
//           return false; 
//         }
        
        jQuery(".tingle-btn--primary").attr('disabled',"disabled");
        jQuery(".tingle-btn--danger").attr('disabled',"disabled");
        jQuery(".zcloading").css('display','flex'); 
        jQuery(".popbox,.tingle-modal-box__footer").hide();
        jQuery(".tingle-modal-box").css("background","transparent");
        result = _this.image.cropper('getCroppedCanvas',{ "maxWidth": 3500, "maxHeight": 3500});
        if (result) {
//           if(jsonCustom.isHasAi == 1){ // 直接保存原图
            window.photoDesign = !!window.photoDesign?window.photoDesign:[];
            var p1 = _this.confirmPhoto2(_this, result, 1);
            var p2 = _this.confirmPhoto2(_this, window.blobImgData, 2);
            Promise.all([p1, p2]).then(function (results) {
              console.log(results); // 获得一个Array: ['P1', 'P2']
              
              imgSrc = "https://spic.qn.cdn.imaiyuan.com/" + results[0];                            
              jQuery(".inputImage-area #previewpicture"+_this.idx).attr("src",imgSrc);
              jQuery(".inputImage-area #previewpicture"+_this.idx).show();
              jQuery(".inputImage-area #add-photo"+_this.idx).html("Change").addClass('chang_img');
              jQuery(".inputImage-area #previewpicture"+_this.idx).siblings('.span-text-upload').hide();
              window.photoDesign[_this.idx] = "https://spic.qn.cdn.imaiyuan.com/" + results[1]; // 存储原图 目前所有类型都存储原图.
              arrayImg[_this.idx] = imgdata;
              jQuery("#crop_picture"+_this.idx).val(imgSrc);              
              jQuery(".tingle-btn--primary").attr('disabled',false);
              jQuery(".tingle-btn--danger").attr('disabled',false);
              jQuery(".zcloading").css('display','none');
              _this.modal.close();
              LOADINGMASK.hide().bgcolor('#fff');
              jQuery(".popbox,.tingle-modal-box__footer").show();
              jQuery(".sbar").css({'width':'0'});
              jQuery(".sbar").html('0%');
            });

//           }else{
//             _this.confirmPhoto(_this, result,function(data){
//               _this.cropPicture.val(_this.picurl + data.crop);
//               _this.preview.attr("src",_this.picurl + data.crop).css('display','block');
//               //jQuery(".uploadafterimg1").css('display','block'); 
//   //             console.log(jQuery("#crop_picture1").val());
//   //             console.log(jQuery("#crop_picture2").val());
//   //             var val = jQuery("#crop_picture").val() && jQuery("#crop_picture2").val() ? 1 : 0;
//   //             //console.log(val);
//   //             _this.changePrice(val);
//               _this.fileInput.val("");  
//             });
//           }
        }
      }); 
    },   //initModal�醇�亥���

    initCropper:function(_this){
      var $download = $('#download');
      var URL = window.URL || window.webkitURL;

      // �∝�х��
      //var $inputImage = $('#inputImage');
      var uploadedImageURL="";
      if (URL) {
        _this.fileInput.change(function () {
          _this.modal.open();
          var files = this.files;
          var file;
console.log('_this.image', _this.image, _this.image.data('cropper'));
          if (!_this.image.data('cropper')) {
            return;
          }
          if (files && files.length) {          
            file = files[0];    
            window.blobImgData = '';
            window.blobImgData = file.slice(0, file.size); // 保存原图到变量- 暂时为单图服务   
            if (/^image\/\w+$/.test(file.type)) {
              uploadedImageName = file.name;
              uploadedImageType = file.type;
              if (uploadedImageURL) {
                URL.revokeObjectURL(uploadedImageURL);
              }
              uploadedImageURL = URL.createObjectURL(file);
              if(_this.options.hasNoPreview){
                _this.options.aspectRatio = '';
              }
              _this.image.cropper('destroy').attr('src', uploadedImageURL).cropper(_this.options);
              //_this.image.cropper('destroy').attr('src', uploadedImageURL).cropper(_this.aspectRatio);
              _this.fileInput.val('');
            } else {
              window.alert("Please choose an image file.");
            }
          }
        });  
      } else {
        _this.fileInput.prop('disabled', true).parent().addClass('disabled');
      } //�∝�х��膸���

    },  //initCropper�醇�亥���
    
    changePrice:function(val){
      $(".selector-wrapper label").each(function( index ) { 
        if(jQuery.trim(jQuery(this).text())=='TwoFace'){
          jQuery(this).next('select').val(val).trigger('change');
        }
      });
    },
//     convertBase64ToBlob:function(base64){
//       var base64Arr = base64.split(',');
//       var imgtype = '';
//       var base64String = '';
//       if(base64Arr.length > 1){
//         base64String = base64Arr[1];
//         imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
//       }
//       var bytes = atob(base64String);
//       var bytesCode = new ArrayBuffer(bytes.length);
//       var byteArray = new Uint8Array(bytesCode);

//       for (var i = 0; i < bytes.length; i++) {
//         byteArray[i] = bytes.charCodeAt(i);
//       }
//       return new Blob( [bytesCode] , {type : imgtype});
//     }
  } //start�醇�亥���
  return _start;
})();

function convertBase64ToBlob(base64){
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
}
function randomString(len){
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
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



// var cropper2 = new start({id:'#inputImage2', preview:'#previewpicture2', popImg:'popimage2', cropPicture:'#crop_picture2'});
// cropper2.initCropper(cropper2);
