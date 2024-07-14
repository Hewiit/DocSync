(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27d9fcca"],{"452c":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"main-container"},[o("el-card",{attrs:{"body-style":{padding:"0"}},scopedSlots:t._u([{key:"header",fn:function(){return[o("el-link",{attrs:{underline:!1}},[t._v("Article Title")])]},proxy:!0}])},[o("el-input",{staticClass:"title-input",attrs:{placeholder:"Please enter the article title"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),o("el-card",{staticClass:"margin-top-xs",attrs:{"body-style":{padding:"0"}},scopedSlots:t._u([{key:"header",fn:function(){return[o("div",{staticClass:"flex"},[o("el-link",{attrs:{underline:!1}},[t._v("Article Content")]),o("div",{staticClass:"flex-sub"}),o("el-button",{staticStyle:{"margin-inline":"10px"},attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.back()}}},[t._v("Exit Editing ")]),o("el-popover",{attrs:{placement:"top",width:"600"},model:{value:t.comment_visible,callback:function(e){t.comment_visible=e},expression:"comment_visible"}},[o("p",[t._v("Add Comment")]),o("el-input",{staticStyle:{width:"80%",margin:"auto"},attrs:{placeholder:"Enter comment"},model:{value:t.form_addComment.comment_content,callback:function(e){t.$set(t.form_addComment,"comment_content",e)},expression:"form_addComment.comment_content"}}),o("div",{staticStyle:{"text-align":"left",margin:"0"}},[o("el-button",{staticStyle:{"margin-top":"10px"},attrs:{size:"mini"},on:{click:function(e){t.addComment(),t.form_addComment.comment_content=null,t.comment_visible=!1}}},[t._v("Confirm")])],1),o("el-table",{attrs:{data:t.commentList,height:"400"}},[o("el-table-column",{attrs:{width:"120",property:"username",label:"Name"}}),o("el-table-column",{attrs:{width:"120",property:"time",label:"Time"}}),o("el-table-column",{attrs:{width:"300",property:"content",label:"Comment"}})],1),o("el-button",{staticStyle:{"margin-inline":"10px"},attrs:{slot:"reference",size:"mini",icon:"el-icon-plus"},slot:"reference"},[t._v("Comment ")])],1),o("el-popover",{attrs:{placement:"top",width:"400"},model:{value:t.invite_visible,callback:function(e){t.invite_visible=e},expression:"invite_visible"}},[o("p",[t._v("Add Collaborators by ID")]),o("el-input",{staticStyle:{width:"80%",margin:"auto"},attrs:{placeholder:"Enter user ID"},model:{value:t.form_invite.accept_id,callback:function(e){t.$set(t.form_invite,"accept_id",e)},expression:"form_invite.accept_id"}}),o("div",{staticStyle:{"text-align":"left",margin:"0"}},[o("el-button",{staticStyle:{"margin-top":"10px"},attrs:{size:"mini"},on:{click:function(e){t.addCooperator(),t.form_invite.accept_id=null,t.invite_visible=!1}}},[t._v("Confirm")])],1),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.cooperatorList,height:"400"}},[o("el-table-column",{attrs:{width:"60",property:"id",label:"ID"}}),o("el-table-column",{attrs:{width:"140",property:"username",label:"Name"}}),o("el-table-column",{attrs:{align:"center",label:"Action",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{size:"mini",type:"danger",underline:!1,"text-align":"left",icon:"el-icon-delete"},on:{click:function(o){return t.deleteCooperator(e.row)}}},[t._v("End Collaboration")])]}}])})],1),t.isShow?o("el-button",{staticStyle:{"margin-inline":"10px"},attrs:{slot:"reference",size:"mini",icon:"el-icon-plus"},slot:"reference"},[t._v("Collaborate ")]):t._e()],1),o("el-button",{attrs:{size:"mini"},on:{click:t.Save}},[t._v("Save")]),o("el-button",{attrs:{size:"mini",underline:!1},on:{click:t.Like}},[t._v("Favorite")]),o("el-button",{attrs:{type:"warning",size:"mini"},on:{click:t.share}},[t._v("Share")])],1)]},proxy:!0}])},[o("RichTextEditor",{ref:"richTextEditor",attrs:{height:600},model:{value:t.editor,callback:function(e){t.editor=e},expression:"editor"}})],1),t.htmlContent?o("div",{staticClass:"margin-top padding preview-content",domProps:{innerHTML:t._s(t.htmlContent)}}):t._e(),t.jsonContent?o("div",{staticClass:"margin-top padding preview-content"},[t._v(" "+t._s(t.jsonContent)+" ")]):t._e()],1)},s=[],r=(o("fb6a"),o("a9e3"),o("74ca")),i=o("0f9a"),n=o("4328"),l=o.n(n),m=o("8159"),d={name:"RichText",components:{RichTextEditor:r["default"]},data:function(){return{imgUrl:"",dialogVisible_share:!1,form:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id"),word_content:""},form1:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id"),word_name:""},form2:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id"),word_content:""},form3:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id")},form4:{word_id:Number(localStorage.getItem("word_id")),word_name:localStorage.getItem("word_name")},form_invite:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),accept_id:null,word_id:localStorage.getItem("word_id")},form_getCooperatorList:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id")},form_getCommentList:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id")},form_addComment:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id"),comment_content:""},form_deleteCooperator:{token:i["getters"].getToken(i["state"]),user_id:i["getters"].getUserId(i["state"]),username:i["getters"].getUserName(i["state"]),word_id:localStorage.getItem("word_id"),cooperation_id:0},isShow:!0,invite_visible:!1,comment_visible:!1,title:localStorage.getItem("word_name"),htmlContent:"",jsonContent:"",comment:"",ID:"",cooperatorList:[],commentList:[],loading:!1,commentData:[{name:"ABC",time:"2024-05-11",comment:"Test"}]}},created:function(){this.getCooperatorList(),this.getCommentList(),"true"===localStorage.getItem("shareFlag")&&"false"===localStorage.getItem("addCooper")&&(this.isShow=!1)},mounted:function(){m["a"].changeDevice("mobile"),m["a"].toggleCollapse(!0)},beforeDestroy:function(){this.exitEdit()},destroyed:function(){m["a"].changeDevice("pc"),m["a"].toggleCollapse(!1)},methods:{share:function(){var t=this;this.$axios.post("/worddocx/share",l.a.stringify(this.form4)).then((function(e){0===e.data.result?(alert("Your share link is http://49.235.148.137/#/share"+e.data.x),localStorage.setItem("refresh","1")):t.$message.error(e.data.message)}))},Like:function(){var t=this;this.$axios.post("/worddocx/user_collect_word",l.a.stringify(this.form3)).then((function(e){4===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message)}))},back:function(){m["a"].toTableLatest&&m["a"].toTableLatest()},deleteCooperator:function(t){var e=this;this.form_deleteCooperator.cooperation_id=t.id,this.$axios.post("/team/out_cooperate",l.a.stringify(this.form_deleteCooperator)).then((function(t){4===t.data.result?(e.getCooperatorList(),e.$message.success(t.data.message)):e.$message.error(t.data.message)}))},addComment:function(){var t=this;this.$axios.post("/worddocx/user_comment_word",l.a.stringify(this.form_addComment)).then((function(e){3===e.data.result?(t.getCommentList(),t.$message.success(e.data.message)):t.$message.error(e.data.message)}))},getCooperatorList:function(){var t=this;this.loading=!0,this.cooperatorList=[],this.$axios.post("/team/get_cooperationer_list",l.a.stringify(this.form_getCooperatorList)).then((function(e){if(4===e.data.result)for(var o=0;o<e.data.cooperation_list.length;o++){var a={id:0,username:"",email:""};a.id=e.data.cooperation_list[o].id,a.username=e.data.cooperation_list[o].username,a.email=e.data.cooperation_list[o].email,t.cooperatorList.push(a)}t.loading=!1}))},getCommentList:function(){var t=this;this.loading=!0,this.commentList=[],this.$axios.post("/worddocx/user_get_comment_list",l.a.stringify(this.form_getCommentList)).then((function(e){if(4===e.data.result)for(var o=0;o<e.data.word_comment_list.length;o++){var a={id:0,username:"",time:"",content:""};a.id=e.data.word_comment_list[o].comment_id,a.username=e.data.word_comment_list[o].comment_username,a.time=e.data.word_comment_list[o].comment_time,a.content=e.data.word_comment_list[o].comment_content,t.commentList.push(a)}t.loading=!1}))},addCooperator:function(){var t=this;this.$axios.post("/team/send_cooperate_inviter",l.a.stringify(this.form_invite)).then((function(e){5===e.data.result?(t.getCooperatorList(),t.$message.success(e.data.message)):t.$message.error(e.data.message)}))},Save:function(){var t=this;this.form2.word_content=this.$refs.richTextEditor.getJsonContent().slice(7,-1),"true"===localStorage.getItem("shareFlag")?(this.$axios.post("/worddocx/user_save_cooperation_word",l.a.stringify(this.form2)).then((function(e){4===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message)})),localStorage.setItem("shareFlag","false")):(this.$axios.post("/worddocx/user_save_edit_word",l.a.stringify(this.form2)).then((function(e){3===e.data.result?t.$message.success(e.data.message):t.$message.error(e.data.message)})),this.form1.word_name=this.title,this.$axios.post("/worddocx/user_rename_word",l.a.stringify(this.form1)))},exitEdit:function(){var t=this;this.form.word_content=this.$refs.richTextEditor.getJsonContent().slice(7,-1),"true"===localStorage.getItem("shareFlag")?(this.$axios.post("/worddocx/user_out_edit_cooperation_word",l.a.stringify(this.form)).then((function(e){4===e.data.result?(t.$message.success(e.data.message),localStorage.setItem("enable","true"),localStorage.setItem("shareFlag","false")):t.$message.error(e.data.message)})),localStorage.setItem("shareFlag","false")):(this.$axios.post("/worddocx/user_out_edit_word",l.a.stringify(this.form)).then((function(e){3===e.data.result?(t.$message.success(e.data.message),localStorage.setItem("enable","true")):t.$message.error(e.data.message)})),this.form1.word_name=this.title,this.$axios.post("/worddocx/user_rename_word",l.a.stringify(this.form1)))},getHtmlContent:function(){this.htmlContent=this.$refs.richTextEditor.getHtmlContent()},getJsonContent:function(){console.log(localStorage.getItem("flag")),console.log(JSON.parse(localStorage.getItem("user_word_content"))),this.jsonContent=this.$refs.richTextEditor.getJsonContent()}}},c=d,g=(o("c201"),o("2877")),u=Object(g["a"])(c,a,s,!1,null,"2bc0b6d9",null);e["default"]=u.exports},c201:function(t,e,o){"use strict";o("e768")},e768:function(t,e,o){}}]);
