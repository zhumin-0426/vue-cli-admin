<template>
  <div class="wx">
    <el-card class="wx-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="系统登入绑定" name="first"></el-tab-pane>
        <el-tab-pane label="活动核销员绑定" name="second"></el-tab-pane>
      </el-tabs>
      <div class="tab-obj" v-if="isShow=='0'">
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">
              微信账号
              <span>(用于微信登入、微信提现、核销活动)</span>
            </div>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="绑定账号信息">
              <template slot-scope="scope">
                  <span v-if="scope.row.types=='1'">微信</span>
                  <span v-else>其他</span>
              </template>
            </el-table-column>
            <el-table-column label="详情">
              <template slot-scope="scope">
                <div class="userMsg">
                  <img :src="scope.row.wxImges" alt />
                  <span>{{scope.row.wxNames}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="lastUpTimeName" label="绑定时间"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.states=='1'">已绑定</span>
                <span v-else>未绑定</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="btn" v-if="scope.row.states!=1">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="withWx(scope.row.id,scope.row.wxOpenid,scope.row.wxNames)"
                  >启用</el-button>
                  <el-button size="mini" type="success" @click="wxDel(scope.row.id)">删除</el-button>
                </div>
                <div class="btn" v-else>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="wxRemove(scope.row.id,scope.row.wxNames)"
                  >解除绑定</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">请点击下方微信图标绑定用户</div>
          </div>
        </div>
        <div class="icon-warpper" @click="wxBind">
          <div class="wx-icon"></div>
          <span>微信</span>
        </div>
        <div class="prompt" style="padding-left:0">绑定微信流程：点击微信图标 -> 弹框确认 -> 微信扫码 -> 密码确认 -> 绑定成功。</div>
      </div>
      <div class="tab-obj" v-else>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">请点击下方微信图标绑定核销员</div>
          </div>
        </div>
        <div class="icon-warpper" @click="wxBind">
          <div class="wx-icon"></div>
          <span>微信</span>
        </div>
        <div
          class="prompt"
          style="padding-left:0"
        >绑定核销员流程：点击微信图标 -> 弹框微信扫码 -> 手机端扫码-> 扫码成功后点击网页端【扫码成功】按钮 -> 绑定成功。</div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">
              核销
              <span>（请绑定核销员成功后进入码上拓客小程序）</span>
            </div>
          </div>
        </div>
        <div class="prompt" style="padding-left:0">进入小程序后点击优惠券页面左上角'核销'文字，进入核销页面，可扫码核销和查看核销记录。</div>
        <div class="code">
          <img :src="picurl+wxCodeUrl" alt />
        </div>
      </div>
    </el-card>
    <div class="popup-bag" v-if="popupAct" @click="changeState">
      <div class="popup">
        <div class="top">微信绑定</div>
        <div class="middle" style="text-align:center;margin:20px 0">
          <vue-qr :text="codeImg" :size="200" :callback="text"></vue-qr>
        </div>
        <div class="bottom">请使用微信扫描二维码登录“拓客汇红包”</div>
      </div>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import Events from "../../assets/js/events";
export default {
  components: {
    vueQr,
  },
  inject: ["reload"],
  data() {
    return {
      picurl: "http://lb3.28888753.cn/imges/",
      activeName: "first",
      isShow: "0",
      popupAct: false,
      codeImg: "",
      wxCodeUrl: "",
      tableData: [],
    };
  },
  created() {
    this.wxBindList();
  },
  methods: {
    handleClick: function (tab, event) {
      this.isShow = tab.index;
    },
    wxBind: function () {
      this.openMsg();
    },
    openMsg(callback) {
      this.$confirm("正在绑定微信号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let uid = localStorage.getItem("uid");
          const params = new URLSearchParams();
          params.append("uid", uid);
          this.$http
            .post(this.$api.wxBind.wxBind, params, true)
            .then((result) => {
              if (result.data.state == "success") {
                let code = result.data.erweima;
                this.text(code);
                this.popupAct = true;
                let ids = result.data.ids;
                this.code(ids);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消绑定",
          });
        });
    },
    code: function (ids) {
      const that = this;
      const params = new URLSearchParams();
      params.append("ids", ids);
      that.$http.post(that.$api.openId.openId, params, true).then((result) => {
        if (result.data.state == "success") {
          if (!result.data.getwx.openids) {
            that.code(ids);
          } else {
            let uid = localStorage.getItem("uid");
            const params = new URLSearchParams();
            params.append("uid", uid);
            params.append("ids", ids);
            that.$http.post(that.$api.wx.wx, params, true).then((result) => {
              if (result.data.state == "success") {
                Events.sucPrompt(
                  this.$message({
                    showClose: true,
                    message: "恭喜您，微信绑定成功",
                    type: "success",
                  })
                );
                this.popupAct = false;
                this.reload();
              } else {
                Events.sucPrompt(that.$message.error("绑定失败"));
              }
            });
          }
        }
      });
    },
    text: function (url) {
      this.codeImg = url;
    },
    changeState: function () {
      this.popupAct = false;
    },
    // 绑定列表
    wxBindList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.wxBindList.wxBindList, params, true)
        .then((result) => {
          if(result.data.getuwbdList.length==1&&result.data.getuwbdList[0].states=="1"){
              localStorage.setItem('openid',result.data.getuwbdList[0].wxOpenid)
          }
          this.tableData = result.data.getuwbdList;
          this.wxCodeUrl = result.data.tai_yang_ma_url;
        });
    },
    withWx(id, openid, name) {
      this.$confirm("绑定" + name + "的微信到您的账号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = new URLSearchParams();
          params.append("uid", localStorage.getItem("uid"));
          params.append("wxid", id);
          this.$http
            .post(this.$api.withWx.withWx, params, true)
            .then((result) => {
              if (result.data.state == "success") {
                localStorage.setItem("openid", openid);
                this.wxBindList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    wxRemove: function (id, name) {
      this.$confirm("是否解除" + name + "绑定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = new URLSearchParams();
          params.append("wxid", id);
          this.$http
            .post(this.$api.wxRemove.wxRemove, params, true)
            .then((result) => {
              localStorage.removeItem("openid");
              this.wxBindList()
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    wxDel: function (id) {
      const params = new URLSearchParams();
      params.append("wxid", id);
      this.$http.post(this.$api.wxDel.wxDel, params, true).then((result) => {
        if (result.data.state == "success") {
          Events.sucPrompt(
            this.$message({
              showClose: true,
              message: "恭喜您，微信删除成功！",
              type: "success",
            })
          );
          this.wxBindList()
        }
      });
    },
  },
};
</script>

<style scoped>
.wx .tab-obj .icon-warpper {
  cursor: pointer;
  width: 50px;
  padding: 10px 0;
  margin-bottom: 10px;
  text-align: center;
}
.tab-obj .icon-warpper .wx-icon {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
  text-align: center;
  line-height: 30px;
  background-color: #409eff;
  background-image: url("../../../static/images/wx-icon.png");
  background-size: 70%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.tab-obj .icon-warpper span {
  display: block;
  width: 100%;
  margin-top: 3px;
  font-size: 13px;
  line-height: 20px;
  color: #909399;
}
.tab-obj .icon-warpper:hover {
  background-color: #409eff;
}
.tab-obj .icon-warpper:hover .wx-icon {
  background-color: #fff;
  background-image: url("../../../static/images/wx-icona.png");
}
.tab-obj .icon-warpper:hover span {
  color: #fff;
}
.tab-obj .table {
  width: 100%;
  margin-bottom: 20px;
}
.tab-obj .table .userMsg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userMsg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
.wx .tab-obj .code {
  width: 150px;
  height: 150px;
}
.tab-obj .code img {
  width: 100%;
}
.popup-bag {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.popup-bag .popup {
  width: 280px;
  position: absolute;
  left: 50%;
  top: 50px;
  margin-left: -140px;
}
.popup-bag .popup .top {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.popup-bag .popup .bottom {
  width: 100%;
  line-height: 60px;
  background-color: #409eff;
  color: #fff;
  font-size: 13px;
  text-align: center;
  border-radius: 60px;
}
</style>