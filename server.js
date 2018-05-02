module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=37)}([function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("date-fns")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("koa-session")},function(e,t){e.exports=require("koa-compose")},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";var r=n(23);n.o(r,"Locale")&&n.d(t,"Locale",function(){return r.Locale});var o=n(22);n.o(o,"Locale")&&n.d(t,"Locale",function(){return o.Locale});n(21);var u=n(20);n.o(u,"Locale")&&n.d(t,"Locale",function(){return u.Locale});var a=n(19);n.d(t,"Locale",function(){return a.a});n(18),n(17),n(16)},function(e,t){e.exports=require("path-to-regexp")},function(e,t){e.exports=require("accept-language")},function(e,t){e.exports=require("fs")},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";n(15),n(14),n(13)},function(e,t){},function(e,t){},function(e,t,n){"use strict";var r;n.d(t,"a",function(){return r}),function(e){e.EN="en",e.ZH="zh"}(r||(r={}))},function(e,t){},function(e,t,n){"use strict";var r,o,u;!function(e){e.DASHBOARD="dashboard",e.CONTAINER="cubes",e.IMAGE="building",e.MIRROR="rocket",e.DOCS="file",e.LOCALE="globe"}(r||(r={})),function(e){e.DASHBOARD="dashboard",e.CONTAINER="container",e.APPLICATION="application",e.SERVICE="service",e.TEMPLATE="template",e.ENVFILE="envfile",e.CONFIGURATION="configuration",e.IMAGE="image",e.IMAGE_REPOSITORY="image-repository",e.SYNC_CENTER="sync-center",e.SYNC_HISTORY="sync-history",e.MIRROR="mirror",e.DOCS="docs",e.LOCALE="locale"}(o||(o={})),function(e){e.BOARD="board",e.DELIVERY="delivery",e.INFRASTRUCTURE="infrastructure",e.OPS="ops",e.APP_PLATFORM="app-platform",e.PLATFORM_EXTENSION="platform-extension",e.OTHERS="others"}(u||(u={}))},function(e,t){},function(e,t){},function(e,t){e.exports=require("captchapng2")},function(e,t){e.exports=require("koa-router")},function(e,t){e.exports=require("koa-bodyparser")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("vue/package.json")},function(e,t){e.exports=require("koa/package.json")},function(e,t){e.exports=require("vue-server-renderer")},function(e,t){e.exports=require("mkdirp")},function(e,t){e.exports=require("lru-cache")},function(e,t){e.exports=require("koa-static-cache")},function(e,t){e.exports=require("koa-static")},function(e,t){e.exports=require("koa-logger")},function(e,t){e.exports=require("koa-compress")},function(e,t,n){"use strict";n.r(t);var r,o,u=n(12),a=n(3),i=n(11),s=n.n(i),c=n(2),l=n(0),f=(n(38),n(7)),p=n(36),d=n(35),h=n(6),y=n(34),v=n(33),b=n(32),E=n(31),R=n(10),O=n(30),C=n(29),T=n(28),g=process.env;function m(e,t,n){void 0===t&&(t="");var r=g[e];switch(t){case o.BOOLEAN:return r?"false"!==r:n||!1;case o.STR_ARR:return r?r.split(","):n||[];case o.KEY_VALUE:if(!r)return n||{};var u=r.split(":");return{key:u[0],value:u[1]};case o.KEY_VALUE_ARR:return r?r.split(",").map(function(e){var t=e.split(":");return{key:t[0],value:t[1]}}):n||[];default:return r||t}}!function(e){e.APP_KEYS="APP_KEYS",e.API_SERVER_URL="API_SERVER_URL",e.CCP_ACCOUNTSID="CCP_ACCOUNTSID",e.CCP_ACCOUNTTOKEN="CCP_ACCOUNTTOKEN",e.CCP_APPID="CCP_APPID",e.CCP_TEMPLATEID="CCP_TEMPLATEID",e.CCP_SERVERIP="CCP_SERVERIP",e.CCP_SERVERPORT="CCP_SERVERPORT",e.CCP_SOFTVERSION="CCP_SOFTVERSION",e.ENABLE_DEV_STATIC="ENABLE_DEV_STATIC",e.NON_SSR_PATTERN="NON_SSR_PATTERN",e.SMS_BASE_URL="SMS_BASE_URL",e.STATIC_PATTERN="STATIC_PATTERN",e.OUTPUT_JAKIRO_RESPONSE="OUTPUT_JAKIRO_RESPONSE"}(r||(r={})),function(e){e[e.BOOLEAN=0]="BOOLEAN",e[e.STR_ARR=1]="STR_ARR",e[e.KEY_VALUE=2]="KEY_VALUE",e[e.KEY_VALUE_ARR=3]="KEY_VALUE_ARR"}(o||(o={}));var A,S={ACCOUNT_SID:m(r.CCP_ACCOUNTSID),ACCOUNT_TOKEN:m(r.CCP_ACCOUNTTOKEN),APP_ID:m(r.CCP_APPID),TEMPLATE_ID:m(r.CCP_TEMPLATEID),SERVER_IP:m(r.CCP_SERVERIP),SERVER_PORT:m(r.CCP_SERVERPORT),SOFT_VERSION:m(r.CCP_SOFTVERSION)},P={},_=new RegExp("^(/api)/"),x=n(5),w=n.n(x),I=n(27),N=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},k=function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{s(r.next(e))}catch(e){u(e)}}function i(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,i)}s((r=r.apply(e,t||[])).next())})},L=function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&u[0]?"return":u[0]?"throw":"next"])&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[0,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}};!function(e){e.DELETE="delete",e.GET="get",e.HEAD="head",e.PATCH="patch",e.POST="post",e.PUT="put"}(A||(A={}));var D,j=c("rubick:jakiro"),q=m(r.API_SERVER_URL),U=m(r.OUTPUT_JAKIRO_RESPONSE,o.BOOLEAN),M=function(e){var t=e.ctx,n=e.url,r=void 0===n?t.url:n,o=e.method,u=void 0===o?t.method:o,a=e.data,i=void 0===a?t.request.body:a,s=e.headers,c=e.params,l=void 0===c?t.query:c,f=e.qs;return k(void 0,void 0,void 0,function(){var e,n,o,a,c,p,d,h;return L(this,function(y){switch(y.label){case 0:r=r.replace(_,"/"),r=q+(/^\/v[12]/.test(r)?r:"/v1"+r),f&&(i=I.stringify(i)),e=t.session.user,s=N({},s,{"Alauda-Request-ID":t.get("alauda-request-id"),"User-Agent":"rubick/v1.0"}),e&&(s.Authorization="Token "+e.token),y.label=1;case 1:return y.trys.push([1,3,,4]),[4,w.a.request({url:r,method:u,data:i,params:l,headers:s})];case 2:return n=y.sent(),[3,4];case 3:return o=y.sent(),n={data:o.response.data,error:o.message,status:o.response.status},[3,4];case 4:if(a=n.data,c=a||{},!((p=n.status)>=400)||a&&a.errors||(c={code:"malformed_jakiro_response",source:"1019",error:n.error}),d="url:%s\nstatus:%d",h=[r,p],U&&(d+="\nresult: %O",h.push(c)),j.apply(void 0,[d].concat(h)),c.errors&&(c.error=c.errors[0],c.code=c.error.code,delete c.errors),c.error)throw{result:c,status:p};return[2,{result:c,status:p}]}})})},V=n(1),Y=n(4),K=S.ACCOUNT_SID,F=m(r.SMS_BASE_URL),H=function(){return F+"/2013-12-26/Accounts/"+K+"/SMS/TemplateSMS?sig="+V.createHash("md5").update(""+K+S.ACCOUNT_TOKEN+Object(Y.format)(new Date,"YYYYMMDDHHmmss")).digest("hex").toUpperCase()},B=function(e,t){return w.a.post(H(),{to:e,appId:S.APP_ID,templateId:S.TEMPLATE_ID,datas:[t,"60"]},{headers:{Accept:"application/json","Content-Type":"application/json;charset=utf-8",Authorization:new Buffer(K+":"+Object(Y.format)(new Date,"YYYYMMDDHHmmss")).toString("base64")}})},G=n(9),z=+process.env.PORT||4e3,J=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return a.resolve.apply(a,[process.cwd()].concat(e))},Z=require,$=n(26),W=n(25),X=[];!function(e){e.ALL="all",e.DELETE="delete",e.GET="get",e.HEAD="head",e.OPTIONS="options",e.PATCH="patch",e.POST="post",e.PUT="put"}(D||(D={}));var Q=Symbol("routes"),ee=function(e){X.push(e.prototype[Q])};function te(e,t){"string"==typeof e||e instanceof RegExp?e={method:t,path:e}:void 0!==t&&console.warn("method should not be passed in");var n=e||{},r=n.method,o=Array.isArray(r)?r:[r],u=n.path;return function(e,t,n){(e=t?e:e.prototype)[Q]||(e[Q]=[]);var a=e[Q];t?a.push({handler:n.value,method:o,path:u}):(r&&a.forEach(function(e){return e.method=e.method[0]?e.method:o}),a.path=u)}}var ne=function(e,t,n,r){var o,u=arguments.length,a=u<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(u<3?o(a):u>3?o(t,n,a):o(t,n))||a);return u>3&&a&&Object.defineProperty(t,n,a),a},re=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},oe=function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{s(r.next(e))}catch(e){u(e)}}function i(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,i)}s((r=r.apply(e,t||[])).next())})},ue=function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&u[0]?"return":u[0]?"throw":"next"])&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[0,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},ae=(function(){function e(){}return e.prototype.commonCheck=function(e){return oe(this,void 0,void 0,function(){var t,n,r,o,u,a,i,s,c;return ue(this,function(l){switch(l.label){case 0:t=e.session.user,l.label=1;case 1:return l.trys.push([1,3,,4]),[4,Promise.all([M({ctx:e,url:"/auth/profile"}),M({ctx:e,url:"/regions/"+t.namespace})])];case 2:return o=l.sent(),u=o[0].result,a=o[1].result,n=u,r=a,[3,4];case 3:return i=l.sent(),s=i.result,c=i.status,e.session=null,e.body=s,e.status=c,[2];case 4:return e.body={profile:n,regions:r},[2]}})})},e.prototype.logout=function(e){e.session=null,e.body=null},ne([te("/common"),re("design:type",Function),re("design:paramtypes",["function"==typeof(t=void 0!==l.Context&&l.Context)&&t||Object]),re("design:returntype",Promise)],e.prototype,"commonCheck",null),ne([te("/logout"),re("design:type",Function),re("design:paramtypes",["function"==typeof(n=void 0!==l.Context&&l.Context)&&n||Object]),re("design:returntype",void 0)],e.prototype,"logout",null),e=ne([ee],e);var t,n}(),n(24)),ie=n(8),se=function(e,t,n,r){var o,u=arguments.length,a=u<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(u<3?o(a):u>3?o(t,n,a):o(t,n))||a);return u>3&&a&&Object.defineProperty(t,n,a),a},ce=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},le=function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{s(r.next(e))}catch(e){u(e)}}function i(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,i)}s((r=r.apply(e,t||[])).next())})},fe=function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&u[0]?"return":u[0]?"throw":"next"])&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[0,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},pe=function(){return e=9e3*Math.random()+1e3,parseInt(e+"",10)+"";var e},de=(function(){function e(){}return e.prototype.loginCheck=function(e){return le(this,void 0,void 0,function(){return fe(this,function(t){return e.body=Object(ie.omit)(e.session.user,"token"),[2]})})},e.prototype.login=function(e){return le(this,void 0,void 0,function(){var t,n,r,o,u,a,i;return fe(this,function(s){switch(s.label){case 0:t=e.request,n=t.body,s.label=1;case 1:return s.trys.push([1,3,,4]),[4,M({ctx:e,url:"/generate-api-token",headers:{CLIENT:e.ips.length?e.ips.join(", "):e.ip}})];case 2:return u=s.sent().result,r=u,[3,4];case 3:return o=s.sent(),u=o.result,a=o.status,e.body=u,e.status=a,[2];case 4:return e.user=e.session.user=r,[4,M({ctx:e,url:"/auth/"+(n.organization||n.username)+"/profile",method:A.GET})];case 5:return s.sent().result.password_is_empty?i="/user/password":n.next&&(i=n.next),e.body={url:i||"/",user:Object(ie.omit)(r,"token")},[2]}})})},e.prototype.getCaptcha=function(e){var t=pe();e.session.CAPTCHA_SESSION=t,e.type="image/png",e.body=new ae(80,30,t).getBuffer()},e.prototype.sendSms=function(e){return le(this,void 0,void 0,function(){var t,n;return fe(this,function(r){switch(r.label){case 0:return e.session.CAPTCHA_SESSION!==e.request.body.captcha?(e.body={errors:[{code:"invalid_captcha"}]},e.status=401,[2]):(t=pe(),n=e.request.body.mobile,[4,B(n,t)]);case 1:return r.sent(),e.cookies.set("VERIFICATION_CODE_COOKIE",V.createHash("md5").update(n+t).digest("hex"),{maxAge:36e5}),[2]}})})},se([te("/login"),ce("design:type",Function),ce("design:paramtypes",["function"==typeof(t=void 0!==l.Context&&l.Context)&&t||Object]),ce("design:returntype",Promise)],e.prototype,"loginCheck",null),se([te("/login",D.POST),ce("design:type",Function),ce("design:paramtypes",["function"==typeof(n=void 0!==l.Context&&l.Context)&&n||Object]),ce("design:returntype",Promise)],e.prototype,"login",null),se([te("/captcha"),ce("design:type",Function),ce("design:paramtypes",["function"==typeof(r=void 0!==l.Context&&l.Context)&&r||Object]),ce("design:returntype",void 0)],e.prototype,"getCaptcha",null),se([te("/sms",D.POST),ce("design:type",Function),ce("design:paramtypes",["function"==typeof(o=void 0!==l.Context&&l.Context)&&o||Object]),ce("design:returntype",Promise)],e.prototype,"sendSms",null),e=se([ee],e);var t,n,r,o}(),function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{s(r.next(e))}catch(e){u(e)}}function i(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,i)}s((r=r.apply(e,t||[])).next())})}),he=function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&u[0]?"return":u[0]?"throw":"next"])&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[0,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},ye=c("rubick:server"),ve=new W({prefix:"/api"});!function(e){for(var t=function(){var t=X.shift();if(!t)return"continue";t.forEach(function(n){var r=n.handler,o=n.method,u=n.path,a=void 0===u?"":u;t.path&&"string"==typeof a&&(a=t.path+a),r=Array.isArray(r)?r:[r],o.forEach(function(t){return(n=e)[t||D.GET].apply(n,[a].concat(r));var n})})};X.length;)t()}(ve);var be=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},Ee=function(e,t,n,r){return new(n||(n=Promise))(function(o,u){function a(e){try{s(r.next(e))}catch(e){u(e)}}function i(e){try{s(r.throw(e))}catch(e){u(e)}}function s(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,i)}s((r=r.apply(e,t||[])).next())})},Re=function(e,t){var n,r,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=r[2&u[0]?"return":u[0]?"throw":"next"])&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[0,o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}};s.a.languages([G.Locale.ZH,G.Locale.EN]);var Oe,Ce,Te,ge,me,Ae=c("rubick:server"),Se='<script src="/vendors.dll.'+Z(J("dist/vendors.dll.manifest.json")).name.split("_")[1]+'.js"><\/script>',Pe=u.readFileSync(J("dist/template.html"),"utf-8"),_e=new l;_e.keys=m(r.APP_KEYS,o.STR_ARR),_e.use(f([d(),p(),h(P,_e)])),Ce=!!(Oe=_e),Te=[$(),ve.routes(),ve.allowedMethods(),function(e,t){return de(void 0,void 0,void 0,function(){var n,r,o;return he(this,function(u){switch(u.label){case 0:if(e.matched.length||!/^\/api/.test(e.url)||/\.[a-z]{2-4}\d?$/.test(e.path))return[3,4];u.label=1;case 1:return u.trys.push([1,3,,4]),[4,M({ctx:e})];case 2:return r=u.sent().result,e.body=r,[3,4];case 3:return n=u.sent(),r=n.result,o=n.status,e.body=r,e.status=o,[3,4];case 4:return[4,t()];case 5:return u.sent(),[2]}})})}],Oe||((Oe=new l).keys=m(r.APP_KEYS,o.STR_ARR),Te.unshift(h(P,Oe))),Oe.use(f(Te)),Ce||Oe.listen(z+1,"localhost",function(){ye("Router server is now running at %s:%s.","localhost",z+1)});me=u,xe=Z(J("dist/vue-ssr-server-bundle.json")),we={clientManifest:Z(J("dist/vue-ssr-client-manifest.json"))},ge=Object(O.createBundleRenderer)(xe,be({},we,{template:Pe,inject:!1,cache:b({max:1e3,maxAge:9e5}),basedir:J("dist/static"),runInNewContext:!1}));var xe,we,Ie={};_e.use(y("dist/static",{defer:!0})).use(v("dist/static",{maxAge:31536e3},Ie)),Ie["/service-worker.js"].maxAge=0;var Ne={"Content-Type":"text/html",Server:"koa/"+C.version+"; vue-server-renderer/"+T.version},ke=m(r.NON_SSR_PATTERN,o.STR_ARR),Le=m(r.STATIC_PATTERN,o.STR_ARR);_e.use(function(e,t){return Ee(void 0,void 0,void 0,function(){var n,r,o,u,i,c,l,f,p,d,h,y,v;return Re(this,function(b){switch(b.label){case 0:return"GET"!==e.method||null!=e.body||404!==e.status||/(^\/api\/)|(\.[a-z]{2,4}\d?$)/.test(e.path)?[2]:[4,void 0];case 1:return b.sent(),n=e.cookies.get("LOCALE_COOKIE"),r=n||s.a.get(e.get("Accept-Language")),n||e.cookies.set("LOCALE_COOKIE",r,{httpOnly:!1,path:"/",expires:new Date("Fri, 31 Dec 9999 23:59:59 GMT")}),e.set(Ne),o=e.url,ke.find(function(e){return"*"===e||!!R(e).exec(o)})?[3,2]:[3,5];case 2:return e.url="__non-ssr-page__.html",[4,t()];case 3:b.sent(),b.label=4;case 4:return[2];case 5:return Le.find(function(e){return!!R(e).exec(o)})?(c=o.split("?")[0].replace(/^\//,"")||"home",l=c+"."+r+".html",f=e.hostname.endsWith(".now.sh"),i=f?a.resolve("/tmp",l):J("dist/static/"+l),me.existsSync(i)?f?(e.body=me.createReadStream(i),[3,8]):[3,6]:[3,9]):[3,10];case 6:return e.url=l,[4,t()];case 7:b.sent(),b.label=8;case 8:return Ae('using static html file "'+i+'"'),[2];case 9:u=!0,b.label=10;case 10:return p=Date.now(),d={ctx:e,locale:r,dllScript:Se},h="",e.respond=!1,e.status=200,y=e.res,v=ge.renderToStream(d).on("error",function(t){switch(e.status=t.status||500){case 302:return e.set({Location:t.url}),y.end();case 401:return e.redirect("/login?next="+o),y.end();case 404:return y.end("404 | Page Not Found");default:y.end("500 | Internal Server Error"),console.error("error during render : "+o),console.error(t.stack)}}).on("end",function(){if(h)try{E.sync(a.dirname(i),{fs:me}),me.writeFileSync(i,h),Ae('static html file "'+i+'" is generated')}catch(e){console.error(e)}Ae("whole request: "+(Date.now()-p)+"ms")}),u&&v.on("data",function(e){return h+=e}),v.pipe(y),[2]}})})}),_e.listen(z,"localhost",function(){return Ae("Server is now running at %s:%s.","localhost",z)})},function(e,t){e.exports=require("koa-better-http-proxy")}]);