webpackJsonp([6],{y9nX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("FxR9"),o=a("R2SV"),i=a("wWxp"),n={name:"userManage",data:function(){var e=this,t=function(e,t,a){t?0==/^\S+$/.test(t)?a(new Error("不能包含空格！")):a():a(new Error("请输入信息！"))};return{tableObject:{data:[],column:l.i,buttons:[{text:"编辑",callback:function(t,a){e.editDialogShow=!0,e.getSingleUser(a.id),e.title="编辑"}},{text:"删除",type:"danger",callback:function(t,a){e.delDialogShow=!0,e.delId=a.id,e.delflag="single"}}]},totalPage:1,currentPage:1,delDialogShow:!1,delId:"",multipSelectId:"",delflag:"single",editDialogShow:!1,title:"",form:{},rules:{name:[{required:!0,validator:t,trigger:"blur"}],password:[{required:!0,validator:t,trigger:"blur"}]}}},methods:{getUserData:function(e){var t=this;Object(i.l)({pageNo:e,pageSize:10}).then(function(e){e.success&&(t.tableObject.data=e.body.list,t.totalPage=e.body.count)})},getSingleUser:function(e){var t=this;Object(i.u)({id:e}).then(function(a){t.$set(t.form,"name",a.body.kubProductInfo.name),t.$set(t.form,"password",a.body.kubProductInfo.password),t.$set(t.form,"id",e)})},handleCurrentChange:function(e){this.currentPage=e,this.getUserData(this.currentPage)},handleAddMessage:function(){this.title="新增",this.editDialogShow=!0},selectionChange:function(e){this.multipSelectId=e},handleDelAll:function(){this.delflag="multiple",this.delDialogShow=!0},handleDelete:function(){var e=this;Object(o.a)(this.delflag,i.h,{id:this.delId},i.d,{ids:this.multipSelectId}).then(function(t){t.success&&(e.delDialogShow=!1,e.getUserData(e.currentPage))})},handleSave:function(){var e=this;Object(i.s)(this.form).then(function(t){Object(o.b)(e.title),t.success&&(e.editDialogShow=!1,e.form={},e.getUserData(e.currentPage))})},closeDialog:function(){this.delDialogShow=!1,this.editDialogShow=!1,this.form={}}},created:function(){this.getUserData(this.currentPage)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"test"},[a("c-breadcrumb",{attrs:{tableTitle:"用户管理"}}),e._v(" "),a("div",{staticClass:"container"},[a("c-search",{on:{delAll:e.handleDelAll,addMessage:e.handleAddMessage}}),e._v(" "),a("c-table",{attrs:{tableObject:e.tableObject},on:{selectionChange:e.selectionChange}}),e._v(" "),a("c-pagination",{attrs:{totalPage:e.totalPage},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("c-dialog",{attrs:{title:"删除",show:e.delDialogShow},on:{"update:show":function(t){e.delDialogShow=t},confirm:e.handleDelete,closeDialog:e.closeDialog}}),e._v(" "),a("c-dialog",{attrs:{title:e.title,show:e.editDialogShow,width:400,callback:e.handleSave,form:e.form,rules:e.rules},on:{"update:show":function(t){e.editDialogShow=t},closeDialog:e.closeDialog}},[a("el-form-item",{attrs:{label:"用户名：",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码：",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1)],1)},staticRenderFns:[]},r=a("VU/8")(n,s,!1,null,null,null);t.default=r.exports}});