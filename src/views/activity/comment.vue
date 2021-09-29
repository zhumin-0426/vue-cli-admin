<template>
  <div class="activity">
    <el-form ref="form" :model="form">
      <el-card class="search">
        <el-input class="search-item" v-model="form.actId" placeholder="请输入活动ID"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
      </el-card>
    </el-form>
    <el-card class="message-list">
      <div slot="header" class="card-head">
        <span class="title">评论管理</span>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="businessName" label="活动商家"></el-table-column>
          <el-table-column prop="activityId" label="活动(ID)"></el-table-column>
          <el-table-column prop="usersName" label="用户"></el-table-column>
          <el-table-column prop="comment" label="留言"></el-table-column>
          <el-table-column prop="commentZan" label="点赞数"></el-table-column>
          <el-table-column prop="createTimeName" label="时间"></el-table-column>
          <el-table-column label="精选">
                <template slot-scope="scope">
                    <span v-if="scope.row.isItSelected=='1'">是</span>
                    <span v-else>否</span>
                </template>
          </el-table-column>
          <el-table-column label="显示/不显示">
                <template slot-scope="scope">
                  <span v-if="scope.row.display=='1'">显示</span>
                  <span v-else>不显示</span>
                </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link :to="{path:'/act/message/change',query: { id: scope.row.id}}" >
                      <el-button type="success" size="small">修改</el-button>
                </router-link>
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
import Events from "../../assets/js/events";
export default {
  data() {
    return {
      // 搜索
      form: {
        actId: ""
      },
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      tatol:0
    };
  },
  created(){
      this.cashDataList();
  },
  methods: {
    changeTarget: function() {
      this.$router.push({
        path: "/act/activity/create"
      });
    },
    // 搜索
    searchSubmit: function() {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("activityId", this.form.actId);
      this.$http.post(this.$api.actMsg.actMsg, params, true).then(result => {
          if(result.data.state=="success"){
              if (result.data.count != 0) {
                 this.tatol = result.data.count;
                 this.tableData = result.data.getActivityCommentVOList;
              }else{
                Events.errPrompt(
                  this.$message({
                    showClose: true,
                    message: "错了哦，未查询到相应数据",
                    type: "error",
                  })
                );
              }
          }
      });
    },
    // 列表
    cashDataList: function() {
      let [uid, page, show_num] = [
        localStorage.getItem("uid"),
        this.page,
        this.pageSize
      ];
      const params = new URLSearchParams();
      params.append("uid", uid);
      params.append("page", page);
      params.append("show_num", show_num);
      this.$http.post(this.$api.actMsg.actMsg, params, true).then(result => {
        if (result.data.state == "success") {
          console.log("评论",result)
          this.tatol = result.data.count;
          this.tableData = result.data.getActivityCommentVOList;
        }
      });
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.cashDataList();
    },
    handleCurrentChange: function(val) {
      this.page = val;
      this.cashDataList();
    }
  }
};
</script>

<style scoped>
.activity .search {
  width: 100%;
  margin-bottom: 20px;
}
.activity .search .el-card__body {
  overflow: hidden;
}
.activity .search .search-item {
  width: 222px;
  display: block;
  float: left;
  margin-right: 20px;
}
/* 评论列表 */
.message-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
</style>