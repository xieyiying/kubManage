webpackJsonp([7],{PQ5W:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("FxR9"),n=a("R2SV"),i=a("wWxp"),c={name:"productManage",data:function(){var e=this;return{tableObject:{data:[],column:l.g,buttons:[{text:"编辑",callback:function(t,a){e.$router.push({path:"/editProductMsg",query:{id:a.id,title:"编辑"}})}},{text:"删除",type:"danger",callback:function(t,a){e.delDialogShow=!0,e.delId=a.id,e.delflag="single"}}]},totalPage:1,currentPage:1,delDialogShow:!1,delId:"",multipSelectId:"",delflag:"single"}},methods:{getData:function(e){var t=this;i.q.getListData({pageNo:e,pageSize:10}).then(function(e){e.success&&(t.tableObject.data=e.body.list,t.totalPage=e.body.count)})},handleCurrentChange:function(e){this.currentPage=e,this.getData(this.currentPage)},handleAddMessage:function(){this.$router.push({path:"/editProductMsg",query:{title:"新增"}})},selectionChange:function(e){this.multipSelectId=e},handleDelAll:function(){this.delflag="multiple",this.delDialogShow=!0},handleDelete:function(){var e=this;Object(n.a)(this.delflag,i.q.deleteData,{id:this.delId},i.q.batchDeleteData,{ids:this.multipSelectId}).then(function(t){t.success&&(e.delDialogShow=!1,e.getData(e.currentPage))})},closeDialog:function(){this.delDialogShow=!1}},created:function(){this.getData(this.currentPage)},activated:function(){this.getData(this.currentPage)}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"test"},[a("c-breadcrumb",{attrs:{tableTitle:"产品管理"}}),e._v(" "),a("div",{staticClass:"container"},[a("c-search",{on:{delAll:e.handleDelAll,addMessage:e.handleAddMessage}}),e._v(" "),a("c-table",{attrs:{tableObject:e.tableObject},on:{selectionChange:e.selectionChange}}),e._v(" "),a("c-pagination",{attrs:{totalPage:e.totalPage},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("c-dialog",{attrs:{title:"删除",show:e.delDialogShow},on:{"update:show":function(t){e.delDialogShow=t},confirm:e.handleDelete,closeDialog:e.closeDialog}})],1)},staticRenderFns:[]},s=a("VU/8")(c,o,!1,null,null,null);t.default=s.exports}});