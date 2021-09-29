<template>
  <div class="opencash">
    <el-card class="opencash-warpper">
      <div slot="header" class="opencash-header">
        <span>提现申请</span>
      </div>
      <div class="main">
        <el-form :model="openCashData" :rules="rules" ref="openCashData" label-width="250px">
          <!-- 剩余金额 -->
          <div class="residue-money">
            <div class="residue-money-tip">剩余金额</div>
            <div class="num">{{userMessage.smallChange_money_show}}元</div>
          </div>
          <!-- 提现金额 -->
          <div class="whd-money" style="margin-bottom:20px">
            <el-form-item label="提现金额" prop="money">
              <el-input v-model="openCashData.money"></el-input>
            </el-form-item>
          </div>
          <div class="prompt">每笔提取金额最低1元，最高500元，提现手续费为1%。（注：手续费会根据微信提现规则进行调整）</div>
          <!-- 提现方式 -->
          <div class="whd-type">
            <el-form-item label="提现方式" prop="openCashType" required>
              <el-radio label="1" v-model="openCashData.openCashType">微信</el-radio>
            </el-form-item>
          </div>
          <!-- 选择微信号 -->
          <!-- <div class="sel-wx" style="margin-bottom:20px">
            <el-form-item label="选择微信号" required>
              <el-select v-model="openCashData.selWx" placeholder="请选择微信号">
                <el-option label="区域一" value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>-->
          <!-- 姓名 -->
          <div class="sel-wx" style="margin-bottom:20px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="openCashData.name"></el-input>
            </el-form-item>
          </div>
          <div class="prompt">*请输入微信实名认证姓名</div>
          <!-- 电话 -->
          <div class="phone block" style="margin-bottom:20px">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="openCashData.phone"></el-input>
            </el-form-item>
          </div>
          <!-- 微信 -->
          <div class="phone" style="margin-bottom:20px">
            <el-form-item label="微信号" prop="wx">
              <el-input v-model="openCashData.wx"></el-input>
            </el-form-item>
          </div>
          <div class="submit-btn">
            <el-button type="primary" @click="submitForm('openCashData')">提交申请</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Events from "../../../assets/js/events";
export default {
  data() {
    return {
      isActive: "1",
      openCashData: {
        money: "",
        openCashType: "1",
        selWx: "",
        name: "",
        phone: "",
        wx: "",
      },
      rules: {
        money: [
          { required: true, message: "请输入提现金额", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        phone: [
          { required: true, message: "请输入电话", trigger: "change" },
          { min: 11, max: 11, message: "电话号码格式不正确", trigger: "blur" },
        ],
        wx: [{ required: true, message: "请输入微信号", trigger: "change" }],
      },
      //
      props: { multiple: true },
      userMessage: "",
    };
  },
  created() {
    this.orgin();
    this.userMsg();
  },
  methods: {
    // 获取个人金额
    userMsg: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("upUid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.userMsg.userMsg, params, true)
        .then((result) => {
          if ((result.data.state = "success")) {
            this.userMessage = result.data.getUsers;
          }
        });
    },
    orgin: function () {
      var openid = localStorage.getItem("openid");
      if (openid == null) {
        Events.sucPrompt(
          this.$message({
            message: "请绑定您的微信号",
            type: "success",
          })
        );
        this.$router.push({
          path: "/user/wx",
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.openCashData.money > this.userMessage.smallChange_money_show
          ) {
            Events.sucPrompt(this.$message.error("充值金额大于提现金额"));
          } else {
            const params = new URLSearchParams();
            params.append("uid", localStorage.getItem("uid"));
            params.append("usersName", this.openCashData.name);
            params.append("usersPhone", this.openCashData.phone);
            params.append("withdrawalMoney_money_show", this.openCashData.money);
            this.$http
              .post(this.$api.openCash.openCash, params, true)
              .then((result) => {
                if (result.data.state == "success") {
                  Events.sucPrompt(
                    this.$message({
                      message: "恭喜你，提现申请成功",
                      type: "success",
                    })
                  );
                  this.$router.push({
                    path: "/funds/cash",
                  });
                }
              });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.opencash .main .residue-money {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
  color: #606266;
}
.main .residue-money .residue-money-tip {
  width: 238px;
  text-align: right;
  margin-right: 10px;
}
.main .whd-money .el-input {
  width: 300px;
}
.main .sel-wx .el-input {
  width: 300px;
}
.main .phone .el-input {
  width: 300px;
}
.main .submit-btn {
  padding-left: 250px;
}
</style>