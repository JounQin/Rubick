webpackJsonp([3],{112:function(e,t,i){var n=i(113);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=i(85).default;r("31f4a169",n,!0,{})},113:function(e,t,i){t=e.exports=i(84)(!1),t.push([e.i,"._3FWqHmsIQNZf80qRt6dXZf_0{display:flex;color:#5fc4e6;font-size:12px;margin-bottom:20px}._3FWqHmsIQNZf80qRt6dXZf_0>ol{flex:1;margin-bottom:0;padding-left:20px}",""]),t.locals={note:"_3FWqHmsIQNZf80qRt6dXZf_0"}},120:function(e,t,i){"use strict";function n(e){this.$style=i(112)}Object.defineProperty(t,"__esModule",{value:!0});var r=i(4),o=i(9),a=i(5),s=i(25),l=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),c=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},p=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},d={imageCaptcha:"image",verificationCode:"code"},u={industry:["education","e-commerce","mobile-medical","entertainment","locale","social-network","estate-service","ads-marketing","mobile-internet","travel","game","tool-software","internet-finance","enterprise-service","others"],trailMode:["professional","enterprise","data-center"],applyingServices:["cloud-strategy-consultancy","cloud-solution-architect","application-migrating-deployment","support-operational-optimization","professional-training"],informedWay:["social-site","offline-activity","media-reports","forums","search-engine","recommended","others"]},m=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.types=["account","email","password","confirmPassword","mobile","imageCaptcha","verificationCode","realyname","company","city","industry","position","trailMode","applyingServices","informedWay"],t.account=null,t.email=null,t.password=null,t.confirmPassword=null,t.mobile=null,t.imageCaptcha=null,t.verificationCode=null,t.realyname=null,t.company=null,t.city=null,t.industry=null,t.position=null,t.trailMode=null,t.applyingServices=null,t.informedWay=null,t.snakeCase=o.e,t.Captchas=d,t.Selections={},t}return l(t,e),t.prototype.localeChange=function(){for(var e=this,t=this,i=0,n=Object.entries(u);i<n.length;i++){var r=n[i],a=r[0],s=r[1];!function(i,n){var r=t.Selections[i];r||(r=t.Selections[i]=[]),n.forEach(function(t,i){var n=e.$t(Object(o.e)(t));r[i]?r[i].display=n:r[i]={display:n,value:t}})}(a,s)}},t.prototype.register=function(){},c([Object(a.Watch)("$t.locale",{immediate:!0}),p("design:type",Function),p("design:paramtypes",[]),p("design:returntype",void 0)],t.prototype,"localeChange",null),t=c([Object(a.Component)({components:{RbInput:s.a},translator:{zh:{enterprise_registration:"企业注册",realyname:"真实姓名",company:"公司名称",city:"所在城市",industry:"公司行业",position:"职位",trail_mode:"希望试用的模式",applying_services:"希望申请的服务",informed_way:"获知途径",register_tips_1:'我们不提供 VPN 服务("翻墙")，请遵守国家法律法规',register_tips_2:"请填写您企业的真实信息，以便尽快通过审核并开启试用",register_tips_3:"所有字段皆为必填",enterprise:"企业版",data_center:"数据中心版",professional:"专业版",education:"教育",e_commerce:"电子商务",mobile_medical:"移动医疗",entertainment:"文化娱乐",local_life:"本地生活",social_network:"社交网络",estate_service:"房产服务",ads_marketing:"广告营销",mobile_internet:"移动互联网",travel:"旅游",game:"游戏",tool_software:"工具软件",internet_finance:"互联网金融",enterprise_service:"企业服务",others:"其它",cloud_strategy_consultancy:"云战略咨询规划",cloud_solution_architect:"云架构方案设计",application_migrating_deployment:"应用迁移部署",support_operational_optimization:"运维优化支撑",professional_training:"专业培训认证",social_site:"微信微博",offline_activity:"线下活动",media_reports:"媒体报道",forums:"社区论坛",search_engine:"搜索引擎",recommended:"朋友推荐"},en:{enterprise_registration:"Enterprise Registration",realyname:"Your Full Name",company:"Company Name",city:"City",industry:"Industry",position:"Your Position",trail_mode:"Trail Mode",applying_services:"Expected Services to Apply",informed_way:"How do you get to know about us?",register_tips_1:"We don't provide VPN services. Please comply with national laws and regulations",register_tips_2:"Fill out your genuine business details so that your registration can be reviewed and approved as soon as possible",register_tips_3:"All fields are mandatory",enterprise:"Enterprise",data_center:"Data Center",professional:"Professional",education:"Education",e_commerce:"E-Commerce",mobile_medical:"Mobile Medical",entertainment:"Entertainment",local_life:"Locale Life",social_network:"Social Network",estate_service:"Estate Service",ads_marketing:"ADs Marketing",mobile_internet:"Mobile Internet",travel:"Travel",game:"Video Games",tool_software:"Tool Software",internet_finance:"Internet Finance",enterprise_service:"Enterprise Service",others:"Others",cloud_strategy_consultancy:"Cloud Strategy Consultancy",cloud_solution_architect:"Cloud Solution architect",application_migrating_deployment:"Application Migration Deployment",support_operational_optimization:"Operation Optimization Support",professional_training:"Professional Training",social_site:"Social Media",offline_activity:"Offline Activities",media_reports:"Media",forums:"Forums",search_engine:"Search Engine",recommended:"Friend Recommendation"}},validator:{account:{required:!0},email:{required:!0},password:{required:!0},confirmPassword:{required:!0},mobile:{mobile:!0},imageCaptcha:{length:4},verificationCode:{length:4},realyname:{required:!0},company:{required:!0},city:{required:!0},industry:{required:!0},position:{required:!0},trailMode:{required:!0},applyingServices:{required:!0},informedWay:{required:!0}}})],t)}(a.Vue),_=m,f=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("main",[i("form",{staticClass:"wider",on:{submit:function(t){t.preventDefault(),e.register(t)}}},[i("div",[e._v(e._s(e.$t("enterprise_registration")))]),i("div",{class:e.$style.note},[i("div",[e._v(e._s(e.$t("note")+e.$t("colon")))]),i("ol",e._l(3,function(t){return i("li",[e._v(e._s(e.$t("register_tips_"+t)))])}))]),e._l(e.types,function(t){return i("rb-input",{key:t,class:{invalid:e.$v[t].$error},attrs:{label:e.$t(e.snakeCase(t)),captcha:e.Captchas[t],captchaDisabled:"verificationCode"===t&&(e.$v.mobile.$invalid||e.$v.imageCaptcha.$invalid),captchaData:"verificationCode"===t?{captcha:e.imageCaptcha,mobile:e.mobile}:null,selections:e.Selections[t],displayField:"display",valueField:"value",maxNum:"applyingServices"===t?-1:1,type:-1!==t.indexOf("password")?"password":"text"},on:{input:function(i){e.$v[t].$touch()}},model:{value:e._self[t],callback:function(i){e.$set(e._self,t,i)},expression:"_self[type]"}},[e.$v[t].$dirty&&!e.$v[t].required?i("template",{slot:"error"},[e._v(e._s(e.$t("required")))]):e._e()],2)}),i("rb-btn",{staticClass:"btn-block",attrs:{type:"submit",disabled:e.$v.$invalid}},[e._v(e._s(e.$t("register")))])],2),i("div",{staticClass:"tips text-center"},[i("router-link",{attrs:{to:"/login"}},[e._v(e._s(e.$t("login_tips")))])],1)])},y=[],v={render:f,staticRenderFns:y},g=v,h=n,b=Object(r.a)(_,g,!1,h,null,null);t.default=b.exports}});