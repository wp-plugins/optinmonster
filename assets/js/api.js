/*! built on Tue May 26 2015 18:56:25 */function OptinMonsterApp(){this["public"]={},this.init=function(a){for(key in a)this["public"][key]=a[key];this.setDefaults(),this.getProp("preview")?this.run():this.loadjQuery()},this.run=function(){this.setVisibilityDefaults(),this.loadjQuery()},this.setVisibilityDefaults=function(){var a=this,b=a.getProp("type");"slide"==b&&this.setProp("slide_open",!1),OptinMonsterAppOptins[this.getProp("optin_js")]={type:b,visible:!1}},this.loadjQuery=function(){var a=this,b=!1;if(void 0===window.jQuery){var c=document.createElement("script");c.src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js",c.onload=c.onreadystatechange=function(){var c=this.readyState;if(!c||"complete"==c||"loaded"==c)try{b||(a.loadjQueryHandler(!1),b=!0)}catch(d){}},(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(c)}else if("1.11.2"!==window.jQuery.fn.jquery){this["public"].ejQuery=window.jQuery;var c=document.createElement("script");c.src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js",c.onload=c.onreadystatechange=function(){var c=this.readyState;if(!c||"complete"==c||"loaded"==c)try{b||(a.loadjQueryHandler(!0),b=!0)}catch(d){}},(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(c)}else a["public"].$=a["public"].ejQuery=window.jQuery,a.loadApp()},this.loadjQueryHandler=function(a){a?(this["public"].$=window.jQuery.noConflict(!0),this.loadApp()):(jQuery=window.jQuery.noConflict(!0),this["public"].$=this["public"].ejQuery=jQuery,this.loadApp())},this.loadApp=function(){var a=this;a["public"].$(document).ready(function(b){a.corsPatch(),a.runOptinMonster()})},this.runOptinMonster=function(){if(this.getProp("preview"))this.trigger("OptinMonsterInit"),this.fonts();else{var a=this.getProp("u").split("."),b=this.retrieveSuccess(this),c=this.retrieveError(this),d=a[0],e=a[1],f=this.getProp("api_optin")+d+"/"+e;this.requestJSONP(f,b,c)}},this.retrieveSuccess=function(a){var b=a.getProp("$");return function(c){var d=b.map(c,function(a,b){return[a]});a.setProp("original_id",d[0].output.id),a.setProp("original_optin",d[0].output.optin);var e=a.pickRandomKey(d);for(key in d[e])d[e].hasOwnProperty(key)&&(a["public"][key]=d[e][key]);for(prop in a["public"].output)a["public"].output.hasOwnProperty(prop)&&(a["public"][prop]=a["public"].output[prop]);a.canLoad()&&a.fonts(!0)}},this.retrieveError=function(a){return function(b,c,d){a.trigger("OptinMonsterRetrieveError"),a.log(b,c,d)}},this.canLoad=function(){if(!this.websiteMatch())return!1;if(this.getProp("page_slug").length>0&&!this.pageSlugMatch())return!1;if(this.getProp("referrer")&&!this.referrerMatch())return!1;if("sidebar"!==this.getProp("type")&&"post"!==this.getProp("type")&&!this.getProp("preview")&&!this.getProp("click")){if(!this.cookiesEnabled()&&!this.getProp("test"))return!1;var a=this.getCookie("om-global-cookie"),b=this.getCookie("om-"+this.getProp("migrated_id")),c=this.getCookie("om-"+this.getProp("id")),d=this.getProp("second"),e=this.getProp("test"),f=this.getProp("type");if(this.isMobile()&&!this.getProp("mobile"))return!1;if(!this.isMobile()&&this.getProp("mobile"))return!1;if(d&&!e&&!this.getCookie("om-second-"+this.getProp("id")))return this.createCookie("om-second-"+this.getProp("id"),!0,this.getProp("cookie")),!1;if((a||b||c)&&!e&&"slide"!==f)return!1}return!0},this.inject=function(){var a=this,b=a.getProp("$");a.normalize();var c=a.getProp("optin"),d=a.getProp("html"),e=b("#om-"+c+"-holder");if(0!==e.length){a.setVisibilityDefaults(),a.shortcodes(),e.append(d),a.outbound();var f=a.getProp("parsing_shortcode"),g=!1;f||g?a.poll(function(){a.getProp("parsing_shortcode")||g||(g=!0,a.load())},500):a.load()}},this.normalize=function(){var a=this,b=a.getProp("$"),c=a.getProp("original_optin"),d=a.getProp("optin");c!==d&&b("#om-"+c+"-holder").attr("id","om-"+d+"-holder")},this.outbound=function(){var a=this,b=a.getProp("$");b(document).find(".manual-optin-trigger, .om-monster-link").each(function(a,c){var d=b(this),e=d.data("optin-slug");if(e){var f=e.replace("-","_");if(!OptinMonsterAppLinkSlugs.hasOwnProperty(f)&&window[f]){if(!window[f].getProp("click"))return;OptinMonsterAppLinkSlugs[f]=window[f]}}}),b(document).on("click",".manual-optin-trigger, .om-monster-link",function(a){a.preventDefault();var c=b(this),d=c.data("optin-slug");if(d){var e=d.replace("-","_");OptinMonsterAppLinkSlugs.hasOwnProperty(e)&&OptinMonsterAppLinkSlugs[e].open(!0)}})},this.shortcodes=function(){var a=this,b=this.getProp("optin_js");if(window[b+"_shortcode"]){a.setProp("parsing_shortcode",!0);var c={action:"shortcode",nonce:omapi_localized.nonce,html:a.getProp("html")},d=this.shortcodeSuccess(a),e=this.shortcodeError(a);a.requestCORS(omapi_localized.ajax,c,d,e)}},this.shortcodeSuccess=function(a){return function(b){if(b){var c=a.getProp("$"),d=a.getProp("optin"),e=c("#om-"+d+"-holder");e.html(b)}a.setProp("parsing_shortcode",!1)}},this.shortcodeError=function(a){return function(b,c,d){a.trigger("OptinMonsterShortcodeError"),a.log(b,c,d)}},this.pickRandomKey=function(a){return Math.floor(Math.random()*a.length)},this.fonts=function(a){var b=this,c=b.getProp("fonts"),a=a||!1,d=!1;if(c.length>0){var e=document.createElement("script");e.src="//ajax.googleapis.com/ajax/libs/webfont/1.5.6/webfont.js",e.onload=e.onreadystatechange=function(){var c=this.readyState;if(!c||"complete"==c||"loaded"==c)try{d||(WebFont.load({google:{families:[b.getProp("fonts")]}}),b.trigger("OptinMonsterFontsLoaded"),a?b.inject():b.load(),d=!0)}catch(e){}},(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(e)}else a?b.inject():b.load()},this.load=function(){var a=this;a.sanitize(),a.iehotfix(),a.open()},this.sanitize=function(){var a=this,b=a.getProp("$"),c=b("#om-"+a.getProp("optin")),d=b("#om-"+a.getProp("optin")).find(":submit"),e=d.attr("name"),f=d.attr("id");"submit"==e&&c.find(":submit").attr("name","submit-om"),"submit"==f&&c.find(":submit").attr("id","submit-om")},this.iehotfix=function(){this.isIE()&&(this.loadPlaceholder(),this.doPlaceholder())},this.open=function(a){var b=this,c=b.getProp("exit"),d=b.getProp("click"),e=b.getProp("optin_js"),f="slide"==b.getProp("type")?0:b.getProp("delay"),g=b.getProp("scroll"),h=(b.getProp("$"),!1),a=a||!1;OptinMonsterAppOptins.hasOwnProperty(e)&&!0===OptinMonsterAppOptins[e].visible||((a||c)&&(f=0),(!d||a)&&setTimeout(function(){"mobile"!==b.getProp("type")&&b.appendHolder(),b.getProp("custom")&&b.prepareCustomOptin(),b.trigger("OptinMonsterLoaded"),!c||d||a?g?b.poll(function(){if(!h){var a=b.getScrollPercentage();a>=g&&(b.normalOpen(),h=!0)}},100):b.normalOpen():b.exitOpen()},f||0))},this.exitOpen=function(){var a=this,b=a.getProp("$"),c=a.getProp("optin_js"),d=!1;b(document).on("mouseleave",function(b){b.clientY>(a.getProp("exit_sensitivity")||20)||a.getCookie("om-"+a.getProp("id"))||a.getCookie("om-global-cookie")||OptinMonsterAppOptins.hasOwnProperty(c)&&!0===OptinMonsterAppOptins[c].visible||d||(d=!0,a.show(!0))})},this.normalOpen=function(){var a=this,b=a.getProp("type"),c=a.getProp("$");"mobile"!=b||a.getProp("preview")?a.show():(a.setProp("dw",c(document).width()),c(window).scrollTop()?c(window).on("scroll.omMobile",function(){clearTimeout(c.data(this,"omScrollTimer")),c.data(this,"omScrollTimer",setTimeout(function(){a.show()},300))}):a.show())},this.show=function(a){var b=this,c=b.getProp("$"),d=b.getProp("id"),e=b.getProp("optin"),f=b.getProp("optin_js"),g=b.getProp("type"),h=b.getProp("theme"),i=b.getProp("preview"),a=a||!1;if(!(OptinMonsterAppOptins.hasOwnProperty(f)&&!0===OptinMonsterAppOptins[f].visible||b.getCookie("om-global-cookie")&&!b.getProp("click")&&!i&&"sidebar"!==g&&"post"!==g)){if(b.trigger("OptinMonsterBeforeShow"),a){if("lightbox"==g||"canvas"==g)b.hasVisiblePopup()||(c("#om-"+e).show().css("display","block"),c("#om-"+e+" #om-"+g+"-"+h+"-optin").show().css("display","block"),b.positionOptin(),OptinMonsterAppOptins[b.getProp("optin_js")].visible=!0,b.fixFocusJumping(),b.trigger("OptinMonsterOnShow"),b.socialServices());else if(("footer"==g||"slide"==g)&&!b.getCookie("om-"+d+"-closed")){c("#om-"+e+" #om-"+g+"-"+h+"-optin").show().css("display","block");var j=i?78:0;c("#om-"+e).css("bottom","-"+c("#om-"+e).outerHeight()+"px").show().animate({bottom:parseInt(j)},300,function(){OptinMonsterAppOptins[b.getProp("optin_js")].visible=!0,b.trigger("OptinMonsterOnShow"),"slide"==g&&(b.slideHandlers(),setTimeout(function(){b.showSlide()},0)),b.socialServices()})}}else if("lightbox"==g||"canvas"==g||"mobile"==g)b.hasVisiblePopup()||("mobile"==g?(c("#om-"+e+", #om-"+e+"-overlay").appendTo("body"),c("#om-"+e+"-overlay").height(c(document).height()).show().css("display","block"),c("#om-"+e).show().css("display","block"),i||b.fixMobileScaling(),c("#om-"+g+"-"+h+"-optin").hide().fadeIn(300,function(){c("#om-"+e).css("top",c(document).scrollTop()),OptinMonsterAppOptins[b.getProp("optin_js")].visible=!0,b.trigger("OptinMonsterOnShow"),b.socialServices()})):c("#om-"+e).fadeIn(300,function(){c(this).find("#om-"+g+"-"+h+"-optin").show().css("display","block"),b.positionOptin(),OptinMonsterAppOptins[b.getProp("optin_js")].visible=!0,b.fixFocusJumping(),b.trigger("OptinMonsterOnShow"),b.socialServices()}));else if("footer"==g||"slide"==g){if(!b.getCookie("om-"+d+"-closed")||i){c("#om-"+e+" #om-"+g+"-"+h+"-optin").show().css("display","block");var j=i?78:0;c("#om-"+e).css("bottom","-"+c("#om-"+e).outerHeight()+"px").show().animate({bottom:parseInt(j)},300,function(){OptinMonsterAppOptins[b.getProp("optin_js")].visible=!0,b.trigger("OptinMonsterOnShow"),"slide"==g&&(b.slideHandlers(),setTimeout(function(){b.showSlide()},b.getProp("delay")||0)),b.socialServices()})}}else b.trigger("OptinMonsterOnShow"),b.socialServices();b.submit(),b.close(),b.track()}},this.fixMobileScaling=function(){var a=(this.getProp("type"),this.getProp("optin"),this.getProp("$")),b=a('meta[name="viewport"]');b.length>0||(a("head").append('<meta id="optin-monster-saas-viewport" name="viewport" content="width=device-width, initial-scale=1.0">'),a("html, body").css("overflow","hidden"))},this.fixFocusJumping=function(){{var a=this,b=a.getProp("optin"),c=a.getProp("type"),d=a.getProp("$");d("body").css("position")}a.isMobile()&&("lightbox"===c||"canvas"===c)&&(a.setProp("dt",d(document).scrollTop()),d("html, body").css("overflow","hidden"),window.scrollTo(0,0),d(document).on("focus.omFocusJump","input, select, textarea",function(){d("#om-"+b).css({position:"absolute",height:d(document).height()})}).on("blur.omFocusJump","input, select, textarea",function(){d("#om-"+b).css({position:"fixed",height:"100%"}),d("html, body").css("overflow","hidden")}))},this.positionOptin=function(){var a=this,b=a.getProp("$"),c=(a.getProp("id"),a.getProp("optin")),d=a.getProp("type"),e=a.getProp("theme"),f=a.getProp("preview"),g=b("#om-"+c+" .om-theme-"+e).width(),h=b("#om-"+c+" .om-theme-"+e).height(),i=b(window).height(),j=f?(i-h)/2-39:(i-h)/2;h>=i?"lightbox"==d||"canvas"==d?(b("#om-"+c).css({overflow:"scroll"}),b("#om-"+c+" .optin-monster-saas-powered-by").css({bottom:-55,paddingBottom:20}),b("#om-"+c+" .om-theme-"+e+", #om-"+c+" .optin-monster-saas-success-overlay").css({top:20,left:(b(window).width()-g)/2,position:"absolute"}),b(window).resize(function(){b("#om-"+c).css({overflow:"scroll"}),b("#om-"+c+" .optin-monster-saas-powered-by").css({bottom:-55,paddingBottom:20}),b("#om-"+c+" .om-theme-"+e+", #om-"+c+" .optin-monster-saas-success-overlay").css({top:20,left:(b(window).width()-b("#om-"+c+" .om-theme-"+e).width())/2,position:"absolute"})}),a.trigger("OptinMonsterPositionOptin")):a.trigger("OptinMonsterPositionOptin"):"lightbox"==d||"canvas"==d?(b("#om-"+c+" .om-theme-"+e+", #om-"+c+" .optin-monster-saas-success-overlay").css({top:j,left:(b(window).width()-g)/2}),b(window).resize(function(){var a=b("#om-"+c+" .om-theme-"+e).height(),d=b(window).height();a>=d?(b("#om-"+c).css({overflow:"scroll"}),b("#om-"+c+" .optin-monster-saas-powered-by").css({bottom:-55,paddingBottom:20}),b("#om-"+c+" .om-theme-"+e+", #om-"+c+" .optin-monster-saas-success-overlay").css({top:20,left:(b(window).width()-b("#om-"+c+" .om-theme-"+e).width())/2,position:"absolute"})):(j=f?(b(window).height()-b("#om-"+c+" .om-theme-"+e).height())/2-39:(b(window).height()-b("#om-"+c+" .om-theme-"+e).height())/2,b("#om-"+c+" .om-theme-"+e+", #om-"+c+" .optin-monster-saas-success-overlay").css({top:j,left:(b(window).width()-b("#om-"+c+" .om-theme-"+e).width())/2}))}),a.trigger("OptinMonsterPositionOptin")):a.trigger("OptinMonsterPositionOptin")},this.slideHandlers=function(){var a=this,b=a.getProp("$"),c=(a.getProp("id"),a.getProp("optin")),d=a.getProp("type"),e=a.getProp("theme");b(document).on("click.closeOptin","#om-"+c+" .om-slide-close-content, #om-"+c+" .om-close",function(f){f.target===this&&(f.preventDefault(),a.trigger("OptinMonsterBeforeClose"),b("#om-"+c+" #om-"+d+"-"+e+"-optin").removeClass("om-slide-open").addClass("om-slide-closed"),b("#om-"+c).find(".optin-monster-saas-success-overlay").remove(),a.cleanup())}),b(document).on("click.openOptin","#om-"+c+" .om-slide-open-content",function(f){f.target===this&&(f.preventDefault(),a.trigger("OptinMonsterBeforeShow"),b("#om-"+c+" #om-"+d+"-"+e+"-optin").removeClass("om-slide-closed").addClass("om-slide-open"),a.setProp("slide_open",!0))})},this.showSlide=function(){var a=this,b=a.getProp("$"),c=a.getProp("id"),d=a.getProp("optin"),e=a.getProp("type"),f=a.getProp("theme");(!a.getCookie("om-"+c)&&!a.getProp("slide_open")||a.getProp("preview"))&&(b("#om-"+d+" #om-"+e+"-"+f+"-optin").removeClass("om-slide-closed").addClass("om-slide-open"),a.setProp("slide_open",!0))},this.submit=function(){var a=this,b=a.getProp("$"),c=a.getProp("optin"),d=a.getProp("type"),e=a.getProp("theme"),f=a.getProp("custom"),g=a.getProp("submitted")||!1;if(!a.getProp("preview")&&!g)if(f){var h=!1;b(document).on("submit.doCustomOptin",".om-custom-html-form form",function(e){return h?void("lightbox"==d||"canvas"==d?b("#om-"+c).fadeOut(300,a.onClose(a)):("footer"==d||"slide"==d)&&b("#om-"+c).animate({bottom:"-"+b("#om-"+c).outerHeight()+"px"},300,a.onClose(a))):(h=!0,a.trigger("OptinMonsterBeforeOptin"),a.optin(e.target,!0),e.preventDefault(),!1)})}else a.setProp("om_submitting",!1),b(document).on("click.doOptin","#om-"+c+" #om-"+d+"-"+e+"-optin-submit",function(b){a.getProp("om_submitting")||(a.setProp("om_submitting",!0),b.preventDefault(),a.trigger("OptinMonsterBeforeOptin"),a.optin(b.target))})},this.close=function(a){var b=this,c=b.getProp("$"),d=b.getProp("optin"),e=b.getProp("type"),a=a||!1;b.getProp("preview")||(a?"lightbox"==e||"canvas"==e||"mobile"==e?c("#om-"+d).fadeOut(300,b.onClose):("footer"==e||"slide"==e)&&c("#om-"+d).animate({bottom:"-"+c("#om-"+d).outerHeight()+"px"},300,b.onClose):c(document).on("click.closeOptin","#om-"+d+" .om-close, #om-"+d+".optin-monster-saas-overlay",function(a){a.target!==this||"mobile"==e&&c(a.target).hasClass("optin-monster-saas-overlay")||(a.preventDefault(),b.trigger("OptinMonsterBeforeClose"),"lightbox"==e||"canvas"==e||"mobile"==e?c("#om-"+d).fadeOut(300,b.onClose(b)):"footer"==e&&c("#om-"+d).animate({bottom:"-"+c("#om-"+d).outerHeight()+"px"},300,b.onClose(b)))}))},this.onClose=function(a){return function(){var b=a.getProp("$");if(a.cleanup(),"mobile"==a.getProp("type")){var b=a.getProp("$"),c=Math.max(document.documentElement.clientWidth,window.innerWidth||0),d=a.getProp("dw"),e=Math.round(c/d*100)/100;b(window).off("scroll.omMobile"),b("#optin-monster-saas-viewport").length>0&&(b("#optin-monster-saas-viewport").attr("content","width=device-width, initial-scale="+e+", minimum-scale="+e+", maximum-scale="+e),b("html, body").css("overflow",""),setTimeout(function(){b("#optin-monster-saas-viewport").attr("content","width=device-width, maximum-scale=10.0")},1e3)),b("#om-"+a.getProp("optin")+"-overlay").hide()}a.isMobile()&&(("lightbox"==a.getProp("type")||"canvas"==a.getProp("type"))&&b(document).scrollTop(a.getProp("dt")),b(document).off("focus.omFocusJump"),b(document).off("blur.omFocusJump"),b("html, body").css("overflow","")),a.trigger("OptinMonsterOnClose")}},this.cleanup=function(a){var b=this,c=b.getProp("$"),d=b.getProp("id"),e=a||!1;OptinMonsterAppOptins[b.getProp("optin_js")].visible=!1,e&&b.setProp("submitted",!0),"mobile"==b.getProp("type")&&c(window).off("scroll.omMobile"),0!==b.getProp("cookie")&&(b.createCookie("om-"+d,!0,b.getProp("cookie")),b.getProp("migrated_id")&&b.createCookie("om-"+b.getProp("migrated_id"),!0,b.getProp("cookie")),b.getProp("clones")&&c.each(b.getProp("clones"),function(a,c){0!==c.length&&b.createCookie("om-"+c,!0,b.getProp("cookie"))}),b.getProp("global_cookie")&&e&&b.createCookie("om-global-cookie",!0,b.getProp("global_cookie")),e&&"slide"==b.getProp("type")&&b.createCookie("om-"+d+"-closed",!0,b.getProp("cookie")),b.trigger("OptinMonsterCleanup"))},this.track=function(a){if(!this.getProp("tracked")&&!this.getProp("preview")){var b=this,c=b.getProp("ga_uaid"),a=a||!1;b.trackGoogleAnalytics(c,a),b.trigger("OptinMonsterTracked")}},this.trackGoogleAnalytics=function(a,b){var c=this,d=b?"conversion":"impression",e=c.getProp("campaign")||c.getProp("optin"),f=c.getProp("ga_init"),g=!1;"undefined"!=typeof window.__omGaTracker?g=window.__omGaTracker:"undefined"!=typeof window.ga&&(g=window.ga),g&&(c.setProp("ga_object",g),c.setProp("ga_campaign",e),c.setProp("ga_campaign_id",c.getProp("id").toString()),f||(g("create",a,{name:"omTracker",cookieName:"__omGaTracker"}),g("omTracker.set",{appName:c.getProp("app_name"),appId:c.getProp("app_id"),appVersion:c.getProp("app_version"),nonInteraction:!0}),c.setProp("ga_init",!0)),c.trackEvent(d,e,c.getProp("id").toString()))},this.trackEvent=function(a,b,c){var d=this,e=d.getProp("ga_object");e&&(e("omTracker.send","event",b,a,c),d.trigger("impression"==a?"OptinMonsterTrackedImpression":"OptinMonsterTrackedConversion"))},this.optin=function(a,b){var c=this,d=c.getProp("$"),e=c.getProp("optin"),b=b||!1;if(c.getProp("preview"))return void c.setProp("om_submitting",!1);c.setProp("convert_target",a),c.loading(a);var f={optin_id:c.getProp("id"),post_id:c.getProp("post_id"),referrer:window.location.href,user_agent:navigator.userAgent,previous:document.referrer,email:d("#om-"+e+" #om-"+c.getProp("type")+"-"+c.getProp("theme")+"-optin-email").val(),name:d("#om-"+e+" #om-"+c.getProp("type")+"-"+c.getProp("theme")+"-optin-name").val()},g=c.getProp("api_convert")+c.getProp("id");success=!1,j=!1;var h=d("#om-"+e).find(":input"),i={};if(d.each(h,function(a,b){var c=d(this).attr("name");c&&(i[c]=d(this).val())}),d.isEmptyObject(i)||(f.fields=i),b)success=c.optinCustomSuccess(c,a);else{var j=c.verify();if(j)return c.error(a,j);success=c.optinSuccess(c,a),j=c.optinError(c,a)}c.setProp("optin_data",f),c.trigger("OptinMonsterPreOptin"),c.requestCORS(g,c.getProp("optin_data"),success,j)},this.error=function(a,b){{var c=this,d=c.getProp("$"),e=d(a);c.getProp("optin")}c.setProp("om_submitting",!1),c.removeLoading(a),e.parent().append('<p class="optin-monster-saas-error" style="font-family:Georgia;font-size:13px;font-style:italic;color:#ff0000;margin:10px 0;text-align:center;line-height:18px;">'+b+"</p>"),c.trigger("OptinMonsterOnError")},this.loading=function(a){var b=this,c=b.getProp("$"),d=c(a),e=d.position(),f=parseInt(d.css("marginTop")),g=d.outerWidth(),h=d.outerHeight();c("#om-"+b.getProp("optin")).find(".optin-monster-saas-error").remove(),d.after('<span class="optin-monster-saas-loading"></span>').css("opacity",".25"),c("#om-"+b.getProp("optin")).find(".optin-monster-saas-loading").css({width:g,height:h,top:e.top+f,left:e.left,background:"url("+b.getProp("preloader")+") no-repeat 50% 50%",position:"absolute",zIndex:84736365452,backgroundSize:"20px"})},this.verify=function(){var a=this,b=a.getProp("$"),c=a.getProp("optin"),d=a.getProp("type"),e=a.getProp("theme"),f=b("#om-"+c+" #om-"+d+"-"+e+"-optin-name"),g=b("#om-"+c+" #om-"+d+"-"+e+"-optin-email"),h=b("#om-"+d+"-"+e+"-optin").find('input[name="email"]').val(),i=b("#om-"+d+"-"+e+"-optin").find('input[name="website"]').val(),j=!1;return f&&f.length>0&&0==f.val().length&&(j=a.getProp("name_error")||a.getProp("error")),g&&g.length>0&&(0!=g.val().length&&a.isValidEmail(g.val())||(j=a.getProp("email_error")||a.getProp("error"))),(h&&h.length>0||i&&i.length>0)&&(j=a.getProp("bot_error")||a.getProp("error")),j},this.removeLoading=function(a){var b=this,c=b.getProp("$"),d=c(a);d.css("opacity","1"),c("#om-"+b.getProp("optin")).find(".optin-monster-saas-loading").remove()},this.optinJSON=function(){},this.optinSuccess=function(a,b){{var c=a.getProp("$");a.getProp("optin"),a.getProp("type"),a.getProp("theme")}return function(d){if(!d||c.isEmptyObject(d))return a.error(b,a.getProp("error"));if(d&&d.error)return a.error(b,d.error);if(a.setProp("om_submitting",!1),a.cleanup(!0),a.trigger("OptinMonsterOptinSuccess"),a.getProp("ga_id")&&a.trackGoogleAnalytics(a.getProp("ga_uaid"),!0),a.getProp("redirect")){a.trigger("OptinMonsterOnRedirect");var e=a.getProp("redirect"),f=a.getProp("redirect_pass");if(f&&d&&d.success){var g="?";data=a.getProp("optin_data"),data.hasOwnProperty("email")&&"undefined"!=typeof data.email&&data.email.length>0&&(e=e+g+"om_email="+data.email,g="&"),data.hasOwnProperty("name")&&"undefined"!=typeof data.name&&data.name.length>0&&(e=e+g+"om_name="+encodeURIComponent(data.name))}window.location.href=e}else a.getProp("success")?a.successMessage(b):(a.close(!0),a.removeLoading(b)),a.trigger("OptinMonsterOptinSuccessClose")}},this.successMessage=function(a){var b=this,c=b.getProp("$"),d=b.getProp("optin"),e=b.getProp("type"),f=b.getProp("theme"),g=c("#om-"+d+" #om-"+e+"-"+f+"-optin"),h=g.position(),i=g.outerWidth(),j=g.outerHeight(),k="sidebar"==e||"post"==e?7271832:0xe8da821f56;"slide"!==e&&c("#om-"+d).find(".om-close").remove();var l="sidebar"==e||"post"==e?'<div class="optin-monster-saas-success-overlay" style="display:none;"></div>':'<div class="optin-monster-saas-success-overlay" style="display:none;"><a href="#" class="om-close om-success-close">&times;</a></div>',m=b.getProp("success");g.after(l),c("#om-"+d).find(".optin-monster-saas-success-overlay").css({width:i,height:j,top:h.top,left:h.left,background:"#fff",position:"absolute",zIndex:k,padding:"0px 20px",opacity:0,display:"block"}).append('<div class="optin-monster-saas-success-message">'+m+"</div>"),c("#om-"+d).find(".optin-monster-saas-success-message").css({"margin-top":(j-c("#om-"+d).find(".optin-monster-saas-success-message").height())/2}),c("#om-"+d).find(".optin-monster-saas-success-overlay").fadeTo(300,1,function(){b.removeLoading(a),b.socialServices()}),b.poll(function(){c(window).resize(function(){c(".optin-monster-saas-success-overlay").css({width:c("#om-"+e+"-"+f+"-optin").outerWidth(),height:c("#om-"+e+"-"+f+"-optin").outerHeight(),top:c("#om-"+e+"-"+f+"-optin").position().top,left:c("#om-"+e+"-"+f+"-optin").position().left}),c(".optin-monster-saas-success-message").css({"margin-top":(c("#om-"+e+"-"+f+"-optin").outerHeight()-c(".optin-monster-saas-success-message").height())/2})})},300)},this.optinCustomSuccess=function(a,b){var c=a.getProp("$");return function(d){a.trigger("OptinMonsterOptinSuccess"),a.getProp("ga_id")&&a.trackGoogleAnalytics(a.getProp("ga_uaid"),!0),c(b).submit()}},this.optinError=function(a,b){a.getProp("$"),a.getProp("optin"),a.getProp("type"),a.getProp("theme");return function(c,d,e){return a.trigger("OptinMonsterOptinError"),a.setProp("om_submitting",!1),a.error(b,a.getProp("ajax_error")+c.responseJSON.error)}},this.requestCORS=function(a,b,c,d){var e=this,f=e.getProp("$"),b=b||!1,g={url:a,cache:!1,type:"POST",timeout:3e4,data:b},c=c||!1,d=d||!1;c&&(g.success=c),d&&(g.error=d),f.ajax(g)},this.requestJSONP=function(a,b,c){var d=this,e=d.getProp("$"),f={url:a,cache:!1,type:"GET",dataType:"json",timeout:3e4,beforeSend:function(a,b){var c=b.url.split("?");return b.url=c[0],b},crossDomain:!0},b=b||!1,c=c||!1;b&&(f.success=b),c&&(f.error=c),e.ajax(f)},this.appendHolder=function(){var a=this.getProp("$");type=this.getProp("type"),styles=!1,"lightbox"==type||"canvas"==type?styles={position:"fixed","z-index":"7371832",top:"0",left:"0",zoom:"1",width:"100%",height:"100%",margin:"0",padding:"0"}:"footer"==type&&(styles={position:"fixed","z-index":"7371832",bottom:"0",left:"0",zoom:"1",width:"100%",margin:"0",padding:"0"}),styles&&a("#om-"+this.getProp("optin")).css(styles).appendTo("body"),this.trigger("OptinMonsterAppendHolder")},this.prepareCustomOptin=function(){var a=this,b=a.getProp("optin"),c=a.getProp("$"),d=c("#om-"+b+" input[data-om-render=label]");d.length>0&&(a.loadElementChange(),d.each(function(){c.fn.changeElementType&&c(this).changeElementType("label")}),c("#om-"+b+" label[data-om-render=label]").each(function(){c(this).text(c(this).attr("value")).removeAttr("value type")})),a.trigger("OptinMonsterCustomDone")},this.poll=function(){var a=0;return function(b,c){clearInterval(a),a=setInterval(b,c)}}(),this.isValidEmail=function(a){return new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(a)},this.createCookie=function(a,b,c){if(!this.getProp("test")){if(c){var d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3);var e="; expires="+d.toGMTString()}else var e="";document.cookie=a+"="+b+e+"; path=/"}},this.getCookie=function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(b))return e.substring(b.length,e.length)}return null},this.removeCookie=function(a){this.createCookie(a,"",-1)},this.log=function(a){"object"==typeof console?console.log(a):""},this.trigger=function(a){var b=this;b["public"].ejQuery(document).trigger(a,[b["public"],b])},this.loadElementChange=function(){!function(a){a.fn.changeElementType=function(b){var c={};a.each(this[0].attributes,function(a,b){c[b.nodeName]=b.nodeValue}),this.replaceWith(function(){return a("<"+b+"/>",c).append(a(this).contents())})}}(this.getProp("$"))},this.cookiesEnabled=function(){var a=navigator.cookieEnabled?!0:!1;return"undefined"!=typeof navigator.cookieEnabled||a||(document.cookie="testcookie",a=-1!=document.cookie.indexOf("testcookie")?!0:!1),a},this.getProp=function(a){return this["public"].hasOwnProperty(a)?this["public"][a]:!1},this.setProp=function(a,b){this["public"][a]=b},this.isMobile=function(){var a=!1;return function(b){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)))&&(a=!0)}(navigator.userAgent||navigator.vendor||window.opera),a},this.hasVisiblePopup=function(){var a=[],b=this.getProp("$"),c=0;for(var d in OptinMonsterAppOptins)OptinMonsterAppOptins[d].hasOwnProperty("visible")&&!0===OptinMonsterAppOptins[d].visible&&(a[c]=OptinMonsterAppOptins[d].type,c++);return b.inArray("lightbox",a)>-1||b.inArray("canvas",a)>-1||!1},this.loadPlaceholder=function(){var a=this,b=a.getProp("$");!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof module&&module.exports?require("jquery"):b)}(function(a){function b(b){var c={},d=/^jQuery\d+$/;return a.each(b.attributes,function(a,b){b.specified&&!d.test(b.name)&&(c[b.name]=b.value)}),c}function c(b,c){var d=this,f=a(d);if(d.value==f.attr("placeholder")&&f.hasClass(m.customClass))if(f.data("placeholder-password")){if(f=f.hide().nextAll('input[type="password"]:first').show().attr("id",f.removeAttr("id").data("placeholder-id")),b===!0)return f[0].value=c;f.focus()}else d.value="",f.removeClass(m.customClass),d==e()&&d.select()}function d(){var d,e=this,f=a(e),g=this.id;if(""===e.value){if("password"===e.type){if(!f.data("placeholder-textinput")){try{d=f.clone().attr({type:"text"})}catch(h){d=a("<input>").attr(a.extend(b(this),{type:"text"}))}d.removeAttr("name").data({"placeholder-password":f,"placeholder-id":g}).bind("focus.placeholder",c),f.data({"placeholder-textinput":d,"placeholder-id":g}).before(d)}f=f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",g).show()}f.addClass(m.customClass),f[0].value=f.attr("placeholder")}else f.removeClass(m.customClass)}function e(){try{return document.activeElement}catch(a){}}var f,g,h="[object OperaMini]"==Object.prototype.toString.call(window.operamini),i="placeholder"in document.createElement("input")&&!h,j="placeholder"in document.createElement("textarea")&&!h,k=a.valHooks,l=a.propHooks;if(i&&j)g=a.fn.placeholder=function(){return this},g.input=g.textarea=!0;else{var m={};g=a.fn.placeholder=function(b){var e={customClass:"placeholder"};m=a.extend({},e,b);var f=this;return f.filter((i?"textarea":":input")+"[placeholder]").not("."+m.customClass).bind({"focus.placeholder":c,"blur.placeholder":d}).data("placeholder-enabled",!0).trigger("blur.placeholder"),f},g.input=i,g.textarea=j,f={get:function(b){var c=a(b),d=c.data("placeholder-password");return d?d[0].value:c.data("placeholder-enabled")&&c.hasClass(m.customClass)?"":b.value},set:function(b,f){var g=a(b),h=g.data("placeholder-password");return h?h[0].value=f:g.data("placeholder-enabled")?(""===f?(b.value=f,b!=e()&&d.call(b)):g.hasClass(m.customClass)?c.call(b,!0,f)||(b.value=f):b.value=f,g):b.value=f}},i||(k.input=f,l.value=f),j||(k.textarea=f,l.value=f),a(function(){a(document).delegate("form","submit.placeholder",function(){var b=a("."+m.customClass,this).each(c);setTimeout(function(){b.each(d);

},10)})}),a(window).bind("beforeunload.placeholder",function(){a("."+m.customClass).each(function(){this.value=""})})}})},this.doPlaceholder=function(){var a=this,b=a.getProp("$"),c=b("#om-"+a.getProp("optin")+" input");c.length>0&&b.fn.placeholder&&c.each(function(){b(this).placeholder()}),a.trigger("OptinMonsterPlaceholderDone")},this.isIE=function(){var a=this.getProp("$");return!(a.support.cors||!a.ajaxTransport||!window.XDomainRequest)},this.websiteMatch=function(){var a=this.getProp("site"),b=window.location.hostname;return a.hasOwnProperty("domain")?this.websiteWhitelisted()?!0:b.indexOf(a.domain)>-1?!0:(this.log("[OptinMonster] The optin campaign requested does not have permission to load on this domain."),!1):(this.log("[OptinMonster] No site has been specified for this optin campaign. The optin campaign has ceased loading."),!1)},this.websiteWhitelisted=function(){var a=this.getProp("$"),b=window.location.hostname,c=!1,d=[".dev",".local","local.","staging.","localhost","127.0.0.1"];return a.each(d,function(a,d){return b.indexOf(d)>-1?(c=!0,!1):void 0}),c},this.pageSlugMatch=function(){var a=this.getProp("page_slug"),b=this.getProp("page_match"),c=window.location.pathname.substr(1);return b?"/"==a?c.length>0?(this.log("[OptinMonster] The page slug entered does not match the request URI exactly. The optin campaign has ceased loading."),!1):!0:a!==c?(this.log("[OptinMonster] The page slug entered does not match the request URI exactly. The optin campaign has ceased loading."),!1):!0:"/"==a?c.length>0?(this.log("[OptinMonster] The page slug entered does not exist in the request URI. The optin campaign has ceased loading."),!1):!0:c.indexOf(a)>-1?!0:(this.log("[OptinMonster] The page slug entered does not exist in the request URI. The optin campaign has ceased loading."),!1)},this.referrerMatch=function(){var a=this.getProp("$"),b=this.getProp("referrer_domain"),c=b.split(","),d=document.referrer||!1,e=!1;return d?(a.each(c,function(a,b){return d.indexOf(b)>-1?(e=!0,!1):void 0}),e?!0:(this.log("[OptinMonster] The page referrer does not match the requested domain referrer. The optin campaign has ceased loading."),!1)):(this.log("[OptinMonster] No referrer was specified for this page. The optin campaign has ceased loading."),!1)},this.socialServices=function(){{var a=this;a.getProp("$"),a.getProp("optin")}"undefined"!=typeof FB&&null!=FB&&FB.hasOwnProperty("XFBML")&&FB.XFBML.parse(),"undefined"!=typeof twttr&&null!=twttr&&twttr.hasOwnProperty("widgets")&&twttr.widgets.load(),a.trigger("OptinMonsterSocial")},this.getScrollPercentage=function(){var a=this.getProp("$"),b=a(window).scrollTop()||0,c=a(document).height(),d=a(window).height();return Math.round(b/(c-d)*100)},this.corsPatch=function(){var a=this.getProp("$");if(!a.support.cors&&a.ajaxTransport&&window.XDomainRequest){var b=/^(https?:)?\/\//i,c=/^get|post$/i,d=new RegExp("^(//|"+location.protocol+")","i");a.ajaxTransport("* text html xml json",function(e,f,g){if(e.crossDomain&&e.async&&c.test(e.type)&&b.test(e.url)&&d.test(e.url)){var h=null;return{send:function(b,c){var d="",g=(f.dataType||"").toLowerCase();h=new XDomainRequest,/^\d+$/.test(f.timeout)&&(h.timeout=f.timeout),h.ontimeout=function(){c(500,"timeout")},h.onload=function(){var b="Content-Length: "+h.responseText.length+"\r\nContent-Type: "+h.contentType,d={code:200,message:"success"},e={text:h.responseText};try{if("html"===g||/text\/html/i.test(h.contentType))e.html=h.responseText;else if("json"===g||"text"!==g&&/\/json/i.test(h.contentType))try{e.json=a.parseJSON(h.responseText)}catch(f){d.code=500,d.message="parseerror"}else if("xml"===g||"text"!==g&&/\/xml/i.test(h.contentType)){var i=new ActiveXObject("Microsoft.XMLDOM");i.async=!1;try{i.loadXML(h.responseText)}catch(f){i=void 0}if(!i||!i.documentElement||i.getElementsByTagName("parsererror").length)throw d.code=500,d.message="parseerror","Invalid XML: "+h.responseText;e.xml=i}}catch(j){throw j}finally{c(d.code,d.message,e,b)}},h.onprogress=function(){},h.onerror=function(){c(500,"error",{text:h.responseText})},f.data&&(d="string"===a.type(f.data)?f.data:a.param(f.data)),h.open(e.type,e.url),h.send(d)},abort:function(){h&&h.abort()}}}}),this.setProp("$",a)}},this.setDefaults=function(){var a="https:"==document.location.protocol?"https://":"http://",b=this.getProp("staging")?"staging-api":"api";this.setProp("api_optin",a+b+".optinmonster.com/v1/optin/"),this.setProp("api_convert",a+b+".optinmonster.com/v1/convert/")}}var OptinMonsterAppOptins={},OptinMonsterAppLinkSlugs={},om_loaded=!0;