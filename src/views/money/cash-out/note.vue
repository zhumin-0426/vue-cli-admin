<template>
  <div class="upload">
    <el-card class="search-warpper">
      <el-form ref="form" :model="form">
        <div class="search">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="form.pickerOptions"
          ></el-date-picker>
          <el-input v-model="form.userName" placeholder="请输入完整用户名"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card class="cashuser-list">
      <div slot="header" class="card-head">
        <span>用户提现记录</span>
      </div>
      <!-- 列表 -->
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="createTimeName" label="提现时间" sortable></el-table-column>
          <el-table-column prop="usersName" label="用户"></el-table-column>
          <el-table-column prop="money_show" label="提现金额"></el-table-column>
        </el-table>
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
import Events from "../../../assets/js/events";
export default {
  data() {
    return {
      // 搜索
      form: {
        date: "",
        userName: "",
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        }
      },
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      total:0
    };
  },
  created(){
    this.cashUserList()
  },
  methods: {
    // 搜索
    searchSubmit: function() {
      let [createTime_start, createTime_end, userName] = [
        this.getTime(new Date(this.form.date[0])),
        this.getTime(new Date(this.form.date[1])),
        this.form.userName
      ];
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("createTime_start", createTime_start);
      params.append("createTime_end", createTime_end);
      params.append("userName", userName);
      this.$http
        .post(this.$api.userCashLog.userCashLog, params, true)
        .then(result => {
          console.log("搜索", result);
          if(result.data.state=="success"){
              if (result.data.count != 0) {
                  this.tableData = result.data.getUsersAccountBookLogVOList;
                  this.total = result.data.count;
              }else{
                Events.errPrompt(
                  this.$message({
                    showClose: true,
                    message: "错了哦，未查询到相应数据",
                    type: "error",
                  })
                );
              }
          }else{
              Events.errPrompt(
                this.$message({
                  showClose: true,
                  message: "接口有误",
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
    cashUserList: function() {
      let [uid, page, show_num] = [
        localStorage.getItem("uid"),
        this.page,
        this.pageSize
      ];
      const params = new URLSearchParams();
      params.append("uid", uid);
      params.append("page", page);
      params.append("show_num", show_num);
      this.$http.post(this.$api.userCashLog.userCashLog, params, true).then(result => {
        console.log("用户提现日志", result);
        if (result.data.state == "success") {
           this.tableData = result.data.getUsersAccountBookLogVOList;
           this.total = result.data.count;
        }
      });
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.cashUserList();
    },
    handleCurrentChange: function(val) {
      this.page = val;
      this.cashUserList();
    }
  }
};
</script>

<style scoped>
.search-warpper {
  margin-bottom: 20px;
}
.search-warpper .search .el-input {
  width: 200px;
}
/* 提现列表 */
.cashuser-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
</style>