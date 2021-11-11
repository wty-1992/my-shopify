// Override Settings
var bcSfFilterSettings = {
    general: {
        limit: 20,
        /* Optional */
        // loadProductFirst: true,
    }
};
// Declare Templates
var bcSfFilterTemplate = {
    'soldOutClass': 'sold-out',
    'saleClass': 'on-sale',
    'soldOutLabelHtml': '<div>' + bcSfFilterConfig.label.sold_out + '</div>',
    'saleLabelHtml': '<div>' + bcSfFilterConfig.label.sale + '</div>',
    'vendorHtml': '<div>{{itemVendorLabel}}</div>',

    // Grid Template
    // 'productGridItemHtml': '<div class="item {{soldOutClass}} {{saleClass}}">' +
    //                             '<a href="{{itemUrl}}" class="product-card">' +
    //                                 '<span class="grid-link__image grid-link__image--product">' +
    //                                     '{{itemSaleLabel}}' +
    //                                     '{{itemSoldOutLabel}}' +
    //                                     '<span class="grid-link__image-centered"><img src="{{itemThumbUrl}}" alt="{{itemTitle}}" /></span>' +
    //                                 '</span>' +
    //                                 '<p class="grid-link__title">{{itemTitle}}</p>' +
    //                                 '{{itemVendor}}' +
    //                                 '{{itemPrice}}' +
    //                             '</a>' +
    //                         '</div>',
    'productGridItemHtml': '<div class="item">' + 
  								'<div class="collection-label-new">{{itemLabelNew}}</div>' + 
                                '<a href="{{itemUrl}}" class="product-card">' + 
                                    '<div class="product-card__image-container">' + 
                                        '<div class="product-card__image-wrapper">' + 
                                            '<div class="product-card__image js" data-image-id="6454102655040">' + 
                                                '<img class="lazyload defaultImage" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="{{itemThumbUrl}}" alt="{{itemTitle}}">' + 
                                                '<img class="lazyload hoverImage" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="{{itemHoverImageUrl}}" alt="{{itemTitle}}">' + 
                                            '</div>' + 
                                            '<div class="christmas_hat" style="display:none">' + 
                                                '<img src="{{itemThumbUrl}}">' + 
                                            '</div>' + 
                                        '</div>' + 
                                    '</div>' + 
                                '</a>' + 
                                '<div class="product-card__info">' + 
                                    '{{itemPrice}}' + 
  									'<div class="product-card__tag">{{itemTags}}</div>' + 
                                    '<div class="product-card__name">{{itemTitle}}</div>' + 
                                    '<div class="ratings-fa-star">' + 
                                        '<div class="wc_product_review_badge" data-handle="{{ product.handle }}"></div>' +  
                                    '</div>' + 
                                    '<div class="collection-label">{{itemLabel}}</div>' + 
                                    '{{itemButton}}' + 
                                    '<div class="product-cart__bottom"></div>' + 
                                '</div>' + 
                                '<div class="product-card__overlay">' + 
                                    '<span class="btn product-card__overlay-btn ">View</span>' + 
                                '</div>' + 
                            '</div>',

    // Pagination Template
    'previousActiveHtml': '<li><a href="{{itemUrl}}"><<</a></li>',
    'previousDisabledHtml': '<li class="disabled"><span><<</span></li>',
    'nextActiveHtml': '<li><a href="{{itemUrl}}">>></a></li>',
    'nextDisabledHtml': '<li class="disabled"><span>>></span></li>',
    'pageItemHtml': '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
    'pageItemSelectedHtml': '<li><span class="active">{{itemTitle}}</span></li>',
    'pageItemRemainHtml': '<li><span>{{itemTitle}}</span></li>',
    'paginateHtml': '<ul class="pagination-custom">{{previous}}{{pageItems}}{{next}}</ul>',
  
    // Sorting Template
    // 'sortingHtml': '<label class="label--hidden">' + bcSfFilterConfig.label.sorting + '</label><select class="collection-sort__input">{{sortingItems}}</select>',
    'sortingHtml': '<div class="bc-sf-filter-option-block bc-sf-filter-option-block-list" data-display-type="list" data-select-type="single" data-show-more-type="scrollbar" data-id="pf_s_sorting"><div class="bc-sf-filter-block-title"><h3><span class="up">' + bcSfFilterConfig.label.sorting + '</span></h3></div><div class="bc-sf-filter-block-content" style="display:none"><ul class="bc-sf-filter-option-multiple-list">{{sortingItems}}</ul></div></div>',
};

/************************** BUILD PRODUCT LIST **************************/

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function(data, index) {
    var metafields = FilterProductMetafields[data.id] || {};
    if (typeof(metafields.cattribute) != 'undefined'){
      // metafields.cattribute = JSON.parse(metafields.cattribute) || {}
      // Edit: By.Coman 420500235@qq.com 2019.03.05
      if(typeof metafields.cattribute === 'object'){
      	metafields.cattribute = metafields.cattribute || {}
      }else{
      	metafields.cattribute = JSON.parse(metafields.cattribute) || {}
      }
        
    }
    if (typeof(metafields.label) != 'undefined'){
//         metafields.label = JSON.parse(metafields.label) || {}
      // Edit: By.Coman 420500235@qq.com 2019.03.19
      if(typeof metafields.label === 'object'){
      	metafields.label = metafields.label || {}
      }else{
      	metafields.label = JSON.parse(metafields.label) || {}
      }
    }
    /*** Prepare data ***/
    var images = data.images_info;
    // data.price_min *= 100, data.price_max *= 100, data.compare_at_price_min *= 100, data.compare_at_price_max *= 100; // Displaying price base on the policy of Shopify, have to multiple by 100
    var soldOut = !data.available; // Check a product is out of stock
    var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
    var priceVaries = data.price_min != data.price_max; // Check a product has many prices
    // Get First Variant (selected_or_first_available_variant)
    var firstVariant = data['variants'][0];
    if (getParam('variant') !== null && getParam('variant') != '') {
        var paramVariant = data.variants.filter(function(e) { return e.id == getParam('variant'); });
        if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
    } else {
        for (var i = 0; i < data['variants'].length; i++) {
            if (data['variants'][i].available) {
                firstVariant = data['variants'][i];
                break;
            }
        }
    }
    /*** End Prepare data ***/

    // Get Template
    var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    // Add Thumbnail
    var itemThumbUrl = images.length > 0 ? this.optimizeImage(images[0]['src']) : bcSfFilterConfig.general.no_image_url;
    itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);
    var itemHoverImageUrl = images.length > 1 ? this.optimizeImage(images[1]['src']) : itemThumbUrl;
    itemHtml = itemHtml.replace(/{{itemHoverImageUrl}}/g, itemHoverImageUrl);
    // Add ImageId
    var itemImageId = images[0]['id'];
    itemHtml = itemHtml.replace(/{{itemImageId}}/g, itemImageId);
    // Add Sku
    itemHtml = itemHtml.replace(/{{itemSku}}/g, data.selected_or_first_available_variant.sku);

    // Add Price
    var itemPriceHtml = '';
    if (data.title != '')  {
        itemPriceHtml += '<div class="product-card__price">';
        // if (priceVaries) {
        //     var itemPrice = (bcSfFilterConfig.label.from_price).replace(/{{ price }}/g, this.formatMoney(data.price_min));
        // } else {
        //     var itemPrice = this.formatMoney(data.price_min);
        // }
        // var itemPrice = this.formatMoney(data.price_min);
        var itemPrice = data.price_min;
        itemPriceHtml += '<span class="product-card__sale-price" data-money="'+itemPrice+'"></span>';
        if (onSale) {
            itemPriceHtml += '<s class="product-card__regular-price"><span data-money="'+data.selected_or_first_available_variant.compare_at_price+'"></span></s> ';
        }
        itemPriceHtml += '</div>';
    }
    itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

    // Add soldOut class
    var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : '';
    itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
  
    // Add onSale class
    var saleClass = onSale ? bcSfFilterTemplate.saleClass : '';
    itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
  
    // Add soldOut Label
    var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

    // Add onSale Label
    var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : '';
    itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

    // Add Vendor
    var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor) : '';
    itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

    // Add main attribute (Always put at the end of this function)
    itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
    itemHtml = itemHtml.replace(/{{productId}}/g, data.selected_or_first_available_variant.id);
    itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
    itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
    itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

    // Add Tags
    var itemTags = '';
    // if (firstVariant.compare_at_price > firstVariant.price && data.tags.length > 0){
    if (firstVariant.compare_at_price > firstVariant.price){
        // $.each(data.tags, function(index, value) {
            // if (value == 'custom-tag-discount'){
                var discout = Math.floor(((firstVariant.compare_at_price - firstVariant.price) * 100) / firstVariant.compare_at_price);
                itemTags = '<div class="tag__label tag__custom-tag-discount" aria-hidden="true">' + 
                                '<div class="discount_box">' + 
                                    '<div class="text">' + discout + '%</div>' + 
                                    '<div class="off">OFF</div>' + 
                                '</div>' + 
                            '</div>';
            // }
        // })
    }
    itemHtml = itemHtml.replace(/{{itemTags}}/g, itemTags);

    // Add Label
    var itemLabel = '';
    if (typeof(metafields.label) == 'object'){
        itemLabel = '<span class="product-label__icon" style="color:' + (metafields.label.color || '#f0a635') + ';border:1px solid ' + (metafields.label.color || '#f0a635') + '" >' + metafields.label.title + '</span> ';
    }
    itemHtml = itemHtml.replace(/{{itemLabel}}/g, itemLabel);
  
    var itemLabel = '';
  	$.each(data.tags, function(index, value){
      var tagStart = value.indexOf('tag-product');
      if(tagStart > -1){
      	var tagEnd = value.indexOf('#');
        if(tagEnd > -1){
          var tagTitle = value.substr(12,tagEnd-13);
          tagTitle = tagTitle.replace(/\-/g, ' ');
          var tagColor = value.substr(tagEnd,value.length);
        }else{
          var tagTitle = '';
          var tagColor = '#f0a635';
        }
        itemLabel = '<span class="product-label__icon" style="background-color:' + (tagColor) + ';border:1px solid ' + (tagColor) + '" >' + tagTitle + '</span> ';
      }
    })
    itemHtml = itemHtml.replace(/{{itemLabelNew}}/g, itemLabel); 

    // Add Button
    var button = {
        click: "Cart.add({id:" + data.selected_or_first_available_variant.id + "}).then(item => { Dialog.open('#shopify-section-cart-success')})",
        text: 'add to cart'
    }
    //水晶钥匙扣没有变体size，添加根据标签判断 2020-3-14 by Alice
  	var tagsStr = ',';
    if(typeof data.tags != 'undefined' && data.tags){
      tagsStr = data.tags.join(',');
    }
  
    if ((typeof(metafields.cattribute) != 'undefined' && metafields.cattribute.type != '') || (data.options.indexOf('Size') > -1 || data.options.indexOf('size') > -1)  || (tagsStr.indexOf('custom') > -1 || tagsStr.indexOf('Custom') > -1)){
        button = {
            click: "window.location.href = '" + data.url + "'",
            text: 'design your own'
        }
    }
    var itemButton = '<button type="button" class="medium-up--btn btn" onclick="' + button.click + '">' + button.text + '</button>';
    itemHtml = itemHtml.replace(/{{itemButton}}/g, itemButton);

    return itemHtml;
};

// Build Product List Item
BCSfFilter.prototype.buildProductListItem = function(data) {
    // // Add Description
    // var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
    // // Truncate by word
    // itemDescription = (itemDescription.split(" ")).length > 51 ? itemDescription.split(" ").splice(0, 51).join(" ") + '...' : itemDescription.split(" ").splice(0, 51).join(" ");
    // // Truncate by character
    // itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
    // itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
};

/************************** END BUILD PRODUCT LIST **************************/

// Build Pagination
BCSfFilter.prototype.buildPagination = function(totalProduct) {
    if (this.getSettingValue('general.paginationType') == 'default') {
        // Get page info
        var currentPage = parseInt(this.queryParams.page);
        var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

        // If it has only one page, clear Pagination
        if (totalPage == 1) {
            jQ(this.selector.bottomPagination).html('');
            return false;
        }

        if (this.getSettingValue('general.paginationType') == 'default') {
            var paginationHtml = bcSfFilterTemplate.paginateHtml;

            // Build Previous
            var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousDisabledHtml;
            previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
            paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

            // Build Next
            var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextActiveHtml :  bcSfFilterTemplate.nextDisabledHtml;
            nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
            paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

            // Create page items array
            var beforeCurrentPageArr = [];
            for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
                beforeCurrentPageArr.unshift(iBefore);
            }
            if (currentPage - 4 > 0) {
                beforeCurrentPageArr.unshift('...');
            }
            if (currentPage - 4 >= 0) {
                beforeCurrentPageArr.unshift(1);
            }
            beforeCurrentPageArr.push(currentPage);

            var afterCurrentPageArr = [];
            for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
                afterCurrentPageArr.push(iAfter);
            }
            if (currentPage + 3 < totalPage) {
                afterCurrentPageArr.push('...');
            }
            if (currentPage + 3 <= totalPage) {
                afterCurrentPageArr.push(totalPage);
            }

            // Build page items
            var pageItemsHtml = '';
            var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
            for (var iPage = 0; iPage < pageArr.length; iPage++) {
                if (pageArr[iPage] == '...') {
                    pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
                } else {
                    pageItemsHtml += (pageArr[iPage] == currentPage) ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml;
                }
                pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
                pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, pageArr[iPage]));
            }
            paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

            jQ(this.selector.bottomPagination).html(paginationHtml);
        }
    }
};

/************************** BUILD TOOLBAR **************************/

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function() {
    if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
        jQ(this.selector.topSorting).html('');

        var sortingArr = this.getSortingList();
        if (sortingArr) {
            // Build content 
            var sortingItemsHtml = '';
            for (var k in sortingArr) {
                // sortingItemsHtml += '<option value="' + k +'">' + sortingArr[k] + '</option>';
                // sortingItemsHtml += '<li><a href="">' + sortingArr[k] + '</a></li>';
                sortingItemsHtml += '<li><a class="bc-div-sort" data-val="' + k + '" href="javascript:void(0);">' + sortingArr[k] + '</a></li>';
            }
            var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
            jQ(this.selector.topSorting).html(html);

            // Set current value
            jQ(this.selector.topSorting + ' select').val(this.queryParams.sort);
        }
    }
};

// Build Display type (List / Grid / Collage)
// BCSfFilter.prototype.buildFilterDisplayType = function() {
//     var itemHtml = '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="change-view bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><i class="fa fa-th" aria-hidden="true"></i><span class="fallback-text">Grid view</span></span></a>';
//     itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="change-view bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><i class="fa fa-list" aria-hidden="true"></i><span class="fallback-text">List view</span></span></a>';
//     jQ(this.selector.topDisplayType).html(itemHtml);

//     // Active current display type
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
//     if (this.queryParams.display == 'list') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
//     } else if (this.queryParams.display == 'grid') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
//     }
// };

/************************** END BUILD TOOLBAR **************************/

// Build Default layout
function buildDefaultLink(a,b){var c=window.location.href.split("?")[0];return c+="?"+a+"="+b}BCSfFilter.prototype.buildDefaultElements=function(a){if(bcSfFilterConfig.general.hasOwnProperty("collection_count")&&jQ("#bc-sf-filter-bottom-pagination").length>0){var b=bcSfFilterConfig.general.collection_count,c=parseInt(this.queryParams.page),d=Math.ceil(b/this.queryParams.limit);if(1==d)return jQ(this.selector.pagination).html(""),!1;if("default"==this.getSettingValue("general.paginationType")){var e=bcSfFilterTemplate.paginateHtml,f="";f=c>1?bcSfFilterTemplate.hasOwnProperty("previousActiveHtml")?bcSfFilterTemplate.previousActiveHtml:bcSfFilterTemplate.previousHtml:bcSfFilterTemplate.hasOwnProperty("previousDisabledHtml")?bcSfFilterTemplate.previousDisabledHtml:"",f=f.replace(/{{itemUrl}}/g,buildDefaultLink("page",c-1)),e=e.replace(/{{previous}}/g,f);var g="";g=c<d?bcSfFilterTemplate.hasOwnProperty("nextActiveHtml")?bcSfFilterTemplate.nextActiveHtml:bcSfFilterTemplate.nextHtml:bcSfFilterTemplate.hasOwnProperty("nextDisabledHtml")?bcSfFilterTemplate.nextDisabledHtml:"",g=g.replace(/{{itemUrl}}/g,buildDefaultLink("page",c+1)),e=e.replace(/{{next}}/g,g);for(var h=[],i=c-1;i>c-3&&i>0;i--)h.unshift(i);c-4>0&&h.unshift("..."),c-4>=0&&h.unshift(1),h.push(c);for(var j=[],k=c+1;k<c+3&&k<=d;k++)j.push(k);c+3<d&&j.push("..."),c+3<=d&&j.push(d);for(var l="",m=h.concat(j),n=0;n<m.length;n++)"..."==m[n]?l+=bcSfFilterTemplate.pageItemRemainHtml:l+=m[n]==c?bcSfFilterTemplate.pageItemSelectedHtml:bcSfFilterTemplate.pageItemHtml,l=l.replace(/{{itemTitle}}/g,m[n]),l=l.replace(/{{itemUrl}}/g,buildDefaultLink("page",m[n]));e=e.replace(/{{pageItems}}/g,l),jQ(this.selector.pagination).html(e)}}if(bcSfFilterTemplate.hasOwnProperty("sortingHtml")&&jQ(this.selector.topSorting).length>0){jQ(this.selector.topSorting).html("");var o=this.getSortingList();if(o){var p="";for(var q in o)p+='<option value="'+q+'">'+o[q]+"</option>";var r=bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g,p);jQ(this.selector.topSorting).html(r);var s=void 0!==this.queryParams.sort_by?this.queryParams.sort_by:this.defaultSorting;jQ(this.selector.topSorting+" select").val(s),jQ(this.selector.topSorting+" select").change(function(a){window.location.href=buildDefaultLink("sort_by",jQ(this).val())})}}};

// Customize data to suit the data of Shopify API
BCSfFilter.prototype.prepareProductData=function(data){for(var k=0;k<data.length;k++){data[k]['images']=data[k]['images_info'];if(data[k]['images'].length>0){data[k]['featured_image']=data[k]['images'][0]}else{data[k]['featured_image']={src:bcSfFilterConfig.general.no_image_url,width:'',height:'',aspect_ratio:0}}data[k]['url']='/products/'+data[k].handle;var optionsArr=[];for(var i=0;i<data[k]['options_with_values'].length;i++){optionsArr.push(data[k]['options_with_values'][i]['name'])}data[k]['options']=optionsArr;data[k]['price_min']*=100,data[k]['price_max']*=100,data[k]['compare_at_price_min']*=100,data[k]['compare_at_price_max']*=100;data[k]['price']=data[k]['price_min'];data[k]['compare_at_price']=data[k]['compare_at_price_min'];data[k]['price_varies']=data[k]['price_min']!=data[k]['price_max'];var firstVariant=data[k]['variants'][0];if(getParam('variant')!==null&&getParam('variant')!=''){var paramVariant=data.variants.filter(function(e){return e.id==getParam('variant')});if(typeof paramVariant[0]!=='undefined')firstVariant=paramVariant[0]}else{for(var i=0;i<data[k]['variants'].length;i++){if(data[k]['variants'][i].available){firstVariant=data[k]['variants'][i];break}}}data[k]['selected_or_first_available_variant']=firstVariant;for(var i=0;i<data[k]['variants'].length;i++){var variantOptionArr=[];var count=1;var variant=data[k]['variants'][i];var variantOptions=variant['merged_options'];if(Array.isArray(variantOptions)){for(var j=0;j<variantOptions.length;j++){var temp=variantOptions[j].split(':');data[k]['variants'][i]['option'+(parseInt(j)+1)]=temp[1];data[k]['variants'][i]['option_'+temp[0]]=temp[1];variantOptionArr.push(temp[1])}data[k]['variants'][i]['options']=variantOptionArr}data[k]['variants'][i]['compare_at_price']=parseFloat(data[k]['variants'][i]['compare_at_price'])*100;data[k]['variants'][i]['price']=parseFloat(data[k]['variants'][i]['price'])*100}data[k]['description']=data[k]['content']=data[k]['body_html']}return data};

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function(data, eventType) {};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function(data, eventType) {};


/* Start Fix version 2.3.2 */
BCSfFilter.prototype.addFilterTreeItem=function(e,r,t,i){e=jQ.parseHTML(e),i=void 0!==i?i:this.getSelector("filterTree");void 0!==r&&"before"==r?jQ(i+t).prepend(e):jQ(i+t).append(e)};
/* End Fix version 2.3.2 */

// Fix image url issue of swatch option
function getFilePath(fileName, ext, version) {
    var self = bcsffilter;
    var ext = typeof ext !== 'undefined' ? ext : 'png';
    var version = typeof version !== 'undefined' ? version : '1';
    var prIndex = self.fileUrl.lastIndexOf('?');
    if (prIndex > 0) {
        var filePath = self.fileUrl.substring(0, prIndex);
    } else {
        var filePath = self.fileUrl;
    }
    filePath += fileName + '.' + ext + '?v=' + version;
    return filePath;
}

BCSfFilter.prototype.getFilterData=function(eventType,errorCount){function BCSend(eventType,errorCount){var self=bcsffilter;var errorCount=typeof errorCount!=="undefined"?errorCount:0;self.showLoading();if(typeof self.buildPlaceholderProductList=="function"){self.buildPlaceholderProductList(eventType)}self.beforeGetFilterData(eventType);self.prepareRequestParams(eventType);self.queryParams["callback"]="BCSfFilterCallback";self.queryParams["event_type"]=eventType;var url=self.isSearchPage()?self.getApiUrl("search"):self.getApiUrl("filter");var script=document.createElement("script");script.type="text/javascript";var timestamp=(new Date).getTime();script.src=url+"?t="+timestamp+"&"+jQ.param(self.queryParams);script.id="bc-sf-filter-script";script.async=true;var resendAPITimer,resendAPIDuration;resendAPIDuration=2e3;script.addEventListener("error",function(e){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}if(errorCount<3){errorCount++;if(resendAPITimer){clearTimeout(resendAPITimer)}resendAPITimer=setTimeout(self.getFilterData("resend",errorCount),resendAPIDuration)}else{self.buildDefaultElements(eventType)}});document.getElementsByTagName("head")[0].appendChild(script);script.onload=function(){if(typeof document.getElementById(script.id).remove=="function"){document.getElementById(script.id).remove()}else{document.getElementById(script.id).outerHTML=""}}}this.requestFilter(BCSend,eventType,errorCount)};BCSfFilter.prototype.requestFilter=function(sendFunc,eventType,errorCount){sendFunc(eventType,errorCount)};


/* start-boost-2.4.8 */
BCSfFilter.prototype.buildFilterOptionItem=function(html,iLabel,iValue,fOType,fOId,fOLabel,fODisplayType,fOSelectType,fOItemValue,fOData){var keepValuesStatic=fOData.hasOwnProperty("keepValuesStatic")?fOData.keepValuesStatic:false;if(fOType=="review_ratings"&&this.getSettingValue("general.ratingSelectionStyle")=="text"){var title=this.getReviewRatingsLabel(fOItemValue.from)}else{var title=this.customizeFilterOptionLabel(iLabel,fOData.prefix,fOType)}if(keepValuesStatic===true)var productNumber=null;else var productNumber=fOItemValue.hasOwnProperty("doc_count")?fOItemValue.doc_count:0;html=html.replace(/{{itemLabel}}/g,this.buildFilterOptionLabel(iLabel,productNumber,fOData));html=html.replace(/{{itemLink}}/g,this.buildFilterOptionLink(fOId,iValue,fOType,fODisplayType,fOSelectType,keepValuesStatic));html=html.replace(/{{itemValue}}/g,encodeURIParamValue(iValue));html=html.replace(/{{itemTitle}}/g,title);html=html.replace(/{{itemFunc}}/g,"onInteractWithFilterOptionValue(event, this, '"+fOType+"', '"+fODisplayType+"', '"+fOSelectType+"', '"+keepValuesStatic+"')");html=this.checkFilterOptionSelected(fOId,iValue,fOType,fODisplayType)?html.replace(/{{itemSelected}}/g,"selected"):html.replace(/{{itemSelected}}/g,"");var htmlElement=jQ(html);htmlElement.children().attr({"data-id":fOId,"data-value":encodeURIParamValue(iValue),"data-parent-label":fOLabel,"data-title":title,"data-count":productNumber});if(fOType!="collection"){htmlElement.children().attr("rel","nofollow")}if(fOType=="collection")htmlElement.children().attr("data-collection-scope",fOItemValue.key);return jQ(htmlElement)[0].outerHTML};
/* end-boost-2.4.8 */