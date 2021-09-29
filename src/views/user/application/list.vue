<template>
  <div class="appmsg">
    <el-card class="appmsg-card">
      <div slot="header" class="appmsg-head" style="display:flex;justify-content: space-between;align-items: center;">
        <span>应用信息</span>
          <router-link to="/user/addAppMsg">
              <template v-if="role=='1'">
                  <el-button type="primary" size="small">添加</el-button>
              </template>
              <template v-else-if="role=='3'&&tableData.length<'1'">
                  <el-button type="primary" size="small">添加</el-button>
              </template>
          </router-link>
      </div>
      <!-- 设置信息 -->
      <div class="setMsg">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="usersId" label="用户id"></el-table-column>
          <el-table-column prop="xAppId" label="小程序appid"></el-table-column>
          <el-table-column prop="xAppSecret" label="小程序secret"></el-table-column>
          <el-table-column prop="gzAppId" label="公众号appid"></el-table-column>
          <el-table-column prop="gzAppSecret" label="公众号secret"></el-table-column>
          <el-table-column prop="mchId" label="支付平台（商户号）"></el-table-column>
          <el-table-column prop="wxKey" label="支付平台（kay）"></el-table-column>
          <el-table-column prop="paths" label="paths"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                 <template v-if="role=='1'">
                    <router-link :to="{path:'/user/changeAppMsg',query: { id: scope.row.id}}" >
                        <el-button type="success" size="small">修改</el-button>
                    </router-link>
                 </template>
                 <template v-else-if="role=='3'">
                    <router-link :to="{path:'/user/changeAppMsg',query: { id: scope.row.id}}" >
                        <el-button type="success" size="small">修改</el-button>
                    </router-link>
                 </template>
              </template>
          </el-table-column>
        </el-table>
      </div>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 小程序/公众号设置
      tableData: [],
      page: "1",
      pageSize: "5",
      total: 0,
      role:''
    };
  },
  created() {
    this.appSetData();
  },
  methods: {
    appSetData: function () {
      this.role = localStorage.getItem('role');
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.wxSetList.wxSetList, params, true)
        .then((result) => {
          console.log("应用数据", result);
          if (result.data.state == "success") {
            this.tableData = result.data.getUsersDateVOList;
            this.total = result.data.count;
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.appSetData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.appSetData();
    },
  },
};
</script>

<style>

</style>