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
    <el-card class="payment-list">
      <div slot="header" class="card-head">
        <span style="float:left">充值记录</span>
        <el-button
          type="primary"
          size="medium"
          style="float: right;font-weight:400"
          @click="paymentTarget"
        >发起充值</el-button>
      </div>
      <!-- 列表 -->
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="orderNum" label="订单号"></el-table-column>
          <el-table-column prop="orderMoney_money_show" label="订单金额"></el-table-column>
          <el-table-column prop="toTheAccountMoney_money_show" label="到账金额"></el-table-column>
          <el-table-column prop="createTime_name" label="充值时间" sortable></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                v-if="scope.row.state==1"
                class="round"
                style="display:inline-block;width:5px;height:5px;background-color:#67C23A;border-radius:50%;"
              ></span>
              <span
                v-else-if="scope.row.state==2"
                class="round"
                style="display:inline-block;width:5px;height:5px;background-color:#f56c6c;border-radius:50%;"
              ></span>
               <span
                v-else-if="scope.row.state==3"
                class="round"
                style="display:inline-block;width:5px;height:5px;background-color:#ffeb3b;border-radius:50%;"
              ></span>
              <span
                v-else
                class="round"
                style="display:inline-block;width:5px;height:5px;background-color:#2efdff;border-radius:50%;"
              ></span>
              <span v-if="scope.row.state=='1'">支付成功</span>
              <span v-else-if="scope.row.state=='2'">支付失败</span>
              <span v-else-if="scope.row.state=='3'">未支付</span>
              <span v-else>订单关闭</span>
            </template>
          </el-table-column>
          <el-table-column prop="paymentTime_name" label="支付时间" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.paymentTime_name!=null">{{scope.row.paymentTime_name}}</span>
              <span v-else>未支付</span>
            </template>
          </el-table-column>
          <el-table-column prop="usersName" label="用户"></el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.state=='1'"
                :to="{path:'/funds/payment/del',query: { id: scope.row.id}}"
              >
                <el-button type="success" size="small">详情</el-button>
              </router-link>
              <div v-else>
                <el-button
                  v-if="scope.row.state!='4'"
                  size="small"
                  @click="shutOrder(scope.row.id)"
                >关闭订单</el-button>
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
        date: "",
        state: "",
        conditions: "",
        // 选择状态
        options: [
          {
            value: "1",
            label: "支付成功",
          },
          {
            value: "3",
            label: "未支付",
          },
          {
            value: "4",
            label: "订单关闭",
          },
          {
            value: "2",
            label: "支付失败",
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
    };
  },
  created() {
    this.payMent();
  },
  methods: {
    paymentTarget: function () {
      this.$router.push({
        path: "/funds/payment/create",
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
        .post(this.$api.payMent.payMent, params, true)
        .then((result) => {
          console.log("搜索", result);
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.tableData = result.data.getMoneyRechargeVOList;
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
    payMent: function () {
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
        .post(this.$api.payMent.payMent, params, true)
        .then((result) => {
          console.log("充值记录", result);
          if (result.data.state == "success") {
            this.tableData = result.data.getMoneyRechargeVOList;
            this.tatol = result.data.count;
          }
        });
    },
    shutOrder: function (id) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", id);
      params.append("state", "4");
      this.$http
        .post(this.$api.shutOrder.shutOrder, params, true)
        .then((result) => {
          console.log("关闭", result);
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "恭喜你，关闭订单成功 ！",
                type: "success",
              })
            );
            this.reload();
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "关闭订单失败",
                type: "error",
              })
            );
          }
        });
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
      this.payMent();
    },
    handleCurrentChange: function (val) {
      this.page = val;
      this.payMent();
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
/* 充值列表 */
.payment-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
</style>