<template>
  <div class="teacher">
    <el-card class="search">
      <el-form :model="ruleForm">
        <el-input class="search-item" v-model="ruleForm.cdt" placeholder="请输入广告名称|广告链接"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form>
    </el-card>
    <el-card class="teacher-list">
      <div slot="header" class="card-head">
        <span class="title">获客广告</span>
        <el-button @click="addAdv">+ 添加广告</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="70" sortable></el-table-column>
          <el-table-column prop="advertisementName" label="名称"></el-table-column>
          <el-table-column prop="advertisementUrl" label="链接"></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="originAdv(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="removeAdv(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <div class="popup-bag" v-if="popupAct">
      <div class="popup">
        <div class="popup-head">
          获客大师
          <div class="delete">
            <i class="el-icon-close" @click="addAdv"></i>
          </div>
        </div>
        <div class="popup-content">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <div class="top">
              <div class="leftTxt">
                <div class="advertising-title">
                  <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入广告名称"></el-input>
                  </el-form-item>
                </div>
                <div class="advertising-address">
                  <el-form-item label="广告地址" prop="address">
                    <el-input type="textarea" v-model="form.address" placeholder="请输入广告地址"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rightAdv">
                <el-carousel height="440px">
                  <el-carousel-item v-for="(item,index) in advImg" :key="index">
                    <img :src="'../../static/images/'+item.imgName+'.png'" alt />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="bottom">
              <el-form-item>
                <el-button @click="del">取消</el-button>
                <el-button type="primary" @click="add('form')" v-if="originAdvId==''">新增</el-button>
                <el-button type="primary" @click="editorAdv('form')" v-else>修改</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Events from "../../assets/js/events";
export default {
  inject: ["reload"],
  data() {
    return {
      ruleForm: {
        cdt: "",
      },
      //获客大师列表
      tableData: [],
      page: "1",
      pageSize: "5",
      total: 0,
      popupAct: false,
      // 添加广告
      form: {
        name: "",
        address: "",
      },
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入广告地址", trigger: "blur" },
        ],
      },
      advImg: [
        { imgName: "one" },
        { imgName: "two" },
        { imgName: "three" },
        { imgName: "fore" },
        { imgName: "five" },
      ],
      originAdvId: "",
    };
  },
  created() {
    this.teacherList();
  },
  methods: {
    // 查询
    search: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("advertisementName_advertisementUrl", this.ruleForm.cdt);
      this.$http
        .post(this.$api.teacherList.teacherList, params, true)
        .then((result) => {
          console.log("查询", result);
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.total = result.data.count;
              this.tableData = result.data.getMoneyRechargeVOList;
            } else {
              Events.errPrompt(
                this.$message({
                  showClose: true,
                  message: "错了哦，未查询到相应数据！",
                  type: "error",
                })
              );
            }
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "错了哦，未查询到相应数据！",
                type: "error",
              })
            );
          }
        });
    },
    // 列表
    teacherList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.teacherList.teacherList, params, true)
        .then((result) => {
          console.log(result);
          this.tableData = result.data.getMoneyRechargeVOList;
          this.total = result.data.count;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.teacherList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.teacherList();
    },
    // 添加
    addAdv: function () {
      this.form.name = "";
      this.form.address = "";
      this.originAdvId = "";
      this.popupAct = !this.popupAct;
    },
    del: function () {
      this.popupAct = !this.popupAct;
    },
    add: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("advertisementName", this.form.name);
      params.append("advertisementUrl", this.form.address);
      this.$http.post(this.$api.addAdv.addAdv, params, true).then((result) => {
        console.log("广告添加", result);
        if (result.data.state == "success") {
          Events.errPrompt(
            this.$message({
              message: "恭喜你，添加广告成功！",
              type: "success",
            })
          );
          this.form.name = "";
          this.form.address = "";
          this.popupAct = !this.popupAct;
          this.teacherList();
        }
      });
    },
    // 删除广告
    removeAdv: function (id) {
      const params = new URLSearchParams();
      params.append("aid", id);
      this.$http
        .post(this.$api.removeAdv.removeAdv, params, true)
        .then((result) => {
          console.log(result);
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "恭喜你，删除广告成功！",
                type: "success",
              })
            );
            this.teacherList();
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "删除失败，该广告正在使用中！",
                type: "error",
              })
            );
          }
        });
    },
    // 广告编辑
    originAdv: function (id) {
      this.popupAct = !this.popupAct;
      this.originAdvId = id;
      const params = new URLSearchParams();
      params.append("aid", id);
      this.$http
        .post(this.$api.originAdv.originAdv, params, true)
        .then((result) => {
          this.form.name = result.data.getAdvertisementVO.advertisementName;
          this.form.address = result.data.getAdvertisementVO.advertisementUrl;
        });
    },
    editorAdv: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("advertisementName", this.form.name);
      params.append("advertisementUrl", this.form.name);
      params.append("id", this.originAdvId);
      this.$http
        .post(this.$api.editorAdv.editorAdv, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.form.name = "";
            this.form.address = "";
            this.popupAct = !this.popupAct;
            this.teacherList();
            Events.errPrompt(
              this.$message({
                message: "恭喜你，编辑广告成功！",
                type: "success",
              })
            );
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "编辑广告失败！",
                type: "error",
              })
            );
          }
        });
    },
  },
};
</script>

<style scoped>
.teacher .teacher-list {
  margin-top: 20px;
}
.teacher .teacher-list .card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/* 弹框 */
.teacher .popup-bag {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.teacher .popup {
  box-sizing: border-box;
  width: 900px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 5px;
  background-color: #fff;
}
.teacher .popup .popup-head {
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  font-size: 18px;
  color: #303133;
}
.popup .popup-head .delete {
  position: absolute;
  top: 5px;
  right: 0;
  font-size: 16px;
  color: #707070;
}
.popup-content .top {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 25px 30px 25px;
  display: flex;
  justify-content: space-between;
}
.popup-content .top .leftTxt {
  box-sizing: border-box;
  padding: 0 10px;
}
.popup-content .top .rightAdv {
  box-sizing: border-box;
  width: 270px;
  padding: 0 10px;
}
.top .rightAdv img {
  width: 100%;
  max-height: 100%;
}
.popup-content .bottom {
  width: 100%;
  text-align: center;
}
</style>