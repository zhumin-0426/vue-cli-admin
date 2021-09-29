<template>
  <div class="password">
    <el-form :model="form" :rules="rules" ref="form" label-width="250px">
      <el-card class="box-card">
        <!-- 当前密码 -->
        <div class="now-password block">
          <el-form-item label="当前密码" prop="nowPas">
            <el-input
              placeholder="密码长度8-16位包含数字和字母"
              v-model="form.nowPas"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <!-- 新密码 -->
        <div class="new-password block">
          <el-form-item label="新密码" prop="newPas">
            <el-input
              placeholder="请输入新密码"
              v-model="form.newPas"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <!-- 确认密码 -->
        <div class="confirm-password block">
          <el-form-item label="确认密码" prop="relPas">
            <el-input
              placeholder="确认密码"
              v-model="form.relPas"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <div class="btn">
          <el-button type="primary" @click="formSubmit('form')"
            >修改密码</el-button
          >
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import Events from "../../assets/js/events";
export default {
  data() {
    return {
      form: {
        nowPas: "",
        newPas: "",
        relPas: "",
      },
      rules: {
        nowPas: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPas: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        relPas: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    formSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.newPas !== this.form.relPas) {
            Events.sucPrompt(
              this.$message({
                showClose: true,
                message: "两次密码不一致",
                type: "error",
              })
            );
          } else {
            let [uid, pwd, pwd_new] = [
              localStorage.getItem("uid"),
              this.form.nowPas,
              this.form.newPas,
            ];
            const params = new URLSearchParams();
            params.append("uid", uid);
            params.append("pwd", pwd);
            params.append("pwd_new", pwd_new);
            this.$http
              .post(this.$api.upPassword.upPassword, params, true)
              .then((result) => {
                if (result.data.state == "nosuccess") {
                  Events.sucPrompt(
                    this.$message({
                      showClose: true,
                      message: result.data.reason,
                      type: "error",
                    })
                  );
                } else {
                  Events.sucPrompt(
                    this.$message({
                      showClose: true,
                      message: "恭喜您，修改密码成功",
                      type: "success",
                    })
                  );
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    errMsg(txt) {
      this.$message.error(txt);
    },
  },
};
</script>

<style scoped>
.password .now-password .el-input {
  width: 300px;
}
.password .new-password .el-input {
  width: 300px;
}
.password .confirm-password .el-input {
  width: 300px;
}
.password .btn {
  box-sizing: border-box;
  width: 100%;
  padding-left: 250px;
  width: 300px;
}
</style>