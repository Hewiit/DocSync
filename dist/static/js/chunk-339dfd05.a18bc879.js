(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-339dfd05"],{"0a5e":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var o=a("5530"),i=a("3c24"),n={setTotalSize:function(e){this.pageModel.totalSize=e}},r={mixins:[i["d"]],data:function(){return{pageModel:{currentPage:1,pageSize:10,totalSize:0}}},methods:{pageSizeChanged:function(e){this.pageModel.pageSize=e,this.pageModel.currentPage=1,this.publishEvent("pageChanged",this.pageModel)},currentChanged:function(e){this.pageModel.currentPage=e,this.publishEvent("pageChanged",this.pageModel)},withPageInfoData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(o["a"])(Object(o["a"])({},e),{},{page:this.pageModel.currentPage,pageSize:this.pageModel.pageSize})}},created:function(){this.registeEvent(n)}},s={pageChanged:function(){this.doRefresh()}};t["b"]={data:function(){return{dataList:[],tableConfig:{stripe:"dark"!==this.$layoutStore.state.theme,border:"dark"!==this.$layoutStore.state.theme,size:"small",headerCellStyle:"dark"===this.$layoutStore.state.theme?{color:"#ffffff"}:{backgroundColor:"rgb(255, 255, 255)",color:"#333333"},height:"100%"},tableLoading:!1}},mounted:function(){var e=this;this.$on("tableHeightChanged",(function(t){e.tableConfig.height=e.$refs.tableBody?e.$refs.tableBody.$el.offsetHeight-10-2:"100%",e.$refs.table&&e.$refs.table.doLayout()}))},methods:{handleSuccess:function(e){var t=e.data,a=void 0===t?[]:t,o=e.totalSize,i=void 0===o?10:o;this.publishEvent("setTotalSize",i),this.dataList=a}},created:function(){this.registeEvent(s)}}},"3c24":function(e,t,a){"use strict";a.d(t,"c",(function(){return f})),a.d(t,"b",(function(){return h})),a.d(t,"e",(function(){return p})),a.d(t,"a",(function(){return g})),a.d(t,"d",(function(){return b}));a("4160"),a("13d5"),a("45fc"),a("b0c0"),a("d3b7"),a("159b"),a("5530");function o(e){var t=e.url,a=void 0===t?"":t,o=e.method,i=void 0===o?"GET":o;if(!a)throw new Error("url must be not null");if("GET"!==i.toUpperCase()&&"POST"!==i.toUpperCase())throw new Error('Illegal request method, Methods can only be "GET" or "POST"');return!0}function i(e){var t=e.url,a=void 0===t?"":t,i=e.method,n=void 0===i?"GET":i,r=e.data,s=e.beforeRequest,l=e.afterRequest;if(o({url:a,method:n}))return this["".concat(n.toLowerCase())]({url:a,data:r,beforeRequest:s,afterRequest:l});throw new Error("params check failed")}function n(e){var t=e.url,a=void 0===t?"":t,i=e.method,n=void 0===i?"GET":i,r=e.data,s=e.beforeRequest,l=e.afterRequest;if(o({url:a,method:n}))return this["".concat(n.toLowerCase())]({url:a,data:r,beforeRequest:s,afterRequest:l});throw new Error("params check failed")}function r(e){var t=e.url,a=void 0===t?"":t,i=e.method,n=void 0===i?"GET":i,r=e.data,s=e.beforeRequest,l=e.afterRequest;if(o({url:a,method:n}))return this["".concat(n.toLowerCase())]({url:a,data:r,beforeRequest:s,afterRequest:l});throw new Error("params check failed")}function s(e){var t=e.url,a=void 0===t?"":t,i=e.method,n=void 0===i?"GET":i,r=e.data,s=e.beforeRequest,l=e.afterRequest;if(o({url:a,method:n}))return this["".concat(n.toLowerCase())]({url:a,data:r,beforeRequest:s,afterRequest:l});throw new Error("params check failed")}var l=a("fa7d");function d(e,t){e.onResult&&e.onResult(t),e.afterAction&&e.afterAction(t)}function m(e,t){e.onError&&e.onError(t),e.afterAction&&e.afterAction(t)}function u(e){return Object(l["c"])(e.params)?e.params():!!Object(l["d"])(e.params)&&e.params}var c={data:function(){return{selectedItems:[]}},methods:{handleSelectionChange:function(e){this.selectedItems=e}}},f={data:function(){return{getDataModel:{init:!1}}},methods:{initGetData:function(e){var t=e.url,a=e.method,o=e.params,i=e.beforeAction,n=e.onResult,r=e.onError,s=e.afterAction;if(!t)throw new Error("please init url");return this.getDataModel.url=t,this.getDataModel.method=a,this.getDataModel.onResult=n,this.getDataModel.onError=r,this.getDataModel.params=o||{},this.getDataModel.beforeAction=i,this.getDataModel.afterAction=s,this.getDataModel.init=!0,Promise.resolve(this.getDataModel.init)},getData:function(){var e=this,t=u(this.getDataModel);if(!t)throw new Error("please set get param");this.getDataModel.beforeAction&&this.getDataModel.beforeAction(),i.call(this,{url:this.getDataModel.url,method:this.getDataModel.method||"post",data:t}).then((function(t){d.call(e,e.getDataModel,t)})).catch((function(t){m.call(e,e.getDataModel,t)}))}}},h={mixins:[c],data:function(){return{deleteItemsModel:{init:!1}}},methods:{initDeleteItem:function(e){var t=e.url,a=e.method,o=e.params,i=e.multiParams,n=e.onDeleteItem,r=e.onDeleteMultiItem,s=e.beforeAction,l=e.onResult,d=e.onError,m=e.afterAction;if(!t)throw new Error("please init url");this.deleteItemsModel.url=t,this.deleteItemsModel.method=a,this.deleteItemsModel.onResult=l,this.deleteItemsModel.onError=d,this.deleteItemsModel.beforeAction=s,this.deleteItemsModel.afterAction=m,this.deleteItemsModel.params=o,this.deleteItemsModel.multiParams=i,this.deleteItemsModel.onDeleteItem=n,this.deleteItemsModel.onDeleteMultiItem=r,this.deleteItemsModel.init=!0},onDeleteItem:function(e){if(!this.deleteItemsModel.onDeleteItem)throw new Error("please init onDeleteItem");if(!(this.deleteItemsModel.onDeleteItem instanceof Function))throw new Error("onDeleteItem must be Function");this.deleteItemsModel.onDeleteItem(e)},onDeleteMultiItem:function(){if(!this.deleteItemsModel.onDeleteMultiItem)throw new Error("please init onDeleteMultiItem");if(!(this.deleteItemsModel.onDeleteMultiItem instanceof Function))throw new Error("onDeleteMultiItem must be Function");this.deleteItemsModel.onDeleteMultiItem()},doDeleteItem:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"single";if(!this.deleteItemsModel.init)throw new Error("please init deleteItemsModel first");var a={};if("single"===t)a=u(this.deleteItemsModel);else{if("multi"!==t)throw new Error("only support delete single or multi");if(!this.deleteItemsModel.multiParams||!Object(l["c"])(this.deleteItemsModel.multiParams))throw new Error("please set multi params and `multiParams` must be Function type");a=this.deleteItemsModel.multiParams(this.selectedItems)}if(!a)throw new Error("please set delete param");r.call(this,{url:this.deleteItemsModel.url,method:this.deleteItemsModel.method||"post",data:a}).then((function(t){d.call(e,e.deleteItemsModel,t)})).catch((function(t){m.call(e,e.deleteItemsModel,t)}))}}},p={data:function(){return{updateItemModel:{init:!1}}},methods:{initUpdateItem:function(e){var t=e.url,a=e.method,o=e.params,i=e.onUpdateItem,n=e.beforeAction,r=e.onResult,s=e.onError,l=e.afterAction;if(!t)throw new Error("please init url");this.updateItemModel.url=t,this.updateItemModel.method=a,this.updateItemModel.params=o,this.updateItemModel.onResult=r,this.updateItemModel.onError=s,this.updateItemModel.beforeAction=n,this.updateItemModel.afterAction=l,this.updateItemModel.onUpdateItem=i,this.updateItemModel.init=!0},onUpdateItem:function(e){if(!this.updateItemModel.onUpdateItem)throw new Error("please init onUpdateItem");if(!(this.updateItemModel.onUpdateItem instanceof Function))throw new Error("onUpdateItem must be Function");this.updateItemModel.onUpdateItem(e)},doUpdateItem:function(){var e=this;if(!this.updateItemModel.init)throw new Error("please init updateItemModel first");var t=u(this.updateItemModel);if(!t)throw new Error("please set update param");s.call(this,{url:this.updateItemModel.url,method:this.updateItemModel.method||"post",data:t}).then((function(t){d.call(e,e.updateItemModel,t)})).catch((function(t){m.call(e,e.updateItemModel,t)}))}}},g={data:function(){return{addItemModel:{init:!1}}},methods:{initAddItem:function(e){var t=e.url,a=e.method,o=e.params,i=e.onAddItem,n=e.beforeAction,r=e.onResult,s=e.onError,l=e.afterAction;if(!t)throw new Error("please init url");this.addItemModel.url=t,this.addItemModel.method=a,this.addItemModel.params=o,this.addItemModel.onResult=r,this.addItemModel.onError=s,this.addItemModel.beforeAction=n,this.addItemModel.afterAction=l,this.addItemModel.onAddItem=i,this.addItemModel.init=!0},onAddItem:function(){if(!this.addItemModel.onAddItem)throw new Error("please init onAddItem");if(!(this.addItemModel.onAddItem instanceof Function))throw new Error("onAddItem must be Function");this.addItemModel.onAddItem()},doAddItem:function(){var e=this;if(!this.addItemModel.init)throw new Error("please init addItemModel first");var t=u(this.addItemModel);if(!t)throw new Error("please set add param");n.call(this,{url:this.addItemModel.url,method:this.addItemModel.method||"post",data:t}).then((function(t){d.call(e,e.addItemModel,t)})).catch((function(t){m.call(e,e.addItemModel,t)}))}}},b={methods:{doRefresh:function(){if(this.isInited("likeSearchModel"))this.hasSearchParams()?this.doSearch():this.getData();else{if(!this.isInited("getDataModel"))throw new Error("can`t exec doRefresh function");this.getData()}}}}},a991:function(e,t,a){"use strict";a("a4d3"),a("e01a"),a("d28b"),a("d3b7"),a("3ca3"),a("ddb0");function o(e){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}var i={left:0,right:0,top:0,bottom:0},n={inserted:function(e,t,a){var o=e.querySelector(".el-dialog__header");o.style.cursor="move";var n=e.querySelector(".el-dialog"),r=0,s=0,l="";o.addEventListener("mousedown",(function(e){e.preventDefault(),l="down",i.left=-(document.documentElement.clientWidth-n.clientWidth)/2,i.right=Math.abs(i.left);var t=parseInt(n.style.marginTop)/100;i.top=-document.documentElement.clientHeight*t,i.bottom=document.documentElement.clientHeight*(1-t)-n.clientHeight,r=e.clientX-parseInt(n.style.left||0),s=e.clientY-parseInt(n.style.top||0);var a=function(e){if("down"===l){var t=e.clientX,a=e.clientY,o=t-r,d=a-s;o<=i.left&&(o=i.left),o>=i.right&&(o=i.right),d<=i.top&&(d=i.top),d>=i.bottom&&(d=i.bottom),n.style.left=o+"px",n.style.top=d+"px"}},o=function e(){l="up",document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",e)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",o)}))}},r=function(e){e.directive("draggable",n)};n.install=r,void 0!==("undefined"===typeof window?"undefined":o(window))&&Window.vue&&r(window.Vue);t["a"]=n},ef24:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-container"},[a("TableHeader",{attrs:{"can-collapsed":!1}},[a("template",{slot:"right"},[a("el-popover",{attrs:{placement:"top",width:"350"},model:{value:e.visible_applyTeam,callback:function(t){e.visible_applyTeam=t},expression:"visible_applyTeam"}},[a("p",[e._v("Apply to Join Team by ID")]),a("el-input",{staticStyle:{width:"80%",margin:"auto"},attrs:{placeholder:"Enter Team ID"},model:{value:e.form_applyTeam.team_id,callback:function(t){e.$set(e.form_applyTeam,"team_id",t)},expression:"form_applyTeam.team_id"}}),a("div",{staticStyle:{"text-align":"left",margin:"0"}},[a("el-button",{staticStyle:{"margin-top":"10px"},attrs:{size:"mini"},on:{click:function(t){e.applyTeam(),e.visible_applyTeam=!1,e.form_applyTeam.team_id=null}}},[e._v("Confirm")])],1),a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{slot:"reference",size:"mini",icon:"el-icon-plus"},slot:"reference"},[e._v("Apply")])],1),a("el-button",{attrs:{size:"mini",icon:"el-icon-plus"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("Create Team ")]),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:e.deleteMultiItem}},[e._v("Dismiss/Leave ")])],1)],2),a("el-dialog",{attrs:{title:"Create Team",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form2}},[a("el-form-item",{attrs:{label:"Team Name","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form2.team_name,callback:function(t){e.$set(e.form2,"team_name",t)},expression:"form2.team_name"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1,e.form2.team_name=null}}},[e._v("Cancel")]),a("el-button",{on:{click:e.addTeam}},[e._v("Confirm")])],1)],1),a("TableBody",{ref:"tableBody"},[[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"table",attrs:{data:e.groupList,"header-cell-style":e.tableConfig.headerCellStyle,size:e.tableConfig.size,stripe:e.tableConfig.stripe,border:e.tableConfig.border},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"45"}}),a("el-table-column",{attrs:{align:"center",label:"No.",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(t.$index+1)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",label:"Team ID",prop:"id",width:"100"}}),a("el-table-column",{attrs:{align:"center",label:"Team Name",prop:"name"}}),a("el-table-column",{attrs:{align:"center",label:"Created Time",prop:"time",width:"180"}}),a("el-table-column",{attrs:{align:"center",label:"Members",prop:"member_num",width:"80"}}),a("el-table-column",{attrs:{align:"center",label:"Documents",prop:"word_num",width:"80"}}),a("el-table-column",{attrs:{align:"center",label:"Permission",prop:"power",width:"140px"}}),a("el-table-column",{attrs:{align:"center",label:"Operation",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-dialog",{attrs:{title:"Transfer Leader Permission",visible:t.row.dialogVisible},on:{"update:visible":function(a){return e.$set(t.row,"dialogVisible",a)}}},[a("el-form",{attrs:{model:e.form1}},[a("el-form-item",{attrs:{label:"Member ID to Transfer","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form1.member_id,callback:function(t){e.$set(e.form1,"member_id",t)},expression:"form1.member_id"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(a){t.row.dialogVisible=!1,e.form1.member_id=null}}},[e._v("Cancel")]),a("el-button",{on:{click:function(a){e.Leader_change(t.row),t.row.dialogVisible=!1}}},[e._v("Confirm")])],1)],1),a("el-button",{attrs:{underline:!1,size:"small"},on:{click:function(a){return e.toGroupFile(t.row)}}},[e._v("Enter")]),a("el-button",{attrs:{type:"info",underline:!1,size:"small",disabled:"Creator"!=t.row.power},on:{click:function(e){t.row.dialogVisible=!0}}},[e._v("Transfer Leadership")]),"Creator"===t.row.power?a("el-button",{attrs:{type:"danger",underline:!1,size:"small",icon:"el-icon-delete"},on:{click:function(a){return e.deleteItem(t.row)}}},[e._v("Dismiss")]):e._e(),"Creator"!=t.row.power?a("el-button",{attrs:{type:"danger",underline:!1,size:"small",icon:"el-icon-delete"},on:{click:function(a){return e.deleteItem(t.row)}}},[e._v("Leave")]):e._e()]}}])})],1)]],2)],1)},i=[],n=(a("d3b7"),a("25f0"),a("0a5e")),r=a("3c24"),s=a("f385"),l=a("46da"),d=a("a991"),m=a("4328"),u=a.n(m),c=a("0f9a"),f=a("8159"),h={name:"TableGroup",components:{SingleUpload:s["default"],BaseForm:l["default"]},directives:{draggable:d["a"]},mixins:[n["b"],n["a"],r["c"],r["a"],r["b"],r["e"],r["d"]],data:function(){return{visible_applyTeam:!1,form:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"])},form1:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"]),team_id:null,member_id:null},form_applyTeam:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"]),team_id:null},groupList:[],tableLoading:!1,dialogFormVisible:!1,dialogVisible:!1,form2:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"]),team_name:""},form_disbandTeam:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"]),team_id:0},form_quitTeam:{token:c["getters"].getToken(c["state"]),username:c["getters"].getUserName(c["state"]),user_id:c["getters"].getUserId(c["state"]),team_id:0},disbandTeamList:[],formLabelWidth:"120px"}},created:function(){this.Refresh()},methods:{quitTeam:function(e){var t=this;this.form_quitTeam.team_id=e.id,this.$axios.post("/team/quit_team",u.a.stringify(this.form_quitTeam)).then((function(e){5===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message),t.Refresh()}))},applyTeam:function(){var e=this;this.$axios.post("/team/apply_team",u.a.stringify(this.form_applyTeam)).then((function(t){4===t.data.result?e.$message.success(t.data.message):e.$message.error(t.data.message)}))},Leader_change:function(e){var t=this;this.form1.team_id=e.id,console.log(e.id),this.$axios.post("/team/move_team_leader_perm",u.a.stringify(this.form1)).then((function(e){6===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message),t.Refresh()}))},toGroupFile:function(e){localStorage.setItem("team_id",e.id.toString()),f["a"].toGroupFile&&f["a"].toGroupFile()},addTeam:function(){var e=this;this.$axios.post("/team/create_team",u.a.stringify(this.form2)).then((function(t){2===t.data.result?e.$message.success(t.data.message):e.$message.error(t.data.message),e.Refresh(),e.dialogFormVisible=!1,e.form2.team_name=null}))},handleSelectionChange:function(e){this.disbandTeamList=e},deleteItem:function(e){var t=this;"Creator"===e.power?this.$confirm("This action will permanently dissolve the team, do you want to continue?","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then((function(){t.disbandTeam(e)})).catch((function(){t.$message({type:"info",message:"Dissolution canceled"})})):this.$confirm("This action will leave the team, do you want to continue?","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then((function(){t.quitTeam(e)})).catch((function(){t.$message({type:"info",message:"Exit canceled"})}))},deleteMultiItem:function(){var e=this;this.$confirm("This action will permanently dissolve/leave all selected teams, do you want to continue?","Warning",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).then((function(){for(var t=0;t<e.disbandTeamList.length;t++)"Creator"===e.disbandTeamList[t].power?e.disbandTeam(e.disbandTeamList[t]):e.quitTeam(e.disbandTeamList[t]);e.Refresh()})).catch((function(){e.$message({type:"info",message:"Dissolution/exit canceled"})}))},disbandTeam:function(e){var t=this;this.form_disbandTeam.team_id=e.id,this.$axios.post("/team/disband_team",u.a.stringify(this.form_disbandTeam)).then((function(e){4===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message),t.Refresh()}))},Refresh:function(){var e=this;this.tableLoading=!0,this.groupList=[],this.$axios.post("/team/get_team_list",u.a.stringify(this.form)).then((function(t){if(3===t.data.result)for(var a=0;a<t.data.team_list.length;a++){var o={name:"",time:"",member_num:0,word_num:0,power:"",id:0,dialogVisible:!1};o.name=t.data.team_list[a].team_name,o.time=t.data.team_list[a].create_time,o.member_num=t.data.team_list[a].member_cnt,o.word_num=t.data.team_list[a].word_cnt,o.id=t.data.team_list[a].team_id,1===t.data.team_list[a].power?o.power="Creator":2===t.data.team_list[a].power?o.power="Admin":3===t.data.team_list[a].power&&(o.power="Visitor");for(var i=0,n=0;n<e.groupList.length;n++)if(e.groupList[n].id===o.id){i=1;break}i||e.groupList.push(o)}else e.$message.error(t.data.message);e.tableLoading=!1}))},onSingleSuccess:function(e){var t=e.res;200!==t.status?this.$errorMsg(t.msg):this.userModel=t.obj},beforeUpload:function(e){var t=e.size;if(t/1024>500)return this.$errorMsg("The uploaded file must not exceed 500K"),!1}}},p=h,g=a("2877"),b=Object(g["a"])(p,o,i,!1,null,"c5a8d4ee",null);t["default"]=b.exports}}]);