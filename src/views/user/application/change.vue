<template>
  <div class="changeAppMsg">
    <el-card class="addappmsg-card">
      <div class="tip">
        <div class="title">
          <div class="line"></div>
          <div class="txt">添加应用数据</div>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="250px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户id" prop="usersId">
          <el-input v-model="ruleForm.usersId" disabled></el-input>
        </el-form-item>
        <el-form-item label="小程序id" prop="xAppId">
          <el-input v-model="ruleForm.xAppId" placeholder="请输入小程序id"></el-input>
        </el-form-item>
        <el-form-item label="小程序secret" prop="xAppSecret">
          <el-input v-model="ruleForm.xAppSecret" placeholder="请输入小程序secret"></el-input>
        </el-form-item>
        <el-form-item label="公众号id" prop="gzAppId">
          <el-input v-model="ruleForm.gzAppId" placeholder="请输入公众号id"></el-input>
        </el-form-item>
        <el-form-item label="公众号secret" prop="gzAppSecret">
          <el-input v-model="ruleForm.gzAppSecret" placeholder="请输入公众号secret"></el-input>
        </el-form-item>
        <el-form-item label="商户号" prop="mchId">
          <el-input v-model="ruleForm.mchId" placeholder="请输入商户号"></el-input>
        </el-form-item>
        <el-form-item label="kay" prop="wxKey">
          <el-input v-model="ruleForm.wxKey" placeholder="请输入kay"></el-input>
        </el-form-item>
        <el-form-item label="paths文件" prop="paths">
          <el-input v-model="ruleForm.paths" placeholder="请上传文件">
            <template slot="append">
              <div class="btn">
                <el-button type="info">选择文件</el-button>
                <input type="file" name="sharePic" @change="handleFileChange" ref="inputer" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Events from "../../../assets/js/events";
export default {
  data() {
    return {
      ruleForm: {
        usersId: "",
        xAppId: "",
        xAppSecret: "",
        gzAppId: "",
        gzAppSecret: "",
        mchId: "",
        wxKey: "",
        paths: "",
      },
      rules: {
        usersId: [{ required: true, message: "请设置用户id", trigger: "blur" }],
        gzAppId: [
          { required: true, message: "请设置公众号appid", trigger: "blur" },
        ],
        gzAppSecret: [
          { required: true, message: "请设置公众号secret", trigger: "blur" },
        ],
        mchId: [{ required: true, message: "请设置商户号", trigger: "blur" }],
        wxKey: [{ required: true, message: "请设置kay", trigger: "blur" }],
        paths: [
          { required: true, message: "请上传paths文件", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.originData();
    this.ruleForm.usersId = localStorage.getItem('uid');
  },
  methods: {
    originData: function () {
      let id = this.$route.query.id;
      const params = new URLSearchParams();
      params.append("id", id);
      this.$http
        .post(this.$api.changeOriginAppData.changeOriginAppData, params, true)
        .then((result) => {
          if(result.data.state=="success"){
                this.ruleForm.usersId = result.data.getUsersDateVO.usersId;
                this.ruleForm.xAppId = result.data.getUsersDateVO.xAppId
                this.ruleForm.xAppSecret = result.data.getUsersDateVO.xAppSecret
                this.ruleForm.gzAppId = result.data.getUsersDateVO.gzAppId
                this.ruleForm.gzAppSecret = result.data.getUsersDateVO.gzAppSecret
                this.ruleForm.mchId = result.data.getUsersDateVO.mchId
                this.ruleForm.wxKey = result.data.getUsersDateVO.wxKey
                this.ruleForm.paths = result.data.getUsersDateVO.paths
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleFileChange: function () {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0]; // 通过DOM取文件数据
      let size = Math.floor(this.file.size / 1024); //计算文件的大小
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", this.file); //将file属性添加到formData里
      this.$http
        .post(this.$api.uploadAppFile.uploadAppFile, this.formData, true)
        .then((result) => {
          if(result.data.state=="success"){
              Events.errPrompt(
                  this.$message({
                    message: '恭喜你，文件添加成功',
                    type: 'success'
                  })
              );
              this.ruleForm.paths = result.data.url;
          }
        });
    },
    submitForm:function(formName){
        this.$refs[formName].validate((valid) => {
        if (valid) {
            console.log("aa")
            let id = this.$route.query.id;
            const params = new URLSearchParams();
            params.append("id", id);
            params.append("uid", localStorage.getItem("uid"));
            params.append("usersId", this.ruleForm.usersId);
            params.append("xAppId", this.ruleForm.xAppId);
            params.append("xAppSecret", this.ruleForm.xAppSecret);
            params.append("gzAppId", this.ruleForm.gzAppId);
            params.append("gzAppSecret", this.ruleForm.gzAppSecret);
            params.append("mchId", this.ruleForm.mchId);
            params.append("wxKey", this.ruleForm.wxKey);
            params.append("paths", this.ruleForm.paths);
            this.$http.post(this.$api.changeAppMsg.changeAppMsg,params,true).then(result=>{
                console.log("修改数据",result)
              if(result.data.state=="success"){
                Events.errPrompt(
                  this.$message({
                    message: '恭喜你，应用数据修改成功',
                    type: 'success'
                  })
                );
                this.$router.push({
                  path:"/user/appmsg"
                })
              }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

};
</script>

<style scoped>
.btn {
  position: relative;
}
.btn input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>