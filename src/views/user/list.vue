<template>
  <div class="userlist">
    <el-card class="search">
      <el-form ref="searchFrom" :model="searchFrom">
        <el-input class="search-item" v-model="searchFrom.name" placeholder="请输入姓名"></el-input>
        <el-input class="search-item" v-model="searchFrom.phone" placeholder="请输入电话"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
      </el-form>
    </el-card>
    <el-card class="userlist-list">
      <div slot="header" class="card-head">
        <span class="title" style="float:left">用户列表</span>
        <el-button style="float: right;font-weight:400" type="primary" @click="changeTarget">+ 添加用户</el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="usersName" label="姓名" width="80"></el-table-column>
          <el-table-column prop="usersPhone" label="手机号" width="220"></el-table-column>
          <el-table-column label="角色" width="100">
              <template slot-scope="scope">
                   <span v-if="scope.row.role=='1'">超级管理员</span>
                   <span v-else-if="scope.row.role=='2'">普通管理员</span>
                   <span v-else-if="scope.row.role=='3'">代理</span>
                   <span v-else-if="scope.row.role=='4'">活动商</span>
                   <span v-if="scope.row.role=='5'">用户</span>
              </template>
          </el-table-column>
          <el-table-column prop="merchantType" label="商户类型" width="100">
              <template slot-scope="scope">
                  <span v-if="scope.row.merchantType=='1'">个人</span>
                  <span v-else>企业</span>
              </template>
          </el-table-column>
          <el-table-column prop="usersStartTime" label="开户时间"></el-table-column>
          <el-table-column prop="usersEndTime" label="截止时间"></el-table-column>
          <el-table-column label="开户限定">
            <template slot-scope="scope">
               <span v-if="scope.row.limitType=='1'">限定开户数</span>
               <span v-else>不限定开户数</span>
            </template>
          </el-table-column>
          <el-table-column label="开户数">
            <template slot-scope="scope">
               <span v-if="scope.row.limitType=='1'">{{scope.row.limitNum}}</span>
               <span v-else>暂无数据</span>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="地区">
            <template slot-scope="scope">
                <span v-if="scope.row.region=='1'">全国</span>
                <span v-else>规定区域</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button @click="upData(scope.row.id)" type="success" size="small">用户更新</el-button>
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
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      searchFrom: {
        name: "",
        phone: "",
      },
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      total: 0,
    };
  },
  created: function () {
    this.usersList();
  },
  methods: {
    changeTarget: function () {
      this.$router.push({
        path: "/users/add",
      });
    },
    // 搜索
    searchSubmit: function () {
      let [createTime_start, createTime_end, userName] = [
        this.getTime(new Date(this.form.date[0])),
        this.getTime(new Date(this.form.date[1])),
        this.form.userName
      ];
      const params = new URLSearchParams();
      params.append("createTime_start", createTime_start);
      params.append("createTime_end", createTime_end);
      params.append("userName", userName);
      this.$http
        .post(this.$api.userCashLog.userCashLog, params, true)
        .then(result => {
          console.log("搜索", result);
        });
    },
    // 列表
    usersList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.usersList.usersList, params, true)
        .then((result) => {
          console.log("用户列表", result);
          if (result.data.state == "success") {
            this.tableData = result.data.getUsersVOList;
            this.total = result.data.count;
          }
        });
    },
    handleSizeChange: function (val) {
      console.log("1",val)
      this.pageSize = val;
      this.usersList();
    },
    handleCurrentChange: function (val) {
      console.log("2",val)
      this.page = val;
      this.usersList();
    },
    upData: function (id) {
      this.$router.push({
        path: "/users/up",
        query: {
            id: id
        }
      });
    },
  },
};
</script>

<style scoped>
.userlist .search {
  width: 100%;
  margin-bottom: 20px;
}
.userlist .search .el-card__body {
  overflow: hidden;
}
.userlist .search .search-item {
  width: 222px;
  display: block;
  float: left;
  margin-right: 20px;
}
/* 活动列表 */
.userlist-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
.userlist-list .card-head span.title {
  display: block;
  float: left;
  color: #303133;
}
</style>