<template>
  <div class="activity">
    <el-form ref="form" :model="form">
      <el-card class="search">
        <el-input class="search-item" v-model="form.conditions" placeholder="ID|店铺名|卡劵名称"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
      </el-card>
    </el-form>
    <el-card class="card-list">
      <div slot="header" class="card-head">
        <span class="title" style="float:left">卡劵管理</span>
        <router-link to="/act/activity/addcard">
          <el-button style="float: right;font-weight:400" size="medium">添加卡劵</el-button>
        </router-link>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="卡劵ID" sortable></el-table-column>
          <el-table-column prop="businessName" label="商户名称"></el-table-column>
          <el-table-column prop="cardName" label="卡劵名称"></el-table-column>
          <el-table-column prop="cardBackgroundColor" label="卡劵颜色" width="80">
            <template slot-scope="scope">
              <div class="cardBag" :style="'background-color:'+scope.row.cardBackgroundColor">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="有效期">
              <template slot-scope="scope">
                  <span>{{scope.row.startingTime.split(" ")[0]}} ~ {{scope.row.endTime.split(" ")[0]}}</span>
              </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <router-link :to="{path:'/act/activity/editorcard',query: { id: scope.row.id}}" >
                      <el-button type="success" size="small">编辑</el-button>
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
        conditions: ""
      },
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      tatol: 0
    };
  },
  created() {
    this.cardList();
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
      params.append("activityId", this.form.conditions);
      this.$http.post(this.$api.cardList.cardList, params, true).then(result => {
          if(result.data.state=="success"){
              if (result.data.count != 0) {
                  this.tatol = result.data.count;
                  this.tableData = result.data.getCardRollVOList;
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
    cardList: function() {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.cardList.cardList, params, true)
        .then(result => {
          console.log("卡劵列表",result);
          this.tatol = result.data.count;
          this.tableData = result.data.getCardRollVOList;
        });
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.cardList();
    },
    handleCurrentChange: function(val) {
      this.page = val;
      this.cardList();
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
/* 卡劵列表 */
.card-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
.card-list .list .cardBag{
  width: 60px;
  height: 50px;
}
</style>