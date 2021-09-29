<template>
  <div class="upload">
    <el-card class="search-warpper">
      <el-form ref="form" :model="form">
        <div class="search">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
          <el-input v-model="form.conditions" placeholder="ID|用户名|备注"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchSubmit">搜索</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card class="cash-list">
      <div slot="header" class="card-head">
        <span style="float:left">提现记录</span>
        <el-button
          type="primary"
          size="medium"
          style="float: right;font-weight:400"
          @click="openCash"
        >发起提现</el-button>
      </div>
      <!-- 列表 -->
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="createTimeName" width="160" label="申请时间" sortable></el-table-column>
          <el-table-column prop="usersName" label="姓名"></el-table-column>
          <el-table-column prop="usersPhone" width="160" label="联系电话"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.types=='1'">提现</span>
            </template>
          </el-table-column>
          <el-table-column prop="withdrawalMoney_money_show" label="提现金额"></el-table-column>
          <el-table-column prop="toTheAccountMoney_money_show" label="到账金额"></el-table-column>
          <el-table-column prop="orderNum" width="160" label="订单"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state=='1'">待审核</span>
              <span v-else-if="scope.row.state=='2'">已审核</span>
              <span v-else-if="scope.row.state=='3'">已驳回</span>
              <span v-else-if="scope.row.state=='4'">撤销</span>
              <span v-else>失败</span>
            </template>
          </el-table-column>
          <el-table-column label="驳回原因" prop="reason"></el-table-column>
          <el-table-column label="操作" width="250" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.state=='1'">
                <div v-if="uid==scope.row.followers">
                  <el-button type="success" size="small" @click="audit(scope.row.id)">审核</el-button>
                  <el-button size="small" @click="rejected(scope.row.id)">驳回</el-button>
                  <el-button size="small" @click="del(scope.row.id)">失败</el-button>
                </div>
                <div v-else>
                  <el-button
                    size="small"
                    @click="undo(scope.row.id,scope.row.state,scope.row.reason)"
                  >撤回</el-button>
                </div>
              </div>
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
    <!-- 驳回原因弹窗 -->
    <div class="rjtPopup-bag" v-if="rejAct">
      <div class="rjtPopup">
        <div class="top"><i class="el-icon-close" @click="removeRejAct"></i></div>
        <el-input type="textarea" :rows="5" placeholder="请输入驳回原因" v-model="textarea"></el-input>
        <div class="btn">
          <el-button type="primary" @click="rjtDtm">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Events from "../../../assets/js/events";
export default {
  inject: ["reload"],
  data() {
    return {
      // 搜索
      form: {
        uid: "",
        date: "",
        state: "",
        conditions: "",
        // 选择状态
        options: [
          {
            value: "1",
            label: "待审核",
          },
          {
            value: "2",
            label: "已审核",
          },
          {
            value: "3",
            label: "已驳回",
          },
          {
            value: "4",
            label: "撤销",
          },
          {
            value: "5",
            label: "失败",
          },
        ],
        // 日历
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
      },
      // 列表
      page: "1",
      pageSize: "5",
      tatol: 0,
      tableData: [],
      rejAct: false,
      cashId: "",
      textarea: "",
    };
  },
  created() {
    this.cashDataList();
  },
  methods: {
    openCash: function () {
      this.$router.push({
        path: "/funds/cash/opencash",
      });
    },
    // 搜索
    searchSubmit: function () {
      let [state, createTime_start, createTime_end, id_usersName_remarks] = [
        this.form.state,
        this.getTime(new Date(this.form.date[0])),
        this.getTime(new Date(this.form.date[1])),
        this.form.conditions,
      ];
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("state", state);
      params.append("createTime_start", createTime_start);
      params.append("createTime_end", createTime_end);
      params.append("id_usersName_remarks", id_usersName_remarks);
      this.$http
        .post(this.$api.cashHis.cashHis, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.tableData = result.data.getMoneyWithdrawalVOList;
              this.tatol = result.data.count;
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
    cashDataList: function () {
      this.uid = localStorage.getItem("uid");
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
        .post(this.$api.cashHis.cashHis, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.tableData = result.data.getMoneyWithdrawalVOList;
            this.tatol = result.data.count;
          }
        });
    },
    // 审核
    audit: function (cashId) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("ids", cashId);
      this.$http
        .post(this.$api.openCashAudit.openCashAudit, params, true)
        .then((result) => {
            if (result.data.start == "1") {
              Events.errPrompt(
                this.$message({
                  message: "恭喜你," + result.data.remarks,
                  type: "success",
                })
              );
              this.cashDataList();
            } else {
              Events.errPrompt(this.$message.error(result.data.remarks));
              this.cashDataList();
            }
        });
    },
    // 撤回
    undo: function (cashId, cashState, cashWhy) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", cashId);
      params.append("state", '4');
      if (cashState == "3") {
        params.append("reason", cashWhy);
      }
      this.$http
        .post(this.$api.openCashundo.openCashundo, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "恭喜你,撤回成功",
                type: "success",
              })
            );
            this.cashDataList();
          }
        });
    },
    // 驳回
    rejected: function (cashId) {
      this.cashId = cashId;
      this.rejAct = !this.rejAct;
    },
    rjtDtm: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", this.cashId);
      params.append("state","3" );
      params.append("reasonsForFailureOfAudit", this.textarea);
      this.$http
        .post(this.$api.rejected.rejected, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.$message({
                message: "恭喜你,驳回成功",
                type: "success",
            })
            this.cashDataList();
          }
        });
    },
    removeRejAct:function(){
       this.rejAct = !this.rejAct;
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.cashDataList();
    },
    handleCurrentChange: function (val) {
      this.page = val;
      this.cashDataList();
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
/* 提现列表 */
.cash-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
/* 审核弹窗 */
.rjtPopup-bag {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.rjtPopup-bag .rjtPopup .top{
  width: 100%;
  margin-bottom: 20px;
  text-align: right;
}
.rjtPopup-bag .rjtPopup {
  position: absolute;
  width: 300px;
  height: 300px;
  padding: 20px;
  left: 50%;
  top: 50%;
  margin-top: -150px;
  margin-left: -150px;
  background-color: #fff;
  z-index: 9999;
}
.rjtPopup-bag .rjtPopup .el-textarea {
  width: 100%;
}
.rjtPopup-bag .rjtPopup .btn {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>