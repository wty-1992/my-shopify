

/*
  Shop 全局变量
*/
Shop = Object.assign({
  settings:  {"color_text":"#333333","input_bg":"#f8f8f8","input_border":"#e7e7e7","color_button1_bg":"#e60044","color_button1_text":"#ffffff","color_body_bg":"#ffffff","color_body_text":"#666666","font_family1":{"error":"json not allowed for this object"},"font_size_mb":12,"font_size_pad":12,"font_size_pad_pro":12,"font_size_pc":14,"favicon":null,"mask_loading_image":null,"free_shipping_threshold":4900,"sku_prefix":"","label_filtrate":"$11.11 SHOPPING FESTIVAL,Clearance After Christmas,Cyber Monday Deals","limit_purchase_products":"6790551666874,2;6782509482170,3","show-currency-switcher":false,"currency-switcher-format":"money_with_currency_format","currency-switcher-supported-currencies":"USD CAD MXN AED SAR GBP BGN TWD HKD HRK CZK EUR HUF LVL NOK SEK CHF","currency-switcher-default":"USD","checkout_header_image":null,"checkout_logo_image":null,"checkout_logo_position":"center","checkout_logo_size":"medium","checkout_body_background_image":null,"checkout_body_background_color":"#ffffff","checkout_input_background_color_mode":"white","checkout_sidebar_background_image":null,"checkout_sidebar_background_color":"#fafafa","checkout_heading_font":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'","checkout_body_font":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'","checkout_accent_color":"#d8232f","checkout_button_color":"#091e3a","checkout_error_color":"#e32c2b","checkout_call_to_action_color":"#f4743c","checkout_use_header_image":false,"checkout_banner_background_color":"#fff","customer_layout":"customer_area"},
  currency:{

  }
}, typeof Shop === "object" ? Shop : {});

/**
* 字符串转译
*/
translation = function (str){    
  var put = document.createElement('div');
  put.innerHTML = str;
  str = put.innerText || put.textContent;
  return str;
}

/**
 * Tools 工具箱
 */
Tools = {
  
}

/*
  所有事件监听者
*/
Listener = {
  id: document,
  cart: {
    add: {
      before: "cart:add:before",
      after: "cart:add:after"
    },
    change: {
      before: "cart:change:before",
      after: "cart:change:after"
    },
    clear: {
      before: "cart:clear:before",
      after: "cart:clear:after"
    },
    refresh: "cart:refresh"
  },
  collection: {
    build:{
      after: "collection:build:after"
    }
  },
  slideWindow: {
    open: {
      before: "slide-window:open:before",
      after: "slide-window:open:after",
    },
    close: {
      before: "slide-window:close:before",
      after: "slide-window:close:after",
    }
  },
  product: {
    add:{
      before: "product:add:before"
    },
    update: {
      before: "product:update:before",
      after: "product:update:after"
    }
  },
  currency:{
    convert: {
      after: "currency:convert:after"
    }
  },
  coupon:{
    use:{
      before:'coupon:use:before',
      after:'coupon:use:after'
    }
  },
  on: function(events, callback) {
    var event = typeof(events) == 'object' ? events.join(' ') : events;
    $(this.id).on(event, callback);
  },
  trigger: function(event, params) {
    $(this.id).trigger(event, params);
  }
}

Product = {
  options: [],
  variants: [],
  validators: [],
  init: function(data) {
    let variantChange = false;
    this.variants = data.variants ? data.variants : [];
    this.variants.forEach(variant => {
      if(Shopify.urlParam('variant') == variant.id) {
        this.update(variant);
      }else{
        variantChange = true;
      }
    });
    variantChange && $('.single-option-selector').change();
  },
  verify: async function() {
    var errors = [];
    for(var i = 0; i < this.validators.length; i++){
        var validator = this.validators[i];
        var result = await validator();
        if (result instanceof Promise){
            await result.then(function(res){
                result = res;
            })
        }
        if (result !== true){
            errors.push(result);
        }
    }
    console.log(errors);
    if (errors.length > 0){
        return Promise.reject(errors);
    }else{
        return Promise.resolve();
    }
  },
  addFormToCart: function(form, callback) {
    this.verify().then(function(){
      //增加insurance勾选功能 2020.12.30 by anna
      if($(".insurance-info").length > 0 && $('#insuranceBox').is(':checked') == true){
        cateTempInsuranceHtml();
      }else{
        if($('.temp-insurance').length>0){
          $('.temp-insurance').remove();
        }
      }
      Mask.show();
      $('body').show(1, function (){
      	setTimeout(function() {
          Cart.add({
            form
          }).then((item) => {
            callback && callback();
            //增加多个包装盒产品功能 2020-12-30 anna
            if($('.multi-product-black-gift-box').length > 0){
              let multiboxProductData = getMultiboxProductData();
              if(multiboxProductData != ''){
                Cart.add(multiboxProductData);
              }
            }
            //增加insurance勾选功能 2020.12.30 by anna
            if($(".insurance-info").length > 0 && $('#insuranceBox').is(':checked') == true){
              var tempinsurance = cateTempInsurance();
              Cart.add({id: $('#insuranceBox').val(), quantity: 1, "properties[_tempInsurance]":tempinsurance});
            }

            //增加连带销售产品勾选功能 2020-12-9 alice
            if($(".product-black-related-box").length > 0 && $('#relatedProduct').is(':checked') == true){
              let realatedProductJson = getRelatedProductData();
              Cart.add(realatedProductJson).then(function(){
//                 Dialog.open('#shopify-section-cart-success')
                openPopUp();
                Mask.hide();
              })
            }else{
//               Dialog.open('#shopify-section-cart-success')
              openPopUp();
              Mask.hide();
            }

          })
        }, 50);
      });
      
          
    }).catch(function(res){
      console.log('Add to Cart Error', res);
    });
  },
  boxAddFormToCart: function(form) {
    this.verify().then(function(){
      //增加insurance勾选功能 2020.12.30 by anna
      if($(".insurance-info").length > 0 && $('#insuranceBox').is(':checked') == true){
        cateTempInsuranceHtml();
      }else{
        if($('.temp-insurance').length>0){
          $('.temp-insurance').remove();
        }
      }
      //增加vip勾选功能 2020.05.19 by anna
      if($(".product-vip-gift-box-div").length > 0 && $('#vipBox').is(':checked') == true){
        cateTempVipHtml();
      }else{
        if($('.temp-vip').length>0){
          $('.temp-vip').remove();
        }
      }
      Cart.add({
        form
      }).then((item) => {
        //增加多个包装盒产品功能 2020-12-30 anna
        if($('.multi-product-black-gift-box').length > 0){
          let multiboxProductData = getMultiboxProductData();
          if(multiboxProductData != ''){console.log(123123);
            Cart.add(multiboxProductData);
          }
        }
        //增加insurance勾选功能 2020.12.30 by anna
        if($(".insurance-info").length > 0 && $('#insuranceBox').is(':checked') == true){
          var tempinsurance = cateTempInsurance();
          Cart.add({id: $('#insuranceBox').val(), quantity: 1, "properties[_tempInsurance]":tempinsurance});
        }
        if($('#vipBox').is(':checked') == true){
          var tempvip = cateTempVip();
          Cart.add({id: $('#vipBox').val(), "properties[_tempVip]":tempvip}).then(function(){
            //增加连带销售产品勾选功能 2020-12-9 alice
            if($(".product-black-related-box").length > 0 && $('#relatedProduct').is(':checked') == true){
              let realatedProductJson = getRelatedProductData();
              Cart.add(realatedProductJson).then(function(){
                Dialog.open('#shopify-section-cart-success')
              })
            }else{
              Dialog.open('#shopify-section-cart-success')
            }
          })
        }else{
          //增加连带销售产品勾选功能 2020-12-9 alice
          if($(".product-black-related-box").length > 0 && $('#relatedProduct').is(':checked') == true){
            let realatedProductJson = getRelatedProductData();
            Cart.add(realatedProductJson).then(function(){
//               Dialog.open('#shopify-section-cart-success')
              openPopUp();
            })
          }else{
//             Dialog.open('#shopify-section-cart-success')
            openPopUp();
          }
        }
      })

    }).catch(function(res){
      console.log('Box action Add to Cart Error', res);
    })
  },
  update: function(variant, dom) {
    Listener.trigger(Listener.product.update.before, [ variant, dom ]);
    this.replaceState(variant);
    Listener.trigger(Listener.product.update.after, [ variant, dom ]);
  },
  changeOption: function(dom) {
    var elements = $(dom.form).find("select[data-option]");
    elements.each((index, element) => {
      element = $(element);
      var value = element.val();
      if(value != '') {
        element.parents('[data-select]').removeClass('validation-warning')
      }
      this.options[index] = value;
    });   
    this.variants.forEach(variant => {
      if(variant.available && this.options.toString() == variant.options.toString()) {
        this.update(variant, dom);
      }
    })
  },
  replaceState: function(variant) {
    // 修改url为variant id, 存入历史记录
    if (history.replaceState) {
      //var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      var url = window.location.href;
      var pattern = 'variant=([^&]*)';
      var replaceText = 'variant='+variant.id;
      var newurl = url.match(pattern) ? url.replace(eval('/(variant=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
      history.replaceState(null, null, newurl);
    }
  }
}

/*
 * tabs 选项卡
 */

Tabs = {
  toggle: function(container) {
    var parent = $(container).parent();
    parent.toggleClass('active');
    parent.siblings().removeClass('active');
  }
}

/*
 * 全局遮罩
 */
Mask = {
    css: {
        layer: 'font-size:1.1em;text-align:center;position:fixed;z-index:2147483647;width:100%;height:100%;left:0;top:0;background-color:rgba(255,255,255,0.5);',
        icon: 'background:url(//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_medium.gif) no-repeat scroll center;width:100%;height:100%;display:inline-block;'
    },
    show: function (parentElement = 'body') {
        if ($('[data-loading-layer="'+parentElement+'"]').length > 0){
          return;
        }
        if ($(parentElement).length == 0){
          return;
        }
        var layerCss = this.css.layer;
        if (parentElement != 'body'){
            layerCss += `width:${$(parentElement).outerWidth()}px !important;`;
            layerCss += `height:${$(parentElement).outerHeight()}px !important;`;
            if ($(parentElement).css('position') == 'fixed'){
                layerCss += `left:${$(parentElement).position().left}px !important;`;
                layerCss += `top:${$(parentElement).position().top}px !important;`;
            }else{
                layerCss += `left:${$(parentElement).offset().left}px !important;`;
                layerCss += `top:${$(parentElement).offset().top - $(document).scrollTop()}px !important;`;
            }
            $(window).bind('scroll', function() {
              if ($('[data-loading-layer]').length > 0){
                $('[data-loading-layer]').each(function() {
                    var layer = $(this).data('loading-layer');
                    if (layer != 'body'){
                        var element = $(layer)
                        var offsetTop = element.offset().top;
                        var scrollTop = $(document).scrollTop();
                        var top = offsetTop - scrollTop;
                        $(this).css('top', top + 'px');
                    }
                })
              }
            })
        }
        var loadingDom = `<div data-loading-layer="${parentElement}" style="${layerCss}"><div style="${this.css.icon}"></div></div>`;
        $('body').append(loadingDom);
    },
    hide: (parentElement = 'body') => {
        $('[data-loading-layer="'+parentElement+'"]').remove();
        /*if ($('[data-loading-layer]').length == 0){
            $(window).unbind('scroll');
        }*/
    }
}

/*
 * 全局弹层
*/
Dialog = {
  container: {},
  modal: null,
  options: {
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'escape'],
    onClose: function() {
      //destroy()
    }
  },
  open: function(container, options = {}) {
    console.log(1111111111111111111111111111111)
    this.container = $(container);
    options = Object.assign(this.options, {
      cssClass: [this.container.data('class')]
    }, options);
    this.modal = new tingle.modal(options);
    this.container.find('[data-action="close"]').click(() => {
      this.modal.close();
    });
    $(this.modal.modalBoxContent).append(this.container);
    this.container.show().removeClass('hide');
    this.modal.open();
  },
  close: function(){
    if(this.modal) {
      this.modal.close();
    }
  }
}
/*
步骤
*/
Step = {
  open:function(elArr=[],options = {}){
    options = Object.assign({
      config: {
        translatePC:"30px",
		translateMB:"20px"
      },
      custom:[]
    },options);
    if(elArr.length>0){
      console.log("测试",elArr,"----",elArr.length)
      var isL = 0;
      elArr.map(function(item,_index){
        if($(item).length>0){
          isL+=1;
        }
      })
      if(isL > 1){
        elArr.map(function(item,_index){
          var isMobile = $(window).width()>768 ? options.config.translatePC:options.config.translateMB;          
          if($(item).length > 0){
            $(item).wrap(`<div class="step-module"></div>`).parent().wrap(`<div class="step-wrapper"></div>`);
            $(item).parent().before(`
              <div class="step-count" style="transform:translateY(`+isMobile+`)">
                  <span class="procedure-num"></span>
                  <span class="across">
                      <span class="icon photofont photo-selected"></span>
                  </span>
                  <div class="step-middle"></div>
              </div>`
            );
          }
        });
      }
      if(options.custom.length>=1){
        options.custom.map(function(item,i){
          var isCustomMobile = $(window).width()>768 ? item.translatePC:item.translateMB;
          $(item.name).parent().siblings(".step-count").css("transform","translateY("+isCustomMobile+")");
        });
      };
      for(let i=0;i< $(".step-count").length;i++){
        $(".step-count").eq(i).children(".procedure-num").html(i+1);
        var a,b,h,c;
        c= $(".step-count").height();
        b=$(".step-count").eq(i).offset().top + c;
        if($(".step-count").eq(i+1).length == 1){
          a=$(".step-count").eq(i+1).offset().top;
          h= a-b;
        }
        if(i+1 < $(".step-count").length){
          $(".step-count").eq(i).children(".step-middle").height(h);
        }
      };
    }
  }
}

/*
加载更多
*/
LoadMore = {
  toLoad:function(el,options = {}){
    let items = $(el).children();
    options = Object.assign({
      count: 5,
      view:5,
      btnHTML: {},
      moreText:"view more",
      moreEndText:"end",
      isScroll:false,
      scrollLoadingImage:"https://cdn.shopifycdn.net/s/files/1/0513/9955/7272/files/loading6-pc.gif?v=1609914253"
    },options);
    if ( items.length > options.view ){
      items.slice(options.view).hide();
    }
    if(!options.isScroll){
      $(options.btnHTML).html(options.moreText);
      $(options.btnHTML).on("click",function(){
        event.preventDefault();
        var recordScrollTop = $(window).scrollTop();
        var updatedItems = items.filter(":hidden").slice(0, options.count);
        if ( updatedItems.length > 0 ) {
          updatedItems.fadeIn();
        }
        if(items.length%options.count == 0 && (items.filter(":hidden").length - options.count) == -options.count ){
          $(options.btnHTML).html(options.moreEndText);
        }
        if(updatedItems.length < options.count){
          $(options.btnHTML).html(options.moreEndText);
        };
        $(window).scrollTop(recordScrollTop);
      });
    }
    if(options.isScroll){
      $(el).css({"position":"relative","padding-bottom":"25px","margin-bottom":"100px"});
      $(".grid--no-gutters").append(`<div class="nextloading" style="display:none;position: absolute;width: 100%;bottom:5px;left: 0;text-align: center;"><img src="`+options.scrollLoadingImage+`"></div>`)
      $(window).scroll(LoadMore.throttle(()=>{
                                         
		if(($(window).scrollTop() + $(window).height()) > ($(el).offset().top + $(el).height()) && items.filter(":hidden").length > 0 ){
          $(".nextloading").fadeIn();
          setTimeout(function (){
            $(".nextloading").fadeOut();
            var recordScrollTop = $(window).scrollTop();
            var updatedItems = items.filter(":hidden").slice(0, options.count);
            if ( updatedItems.length > 0 ) {
              updatedItems.fadeIn();
            }
            $(window).scrollTop(recordScrollTop);
            
          }, 2000);
        }
      
	  },2000));
    }
  },
  throttle:function(method, mustRunDelay) {
    let timer,//计时器
      args = arguments,
      start;//出发函数时的时间
    return function loop() {
      let self = this;
      let now = Date.now();//当前时间
      if(!start)start = now;
      if(timer)clearTimeout(timer);
      if(now - start >= mustRunDelay){
        method.apply(self, args);
        start = now;
      }else {
        timer = setTimeout(function () {
          loop.apply(self, args);
        }, 50);
      }
    }
  }
}

SlideWindow = {
  cookieId: 'slide_window_',
  style: {
    'container': '',
    'mask': 'position: fixed; top: 0px; left: 0; background: #000; height: 100%; width: 100%; opacity: 0.5; z-index:2147483000;',
    'content': ' overflow: hidden; position: fixed; z-index: 2147483640;',
    'position': {
      'left': 'left:0; top:0; transition: all 0.1s;',
      'right': 'background: #fff;right:0; top:0; width:0; height:100%;',
      'bottom': 'background: #fff;left:0; bottom:0; width:100%; height:0; ',
      'top': 'background: #fff;left:0; top:0; width:100%; height:0; '
    }
  },
  clear: function(container) {
    $.cookie(this.cookieId + container, null, { expires: -1 });
  },
  open: function(container, options = {}) {
    var el = container; 
    var isClose = $.cookie(this.cookieId + el);
    if(isClose) {
      return;
    }
    options = Object.assign({
      direction: 'left',
      size: '100%',
      mask: true,
      scroll: false,
      only: false
    }, options);
    Listener.trigger(Listener.slideWindow.open.before, [ container ])
    var container = $(el);
    container.data('slide-direction', options.direction);
    container.data('slide-size', options.size);
    container.data('slide-mask', options.mask);
    container.data('slide-only', options.only);
    if (options.mask){
      $("body").append('<div data-slide-layer="mask" style="'+this.style.mask+'"></div>')
    }
    container.attr('style', this.style.content + this.style.position[options.direction]);
    if(!options.scroll) {
      if($(window).width() > 768){
        $('html').css('overflow', 'hidden');
        $('body').css({"overflow-y":"scroll","height":"100vh"});
      }else{
        $('body,html').css('overflow', 'hidden');
      }      
    }
    $('[data-slide-layer="mask"]').one('click', () => {
      this.close(el, options.only);
    }).show();
    container.one('click', '[data-slide-layer="close"]', () => {
      this.close(el, options.only);
    })
    var cssName = ['left', 'right'].indexOf(options.direction) > -1 ? 'width' : 'height';
    container.show();
    container.css(cssName, options.size);
    Listener.trigger(Listener.slideWindow.open.after, [ container ])
  },
  close: function(container) {
    Listener.trigger(Listener.slideWindow.close.before, [ container ])
    var el = container;
    var container = $(el);
    var only = container.data('slide-only') || false;
    $('[data-slide-layer="mask"]').fadeOut(0, function(){
      $(this).remove();
    });
    if(only) {
      // 有效期7天
      $.cookie(this.cookieId + el, true, { expires: 7 });
    }
    if($(window).width() > 768){
      $('html').css('overflow', 'auto');
      $('body').css({"overflow-y":"auto","height":"auto"});
    }else{
      $('body,html').css('overflow', 'auto');
    }
    container.removeData('slide-direction');
    container.removeData('slide-size');
    container.removeData('slide-mask');
    container.removeAttr('style');
    container.hide();
    Listener.trigger(Listener.slideWindow.close.after, [ container ])
  }
}

/*
  购物车功能
*/
Cart = {
  fetch: function() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/cart.js",
        dataType: "json",
        success: (cart) => {
          resolve(cart);
        },
        error: (request, status) => {
          reject(request, status);
        }
      })
    });
  },
  add: function(options = {}) {
console.log('add fnc');
    options = Object.assign({
      quantity: 1,
      mask:'body',
      refresh:true
    }, options);
    var data = options;
    if(options.form) {
      data = $(options.form).serialize()
    }
    var promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        async: false,  
        url: "/cart/add.js",
        data,
        dataType: "json",
        context: this,
        beforeSend: (request) => {
          if(options.mask) {
//             Mask.show(options.mask);
          }
          Listener.trigger(Listener.cart.add.before);
        },
        success: (item) => {
          item.quantity = options.quantity;
          Listener.trigger(Listener.cart.add.after, [ item ]);
          if(options.refresh) {
            this.refresh();
          }
          if(options.mask) {
//             Mask.hide(options.mask);
          }
          resolve(item);
        },
        error: (request, status) => {
          reject(request, status);
        }
      })
    });
    return promise;
  },
  change: function(options = {}, flag = true) {
    options = Object.assign({
      quantity:1,
      mask:'body',
      refresh:true
    }, options);
    if(options.form) {
      data = $(options.form).serialize()
    }else{
      data = options;
    }
    var promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: data,
        dataType: "json",
        context: this,
        beforeSend: (request) => {
          if(options.mask) {
//             Mask.show(options.mask);
          }
          Listener.trigger(Listener.cart.change.before);
        },
        success: (item) => {
          if(flag){
          	Listener.trigger(Listener.cart.change.after, [ item ]);
          	console.log('options.refresh', options.refresh);
          }
          if(options.refresh) {
            this.refresh();
          }
          if(options.mask) {
//             Mask.hide(options.mask);
          }
          resolve(item);
          //增加vip勾选功能 2020.05.19 by anna
          /*if(data['tempvip']){
            var line = $('#tempVip-'+data['tempvip']).attr('data-line');
            this.change({line:line,quantity:0});
          }
          //增加insurance勾选功能 2020.12.30 by anna
          if(data['tempinsurance']){
            var line = $('#tempInsurance-'+data['tempinsurance']).attr('data-line');
            this.change({line:line,quantity:0});
          }*/
        },
        error: (request, status) => {
          reject(request, status);
        }
      })
    });
    return promise;
  },
  clear: function(options = {}) {
    options = Object.assign({
      mask:'body',
      refresh:true
    }, options);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/cart/clear.js",
        dataType: "json",
        beforeSend: (request) => {
          if(options.mask) {
//             Mask.show(options.mask);
          }
          Listener.trigger(Listener.cart.clear.before);
        },
        success: (cart) => {
          Listener.trigger(Listener.cart.clear.after, [ cart ]);
          if(options.refresh) {
            this.refresh();
          }
          if(options.mask) {
//             Mask.hide(options.mask);
          }
          resolve(cart);
        },
        error: (request, status) => {
          reject(request, status);
        }
      })
    });
  },
  refresh: function(cart = null) {
    if(!cart) {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: "GET",
          url: "/cart.js",
          dataType: "json",
          success: (cart) => {
            Listener.trigger(Listener.cart.refresh, [ cart ]);
            resolve(cart);
          },
          error: (request, status) => {
            reject(request, status);
          }
        })
      });
    }else{
      return new Promise(resolve => {
        Listener.trigger(Listener.cart.refresh, [ cart ]);
        resolve(cart);
      });
    }
  }
}



/*
  优惠券
*/
Coupon = {
  data: [],
  init: function(data) {
    this.data = data;
    return this;
  },
  use: function(options = {}) {
    options = Object.assign({
      mask:'body'
    }, options);
    var code = options.code;
    if(!code) {
      throw new Error('code is required.');
    }
    return new Promise(resolve => {
      $.ajax({
        type: "GET",
        url: `https://${Shopify.shop}/discount/${code}`,
        beforeSend: (request) => {
          if(options.mask) {
            Mask.show(options.mask);
          }
          Listener.trigger(Listener.coupon.use.before);
        },
        success: () => {
          var coupon = Coupon.get(code);
          if(coupon) {
            Listener.trigger(Listener.coupon.use.after, [ coupon ]);
          }
          if(options.mask) {
            Mask.hide(options.mask);
          }
          resolve(coupon);
        },
        error: (request, status) => {
          reject(request, status);
        }
      })
    });
  },
  get:function(code){
    for (key in this.data) {
      var data = this.data[key];
      if(data.code == code) {
        return data;
      }
    }
    return false;
  }
}

/*
  货币
*/
Currency = Object.assign({
  default: Shopify.currency.active || 'USD',
  format : 'money_with_currency_format',
  moneyFormats : {
    "USD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}}"
    },
    "EUR":{
      "money_format":"{{amount}}&euro;",
      "money_with_currency_format":"{{amount}}&euro;"
    },
    "GBP":{
      "money_format":"&pound;{{amount}}",
      "money_with_currency_format":"&pound;{{amount}}"
    },
    "CAD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} CAD"
    },
    "ALL":{
      "money_format":"Lek {{amount}}",
      "money_with_currency_format":"Lek {{amount}} ALL"
    },
    "DZD":{
      "money_format":"DA {{amount}}",
      "money_with_currency_format":"DA {{amount}} DZD"
    },
    "AOA":{
      "money_format":"Kz{{amount}}",
      "money_with_currency_format":"Kz{{amount}} AOA"
    },
    "ARS":{
      "money_format":"${{amount_with_comma_separator}}",
      "money_with_currency_format":"${{amount_with_comma_separator}} ARS"
    },
    "AMD":{
      "money_format":"{{amount}} AMD",
      "money_with_currency_format":"{{amount}} AMD"
    },
    "AWG":{
      "money_format":"Afl{{amount}}",
      "money_with_currency_format":"Afl{{amount}} AWG"
    },
    "AUD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} AUD"
    },
    "BBD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} Bds"
    },
    "AZN":{
      "money_format":"m.{{amount}}",
      "money_with_currency_format":"m.{{amount}} AZN"
    },
    "BDT":{
      "money_format":"Tk {{amount}}",
      "money_with_currency_format":"Tk {{amount}} BDT"
    },
    "BSD":{
      "money_format":"BS${{amount}}",
      "money_with_currency_format":"BS${{amount}} BSD"
    },
    "BHD":{
      "money_format":"{{amount}}0 BD",
      "money_with_currency_format":"{{amount}}0 BHD"
    },
    "BYR":{
      "money_format":"Br {{amount}}",
      "money_with_currency_format":"Br {{amount}} BYR"
    },
    "BZD":{
      "money_format":"BZ${{amount}}",
      "money_with_currency_format":"BZ${{amount}} BZD"
    },
    "BTN":{
      "money_format":"Nu {{amount}}",
      "money_with_currency_format":"Nu {{amount}} BTN"
    },
    "BAM":{
      "money_format":"KM {{amount_with_comma_separator}}",
      "money_with_currency_format":"KM {{amount_with_comma_separator}} BAM"
    },
    "BRL":{
      "money_format":"R$ {{amount_with_comma_separator}}",
      "money_with_currency_format":"R$ {{amount_with_comma_separator}} BRL"
    },
    "BOB":{
      "money_format":"Bs{{amount_with_comma_separator}}",
      "money_with_currency_format":"Bs{{amount_with_comma_separator}} BOB"
    },
    "BWP":{
      "money_format":"P{{amount}}",
      "money_with_currency_format":"P{{amount}} BWP"
    },
    "BND":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} BND"
    },
    "BGN":{
      "money_format":"{{amount}} лв",
      "money_with_currency_format":"{{amount}} лв BGN"
    },
    "MMK":{
      "money_format":"K{{amount}}",
      "money_with_currency_format":"K{{amount}} MMK"
    },
    "KHR":{
      "money_format":"KHR{{amount}}",
      "money_with_currency_format":"KHR{{amount}}"
    },
    "KYD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} KYD"
    },
    "XAF":{
      "money_format":"FCFA{{amount}}",
      "money_with_currency_format":"FCFA{{amount}} XAF"
    },
    "CLP":{
      "money_format":"${{amount_no_decimals}}",
      "money_with_currency_format":"${{amount_no_decimals}} CLP"
    },
    "CNY":{
      "money_format":"&#165;{{amount}}",
      "money_with_currency_format":"&#165;{{amount}} CNY"
    },
    "COP":{
      "money_format":"${{amount_with_comma_separator}}",
      "money_with_currency_format":"${{amount_with_comma_separator}} COP"
    },
    "CRC":{
      "money_format":"&#8353; {{amount_with_comma_separator}}",
      "money_with_currency_format":"&#8353; {{amount_with_comma_separator}} CRC"
    },
    "HRK":{
      "money_format":"{{amount_with_comma_separator}} kn",
      "money_with_currency_format":"{{amount_with_comma_separator}} kn HRK"
    },
    "CZK":{
      "money_format":"{{amount_with_comma_separator}} K&#269;",
      "money_with_currency_format":"{{amount_with_comma_separator}} K&#269;"
    },
    "DKK":{
      "money_format":"{{amount_with_comma_separator}}",
      "money_with_currency_format":"kr.{{amount_with_comma_separator}}"
    },
    "DOP":{
      "money_format":"RD$ {{amount}}",
      "money_with_currency_format":"RD$ {{amount}}"
    },
    "XCD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"EC${{amount}}"
    },
    "EGP":{
      "money_format":"LE {{amount}}",
      "money_with_currency_format":"LE {{amount}} EGP"
    },
    "ETB":{
      "money_format":"Br{{amount}}",
      "money_with_currency_format":"Br{{amount}} ETB"
    },
    "XPF":{
      "money_format":"{{amount_no_decimals_with_comma_separator}} XPF",
      "money_with_currency_format":"{{amount_no_decimals_with_comma_separator}} XPF"
    },
    "FJD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"FJ${{amount}}"
    },
    "GMD":{
      "money_format":"D {{amount}}",
      "money_with_currency_format":"D {{amount}} GMD"
    },
    "GHS":{
      "money_format":"GH&#8373;{{amount}}",
      "money_with_currency_format":"GH&#8373;{{amount}}"
    },
    "GTQ":{
      "money_format":"Q{{amount}}",
      "money_with_currency_format":"{{amount}} GTQ"
    },
    "GYD":{
      "money_format":"G${{amount}}",
      "money_with_currency_format":"${{amount}} GYD"
    },
    "GEL":{
      "money_format":"{{amount}} GEL",
      "money_with_currency_format":"{{amount}} GEL"
    },
    "HNL":{
      "money_format":"L {{amount}}",
      "money_with_currency_format":"L {{amount}} HNL"
    },
    "HKD":{
      "money_format":"HK${{amount}}",
      "money_with_currency_format":"HK${{amount}}"
    },
    "HUF":{
      "money_format":"{{amount_no_decimals_with_comma_separator}}",
      "money_with_currency_format":"{{amount_no_decimals_with_comma_separator}} Ft"
    },
    "ISK":{
      "money_format":"{{amount_no_decimals}} kr",
      "money_with_currency_format":"{{amount_no_decimals}} kr ISK"
    },
    "INR":{
      "money_format":"Rs. {{amount}}",
      "money_with_currency_format":"Rs. {{amount}}"
    },
    "IDR":{
      "money_format":"{{amount_with_comma_separator}}",
      "money_with_currency_format":"Rp {{amount_with_comma_separator}}"
    },
    "ILS":{
      "money_format":"{{amount}} NIS",
      "money_with_currency_format":"{{amount}} NIS"
    },
    "JMD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} JMD"
    },
    "JPY":{
      "money_format":"&#165;{{amount_no_decimals}}",
      "money_with_currency_format":"&#165;{{amount_no_decimals}} JPY"
    },
    "JEP":{
      "money_format":"&pound;{{amount}}",
      "money_with_currency_format":"&pound;{{amount}} JEP"
    },
    "JOD":{
      "money_format":"{{amount}}0 JD",
      "money_with_currency_format":"{{amount}}0 JOD"
    },
    "KZT":{
      "money_format":"{{amount}} KZT",
      "money_with_currency_format":"{{amount}} KZT"
    },
    "KES":{
      "money_format":"KSh{{amount}}",
      "money_with_currency_format":"KSh{{amount}}"
    },
    "KWD":{
      "money_format":"{{amount}}0 KD",
      "money_with_currency_format":"{{amount}}0 KWD"
    },
    "KGS":{
      "money_format":"лв{{amount}}",
      "money_with_currency_format":"лв{{amount}}"
    },
    "LVL":{
      "money_format":"Ls {{amount}}",
      "money_with_currency_format":"Ls {{amount}} LVL"
    },
    "LBP":{
      "money_format":"L&pound;{{amount}}",
      "money_with_currency_format":"L&pound;{{amount}} LBP"
    },
    "LTL":{
      "money_format":"{{amount}} Lt",
      "money_with_currency_format":"{{amount}} Lt"
    },
    "MGA":{
      "money_format":"Ar {{amount}}",
      "money_with_currency_format":"Ar {{amount}} MGA"
    },
    "MKD":{
      "money_format":"ден {{amount}}",
      "money_with_currency_format":"ден {{amount}} MKD"
    },
    "MOP":{
      "money_format":"MOP${{amount}}",
      "money_with_currency_format":"MOP${{amount}}"
    },
    "MVR":{
      "money_format":"Rf{{amount}}",
      "money_with_currency_format":"Rf{{amount}} MRf"
    },
    "MXN":{
      "money_format":"$ {{amount}}",
      "money_with_currency_format":"$ {{amount}} MXN"
    },
    "MYR":{
      "money_format":"RM{{amount}} MYR",
      "money_with_currency_format":"RM{{amount}} MYR"
    },
    "MUR":{
      "money_format":"Rs {{amount}}",
      "money_with_currency_format":"Rs {{amount}} MUR"
    },
    "MDL":{
      "money_format":"{{amount}} MDL",
      "money_with_currency_format":"{{amount}} MDL"
    },
    "MAD":{
      "money_format":"{{amount}} dh",
      "money_with_currency_format":"Dh {{amount}} MAD"
    },
    "MNT":{
      "money_format":"{{amount_no_decimals}} &#8366",
      "money_with_currency_format":"{{amount_no_decimals}} MNT"
    },
    "MZN":{
      "money_format":"{{amount}} Mt",
      "money_with_currency_format":"Mt {{amount}} MZN"
    },
    "NAD":{
      "money_format":"N${{amount}}",
      "money_with_currency_format":"N${{amount}} NAD"
    },
    "NPR":{
      "money_format":"Rs{{amount}}",
      "money_with_currency_format":"Rs{{amount}} NPR"
    },
    "ANG":{
      "money_format":"&fnof;{{amount}}",
      "money_with_currency_format":"{{amount}} NA&fnof;"
    },
    "NZD":{
      "money_format":"${{amount}}",
      "money_with_currency_format":"${{amount}} NZD"
    },
    "NIO":{
      "money_format":"C${{amount}}",
      "money_with_currency_format":"C${{amount}} NIO"
    },
    "NGN":{
      "money_format":"&#8358;{{amount}}",
      "money_with_currency_format":"&#8358;{{amount}} NGN"
    },
    "NOK":{
      "money_format":"kr {{amount_with_comma_separator}}",
      "money_with_currency_format":"kr {{amount_with_comma_separator}} NOK"
    },
    "OMR":{
      "money_format":"{{amount_with_comma_separator}} OMR",
      "money_with_currency_format":"{{amount_with_comma_separator}} OMR"
    },
    "PKR":{
      "money_format":"Rs.{{amount}}",
      "money_with_currency_format":"Rs.{{amount}} PKR"
    },
    "PGK":{
      "money_format":"K {{amount}}",
      "money_with_currency_format":"K {{amount}} PGK"
    },
    "PYG":{
      "money_format":"Gs. {{amount_no_decimals_with_comma_separator}}",
      "money_with_currency_format":"Gs. {{amount_no_decimals_with_comma_separator}} PYG"
    },
    "PEN":{
      "money_format":"S/. {{amount}}",
      "money_with_currency_format":"S/. {{amount}} PEN"
    },
    "PHP":{
      "money_format":"&#8369;{{amount}}",
      "money_with_currency_format":"&#8369;{{amount}} PHP"
    },
    "PLN":{
      "money_format":"{{amount_with_comma_separator}} zl",
      "money_with_currency_format":"{{amount_with_comma_separator}} zl PLN"
    },
    "QAR":{
      "money_format":"QAR {{amount_with_comma_separator}}",
      "money_with_currency_format":"QAR {{amount_with_comma_separator}}"
    },
    "RON":{
      "money_format":"{{amount_with_comma_separator}} lei",
      "money_with_currency_format":"{{amount_with_comma_separator}} lei RON"
    },
    "RUB":{
      "money_format":"&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
      "money_with_currency_format":"&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
    },
    "RWF":{
      "money_format":"{{amount_no_decimals}} RF",
      "money_with_currency_format":"{{amount_no_decimals}} RWF"
    },
    "WST":{
      "money_format":"WS$ {{amount}}",
      "money_with_currency_format":"WS$ {{amount}} WST"
    },
    "SAR":{
      "money_format":"{{amount}} SR",
      "money_with_currency_format":"{{amount}} SAR"
    },
    "STD":{
      "money_format":"Db {{amount}}",
      "money_with_currency_format":"Db {{amount}} STD"
    },
    "RSD":{
      "money_format":"{{amount}} RSD",
      "money_with_currency_format":"{{amount}} RSD"
    },
    "SCR":{
      "money_format":"Rs {{amount}}",
      "money_with_currency_format":"Rs {{amount}} SCR"
    },
    "SGD":{
      "money_format":"${{amount}} SGD",
      "money_with_currency_format":"${{amount}} SGD"
    },
    "SYP":{
      "money_format":"S&pound;{{amount}}",
      "money_with_currency_format":"S&pound;{{amount}} SYP"
    },
    "ZAR":{
      "money_format":"R {{amount}}",
      "money_with_currency_format":"R {{amount}} ZAR"
    },
    "KRW":{
      "money_format":"&#8361;{{amount_no_decimals}}",
      "money_with_currency_format":"&#8361;{{amount_no_decimals}} KRW"
    },
    "LKR":{
      "money_format":"Rs {{amount}}",
      "money_with_currency_format":"Rs {{amount}} LKR"
    },
    "SEK":{
      "money_format":"{{amount_no_decimals}} kr",
      "money_with_currency_format":"{{amount_no_decimals}} kr SEK"
    },
    "CHF":{
      "money_format":"SFr. {{amount}}",
      "money_with_currency_format":"SFr. {{amount}} CHF"
    },
    "TWD":{
      "money_format":"NT${{amount}}",
      "money_with_currency_format":"NT${{amount}} TWD"
    },
    "THB":{
      "money_format":"{{amount}} &#xe3f;",
      "money_with_currency_format":"{{amount}} &#xe3f; THB"
    },
    "TZS":{
      "money_format":"{{amount}} TZS",
      "money_with_currency_format":"{{amount}} TZS"
    },
    "TTD":{
      "money_format":"${{amount}} TTD",
      "money_with_currency_format":"${{amount}} TTD"
    },
    "TND":{
      "money_format":"{{amount}} DT",
      "money_with_currency_format":"{{amount}} DT"
    },
    "TRY":{
      "money_format":"{{amount}}TL",
      "money_with_currency_format":"{{amount}}TL"
    },
    "UGX":{
      "money_format":"Ush {{amount_no_decimals}}",
      "money_with_currency_format":"Ush {{amount_no_decimals}} UGX"
    },
    "UAH":{
      "money_format":"₴{{amount}}",
      "money_with_currency_format":"₴{{amount}} UAH"
    },
    "AED":{
      "money_format":"Dhs. {{amount}}",
      "money_with_currency_format":"Dhs. {{amount}} AED"
    },
    "UYU":{
      "money_format":"${{amount_with_comma_separator}} UYU",
      "money_with_currency_format":"${{amount_with_comma_separator}} UYU"
    },
    "VUV":{
      "money_format":"${{amount}}VT",
      "money_with_currency_format":"${{amount}}VT"
    },
    "VEF":{
      "money_format":"Bs. {{amount_with_comma_separator}} VEF",
      "money_with_currency_format":"Bs. {{amount_with_comma_separator}} VEF"
    },
    "VND":{
      "money_format":"{{amount_no_decimals_with_comma_separator}}&#8363;",
      "money_with_currency_format":"{{amount_no_decimals_with_comma_separator}} VND"
    },
    "XBT":{
      "money_format":"{{amount_no_decimals}} BTC",
      "money_with_currency_format":"{{amount_no_decimals}} BTC"
    },
    "XOF":{
      "money_format":"CFA{{amount}}",
      "money_with_currency_format":"CFA{{amount}} XOF"
    },
    "ZMW":{
      "money_format":"K{{amount_no_decimals_with_comma_separator}}",
      "money_with_currency_format":"ZMW{{amount_no_decimals_with_comma_separator}}"
    }
  },
  cookie : {
    name: 'currency',
    configuration: {
      expires: 365,
      path: '/',
      domain: window.location.hostname
    },
    write: function(currency) {
      $.cookie(this.name, currency, this.configuration);
    },
    read: function() {
      return $.cookie(this.name);
    },
    destroy: function() {
      $.cookie(this.name, null, this.configuration);
    }
  },
  formatMoney: function(cents, format) {
    format = format ? format : this.moneyFormats[this.cookie.read()][this.format];
    return Shopify.formatMoney(cents, format || '{{amount}}' );
  },
  convertAll : function(newCurrency = this.default, oldCurrency = this.default) {            
    $('[data-money]').each((index, dom) => {
      var element = $(dom);
      // 货币转换是正数
      var money = this.convert(Math.abs(element.data('money')), oldCurrency, newCurrency);
      var amount = this.formatMoney(money, this.moneyFormats[newCurrency][this.format] || '{{amount}}');
      if(newCurrency == 'EUR' ){
        element.html(amount.replace('.',','));
      }else{
        element.html(amount);
      }
      
    });
    this.cookie.write(newCurrency);
    Listener.trigger(Listener.currency.convert.after, [ oldCurrency, newCurrency ]);
  }
}, typeof Currency === "object" ? Currency : {});


/**
 * @author ledon
 * @time 2018.01.24
 * 营销相关 
 */
Market = {

  utm: {},

  //parse url
  parseURL:function(url) {
      var a = document.createElement('a');
      a.href = url;
      return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
          var ret = {};
          var seg = a.search.replace(/^\?/,'').split('&');
          var len = seg.length;
          var s;
          for (i = 0;i<len;i++) {
            if (!seg[i]) { 
              continue; 
            }
            s = seg[i].split('=');
            ret[s[0]] = s[1];
          }
          return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
      };
  },
  //check is empty
  empty:function(object) {
      for (var key in object){
        return false;
      }
      return true;
  },
  //utms params
  getUtm:function() {
    [
      'utm_source',
      'utm_medium',
      'utm_term',
      'utm_content',
      'utm_campaign',
      'utm_material'
    ].forEach(key => {
      this.utm[key] = Shopify.urlParam(key);
    });
    // 通过内容分析渠道来源
    this.utm.channel = this.getChannel();
    return this.utm;
  },
  //adwords channel
  getChannel:function() {
      var referrer = document.referrer;
      var channel = null;
      if(referrer) {
        var host = this.parseURL(referrer).host;
        var channels = {
          "google." : "Google",
          "googleads." : "googlecpc",
          "facebook." : "Facebook",
          "instagram." : "Instagram",
          "google." : "Google",
          "youtube." : "Youtube",
          "pinterest." : "Pinterest",
          "twitter." : "Twitter",
          "460." : "460.io",
          "mail" : "Email",
          "shareasale." : "sas",
          "cj." : "sas",
          "mopubi." : "sas",
          "admitad." : "sas",
          "ichannels." : "sas"
        };
        Object.keys(channels).forEach(function(index) {
          key = index.replace(/\./, "\\.");
          var regExp = new RegExp(key, 'i');
          if(regExp.test(host)) {
            channel = channels[index];
          }
        });
      }

      if(!channel) {
        var utm = this.utm;
        
        if(utm['utm_source']) {
          var utmSource = {
            "alliance" : "sas",
            "kol" : "Influencer"
          };
          var value = utmSource[utm['utm_source'].toLowerCase()];
          if(value) {
            channel = value;
          }
        }
        if(utm['utm_content']) {
          var utmContent = {
            "bl" : "blog"
          };
          var value = utmContent[utm['utm_content'].toLowerCase()];
          if(value) {
            channel = value;
          }
        }
        if(utm['utm_campaign']) {
          var utmCampaign = {
            "snap" : "Snapchat"
          };
          var value = utmCampaign[utm['utm_campaign'].toLowerCase()];
          if(value) {
            channel = value;
          }
        }
      }
      return channel;
  },
  //all adwords params
  init:function() {
    var cookietime = new Date();
    cookietime.setTime(cookietime.getTime() + (30 * 24 * 60 * 60 * 1000));

    //save utm
    this.utm = this.getUtm();
    // utm_source 一定存在就进行utm存储
    if(this.utm['utm_source']) {
      $.cookie('utm', JSON.stringify(this.utm), { path:'/', expires:cookietime });
    }
  } 
};

Template = {
  init:function() {
    var templates = $("[data-template]");
    templates.each(function() {
      var container = $(this).data('template');
      if(container) {
        var compile = Handlebars.compile($(container).html());
        $(this).empty().append(compile(Shop.settings));
      }
    });
  },
  register: function() {
    // 等于
    Handlebars.registerHelper("if_eq", function(first, last, opt) {
      if (first === last){
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });

    // 不等于
    Handlebars.registerHelper("if_neq", function(first, last, opt) {
      if (first !== last){
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });

    // 大于等于
    Handlebars.registerHelper("if_gteq", function(first, last, opt) {
      if (first >= last){
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });

    // 大于
    Handlebars.registerHelper("if_gt", function(first, last, opt) {
      if (first > last) {
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });


    // in array
    Handlebars.registerHelper("if_in", function(first, arr, opt) {
      arr = arr.split(",");
      if (arr.indexOf(first) > -1){
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });

    Handlebars.registerHelper("indexOf", function(str, text, opt) {
      if (str.indexOf(text) > -1){
        return opt.fn(this);
      }else{
        return opt.inverse(this);
      }
    });
  }
}

// Handlebars register methods
Template.register();

$(document).ready(function() {
  Market.init();
  Template.init();
});
