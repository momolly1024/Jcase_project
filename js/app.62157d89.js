(function(t){function e(e){for(var n,r,i=e[0],c=e[1],l=e[2],u=0,d=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&d.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);f&&f(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,r=1;r<a.length;r++){var c=a[r];0!==s[c]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},s={app:0},o=[];function r(t){return i.p+"js/"+({about:"about",admin:"admin",back:"back",contact:"contact",coopstore:"coopstore",createadmin:"createadmin",get:"get",login:"login",post:"post",reg:"reg"}[t]||t)+"."+{about:"b16942ca",admin:"f0b7ea38",back:"d1399019",contact:"c4383454",coopstore:"860b558a",createadmin:"249ec891",get:"0d20f0a2",login:"f53a5360",post:"0fd089e3",reg:"46555245"}[t]+".js"}function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.e=function(t){var e=[],a=s[t];if(0!==a)if(a)e.push(a[2]);else{var n=new Promise((function(e,n){a=s[t]=[e,n]}));e.push(a[2]=n);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=r(t);var l=new Error;o=function(e){c.onerror=c.onload=null,clearTimeout(u);var a=s[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",l.name="ChunkLoadError",l.type=n,l.request=o,a[1](l)}s[t]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:c})}),12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(e)},i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var f=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"4d87":function(t,e,a){t.exports=a.p+"img/logo.29300b6f.svg"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("go-top",{attrs:{"bg-color":"#D6D0D0",size:50}}),n("div",{attrs:{id:"nav"}},[n("b-navbar",{attrs:{toggleable:"lg",type:"dark"}},[n("b-navbar-brand",{attrs:{to:"/"}},[n("img",{attrs:{src:a("4d87"),width:"100px",height:"auto"}})]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item",{staticClass:"nav",attrs:{to:"/postcase"}},[n("font-awesome-icon",{attrs:{icon:["fas","paste"]}}),t._v("我要提案 ")],1),n("b-nav-item",{staticClass:"nav",attrs:{to:"/getcase"}},[n("font-awesome-icon",{attrs:{icon:["fas","search"]}}),t._v("我要接案")],1),n("b-nav-item",{staticClass:"nav",attrs:{to:"/about"}},[n("font-awesome-icon",{attrs:{icon:["fas","user"]}}),t._v("個人資訊 ")],1),n("b-nav-item",{staticClass:"nav",attrs:{to:"/contact"}},[n("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("聯繫我們 ")],1)],1),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-navbar-nav",[0!==t.user.length?n("b-nav-item",[n("span",[t._v("hello ❤ "+t._s(this.user)+" , 歡迎回來")]),t._v(" || ")]):t._e(),0===t.user.length?n("b-nav-item",{staticClass:"nav",attrs:{href:"#",to:"/login"}},[n("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("登入")],1):n("b-nav-item",{staticClass:"nav",attrs:{href:"#"},on:{click:t.logout}},[n("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("登出 ")],1),0===t.user.length?n("b-nav-item",{staticClass:"nav",attrs:{href:"#",to:"/reg"}},[n("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("註冊")],1):t._e()],1)],1)],1)],1)],1),n("keep-alive",[n("vue-page-transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)],1)},o=[],r=a("3d20"),i=a.n(r),c=a("49ec"),l=a.n(c),u={name:"app",data:function(){return{userdetail:[]}},components:{GoTop:l.a},computed:{user:function(){return this.$store.getters.user}},methods:{logout:function(){var t=this;this.axios.delete("https://jcaseproject.herokuapp.com//logout").then((function(e){var a=e.data;a.success?(i.a.fire({title:"已登出",timer:1e3,showConfirmButton:!1}),t.$store.commit("logout"),console.log(t.$route),"/"!==t.$route.path&&t.$router.push("/"),console.log(t.$state.user)):i.a.fire(a.message)})).catch((function(t){i.a.fire(t.response.data.message)}))},heartbeat:function(){var t=this;this.axios.get("https://jcaseproject.herokuapp.com//heartbeat").then((function(e){var a=e.data;t.user.length>0&&(a||(alert("登入時效已過"),t.$store.commit("logout"),"/"!==t.$route.path&&t.$router.push("/")))})).catch((function(){alert("發生錯誤"),t.$store.commit("logout"),"/"!==t.$route.path&&t.$router.push("/")}))}},mounted:function(){var t=this;this.heartbeat(),setInterval((function(){t.heartbeat()}),5e3)}},f=u,d=a("2877"),p=Object(d["a"])(f,s,o,!1,null,null,null),m=p.exports,h=a("9483");Object(h["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});a("d3b7");var v=a("8c4f"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("Carousel"),a("Cooperation"),a("Advantage"),a("Member"),a("Story"),a("Footer")],1)},b=[],C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:5e3,controls:"",indicators:"",background:"#ababab"},on:{"sliding-start":t.onSlideStart,"sliding-end":t.onSlideEnd},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},[a("b-carousel-slide",{attrs:{"img-src":"https://picsum.photos/1920/820/?image=12"}},[a("h2",[t._v(t._s(t.bannerTitle))]),a("p",[t._v(" "+t._s(t.bannerText)+" ")])]),a("b-carousel-slide",{attrs:{"img-src":"https://picsum.photos/1920/820/?image=54"}},[a("h2",[t._v(t._s(t.bannerTitle02))]),a("p",[t._v(" "+t._s(t.bannerText02))])]),a("b-carousel-slide",{attrs:{"img-src":"https://picsum.photos/1920/820/?image=58"}},[a("h2",[t._v(t._s(t.bannerTitle03))]),a("p",[t._v(" "+t._s(t.bannerText03))])]),a("b-carousel-slide",{scopedSlots:t._u([{key:"img",fn:function(){return[a("img",{staticClass:"d-block img-fluid w-100 h-100 ",attrs:{src:"https://picsum.photos/1920/820/?image=10",alt:"image slot"}})]},proxy:!0}])},[a("h2",[t._v(t._s(t.bannerTitle04))]),a("p",[t._v(" "+t._s(t.bannerText04))])])],1)],1)},_=[],w={data:function(){return{slide:0,sliding:null,bannerTitle:"歡迎各大乾爹與我們聯繫",bannerText:"有興趣合作的廠商信件/電話討論合作事宜",bannerTitle02:"歡迎各大乾爹與我們聯繫",bannerText02:"有興趣合作的廠商信件/電話討論合作事宜",bannerTitle03:"歡迎各大乾爹與我們聯繫",bannerText03:"有興趣合作的廠商信件/電話討論合作事宜",bannerTitle04:"歡迎各大乾爹與我們聯繫",bannerText04:"有興趣合作的廠商信件/電話討論合作事宜"}},methods:{onSlideStart:function(t){this.sliding=!0},onSlideEnd:function(t){this.sliding=!1}},mounted:function(){var t=this;this.axios.get("https://jcaseproject.herokuapp.com//setting/").then((function(e){var a=e.data;a.success?(t.bannerTitle=a.result[a.result.length-1].bannerTitle,t.bannerText=a.result[a.result.length-1].bannerText):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")})),this.axios.get("https://jcaseproject.herokuapp.com//setting02").then((function(e){var a=e.data;a.success?(t.bannerTitle02=a.result[a.result.length-1].bannerTitle02,t.bannerText02=a.result[a.result.length-1].bannerText02):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")})),this.axios.get("https://jcaseproject.herokuapp.com//setting03").then((function(e){var a=e.data;a.success?(t.bannerTitle03=a.result[a.result.length-1].bannerTitle03,t.bannerText03=a.result[a.result.length-1].bannerText03):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")})),this.axios.get("https://jcaseproject.herokuapp.com//setting04").then((function(e){var a=e.data;a.success?(t.bannerTitle04=a.result[a.result.length-1].bannerTitle04,t.bannerText04=a.result[a.result.length-1].bannerText04):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")}))}},x=w,k=Object(d["a"])(x,C,_,!1,null,null,null),y=k.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"Cooperation"}},[n("div",{staticClass:"skewed"}),n("h2",[t._v("會員反饋")]),n("b-container",[n("b-row",[n("b-col",{staticClass:"col-sm-4 col-12"},[n("div",{staticClass:"people"},[n("img",{attrs:{src:a("64df")}}),n("p",[t._v("感謝平台，免雜費而且註冊方便，隨時隨地提案接案！很開心參與平台初期的回饋活動，以基本功能來說，我最愛的是註冊方便快速，因為忘記帳號密碼一直是我很苦惱的問題，用過各大廠牌的銀杏，但卻沒有什麼改善，永遠記不住。由於註冊帳號很簡單四個字就可以，沒有難度限制，所以連續幾天用下來，我必用，重點是，免費的，真是深得我心啊❤️")])])]),n("b-col",{staticClass:"col-sm-4 col-12"},[n("div",{staticClass:"people"},[n("img",{attrs:{src:a("cb78")}}),n("p",[t._v("感謝平台，讓我們合作愉快，在這裡我遇見了超有趣的廠商，交了很多朋友，雖然平台功能尚未完善，但基本功能的使用上都沒BUG，比起其他提案網站，這裡清楚簡便，一目了然，真是太讚了。")])])]),n("b-col",{staticClass:"col-sm-4 col-12"},[n("div",{staticClass:"people"},[n("img",{attrs:{src:a("f610")}}),n("p",[t._v("感謝平台，讓我們小資族可以賺點外快～沒錯，SOHO族的我只能上網接接案，用過很多平台系統，就屬這裡最好用，去掉五花八門的廣告顏色，這裡的排版設計乾淨清晰，不過功能希望可以持續更新增加啦～")])])])],1)],1),n("b-container",[n("h2",[t._v("合作廠商")]),n("b-row",[n("b-col",{staticClass:"col-sm-4 col-12 coop"},[n("a",{attrs:{href:t.coHref,target:"_blank"}},[n("img",{attrs:{src:t.coImg}})]),n("p",[t._v(" "+t._s(t.coDescription)+" ")])]),n("b-col",{staticClass:"col-sm-4 col-12 coop"},[n("a",{attrs:{href:t.coHref02,target:"_blank"}},[n("img",{attrs:{src:t.coImg02}})]),n("p",[t._v(t._s(t.coDescription02))])]),n("b-col",{staticClass:"col-sm-4 col-12 coop"},[n("a",{attrs:{href:t.coHref03,target:"_blank"}},[n("img",{attrs:{src:t.coImg03}})]),n("p",[t._v(t._s(t.coDescription03))])])],1)],1)],1)},T=[],O={data:function(){return{coDescription:"說明1(預設文字)",coImg:"https://picsum.photos/150/150/?random=1",coHref:"https://google.com.tw",coDescription02:"說明2(預設文字)",coImg02:"https://picsum.photos/150/150/?random=2",coHref02:"https://youtube.com.tw",coDescription03:"說明3(預設文字)",coImg03:"https://picsum.photos/150/150/?random=3",coHref03:"https://www.npmjs.com/"}},mounted:function(){var t=this;this.axios.get("https://jcaseproject.herokuapp.com//cooperation/").then((function(e){var a=e.data;a.success?(t.coDescription=a.result[a.result.length-1].coDescription,t.coImg=a.result[a.result.length-1].coImg,t.coHref=a.result[a.result.length-1].coHref):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")})),this.axios.get("https://jcaseproject.herokuapp.com//cooperation02/").then((function(e){var a=e.data;a.success?(t.coDescription02=a.result[a.result.length-1].coDescription02,t.coImg02=a.result[a.result.length-1].coImg02,t.coHref02=a.result[a.result.length-1].coHref02):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")})),this.axios.get("https://jcaseproject.herokuapp.com//cooperation03/").then((function(e){var a=e.data;a.success?(t.coDescription03=a.result[a.result.length-1].coDescription03,t.coImg03=a.result[a.result.length-1].coImg03,t.coHref03=a.result[a.result.length-1].coHref03):i.a.fire(a.message)})).catch((function(){alert("發生錯誤")}))}},$=O,E=Object(d["a"])($,j,T,!1,null,null,null),S=E.exports,I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Member"}},[a("h2",[t._v("最新資料")]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-4"},[a("div",{staticClass:"card member"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("總案件數")]),a("div",{staticClass:"iCountUp"},[a("ICountUp",{attrs:{delay:t.delay,endVal:t.endVal,options:t.options},on:{ready:t.onReady}})],1),a("p",{staticClass:"card-text"},[t._v("感謝所有會員的支持")])])])]),a("div",{staticClass:"col-sm-4 "},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("總註冊人數")]),a("div",{staticClass:"iCountUp"},[a("ICountUp",{attrs:{delay:t.delay,endVal:t.endVal,options:t.options},on:{ready:t.onReady}})],1),a("p",{staticClass:"card-text"},[t._v("我們會持續努力")])])])]),a("div",{staticClass:"col-sm-4 "},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("捐款總金額")]),a("div",{staticClass:"iCountUp"},[a("ICountUp",{attrs:{delay:t.delay,endVal:t.endVal,options:t.options},on:{ready:t.onReady}})],1),a("p",{staticClass:"card-text"},[t._v("本平台將所有營收捐給社福機構")])])])])])])])},D=[],H=a("87f4"),P=a.n(H),A={name:"demo",components:{ICountUp:P.a},data:function(){return{delay:1e3,endVal:120500,options:{useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""}}},methods:{onReady:function(t,e){var a=this;t.update(a.endVal+100)}}},U=A,V=Object(d["a"])(U,I,D,!1,null,null,null),M=V.exports,q=a("fd2d"),B=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},R=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"story"}},[n("h2",[t._v("關於我們")]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6 col-12"},[n("img",{attrs:{src:a("6005")}})]),n("div",{staticClass:"col-md-6 col-12"},[n("h5",{staticClass:"mt-0"},[t._v("J_Case")]),n("p",[t._v(" 希望藉由這個J_Case媒合工程師及業主，"),n("br"),t._v(" 統合業主提案顯示在此平台，"),n("br"),t._v(" 減少搜尋人才或CASE的過程。"),n("br"),t._v(" 本平台所有收益皆會捐給弱勢團體，"),n("br"),t._v(" 也歡迎需要的社福機構與我們聯繫，"),n("br"),t._v(" 目前合作的廠商有：ooxx,qqww,eerr,aass,zzcc... ")])])])])}],F={},G=Object(d["a"])(F,B,R,!1,null,null,null),J=G.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"})},L=[],N={},Q=Object(d["a"])(N,z,L,!1,null,null,null),K=Q.exports,W={name:"Home",components:{Carousel:y,Cooperation:S,Advantage:K,Member:M,Footer:q["a"],Story:J}},X=W,Y=Object(d["a"])(X,g,b,!1,null,null,null),Z=Y.exports,tt=a("fe75"),et=a.n(tt),at=a("2f62"),nt=a("0e44");n["default"].use(at["a"]);var st=new at["a"].Store({state:{user:"",admin:""},mutations:{login:function(t,e){t.user=e},logout:function(t){t.user=""}},getters:{user:function(t){return t.user}},plugins:[Object(nt["a"])()]});n["default"].use(et.a),n["default"].use(v["a"]);var ot=[{path:"/",name:"Home",component:Z,meta:{login:!1,title:"首頁"}},{path:"/postcase",name:"Postcase",component:function(){return a.e("post").then(a.bind(null,"25a8"))},meta:{title:"我要提案",login:!0}},{path:"/getcase",name:"Getcase",component:function(){return a.e("get").then(a.bind(null,"6f96"))},meta:{title:"我要接案",login:!0}},{path:"/contact",name:"Contact",component:function(){return a.e("contact").then(a.bind(null,"b8fa"))},meta:{title:"聯繫我們",login:!0}},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))},meta:{title:"個人資訊",login:!0}},{path:"/login",name:"Login",component:function(){return a.e("login").then(a.bind(null,"a55b"))},meta:{login:!1,title:"登入"}},{path:"/reg",name:"Reg",component:function(){return a.e("reg").then(a.bind(null,"b8b8"))},meta:{login:!1,title:"註冊"}},{path:"/back",name:"Back",component:function(){return a.e("back").then(a.bind(null,"d8ee"))},meta:{title:"管理員後台",login:!1}},{path:"/admin",name:"Admin",component:function(){return a.e("admin").then(a.bind(null,"3530"))},meta:{title:"管理員後台",login:!1}},{path:"/createadmin",name:"Createadmin",component:function(){return a.e("createadmin").then(a.bind(null,"326c"))},meta:{title:"管理員後台",login:!1}},{path:"/question",name:"Question",component:function(){return a.e("createadmin").then(a.bind(null,"e254"))},meta:{title:"常見問題",login:!1}},{path:"/coopstore",name:"Coopstore",component:function(){return a.e("coopstore").then(a.bind(null,"fe59"))},meta:{title:"合作廠商",login:!1}}],rt=new v["a"]({routes:ot});rt.afterEach((function(t,e){document.title=t.meta.title})),rt.beforeEach((function(t,e,a){t.meta.login&&!st.state.user?(i.a.fire({title:"請登入會員或註冊帳號",timer:1e3,showConfirmButton:!1}),a("/login")):a()}));var it=rt,ct=a("5f5b"),lt=a("b1e0"),ut=(a("f9e3"),a("2dd8"),a("5c96")),ft=a.n(ut),dt=(a("0fae"),a("bc3a")),pt=a.n(dt),mt=a("a7fe"),ht=a.n(mt),vt=a("ecee"),gt=a("ad3d"),bt=a("c074"),Ct=a("f2d1"),_t=a("b702"),wt=a("f0eb");n["default"].use(ft.a),n["default"].use(wt["default"]),vt["c"].add(bt["d"],bt["c"],bt["e"],bt["f"],Ct["e"],Ct["a"],Ct["b"],_t["b"],bt["a"],bt["b"],_t["a"],Ct["f"],Ct["d"],Ct["c"],Ct["g"]),n["default"].component("font-awesome-icon",gt["a"]),n["default"].config.productionTip=!1,n["default"].use(ct["a"]),n["default"].use(lt["a"]),pt.a.defaults.withCredentials=!0,n["default"].use(ht.a,pt.a),new n["default"]({router:it,store:st,render:function(t){return t(m)}}).$mount("#app")},6005:function(t,e,a){t.exports=a.p+"img/story.236cc28c.png"},"64df":function(t,e,a){t.exports=a.p+"img/people1.05a20d85.jpg"},cb78:function(t,e,a){t.exports=a.p+"img/hello.0e271460.gif"},f610:function(t,e,a){t.exports=a.p+"img/people3.4f35dc61.jpg"},fd2d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"footer"}},[a("div",{attrs:{id:"footernav"}},[a("ul",{staticClass:"nav justify-content-center"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("router-link",{attrs:{to:"/question"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("常見問題 ")],1)],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("加入我們 ")],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("router-link",{attrs:{to:"/coopstore"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("合作廠商 ")],1)],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("router-link",{attrs:{to:"/contact"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v(" 意見反饋 ")],1)],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v("我要贊助 ")],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link"},[a("router-link",{attrs:{to:"/back"}},[a("font-awesome-icon",{attrs:{icon:["fas","user-friends"]}}),t._v(" 登入後台 ")],1)],1)])])]),a("div",{staticClass:"container",attrs:{id:"footercontact"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 text-center"},[a("h5",[t._v("下載APP")]),a("a",{attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"icon",attrs:{icon:["fab","apple"]}})],1),a("br"),a("a",{attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"icon",attrs:{icon:["fab","android"]}})],1)]),a("br"),a("br"),a("div",{staticClass:"col-12  text-center"},[a("h5",[t._v("在這裡可以找到我們")]),a("div",{staticClass:"findus"},[a("ul",{staticClass:"nav justify-content-center"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["far","thumbs-up"]}})],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["fab","instagram"]}})],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["fab","github-alt"]}})],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["far","handshake"]}})],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["fas","envelope"]}})],1)]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"}},[a("font-awesome-icon",{staticClass:"footericon",attrs:{icon:["fab","youtube"]}})],1)])])])])])]),a("div",{staticClass:"text-center",attrs:{id:"copyright"}},[t._v(" ©momo chi 2020/08 ")])])},s=[],o=a("2877"),r={},i=Object(o["a"])(r,n,s,!1,null,null,null);e["a"]=i.exports},fe75:function(t,e,a){}});
//# sourceMappingURL=app.62157d89.js.map