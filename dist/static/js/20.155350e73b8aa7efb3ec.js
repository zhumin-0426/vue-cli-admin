webpackJsonp([20],{mjy0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("O2NY"),s=a.n(r),i={data:function(){return{ruleForm:{cardName:"",startTime:"",endTime:"",servicePhone:""}}},created:function(){this.editorCardData()},methods:{editorCardData:function(){var e=this,t=new URLSearchParams;t.append("ids",this.$route.query.id),this.$http.post(this.$api.cardDel.cardDel,t,!0).then(function(t){console.log("卡劵详细",t),"success"==t.data.state&&(e.ruleForm.cardName=t.data.getCardRollVO.cardName,e.ruleForm.startTime=t.data.getCardRollVO.startingTime,e.ruleForm.endTime=t.data.getCardRollVO.endTime,e.ruleForm.servicePhone=t.data.getCardRollVO.customerServicePhone)})},changeCardData:function(){var e=this,t=new URLSearchParams;t.append("uid",localStorage.getItem("uid")),t.append("id",this.$route.query.id),t.append("endTime",this.moment(this.ruleForm.endTime).format("YYYY-MM-DD HH:mm:ss")),t.append("customerServicePhone",this.ruleForm.servicePhone),this.$http.post(this.$api.changeCard.changeCard,t,!0).then(function(t){"success"==t.data.state&&(s.a.errPrompt(e.$message({message:"卡劵编辑成功！",type:"success"})),e.$router.push({path:"/act/card"})),console.log("修改卡劵",t)})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"editorCard"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"main"},[a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),e._v(" "),a("div",{staticClass:"txt"},[e._v("编辑卡劵")])])]),e._v(" "),a("el-form",{staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"250px"}},[a("el-form-item",{attrs:{label:"卡劵名称"}},[a("el-input",{attrs:{disabled:"",placeholder:""},model:{value:e.ruleForm.cardName,callback:function(t){e.$set(e.ruleForm,"cardName",t)},expression:"ruleForm.cardName"}})],1),e._v(" "),a("div",{staticClass:"startTime"},[a("el-form-item",{attrs:{label:"启用时间"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime",placeholder:"选择日期时间"},model:{value:e.ruleForm.startTime,callback:function(t){e.$set(e.ruleForm,"startTime",t)},expression:"ruleForm.startTime"}})],1)],1),e._v(" "),a("div",{staticClass:"endTime"},[a("el-form-item",{attrs:{label:"终止时间",required:""}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.ruleForm.endTime,callback:function(t){e.$set(e.ruleForm,"endTime",t)},expression:"ruleForm.endTime"}})],1)],1),e._v(" "),a("div",{staticClass:"prompt"},[e._v("修改后的结束时间不得小于原结束时间")]),e._v(" "),a("el-form-item",{attrs:{label:"客服电话",required:""}},[a("el-input",{model:{value:e.ruleForm.servicePhone,callback:function(t){e.$set(e.ruleForm,"servicePhone",t)},expression:"ruleForm.servicePhone"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.changeCardData}},[e._v("提交")])],1)],1)],1)])],1)},staticRenderFns:[]};var o=a("C7Lr")(i,l,!1,function(e){a("sCUO")},"data-v-70f51efb",null);t.default=o.exports},sCUO:function(e,t){}});
//# sourceMappingURL=20.155350e73b8aa7efb3ec.js.map