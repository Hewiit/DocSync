(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22453d"],{e051:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-container"},[a("el-card",{staticStyle:{height:"100%"},attrs:{"body-style":{padding:"10px"}},scopedSlots:t._u([{key:"header",fn:function(){return[a("el-page-header",{attrs:{content:"Parameters passed from the previous page"},on:{back:t.goBack}})]},proxy:!0}])},[a("div",{staticClass:"padding text-lg"},[t._v(" Parameters passed via query: ")]),a("div",{staticClass:"padding text-lg"},[t._v(" "+t._s(t.queryInfo)+" ")]),a("div",{staticClass:"padding text-lg"},[t._v(" Parameters passed via params: ")]),a("div",{staticClass:"padding text-lg"},[t._v(" "+t._s(t.paramInfo)+" ")])])],1)},r=[],n={name:"NextPageInfo",computed:{queryInfo:function(){return this.$route.query?JSON.stringify(this.$route.query):""},paramInfo:function(){return this.$route.params?JSON.stringify(this.$route.params):""}},methods:{goBack:function(){var t=this;this.$store.dispatch("router/removeRoute",this.$route).then((function(e){t.$router.go(-1)}))}}},i=n,o=a("2877"),u=Object(o["a"])(i,s,r,!1,null,"21ae2c28",null);e["default"]=u.exports}}]);