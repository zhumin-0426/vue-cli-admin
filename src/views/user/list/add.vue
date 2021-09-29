<template>
  <div class="adduser">
    <el-card class="adduser-card">
      <div slot="header" class="adduser-header">
        <span>添加用户</span>
      </div>
      <div class="main">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="250px"
          class="demo-ruleForm"
        >
          <div class="user-name ipt-wid">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>
          <div class="user-name ipt-wid">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </div>
          <div class="user-name ipt-wid">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="ruleForm.passWord"></el-input>
            </el-form-item>
          </div>
          <div class="user-pic ipt-wid">
            <el-form-item label="头像" prop="userpic">
              <el-upload
                class="avatar-uploader"
                action="http://lb3.28888753.cn/b/getusers/uploadfile_users"
                :data="pdfData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div class="user-gender ipt-wid">
            <el-form-item label="角色" prop="role">
              <el-select v-model="ruleForm.role" placeholder="请选择角色">
                <el-option
                  :label="roleItem.roleName"
                  :value="roleItem.id"
                  v-for="roleItem in roleData"
                  :key="roleItem.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid">
            <el-form-item label="开户限定" prop="openAccLimit">
              <!-- <el-input v-model="ruleForm.openAccLimit"></el-input> -->
              <el-select v-model="ruleForm.openAccLimit" placeholder="请选择">
                <el-option
                  v-for="item in openUserLimit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid" v-if="ruleForm.openAccLimit=='1'">
            <el-form-item label="开户数" prop="openAccNum">
              <el-input v-model="ruleForm.openAccNum"></el-input>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid">
            <el-form-item label="商户类型" prop="busType" required>
              <el-select v-model="ruleForm.busType" placeholder="请选择">
                <el-option
                  v-for="item in busTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid">
            <el-form-item label="区域" prop="scopAdr">
              <el-select v-model="ruleForm.scopAdr" placeholder="请选择">
                <el-option
                  v-for="item in scopAdrOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="user-address ipt-wid" v-if="ruleForm.scopAdr=='2'">
            <el-form-item label="省，市，区" prop="address" required>
              <el-cascader
                v-model="ruleForm.address"
                @change="adrlist"
                :options="options"
                :props="props"
                clearable
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid">
            <el-form-item label="开户时间" prop="openAccTime">
              <el-date-picker v-model="ruleForm.openAccTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </div>
          <div class="user-phone ipt-wid">
            <el-form-item label="截止时间" prop="endTime">
              <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        passWord: "",
        role: "",
        images: "",
        openAccNum: "",
        busType: "",
        address: "",
        openAccTime: "",
        endTime: "",
        openAccLimit: "",
        selAdr: "",
        scopAdr: "",
      },
      roleData: [],
      imageUrl: "",
      pdfData: {
        uid: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        passWord: [
          { required: true, message: "请输入登入密码", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号格式错误", trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        openAccNum: [
          { required: true, message: "请输入开户数", trigger: "blur" },
        ],
        busType: [
          { required: true, message: "请输入商户类型", trigger: "blur" },
        ],
        scopAdr: [{ required: true, message: "请设置区域", trigger: "blur" }],
        openAccTime: [
          { required: true, message: "请选择开户时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择截止时间", trigger: "blur" },
        ],
        openAccLimit: [
          { required: true, message: "请输入开户限定", trigger: "blur" },
        ],
      },
      options: [],
      busTypeOpt: [
        {
          value: "1",
          label: "个人",
        },
        {
          value: "2",
          label: "企业",
        },
      ],
      scopAdrOpt: [
        {
          value: "1",
          label: "全国",
        },
        {
          value: "2",
          label: "规定区域",
        },
      ],
      openUserLimit: [
        {
          value: "1",
          label: "限定开户数",
        },
        {
          value: "2",
          label: "不限定开户数",
        },
      ],
    };
  },
  created() {
    this.addressList();
    this.roleList();
  },
  methods: {
    // 角色列表
    roleList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.roleList.roleList, params, true)
        .then((result) => {
          console.log("角色列表", result);
          if (result.data.state == "success") {
            this.roleData = result.data.getroleList;
          }
          console.log(this.roleData);
        });
    },
    // 获取地区列表
    addressList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.addressList.addressList, params, true)
        .then((result) => {
          console.log("地区列表", result);
          if (result.data.state == "success") {
            var list = result.data.getCnRegionInfoVOList;
            var objList = {
              value: 1,
              label: "江西",
              children: [
                {
                  value: 2,
                  label: "九江市",
                  children: [{ value: 3, label: "修水县" }],
                },
              ],
            };
            var arr_i = [];
            for (var i = 0; i < list.length; i++) {
              var arr_p = [];
              for (var p = 0; p < list[i].cnRegionInfoVOList.length; p++) {
                var arr_x = [];
                for (
                  var x = 0;
                  x < list[i].cnRegionInfoVOList[p].cnRegionInfoVOList.length;
                  x++
                ) {
                  arr_x.push({
                    value:
                      list[i].cnRegionInfoVOList[p].cnRegionInfoVOList[x]
                        .cRINAME,
                    label:
                      list[i].cnRegionInfoVOList[p].cnRegionInfoVOList[x]
                        .cRINAME,
                  });
                }
                arr_p.push({
                  value: list[i].cnRegionInfoVOList[p].cRINAME,
                  label: list[i].cnRegionInfoVOList[p].cRINAME,
                  children: arr_x,
                });
              }
              arr_i.push({
                value: list[i].cRINAME,
                label: list[i].cRINAME,
                children: arr_p,
              });
            }
            this.options = arr_i;
          }
        });
    },
    adrlist: function () {
      var str = "";
      for (var i = 0; i < this.ruleForm.address.length; i++) {
        str += this.ruleForm.address[i] + "$";
      }
      this.ruleForm.selAdr = str
        .split(",")
        .join("/")
        .split("$")
        .join(",")
        .substr(0, str.length - 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams();
          let phone = this.ruleForm.phone;
          params.append("usersPhones", phone);
          this.$http
            .post(this.$api.phoneSearch.phoneSearch, params, true)
            .then((result) => {
              console.log("电话查询", result);
              if (result.data.msg == "n") {
                const params = new URLSearchParams();
                params.append("uid", localStorage.getItem("uid"));
                params.append("usersName", this.ruleForm.name);
                params.append("images", this.ruleForm.images);
                params.append("usersPhone", this.ruleForm.phone);
                params.append("usersPwd", this.ruleForm.passWord);
                params.append("role", this.ruleForm.role);
                params.append("limitNum", this.ruleForm.openAccNum);
                params.append("merchantType", this.ruleForm.busType);
                params.append("region", this.ruleForm.scopAdr);
                params.append("region_province_city", this.ruleForm.selAdr);
                params.append(
                  "usersStartTime",
                  this.getTime(new Date(this.ruleForm.openAccTime))
                );
                params.append(
                  "usersEndTime",
                  this.getTime(new Date(this.ruleForm.endTime))
                );
                params.append("limitType", this.ruleForm.openAccLimit);
                this.$http
                  .post(this.$api.usersAdd.usersAdd, params, true)
                  .then((result) => {
                    console.log("添加用户", result);
                    if (result.data.state == "success") {
                      this.successMsg();
                      this.$router.push({
                        path: "/users/list",
                      });
                    }
                  });
              } else {
                this.errorMsg();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      console.log("file", file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.images = file.response.url;
    },
    // beforeAvatarUpload(file) {
    //   let uid = localStorage.getItem("uid");
    //   this.pdfData = {
    //     uid: uid,
    //   };
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
    //时间格式化
    getTime(dt) {
      var year = dt.getFullYear(); //年
      var month = dt.getMonth() + 1; //月
      var date = dt.getDate(); //日
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      var str = year + "-" + month + "-" + date;
      return str;
    },
    successMsg() {
      this.$message("用户添加成功");
    },
    errorMsg() {
      this.$message.error("该号码已注册");
    },
  },
};
</script>

<style>
/* 头像上传 */
.adduser .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.adduser .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.adduser .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.adduser .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>