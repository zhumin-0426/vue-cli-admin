<template>
  <div class="activity">
    <el-form ref="form" :model="form">
      <el-card class="search">
        <el-input
          class="search-item"
          v-model="form.actId"
          placeholder="请输入活动ID"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchSubmit"
          >搜索</el-button
        >
      </el-card>
    </el-form>
    <el-card class="reserve-list">
      <div slot="header" class="card-head">
        <span class="title" style="float: left">预约信息</span>
        <el-button style="float: right; font-weight: 400" @click="exportExcel">
          <i class="el-icon-download"></i>导出预约信息
        </el-button>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%" id="tableDom">
          <el-table-column
            prop="businessName"
            label="活动商家"
          ></el-table-column>
          <el-table-column prop="activityId" label="活动(ID)"></el-table-column>
          <el-table-column prop="name" label="预约姓名"></el-table-column>
          <el-table-column prop="phone" label="预约电话"></el-table-column>
          <el-table-column
            prop="createTime_name"
            label="提交时间"
          ></el-table-column>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Events from "../../assets/js/events";
export default {
  data() {
    return {
      // 搜索
      form: {
        actId: "",
      },
      // 列表
      tableData: [],
      page: "1",
      pageSize: "5",
      tatol: 0,
    };
  },
  created() {
    this.cashDataList();
  },
  methods: {
    changeTarget: function () {
      this.$router.push({
        path: "/act/activity/create",
      });
    },
    // 搜索
    searchSubmit: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("activityId", this.form.actId);
      this.$http
        .post(this.$api.reserve.reserve, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.tatol = result.data.count;
              this.tableData = result.data.getActivityAboutVOList;
            } else {
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
    cashDataList: function () {
      let [uid, page, show_num] = [
        localStorage.getItem("uid"),
        this.page,
        this.pageSize,
      ];
      const params = new URLSearchParams();
      params.append("uid", uid);
      params.append("page", page);
      params.append("show_num", show_num);
      this.$http
        .post(this.$api.reserve.reserve, params, true)
        .then((result) => {
          console.log("列表", result);
          if (result.data.state == "success") {
            this.tatol = result.data.count;
            this.tableData = result.data.getActivityAboutVOList;
          }
        });
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.cashDataList();
    },
    handleCurrentChange: function (val) {
      this.page = val;
      this.cashDataList();
    },
    // 导出预约信息
    exportExcel() {
      /* generate workbook object from table */
      let tableDom = this.$refs.tableDom;
      console.log("tableDom", tableDom);
      var wb = XLSX.utils.table_to_book(document.querySelector("#tableDom"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
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
/* 预约列表 */
.reserve-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
.reserve-list .card-head .el-icon-download {
  margin-right: 5px;
}
</style>