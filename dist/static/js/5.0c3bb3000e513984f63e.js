webpackJsonp([5],{K6q8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("ZLEe"),r=a.n(i),o=a("xt+v"),s=a("2iMq"),c=a("O2NY"),l=a.n(c),n={components:{Map:s.a},data:function(){var t=this;return{isActive:1,picurl:"http://lb3.28888753.cn/imges/",types:"1",page:1,pageSize:"8",picList:[],popupAct:!1,allUserPic:"",picBigMirror:!1,picName:"",actEditor:{actName:"",actEndTime:"",leverMsg:!1,actDetail:"",shareTitle:"",shareDec:"",sharePicurl:"",extractType:"1",redpackType:"1",redpackNum:"1",redpackModel:"1",smallMoney:"0.30",bigMoney:"0.80",makeMoney:!1,makeMoneytxt:"2",onceGetMoney:"0.10",moneyLimit:"1.00",forwardingNum:"3",addressType:"1",accurateAdr:[],selAdr:"",busPositionSuc:"已获取商家定位",busPositionErr:"请点击定位按钮选择商家定位",reserveTime:"0",cardSet:!1,cardSettxt:"2",bagMusic:!1,bagMuc:"",firstScreenurl:"",pageStyle:"1",minimumMoney:"0.10",onLine:0,scopeCenter:"",lon:"",lat:"",scopeRegion:"",cardRatio:"1",domains:[{money:"0.30",probability:50},{money:"0.50",probability:30},{money:"1.00",probability:20}],domainsCard:[{name:"",nameList:[],num:"1"}]},pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()},shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}},{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]},selectIdsArr:[],props:{multiple:!0},options:[],iscard:!1,centerDialogVisible:!1,rules:{actName:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请填写活动名称"));a()},trigger:"blur"}],actEndTime:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请选择活动结束日期"));a()},trigger:"blur"}],actDetail:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请填写活动详情"));a()},trigger:"blur"}],shareTitle:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请设置分享标题"));a()},trigger:"blur"}],shareDec:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请填写活动描述"));a()},trigger:"blur"}],sharePicurl:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请设置分享图片"));a()},trigger:"blur"}],accurateAdr:[{required:!0,validator:function(t,e,a){if(!e)return a(new Error("请选择地区类型"));a()},trigger:"change",type:"array"}],moneyRule:[{validator:function(e,a,i){for(var o={},s=0;s<t.actEditor.domains.length;s++)o["a"+100*t.actEditor.domains[s].money]=1;r()(o).length<t.actEditor.domains.length?i(new Error("等额模式金额不能重复")):i()},trigger:"blur"}],probabilityRule:[{validator:function(e,a,i){for(var r=0,o=0;o<t.actEditor.domains.length;o++)r+=parseInt(t.actEditor.domains[o].probability);r>100?i(new Error("所有概率之和应该为100 ")):i()},trigger:"blur"}]}}},created:function(){var t=this;this.nameList(),this.addressList(),o.a.$on("mapAct",function(e){t.centerDialogVisible=e}),o.a.$on("pos",function(e){t.actEditor.lon=e.lng,t.actEditor.lat=e.lat}),this.getEditorData()},methods:{bigPicMirror:function(t){this.picName=t,this.picBigMirror=!this.picBigMirror},getEditorData:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),e.append("ids",this.$route.query.id),this.$http.post(this.$api.editorActEcho.editorActEcho,e,!0).then(function(e){if(console.log("数据回显",e),"success"==e.data.state){t.actEditor.actName=e.data.getActivityVO.activityTitle,t.actEditor.leverMsg=e.data.getActivityVO.leavingAMessage,t.actEditor.actDetail=e.data.getActivityVO.content,t.actEditor.shareTitle=e.data.getActivityVO.shareTitle,t.actEditor.shareDec=e.data.getActivityVO.shareDescribe,t.actEditor.sharePicurl=t.picurl+e.data.getActivityVO.shareShowImage,t.actEditor.actEndTime=e.data.getActivityVO.activityEndTime_show,t.actEditor.extractType=e.data.getActivityVO.withdrawalMethod.toString(),t.actEditor.redpackType=e.data.getActivityVO.pattern.toString(),t.actEditor.redpackNum=e.data.getActivityVO.receive_num.toString(),t.actEditor.redpackModel=e.data.getActivityVO.red_envelopes_pattern.toString(),e.data.getActivityVO.mail_Money&&(t.actEditor.smallMoney=e.data.getActivityVO.mail_Money),e.data.getActivityVO.max_Money&&(t.actEditor.bigMoney=e.data.getActivityVO.max_Money),t.actEditor.makeMoney="2"!=e.data.getActivityVO.clickToMakeMoney,e.data.getActivityVO.clickToMakeMoney_money&&(t.actEditor.onceGetMoney=e.data.getActivityVO.clickToMakeMoney_money),e.data.getActivityVO.clickToMakeMoney_max_money&&(t.actEditor.moneyLimit=e.data.getActivityVO.clickToMakeMoney_max_money),e.data.getActivityVO.share_click_nums&&(t.actEditor.forwardingNum=e.data.getActivityVO.share_click_nums),t.actEditor.addressType=e.data.getActivityVO.ranges.toString();for(var a=e.data.getActivityVO.activityMapAppointRegionVO,i=0;i<a.length;i++)t.actEditor.accurateAdr.push([a[i].province,a[i].city,a[i].area]);t.actEditor.bagMusic="2"!=e.data.getActivityVO.backgroundMusicOpen,t.picurl+e.data.getActivityVO.backgroundMusic&&(t.actEditor.bagMuc=t.picurl+e.data.getActivityVO.backgroundMusic),e.data.getActivityVO.receiveRedEnvelopesTime&&(t.actEditor.reserveTime=e.data.getActivityVO.receiveRedEnvelopesTime),t.actEditor.cardSet="1"==e.data.getActivityVO.openCardRoll,t.actEditor.pageStyle=e.data.getActivityVO.pageTemplateTypes.toString(),e.data.getActivityVO.share_single_Friends_money&&(t.actEditor.minimumMoney=e.data.getActivityVO.share_single_Friends_money),e.data.getActivityVO.day_receive_num&&(t.actEditor.onLine=e.data.getActivityVO.day_receive_num),t.actEditor.domains=[];for(var r=0;r<e.data.getActivityVO.activityShareFriendEqualPatternVOList.length;r++)t.actEditor.domains.push({money:e.data.getActivityVO.activityShareFriendEqualPatternVOList[r].momey_show,probability:e.data.getActivityVO.activityShareFriendEqualPatternVOList[r].probability});if(e.data.getActivityVO.map_appoint_range_longitude&&(t.actEditor.lon=e.data.getActivityVO.map_appoint_range_longitude),e.data.getActivityVO.map_appoint_range_latitude&&(t.actEditor.lat=e.data.getActivityVO.map_appoint_range_latitude),e.data.getActivityVO.km&&(t.actEditor.scopeRegion=e.data.getActivityVO.km),e.data.getActivityVO.cardRollProportion&&(t.actEditor.cardRatio=e.data.getActivityVO.cardRollProportion),t.nameList(),e.data.getActivityVO.activityCardRollVOList.length>0){t.actEditor.domainsCard=[];for(var o=0;o<e.data.getActivityVO.activityCardRollVOList.length;o++)t.actEditor.domainsCard.push({name:e.data.getActivityVO.activityCardRollVOList[o].cardRollVO.cardName,num:e.data.getActivityVO.activityCardRollVOList[o].cardRollNum})}t.actEditor.firstScreenurl=t.picurl+e.data.getActivityVO.firstScreenAdvertisementImg}})},changeActData:function(t){var e=this;console.log("this.$refs[formName]",this.$refs[t]),this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.$confirm("确定修改此活动吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t=new URLSearchParams;if(t.append("uid",localStorage.getItem("uid")),t.append("id",e.$route.query.id),t.append("activityTitle",e.actEditor.actName),t.append("leavingAMessage",e.actEditor.leverMsg?"1":"2"),t.append("content",e.actEditor.actDetail),t.append("shareTitle",e.actEditor.shareTitle),t.append("shareDescribe",e.actEditor.shareDec),t.append("shareShowImage",e.actEditor.sharePicurl.split("imges/")[1]),RegExp(/-/).exec(e.actEditor.actEndTime)){console.log(e.actEditor.actEndTime);var a=e.moment(e.actEditor.actEndTime).format("YYYY-MM-DD HH:mm:ss");t.append("activityEndTime_show",a)}else{var i=e.moment(e.actEditor.actEndTime).format("YYYY-MM-DD HH:mm:ss");t.append("activityEndTime_show",i)}t.append("withdrawalMethod",e.actEditor.extractType),t.append("pattern",e.actEditor.redpackType),t.append("receive_num",e.actEditor.redpackNum),t.append("red_envelopes_pattern",e.actEditor.redpackModel),t.append("mail_Money",e.actEditor.smallMoney),t.append("max_Money",e.actEditor.bigMoney),e.actEditor.makeMoney?e.actEditor.makeMoneytxt="1":e.actEditor.makeMoneytxt="2",t.append("clickToMakeMoney",e.actEditor.makeMoneytxt),t.append("clickToMakeMoney_money",e.actEditor.onceGetMoney),t.append("clickToMakeMoney_max_money",e.actEditor.moneyLimit),t.append("share_click_nums",e.actEditor.forwardingNum),t.append("ranges",e.actEditor.addressType);for(var r="",o=0;o<e.actEditor.accurateAdr.length;o++)r+=e.actEditor.accurateAdr[o]+"$";e.actEditor.selAdr=r.split(",").join("/").split("$").join(",").substr(0,r.length-1),t.append("range_map_appoint_region",e.actEditor.selAdr),t.append("backgroundMusicOpen",1==e.actEditor.bagMusic?"1":"2"),t.append("backgroundMusic",e.actEditor.bagMuc.split("imges/")[1]),t.append("receiveRedEnvelopesTime",e.actEditor.reserveTime),e.actEditor.cardSet?e.actEditor.cardSettxt="1":e.actEditor.cardSettxt="2",t.append("openCardRoll",e.actEditor.cardSettxt),t.append("pageTemplateTypes",e.actEditor.pageStyle),t.append("share_single_Friends_money",e.actEditor.minimumMoney),t.append("day_receive_num",e.actEditor.onLine);var s="";for(o=0;o<e.actEditor.domains.length;o++)s+=e.actEditor.domains[o].money+",";t.append("moneys",s.substr(0,s.length-1));var c="";for(o=0;o<e.actEditor.domains.length;o++)c+=e.actEditor.domains[o].probability+",";t.append("probability",c.substr(0,c.length-1)),console.log("this.actEditor.lon",e.actEditor.lon),t.append("map_appoint_range_longitude",e.actEditor.lon),t.append("map_appoint_range_latitude",e.actEditor.lat),t.append("km",e.actEditor.scopeRegion),t.append("cardRollProportion",e.actEditor.cardRatio);var n="";for(o=0;o<e.actEditor.domainsCard.length;o++)n+=e.actEditor.domainsCard[o].name+",";t.append("cardRollIdList",n.substr(0,n.length-1));var d="";for(o=0;o<e.actEditor.domainsCard.length;o++)d+=e.actEditor.domainsCard[o].num+",";t.append("cardRollNumList",d.substr(0,d.length-1)),console.log("this.actEditor.firstScreenurl",e.actEditor.firstScreenurl),t.append("firstScreenAdvertisementImg",e.actEditor.firstScreenurl.split("imges/")[1]),e.$http.post(e.$api.changeActData.changeActData,t,!0).then(function(t){e.$router.push({path:"/act/activity"}),l.a.errPrompt(e.$message({message:"卡劵编辑成功！",type:"success"}))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})})},handleEditorImgAdd:function(t,e){var a=this;this.formData=new FormData,this.formData.append("uid",localStorage.getItem("uid")),this.formData.append("types",this.types),this.formData.append("file",e),this.$http.post(this.$api.actUploadpic.actUploadpic,this.formData,!0).then(function(e){"success"==e.data.state&&a.$refs.md.$img2Url(t,a.picurl+e.data.url)})},handleEditorImgDel:function(t){},addressList:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),this.$http.post(this.$api.addressList.addressList,e,!0).then(function(e){if(console.log("地区列表",e),"success"==e.data.state){for(var a=e.data.getCnRegionInfoVOList,i=[],r=0;r<a.length;r++){for(var o=[],s=0;s<a[r].cnRegionInfoVOList.length;s++){for(var c=[],l=0;l<a[r].cnRegionInfoVOList[s].cnRegionInfoVOList.length;l++)c.push({value:a[r].cnRegionInfoVOList[s].cnRegionInfoVOList[l].cRINAME,label:a[r].cnRegionInfoVOList[s].cnRegionInfoVOList[l].cRINAME});o.push({value:a[r].cnRegionInfoVOList[s].cRINAME,label:a[r].cnRegionInfoVOList[s].cRINAME,children:c})}i.push({value:a[r].cRINAME,label:a[r].cRINAME,children:o})}t.options=i}})},openMap:function(){this.centerDialogVisible=!this.centerDialogVisible},popupActive:function(t){this.popupAct=!this.popupAct,"sharePicurl"==t?this.popupAct&&(this.userpicList(this.types="4"),this.types="4"):"bagMuc"==t?this.popupAct&&(this.mucList(this.types="2"),this.types="2"):this.popupAct&&(this.userpicList(this.types="5"),this.types="5")},userpicList:function(t){var e=this,a=new URLSearchParams;a.append("uid",localStorage.getItem("uid")),a.append("page",this.page.toString()),a.append("types",t),a.append("show_num",this.pageSize),this.$http.post(this.$api.upLoderFile.upLoderFile,a,!0).then(function(t){e.picList=t.data.getUsersUploadVOList,e.allUserPic=t.data.page_zong})},mucList:function(t){var e=this,a=new URLSearchParams;a.append("uid",localStorage.getItem("uid")),a.append("page",this.page),a.append("types",t),a.append("show_num",this.pageSize),this.$http.post(this.$api.mucList.mucList,a,!0).then(function(t){e.picList=t.data.getUsersUploadVOList})},selPic:function(t){"4"==this.types?(this.actEditor.sharePicurl=t.target.dataset.picurl,this.popupAct=!this.popupAct):"5"==this.types?(this.actEditor.firstScreenurl=t.target.dataset.picurl,this.popupAct=!this.popupAct):(this.actEditor.bagMuc=t.target.dataset.picurl,this.popupAct=!this.popupAct)},delPic:function(t){"sharePicurl"==t?this.actEditor.sharePicurl="":this.actEditor.firstScreenurl=""},handleFileChange:function(t){var e=this;if("4"==this.types||"5"==this.types){var a=this.$refs.inputer;this.file=a.files[0];Math.floor(this.file.size/1024);this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("uid",localStorage.getItem("uid")),this.formData.append("types",this.types),this.$http.post(this.$api.actUploadpicTypes.actUploadpicTypes,this.formData,!0).then(function(t){console.log("图片上传",t),e.userpicList(e.types)})}else{var i=this.$refs.inputer;this.file=i.files[0];Math.floor(this.file.size/1024);this.formData=new FormData,this.formData.append("file",this.file),this.formData.append("uid",localStorage.getItem("uid")),this.$http.post(this.$api.uploadMuc.uploadMuc,this.formData,!0).then(function(t){"success"==t.data.state&&(e.actEditor.bagMuc=e.picurl+t.data.url,e.userpicList(e.types))})}},prevPage:function(){if(this.page<=1)return this.page=1,void this.userpicList(this.types);this.page-=1,this.userpicList(this.types)},nextPage:function(){this.page<parseInt(this.allUserPic)&&(this.page+=1,this.userpicList(this.types))},addDomain:function(){this.actEditor.domains.push({value:"",key:Date.now()}),this.actEditor.domains.length>"5"&&(l.a.sucPrompt(this.$message("等额模式下，最多配置五种等额模式")),this.actEditor.domains.pop())},removeDomain:function(t){var e=this.actEditor.domains.indexOf(t);-1!==e&&this.actEditor.domains.length-1!="0"?this.actEditor.domains.splice(e,1):l.a.sucPrompt(this.$message("等额模式下，至少需要配置一种等额模式"))},nameList:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),this.$http.post(this.$api.cardnameList.cardnameList,e,!0).then(function(e){console.log("卡劵名称列表",e);for(var a=0;a<t.actEditor.domainsCard.length;a++)t.actEditor.domainsCard[a].nameList=e.data.getCardRollVOList})},onChangeProgram:function(){this.selectIdsArr=[];for(var t=0;t<this.actEditor.domainsCard.length;t++)this.actEditor.domainsCard[t].name&&this.selectIdsArr.push(this.actEditor.domainsCard[t].name)},addDomainCard:function(){this.actEditor.domainsCard.push({name:"",key:Date.now()}),this.actEditor.domainsCard.length>"5"&&(l.a.sucPrompt(this.$message("等额模式下，最多配置五种等额模式")),this.actEditor.domainsCard.pop()),this.nameList()},removeDomainCard:function(t){var e=this.actEditor.domainsCard.indexOf(t);-1!==e&&this.actEditor.domainsCard.length-1!="0"?this.actEditor.domainsCard.splice(e,1):l.a.sucPrompt(this.$message("等额模式下，至少需要配置一种等额模式"))},goBack:function(){this.$router.push({path:"/act/activity"})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"editor"},[a("el-card",[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("活动编辑")])]),t._v(" "),a("el-form",{ref:"ruleForm",attrs:{model:t.actEditor,"label-width":"250px",rules:t.rules}},[a("div",{staticClass:"main-set"},[a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("活动内容设置")])])]),t._v(" "),a("div",{staticClass:"warpper"},[a("el-form-item",{attrs:{label:"活动名称",prop:"actName"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",maxlength:"50","show-word-limit":""},model:{value:t.actEditor.actName,callback:function(e){t.$set(t.actEditor,"actName",e)},expression:"actEditor.actName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"活动结束日期",prop:"actEndTime"}},[a("el-date-picker",{attrs:{align:"right","picker-options":t.pickerOptions,type:"datetime",placeholder:"选择日期时间"},model:{value:t.actEditor.actEndTime,callback:function(e){t.$set(t.actEditor,"actEndTime",e)},expression:"actEditor.actEndTime"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("字数在20个以内")]),t._v(" "),a("el-form-item",{attrs:{label:"开启留言"}},[a("el-switch",{model:{value:t.actEditor.leverMsg,callback:function(e){t.$set(t.actEditor,"leverMsg",e)},expression:"actEditor.leverMsg"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"活动详情",prop:"actDetail"}},[a("mavon-editor",{ref:"md",on:{imgAdd:t.handleEditorImgAdd,imgDel:t.handleEditorImgDel},model:{value:t.actEditor.actDetail,callback:function(e){t.$set(t.actEditor,"actDetail",e)},expression:"actEditor.actDetail"}})],1)],1)]),t._v(" "),a("div",{staticClass:"share-set"},[a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("活动分享设置")])])]),t._v(" "),a("el-form-item",{attrs:{label:"分享标题",prop:"shareTitle"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",maxlength:"40","show-word-limit":""},model:{value:t.actEditor.shareTitle,callback:function(e){t.$set(t.actEditor,"shareTitle",e)},expression:"actEditor.shareTitle"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("推荐40个汉字以内")]),t._v(" "),a("el-form-item",{attrs:{label:"分享描述",prop:"shareDec"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",maxlength:"30","show-word-limit":""},model:{value:t.actEditor.shareDec,callback:function(e){t.$set(t.actEditor,"shareDec",e)},expression:"actEditor.shareDec"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("推荐30个汉字以内")]),t._v(" "),a("div",{staticClass:"share-photo"},[a("el-form-item",{attrs:{label:"分享图片",prop:"sharePicurl"}},[a("div",{ref:"pic",staticClass:"photo-toload"},[""==t.actEditor.sharePicurl?[a("div",{staticClass:"block",on:{click:function(e){return t.popupActive("sharePicurl")}}}),t._v(" "),a("i",{staticClass:"iconfont icon-add-select"})]:t._e(),t._v(" "),""!=t.actEditor.sharePicurl?[a("img",{attrs:{src:t.actEditor.sharePicurl,alt:""}}),t._v(" "),a("div",{staticClass:"cover"},[a("i",{staticClass:"el-icon-zoom-in",on:{click:function(e){return t.bigPicMirror("sharePicurl")}}}),t._v(" "),a("i",{staticClass:"el-icon-edit",on:{click:function(e){return t.popupActive("sharePicurl")}}}),t._v(" "),a("i",{staticClass:"el-icon-delete",attrs:{"data-types":t.types},on:{click:function(e){return t.delPic("sharePicurl")}}})])]:t._e()],2)])],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("1.图片尺寸：1:1；2.图片大小必须小于100KB")])],1),t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("红包配置")])])]),t._v(" "),a("el-form-item",{attrs:{label:"提现方式",required:""}},[a("el-radio-group",{model:{value:t.actEditor.extractType,callback:function(e){t.$set(t.actEditor,"extractType",e)},expression:"actEditor.extractType"}},[a("el-radio",{attrs:{label:"1"}},[t._v("小程序")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("直接提现")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"红包领取模式",required:""}},[a("el-radio-group",{model:{value:t.actEditor.redpackType,callback:function(e){t.$set(t.actEditor,"redpackType",e)},expression:"actEditor.redpackType"}},[a("el-radio",{attrs:{label:"1"}},[t._v("分享朋友圈直接到账")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("推广赚钱（分享好友赚钱）")])],1)],1),t._v(" "),"1"==t.actEditor.redpackType?[a("div",{staticClass:"prompt"},[t._v("红包领取模式在审核成功后将不能修改")]),t._v(" "),a("el-form-item",{attrs:{label:"红包领取次数",required:""}},[a("el-radio-group",{model:{value:t.actEditor.redpackNum,callback:function(e){t.$set(t.actEditor,"redpackNum",e)},expression:"actEditor.redpackNum"}},[a("el-radio",{attrs:{label:"1"}},[t._v("每人只能领一次")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("每人每天领取一次")])],1)],1),t._v(" "),"2"==t.actEditor.redpackNum?[a("el-form-item",{attrs:{label:"红包领取次数上限",required:""}},[a("el-input",{model:{value:t.actEditor.onLine,callback:function(e){t.$set(t.actEditor,"onLine",e)},expression:"actEditor.onLine"}})],1)]:t._e(),t._v(" "),a("el-form-item",{attrs:{label:"红包模式",required:""}},[a("el-radio-group",{model:{value:t.actEditor.redpackModel,callback:function(e){t.$set(t.actEditor,"redpackModel",e)},expression:"actEditor.redpackModel"}},[a("el-radio",{attrs:{label:"1"}},[t._v("随机模式")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("等额模式")]),t._v(" "),"2"==t.actEditor.redpackModel?a("el-button",{attrs:{icon:"el-icon-plus",type:"primary",circle:""},on:{click:t.addDomain}}):t._e()],1)],1),t._v(" "),"1"==t.actEditor.redpackModel?[a("el-form-item",{attrs:{label:"随机最小金额",required:""}},[a("el-input",{model:{value:t.actEditor.smallMoney,callback:function(e){t.$set(t.actEditor,"smallMoney",e)},expression:"actEditor.smallMoney"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"随机最大金额",required:""}},[a("el-input",{model:{value:t.actEditor.bigMoney,callback:function(e){t.$set(t.actEditor,"bigMoney",e)},expression:"actEditor.bigMoney"}})],1)]:t._l(t.actEditor.domains,function(e,i){return a("el-form-item",{key:i,attrs:{label:"等额模式"+(i+1),required:""}},[a("div",{staticClass:"equalMoneyModel",staticStyle:{display:"flex"}},[a("span",{staticStyle:{padding:"0 10px"}},[t._v("金额")]),t._v(" "),a("el-form-item",{attrs:{rules:t.rules.moneyRule,prop:"domains."+i+".money"}},[a("el-input",{model:{value:e.money,callback:function(a){t.$set(e,"money",a)},expression:"domain.money"}})],1),t._v(" "),a("span",{staticStyle:{padding:"0 10px"}},[t._v("概率")]),t._v(" "),a("el-form-item",{attrs:{rules:t.rules.probabilityRule,prop:"domains."+i+".probability"}},[a("el-input",{model:{value:e.probability,callback:function(a){t.$set(e,"probability",a)},expression:"domain.probability"}})],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(a){return a.preventDefault(),t.removeDomain(e)}}})],1)])}),t._v(" "),a("el-form-item",{attrs:{label:"是否开启点击赚钱"}},[a("el-switch",{model:{value:t.actEditor.makeMoney,callback:function(e){t.$set(t.actEditor,"makeMoney",e)},expression:"actEditor.makeMoney"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("开启后，好友每次点击获得0.1元，最高10元")]),t._v(" "),t.actEditor.makeMoney?[a("el-form-item",{attrs:{label:"获取金额"}},[a("el-input",{attrs:{placeholder:"请输入单次点击金额"},model:{value:t.actEditor.onceGetMoney,callback:function(e){t.$set(t.actEditor,"onceGetMoney",e)},expression:"actEditor.onceGetMoney"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("好友单次点击朋友圈获取金额！")]),t._v(" "),a("el-form-item",{attrs:{label:"金额限制"}},[a("el-input",{attrs:{placeholder:"请输入点击朋友圈获取金额限制"},model:{value:t.actEditor.moneyLimit,callback:function(e){t.$set(t.actEditor,"moneyLimit",e)},expression:"actEditor.moneyLimit"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("设定好友每次点击获取金额限制！")]),t._v(" "),a("el-form-item",{attrs:{label:"转发量限制"}},[a("el-input",{attrs:{placeholder:"请输入好友转发量限制"},model:{value:t.actEditor.forwardingNum,callback:function(e){t.$set(t.actEditor,"forwardingNum",e)},expression:"actEditor.forwardingNum"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("好友转发量多少时才能获取所得金额（默认值为0）")])]:t._e(),t._v(" "),a("el-form-item",{attrs:{label:"地区选择类型",prop:"addressType"}},[a("el-radio-group",{model:{value:t.actEditor.addressType,callback:function(e){t.$set(t.actEditor,"addressType",e)},expression:"actEditor.addressType"}},[a("el-radio",{attrs:{label:"1"}},[t._v("指定地区")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("指定范围（针对商圈）")])],1)],1),t._v(" "),"2"==t.actEditor.addressType?[a("el-form-item",{attrs:{label:"红包领取范围中心",prop:"scopeCenter"}},[a("el-input",{attrs:{placeholder:[""!=t.actEditor.lat&&""!=t.actEditor.lon?"已获取商家定位":"请点击定位按钮选择商家定位"],disabled:""},model:{value:""!=t.actEditor.lat?t.actEditor.busPositionSuc:t.actEditor.busPositionErr,callback:function(e){t.$set(""!=t.actEditor.lat?t.actEditor.busPositionSuc:t.actEditor,"busPositionErr",e)},expression:"actEditor.lat!=''?actEditor.busPositionSuc:actEditor.busPositionErr"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.openMap}},[t._v("定位")])],1),t._v(" "),a("el-form-item",{attrs:{label:"红包领取地区范围(km)",prop:"scopeRegion"}},[a("el-input",{model:{value:t.actEditor.scopeRegion,callback:function(e){t.$set(t.actEditor,"scopeRegion",e)},expression:"actEditor.scopeRegion"}})],1)]:[a("el-form-item",{attrs:{label:"精确选择地区",prop:"accurateAdr"}},[a("div",{staticClass:"accurateAdr"},[a("el-cascader",{attrs:{options:t.options,props:t.props,clearable:""},model:{value:t.actEditor.accurateAdr,callback:function(e){t.$set(t.actEditor,"accurateAdr",e)},expression:"actEditor.accurateAdr"}})],1)])]]:[a("div",{staticClass:"prompt"},[t._v("红包领取模式在审核成功后将不能修改。")]),t._v(" "),a("el-form-item",{attrs:{label:"分享单个好友获得金额",required:""}},[a("el-input",{model:{value:t.actEditor.minimumMoney,callback:function(e){t.$set(t.actEditor,"minimumMoney",e)},expression:"actEditor.minimumMoney"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("1.用户通过推广赚钱参与同一活动，赚取金额上限：系统默认为10元。2.分享单个好友获得金额:0.1~1")]),t._v(" "),a("el-form-item",{attrs:{label:"地区选择类型"}},[a("el-radio-group",{model:{value:t.actEditor.addressType,callback:function(e){t.$set(t.actEditor,"addressType",e)},expression:"actEditor.addressType"}},[a("el-radio",{attrs:{label:"1"}},[t._v("指定地区")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("指定范围（针对商圈）")])],1)],1),t._v(" "),"2"==t.actEditor.addressType?[a("el-form-item",{attrs:{label:"红包领取范围中心",prop:"scopeCenter"}},[a("el-input",{attrs:{placeholder:[""!=t.actEditor.lat&&""!=t.actEditor.lon?"已获取商家定位":"请点击定位按钮选择商家定位"],disabled:""},model:{value:""!=t.actEditor.lat?t.actEditor.busPositionSuc:t.actEditor.busPositionErr,callback:function(e){t.$set(""!=t.actEditor.lat?t.actEditor.busPositionSuc:t.actEditor,"busPositionErr",e)},expression:"actEditor.lat!=''?actEditor.busPositionSuc:actEditor.busPositionErr"}}),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.openMap}},[t._v("定位")])],1),t._v(" "),a("el-form-item",{attrs:{label:"红包领取地区范围(km)"}},[a("el-input",{model:{value:t.actEditor.scopeRegion,callback:function(e){t.$set(t.actEditor,"scopeRegion",e)},expression:"actEditor.scopeRegion"}})],1)]:[a("el-form-item",{attrs:{label:"精确选择地区",prop:"accurateAdr"}},[a("el-cascader",{attrs:{options:t.options,props:t.props,clearable:""},model:{value:t.actEditor.accurateAdr,callback:function(e){t.$set(t.actEditor,"accurateAdr",e)},expression:"actEditor.accurateAdr"}})],1)],t._v(" "),a("div",{staticClass:"prompt"},[t._v("不选则表示全国范围均可参与活动")])],t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("红包提示信息")])])]),t._v(" "),a("el-form-item",{attrs:{label:"是否上传背景音乐"}},[a("el-switch",{model:{value:t.actEditor.bagMusic,callback:function(e){t.$set(t.actEditor,"bagMusic",e)},expression:"actEditor.bagMusic"}})],1),t._v(" "),1==t.actEditor.bagMusic?[a("el-form-item",{attrs:{label:"背景音乐"}},[a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:t.actEditor.bagMuc,callback:function(e){t.$set(t.actEditor,"bagMuc",e)},expression:"actEditor.bagMuc"}},[a("template",{slot:"append"},[a("el-button",{attrs:{type:"info"},on:{click:function(e){return t.popupActive("bagMuc")}}},[t._v("选择文件")])],1)],2)],1)]:t._e(),t._v(" "),1==t.actEditor.bagMusic?a("div",{staticClass:"prompt"},[t._v("1.文件格式为mp3；2.文件大小必须小于5M；3.不传则播放默认红包提示音乐")]):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"红包领取倒计时"}},[a("el-input",{model:{value:t.actEditor.reserveTime,callback:function(e){t.$set(t.actEditor,"reserveTime",e)},expression:"actEditor.reserveTime"}})],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("倒计时为0则，不出现倒计时且不播放背景音乐。")]),t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("卡劵配置")])])]),t._v(" "),a("el-form-item",{attrs:{label:"是否开启卡劵"}},[a("el-switch",{model:{value:t.actEditor.cardSet,callback:function(e){t.$set(t.actEditor,"cardSet",e)},expression:"actEditor.cardSet"}})],1),t._v(" "),1==t.actEditor.cardSet?[a("el-form-item",{attrs:{label:"卡劵比例"}},[a("el-input",{attrs:{placeholder:"请填写卡劵比例"},model:{value:t.actEditor.cardRatio,callback:function(e){t.$set(t.actEditor,"cardRatio",e)},expression:"actEditor.cardRatio"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addDomainCard}},[t._v("卡劵")])],1)]:t._e(),t._v(" "),1==t.actEditor.cardSet?a("div",{staticClass:"prompt"},[t._v("开启卡劵后需要填写卡劵比例并添加1-5种卡劵。比如，卡劵比例为10，则在100个用户中会有10个用户分享后获得卡劵。")]):t._e(),t._v(" "),1==t.actEditor.cardSet?a("div",{staticClass:"card-model-warpper"},t._l(t.actEditor.domainsCard,function(e,i){return a("el-form-item",{key:i,attrs:{label:"卡劵"+(i+1),required:""}},[a("div",{staticClass:"setCardBox",staticStyle:{display:"flex"}},[a("span",{staticStyle:{padding:"0 10px"}},[t._v("名称")]),t._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.onChangeProgram},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"domain.name"}},t._l(e.nameList,function(i){return a("el-option",{directives:[{name:"show",rawName:"v-show",value:e.name==i.id||!t.selectIdsArr.includes(i.id),expression:"domain.name==item.id||!selectIdsArr.includes(item.id)"}],key:i.id,attrs:{label:i.cardName,value:i.id}})}),1)],1),t._v(" "),a("span",{staticStyle:{padding:"0 10px"}},[t._v("数量")]),t._v(" "),a("el-form-item",[a("el-input",{model:{value:e.num,callback:function(a){t.$set(e,"num",a)},expression:"domain.num"}})],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(a){return a.preventDefault(),t.removeDomainCard(e)}}})],1)])}),1):t._e(),t._v(" "),1==t.actEditor.cardSet?a("div",{staticClass:"prompt",staticStyle:{"font-weight":"bold"}},[1==t.iscard?a("span",[t._v(t._s(t.cardAddPrompt))]):t._e()]):t._e(),t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("首屏配置")])])]),t._v(" "),a("div",{staticClass:"first-screen-set"},[a("el-form-item",{attrs:{label:"首屏广告"}},[a("div",{ref:"pic",staticClass:"photo-toload"},[""==t.actEditor.firstScreenurl?[a("div",{staticClass:"block",on:{click:function(e){return t.popupActive("firstScreenurl")}}}),t._v(" "),a("i",{staticClass:"iconfont icon-add-select"})]:t._e(),t._v(" "),""!=t.actEditor.firstScreenurl?[a("img",{attrs:{src:t.actEditor.firstScreenurl,alt:""}}),t._v(" "),a("div",{staticClass:"cover"},[a("i",{staticClass:"el-icon-zoom-in",on:{click:function(e){return t.bigPicMirror("firstScreenurl")}}}),t._v(" "),a("i",{staticClass:"el-icon-edit",on:{click:function(e){return t.popupActive("firstScreenurl")}}}),t._v(" "),a("i",{staticClass:"el-icon-delete",attrs:{"data-types":t.types},on:{click:function(e){return t.delPic("firstScreenurl")}}})])]:t._e()],2)])],1),t._v(" "),a("div",{staticClass:"prompt"},[t._v("1.图片尺寸：750px*1334px；2.图片大小必须小于1000KB；3.不传则不显示首屏广告")]),t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticClass:"title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"txt"},[t._v("页面风格")])])]),t._v(" "),a("div",{staticClass:"page-style"},[a("el-form-item",{attrs:{label:"页面模版",required:""}},[a("el-radio-group",{model:{value:t.actEditor.pageStyle,callback:function(e){t.$set(t.actEditor,"pageStyle",e)},expression:"actEditor.pageStyle"}},[a("el-radio",{attrs:{label:"1"}},[t._v("模版一")]),t._v(" "),a("el-radio",{attrs:{label:"2"}},[t._v("模版二")])],1)],1),t._v(" "),a("el-form-item",[a("div",{staticClass:"page-module"},[a("div",{staticClass:"pic-box"}),t._v(" "),a("div",{staticClass:"pic-box"})])])],1),t._v(" "),a("el-form-item",[a("el-button",{on:{click:t.goBack}},[t._v("返回")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.changeActData("ruleForm")}}},[t._v("修改")])],1)],2)],1),t._v(" "),t.popupAct?a("div",{staticClass:"popup"},[a("div",{staticClass:"head"},[a("div",{staticClass:"title"},[t._v("文件管理")]),t._v(" "),a("div",{staticClass:"delete",on:{click:t.popupActive}},[a("i",{staticClass:"el-icon-close"})])]),t._v(" "),a("ul",{staticClass:"content"},t._l(t.picList,function(e,i){return a("li",{key:i},[a("div",{staticClass:"licove",attrs:{"data-picUrl":t.picurl+e.urls,"data-types":t.types},on:{dblclick:function(e){return t.selPic(e)}}}),t._v(" "),a("div",{staticClass:"pic"},[a("img",{attrs:{src:t.picurl+e.urls,alt:""}})]),t._v(" "),a("div",{staticClass:"pic-msg"},[a("div",{staticClass:"serve"},[t._v(t._s(e.names))]),t._v(" "),a("div",{staticClass:"time"},[t._v(t._s(e.sizes)+"KB "+t._s(e.createTime))])])])}),0),t._v(" "),a("div",{staticClass:"popup-footer"},[a("div",{staticClass:"btn-warpper"},[a("el-button",{attrs:{size:"medium"},on:{click:t.prevPage}},[t._v("上一页")]),t._v(" "),a("el-button",{attrs:{size:"medium"},on:{click:t.nextPage}},[t._v("下一页")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"}},[a("i",{staticClass:"el-icon-upload"}),t._v("本地上传\n          "),a("input",{ref:"inputer",attrs:{type:"file","data-types":t.types,name:"sharePic"},on:{change:function(e){return t.handleFileChange(e)}}})])],1)])]):t._e(),t._v(" "),a("el-dialog",{attrs:{modal:!1,"modal-append-to-body":!1,visible:t.picBigMirror,width:"50%",top:"7vh",center:""},on:{"update:visible":function(e){t.picBigMirror=e}}},[a("img",{staticStyle:{display:"block","max-width":"500px",margin:"0 auto"},attrs:{src:"sharePicurl"==t.picName?this.actEditor.sharePicurl:this.actEditor.firstScreenurl,alt:""}})]),t._v(" "),a("el-dialog",{attrs:{title:"红包领取范围中心",visible:t.centerDialogVisible,width:"80%",top:"7vh",left:"","modal-append-to-body":!1,"show-close":!1},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[a("div",{staticClass:"dialog_main"},[a("div",{staticClass:"map-warpper"},[a("Map")],1)])])],1)},staticRenderFns:[]};var p=a("C7Lr")(n,d,!1,function(t){a("l5Ct")},"data-v-955681de",null);e.default=p.exports},OFGQ:function(t,e,a){var i=a("uSC2"),r=a("DH3n"),o=a("cqFu");t.exports=function(t,e){var a=(r.Object||{})[t]||Object[t],s={};s[t]=e(a),i(i.S+i.F*o(function(){a(1)}),"Object",s)}},ZLEe:function(t,e,a){t.exports={default:a("qMAo"),__esModule:!0}},l5Ct:function(t,e){},oGQd:function(t,e,a){var i=a("PGvq"),r=a("Lzmh");a("OFGQ")("keys",function(){return function(t){return r(i(t))}})},qMAo:function(t,e,a){a("oGQd"),t.exports=a("DH3n").Object.keys}});
//# sourceMappingURL=5.0c3bb3000e513984f63e.js.map