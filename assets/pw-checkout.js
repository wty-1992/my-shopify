function crC(e, t, s) {
    if (s) {
        var n = new Date;
        n.setTime(n.getTime() + 60 * s * 1e3);
        var i = "; expires=" + n.toUTCString()
    } else i = "";
    document.cookie = e + "=" + t + i + "; path=/"
}

function rdC(e) {
    for (var t = e + "=", s = document.cookie.split(";"), n = 0; n < s.length; n++) {
        for (var i = s[n];
            " " == i.charAt(0);) i = i.substring(1, i.length);
        if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
    }
    return null
}

function eSC(e) {
    crC(e, "", -1)
}

function stTM(e, t, s) {
    var n, i, d;

    function a() {
        n = t - ((Date.now() - e) / 1e3 | 0), d = n % 60 | 0, i = (i = n / 60 | 0) < 10 ? "0" + i : i, d = d < 10 ? "0" + d : d, s.textContent = i + ":" + d, n <= 0 && (clearInterval(c), document.getElementById("ct836").innerHTML = "Order reservation ended.", e = Date.now() + 1e3)
    }
    a();
    var c = setInterval(a, 1e3)
}


function hideFooter() {
  if (document.querySelector('.step__footer__previous-link')) {
    document.querySelector('.step__footer__previous-link').style.display = 'none';
  }
}
function hideLogin() {
  if (document.querySelector('p.layout-flex__item')){
      document.querySelector('p.layout-flex__item').style.display = 'none';
  }
}
function hideDiscount() {
  var discountDiv = document.querySelector(".section--reductions");
  if(discountDiv) {
    discountDiv.style.display = "none";
  }
  var summaryDiscountDiv = document.querySelector(".order-summary__section--discount");
  if(summaryDiscountDiv) {
    summaryDiscountDiv.style.display = "none";
  }
}
function hidePaypalExpress() {
    var alternativePayments = document.querySelector('[data-alternative-payments]');
    if(alternativePayments) {
      alternativePayments.style.display = "none";
    }
}
function process() {
  if ((new RegExp(/\/checkouts\//)).exec(window.location.href)){
      if (document.querySelector(".section--shipping-method > .section__header") && !document.querySelector("#shipping-method-after")){
          var ShippingMethodAfter = document.createElement('div');
          ShippingMethodAfter.setAttribute('id', 'shipping-method-after')
          document.querySelector(".section__header").after(ShippingMethodAfter)

          ShippingMethodAfter.innerHTML = '<p>We highly recommend you to select <b>"Shipping Insurance"</b> option, as we will reship your package immediately at no extra charge if it’s reported lost or damaged.</p>'
          ShippingMethodAfter.style.color = "#637381"
          ShippingMethodAfter.style.marginBottom = "1em"

          document.querySelector(".section__header").after(ShippingMethodAfter)
      }
      if (document.querySelector(".order-summary__section.order-summary__section--discount")){
          var OrderSummaryBefore = document.createElement('div');
          OrderSummaryBefore.setAttribute('id', 'order-summary-before')

          OrderSummaryBefore.innerHTML = "<div>didn't include shipping costs</div><p>$3 OFF $29+ Code: <b><font color='red'>ds3</font></b><br>$5 OFF $49+ Code: <b><font color='red'>ds5</font></b><br>$8 OFF $69+ Code: <b><font color='red'>ds8</font></b></p>"
          OrderSummaryBefore.style.color = "#637381"
          OrderSummaryBefore.style.marginBottom = "1em"

          document.querySelector(".order-summary__section.order-summary__section--discount > h3").before(OrderSummaryBefore)
      }
      if (document.querySelector(".section.section--reductions.hidden-on-desktop")){
          var OrderSummaryBefore = document.createElement('div');
          OrderSummaryBefore.setAttribute('id', 'order-summary-before-desktop')

          OrderSummaryBefore.innerHTML = "<div>didn't include shipping costs</div><p>$3 OFF $29+ Code: <b><font color='red'>ds3</font></b><br>$5 OFF $49+ Code: <b><font color='red'>ds5</font></b><br>$8 OFF $69+ Code: <b><font color='red'>ds8</font></b></p>"
          OrderSummaryBefore.style.color = "#637381"
          OrderSummaryBefore.style.marginBottom = "1em"

          document.querySelector('.section.section--reductions.hidden-on-desktop > .section__header').before(OrderSummaryBefore)
      }
  }
 

  
  document.querySelectorAll(".product__description__property.order-summary__small-text").forEach(dom => {
      const domRes = /^(\w+):\s+(.*?)$/.exec(dom.innerHTML.trim());
      if (domRes) {
        if (["crop", "engraving","picture"].indexOf(domRes[1]) > -1){
          var html = "";
          if (domRes[2].indexOf('/uploads/') > -1){
              html += '<a href="'+domRes[2]+'">'+domRes[2]+'</a>'
          }else{
            if (domRes[2].indexOf('/custom_product_photos/') > -1){
              html += '<div class="uploadafterimgcart1"><img src="'+domRes[2]+'" width="65" /></div>'
            }else{
              html += domRes[2];
            }
          }
          dom.innerHTML = html
        }else{
          dom.style.display = "none";
        }
      }
      const domAttrRes = /^(\w+-\w+):\s+(.*?)$/.exec(dom.innerHTML.trim());
      if (domAttrRes){
        dom.style.display = "none";
        dom.innerHTML = '<b>'+domAttrRes[1]+': </b>' + domAttrRes[2];
      }
  })

  if (document.querySelectorAll("td.product__image").length > 0){
      document.querySelectorAll("td.product__image").forEach(dom => {
          dom.setAttribute("valign", "top");
      })
  }

  if (document.querySelector('ul.breadcrumb')) {
      document.querySelector('ul.breadcrumb').style.fontSize = "16px";
  }
}
function run() {
  
  // web html style
  var pSettings = {
      progressBg: '#23468c',
      progressBg2: '#d9e3f7',

      highDemandText: "An item you ordered is in high demand. No worries, we have reserved your order.",
      discountText: "Enter your discount code here",

      whyUsImg1: 'https://cdn.shopify.com/s/files/1/1319/2435/t/4/assets/money-back.png',
      whyUsTitle1: "30-day Satisfaction guarantee with Money Back",
      whyUsText1: "If you're not satisfied with your products we will issue a full refund, no questions asked.",

      whyUsImg2: 'https://cdn.shopify.com/s/files/1/1319/2435/t/4/assets/mail-truck.png',
      whyUsTitle2: "Over $49 successfully shipped orders",
      whyUsText2: "We made as much happy customers as many orders we shipped. You simply have to join our big family.",
  }


  var wnd = window.location.href;
  var chsg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>';
  var b7 = document.createElement("style");
  b7.type = "text/css";
  b7.innerHTML = '.main ul.breadcrumb{display:none!important}.content.prH7{padding:8px 0}.ar64{width:100%}.ar64 .s8{font-size:14px;text-align:center;color:#fff;cursor:default;margin:0 3px;padding:9px 10px 9px 30px;float:left;position:relative;background-color:' + pSettings.progressBg2 + ';-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:all 2s ease;width:20%}.ar64 .s8:after,.ar64 .s8:before{content:" ";position:absolute;top:0;right:-17px;width:0;height:0;border-top:19px solid transparent;border-bottom:17px solid transparent;border-left:17px solid ' + pSettings.progressBg2 + ';z-index:2;transition:border-color .2s ease}.ar64 .s8:before{right:auto;left:0;border-left:17px solid #fff;z-index:0}.ar64 .s8:first-child:before{border:none}.ar64 .s8:first-child{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.ar64 .s8 span{position:relative}.ar64 .s8.s8c{color:#fff;background-color:' + pSettings.progressBg + '}.ar64 .s8.s8c:after{border-left:17px solid ' + pSettings.progressBg + '}.ar64 .s8 svg{position:absolute;left:-17px;top:2px}.ar64 .s8:first-child svg{left:-16px}.wyustit:before{border-top:1px solid #dfdfdf;content:"";margin:0 auto;position:absolute;top:50%;left:0;right:0;bottom:0;width:100%;z-index:-1}.wyuscs{display:table-row;padding-bottom:20px}.wyuscs1,.wyuscs2{display:table-cell;vertical-align:middle}.wyuscs1{width:20%;font-size:15px}.wyuscs2{width:80%}.wyuscs2 span{font-size:14px;font-weight:700;color:#666}.wyuscs2 p{font-size:12px;color:#777}@media(min-width:450px){.ar64 .s8{min-width:29%}.ar64 .s8 svg{position:relative!important;top:2px!important;left:-10px!important}}@media(max-width:750px){.ar64 .s8{font-size:11px}.ar64 .s8:first-child{padding-left:20px}}';
  document.body.appendChild(b7);

  if (dsXt = document.getElementById("checkout_reduction_code"), document.body.insertAdjacentHTML("afterbegin", '<div class="content prH7"><div class="wrap"><div class="ar64"><div id="sp1" class="s8 s8c"><span id="spn1">1.Customer</span></div><div id="sp2" class="s8"><span id="spn2">2.Shipping</span></div><div id="sp3" class="s8"><span id="spn3">3.Payment</span></div></div></div></div>'), -1 === wnd.indexOf("thank_you")) {
    document.getElementsByClassName("main__content")[0].insertAdjacentHTML("afterbegin", '<div><div id="ct836" style="display:block;background:#fff5d2;padding:10px 20px;border:1px solid #fac444;font-size:14px;color:#2c2c2c;font-weight:bold;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; margin:5px 0px 20px 0px">Your order is reserved for <span id="time"></span> minutes!</div></div>');
    var e = 600,
        t = Date.now(),
        s = rdC("pRtC");
    s ? t < s ? e = (s - t) / 1e3 : (eSC("pRtC"), crC("pRtC", Date.now() + 1e3 * e, e + 1)) : crC("pRtC", Date.now() + 1e3 * e, e + 1), display = document.querySelector("#time"), stTM(t, e, display), document.getElementsByClassName("main__content")[0].insertAdjacentHTML("afterbegin", '<div style="width:100%;display:table"><div style="display:table-cell;vertical-align:middle"><img src="https://cdn.shopify.com/s/files/1/1319/2435/t/4/assets/flame_24.png?10413921915994220473"></div><div style="font-weight:bold;padding-left:5px">' + pSettings.highDemandText + "</div></div>"), "" != pSettings.discountText && dsXt && dsXt.setAttribute("placeholder", pSettings.discountText), document.getElementsByClassName("step__footer")[0].insertAdjacentHTML("afterend", '<div style="width:100%;display:block;padding-top:10px"><span style="font-size:11px;line-height:13px;font-style=italic;float:right;width:100%;text-align:right"><br>Guaranteed safe and secure checkout!</span><img src="https://cdn.shopify.com/s/files/1/1319/2435/t/4/assets/paybadges.jpg" style="max-width:250px;float: right;margin-top: 5px;"></div>'), document.getElementsByClassName("order-summary__sections")[0].insertAdjacentHTML("beforeend", '<div style="position:relative;padding:10px 0px"><div class="wyustit" style="position:relative;z-index:1;text-align:center"><span style="background:#fafafa;padding:0 15px">Why choose us?</span></div><div style="display:table;vertical-align:middle;width:100%;border-spacing:0px 20px"><div class="wyuscs"><div class="wyuscs1"><img src="' + pSettings.whyUsImg1 + '"></div><div class="wyuscs2"><span>' + pSettings.whyUsTitle1 + "</span><p>" + pSettings.whyUsText1 + '</p></div></div><div class="wyuscs"><div class="wyuscs1"><img src="' + pSettings.whyUsImg2 + '"></div><div class="wyuscs2"><span>' + pSettings.whyUsTitle2 + "</span><p>" + pSettings.whyUsText2 + "</p></div></div></div></div>")
  }
  b1j = document.getElementById("sp1"), b2j = document.getElementById("sp2"), b3j = document.getElementById("sp3"), c1j = document.getElementById("spn1"), c2j = document.getElementById("spn2"), c3j = document.getElementById("spn3"), wnd.indexOf("previous_step=contact_information") > -1 && (b1j.className = "s8 s8c", b2j.className = "s8 s8c", c1j.insertAdjacentHTML("afterbegin", chsg)), wnd.indexOf("previous_step=shipping_method") > -1 && (b1j.className = "s8 s8c", b2j.className = "s8 s8c", b3j.className = "s8 s8c", c1j.insertAdjacentHTML("afterbegin", chsg), c2j.insertAdjacentHTML("afterbegin", chsg)), wnd.indexOf("thank_you") > -1 && (b1j.className = "s8 s8c", b2j.className = "s8 s8c", b3j.className = "s8 s8c", c1j.insertAdjacentHTML("afterbegin", chsg), c2j.insertAdjacentHTML("afterbegin", chsg), c3j.insertAdjacentHTML("afterbegin", chsg))
}

//get cookies 
function getCookie(name) { 
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)) {
    return unescape(arr[2]); 
  }else {
    return null; 
  }
} 
// get query string
function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) {
    return unescape(r[2]);
  } 
  return null; 
} 

function useCoupon() {
  var interval = setInterval(function() {
    hideFooter();
    hideLogin();
    hideDiscount();
    hidePaypalExpress();
    process();
  }, 1000);
  setTimeout(function(){
      clearInterval(interval);
  }, 15000);

  var couponCode = getQueryString("");
  if(!couponCode) {
    couponCode = getCookie("coupon_code");
  }
  if(couponCode) {
    var couponInput = document.querySelector('[data-trekkie-id="reduction_code_field"]');
    if(couponInput) {
      couponInput.value= couponCode;
    }
    var discountButton = document.querySelector('[data-trekkie-id="apply_discount_button"]');
    if(discountButton) {
      discountButton.removeAttribute("disabled");
      discountButton.click();
    }
    
    /*
    var OrderSummaryBefore = document.createElement('div');
    OrderSummaryBefore.innerHTML = "<div class='hidden-on-desktop' style='text-align:center;margin-bottom:10px'>used coupon : <font color='red'><b>" + couponCode + "</b></font></div>";
    var orderSummary = document.querySelector(".order-summary-toggle");
    if(orderSummary) {
      orderSummary.before(OrderSummaryBefore);
    }
    */
    console.log('discount ', couponCode);
  }
}
var wnd = window.location.href;
if(wnd.indexOf("checkouts") > -1) {
  run();
  useCoupon();
}

