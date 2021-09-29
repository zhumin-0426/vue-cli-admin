<template>
  <div class="addcard">
    <el-card class="addcard-card">
      <el-steps
        class="step-line"
        :active="isActive"
        finish-status="success"
        simple
        style="margin-top: 20px"
      >
        <el-step title="卡劵商户信息"></el-step>
        <el-step title="卡劵基础信息"></el-step>
      </el-steps>
      <!-- 卡劵商户信息 -->
      <div class="main" v-if="isActive == 1">
        <el-form :model="ruleForm" ref="ruleForm" :rules="ruleFormRouls">
          <el-form-item prop="busName">
            <el-input
              class="busName"
              v-model="ruleForm.busName"
              placeholder="请输入商户名称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cardPicUrl">
            <div
              class="prompt"
              style="
                padding-left: 0px;
                margin-top: 10px;
                margin-bottom: 26px;
                line-height: 0;
              "
            >
              注：商户名称字数上限为12个汉字，该字段提交后不可更改。
            </div>
            <div class="cardPic">
              <div class="warpper" v-if="ruleForm.cardPicUrl == ''">
                <i class="el-icon-plus"></i>
                <input
                  type="file"
                  name="sharePic"
                  @change="handleFileChange($event)"
                  ref="inputer"
                />
              </div>
              <div class="warpper" v-else>
                <div class="cover">
                  <i class="el-icon-delete" @click="delPic"></i>
                </div>
                <img :src="picurl + ruleForm.cardPicUrl" />
              </div>
            </div>
          </el-form-item>
          <div class="prompt" style="padding-left: 0px">
            注：商户logo建议像素为300*300，大小不能超过1M，图片格式只能为JPG 或
            PNG。
          </div>
          <el-button type="primary" @click="cardBusMsg('ruleForm')"
            >下一步</el-button
          >
        </el-form>
      </div>
      <!-- 卡劵基础信息 -->
      <div class="main-one" v-else>
        <el-form
          :model="carMsgFrom"
          :rules="carMsgFromRules"
          ref="carMsgFrom"
          label-width="250px"
        >
          <el-form-item label="卡劵名称" prop="cardName">
            <el-input
              v-model="carMsgFrom.cardName"
              placeholder="字数上线为9个汉字"
            ></el-input>
          </el-form-item>
          <div class="prompt">
            注：商户logo建议像素为300*300，大小不能超过1M，图片格式只能为JPG 或
            PNG。
          </div>
          <el-form-item label="卡劵背景颜色" prop="cardBagColor">
            <el-select
              v-model="carMsgFrom.cardBagColor"
              placeholder="请选择code码形式"
            >
              <el-option
                v-for="(item, index) in cardBagSel"
                :key="index"
                :label="item.color"
                :value="item.color"
                :style="
                  'background:' + item.color + ';color:#fff;text-align: center;'
                "
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用时间" required prop="actTime">
            <el-date-picker
              v-model="carMsgFrom.actTime"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="卡劵使用说明" prop="state">
            <el-input
              type="textarea"
              v-model="carMsgFrom.state"
              placeholder="字数上线为1024个汉字"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠详情" prop="del">
            <el-input
              type="textarea"
              v-model="carMsgFrom.del"
              placeholder="字数上线为500个汉字"
            ></el-input>
          </el-form-item>
          <el-form-item label="客服电话" prop="serverPhone">
            <el-input
              v-model="carMsgFrom.serverPhone"
              placeholder="最多25个字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="与其他优惠共享">
            <el-switch v-model="carMsgFrom.share"></el-switch>
          </el-form-item>
          <div class="prompt">
            注：默认打开，系统在使用须知里
            拼写“可与其他优惠共享”。关闭时系统将在使用须知里
            拼写“不可与其他优惠共享”。
          </div>
          <el-form-item label="商家服务类型">
            <el-select
              v-model="carMsgFrom.type"
              placeholder="请选择商家服务类型"
            >
              <el-option
                v-for="(item, index) in busType"
                :key="index"
                :label="item.businessServiceTypesName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="prevStep">上一步</el-button>
            <el-button type="primary" @click="cardMsgForm('carMsgFrom')"
              >提交</el-button
            >
          </el-form-item>
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
      picurl: "http://lb3.28888753.cn/imges/",
      isActive: 1,
      // 第一步
      ruleForm: {
        busName: "",
        cardPicUrl: "",
      },
      ruleFormRouls: {
        busName: [
          { required: true, message: "请填写商户名称", trigger: "blur" },
        ],
        cardPicUrl: [
          { required: true, message: "请上传图片", trigger: "blur" },
        ],
      },
      // 第二步
      carMsgFrom: {
        cardName: "",
        cardBagColor: "",
        actTime: [
          // new Date(2000, 10, 10, 10, 10),
          // new Date(2000, 10, 11, 10, 10),
        ],
        state: "",
        del: "",
        serverPhone: "",
        share: "1",
        type: "",
      },
      cardBagSel: [
        {
          color: "#63b359",
          label: "1",
        },
        {
          color: "#2c9f67",
          label: "2",
        },
        {
          color: "#509fc9",
          label: "3",
        },
        {
          color: "#5885cf",
          label: "4",
        },
        {
          color: "#9062c0",
          label: "5",
        },
        {
          color: "#d09a45",
          label: "6",
        },
        {
          color: "#e4b138",
          label: "7",
        },
        {
          color: "#ee903c",
          label: "8",
        },
        {
          color: "#f08500",
          label: "9",
        },
        {
          color: "#a9d92d",
          label: "10",
        },
        {
          color: "#dd6549",
          label: "11",
        },
        {
          color: "#cc463d",
          label: "12",
        },
        {
          color: "#cf3e36",
          label: "13",
        },
        {
          color: "#516671",
          label: "14",
        },
      ],
      busType: [],
      carMsgFromRules: {
        cardName: [
          { required: true, message: "请输入卡劵名称", trigger: "blur" },
        ],
        cardBagColor: [
          { required: true, message: "请选择卡劵背景颜色", trigger: "blur" },
        ],
        actTime: [
          { required: true, message: "请选择使用时间", trigger: "blur" },
        ],
        state: [
          { required: true, message: "请填写卡券使用说明", trigger: "blur" },
        ],
        del: [{ required: true, message: "请填写优惠详情", trigger: "blur" }],
        serverPhone: [
          { required: true, message: "请输入正确的客服电话", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.busTypeFun();
  },
  methods: {
    // 本地上传
    handleFileChange: function () {
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0]; // 通过DOM取文件数据
      let size = Math.floor(this.file.size / 1024); //计算文件的大小
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", this.file); //将file属性添加到formData里
      this.formData.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.cardPic.cardPic, this.formData, true)
        .then((result) => {
          this.ruleForm.cardPicUrl = result.data.url;
        });
    },
    delPic: function () {
      this.ruleForm.cardPicUrl = "";
    },
    cardBusMsg: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isActive += 1;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 商家服务类型
    busTypeFun: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.busTypeUrl.busTypeUrl, params, true)
        .then((result) => {
          console.log("卡劵商家服务类型集合", result);
          if (result.data.state == "success") {
            this.busType = result.data.getcardBusinessServiceTypesVOList;
          }
        });
    },
    // form提交
    cardMsgForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let shareTxt = "2";
          var startTime = this.moment(this.carMsgFrom.actTime[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var endTime = this.moment(this.carMsgFrom.actTime[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          console.log("this.ruleForm.busName", this.ruleForm.busName);
          const params = new URLSearchParams();
          params.append("uid", localStorage.getItem("uid"));
          params.append("businessName", this.ruleForm.busName);
          params.append("images", this.ruleForm.cardPicUrl);
          params.append("cardName", this.carMsgFrom.cardName);
          params.append("cardBackgroundColor", this.carMsgFrom.cardBagColor);
          params.append("startingTime", startTime);
          params.append("endTime", endTime);
          params.append("cardInstructions", this.carMsgFrom.state);
          params.append("offerDetails", this.carMsgFrom.del);
          params.append("customerServicePhone", this.carMsgFrom.serverPhone);
          if (this.ruleForm.share) {
            shareTxt = "1";
          } else {
            shareTxt = "2";
          }
          params.append("share", shareTxt);

          params.append("businessServiceTypes", this.carMsgFrom.type);
          this.$http
            .post(this.$api.addCard.addCard, params, true)
            .then((result) => {
              console.log("添加卡劵第二步", result);
              if (result.data.state == "success") {
                Events.errPrompt(
                  this.$message({
                    message: "恭喜你，添加卡劵成功",
                    type: "success",
                  })
                );
              }
              this.$router.push({
                path: "/act/card",
              });
            });
        } else {
          return false;
        }
      });
    },
    prevStep: function () {
      this.isActive -= 1;
    },
  },
};
</script>

<style scoped>
.main {
  text-align: center;
  margin-top: 20px;
}
.el-input,
.el-input-number {
  width: 300px;
}
.main .el-input__inner {
  text-align: center;
  border: none;
  border-bottom: 1px solid #dcdfe6;
}
.main .cardPic {
  width: 180px;
  height: 180px;
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
  line-height: 180px;
  font-size: 30px;
  color: #999;
}
.cardPic .warpper .cover {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  color: #fff;
}
.cardPic .warpper img {
  width: 100%;
  height: 100%;
}
.main .cardPic:hover {
  border: 1px dashed #409eff;
}
.main .cardPic:hover .cover {
  display: block;
}
.main .cardPic input {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.main-one {
  margin-top: 20px;
}
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>