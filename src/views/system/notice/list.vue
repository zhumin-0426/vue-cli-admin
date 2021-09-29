<template>
  <div class="tip">
    <el-card class="search-warpper">
      <el-form ref="form" :model="form">
        <div class="tip-search">
          <div class="search-row">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
            <el-input class="photo" v-model="form.name" placeholder="请输入公告名称"></el-input>
          </div>
          <el-select v-model="form.type" placeholder="请选择标签">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card class="tip-list">
      <div slot="header" class="card-head">
        <span>系统公告</span>
        <router-link to="/sys/tip/release">
            <el-button style="float: right;font-weight:400" type="primary" icon="el-icon-plus">添加公告</el-button>
        </router-link>
      </div>
      <!-- 列表 -->
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
          <el-table-column prop="createTime_show" label="公告时间" sortable></el-table-column>
          <el-table-column prop="title" label="标题" width="700"></el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
                 <el-button type="success" size="small" @click="lookTarget(scope.row.id)">查看</el-button>
             </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tatol"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Events from "../../../assets/js/events";
export default {
  data() {
    return {
      form: {
        date: "",
        name: "",
        type: "",
      },
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
      options: [
        {
          value: "选项1",
          label: "普通公告",
        },
        {
          value: "选项2",
          label: "系统公告",
        },
      ],
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      tatol: 0,
    };
  },
  created() {
    this.tipData();
  },
  methods: {
    // 搜索
    searchSubmit: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("createTimeName", this.getTime(new Date(this.form.date)));
      params.append("labelName", this.form.name);
      this.$http
        .post(this.$api.tipList.tipList, params, true)
        .then((result) => {
          console.log("搜索", result);
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.tatol = result.data.count;
              this.tableData = result.data.getCardRollVOList;
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
    tipData: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.tipList.tipList, params, true)
        .then((result) => {
          console.log("a",result)
          if (result.data.state == "success") {
            this.tatol = result.data.count;
            this.tableData = result.data.getNoticeVOList;
          }
        });
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.tipData();
    },
    handleCurrentChange: function (val) {
      this.page = val;
      this.tipData();
    },
    lookTarget: function (id) {
      console.log('id',id)
      this.$router.push({
        path: "/sys/tip/detail",
        query: {
            ids: id
        }
      });
    },
  },
};
</script>

<style scoped>
.search-warpper {
  margin-bottom: 20px;
}
/* 公告列表 */
.tip-list .card-head {
  overflow: hidden;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.tip-search .search-row {
  width: 100%;
  margin-bottom: 10px;
}
.tip-search .search-row .el-input:last-child {
  width: 42%;
}
.tip-search .search-row .el-input:first-child {
  width: 15%;
  margin-right: 2.6%;
}
.tip-search .el-select {
  width: 60%;
}
</style>