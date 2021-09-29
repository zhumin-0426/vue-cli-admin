<template>
  <div class="release">
    <el-card class="release-card">
      <div slot="header" class="release-header">
        <span>公告编辑</span>
      </div>

      <el-form ref="form" :model="form">
        <div class="top" style="display:flex;margin-bottom:20px">
          <div class="tip-title">
            <el-input v-model="form.title" placeholder="请输入公告标题"></el-input>
          </div>
          <el-select v-model="form.type" placeholder="请选择公告类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="release-content">
          <el-form-item prop="rlsMain">
            <mavon-editor
              ref="md"
              @imgAdd="handleEditorImgAdd"
              @imgDel="handleEditorImgDel"
              v-model="form.rlsMain"
            />
          </el-form-item>
          <el-form-item>
            <div class="btn" style="text-align:right">
              <el-button type="primary" @click="addTip">提交</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Events from "../../../assets/js/events";
export default {
  data() {
    return {
      picurl: "http://lb3.28888753.cn/imges/",
      form: {
        title: "",
        type: "",
        rlsMain: "",
      },
      options: [
        {
          value: "1",
          label: "普通公告",
        },
        {
          value: "2",
          label: "系统公告",
        },
      ],
    };
  },
  methods: {
      // 编辑器添加图片回调
    handleEditorImgAdd: function (pos, $file) {
      const that = this;
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("uid", localStorage.getItem("uid"));
      this.formData.append("types", this.types);
      this.formData.append("file", $file);
      this.$http
        .post(this.$api.actUploadpic.actUploadpic, this.formData, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.$refs.md.$img2Url(pos,this.picurl+result.data.url);
          }
        });
    },
    handleEditorImgDel: function (pos) {
      // delete this.imgFile[pos]
    },
    addTip: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("title", this.form.title);
      params.append("content", this.form.rlsMain);
      params.append("notice_label_id_list", this.form.type);
      this.$http.post(this.$api.addTip.addTip, params, true).then((result) => {
        console.log("a", result);
        if (result.data.state == "success") {
          Events.errPrompt(
            this.$message({
              message: "恭喜你，公告添加成功",
              type: "success",
            })
          );
          this.$router.push({
            path: "/sys/tip",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.release .tip-title {
  width: 221px;
  margin-right: 20px;
}
</style>