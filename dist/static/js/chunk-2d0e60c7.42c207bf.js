(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e60c7"],{"96a5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"请输入内容"},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}}),a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"请选择环境",clearable:""},model:{value:t.listQuery.type,callback:function(e){t.$set(t.listQuery,"type",e)},expression:"listQuery.type"}},t._l(t.envList,(function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name+"("+t.key+")",value:t.key}})})),1),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"}},[t._v(" 搜索 ")]),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v(" 新建 ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.testData,border:"","highlight-current-row":""}},[t._l(t.columns,(function(t,e){return a("el-table-column",{key:e,attrs:{label:t.alias,prop:t.name,align:"center"}})})),a("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(i)}}},[t._v(" 修改 ")]),"deleted"!=i.status?a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(e){return t.delHost(i)}}},[t._v(" 删除 ")]):t._e()]}}])})],2),a("br"),a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"}),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[1,5,10,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.hostTotal},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataFormdataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{attrs:{label:"环境",prop:"group"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"Please select"},model:{value:t.temp.group,callback:function(e){t.$set(t.temp,"group",e)},expression:"temp.group"}},t._l(t.envList,(function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),1)],1),a("el-form-item",{attrs:{label:"主机",prop:"host"}},[a("el-input",{attrs:{placeholder:"请输入主机IP",clearable:""},model:{value:t.temp.instanceip,callback:function(e){t.$set(t.temp,"instanceip",e)},expression:"temp.instanceip"}})],1),a("el-form-item",{attrs:{label:"用户",prop:"user"}},[a("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},model:{value:t.temp.username,callback:function(e){t.$set(t.temp,"username",e)},expression:"temp.username"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"passwd"}},[a("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.temp.password,callback:function(e){t.$set(t.temp,"password",e)},expression:"temp.password"}})],1),a("el-form-item",{attrs:{label:"端口",prop:"port"}},[a("el-input",{attrs:{placeholder:"请输入SSH端口",clearable:""},model:{value:t.temp.port,callback:function(e){t.$set(t.temp,"port",e)},expression:"temp.port"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 取消 ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.postList():t.updateHost()}}},[t._v(" 提交 ")])],1)],1),a("el-dialog",{attrs:{visible:t.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pvData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"key",label:"Channel"}}),a("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v("Confirm")])],1)],1)],1)},s=[],l=(a("08ba"),a("f753"),a("b775"));function n(t){return Object(l["a"])({url:"http://8.140.162.160/ansible/host/v1",method:"get",params:t})}var o=[{key:"dev",display_name:"开发环境"},{key:"test",display_name:"测试环境"},{key:"ontest",display_name:"预生产环境"},{key:"prod",display_name:"生产环境"}],r={data:function(){return{hostTotal:0,currentPage:1,pageSize:5,testData:[],columns:[],tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,psize:10},envList:[],importanceOptions:[1,2,3],calendarTypeOptions:o,showReviewer:!1,temp:{username:"",instanceip:"",group:"",password:"",port:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Add"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],use:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList(),this.getenvList()},methods:{handleSizeChange:function(t){this.pageSize=t,this.getList()},handleCurrentChange:function(t){this.currentPage=t,this.getList()},getenvList:function(){var t=this;this.axios.get("http://8.140.162.160/ansible/envlist/v1").then((function(e){console.log("testenv:",e);var a=e.data.data;a.forEach((function(e){t.envList.push(e)}))}))},getList:function(){var t=this;n(this.listQuery).then((function(e){t.columns=e.columns,t.testData=e.data,t.hostTotal=e.total,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},postList:function(){var t=this;this.axios.post("http://8.140.162.160/ansible/host/v1",this.temp).then((function(e){t.dialogFormVisible=!1,t.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3}),t.getList()})).catch((function(t){console.log(t)}))},delHost:function(t){var e=this;console.log(t);var a=this;a.$confirm("此操作将永久删除该条数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.axios.delete("http://8.140.162.160/ansible/host/v1",{data:t}).then((function(t){console.log(t),a.dialogFormVisible=!1,a.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3}),a.getList()})).catch((function(t){console.log(t)}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},updateHost:function(){var t=this,e=this;console.log(e.temp),e.$confirm("此操作将修改该条数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.axios.put("http://8.140.162.160/ansible/host/v1",e.temp).then((function(t){console.log(t),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3}),e.getList()})).catch((function(t){console.log(t)}))})).catch((function(){t.$message({type:"info",message:"已取消修改"})}))},handleUpdate:function(t){var e=this;console.log(t),this.temp=Object.assign({},t),this.temp.timestamp=new Date,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},resetTemp:function(){this.temp={group:"",username:"",password:"",port:""}},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0}}},c=r,p=a("4ac2"),u=Object(p["a"])(c,i,s,!1,null,null,null);e["default"]=u.exports}}]);