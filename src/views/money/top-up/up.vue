<template>
  <div class="create">
    <el-card class="create-warpper" v-if="isActive==1">
      <div slot="header" class="create-header">
        <div>充值</div>
        <span>(在线充值微信公众平台将收取1%的手续费)</span>
      </div>
      <div class="main">
        <el-form
          :model="payForm"
          :rules="rules"
          ref="payForm"
          label-width="250px"
        >
          <!-- 金额 -->
          <div class="money">
            <el-form-item label="金额" prop="money">
              <el-input v-model="payForm.money"></el-input>
            </el-form-item>
          </div>
          <div class="prompt">（在线充值金额为100~1000元）</div>
          <div class="submit-btn" >
            <el-button type="primary" @click="submitForm('ruleForm')">充值</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card class="create-warpper1" v-else>
      <div slot="header" class="create-header">
        <span>收银台</span>
      </div>
      <div class="create-content">
        <div class="box">
          <div class="left">
            <ul>
              <li>
                <span>订单编号：</span>
                <span>{{orderNum}}</span>
              </li>
              <li>
                <span>订单类型：</span>
                <span>充值</span>
              </li>
              <li>
                <span>订单金额：</span>
                <span>￥{{payForm.money}}.00</span>
              </li>
            </ul>
          </div>
          <div class="right">
            <span>应付金额：</span>
            <span>¥</span>
            <span style="font-size:25px;font-weight:bold">{{payForm.money}}.00</span>
          </div>
        </div>
      </div>
      <div class="create-footer">
        <div class="box">
          <div class="wxpay">
            <img src="/static/images/wxpay-icon.png" alt="">
          </div>
          <div class="wxpay-code">
            <div class="code" id="code"></div>
            <img src="/static/images/code-icon.png" alt />
            <div class="btn" style="display: flex;justify-content: space-between;">
              <router-link to="/funds/payment">
                  <el-button size="small">关闭订单</el-button>
              </router-link>
              <router-link to="/funds/payment">
                  <el-button type="primary" size="small">支付成功</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcode2';
export default {
  components: {QRCode},
  data() {
    return {
      // 充值
      isActive: 1,
      payForm: {
        money:"1000"
      },
      rules: {
        money: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ]
      },
      // 支付
      cid:"",
      orderNum:""
    };
  },
  created(){
  },
  methods: {
    payMentDel:function(){
        const params = new URLSearchParams();
        params.append("uid", localStorage.getItem("uid"));
        params.append("cid", this.cid);
        this.$http.post(this.$api.payMentDel.payMentDel,params,true).then(result=>{
          console.log("支付详情",result);
          this.orderNum = result.data.getrechargeVo.orderNum
        })
    },
    submitForm: function() {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("orderMoney", this.payForm.money);
      // if(orderMoney<100 || orderMoney>1000){
      //     orderMoney =1000;
      // }
      this.$http.post(this.$api.openPay.openPay,params,true).then(result=>{
          console.log("充值",result);
          if(result.data.state=="success"){
              console.log("充值成功");
              this.cid = result.data.cid;
              this.isActive+=1;
              this.payMentDel()
              this.payCode()
          }
      })
    },

    payCode:function(){
        const params = new URLSearchParams();
        params.append("uid", localStorage.getItem("uid"));
        params.append("cid", this.cid);
        params.append("moneys", this.payForm.money);
        this.$http.post(this.$api.payCode.payCode,params,true).then(result=>{
          console.log("二维码",result);
          this.qrcodeScan(result.data.urlCode);
        })
    },
    qrcodeScan (url) {
			  let qrcode = new QRCode('code', {  
			      width: 170, 
			      height: 170,
			      text: url
			  })  
		},
  }
};
</script>

<style scoped>
.create .create-warpper .create-header {
  display: flex;
  align-items: center;
}
.create-warpper .create-header span {
  color: #e6a23c;
  font-size: 12px;
  margin-left: 10px;
}
.main .money .el-input {
  width: 300px;
}
.main .submit-btn {
  padding-left: 250px;
}
.create-warpper1 .create-content {
  width: 100%;
  background: #efefef;
}
.create-warpper1 .create-content .box {
  box-sizing: border-box;
  width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.create-content .box .left {
  width: 50%;
}
.left ul li span {
  line-height: 30px;
  font-size: 13.5px;
}
.create-content .box .right {
  width: 50%;
  text-align: right;
}
.box .right span {
  line-height: 30px;
  font-size: 13.5px;
}
.create-footer .box {
  width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
}
.create-footer .box .wxpay {
  width: 250px;
  margin-right: 30px;
}
.box .wxpay img {
  width: 100%;
}
.create-footer .box .wxpay-code {
  width: 170px;
}
.box .wxpay-code img {
  width: 100%;
  margin: 10px 0;
}
</style>