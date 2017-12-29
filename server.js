module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=20)}([function(e,t){e.exports=require("debug")},function(e,t,n){"use strict";var r=n(16),o=n(46),s=n(47);n.d(t,"b",function(){return r.b}),n.d(t,"c",function(){return r.c}),n.d(t,"d",function(){return r.d}),n.d(t,"e",function(){return r.e});var i=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},a={development:o.a,production:s.a};t.a=i({},r.a,a[r.b.NODE_ENV](r.a))},function(e,t,n){"use strict";var r=n(12);n.d(t,"g",function(){return r.b});var o=n(6);n.d(t,"a",function(){return o.a}),n.d(t,"b",function(){return o.b}),n.d(t,"c",function(){return o.d}),n.d(t,"h",function(){return o.f}),n.d(t,"i",function(){return o.g});var s=n(3);n.d(t,"d",function(){return s.a}),n.d(t,"f",function(){return s.b}),n.d(t,"j",function(){return s.c});var i=n(35);n.d(t,"e",function(){return i.a}),n.d(t,"k",function(){return i.b});var a=(n(37),n(38));n.d(t,"l",function(){return a.a})},function(e,t,n){"use strict";function r(e,t,n){void 0===t&&(t="");var r=s[e];switch(t){case i.BOOLEAN:return r?"false"!==r:n||!1;case i.STR_ARR:return r?r.split(","):n||[];case i.KEY_VALUE:if(!r)return n||{};var o=r.split(":");return{key:o[0],value:o[1]};case i.KEY_VALUE_ARR:return r?r.split(",").map(function(e){var t=e.split(":");return{key:t[0],value:t[1]}}):n||[];default:return r||t}}n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i}),n.d(t,"c",function(){return r});var o,s=process.env;!function(e){e.APP_KEYS="APP_KEYS",e.API_SERVER_URL="API_SERVER_URL",e.CCP_ACCOUNTSID="CCP_ACCOUNTSID",e.CCP_ACCOUNTTOKEN="CCP_ACCOUNTTOKEN",e.CCP_APPID="CCP_APPID",e.CCP_TEMPLATEID="CCP_TEMPLATEID",e.CCP_SERVERIP="CCP_SERVERIP",e.CCP_SERVERPORT="CCP_SERVERPORT",e.CCP_SOFTVERSION="CCP_SOFTVERSION",e.ENABLE_DEV_STATIC="ENABLE_DEV_STATIC",e.NON_SSR_PATTERN="NON_SSR_PATTERN",e.SMS_BASE_URL="SMS_BASE_URL",e.STATIC_PATTERN="STATIC_PATTERN"}(o||(o={}));var i;!function(e){e[e.BOOLEAN=0]="BOOLEAN",e[e.STR_ARR=1]="STR_ARR",e[e.KEY_VALUE=2]="KEY_VALUE",e[e.KEY_VALUE_ARR=3]="KEY_VALUE_ARR"}(i||(i={}))},function(e,t){e.exports=require("webpack")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return s}),n.d(t,"d",function(){return i}),n.d(t,"g",function(){return a}),n.d(t,"e",function(){return u}),n.d(t,"f",function(){return c});var r="/api",o=new RegExp("^("+r+")/"),s="Accept-Language",i="CAPTCHA_SESSION",a="VERIFICATION_CODE_COOKIE",u="rubick",c="token"},function(e,t){e.exports=require("crypto")},function(e,t,n){"use strict";var r=n(51);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return r.b}),n.d(t,"c",function(){return r.c}),n.d(t,"d",function(){return r.d})},function(e,t){e.exports=require("koa")},function(e,t){e.exports=require("koa-compose")},function(e,t){e.exports=require("koa-session")},function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"b",function(){return s});var r=n(3),o={ACCOUNT_SID:Object(r.c)(r.a.CCP_ACCOUNTSID),ACCOUNT_TOKEN:Object(r.c)(r.a.CCP_ACCOUNTTOKEN),APP_ID:Object(r.c)(r.a.CCP_APPID),TEMPLATE_ID:Object(r.c)(r.a.CCP_TEMPLATEID),SERVER_IP:Object(r.c)(r.a.CCP_SERVERIP),SERVER_PORT:Object(r.c)(r.a.CCP_SERVERPORT),SOFT_VERSION:Object(r.c)(r.a.CCP_SOFTVERSION)},s={}},function(e,t){e.exports=require("axios")},function(e,t,n){"use strict";var r=n(15);n.d(t,"a",function(){return r.a}),n.d(t,"b",function(){return r.b});var o=(n(43),n(44));n.d(t,"c",function(){return o.a})},function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return o});var r="LOCALE_COOKIE",o="Fri, 31 Dec 9999 23:59:59 GMT"},function(e,t,n){"use strict";n.d(t,"b",function(){return c}),n.d(t,"c",function(){return l}),n.d(t,"d",function(){return p}),n.d(t,"e",function(){return f});var r,o=n(5),s=(n.n(o),n(45));n.n(s);!function(e){e.DEV="development",e.PROD="production"}(r||(r={}));var i=process.env.NODE_ENV||r.DEV,a=process.env.HOST||"localhost",u=+process.env.PORT||4e3,c={NODE_ENV:i,"process.env.NODE_ENV":JSON.stringify(i),__DEV__:i===r.DEV,__PROD__:i===r.PROD,NON_INDEX_REGEX:/^(?!.*[\/\\](index)\.ts).*\.(ts|vue)$/.toString(),I18N_REGEX:/([\w-]*[\w]+)\.i18n\.json$/.toString(),INNER_SERVER:JSON.stringify("http://localhost:"+u+"/"),API_PREFIX:JSON.stringify("/api")},l=function(){var e=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return o.resolve.apply(o,[process.cwd()].concat(e))};return{base:e,src:e.bind(null,"src"),dist:e.bind(null,"dist"),server:e.bind(null,"server"),test:e.bind(null,"test")}}(),p=require,f=["axios","regenerator-runtime/runtime","vue","vue-router","vue-translator","vuex"],d={serverHost:a,serverPort:u,quiet:!1,stats:{colors:!0,modules:!1,children:!1,chunks:!1,chunkModules:!1}};t.a=d},function(e,t){e.exports=require("webpack-merge")},function(e,t,n){"use strict";var r=n(66),o=(n.n(r),n(67)),s=(n.n(o),n(4)),i=(n.n(s),n(1)),a=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},u=i.a.devTool,c=i.a.publicPath,l=i.b.__DEV__,p=i.b.__PROD__,f=!u,d=!f,h=r.extract({use:[{loader:"css-loader",options:{minimize:f&&{discardComments:{removeAll:!0}},sourceMap:d}},{loader:"postcss-loader",options:{sourceMap:d}},{loader:"resolve-url-loader",options:{sourceMap:d}},{loader:"sass-loader",options:{sourceMap:!0}},{loader:"sass-resources-loader",options:{resources:i.c.src("styles/_variables.scss")}}],fallback:"vue-style-loader"}),b={resolve:{modules:[i.c.src(),"node_modules"],extensions:[".ts",".vue",".js"]},output:{path:i.c.dist("static"),publicPath:c,filename:"[name].["+(p?"chunkhash":"hash")+"].js"},devtool:u,module:{rules:[{test:/\.ts$/,loader:"ts-loader",options:{appendTsSuffixTo:[/\.vue$/],compilerOptions:{module:"esnext",target:"es5"}}},{test:/\.vue$/,loader:"vue-loader",options:{cssModules:{camelCase:!0,localIdentName:p?"[hash:base64]":"[name]__[local]___[hash:base64:5]"},loaders:{scss:h}}},{test:/\.scss$/,use:h},{test:/\.(eot|svg|ttf|woff2?)$/,loader:"url-loader",options:{limit:8192}},{test:/\.pug$/,use:[{loader:"html-loader",options:{minimize:f}},"pug-html-loader"]}]},plugins:[new s.DefinePlugin(a({},i.b,{SERVER_PREFIX:JSON.stringify(i.a.publicPath)})),new s.SourceMapDevToolPlugin({test:/\.(css|js|ts)$/}),new r({filename:"app.[chunkhash].css",disable:l})].concat(p?[new s.optimize.ModuleConcatenationPlugin]:[new s.NoEmitOnErrorsPlugin,new o])};t.a=b},function(e,t,n){"use strict";t.a=function(e,t,n){var r=n.end;return new Promise(function(o){n.end=function(){r.apply(this,arguments),o(!1)},e(t,n,function(){return o(!0)})})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(21),o=(n.n(r),n(5)),s=(n.n(o),n(22)),i=n.n(s),a=n(0),u=(n.n(a),n(23)),c=(n.n(u),n(9)),l=(n.n(c),n(24)),p=(n.n(l),n(10)),f=(n.n(p),n(25)),d=(n.n(f),n(26)),h=(n.n(d),n(11)),b=(n.n(h),n(27)),v=(n.n(b),n(28)),y=(n.n(v),n(29)),m=(n.n(y),n(30)),g=(n.n(m),n(31)),_=(n.n(g),n(32)),w=(n.n(_),n(33)),E=(n.n(w),n(34)),O=(n.n(E),n(2)),k=n(40),x=n(14),P=n(1),R=n(48),S=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},T=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},C=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},A=this;i.a.languages([k.a.ZH,k.a.EN]);var j=!P.a.devTool,N=P.b.__DEV__,I=a("rubick:server"),D=P.a.serverHost,q=P.a.serverPort,V=function(e){var t=g.render(r.readFileSync(e,"utf-8"),{pretty:j,polyfill:!N});return j?Object(u.minify)(t,{collapseWhitespace:!0,minifyJS:!0}):t},L=new c;L.keys=Object(O.j)(O.d.APP_KEYS,O.f.STR_ARR),L.use(p([d(),f(),h(O.g,L)])),N?L.use(l(D,{port:q+1,preserveReqSession:!0,filter:function(e){return e.url.startsWith("/api")}})):Object(R.a)(L);var M,U,F,H=P.c.server("template.pug"),Y=function(e,t){return Object(_.createBundleRenderer)(e,S({},t,{inject:!1,cache:v({max:1e3,maxAge:9e5}),basedir:P.c.dist("static"),runInNewContext:!1}))};N?U=n(57).default(L,H,V,function(e,t){var n=t.clientManifest,r=t.fs,o=t.template;M=Y(e,{clientManifest:n,template:o}),F=r}):(F=r,M=Y(Object(P.d)(P.c.dist("static/vue-ssr-server-bundle.json")),{clientManifest:Object(P.d)(P.c.dist("static/vue-ssr-client-manifest.json")),template:V(H)}),L.use(b("dist/static",{defer:!0,maxage:31536e6})));var B=w.version,G=E.version,J={"Content-Type":"text/html",Server:"koa/"+B+"; vue-server-renderer/"+G},K=Object(O.j)(O.d.NON_SSR_PATTERN,O.f.STR_ARR),$=Object(O.j)(O.d.STATIC_PATTERN,O.f.STR_ARR);L.use(function(e,t){return T(A,void 0,void 0,function(){var n,r,s,a,u,c,l,p,f,d,h,b,v;return C(this,function(g){switch(g.label){case 0:return"GET"!==e.method||null!=e.body||404!==e.status||/(^\/api\/)|(\.[a-z]{2,4}\d?$)/.test(e.path)?[2]:[4,U];case 1:return g.sent(),(n=e.cookies.get(x.b),r=n||i.a.get(e.get(O.a)),n||e.cookies.set(x.b,r,{httpOnly:!1,path:"/",expires:new Date(x.a)}),e.set(J),s=e.url,K.find(function(e){return!!m(e).exec(s)}))?N?(e.body=F.createReadStream(P.c.dist("__non-ssr-page__.html")),[3,4]):[3,2]:[3,5];case 2:return e.url="__non-ssr-page__.html",[4,t()];case 3:g.sent(),g.label=4;case 4:return[2];case 5:return N&&!Object(O.j)(O.d.ENABLE_DEV_STATIC,O.f.BOOLEAN)||!$.find(function(e){return!!m(e).exec(s)})?[3,10]:(c=s.split("?")[0].replace(/^\//,"")||"home",l="static/"+c+"."+r+".html",p=e.hostname.endsWith(".now.sh"),u=p?o.resolve("/tmp",l):P.c.dist(l),F.existsSync(u)?N||p?(e.body=F.createReadStream(u),[3,8]):[3,6]:[3,9]);case 6:return e.url=l,[4,t()];case 7:g.sent(),g.label=8;case 8:return I('using static html file "'+u+'"'),[2];case 9:a=!0,g.label=10;case 10:return f=Date.now(),d={ctx:e,locale:r},h="",e.respond=!1,e.status=200,b=e.res,v=M.renderToStream(d).on("error",function(t){switch(e.status=t.status||500){case 302:return e.redirect(t.url),b.end();case 401:return e.redirect("/login?next="+s),b.end();case 404:return b.end("404 | Page Not Found");default:b.end("500 | Internal Server Error"),console.error("error during render : "+s),console.error(t.stack)}}).on("end",function(){if(h)try{y.sync(o.dirname(u),{fs:F}),F.writeFileSync(u,h),I('static html file "'+u+'" is generated')}catch(e){console.error(e)}I("whole request: "+(Date.now()-f)+"ms")}),a&&v.on("data",function(e){return h+=e}),v.pipe(b),[2]}})})}),L.listen(q,D,function(){return I("Server is now running at %s:%s.",D,q)})},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("accept-language")},function(e,t){e.exports=require("html-minifier")},function(e,t){e.exports=require("koa-better-http-proxy")},function(e,t){e.exports=require("koa-compress")},function(e,t){e.exports=require("koa-logger")},function(e,t){e.exports=require("koa-static")},function(e,t){e.exports=require("lru-cache")},function(e,t){e.exports=require("mkdirp")},function(e,t){e.exports=require("path-to-regexp")},function(e,t){e.exports=require("pug")},function(e,t){e.exports=require("vue-server-renderer")},function(e,t){e.exports=require("koa/package.json")},function(e,t){e.exports=require("vue/package.json")},function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return b});var r,o=n(13),s=n.n(o),i=n(0),a=(n.n(i),n(36)),u=(n.n(a),n(6)),c=n(3),l=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},p=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},f=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},d=this;!function(e){e.DELETE="delete",e.GET="get",e.HEAD="head",e.PATCH="patch",e.POST="post",e.PUT="put"}(r||(r={}));var h=i("rubick:jakiro"),b=function(e){var t=e.ctx,n=e.url,r=void 0===n?t.url:n,o=e.method,i=void 0===o?t.method:o,b=e.data,v=void 0===b?t.request.body:b,y=e.headers,m=e.params,g=void 0===m?t.query:m,_=e.qs;return p(d,void 0,void 0,function(){var e,n,o,p,d,b;return f(this,function(f){switch(f.label){case 0:r=r.replace(u.c,"/"),r=Object(c.c)(c.a.API_SERVER_URL)+(/^\/v[12]/.test(r)?r:"/v1"+r),_&&(v=a.stringify(v)),e=t.session.user,y=l({},y,{"Alauda-Request-ID":t.get("alauda-request-id"),"User-Agent":"rubick/v1.0"}),e&&(y.Authorization="Token "+e.token),f.label=1;case 1:return f.trys.push([1,3,,4]),[4,s.a.request({url:r,method:i,data:v,params:g,headers:y})];case 2:return n=f.sent(),[3,4];case 3:return o=f.sent(),n={data:o.response.data,error:o.message,status:o.response.status},[3,4];case 4:if(p=n.data,d=p||{},b=n.status,!(b>=400)||p&&p.errors||(d={code:"malformed_jakiro_response",source:"1019",error:n.error}),h("\nurl:%s\nresult: %O\nstatus:%d",r,d,b),d.errors&&(d.error=d.errors[0],d.code=d.error.code,delete d.errors),d.error)throw{result:d,status:b};return[2,{result:d,status:b}]}})})}},function(e,t){e.exports=require("qs")},function(e,t,n){"use strict";var r=n(7);n.n(r),n(6)},function(e,t,n){"use strict";n.d(t,"a",function(){return h});var r=n(13),o=n.n(r),s=n(7),i=(n.n(s),n(39)),a=(n.n(i),n(12)),u=n(3),c=a.a.ACCOUNT_SID,l=Object(u.c)(u.a.SMS_BASE_URL),p=function(){return{Accept:"application/json","Content-Type":"application/json;charset=utf-8",Authorization:new Buffer(c+":"+i().format("YYYYMMDDHHmmss")).toString("base64")}},f=function(){return s.createHash("md5").update(""+c+a.a.ACCOUNT_TOKEN+i().format("YYYYMMDDHHmmss")).digest("hex")},d=function(){return l+"/2013-12-26/Accounts/"+c+"/SMS/TemplateSMS?sig="+f().toUpperCase()},h=function(e,t){return o.a.post(d(),{to:e,appId:a.a.APP_ID,templateId:a.a.TEMPLATE_ID,datas:[t,"60"]},{headers:p()})}},function(e,t){e.exports=require("moment")},function(e,t,n){"use strict";var r=(n(41),n(42));n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";var r;!function(e){e.DASHBOARD="dashboard",e.CONTAINER="cubes",e.MIRROR="rocket",e.DOCS="file",e.LOCALE="globe"}(r||(r={}));var o;!function(e){e.DASHBOARD="dashboard",e.CONTAINER="container",e.APPLICATION="application",e.SERVICE="service",e.TEMPLATE="template",e.ENVFILE="envfile",e.CONFIGURATION="configuration",e.MIRROR="mirror",e.DOCS="docs",e.LOCALE="locale"}(o||(o={}));var s;!function(e){e.BOARD="board",e.DELIVERY="delivery",e.INFRASTRUCTURE="infrastructure",e.OPS="ops",e.APP_PLATFORM="app-platform",e.PLATFORM_EXTENSION="platform-extension",e.OTHERS="others"}(s||(s={}))},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r;!function(e){e.EN="en",e.ZH="zh"}(r||(r={}))},function(e,t,n){"use strict";n(15)},function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=function(e){return parseInt(e+"",10)}},function(e,t){e.exports={name:"rubick",version:"0.0.1",description:"Alauda front end project Rubick built with Vue stack + TypeScript, just for study.",repository:"https://github.com/JounQin/Rubick.git",author:"JounQin <admin@1stg.me>",license:"MIT",private:!0,scripts:{"server:core":"env-cmd .env env-cmd --fallback .env.local ts-node -r tsconfig-paths/register server","server:router":"env-cmd .env env-cmd --fallback .env.local ts-node -r tsconfig-paths/register server/router/dev",watch:'nodemon --exec "npm run server:router"',dev:"run-p server:core watch",start:"env-cmd --fallback .env.local env-cmd .env node dist/server","build:server":"webpack --config build/webpack/server.ts --color --progress","build:vue:client":"webpack --config build/webpack/vue-client.ts --color --progress","build:vue:server":"webpack --config build/webpack/vue-server.ts --color --progress",build:"rimraf dist && env-cmd --fallback .env.local env-cmd .env run-p build:server build:vue:client build:vue:server","sync:pull":"bash build/bash/sync-pull.sh","sync:push":"bash build/bash/sync-push.sh",lint:"tslint -p . -e 'node_modules/**' -t stylish '**/*.ts'","lint:fix":"npm run lint -- --fix",precommit:"lint-staged",pm2:"bash build/bash/sync-pull.sh && pm2 start --name=rubick npm -- start",prune:"yarn install --production --ignore-optional --ignore-scripts --prefer-offline --force"},browserslist:["> 1% in CN"],"lint-staged":{"*.{json,md}":["prettier --write","git add"],"*.ts":["tslint -p . -t stylish --fix","git add"]},nodemonConfig:{ext:"ts",watch:[".env",".env.local","server/router"]},postcss:{autoprefixer:null},prettier:{semi:!1,singleQuote:!0,trailingComma:"all",overrides:[{files:"*.json",options:{printWidth:150}}]},dependencies:{"accept-language":"^3.0.18",axios:"^0.17.1",captchapng2:"^1.0.3",debug:"^3.1.0","env-cmd":"^7.0.0","html-minifier":"^3.5.8",koa:"^2.4.1","koa-better-http-proxy":"^0.2.4","koa-bodyparser":"^4.2.0","koa-compose":"^4.0.0","koa-compress":"^2.0.0","koa-logger":"^3.1.0","koa-router":"^7.3.0","koa-session":"^5.5.1","koa-static":"^4.0.2",lodash:"^4.17.4","lru-cache":"^4.1.1",mkdirp:"^0.5.1",moment:"^2.20.1","path-to-regexp":"^2.1.0",pug:"^2.0.0-rc.4",qs:"^6.5.1","regenerator-runtime":"^0.11.1","ts-node":"^4.1.0","tsconfig-paths":"^2.6.0","v-tooltip":"^2.0.0-rc.25",vue:"^2.5.13","vue-class-component":"^6.1.2","vue-property-decorator":"^6.0.0","vue-router":"^3.0.1","vue-server-renderer":"^2.5.13","vue-translator":"^0.6.0",vuex:"^3.0.1","vuex-class":"^0.3.0"},devDependencies:{"@types/chokidar":"^1.7.4","@types/debug":"^0.0.30","@types/extract-text-webpack-plugin":"^3.0.0","@types/friendly-errors-webpack-plugin":"^0.1.1","@types/html-webpack-plugin":"^2.30.1","@types/koa":"^2.0.43","@types/koa-bodyparser":"^3.0.26","@types/koa-compose":"^3.2.2","@types/koa-compress":"^2.0.8","@types/koa-logger":"^3.1.0","@types/koa-router":"^7.0.27","@types/koa-session":"^3.0.6","@types/koa-static":"^4.0.0","@types/lodash":"^4.14.91","@types/lru-cache":"^4.1.0","@types/memory-fs":"^0.3.0","@types/mkdirp":"^0.5.2","@types/node":"^8.5.2","@types/pug":"^2.0.4","@types/qs":"^6.5.1","@types/shelljs":"^0.7.7","@types/webpack":"^3.8.1","@types/webpack-dev-middleware":"^1.12.0","@types/webpack-hot-middleware":"^2.16.2","@types/webpack-merge":"^4.1.1","@types/webpack-node-externals":"^1.6.0",autoprefixer:"^7.2.3",chokidar:"^1.7.0","css-loader":"^0.28.7","extract-text-webpack-plugin":"^3.0.2","file-loader":"^1.1.6","font-awesome":"^4.7.0","fonts.css":"^1.5.0","friendly-errors-webpack-plugin":"^1.6.1","html-loader":"^0.5.1","html-webpack-plugin":"^2.30.1",husky:"^0.14.3","lint-staged":"^6.0.0","memory-fs":"^0.4.1","node-sass":"^4.7.2",nodemon:"^1.14.3","normalize.css":"^7.0.0","npm-run-all":"^4.1.2","postcss-loader":"^2.0.9",prettier:"^1.9.2","pug-html-loader":"^1.1.5","resolve-url-loader":"^2.2.1",rimraf:"^2.6.2","sass-loader":"^6.0.6","sass-resources-loader":"^1.3.1",shelljs:"^0.7.8","sw-precache-webpack-plugin":"^0.11.4","ts-loader":"^3.2.0",tslint:"^5.8.0","tslint-config-prettier":"^1.6.0","tslint-plugin-prettier":"^1.3.0",typescript:"^2.6.2","url-loader":"^0.6.2","vue-loader":"^13.6.1","vue-template-compiler":"^2.5.13",webpack:"^3.10.0","webpack-dev-middleware":"^2.0.3","webpack-hot-middleware":"^2.21.0","webpack-merge":"^4.1.1","webpack-node-externals":"^1.6.0"}}},function(e,t,n){"use strict";t.a=function(e){return{devTool:"cheap-module-eval-source-map",publicPath:"http://"+e.serverHost+":"+e.serverPort+"/",hashType:"hash"}}},function(e,t,n){"use strict";t.a=function(e){return{devTool:!1,serverHost:"localhost",publicPath:"/",hashType:"chunkhash"}}},function(e,t,n){"use strict";var r=n(0),o=(n.n(r),n(9)),s=(n.n(o),n(49)),i=(n.n(s),n(10)),a=(n.n(i),n(50)),u=(n.n(a),n(11)),c=(n.n(u),n(1)),l=n(2),p=n(8),f=(n(52),this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})}),d=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},h=this,b=r("rubick:server"),v=new a({prefix:l.b});Object(p.d)(v),t.a=function(e){var t=!!e,n=[s(),v.routes(),v.allowedMethods(),function(e,t){return f(h,void 0,void 0,function(){var n,r,n,o;return d(this,function(s){switch(s.label){case 0:if(e.matched.length||!/^\/api/.test(e.url)||/\.[a-z]{2-4}\d?$/.test(e.path))return[3,4];s.label=1;case 1:return s.trys.push([1,3,,4]),[4,Object(l.k)({ctx:e})];case 2:return n=s.sent().result,e.body=n,[3,4];case 3:return r=s.sent(),n=r.result,o=r.status,e.body=n,e.status=o,[3,4];case 4:return[4,t()];case 5:return s.sent(),[2]}})})}];if(e||(e=new o,e.keys=Object(l.j)(l.d.APP_KEYS,l.f.STR_ARR),n.unshift(u(l.g,e))),e.use(i(n)),!t){var r=c.a.serverHost,a=c.a.serverPort;e.listen(a+1,r,function(){b("Router server is now running at %s:%s.",r,a+1)})}}},function(e,t){e.exports=require("koa-bodyparser")},function(e,t){e.exports=require("koa-router")},function(e,t,n){"use strict";function r(e,t){"string"==typeof e||e instanceof RegExp?e={method:t,path:e}:void 0!==t&&console.warn("method should not be passed in");var n=e||{},r=n.method,o=Array.isArray(r)?r:[r],s=n.path;return function(e,t,n){e=t?e:e.prototype,e[i]||(e[i]=[]);var a=e[i];t?a.push({handler:n.value,method:o,path:s}):(r&&a.forEach(function(e){return e.method=e.method[0]?e.method:o}),a.path=s)}}n.d(t,"b",function(){return o}),n.d(t,"d",function(){return a}),n.d(t,"a",function(){return u}),n.d(t,"c",function(){return r});var o,s=[];!function(e){e.ALL="all",e.DELETE="delete",e.GET="get",e.HEAD="head",e.OPTIONS="options",e.PATCH="patch",e.POST="post",e.PUT="put"}(o||(o={}));var i=Symbol("routes"),a=function(e){for(;s.length;)!function(){var t=s.shift();if(!t)return"continue";t.forEach(function(n){var r=n.handler,s=n.method,i=n.path,a=void 0===i?"":i;t.path&&"string"==typeof a&&(a=t.path+a),r=Array.isArray(r)?r:[r],s.forEach(function(t){return(n=e)[t||o.GET].apply(n,[a].concat(r));var n})})}()},u=function(e){s.push(e.prototype[i])}},function(e,t,n){"use strict";n(53),n(54)},function(e,t,n){"use strict";var r=n(8),o=n(2),s=this&&this.__decorate||function(e,t,n,r){var o,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,n,i):o(t,n))||i);return s>3&&i&&Object.defineProperty(t,n,i),i},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},u=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a};!function(){function e(){}e.prototype.commonCheck=function(e){return a(this,void 0,void 0,function(){var t,n,r,s,i,a,c,l,p;return u(this,function(u){switch(u.label){case 0:t=e.session.user,u.label=1;case 1:return u.trys.push([1,3,,4]),[4,Promise.all([Object(o.k)({ctx:e,url:"/auth/profile"}),Object(o.k)({ctx:e,url:"/regions/"+t.namespace})])];case 2:return s=u.sent(),i=s[0].result,a=s[1].result,n=i,r=a,[3,4];case 3:return c=u.sent(),l=c.result,p=c.status,e.session=null,e.body=l,e.status=p,[2];case 4:return e.body={profile:n,regions:r},[2]}})})},e.prototype.logout=function(e){e.session=null,e.body=null},s([Object(r.c)("/common"),i("design:type",Function),i("design:paramtypes",[Object]),i("design:returntype",Promise)],e.prototype,"commonCheck",null),s([Object(r.c)("/logout"),i("design:type",Function),i("design:paramtypes",[Object]),i("design:returntype",void 0)],e.prototype,"logout",null),e=s([r.a],e)}()},function(e,t,n){"use strict";var r=n(55),o=(n.n(r),n(7)),s=(n.n(o),n(56)),i=(n.n(s),n(8)),a=n(2),u=n(14),c=this&&this.__decorate||function(e,t,n,r){var o,s=arguments.length,i=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,n,i):o(t,n))||i);return s>3&&i&&Object.defineProperty(t,n,i),i},l=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},p=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},f=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},d=function(){return Object(u.c)(9e3*Math.random()+1e3)+""},h=function(e){return new r(80,30,e).getBuffer()};!function(){function e(){}e.prototype.loginCheck=function(e){return p(this,void 0,void 0,function(){return f(this,function(t){return e.body=Object(s.omit)(e.session.user,a.h),[2]})})},e.prototype.login=function(e){return p(this,void 0,void 0,function(){var t,n,r,o,i,o,u,c,l;return f(this,function(p){switch(p.label){case 0:t=e.request,n=t.body,p.label=1;case 1:return p.trys.push([1,3,,4]),[4,Object(a.k)({ctx:e,url:"/generate-api-token",headers:{CLIENT:e.ips.length?e.ips.join(", "):e.ip}})];case 2:return o=p.sent().result,r=o,[3,4];case 3:return i=p.sent(),o=i.result,u=i.status,e.body=o,e.status=u,[2];case 4:return e.user=e.session.user=r,[4,Object(a.k)({ctx:e,url:"/auth/"+(n.organization||n.username)+"/profile",method:a.e.GET})];case 5:return c=p.sent().result,c.password_is_empty?l="/user/password":n.next&&(l=n.next),e.body={url:l||"/",user:Object(s.omit)(r,a.h)},[2]}})})},e.prototype.getCaptcha=function(e){var t=d();e.session[a.c]=t,e.type="image/png",e.body=h(t)},e.prototype.sendSms=function(e){return p(this,void 0,void 0,function(){var t,n,r;return f(this,function(s){switch(s.label){case 0:return(t=e.session[a.c])!==e.request.body.captcha?(e.body={errors:[{code:"invalid_captcha"}]},e.status=401,[2]):(n=d(),r=e.request.body.mobile,[4,Object(a.l)(r,n)]);case 1:return s.sent(),e.cookies.set(a.i,o.createHash("md5").update(r+n).digest("hex"),{maxAge:36e5}),[2]}})})},c([Object(i.c)("/login"),l("design:type",Function),l("design:paramtypes",[Object]),l("design:returntype",Promise)],e.prototype,"loginCheck",null),c([Object(i.c)("/login",i.b.POST),l("design:type",Function),l("design:paramtypes",[Object]),l("design:returntype",Promise)],e.prototype,"login",null),c([Object(i.c)("/captcha"),l("design:type",Function),l("design:paramtypes",[Object]),l("design:returntype",void 0)],e.prototype,"getCaptcha",null),c([Object(i.c)("/sms",i.b.POST),l("design:type",Function),l("design:paramtypes",[Object]),l("design:returntype",Promise)],e.prototype,"sendSms",null),e=c([i.a],e)}()},function(e,t){e.exports=require("captchapng2")},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(58),o=(n.n(r),n(0)),s=(n.n(o),n(59)),i=(n.n(s),n(4)),a=(n.n(i),n(60)),u=(n.n(a),n(1)),c=n(61),l=n(71),p=n(72),f=o("rubick:server"),d=function(e,t){return e.readFileSync(u.c.dist("static/"+t),"utf-8")};t.default=function(e,t,n,o){var h,b,v,y,m,g=new Promise(function(e){m=e}),_=function(){h&&b&&(m(),o(h,{fs:v,template:y,clientManifest:b}))};y=n(t),Object(r.watch)(t).on("change",function(){y=n(t),f("pug template updated."),_()});var w=i(c.a),E=a(w,{publicPath:u.a.publicPath,quiet:u.a.quiet,noInfo:u.a.quiet,lazy:!1,stats:u.a.stats});w.plugin("done",function(e){e=e.toJson(),e.errors.forEach(console.error),e.warnings.forEach(console.warn),e.errors.length||(v=E.fileSystem,b=JSON.parse(d(v,"vue-ssr-client-manifest.json")),_())}),e.use(Object(l.a)(w,E)).use(Object(p.a)(w));var O=new s,k=i(c.b);return k.outputFileSystem=O,k.watch({},function(e,t){if(e)throw e;t.toJson().errors.length||(h=JSON.parse(d(O,"vue-ssr-server-bundle.json")),_())}),g}},function(e,t){e.exports=require("chokidar")},function(e,t){e.exports=require("memory-fs")},function(e,t){e.exports=require("webpack-dev-middleware")},function(e,t,n){"use strict";var r=n(62);n.d(t,"a",function(){return r.a});var o=n(68);n.d(t,"b",function(){return o.a})},function(e,t,n){"use strict";var r=n(0),o=(n.n(r),n(63)),s=(n.n(o),n(64)),i=(n.n(s),n(65)),a=(n.n(i),n(4)),u=(n.n(a),n(17)),c=(n.n(u),n(1)),l=n(18),p=c.a.devTool,f=c.b.__DEV__,d=c.b.NODE_ENV,h=r("rubick:webpack:client");h("create webpack configuration for NODE_ENV:"+d+", VUE_ENV:client");var b=u.smart(l.a,{entry:{app:[c.c.src("entry-client.ts")],vendors:c.e},target:"web",plugins:[new a.DefinePlugin({"process.env.VUE_ENV":JSON.stringify("client"),__SERVER__:JSON.stringify(!1)}),new a.optimize.CommonsChunkPlugin({name:"vendors"}),new a.optimize.CommonsChunkPlugin({name:"manifest"}),new o({template:"src/index.pug",filename:"__non-ssr-page__.html",favicon:"src/assets/favicon.ico"}),new i]});p||(h("Enable plugins for "+d+" (UglifyJS)."),b.plugins.push(new a.optimize.UglifyJsPlugin({comments:!1}))),f?(b.entry.app.unshift("webpack-hot-middleware/client"),b.plugins.push(new a.HotModuleReplacementPlugin,new a.NoEmitOnErrorsPlugin)):(h("Enable plugins for "+d+" (SWPrecache)."),b.plugins.push(new s({cacheId:"rubick",filename:"service-worker.js",minify:!0,dontCacheBustUrlsMatching:/./,staticFileGlobsIgnorePatterns:[/index\.html$/,/\.map$/,/\.json$/],stripPrefix:c.c.dist().replace(/\\/g,"/"),runtimeCaching:[{urlPattern:/\//,handler:"networkFirst"}]}))),t.a=b},function(e,t){e.exports=require("html-webpack-plugin")},function(e,t){e.exports=require("sw-precache-webpack-plugin")},function(e,t){e.exports=require("vue-server-renderer/client-plugin")},function(e,t){e.exports=require("extract-text-webpack-plugin")},function(e,t){e.exports=require("friendly-errors-webpack-plugin")},function(e,t,n){"use strict";(function(e){var r=n(5),o=(n.n(r),n(0)),s=(n.n(o),n(69)),i=(n.n(s),n(4)),a=(n.n(i),n(17)),u=(n.n(a),n(70)),c=(n.n(u),n(1)),l=n(18),p=c.b.NODE_ENV;o("rubick:webpack:server")("create webpack configuration for NODE_ENV:"+p+", VUE_ENV:server"),t.a=a.smart(l.a,{entry:[r.resolve(e,"element.js"),c.c.src("entry-server.ts")],target:"node",output:{filename:"server-bundle.js",libraryTarget:"commonjs2"},plugins:[new i.DefinePlugin({"process.env.VUE_ENV":JSON.stringify("server"),__SERVER__:JSON.stringify(!0)}),new s],externals:u({whitelist:[/\.css$/]})})}).call(t,"/")},function(e,t){e.exports=require("vue-server-renderer/server-plugin")},function(e,t){e.exports=require("webpack-node-externals")},function(e,t,n){"use strict";var r=n(0),o=(n.n(r),n(19)),s=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},a=this,u=r("rubick:webpack-dev");t.a=function(e,t){return u("Enable webpack dev middleware."),function(e,n){return s(a,void 0,void 0,function(){var r;return i(this,function(s){switch(s.label){case 0:return[4,Object(o.a)(t,e.req,{end:function(t){e.body=t},setHeader:function(t,n){e.set(t,n)}})];case 1:return r=s.sent(),r?[4,n()]:[3,3];case 2:s.sent(),s.label=3;case 3:return[2]}})})}}},function(e,t,n){"use strict";var r=n(0),o=(n.n(r),n(73)),s=(n.n(o),n(19)),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,s&&(i=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(i=i.call(s,n[1])).done)return i;switch(s=0,i&&(n=[0,i.value]),n[0]){case 0:case 1:i=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!i||n[1]>i[0]&&n[1]<i[3])){u.label=n[1];break}if(6===n[0]&&u.label<i[1]){u.label=i[1],i=n;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(n);break}i[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],s=0}finally{o=i=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,s,i,a,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},u=this,c=r("rubick:webpack-hmr");t.a=function(e){c("Enable Webpack Hot Module Replacement (HMR).");var t=o(e,{heartbeat:5e3});return function(e,n){return i(u,void 0,void 0,function(){var r;return a(this,function(o){switch(o.label){case 0:return[4,Object(s.a)(t,e.req,e.res)];case 1:return r=o.sent(),r?[4,n()]:[3,3];case 2:o.sent(),o.label=3;case 3:return[2]}})})}}},function(e,t){e.exports=require("webpack-hot-middleware")}]);