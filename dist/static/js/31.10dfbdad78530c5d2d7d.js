webpackJsonp([31],{SG7z:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("xt+v"),a=s("O2NY"),r=s.n(a),l={components:{Map:s("2iMq").a},data:function(){return{popupAct:!1,page:1,pageSize:"8",tatol:0,tableData:[],file:"",formData:[],picurl:"http://lb3.28888753.cn/imges/",picList:[],types:"1",allCodePic:"",allUserPic:"",userMessage:"",busPositionSuc:"已获取商家定位",busPositionErr:"请点击定位按钮选择商家定位",ruleForm:{userPicurl:"",name:"",phone:"13534363188",busName:"",lon:"",lat:"",busAddress:"",busPhone:"",serviceId:"",codePicurl:""},picBigMirror:!1,picName:"",centerDialogVisible:!1,searchAdr:"",rules:{userPicurl:[{required:!0,message:"请上传头像",trigger:"blur"}],busName:[{required:!0,message:"请设置正确的商家名称",trigger:"blur"}],lat:[{required:!0,message:"请设置正确的商家定位",trigger:"blur"}],busAddress:[{required:!0,message:"请设置正确的商家地址",trigger:"blur"}],busPhone:[{required:!0,message:"请设置正确的商家电话",trigger:"blur"}],codePicurl:[{required:!0,message:"请上传公众号二维码"}]},role:""}},created:function(){var e=this;this.userMsg(),i.a.$on("mapAct",function(t){e.centerDialogVisible=t}),i.a.$on("pos",function(t){e.ruleForm.lon=t.lng,e.ruleForm.lat=t.lat})},methods:{bigPicMirror:function(e){this.picName=e,this.picBigMirror=!this.picBigMirror},targetChange:function(){this.$router.push({path:"/funds/payment/create"})},userMsg:function(){var e=this;this.role=localStorage.getItem("role");var t=new URLSearchParams;t.append("uid",localStorage.getItem("uid")),t.append("upUid",localStorage.getItem("uid")),this.$http.post(this.$api.userMsg.userMsg,t,!0).then(function(t){(t.data.state="success")&&(e.userMessage=t.data.getUsers,e.ruleForm.userPicurl=t.data.getUsers.images,e.ruleForm.name=t.data.getUsers.contactPersonName,e.ruleForm.phone=t.data.getUsers.contactPersonPhone,e.ruleForm.busName=t.data.getUsersCustomerServiceVO.names,e.ruleForm.lon=t.data.getUsersCustomerServiceVO.longitude,e.ruleForm.lat=t.data.getUsersCustomerServiceVO.latitude,e.ruleForm.busAddress=t.data.getUsersCustomerServiceVO.addr,e.ruleForm.busPhone=t.data.getUsersCustomerServiceVO.phones,e.ruleForm.codePicurl=t.data.getUsersCustomerServiceVO.code,e.ruleForm.serviceId=t.data.getUsersCustomerServiceVO.id)})},upUsermsg:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return document.getElementsByClassName("content")[0].scrollTop=0,!1;""==t.ruleForm.serviceId&&(t.ruleForm.serviceId="0");var s=new URLSearchParams;s.append("serviceId",t.ruleForm.serviceId),s.append("uid",localStorage.getItem("uid")),s.append("id",localStorage.getItem("uid")),s.append("images",t.ruleForm.userPicurl),s.append("contactPersonName",t.ruleForm.name),s.append("contactPersonPhone",t.ruleForm.phone),s.append("names",t.ruleForm.busName),s.append("longitude",t.ruleForm.lon),s.append("latitude",t.ruleForm.lat),s.append("addr",t.ruleForm.busAddress),s.append("phones",t.ruleForm.busPhone),s.append("code",t.ruleForm.codePicurl),t.$http.post(t.$api.usersUp.usersUp,s,!0).then(function(e){"success"==e.data.state&&r.a.sucPrompt(t.$message({showClose:!0,message:"恭喜你，用户数据更新成功",type:"success"}))})})},popupActive:function(e){this.popupAct=!this.popupAct,this.types="code"==e?"3":"1",this.popupAct&&this.userpicList(this.types)},handleFileChange:function(e){var t=this,s=e.target.dataset.types;if("1"==s){var i=this.$refs.inputer;this.file=i.files[0];Math.floor(this.file.size/1024);this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("uid",localStorage.getItem("uid")),this.formData.append("types","1"),this.$http.post(this.$api.uploadActpic.uploadActpic,this.formData,!0).then(function(e){t.userpicList(s)})}else{var a=this.$refs.inputer;this.file=a.files[0];Math.floor(this.file.size/1024);this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("uid",localStorage.getItem("uid")),this.formData.append("types","1"),this.$http.post(this.$api.uploadCode.uploadCode,this.formData,!0).then(function(e){t.userpicList(s)})}},userpicList:function(e){var t=this,s=new URLSearchParams;s.append("uid",localStorage.getItem("uid")),s.append("page",this.page.toString()),s.append("types",e),s.append("show_num",this.pageSize),this.$http.post(this.$api.upLoderFile.upLoderFile,s,!0).then(function(e){"success"==e.data.state&&(t.picList=e.data.getUsersUploadVOList,t.allUserPic=e.data.page_zong)})},prevPage:function(){if(this.page<=1)return this.page=1,void this.userpicList(this.types);this.page-=1,this.userpicList(this.types)},nextPage:function(){this.page<parseInt(this.allUserPic)&&(this.page+=1,this.userpicList(this.types))},selPic:function(e){"1"==e.target.dataset.types?(this.ruleForm.userPicurl=e.target.dataset.picurl,this.popupAct=!this.popupAct):(this.ruleForm.codePicurl=e.target.dataset.picurl,this.popupAct=!this.popupAct)},delUserPic:function(){console.log(this.delUserPic),this.ruleForm.userPicurl="",console.log(this.delUserPic)},delCodePic:function(e){this.ruleForm.codePicurl=""},openMap:function(){this.centerDialogVisible=!this.centerDialogVisible}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"info"},[i("el-card",{staticClass:"person-info"},[i("div",{staticClass:"info-top",attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"person-pic"},[""!=e.userMessage.images?[i("img",{attrs:{src:e.picurl+e.userMessage.images,alt:""}})]:[i("img",{attrs:{src:s("2Z2B"),alt:""}})]],2),e._v(" "),i("div",{staticClass:"info"},[i("div",{staticClass:"name"},[e._v(e._s(e.userMessage.usersName))]),e._v(" "),i("div",{staticClass:"money"},[null!=e.userMessage.smallChange_money_show?[i("span",{staticClass:"num"},[e._v(e._s(e.userMessage.smallChange_money_show))])]:[i("span",{staticClass:"num"},[e._v("0.00")])],e._v("\n          元\n        ")],2)]),e._v(" "),i("div",{staticClass:"payment-btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.targetChange}},[e._v("充值")]),e._v(" "),"1"==e.role||"3"==e.role?[i("router-link",{attrs:{to:"/user/appmsg"}},[i("el-button",{attrs:{type:"success"}},[e._v("设置")])],1)]:e._e()],2)]),e._v(" "),i("div",{staticClass:"info-bottom"},[i("div",{staticClass:"info-item"},[e._v("地区："+e._s(e.userMessage.region_province_city))]),e._v(" "),i("div",{staticClass:"info-item"},[e._v("账号：0/0(已开通/总数量)")]),e._v(" "),i("div",{staticClass:"info-item"},[e._v("时间："+e._s(e.userMessage.recentLogin))]),e._v(" "),i("div",{staticClass:"info-item"},[e._v("\n        商户类型：\n        "),"1"==e.userMessage.merchantType?i("span",[e._v("个人")]):i("span",[e._v("企业")])]),e._v(" "),i("div",{staticClass:"info-item"},[e._v("负责人姓名："+e._s(e.userMessage.usersName))]),e._v(" "),i("div",{staticClass:"info-item"},[e._v("负责人电话："+e._s(e.userMessage.usersPhone))])])]),e._v(" "),i("div",{staticClass:"updata"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("修改账户信息")])]),e._v(" "),i("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"250px"}},[i("div",{staticClass:"main"},[i("div",{staticClass:"tip"},[i("div",{staticClass:"title"},[i("div",{staticClass:"line"}),e._v(" "),i("div",{staticClass:"txt"},[e._v("用户信息")])])]),e._v(" "),i("div",{staticClass:"up-person-img"},[i("el-form-item",{attrs:{label:"头像",prop:"userPicurl"}},[i("div",{ref:"pic",staticClass:"photo-toload"},[""==e.ruleForm.userPicurl?[i("div",{staticClass:"block",on:{click:function(t){return e.popupActive("userpic")}}}),e._v(" "),i("i",{staticClass:"iconfont icon-add-select"})]:[""==e.ruleForm.userPicurl?[i("img",{attrs:{src:s("2Z2B"),alt:""}})]:[i("img",{attrs:{src:e.picurl+e.ruleForm.userPicurl,alt:""}}),e._v(" "),i("div",{staticClass:"cover"},[i("i",{staticClass:"el-icon-zoom-in",on:{click:function(t){return e.bigPicMirror("userPicurl")}}}),e._v(" "),i("i",{staticClass:"el-icon-edit",on:{click:function(t){return e.popupActive("userpic")}}}),e._v(" "),i("i",{staticClass:"el-icon-delete",on:{click:e.delUserPic}})])]]],2)])],1),e._v(" "),i("div",{staticClass:"up-contact-name"},[i("el-form-item",{attrs:{label:"紧急联系人姓名"}},[i("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),e._v(" "),i("div",{staticClass:"up-contact-phone"},[i("el-form-item",{attrs:{label:"紧急联系人电话"}},[i("el-input",{model:{value:e.ruleForm.phone,callback:function(t){e.$set(e.ruleForm,"phone",t)},expression:"ruleForm.phone"}})],1)],1),e._v(" "),i("div",{staticClass:"tip"},[i("div",{staticClass:"title"},[i("div",{staticClass:"line"}),e._v(" "),i("div",{staticClass:"txt"},[e._v("\n                商家信息\n                "),i("span",[e._v("(创建活动会展示商家信息)")])])])]),e._v(" "),i("div",{staticClass:"up-merchants-name"},[i("el-form-item",{attrs:{label:"商家名称",prop:"busName"}},[i("el-input",{attrs:{maxlength:"13","show-word-limit":""},model:{value:e.ruleForm.busName,callback:function(t){e.$set(e.ruleForm,"busName",t)},expression:"ruleForm.busName"}})],1)],1),e._v(" "),i("div",{staticClass:"up-merchants-address"},[i("el-form-item",{attrs:{label:"商家定位",prop:"lat"}},[i("el-input",{attrs:{disabled:"",placeholder:[""!=e.ruleForm.lat&&""!=e.ruleForm.lon?"已获取商家定位":"请点击定位按钮选择商家定位"]},model:{value:""!=e.ruleForm.lat?e.busPositionSuc:e.busPositionErr,callback:function(t){e.$set(e.ruleForm,"lat!=''?busPositionSuc:busPositionErr",t)},expression:"ruleForm.lat!=''?busPositionSuc:busPositionErr"}}),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.openMap}},[e._v("定位")])],1)],1),e._v(" "),i("div",{staticClass:"up-merchants-location"},[i("el-form-item",{attrs:{label:"商家地址",prop:"busAddress"}},[i("el-input",{attrs:{type:"textarea",placeholder:"请填写商家地址",maxlength:"50","show-word-limit":""},model:{value:e.ruleForm.busAddress,callback:function(t){e.$set(e.ruleForm,"busAddress",t)},expression:"ruleForm.busAddress"}})],1)],1),e._v(" "),i("div",{staticClass:"up-merchants-phone"},[i("el-form-item",{attrs:{label:"商家电话",prop:"busPhone"}},[i("el-input",{attrs:{placeholder:"请输入商家电话"},model:{value:e.ruleForm.busPhone,callback:function(t){e.$set(e.ruleForm,"busPhone",t)},expression:"ruleForm.busPhone"}})],1)],1),e._v(" "),i("div",{staticClass:"up-person-img"},[i("el-form-item",{attrs:{label:"商家二维码",prop:"codePicurl"}},[i("div",{staticClass:"photo-toload"},[""==e.ruleForm.codePicurl?[i("div",{staticClass:"block",on:{click:function(t){return e.popupActive("code")}}}),e._v(" "),i("i",{staticClass:"iconfont icon-add-select"})]:e._e(),e._v(" "),""!=e.ruleForm.codePicurl?[i("img",{attrs:{src:e.picurl+e.ruleForm.codePicurl,alt:""}}),e._v(" "),i("div",{staticClass:"cover"},[i("i",{staticClass:"el-icon-zoom-in",on:{click:function(t){return e.bigPicMirror("codePicurl")}}}),e._v(" "),i("i",{staticClass:"el-icon-edit",on:{click:function(t){return e.popupActive("code")}}}),e._v(" "),i("i",{staticClass:"el-icon-delete",on:{click:e.delCodePic}})])]:e._e()],2)])],1),e._v(" "),i("div",{staticClass:"prompt"},[e._v("1.图片尺寸比例为1：1；2.图片大小必须小于100KB")]),e._v(" "),i("div",{staticClass:"updata-btn"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.upUsermsg("ruleForm")}}},[e._v("更新")])],1)])])],1)],1),e._v(" "),e.popupAct?i("div",{staticClass:"popup"},[i("div",{staticClass:"head"},[i("div",{staticClass:"title"},[e._v("文件管理")]),e._v(" "),i("div",{staticClass:"delete",on:{click:e.popupActive}},[i("i",{staticClass:"el-icon-close"})])]),e._v(" "),i("ul",{staticClass:"content"},e._l(e.picList,function(t,s){return i("li",{key:s},[i("div",{staticClass:"licove",attrs:{"data-picUrl":t.urls,"data-types":e.types},on:{dblclick:function(t){return e.selPic(t)}}}),e._v(" "),i("div",{staticClass:"pic"},[i("img",{attrs:{src:e.picurl+t.urls,alt:""}})]),e._v(" "),i("div",{staticClass:"pic-msg"},[i("div",{staticClass:"serve"},[e._v(e._s(t.names))]),e._v(" "),i("div",{staticClass:"time"},[e._v(e._s(t.sizes)+"KB "+e._s(t.createTime))])])])}),0),e._v(" "),i("div",{staticClass:"popup-footer"},[i("div",{staticClass:"btn-warpper"},[i("el-button",{attrs:{size:"medium"},on:{click:e.prevPage}},[e._v("上一页")]),e._v(" "),i("el-button",{attrs:{size:"medium"},on:{click:e.nextPage}},[e._v("下一页")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"}},[i("i",{staticClass:"el-icon-upload"}),e._v("本地上传\n          "),i("input",{ref:"inputer",attrs:{type:"file","data-types":e.types,name:"sharePic"},on:{change:function(t){return e.handleFileChange(t)}}})])],1)])]):e._e(),e._v(" "),i("el-dialog",{attrs:{modal:!1,"modal-append-to-body":!1,visible:e.picBigMirror,width:"50%",top:"7vh",center:""},on:{"update:visible":function(t){e.picBigMirror=t}}},[i("img",{staticStyle:{display:"block","max-width":"500px",margin:"0 auto"},attrs:{src:"userPicurl"==e.picName?e.picurl+e.ruleForm.userPicurl:e.picurl+e.ruleForm.codePicurl,alt:""}})]),e._v(" "),i("el-dialog",{attrs:{title:"商家位置",visible:e.centerDialogVisible,width:"80%",top:"7vh",left:"","modal-append-to-body":!1,"show-close":!1},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[i("div",{staticClass:"dialog_main"},[i("div",{staticClass:"map-warpper"},[i("Map")],1)])])],1)},staticRenderFns:[]};var c=s("C7Lr")(l,o,!1,function(e){s("noX5")},"data-v-49f65f2e",null);t.default=c.exports},noX5:function(e,t){}});
//# sourceMappingURL=31.10dfbdad78530c5d2d7d.js.map