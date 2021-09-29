<template>
  <div class="editorCard">
    <el-card class="box-card">
      <div class="main">
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">修改评论</div>
          </div>
        </div>
        <el-form :model="ruleForm" label-width="250px" class="demo-ruleForm">
          <el-form-item label="点赞数" required>
            <el-input v-model="ruleForm.like"></el-input>
          </el-form-item>
          <el-form-item label="是否精选" required>
            <el-select v-model="ruleForm.sel" placeholder="请选择是否精选">
              <el-option
                v-for="item in selOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否显示" required>
            <el-select v-model="ruleForm.display" placeholder="请选择是否显示">
              <el-option
                v-for="item in disOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">返回</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Events from "../../../assets/js/events"
export default {
  data() {
    return {
      ruleForm: {
        like: "",
        sel: "",
        display: "",
      },
      selOpt: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "2",
          label: "否",
        },
      ],
      disOpt: [
        {
          value: "1",
          label: "显示",
        },
        {
          value: "2",
          label: "不显示",
        },
      ],
    };
  },
  created() {
    console.log("$$$$$$$$$$$$$$$$$")
    this.leaveMsgDel();
  },
  methods: {
    leaveMsgDel: function () {
      const params = new URLSearchParams();
      params.append("id", this.$route.query.id);
      this.$http
        .post(this.$api.leaveMsgDel.leaveMsgDel, params, true)
        .then((result) => {
          console.log("评论详细", result);
          this.ruleForm.display = result.data.commentVO.displayName;
          this.ruleForm.sel = result.data.commentVO.isItSelectedName;
          this.ruleForm.like = result.data.commentVO.commentZan;
        });
    },
    submitForm: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", this.$route.query.id);
      params.append("commentZan", this.ruleForm.like);
      let isSel = "";
      switch (this.ruleForm.sel) {
        case "是":
          isSel = "1";
          break;
        case "否":
          isSel = "2";
          break;
        default:
          isSel = this.ruleForm.sel;
      }
      params.append("isItSelected", isSel);
      let isDisplay = "";
      switch (this.ruleForm.display) {
        case "显示":
          isDisplay = "1";
          break;
        case "不显示":
          isDisplay = "2";
          break;
        default:
          isDisplay = this.ruleForm.display;
      }
      params.append("display", isDisplay);
      this.$http
        .post(this.$api.changeMsg.changeMsg, params, true)
        .then((result) => {
          console.log("result", result);
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "恭喜你，评论修改成功",
                type: "success",
              })
            );
            this.$router.push({
              path: "/act/message",
            });
          } else {
            Events.errPrompt(this.$message.error("评论修改失败"));
          }
        });
    },
    back: function () {
      this.$router.push({
        path: "/act/message",
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