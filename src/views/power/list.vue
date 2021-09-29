<template>
  <div class="poal">
    <el-card class="poal-card">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="success"
              @click="targetChange(scope.row)"
              >查看</el-button
            >
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 列表
      page: "1",
      pageSize: "5",
      tatol: 0,
      tableData: [],
    };
  },
  created() {
    this.poalList();
  },
  methods: {
    poalList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.poalList.poalList, params, true)
        .then((result) => {
          console.log("角色列表", result);
          if (result.data.state == "success") {
            this.tableData = result.data.getUsersRoleVOList;
            this.tatol = result.data.count;
          }
        });
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.poalList();
    },
    handleCurrentChange: function (val) {
      this.page = val;
      this.poalList();
    },
    targetChange: function (val) {
      console.log("val", val);
      this.$router.push({
        path: "/pms/poaldel",
        query: {
          id: val.id,
        },
      });
    },
  },
};
</script>

<style>
</style>