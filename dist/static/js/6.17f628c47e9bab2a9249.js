webpackJsonp([6],{TM0B:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("zHHv"),i=r.n(o),a={components:{QRCode:i.a},data:function(){return{isActive:1,payForm:{money:"1000"},rules:{money:[{required:!0,message:"请输入充值金额",trigger:"blur"}]},cid:"",orderNum:""}},created:function(){},methods:{payMentDel:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),e.append("cid",this.cid),this.$http.post(this.$api.payMentDel.payMentDel,e,!0).then(function(e){console.log("支付详情",e),t.orderNum=e.data.getrechargeVo.orderNum})},submitForm:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),e.append("orderMoney",this.payForm.money),this.$http.post(this.$api.openPay.openPay,e,!0).then(function(e){console.log("充值",e),"success"==e.data.state&&(console.log("充值成功"),t.cid=e.data.cid,t.isActive+=1,t.payMentDel(),t.payCode())})},payCode:function(){var t=this,e=new URLSearchParams;e.append("uid",localStorage.getItem("uid")),e.append("cid",this.cid),e.append("moneys",this.payForm.money),this.$http.post(this.$api.payCode.payCode,e,!0).then(function(e){console.log("二维码",e),t.qrcodeScan(e.data.urlCode)})},qrcodeScan:function(t){new i.a("code",{width:170,height:170,text:t})}}},n={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"create"},[1==t.isActive?o("el-card",{staticClass:"create-warpper"},[o("div",{staticClass:"create-header",attrs:{slot:"header"},slot:"header"},[o("div",[t._v("充值")]),t._v(" "),o("span",[t._v("(在线充值微信公众平台将收取1%的手续费)")])]),t._v(" "),o("div",{staticClass:"main"},[o("el-form",{ref:"payForm",attrs:{model:t.payForm,rules:t.rules,"label-width":"250px"}},[o("div",{staticClass:"money"},[o("el-form-item",{attrs:{label:"金额",prop:"money"}},[o("el-input",{model:{value:t.payForm.money,callback:function(e){t.$set(t.payForm,"money",e)},expression:"payForm.money"}})],1)],1),t._v(" "),o("div",{staticClass:"prompt"},[t._v("（在线充值金额为100~1000元）")]),t._v(" "),o("div",{staticClass:"submit-btn"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("充值")])],1)])],1)]):o("el-card",{staticClass:"create-warpper1"},[o("div",{staticClass:"create-header",attrs:{slot:"header"},slot:"header"},[o("span",[t._v("收银台")])]),t._v(" "),o("div",{staticClass:"create-content"},[o("div",{staticClass:"box"},[o("div",{staticClass:"left"},[o("ul",[o("li",[o("span",[t._v("订单编号：")]),t._v(" "),o("span",[t._v(t._s(t.orderNum))])]),t._v(" "),o("li",[o("span",[t._v("订单类型：")]),t._v(" "),o("span",[t._v("充值")])]),t._v(" "),o("li",[o("span",[t._v("订单金额：")]),t._v(" "),o("span",[t._v("￥"+t._s(t.payForm.money)+".00")])])])]),t._v(" "),o("div",{staticClass:"right"},[o("span",[t._v("应付金额：")]),t._v(" "),o("span",[t._v("¥")]),t._v(" "),o("span",{staticStyle:{"font-size":"25px","font-weight":"bold"}},[t._v(t._s(t.payForm.money)+".00")])])])]),t._v(" "),o("div",{staticClass:"create-footer"},[o("div",{staticClass:"box"},[o("div",{staticClass:"wxpay"},[o("img",{attrs:{src:r("enjc"),alt:""}})]),t._v(" "),o("div",{staticClass:"wxpay-code"},[o("div",{staticClass:"code",attrs:{id:"code"}}),t._v(" "),o("img",{attrs:{src:r("VaRa"),alt:""}}),t._v(" "),o("div",{staticClass:"btn",staticStyle:{display:"flex","justify-content":"space-between"}},[o("router-link",{attrs:{to:"/funds/payment"}},[o("el-button",{attrs:{size:"small"}},[t._v("关闭订单")])],1),t._v(" "),o("router-link",{attrs:{to:"/funds/payment"}},[o("el-button",{attrs:{type:"primary",size:"small"}},[t._v("支付成功")])],1)],1)])])])])],1)},staticRenderFns:[]};var s=r("C7Lr")(a,n,!1,function(t){r("k1Qa")},"data-v-23ccaa4a",null);e.default=s.exports},VaRa:function(t,e,r){t.exports=r.p+"static/img/code-icon.6967607.png"},enjc:function(t,e,r){t.exports=r.p+"static/img/wxpay-icon.0de6b5c.png"},k1Qa:function(t,e){},zHHv:function(t,e,r){var o;o=function(){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var i=e[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}return r.m=t,r.c=e,r.p="",r(0)}([function(t,e){"use strict";var r;Object.defineProperty(e,"__esModule",{value:!0}),function(t){function e(t){this.mode=i.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var o=[],a=this.data.charCodeAt(e);a>65536?(o[0]=240|(1835008&a)>>>18,o[1]=128|(258048&a)>>>12,o[2]=128|(4032&a)>>>6,o[3]=128|63&a):a>2048?(o[0]=224|(61440&a)>>>12,o[1]=128|(4032&a)>>>6,o[2]=128|63&a):a>128?(o[0]=192|(1984&a)>>>6,o[1]=128|63&a):o[0]=a,this.parsedData.push(o)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}e.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},o.prototype={addData:function(t){var r=new e(t);this.dataList.push(r),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[r][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=p.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var i=0;i<this.modules.length;i++)for(var a=1*i,n=0;n<this.modules[i].length;n++){var s=1*n;this.modules[i][n]&&(o.beginFill(0,100),o.moveTo(s,a),o.lineTo(s+1,a),o.lineTo(s+1,a+1),o.lineTo(s,a+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=p.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],i=t[r];if(null==this.modules[o][i])for(var a=-2;a<=2;a++)for(var n=-2;n<=2;n++)this.modules[o+a][i+n]=-2==a||2==a||-2==n||2==n||0==a&&0==n}},setupTypeNumber:function(t){for(var e=p.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++){o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=p.getBCHTypeInfo(r),i=0;i<15;i++){var a=!t&&1==(o>>i&1);i<6?this.modules[i][8]=a:i<8?this.modules[i+1][8]=a:this.modules[this.moduleCount-15+i][8]=a}for(i=0;i<15;i++){a=!t&&1==(o>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=a:i<9?this.modules[8][15-i-1+1]=a:this.modules[8][15-i-1]=a}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,i=7,a=0,n=this.moduleCount-1;n>0;n-=2)for(6==n&&n--;;){for(var s=0;s<2;s++)if(null==this.modules[o][n-s]){var h=!1;a<t.length&&(h=1==(t[a]>>>i&1)),p.getMask(e,o,n-s)&&(h=!h),this.modules[o][n-s]=h,-1==--i&&(a++,i=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,r){for(var i=_.getRSBlocks(t,e),a=new C,n=0;n<r.length;n++){var s=r[n];a.put(s.mode,4),a.put(s.getLength(),p.getLengthInBits(s.mode,t)),s.write(a)}var h=0;for(n=0;n<i.length;n++)h+=i[n].dataCount;if(a.getLengthInBits()>8*h)throw new Error("code length overflow. ("+a.getLengthInBits()+">"+8*h+")");for(a.getLengthInBits()+4<=8*h&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*h||(a.put(o.PAD0,8),a.getLengthInBits()>=8*h));)a.put(o.PAD1,8);return o.createBytes(a,i)},o.createBytes=function(t,e){for(var r=0,o=0,i=0,a=new Array(e.length),n=new Array(e.length),s=0;s<e.length;s++){var h=e[s].dataCount,l=e[s].totalCount-h;o=Math.max(o,h),i=Math.max(i,l),a[s]=new Array(h);for(var u=0;u<a[s].length;u++)a[s][u]=255&t.buffer[u+r];r+=h;var c=p.getErrorCorrectPolynomial(l),d=new v(a[s],c.getLength()-1).mod(c);n[s]=new Array(c.getLength()-1);for(u=0;u<n[s].length;u++){var f=u+d.getLength()-n[s].length;n[s][u]=f>=0?d.get(f):0}}var g=0;for(u=0;u<e.length;u++)g+=e[u].totalCount;var m=new Array(g),_=0;for(u=0;u<o;u++)for(s=0;s<e.length;s++)u<a[s].length&&(m[_++]=a[s][u]);for(u=0;u<i;u++)for(s=0;s<e.length;s++)u<n[s].length&&(m[_++]=n[s][u]);return m};for(var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},a={L:1,M:0,Q:3,H:2},n=0,s=1,h=2,l=3,u=4,c=5,d=6,f=7,p={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;p.getBCHDigit(e)-p.getBCHDigit(p.G15)>=0;)e^=p.G15<<p.getBCHDigit(e)-p.getBCHDigit(p.G15);return(t<<10|e)^p.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;p.getBCHDigit(e)-p.getBCHDigit(p.G18)>=0;)e^=p.G18<<p.getBCHDigit(e)-p.getBCHDigit(p.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return p.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case n:return(e+r)%2==0;case s:return e%2==0;case h:return r%3==0;case l:return(e+r)%3==0;case u:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case c:return e*r%2+e*r%3==0;case d:return(e*r%2+e*r%3)%2==0;case f:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new v([1],0),r=0;r<t;r++)e=e.multiply(new v([1,g.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:case i.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var i=0;i<e;i++){for(var a=0,n=t.isDark(o,i),s=-1;s<=1;s++)if(!(o+s<0||e<=o+s))for(var h=-1;h<=1;h++)i+h<0||e<=i+h||0==s&&0==h||n==t.isDark(o+s,i+h)&&a++;a>5&&(r+=3+a-5)}for(o=0;o<e-1;o++)for(i=0;i<e-1;i++){var l=0;t.isDark(o,i)&&l++,t.isDark(o+1,i)&&l++,t.isDark(o,i+1)&&l++,t.isDark(o+1,i+1)&&l++,0!=l&&4!=l||(r+=3)}for(o=0;o<e;o++)for(i=0;i<e-6;i++)t.isDark(o,i)&&!t.isDark(o,i+1)&&t.isDark(o,i+2)&&t.isDark(o,i+3)&&t.isDark(o,i+4)&&!t.isDark(o,i+5)&&t.isDark(o,i+6)&&(r+=40);for(i=0;i<e;i++)for(o=0;o<e-6;o++)t.isDark(o,i)&&!t.isDark(o+1,i)&&t.isDark(o+2,i)&&t.isDark(o+3,i)&&t.isDark(o+4,i)&&!t.isDark(o+5,i)&&t.isDark(o+6,i)&&(r+=40);var u=0;for(i=0;i<e;i++)for(o=0;o<e;o++)t.isDark(o,i)&&u++;return r+=10*(Math.abs(100*u/e/e-50)/5)}},g={glog:function(t){if(t<1)throw new Error("glog("+t+")");return g.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return g.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},m=0;m<8;m++)g.EXP_TABLE[m]=1<<m;for(m=8;m<256;m++)g.EXP_TABLE[m]=g.EXP_TABLE[m-4]^g.EXP_TABLE[m-5]^g.EXP_TABLE[m-6]^g.EXP_TABLE[m-8];for(m=0;m<255;m++)g.LOG_TABLE[g.EXP_TABLE[m]]=m;function v(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function _(t,e){this.totalCount=t,this.dataCount=e}function C(){this.buffer=[],this.length=0}v.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=g.gexp(g.glog(this.get(r))+g.glog(t.get(o)));return new v(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=g.glog(this.get(0))-g.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=g.gexp(g.glog(t.get(o))+e);return new v(r,0).mod(t)}},_.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],_.getRSBlocks=function(t,e){var r=_.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,i=[],a=0;a<o;a++)for(var n=r[3*a+0],s=r[3*a+1],h=r[3*a+2],l=0;l<n;l++)i.push(new _(s,h));return i},_.getRsBlockTable=function(t,e){switch(e){case a.L:return _.RS_BLOCK_TABLE[4*(t-1)+0];case a.M:return _.RS_BLOCK_TABLE[4*(t-1)+1];case a.Q:return _.RS_BLOCK_TABLE[4*(t-1)+2];case a.H:return _.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},C.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var y=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function w(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var r=e.toString().match(/android ([0-9]\.[0-9])/i);r&&r[1]&&(t=parseFloat(r[1]))}return t}var D=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){var e=this._htOption,r=this._el,o=t.getModuleCount();Math.floor(e.width/o),Math.floor(e.height/o);function i(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg",t);for(var o in e)e.hasOwnProperty(o)&&r.setAttribute(o,e[o]);return r}this.clear();var a=i("svg",{viewBox:"0 0 "+String(o)+" "+String(o),width:"100%",height:"100%",fill:e.colorLight});a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),r.appendChild(a),a.appendChild(i("rect",{fill:e.colorLight,width:"100%",height:"100%"})),a.appendChild(i("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(var n=0;n<o;n++)for(var s=0;s<o;s++)if(t.isDark(n,s)){var h=i("use",{x:String(s),y:String(n)});h.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),a.appendChild(h)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),A="svg"===document.documentElement.tagName.toLowerCase()?D:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,r=this._el,o=t.getModuleCount(),i=Math.floor(e.width/o),a=Math.floor(e.height/o),n=['<table style="border:0;border-collapse:collapse;">'],s=0;s<o;s++){n.push("<tr>");for(var h=0;h<o;h++)n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+i+"px;height:"+a+"px;background-color:"+(t.isDark(s,h)?e.colorDark:e.colorLight)+';"></td>');n.push("</tr>")}n.push("</table>"),r.innerHTML=n.join("");var l=r.childNodes[0],u=(e.width-l.offsetWidth)/2,c=(e.height-l.offsetHeight)/2;u>0&&c>0&&(l.style.margin=c+"px "+u+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function e(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(t._android&&t._android<=2.1){var r=1/window.devicePixelRatio,o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,e,i,a,n,s,h,l,u){if("nodeName"in t&&/img/i.test(t.nodeName))for(var c=arguments.length-1;c>=1;c--)arguments[c]=arguments[c]*r;else void 0===l&&(arguments[1]*=r,arguments[2]*=r,arguments[3]*=r,arguments[4]*=r);o.apply(this,arguments)}}var i=function(t,e){this._bIsPainted=!1,this._android=w(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return i.prototype.draw=function(t){var e=this._elImage,r=this._oContext,o=this._htOption,i=t.getModuleCount(),a=o.width/i,n=o.height/i,s=Math.round(a),h=Math.round(n);e.style.display="none",this.clear();for(var l=0;l<i;l++)for(var u=0;u<i;u++){var c=t.isDark(l,u),d=u*a,f=l*n;r.strokeStyle=c?o.colorDark:o.colorLight,r.lineWidth=1,r.fillStyle=c?o.colorDark:o.colorLight,r.fillRect(d,f,a,n),r.strokeRect(Math.floor(d)+.5,Math.floor(f)+.5,s,h),r.strokeRect(Math.ceil(d)-.5,Math.ceil(f)-.5,s,h)}this._bIsPainted=!0},i.prototype.makeImage=function(){this._bIsPainted&&function(t,e){var r=this;if(r._fFail=e,r._fSuccess=t,null===r._bSupportDataURI){var o=document.createElement("img"),i=function(){r._bSupportDataURI=!1,r._fFail&&r._fFail.call(r)};return o.onabort=i,o.onerror=i,o.onload=function(){r._bSupportDataURI=!0,r._fSuccess&&r._fSuccess.call(r)},void(o.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===r._bSupportDataURI&&r._fSuccess?r._fSuccess.call(r):!1===r._bSupportDataURI&&r._fFail&&r._fFail.call(r)}.call(this,e)},i.prototype.isPainted=function(){return this._bIsPainted},i.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},i.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},i}();function L(t,e){for(var r=1,o=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),i=0,n=y.length;i<=n;i++){var s=0;switch(e){case a.L:s=y[i][0];break;case a.M:s=y[i][1];break;case a.Q:s=y[i][2];break;case a.H:s=y[i][3]}if(o<=s)break;r++}if(r>y.length)throw new Error("Too long data");return r}(r=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:a.H},"string"==typeof e&&(e={text:e}),e)for(var r in e)this._htOption[r]=e[r];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(A=D),this._android=w(),this._el=t,this._oQRCode=null,this._oDrawing=new A(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)}).prototype.makeCode=function(t){this._oQRCode=new o(L(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},r.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},r.prototype.clear=function(){this._oDrawing.clear()},r.CorrectLevel=a}(window),e.default=r}])},t.exports=o()}});
//# sourceMappingURL=6.17f628c47e9bab2a9249.js.map