!function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloProgramSelectorPRP=e,e.prototype.Constant_={PROGRAM:"FieloPRP__Program__c",PROGRAM_PLT:"FieloPLT__Program__c",MEMBER:"FieloPRP__Member__c"},e.prototype.CssClasses_={PAGINATOR:"fielosf-paginator",RECENT:"fielosf-recent-records"},e.prototype.onChange=function(){var e={};this.getProgramId_(),[].forEach.call(this.programActions_,function(e){e.FieloButton.setParameter(this.Constant_.PROGRAM,this.programId_)},this),e[this.field_]=this.programId_;try{Visualforce.remoting.Manager.invokeAction("FieloPRP.BackEndProgramSelectorController.selectProgram",e[this.field_],function(){},{escape:!1})}catch(t){console.log(t),fielo.util.spinner.FieloSpinner.hide()}[].forEach.call(this.listOfPaginators_,function(t){$(t).closest("."+this.CssClasses_.RECENT).is(":visible")&&(t.FieloPaginator.setFilters(e),t.FieloPaginator.setPage(),t.FieloPaginator.getRecords())},this),[].forEach.call(this.listOfMemberFields_,function(e){e.getAttribute("data-where").includes(this.Constant_.PROGRAM_PLT)&&this.oldProgramId_&&this.oldProgramId_!==this.programId_&&(e.setAttribute("data-where",e.getAttribute("data-where").replace(this.oldProgramId_,this.programId_)),e.FieloFormElement&&e.FieloFormElement.init())},this),this.callback()},e.prototype.getProgramId_=function(){this.oldProgramId_=this.programId_,this.programId_=this.element_.FieloFormElement.get("value")},e.prototype.init=function(){this.element_&&(componentHandler.upgradeElement(this.element_),window.fieloProgramSelectorPRP=this.onChange.bind(this),this.field_="FieloPRP__Member__r.FieloPLT__Program__c",this.getProgramId_(),this.callback=function(){},this.listOfPaginators_=document.getElementsByClassName(this.CssClasses_.PAGINATOR),this.listOfMemberFields_=document.querySelectorAll("[data-field-name="+this.Constant_.MEMBER+"]"),this.programActions_=document.querySelectorAll('.slds-button[data-parameters*="'+this.Constant_.PROGRAM+'"]'),this.programId_||(this.programId_=$(this.element_).find(".slds-is-selected")[0].getAttribute("data-value")))},componentHandler.register({constructor:e,classAsString:"FieloProgramSelectorPRP",cssClass:"fielosf-program-selector-prp",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloInvoiceItems=e,e.prototype.Constant_={DATA_UPGRADED:"data-upgraded",DATA_CONTROLLER:"data-controller-element",DATA_FIELD_NAME:"data-field-name",OBJECT_TYPE:"FieloPRP__InvoiceItem__c"},e.prototype.CssClasses_={ITEM:"fielosf-invoice__item",CONTAINER:"fielosf-invoice__container",DELETE:"slds-button--delete",NEW:"slds-button--new",FORM_ELEMENT:"slds-form-element",PRODUCT_QTY:"fielosf-product_qty",PRODUCT_UNIT_PRICE:"fielosf-product_unit-price",PRODUCT_TOTAL_PRICE:"fielosf-product_total-price",PRODUCT_NAME:"fielosf-product_name",PILL_REMOVE:"slds-pill__remove"},e.prototype.initItem_=function(e){e.deleteBtn_=e.getElementsByClassName(this.CssClasses_.DELETE)[0],e.deleteBtn_.addEventListener("click",this.deleteItem_.bind(this,e))},e.prototype.refreshTotalPrice_=function(){var e=$(this.element_).closest(".fielosf-invoice-form");if(e.length>0){var t=e[0].FieloFormInvoice;t.refreshTotal()}},e.prototype.deleteItem_=function(e){this.invoiceItems_.length>1&&(e.remove(),this.refreshTotalPrice_())},e.prototype.newinvoiceItem_=function(){var e=this.model_.cloneNode(!0);this.container_.appendChild(e),[].forEach.call(e.querySelectorAll("["+this.Constant_.DATA_UPGRADED+"]"),function(e,t){e.removeAttribute(this.Constant_.DATA_UPGRADED),e.id=String(e.id+"-"+this.invoiceItems_.length);var s=e.getAttribute(this.Constant_.DATA_CONTROLLER)||null;s&&0!==t&&e.setAttribute(this.Constant_.DATA_CONTROLLER,String(s+"-"+this.invoiceItems_.length)),componentHandler.upgradeElement(e)},this),this.initItem_(e)},e.prototype.get=function(){var e=[];return[].forEach.call(this.invoiceItems_,function(t){var s={};[].forEach.call(t.getElementsByClassName(this.CssClasses_.FORM_ELEMENT),function(e){var t=e.FieloFormElement.get("value");s[e.getAttribute(this.Constant_.DATA_FIELD_NAME)]=t},this),""!==t.getAttribute("data-record-id")&&(s.Id=t.getAttribute("data-record-id")),e.push(s)},this),e},e.prototype.set=function(){return console.log("recibe lista de objetos")},e.prototype.clear=function(){this.newinvoiceItem_();for(var e=this.element_.getElementsByClassName(this.CssClasses_.DELETE);e.length>1;)e[0].click();$(this.element_).find($('[data-field-name="FieloPRP__UnitPrice__c"]'))[0].FieloFormElement.set("value",""),$(this.element_).find($('[data-field-name="FieloPRP__Quantity__c"]'))[0].FieloFormElement.set("value",0),$(this.element_).find($('[data-field-name="FieloPRP__TotalPrice__c"]'))[0].FieloFormElement.set("value","")},e.prototype.init=function(){this.element_&&(this.container_=this.element_.getElementsByClassName(this.CssClasses_.CONTAINER)[0],this.invoiceItems_=this.element_.getElementsByClassName(this.CssClasses_.ITEM),this.model_=this.invoiceItems_[0].cloneNode(!0),this.newBtn_=this.element_.getElementsByClassName(this.CssClasses_.NEW)[0],this.newBtn_&&this.newBtn_.addEventListener("click",this.newinvoiceItem_.bind(this)),[].forEach.call(this.invoiceItems_,this.initItem_.bind(this)))},fielo.util.register({constructor:e,classAsString:"FieloInvoiceItems",cssClass:"fielosf-invoice-items",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloMultiFileUploaderPRP=e,e.prototype.Constant_={MAX_FILE_SIZE:435e4,CHUNK_SIZE:95e4,UPLOAD_CONTROLLER:"FieloPRP.MultiFileUploader.saveTheChunk",DELETE_FILES_CONTROLLER:"FieloPRP.MultiFileUploader.deleteFiles"},e.prototype.CssClasses_={PAGINATOR:"fielosf-paginator",PILL:"slds-pill",CARD_BODY:"slds-card__body",PILL_CONTAINER:"slds-card__body--inner",PILL_MODEL:"slds-pill__model",PILL_LABEL:"slds-pill__label",PILL_REMOVE:"slds-pill__remove"},e.prototype.init=function(){this.element_&&(this.initPillsDocument(),this.filePills_=this.element_.getElementsByClassName(this.CssClasses_.PILL_MODEL),$("#file-upload-input-01")[0].addEventListener("change",this.handleFile.bind(this)),this.removePillbtn_=this.element_.getElementsByClassName(this.CssClasses_.PILL_REMOVE)[0],this.removePillbtn_.addEventListener("click",this.removePill.bind(this)),this.form_=this.element_.FieloForm,componentHandler.upgradeElement(this.element_))},e.prototype.removePill=function(e){null!==this.deleteList&&void 0!==this.deleteList||(this.deleteList=[]),this.currentPillContainer=$(e.srcElement).closest("."+this.CssClasses_.PILL_CONTAINER)[0],this.currentPillLabel=$(this.currentPillContainer).find("."+this.CssClasses_.PILL_LABEL)[0];var t=this.currentPillLabel.getAttribute("data-record-id");this.newFile=!1,this.fileList&&this.fileList[t]&&(delete this.fileList[t],this.newFile=!0),this.currentPillContainer.remove(),this.newFile||this.deleteList.push(t)},e.prototype.deleteFilesFromServer=function(){if(this.deleteList&&this.deleteList.length>0){var e=this,t=this.deleteList.slice();this.deleteList=null,Visualforce.remoting.Manager.invokeAction(this.Constant_.DELETE_FILES_CONTROLLER,t,this.uploadFile.bind(this,e.parentId),{escape:!0})}},e.prototype.clearPills=function(){this.nonModelPills=$(this.element_.getElementsByClassName(this.CssClasses_.PILL_CONTAINER)).not(this.element_.getElementsByClassName(this.CssClasses_.PILL_MODEL));var e;[].forEach.call(this.nonModelPills,function(t){e=t.getElementsByClassName(this.CssClasses_.PILL_REMOVE)[0],e.click()},this)},e.prototype.initPillsDocument=function(){$(document).ready(function(){$("body").pill()})},e.prototype.initPill=function(e){this.removePillbtn_=$(e).find("."+this.CssClasses_.PILL_REMOVE)[0],this.removePillbtn_.addEventListener("click",this.removePill.bind(this))},e.prototype.addEmptyFilePill=function(e){this.currentPillContainer=this.filePills_[0].cloneNode(!0),this.cardBody_=this.element_.getElementsByClassName(this.CssClasses_.CARD_BODY)[0],this.cardBody_.appendChild(this.currentPillContainer),$(this.currentPillContainer).removeClass("slds-hidden"),$(this.currentPillContainer).removeClass("slds-is-collapsed"),$(this.currentPillContainer).removeClass("slds-pill__model"),this.currentPillLabel=this.currentPillContainer.getElementsByClassName(this.CssClasses_.PILL_LABEL)[0],e.Name?(this.currentPillLabel.innerHTML=e.Name,this.currentPillLabel.setAttribute("title",e.Name)):(this.currentPillLabel.innerHTML=e.Title,this.currentPillLabel.setAttribute("title",e.Title)),this.currentPillLabel.setAttribute("data-record-id",e.Id),this.initPill(this.currentPillContainer)},e.prototype.addFilePill=function(e){this.currentPillContainer=this.filePills_[0].cloneNode(!0),this.cardBody_=this.element_.getElementsByClassName(this.CssClasses_.CARD_BODY)[0],this.cardBody_.appendChild(this.currentPillContainer),$(this.currentPillContainer).removeClass("slds-hidden"),$(this.currentPillContainer).removeClass("slds-is-collapsed"),$(this.currentPillContainer).removeClass("slds-pill__model"),this.currentPillLabel=this.currentPillContainer.getElementsByClassName(this.CssClasses_.PILL_LABEL)[0],this.currentPillLabel.innerHTML=e.name,this.currentPillLabel.setAttribute("title",e.name),this.currentPillLabel.setAttribute("data-record-id",Object.keys(this.fileList).length-1),this.initPill(this.currentPillContainer)},e.prototype.handleFile=function(e){this.input_=e.target,null!==this.fileList&&void 0!==this.fileList||(this.fileList={}),[].forEach.call(this.input_.files,function(e){try{if(e.size<this.Constant_.MAX_FILE_SIZE)this.fileList[Object.keys(this.fileList).length.toString()]=e,this.addFilePill(e);else{var t=BackEndJSSettings.LABELS.MaxFileSize.replace("{0}",(this.Constant_.MAX_FILE_SIZE/1024/1024).toFixed(2).toString());this.throwMessage(t,"error"),this.input_.value=null}}catch(s){console.log("error"+s)}},this),this.input_.value=null},window.FieloMultiFileUploaderPRP_handleFile=e.prototype.handleFile,e.prototype.uploadFile=function(e){if(this.parentId=e,this.deleteList)this.deleteFilesFromServer();else if(this.fileList){var t=Object.keys(this.fileList)[0],s=this.fileList[t];delete this.fileList[t];var i=this;if(console.log(s),s){var l=new FileReader;l.onloadend=function(){var t=window.btoa(l.result);i.upload(e,s,t)},l.readAsBinaryString(s)}else this.throwMessage(BackEndJSSettings.LABELS.ChooseFileFirst,"error")}else this.redirectToParent(e)},e.prototype.upload=function(e,t,s){var i=0,l=Math.min(s.length,i+this.Constant_.CHUNK_SIZE);this.uploadChunk(e,t,s,i,l,"")},e.prototype.uploadChunk=function(t,s,i,l,o,n){var r=i.substring(l,o),a=this;Visualforce.remoting.Manager.invokeAction(this.Constant_.UPLOAD_CONTROLLER,t,s.name,encodeURIComponent(r),s.type,n,function(r){n=r,l=o,o=Math.min(i.length,l+a.Constant_.CHUNK_SIZE),l<o?a.uploadChunk(t,s,i,l,o,n):a.fileList&&Object.keys(a.fileList).length>0?a.uploadFile(t):e.prototype.redirectToParent.call(a,t)},{escape:!0})},e.prototype.redirectToParent=function(e){fielo.util.spinner.FieloSpinner.hide();var t=document.getElementsByClassName("slds-modal");[].forEach.call(t,function(e){try{$(e).modal("dismiss")}catch(t){}},this);var s={message:BackEndJSSettings.LABELS.InvoiceSavedSuccess,redirectURL:"/"+e};this.throwMessage(s.message,"success"),location.replace(s.redirectURL)},e.prototype.throwMessage=function(e,t){var s=fielo.util.notify.create();s.FieloNotify.addMessages([e]),s.FieloNotify.setTheme(t),s.FieloNotify.show()},componentHandler.register({constructor:e,classAsString:"FieloMultiFileUploaderPRP",cssClass:"fielosf-multi-file-uploader",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloFormInvoice=e,e.prototype.Constant_={SAVE_CONTROLLER:"FieloPRP.FormInvoiceController.save",RETRIEVE_CONTROLLER:"data-retrieve-controller",GET_PROGRAM_CONTROLLER:"FieloPRP.FormInvoiceController.getActiveProgram",MEMBER:"FieloPRP__Member__c",PRODUCT_RECENT:"recentProductRecords",DATA_RECORD_ID:"data-record-id",OBJECT_NAME:"data-object-name",FIELDS:"data-fields",FIELD_NAME:"data-field-name",REDIRECT:"data-redirect",PRODUCT_FIELD:"data-product-field-name"},e.prototype.CssClasses_={CONTAINER:"slds-form-element",ITEMS_CONTAINER:"fielosf-invoice-items",SAVE:"slds-form__save",CANCEL:"slds-form__cancel",DELETE:"slds-button--delete",NEW:"slds-button--new",ELEMENT:"slds-form-element",INVOICE_ITEM:"fielosf-invoice__item",ADD_PRODUCTS:"slds-button--addproducts",PRODUCT_QTY:"fielosf-product_qty",PRODUCT_UNIT_PRICE:"fielosf-product_unit-price",PRODUCT_TOTAL_PRICE:"fielosf-product_total-price",PRODUCT_NAME:"fielosf-product_name",PRODUCT_FORM:"fielosf-invoice-form-addproducts",PRODUCT_ADD:"slds-form-product__add",PRODUCT_CANCEL:"slds-form-product__cancel",PRODUCT_SEARCH:"slds-form-product__search",RECENT_RECORDS:"fielosf-recent-records__model",RECENT_CHECKBOX:"fielosf-recent-records-checkbox",LOOKUP_PILL:"slds-pill_container",SHOW:"slds-show",INVOICE_AMOUNT:"fielosf-invoice_amount",TOTAL_POINTS:"fielosf-total_points",FILE_UPLOADER:"fielosf-multi-file-uploader",NEW_FILE_BUTTON:"slds-file-selector__button",BUTTON_ICON:"slds-button__icon",PILL_LABEL:"slds-pill__label",INPUT:"slds-input"},e.prototype.submitForm=function(){this.saveRecord_=!0;var e=this.element_.querySelector('[data-field-name="'+this.Constant_.MEMBER+'"]').FieloFormElement.get("value");this.getHasDetails(e)},e.prototype.save_=function(){fielo.util.spinner.FieloSpinner.show();var e=this.element_.querySelector('[data-field-name="'+this.Constant_.MEMBER+'"]').FieloFormElement.get("value"),t="",s="",i=[];if(e){t=this.element_.querySelector('[data-field-name="FieloPRP__HasDetails__c"]').FieloFormElement.get("value"),fielo.util.spinner.FieloSpinner.show();var l=this.getValues_();""===l.Id&&delete l.Id,""!==l.FieloPRP__Date__c&&null!==l.FieloPRP__Date__c&&void 0!==l.FieloPRP__Date__c||(delete l.FieloPRP__Date__c,i.push("FieloPRP__Date__c"));var o=this.itemsContainer_.FieloInvoiceItems.get();t&&null!==l.FieloPRP__Amount__c&&void 0!==l.FieloPRP__Amount__c&&delete l.FieloPRP__Amount__c;try{Visualforce.remoting.Manager.invokeAction(this.Constant_.SAVE_CONTROLLER,l,t?o:null,i,this.saveCallback_.bind(this),{escape:!1})}catch(n){console.warn(n)}}else s={message:BackEndJSSettings.LABELS.MemberMustBeChosen,redirectURL:"#"},this.form_.processRemoteActionResult_(null,s);this.keepItems_=!1},e.prototype.saveCallback_=function(e,t){var s=this.element_.getElementsByClassName(this.CssClasses_.FILE_UPLOADER)[0].FieloMultiFileUploaderPRP.fileList,i=this.element_.getElementsByClassName(this.CssClasses_.FILE_UPLOADER)[0].FieloMultiFileUploaderPRP.deleteList;if(this.hasAttachments=!!s&&Object.keys(s).length>0,this.hasDeletedAttachments=!!i&&i.length>0,null===e.redirectURL||void 0===e.redirectURL)this.form_.processRemoteActionResult_(e,t);else if(this.hasAttachments||this.hasDeletedAttachments){var l=e.redirectURL.substring(1,e.redirectURL.length);this.element_.getElementsByClassName(this.CssClasses_.FILE_UPLOADER)[0].FieloMultiFileUploaderPRP.uploadFile(l)}else this.form_.processRemoteActionResult_(e,t)},e.prototype.getValues_=function(){this.form_.elements_=[];var e={};return[].forEach.call(this.invoiceElements_,function(t){if(""!==t.FieloFormElement.get("fieldName")){var s=t.FieloFormElement.get("fieldName");s&&(this.form_.elements_[s]=t,e[s]=t.FieloFormElement.get("value"))}},this),e},e.prototype.setValues_=function(){return this.itemsContainer_.FieloInvoiceItems.set()},e.prototype.clear_=function(){this.keepItems_||(this.disableMemberValidation=!0,[].forEach.call(this.invoiceElements_,function(e){e.FieloFormElement.clear()}),this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0].FieloInvoiceItems.clear(),this.initItem_(this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0]),this.element_.getElementsByClassName(this.CssClasses_.FILE_UPLOADER)[0].FieloMultiFileUploaderPRP.clearPills(),this.disableMemberValidation=!1)},e.prototype.setProductsFilter_=function(){this.productRecent_=document.getElementById(this.Constant_.PRODUCT_RECENT),this.productPaginator_=this.productRecent_.FieloRecentRecords.getPaginator().FieloPaginator,this.productFilter=[],this.productFilter.IsActive=!0,this.productPaginator_.setFilters(this.productFilter)},e.prototype.reloadproductRecent_=function(){this.keepItems_=!0,this.productRecent_=document.getElementById(this.Constant_.PRODUCT_RECENT),null!==this.productRecent_&&void 0!==this.productRecent_&&(this.resetSearch_(),this.setProductsFilter_(),this.recentPaginator_=this.productRecent_.FieloRecentRecords.getPaginator().FieloPaginator,this.recentPaginator_.setPage(),this.recentPaginator_.getRecords())},e.prototype.resetSearch_=function(){this.productRecent_=document.getElementById(this.Constant_.PRODUCT_RECENT),null!==this.productRecent_&&void 0!==this.productRecent_&&(this.searchFields_=this.productForm_.getElementsByClassName(this.CssClasses_.ELEMENT),this.newFilters_=[],[].forEach.call(this.searchFields_,function(e){this.filterField_=e.FieloFormElement,this.productPaginator_=this.productRecent_.FieloRecentRecords.getPaginator().FieloPaginator,delete this.productPaginator_.getFilters()[this.filterField_.get("fieldName")]},this),this.productPaginator_.setFilters(this.newFilters_))},e.prototype.searchRecords_=function(){this.productRecent_=document.getElementById(this.Constant_.PRODUCT_RECENT),null!==this.productRecent_&&void 0!==this.productRecent_&&(this.searchFields_=this.productForm_.getElementsByClassName(this.CssClasses_.ELEMENT),this.newFilters_=[],[].forEach.call(this.searchFields_,function(e){this.filterField_=e.FieloFormElement,this.productPaginator_=this.productRecent_.FieloRecentRecords.getPaginator().FieloPaginator,""!==this.filterField_.get("value")&&null!==this.filterField_.get("value")&&void 0!==this.filterField_.get("value")?"input-double"===this.filterField_.get("type")?this.newFilters_[this.filterField_.get("fieldName")]=parseFloat(this.filterField_.get("value")):this.newFilters_[this.filterField_.get("fieldName")]=this.filterField_.get("value"):delete this.productPaginator_.getFilters()[this.filterField_.get("fieldName")]},this),this.productPaginator_.setFilters(this.newFilters_),this.productPaginator_.setPage(),this.productPaginator_.getRecords())},e.prototype.resetKeepItems=function(){this.keepItems_=!1},e.prototype.showItems_=function(){null===this.memberField_.FieloFormElement.get("value")||void 0===this.memberField_.FieloFormElement.get("value")?$(this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)).addClass("slds-hide"):$(this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)).removeClass("slds-hide")},e.prototype.initItem_=function(e){this.elementFields=e.getElementsByClassName(this.CssClasses_.ELEMENT),[].forEach.call(this.elementFields,function(e){e.addEventListener("change",this.refreshTotalPriceProxy_.bind(this)),componentHandler.upgradeElement(e)},this),$('[data-field-name="'+this.productField+'"]').find("#invoiceForm--input").keypress(this.protectProductField_.bind(this))},e.prototype.protectProductField_=function(e){""===$('[data-field-name="FieloPRP__Member__c"]')[0].FieloFormElement.get("value")&&$('[data-field-name="'+this.productField+'"]').find("#invoiceForm--input").blur(),this.verifyMember_(e)},e.prototype.initNewItem=function(){this.invoiceItems=this.element_.getElementsByClassName(this.CssClasses_.INVOICE_ITEM),this.lastInvoiceItem=this.invoiceItems[this.invoiceItems.length-1],this.initItem_(this.lastInvoiceItem)},e.prototype.updateProductBasket=function(){this.recentProductRecords_=this.productForm_.getElementsByClassName(this.CssClasses_.RECENT_RECORDS),this.productsInfo_=[],[].forEach.call(this.recentProductRecords_,function(e){this.recordCheckbox=e.querySelector("."+this.CssClasses_.RECENT_CHECKBOX).querySelector("input"),this.recordCheckbox.checked===!0&&this.productsInfo_.push(e.getAttribute(this.Constant_.DATA_RECORD_ID))},this),this.invoiceItems_=this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0],this.getEmptyInvoiceItems(),[].forEach.call(this.productsInfo_,function(e){null!==e&&void 0!==e&&(this.availableSlots.length>0?this.lastInvoiceItem=this.availableSlots.pop():(this.invoiceContainerItems_=this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0],this.invoiceContainerItems_.FieloInvoiceItems.newinvoiceItem_(),this.invoiceItems_=this.element_.getElementsByClassName(this.CssClasses_.INVOICE_ITEM),this.lastInvoiceItem=this.invoiceItems_[this.invoiceItems_.length-1]),this.initItem_(this.lastInvoiceItem),this.elementFields=this.lastInvoiceItem.getElementsByClassName(this.CssClasses_.ELEMENT),$(this.lastInvoiceItem).find($('[data-field-name="'+this.productField+'"]'))[0].FieloFormElement.set("value",e),$(this.lastInvoiceItem).find($('[data-field-name="FieloPRP__Quantity__c"]'))[0].FieloFormElement.set("value",1),this.activeItem=this.lastInvoiceItem,this.activeItem.setAttribute("data-value",e))},this),this.productRecent_.FieloRecentRecords.uncheckAll()},e.prototype.getEmptyInvoiceItems=function(){var e;this.availableSlots=[],[].forEach.call(this.element_.getElementsByClassName(this.CssClasses_.INVOICE_ITEM),function(t){e=$(t).find($('[data-field-name="'+this.productField+'"]'))[0].FieloFormElement.get("value"),null!==e&&void 0!==e||this.availableSlots.push(t)},this)},e.prototype.refreshTotal=function(){if(this.hasAmountFields){this.invoiceItems_=this.element_.getElementsByClassName(this.CssClasses_.INVOICE_ITEM);var e,t=Number(0);[].forEach.call(this.invoiceItems_,function(s){e=$(s).find($('[data-field-name="FieloPRP__TotalPrice__c"]'))[0].FieloFormElement.get("value"),e=isNaN(parseFloat(e))?parseFloat(0):parseFloat(e),t+=Number(parseFloat(e))},this),this.invoiceTotal_=this.element_.querySelector("."+this.CssClasses_.TOTAL_POINTS),this.invoiceTotal_.innerHTML=parseFloat(t).toFixed(2)}},e.prototype.refreshTotalPriceProxy_=function(e){var t=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;if(console.log(t),this.verifyMember_(e),this.hasAmountFields){var s,i;t?(s=$(e.target).closest("."+this.CssClasses_.INVOICE_ITEM)[0],i=$(e.target).closest("."+this.CssClasses_.ELEMENT)[0].FieloFormElement.get("fieldName")):(s=$(e.srcElement).closest("."+this.CssClasses_.INVOICE_ITEM)[0],i=$(e.srcElement).closest("."+this.CssClasses_.ELEMENT)[0].FieloFormElement.get("fieldName"));var l=$(s).find($('[data-field-name="FieloPRP__UnitPrice__c"]'))[0],o=$(s).find($('[data-field-name="FieloPRP__Quantity__c"]'))[0],n=$(s).find($('[data-field-name="FieloPRP__TotalPrice__c"]'))[0],r=l?l.FieloFormElement:null,a=o?o.FieloFormElement:null,_=n?n.FieloFormElement:null;r&&(null!==r.get("value")&&void 0!==r.get("value")&&""!==r.get("value")||r.set("value",0)),a&&(null!==a.get("value")&&void 0!==a.get("value")&&""!==a.get("value")||a.set("value",0)),_&&(null!==_.get("value")&&void 0!==_.get("value")&&""!==_.get("value")||_.set("value",0)),_&&a&&r&&("FieloPRP__Quantity__c"===i&&_.set("value",(parseFloat(a.get("value"))*parseFloat(r.get("value"))).toFixed(2)),"FieloPRP__UnitPrice__c"===i&&_.set("value",(parseFloat(a.get("value"))*parseFloat(r.get("value"))).toFixed(2)),"FieloPRP__TotalPrice__c"===i&&r.set("value",(parseFloat(a.get("value"))>0?parseFloat(_.get("value"))/parseFloat(a.get("value")):0).toFixed(2))),this.refreshTotal()}},e.prototype.verifyMember_=function(e){if(!this.disableMemberValidation){var t=document.querySelector('[data-field-name="FieloPRP__Member__c"]').FieloFormElement.get("value");null===t||void 0===t?(e.stopPropagation(),e.preventDefault(),this.keepItems_=!1,this.clear_(),this.throwMessage(BackEndJSSettings.LABELS.MemberMustBeChosen,"error"),$('[data-field-name="FieloPRP__Member__c"]').find("#invoiceForm--input")[0].focus()):(this.memberNotNull=!0,$(e.srcElement).hasClass(this.CssClasses_.ADD_PRODUCTS)||$(e.srcElement).hasClass(this.CssClasses_.NEW)||$(e.srcElement).hasClass(this.CssClasses_.ELEMENT)||$(e.srcElement).hasClass(this.CssClasses_.INPUT)?this.validateHasDetails=!0:this.validateHasDetails=!1,this.currentEvent_=e,this.getHasDetails(t))}},e.prototype.getHasDetails=function(e){Visualforce.remoting.Manager.invokeAction("FieloPRP.FormInvoiceController.getHasDetailsFromMember",e,this.callbackHandler.bind(this),{escape:!0})},window.FieloFormInvoice_refreshPoints=e.prototype.refreshTotalPriceProxy_,e.prototype.setParameters_=function(){for(var e in this.parameters_)this.parameters_.hasOwnProperty(e)&&this.elements_.hasOwnProperty(e)&&this.elements_[e].FieloFormElement.set("value",this.parameters_[e])},e.prototype.retrieveHandler_=function(e){fielo.util.spinner.FieloSpinner.show(),this.result=e;try{var t="|";for(var s in e)e.hasOwnProperty(s)&&s.indexOf("__r")>-1&&(t+=s.slice(0,-1)+"c|");this.fields_.forEach(function(s){if(t.indexOf(s)>-1){var i;switch(typeof e[s.slice(0,-1)+"r"]){case"object":i=e[s.slice(0,-1)+"r"];var l;for(var o in i)if(i.hasOwnProperty(o)&&o.indexOf("__c")>-1){l=o;break}i=l?i[l].split(";"):e[s];break;case"array":default:i=e[s.slice(0,-1)+"r"]}this.elements_[s].FieloFormElement.set("value",i)}else this.elements_[s]&&("input-date"===this.elements_[s].FieloFormElement.get("type")&&(e[s]=fielo.util.parseDateFromSF(e[s])),this.elements_[s].FieloFormElement.set("value",e[s]))},this),this.result.FieloPRP__InvoiceItems__r&&(this.getEmptyInvoiceItems(),this.result.FieloPRP__InvoiceItems__r.forEach(function(e){this.availableSlots.length>0?this.lastInvoiceItem=this.availableSlots.pop():(this.invoiceContainerItems_=this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0],this.invoiceContainerItems_.FieloInvoiceItems.newinvoiceItem_(),this.invoiceItems_=this.element_.getElementsByClassName(this.CssClasses_.INVOICE_ITEM),this.lastInvoiceItem=this.invoiceItems_[this.invoiceItems_.length-1]),this.initItem_(this.lastInvoiceItem),this.elementFields=this.lastInvoiceItem.getElementsByClassName(this.CssClasses_.ELEMENT),[].forEach.call(Object.keys(e),function(t){if("Id"===t)e[t]&&this.lastInvoiceItem.setAttribute("data-record-id",e[t]);else if(e[t]){var s=$(this.lastInvoiceItem).find($('[data-field-name="'+t+'"]'))[0];s&&s.FieloFormElement.set("value",e[t])}},this)},this)),this.result.Attachments&&[].forEach.call(this.result.Attachments,function(e){this.multiFileUploader_.FieloMultiFileUploaderPRP.addEmptyFilePill(e)},this),this.result.ContentDocumentLinks&&[].forEach.call(this.result.ContentDocumentLinks,function(e){e.ContentDocument&&this.multiFileUploader_.FieloMultiFileUploaderPRP.addEmptyFilePill(e.ContentDocument)},this),this.setParameters_(),this.endRetrieve(),this.disableMemberEdit_()}catch(i){var l=fielo.util.notify.create();l.FieloNotify.addMessages([this.Constant_.HAS_ERROR,i]),l.FieloNotify.setTheme("error"),l.FieloNotify.show()}fielo.util.spinner.FieloSpinner.hide()},e.prototype.retrieve_=function(e){if(this.parameters_=e.FieloButton.getParameters(),this.setParameters_(),this.parameters_.hasOwnProperty("Id")||this.parameters_.hasOwnProperty("cloneId")){this.isEditing=!0,this.recordId_=this.parameters_.Id;var t=this.parameters_.Id||this.parameters_.cloneId,s=Object.keys(this.getValues_()).join(),i=Object.keys(this.itemsContainer_.FieloInvoiceItems.get()[0]).join(),l=this.element_.getAttribute(this.Constant_.OBJECT_NAME);Visualforce.remoting.Manager.invokeAction(this.retrieveController_,l,t,s,i,this.retrieveHandler_.bind(this),{escape:!0})}else this.isEditing=!1,this.setParameters_(),this.endRetrieve()},e.prototype.checkHasDetails=function(){var e=this.element_.querySelector('[data-field-name="FieloPRP__HasDetails__c"]').FieloFormElement.get("value");if(!e){this.currentEvent_.stopPropagation(),this.currentEvent_.preventDefault(),this.keepItems_=!1,this.clear_(),this.closeProducsModalIfOpened_();var t={message:BackEndJSSettings.LABELS.InvoiceDetailInsertDisabled};this.form_.processRemoteActionResult_(null,t)}},e.prototype.callbackHandler=function(e){e&&this.element_.querySelector('[data-field-name="FieloPRP__HasDetails__c"]').FieloFormElement.set("value",e),this.validateHasDetails&&(this.checkHasDetails(),this.validateHasDetails=!1),this.saveRecord_&&(this.saveRecord_=!1,this.save_())},e.prototype.hasDetailsCheck=function(){var e=this.element_.querySelector('[data-field-name="FieloPRP__HasDetails__c"]'),t=this.element_.querySelector("."+this.CssClasses_.ITEMS_CONTAINER);if($(e).addClass("slds-hidden"),$(e).addClass("slds-is-collapsed"),null!==this.result&&void 0!==this.result){var s=this.result.FieloPRP__HasDetails__c,i=this.result.FieloPRP__Member__c;null===i||s||($(t).addClass("slds-hidden"),$(t).addClass("slds-is-collapsed")),null!==i&&s&&this.hideAmount_()}componentHandler.upgradeElement(e)},e.prototype.endRetrieve=function(){this.hasDetailsCheck(),this.refreshTotal()},e.prototype.closeProducsModalIfOpened_=function(){$("."+this.CssClasses_.PRODUCT_FORM).hasClass("slds-show")&&$(".fielosf-invoice-form-addproducts").modal("hide"),$(".fielosf-invoice-form").hasClass("slds-hide")&&$(".fielosf-invoice-form").modal("show")},e.prototype.hideAmount_=function(){var e=this.element_.querySelector('[data-field-name="FieloPRP__Amount__c"]');$(e).addClass("slds-hidden"),$(e).addClass("slds-is-collapsed")},e.prototype.disableMemberEdit_=function(){$('[data-field-name="FieloPRP__Member__c"]').addClass("disabled")},e.prototype.getActiveProgram=function(){Visualforce.remoting.Manager.invokeAction(this.Constant_.GET_PROGRAM_CONTROLLER,this.getActiveProgramCallback.bind(this),{escape:!0})},e.prototype.getActiveProgramCallback=function(e){this.isEditing||(e.FieloPRP__RequestInvoiceProducts__c?($("."+this.CssClasses_.ITEMS_CONTAINER).removeClass("slds-hidden"),$("."+this.CssClasses_.ITEMS_CONTAINER).removeClass("slds-is-collapsed"),$('[data-field-name="FieloPRP__Amount__c"]').addClass("slds-hidden"),$('[data-field-name="FieloPRP__Amount__c"]').addClass("slds-is-collapsed")):($("."+this.CssClasses_.ITEMS_CONTAINER).addClass("slds-hidden"),$("."+this.CssClasses_.ITEMS_CONTAINER).addClass("slds-is-collapsed"),$('[data-field-name="FieloPRP__Amount__c"]').removeClass("slds-hidden"),$('[data-field-name="FieloPRP__Amount__c"]').removeClass("slds-is-collapsed")))},e.prototype.getHasFields=function(){this.hasAmountFields=!1,this.itemsContainer_.querySelector('[data-field-name="FieloPRP__Quantity__c"]')&&this.itemsContainer_.querySelector('[data-field-name="FieloPRP__UnitPrice__c"]')&&this.itemsContainer_.querySelector('[data-field-name="FieloPRP__TotalPrice__c"]')&&(this.hasAmountFields=!0),this.hasAmountFields===!1&&[].forEach.call(this.itemsContainer_.querySelector("tfoot").querySelectorAll("td"),function(e){e.innerHTML=""},this)},e.prototype.throwMessage=function(e,t){var s=fielo.util.notify.create();s.FieloNotify.addMessages([e]),s.FieloNotify.setTheme(t),s.FieloNotify.show()},e.prototype.retrieveProxy_=function(e,t){e.FieloFormInvoice.clear_(),e.FieloFormInvoice.retrieve_(t)},window.FieloFormInvoice_retrieve=e.prototype.retrieveProxy_,e.prototype.init=function(){if(this.element_){if(this.openForm_=location.hash.split("#").slice(1),this.retrieveController_=this.element_.getAttribute(this.Constant_.RETRIEVE_CONTROLLER),this.productField=this.element_.getAttribute(this.Constant_.PRODUCT_FIELD),this.form_=this.element_.FieloForm,this.itemsContainer_=this.element_.getElementsByClassName(this.CssClasses_.ITEMS_CONTAINER)[0],null!==this.itemsContainer_&&void 0!==this.itemsContainer_&&componentHandler.upgradeElement(this.itemsContainer_),this.getHasFields(),this.element_.FieloForm.save_=this.submitForm.bind(this),this.form_.clear_=this.clear_.bind(this),this.invoiceElements_=$(this.element_.getElementsByClassName(this.CssClasses_.ELEMENT)).not(null!==this.itemsContainer_&&void 0!==this.itemsContainer_?this.itemsContainer_.getElementsByClassName(this.CssClasses_.ELEMENT):null),this.fields_=Object.keys(this.getValues_()),this.elements_=[],[].forEach.call(this.element_.getElementsByClassName(this.CssClasses_.CONTAINER),function(e){componentHandler.upgradeElement(e),this.elements_[e.FieloFormElement.get("fieldName")]=e},this),this.form_.save_=this.submitForm.bind(this),this.openForm_.length>0){var e=this.openForm_[1];this.memberField_.FieloFormElement.set("value",e),
$(this.element_).modal("show")}this.invoiceAmount_=this.element_.querySelector("."+this.CssClasses_.INVOICE_AMOUNT),null!==this.keepItems_&&void 0!==this.keepItems_||(this.keepItems_=!1),this.addProductsBtn_=this.element_.getElementsByClassName(this.CssClasses_.ADD_PRODUCTS)[0],this.addProductsBtn_.addEventListener("click",this.verifyMember_.bind(this)),this.addProductsBtn_.addEventListener("click",this.reloadproductRecent_.bind(this)),this.cancelBtn_=this.element_.getElementsByClassName(this.CssClasses_.CANCEL)[0],this.cancelBtn_.addEventListener("click",this.resetKeepItems.bind(this)),this.newProductBtn=this.element_.getElementsByClassName(this.CssClasses_.NEW)[0],this.newProductBtn.addEventListener("click",this.verifyMember_.bind(this)),this.newProductBtn.addEventListener("click",this.initNewItem.bind(this)),this.productForm_=document.getElementsByClassName(this.CssClasses_.PRODUCT_FORM)[0],null!==this.productForm_&&void 0!==this.productForm_&&(this.productFormAddBtn_=this.productForm_.getElementsByClassName(this.CssClasses_.PRODUCT_ADD)[0],this.productFormAddBtn_.addEventListener("click",this.updateProductBasket.bind(this)),this.productFormSearchBtn_=this.productForm_.getElementsByClassName(this.CssClasses_.PRODUCT_SEARCH)[0],this.productFormSearchBtn_.addEventListener("click",this.searchRecords_.bind(this)),this.cancelProductsAddBtn_=document.getElementsByClassName(this.CssClasses_.PRODUCT_CANCEL)[0],this.productRecent_=document.getElementById(this.Constant_.PRODUCT_RECENT),this.cancelProductsAddBtn_.addEventListener("click",this.productRecent_.FieloRecentRecords.uncheckAll.bind(this.productRecent_.FieloRecentRecords))),$(this.element_).on("shown.aljs.modal",function(){var e=document.getElementsByClassName("fielosf-invoice-form")[0];e.FieloFormInvoice.getActiveProgram()}),$(this.element_).on("select",function(){var e=document.getElementsByClassName("fielosf-invoice-form")[0];e.FieloFormInvoice.getActiveProgram()}),this.multiFileUploader_=this.element_.getElementsByClassName(this.CssClasses_.FILE_UPLOADER)[0],this.newFileBtn_=this.multiFileUploader_.getElementsByClassName(this.CssClasses_.NEW_FILE_BUTTON)[0],this.newFileBtn_.addEventListener("click",this.verifyMember_.bind(this))}},fielo.helper.register({constructor:e,classAsString:"FieloFormInvoice",cssClass:"fielosf-invoice-form",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloFormInvoiceApproval=e,e.prototype.Constant_={SAVE_CONTROLLER:"FieloPRP.FormApprovalController.save",COMMENTS:"FieloPRP__Comments__c",REJECT_REASON:"FieloPRP__RejectReason__c",RECORD_ID:"data-record-id"},e.prototype.CssClasses_={SAVE:"slds-form-approval__save"},e.prototype.endRetrieve=function(){this.form_.parameters_&&this.form_.parameters_.type&&("reject"===this.form_.parameters_.type?($(this.element_.querySelector('[data-field-name="'+this.Constant_.REJECT_REASON+'"]')).toggle(!0),this.element_.querySelector('[data-field-name="'+this.Constant_.REJECT_REASON+'"]').required_=!0):($(this.element_.querySelector('[data-field-name="'+this.Constant_.REJECT_REASON+'"]')).toggle(!1),this.element_.querySelector('[data-field-name="'+this.Constant_.REJECT_REASON+'"]').required_=!1))},e.prototype.save=function(){fielo.util.spinner.FieloSpinner.show(),this.form_.parameters_&&this.form_.parameters_.type&&(this.action=this.form_.parameters_.type),this.formValues={},this.nullFields=[],this.formValues.Id=this.recordId,this.formValues[this.Constant_.COMMENTS]=this.element_.querySelector('[data-field-name="'+this.Constant_.COMMENTS+'"]').FieloFormElement.get("value"),"reject"===this.action?this.formValues[this.Constant_.REJECT_REASON]=this.element_.querySelector('[data-field-name="'+this.Constant_.REJECT_REASON+'"]').FieloFormElement.get("value"):this.formValues[this.Constant_.REJECT_REASON]=null,null===this.formValues[this.Constant_.COMMENTS]&&this.nullFields.push(this.Constant_.COMMENTS),null===this.formValues[this.Constant_.REJECT_REASON]&&this.nullFields.push(this.Constant_.REJECT_REASON);try{"reject"!==this.action||this.form_.checkRequiredPassOk_()?Visualforce.remoting.Manager.invokeAction(this.Constant_.SAVE_CONTROLLER,this.formValues,this.action,this.nullFields,this.form_.processRemoteActionResult_.bind(this.form_),{escape:!1}):fielo.util.spinner.FieloSpinner.hide()}catch(e){console.warn(e)}},e.prototype.init=function(){this.element_&&(this.form_=this.element_.FieloForm,this.form_.endRetrieve=this.endRetrieve.bind(this),this.recordId=this.element_.getAttribute(this.Constant_.RECORD_ID),this.saveBtn_=this.element_.querySelector("."+this.CssClasses_.SAVE),this.saveBtn_.addEventListener("click",this.save.bind(this)))},fielo.helper.register({constructor:e,classAsString:"FieloFormInvoiceApproval",cssClass:"fielosf-invoice-approval",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloFormInvoiceApprover=e,e.prototype.Constant_={SAVE_CONTROLLER:"FieloPRP.FormSubmitForApprovalController.save",RECORD_ID:"data-record-id"},e.prototype.CssClasses_={SAVE:"slds-form-approver__save"},e.prototype.save=function(){fielo.util.spinner.FieloSpinner.show(),this.formValues={},this.nullFields=[],this.formValues.Id=this.recordId,this.formValues.ApproverId=this.element_.querySelector('[data-field-name="approver"]').FieloFormElement.get("value");try{this.form_.checkRequiredPassOk_()?Visualforce.remoting.Manager.invokeAction(this.Constant_.SAVE_CONTROLLER,this.formValues,this.form_.processRemoteActionResult_.bind(this.form_),{escape:!1}):fielo.util.spinner.FieloSpinner.hide()}catch(e){console.warn(e)}},e.prototype.init=function(){this.element_&&(this.form_=this.element_.FieloForm,this.recordId=this.element_.getAttribute(this.Constant_.RECORD_ID),this.saveBtn_=this.element_.querySelector("."+this.CssClasses_.SAVE),this.saveBtn_.addEventListener("click",this.save.bind(this)))},fielo.helper.register({constructor:e,classAsString:"FieloFormInvoiceApprover",cssClass:"fielosf-invoice-approver",widget:!0})}(),function(){"use strict";var e=function(e){this.element_=e,this.init()};window.FieloSubmitForApproval=e,e.prototype.Constant_={SUBMIT_CONTROLLER:"FieloPRP.FormSubmitForApprovalController.submitForApproval",RECORD_ID:"data-record-id"},e.prototype.CssClasses_={FORM_APPROVER:"fielosf-invoice-approver"},e.prototype.submit=function(){fielo.util.spinner.FieloSpinner.show(),this.record={},this.record.Id=this.recordId;try{Visualforce.remoting.Manager.invokeAction(this.Constant_.SUBMIT_CONTROLLER,this.record,this.submitCallback.bind(this),{escape:!1})}catch(e){console.warn(e)}},e.prototype.submitCallback=function(e){if(this.formApprover=document.querySelector("."+this.CssClasses_.FORM_APPROVER),e.choseApproverFirst)this.formApprover&&($(this.formApprover).modal("show"),fielo.util.spinner.FieloSpinner.hide());else if(e.response&&this.formApprover&&this.formApprover.FieloFormInvoiceApprover&&this.formApprover.FieloFormInvoiceApprover.form_){var t=fielo.util.notify.create();t.FieloNotify.addMessages([e.response.messages[0].summary]),t.FieloNotify.setTheme(e.response.messages[0].severity.toLowerCase()),t.FieloNotify.show(),fielo.util.spinner.FieloSpinner.hide(),"error"!==e.response.messages[0].severity.toLowerCase()&&location.reload()}},e.prototype.init=function(){this.element_&&(this.form_=this.element_.FieloForm,this.recordId=this.element_.getAttribute(this.Constant_.RECORD_ID),this.element_.addEventListener("click",this.submit.bind(this)))},fielo.helper.register({constructor:e,classAsString:"FieloSubmitForApproval",cssClass:"fielosf-invoice-submit-for-approval",widget:!0})}();
//# sourceMappingURL=core.js.map
