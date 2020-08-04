(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["createadmin"],{"326c":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"container",attrs:{id:"createadmin"}},[s("div",[s("h2",[t._v("新增後台帳號"),s("br"),s("br"),s("b-form",{on:{submit:t.submit}},[s("b-form-group",{staticStyle:{"font-size":"20px"},attrs:{label:"帳號","label-for":"input-account",description:"帳號長度為4~20字元",state:t.state("account")}},[s("b-form-input",{attrs:{id:"input-account",type:"text"},model:{value:t.account,callback:function(a){t.account=a},expression:"account"}})],1),s("b-form-group",{staticStyle:{"font-size":"20px"},attrs:{label:"密碼","label-for":"input-password",description:"密碼長度為4~20字元",state:t.state("password")}},[s("b-form-input",{attrs:{id:"input-password",type:"text"},model:{value:t.password,callback:function(a){t.password=a},expression:"password"}})],1),s("b-button",{attrs:{type:"submit",variant:"info"}},[t._v("送出")])],1)],1)]),s("hr")])},o=[],i=s("3d20"),r=s.n(i),n={name:"Admin",data:function(){return{account:"",password:"",block:!1}},methods:{state:function(t){return"account"===t?!(this.account.length<4||this.account.length>20):"password"===t?!(this.password.length<4||this.password.length>20):void 0},submit:function(t){var a=this;t.preventDefault(),this.account.length<4||this.account.length>20?r.a.fire({title:"帳號格式不符",timer:1e3,showConfirmButton:!1}):(this.password.length<4||this.password.length>20)&&r.a.fire({title:"密碼格式不符",timer:1e3,showConfirmButton:!1}),this.axios.post("https://jcaseproject.herokuapp.com//admins",{account:this.account,password:this.password,block:this.block}).then((function(t){var s=t.data;s.success?(r.a.fire({title:"註冊成功",timer:1e3,showConfirmButton:!1}),a.account="",a.password=""):r.a.fire(s.message)})).catch((function(t){r.a.fire(t.response.data.message)}))}}},c=n,l=s("2877"),u=Object(l["a"])(c,e,o,!1,null,null,null);a["default"]=u.exports},e254:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"qa"}},[s("h2",[t._v("常見問題")]),s("div",{staticClass:"q1"},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-1",modifiers:{"collapse-1":!0}}],staticClass:"m-1",attrs:{variant:"info"}},[t._v("網站用了哪些技術？")]),s("b-collapse",{attrs:{id:"collapse-1"}},[s("b-card",[t._v("vue.js / vue-cil / bootstrap-vue / vue-axios / cors / "),s("br"),t._v(" sweetalert2 / axvue-routerios / vuex / 後端 node.js / 資料庫 mongoDB ...等 ")])],1)],1),s("div",{staticClass:"q2"},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-2",modifiers:{"collapse-2":!0}}],staticClass:"m-1",attrs:{variant:"info"}},[t._v("為什麼網站很多BUG？")]),s("b-collapse",{attrs:{id:"collapse-2"}},[s("b-card",[t._v("真的嗎？ 請使用 "),s("a",{attrs:{href:""}},[s("router-link",{attrs:{to:"/contact"}},[t._v("聯繫我們")])],1),t._v(" 提交BUG重現流程，我們將隨機發送小禮物給您，已表感謝。")])],1)],1),s("div",{staticClass:"q3"},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-3",modifiers:{"collapse-3":!0}}],staticClass:"m-1",attrs:{variant:"info"}},[t._v("為什麼提案很久都沒人聯繫？")]),s("b-collapse",{attrs:{id:"collapse-3"}},[s("b-card",[t._v("通常預算是影響最大的部分，可以至 "),s("a",{attrs:{href:""}},[t._v("提案報價")]),t._v(" 參考預算，也可能是技術難度等問題。")])],1)],1),s("div",{staticClass:"q4"},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-4",modifiers:{"collapse-4":!0}}],staticClass:"m-1",attrs:{variant:"info"}},[t._v("帳號為何被封鎖？")]),s("b-collapse",{attrs:{id:"collapse-4"}},[s("b-card",[t._v("上傳違法或廣告等，都有可能造成帳號被封鎖，詳細原因請聯繫管理員。")])],1)],1),s("Footer")],1)},o=[],i=s("fd2d"),r={components:{Footer:i["a"]},data:function(){return{visible:!0}}},n=r,c=s("2877"),l=Object(c["a"])(n,e,o,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=createadmin.249ec891.js.map