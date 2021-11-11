(function () {
  var customModal, originImg;
  var param = {};
  var customModal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeLabel: "",
    //closeMethods: ['button'],
    //closeLabel: "Close11",
    //cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
      console.log('modal open');
    },
    onClose: function() {
      jQuery("#ucpic").val("");
      jQuery("#zcloading").css('display','none');
      console.log('modal closed');
    },
    beforeClose: function() {
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
    }
  });


  customModal.setContent('<div class="canvas-box" style="height:400px;position: relative;"><img id="popimage" src="" alt="Picture"><div class="control" style="height:80px;"><button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left"><img src="//cdn.shopify.com/s/files/1/0372/6897/9848/t/31/assets/left_small.png?v=16112268083544290324"/></button><button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right"><img src="//cdn.shopify.com/s/files/1/0372/6897/9848/t/31/assets/right_small.png?v=11590145796199001876"/></button><button type="button" class="btn btn-primary" data-method="reset" title="Reset">Reset </button></div><div class="content">Design your photo on the section</div> </div>  <div id="zcloading" style="display:none;"><img src="//cdn.shopify.com/s/files/1/0372/6897/9848/t/31/assets/Loading_icon_150x.gif?v=3391187284961516108" /></div>');
 customModal.addFooterBtn('Cancel', 'btn2', function() {
      jQuery("#ucpic").val("");
      customModal.close();
    });
  customModal.addFooterBtn('Confirm', 'btn1', function() {
    var _this = jQuery(this);
    result = $image.cropper('getCroppedCanvas',{ "maxWidth": 2048, "maxHeight": 2048});
    if (result) {
      $('#previe').html(result);
      imgdata = result.toDataURL('image/jpeg');
      jQuery.ajax({
      type: "POST",
      url: "https://pic.stylelab.com/pictured/generate",
      dataType: 'json',
      data : {
        originImg: imgdata
      },
      beforeSend: function() {
        //jQuery(".tingle-btn--primary").attr('disabled',"disabled");
        //jQuery(".tingle-btn--danger").attr('disabled',"disabled");
        //jQuery("#zcloading").css('display','block'); 
        _this.addClass('hide');
        jQuery('.btn-loading').removeClass('hide');
      },
      progress: function (evt) {
        //
      },
      success: function(data){
        if(data.state==200){
          jQuery("#crop_picture").val('https://pic.stylelab.com/' + data.crop);
          jQuery("#previewpicture").attr("src",'https://pic.stylelab.com/' + data.crop);
          //jQuery(".tingle-btn--primary").attr('disabled',false);
          //jQuery(".tingle-btn--danger").attr('disabled',false);
          jQuery(".uploadafterimg1").css('display','block'); 
          jQuery("#ucpic").val("");
          // jQuery("#zcloading").css('display','none');
          jQuery("#isUpload").val(1);
          customModal.close();
        }else if(data.state==500){
        //
        }
      },
      complete: function(xhr) {
        _this.removeClass('hide');
        jQuery('.btn-loading').addClass('hide');
      }
    });
         
    }
  });
  
  customModal.addFooterBtn('<img height="24" src="//cdn.shopify.com/s/files/1/0025/6638/9873/t/17/assets/Loading_icon_150x.gif?18441663283885470557" />', 'hide btn-loading')
  
  var options = {
    dragMode: 'move',
    aspectRatio: 1 / 1,
    autoCropArea: 0.8,
    restore: false,
    guides: false,
    center: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
    //viewMode:1,
    // 60% crop size
    //autoCropArea:0.6
//      data: {
//        width: 20,
//        height: 20,
//      },
    //movable: false
  }

var $image = $('#popimage');
$image.cropper(options);
var $download = $('#download');



$(function () {
var URL = window.URL || window.webkitURL;
 
 // 换照片
  var $inputImage = $('#inputImage');
uploadedImageURL=""
  if (URL) {
    $inputImage.change(function () {
       customModal.open();
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });  
 } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }
 

});
  
  
 // Methods
  $('.control').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
              download.download = uploadedImageName;
              $download.attr('href', result.toDataURL(uploadedImageType));
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });  
  
    
  
  
})();























// var data = cropInstance.getValue();
// console.log(data);
// data = {x: 20, y: 20: width: 120, height: 120}