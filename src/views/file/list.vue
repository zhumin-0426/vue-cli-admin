<template>
  <div class="upload">
    <el-card class="search-warpper">
      <el-form :model="form">
        <div class="search">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-input
            class="photo"
            v-model="form.picName"
            placeholder="请输入图片名称"
          ></el-input>
          <el-input
            class="userId"
            v-model="form.userId"
            placeholder="请输入用户ID"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit"
            >搜索</el-button
          >
        </div>
      </el-form>
    </el-card>
    <el-card class="uoload-list">
      <div slot="header" class="card-head">
        <span>上传文件列表</span>
      </div>
      <!-- 列表 -->
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="80"
            sortable
          ></el-table-column>
          <el-table-column
            prop="names"
            label="文件名称"
            width="300"
          ></el-table-column>
          <el-table-column label="图片预览">
            <template slot-scope="scope">
              <img style="max-width: 50%" :src="picurl + scope.row.urls" alt />
            </template>
          </el-table-column>
          <el-table-column prop="sizes" label="文件大小"></el-table-column>
          <el-table-column prop="suffixs" label="后缀"></el-table-column>
          <el-table-column
            prop="createTimeName"
            label="添加时间"
          ></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="del(scope.row.id)"
                >删除</el-button
              >
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
  </div>
</template>

<script>
import Events from "../../assets/js/events";
export default {
  inject: ["reload"],
  data() {
    return {
      form: {
        date: "",
        picName: "",
        userId: "",
      },
      picurl: "http://lb3.28888753.cn/imges/",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 活动列表
      tableData: [],
      page: "1",
      pageSize: "5",
      total: 0,
    };
  },
  created() {
    this.upLoad();
  },
  methods: {
    searchSubmit: function () {
      let startTime = this.getTime(new Date(this.form.date[0]));
      let endTime = this.getTime(new Date(this.form.date[1]));
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("createTime_start", startTime);
      params.append("createTime_end", endTime);
      params.append("img_names", this.form.picName);
      params.append("usId", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.uploadFile.uploadFile, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.total = result.data.count;
              this.tableData = result.data.getUsersUploadVOList;
            } else {
              Events.errPrompt(
                this.$message({
                  showClose: true,
                  message: "错了哦，未查询到相应数据",
                  type: "error",
                })
              );
            }
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "错了哦，未查询到相应数据",
                type: "error",
              })
            );
          }
        });
    },
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
    // 列表
    upLoad: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.uploadFile.uploadFile, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.total = result.data.count;
            this.tableData = result.data.getUsersUploadVOList;
          }
        });
    },
    del: function (id) {
      const params = new URLSearchParams();
      params.append("ids", id);
      this.$http
        .post(this.$api.delFile.delFile, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "恭喜你，删除文件成功！",
                type: "success",
              })
            );
            this.upLoad();
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.upLoad();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.upLoad();
    },
  },
};
</script>

<style scoped>
.search-warpper {
  margin-bottom: 20px;
}
.search-warpper .search .el-input {
  width: 200px;
}
</style>