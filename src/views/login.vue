<template>
  <div class="login_warpper">
    <header>
      <div class="center">
        <div class="logo">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="tag">
          <span>[一码多扫，红包裂变]</span>
        </div>
      </div>
    </header>
    <section>
      <div class="center">
          <div class="tag-img">
            <img src="../assets/images/login.png" alt="" />
          </div>
          <div class="login">
              <div class="title">拓客汇后台管理系统</div>
              <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
                <div class="account">
                  <el-form-item prop="usersPhone">
                    <el-input
                      v-model="ruleForm.usersPhone"
                      placeholder="账号"
                      prefix-icon="iconfont icon-yonghu"
                      @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="password">
                  <el-form-item prop="usersPwd">
                    <el-input
                      placeholder="密码"
                      v-model="ruleForm.usersPwd"
                      prefix-icon="iconfont icon-mima"
                      show-password
                      @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="loginCode">
                  <Identify :identifyCode="identifyCode"></Identify>
                  <el-form-item prop="code">
                    <el-input
                      @keyup.enter.native="submitForm('ruleForm')"
                      v-model="ruleForm.code"
                      placeholder="请输入验证码"
                    ></el-input>
                  </el-form-item>
                </div>
                <el-button
                  class="login-btn"
                  @keyup.enter="submitForm('ruleForm')"
                  @click="submitForm('ruleForm')"
                  type="primary"
                  :loading="loading"
                  >登入</el-button
                >
              </el-form>
              <div class="wx" @click="wxLogin">
                <span class="line-left"></span>
                <i class="iconfont icon-weixin"></i>
                <span class="line-right"></span>
              </div>
          </div>
      </div>
    </section>
    <!-- 尾部 -->
    <footer class="footer">Copyright 2014-2020 顺的网络. All Rights Reserved</footer>
  </div>
</template>

<script scoped>
import Identify from "../components/Identify.vue";
import Events from "../assets/js/events";
export default {
  components: {
    Identify,
  },
  inject: ["reload"],
  data() {
    return {
      ruleForm: {
        usersPhone: "",
        usersPwd: "",
        code: "",
      },
      rules: {
        usersPhone: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
        ],
        usersPwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      loading: false,
      // 验证码初始值
      identifyCode: "1234",
      // 验证码的随机取值范围
      identifyCodes: "1234567890",
    };
  },
  mounted() {
    // 刷新页面就生成随机验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {},
  methods: {
    // 点击验证码刷新验证码
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
    //form表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let [code, identifyCode, usersPhone, usersPwd] = [
            this.ruleForm.code,
            this.identifyCode,
            this.ruleForm.usersPhone,
            this.ruleForm.usersPwd,
          ];
          if (code != identifyCode) {
            // 判断验证码是否正确
            Events.errPrompt(this.$message.error("验证码输入错误"));
            this.reload();
          } else {
            this.loading = true;
            const params = new URLSearchParams();
            params.append("usersPhone", usersPhone);
            params.append("usersPwd", usersPwd);
            this.$http
              .post(this.$api.userLogin.userLogin, params, true)
              .then((result) => {
                if (result.data.state == "success") {
                  console.log("登入", result);
                  // 授权判断
                  if (result.data.getUsersVO.gOpenid) {
                    localStorage.setItem(
                      "openid",
                      result.data.getUsersVO.gOpenid
                    );
                  } else if (result.data.getUsersVO.gOpenid == null) {
                    localStorage.removeItem("openid");
                  } else {
                    localStorage.removeItem("openid");
                  }
                  // 存储用户信息
                  localStorage.setItem("uid", result.data.getUsersVO.id);
                  localStorage.setItem(
                    "usersName",
                    result.data.getUsersVO.usersName
                  );
                  localStorage.setItem(
                    "usersPhone",
                    result.data.getUsersVO.usersPhone
                  );
                  localStorage.setItem("role", result.data.getUsersVO.role);
                  this.loading = false;
                  // 清除编辑记录
                  localStorage.removeItem("newActsetData");
                  localStorage.removeItem("newRelatedSetData");
                  this.$router.push({
                    path: "/index",
                  });
                } else {
                  this.loading = false;
                  Events.errPrompt(this.$message.error("查询不到该用户信息"));
                  this.reload();
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    // 微信登入
    wxLogin() {
      this.$confirm("正在使用微信登入, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Events.msgPrompt(this.$message("该功能还未添加"));
        })
        .catch(() => {
          Events.msgPrompt(this.$message("取消微信登入"));
        });
    },
  },
};
</script>
<style scoped>
header {
  height: 80px;
}
 header .center {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 1100px;
  margin: 0 auto;
}
header .center .logo {
  width: 240px;
  align-self: center;
}
.center .logo img {
  width: 100%;
}
header .center .tag {
  align-self: center;
}
.center .tag span {
  font-size: 19px;
  color: #4a4a4a;
  font-weight: 700;
}

section {
  height: calc(100vh - 110px);
  background: linear-gradient(90deg, #a6ffcb, #12d8fa, #1fa2ff);
}
section .center {
  display: flex;
  justify-content: space-between;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
}
section .center .tag-img {
  align-self: center;
  box-sizing: border-box;
  padding: 20px;
  width: 40%;
  border-radius: 4px;
  background-color: #ffffff;
}
.center .tag-img img {
  max-width: 100%;
  max-height: 100%;
}

section .login {
  align-self: center;
  box-sizing: border-box;
  padding: 30px;
  width: 40%;
  background-color: #ffffff;
  border-radius: 4px;
}
.login .title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  color: #409eff;
}
.login .account {
  margin: 20px 0;
}
.login .account .iconfont,.password .iconfont {
  color: #409eff;
}
 .login .loginCode {
  display: flex;
  margin: 20px 0 18px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
 .login .loginCode .el-input__inner {
  border: none;
}
.login .login-btn {
  width: 100%;
}
 .login .wx {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 45px;
}
 .login .wx span {
  display: block;
  width: 33%;
  height: 1px;
  background-color: #409eff;
}
 .login .wx .iconfont {
  font-size: 32px;
  margin: 0 35px;
  color: #409eff;
  cursor: pointer;
}
 /*.el-form-item {
  margin-bottom: 0 !important;
}*/
</style>