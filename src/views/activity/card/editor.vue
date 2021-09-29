<template>
  <div class="editorCard">
    <el-card class="box-card">
      <div class="main">
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">编辑卡劵</div>
          </div>
        </div>
        <el-form :model="ruleForm" label-width="250px" class="demo-ruleForm">
          <el-form-item label="卡劵名称">
            <el-input v-model="ruleForm.cardName" disabled placeholder></el-input>
          </el-form-item>
          <div class="startTime">
            <el-form-item label="启用时间">
              <el-date-picker
                disabled
                v-model="ruleForm.startTime"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="endTime">
            <el-form-item label="终止时间" required>
              <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </div>
          <div class="prompt">修改后的结束时间不得小于原结束时间</div>
          <el-form-item label="客服电话" required>
            <el-input v-model="ruleForm.servicePhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeCardData">提交</el-button>
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
      ruleForm: {
        cardName: "",
        startTime: "",
        endTime: "",
        servicePhone: "",
      },
    };
  },
  created() {
    this.editorCardData();
  },
  methods: {
    // 初始化数据
    editorCardData: function () {
      const params = new URLSearchParams();
      params.append("ids", this.$route.query.id);
      this.$http
        .post(this.$api.cardDel.cardDel, params, true)
        .then((result) => {
          console.log("卡劵详细", result);
          if (result.data.state == "success") {
            this.ruleForm.cardName = result.data.getCardRollVO.cardName;
            this.ruleForm.startTime = result.data.getCardRollVO.startingTime;
            this.ruleForm.endTime = result.data.getCardRollVO.endTime;
            this.ruleForm.servicePhone =
              result.data.getCardRollVO.customerServicePhone;
          }
        });
    },
    // 修改卡劵
    changeCardData: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", this.$route.query.id);
      params.append(
        "endTime",
        this.moment(this.ruleForm.endTime).format("YYYY-MM-DD HH:mm:ss")
      );
      params.append("customerServicePhone", this.ruleForm.servicePhone);
      this.$http
        .post(this.$api.changeCard.changeCard, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "卡劵编辑成功！",
                type: "success",
              })
            );
            this.$router.push({
                path:"/act/card"
            })
          }
          console.log("修改卡劵", result);
        });
    },
  },
};
</script>

<style scoped>
.editorCard .main {
  padding: 20px;
}
</style>