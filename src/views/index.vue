<template>
  <div class="index-warpper">
    <!-- 顶部消息提示 -->
    <div class="top-tip">
      <el-card class="top-tip-card">
        <dl>
          <dt>系统公告</dt>
          <dd>
            <i class="rund">●</i>
            <router-link :to="{path:'/sys/tip/detail',query:{ids:`${serviceLog[0].id}`}}">
              {{serviceLog[0].title}}
              <span>{{serviceLog[0].createTime_show}}</span>
            </router-link>
            <span class="new-msg">新</span>
          </dd>
          <dd>
            <i class="rund">●</i>
            <router-link :to="{path:'/sys/tip/detail',query:{ids:`${serviceLog[1].id}`}}">
              {{serviceLog[1].title}}
              <span>{{serviceLog[1].createTime_show}}</span>
            </router-link>
            <span class="new-msg">新</span>
          </dd>
          <dd>
            <router-link to="/sys/tip">
              <span class="more">查看更多</span>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </dd>
        </dl>
      </el-card>
    </div>
    <!-- 系统信息 -->
    <div class="service-msg">
      <el-card class="msg-card">
        <div class="msg-icon msg-icon1">
          <i class="iconfont icon-icon"></i>
        </div>
        <div class="msg">
          <div class="msg-txt">活动总数</div>
          <div class="num">{{actNum}}</div>
        </div>
      </el-card>
      <el-card class="msg-card">
        <div class="msg-icon msg-icon2">
          <i class="el-icon-view"></i>
        </div>
        <div class="msg">
          <div class="msg-txt">总浏览量</div>
          <div class="num">{{browseNum}}</div>
        </div>
      </el-card>
      <el-card class="msg-card">
        <div class="msg-icon msg-icon3">
          <i class="iconfont icon-fenxiang"></i>
        </div>
        <div class="msg">
          <div class="msg-txt">总分享量</div>
          <div class="num">{{shareNum}}</div>
        </div>
      </el-card>
    </div>
    <div class="warp">
      <!-- 用户 -->
      <el-card class="user-card">
        <div class="top user">
          <div class="user-pic">
            <template v-if="userMsg.images!=''">
              <img :src="picurl+userMsg.images" alt />
            </template>
            <template v-else>
              <img src="../../static/images/defUserPic.png" alt />
            </template>
          </div>
          <div class="user-name">{{userMsg.usersName}}</div>
        </div>
        <div class="middle money">
          <template v-if="userMsg.smallChange_money_show!=null">
            <div class="num">{{userMsg.smallChange_money_show}}</div>
          </template>
          <template v-else>
            <div class="num">0.00</div>
          </template>
          <div class="txt">余额（元）</div>
        </div>
        <div class="bottom nav-btn">
          <div class="btn-box">
            <router-link to="/act/activity/create">
              <el-button type="button">创建活动</el-button>
            </router-link>
          </div>
          <div class="btn-box">
            <router-link to="/funds/payment/create">
              <el-button type="button">充值</el-button>
            </router-link>
          </div>
          <div class="btn-box">
            <router-link to="/funds/cash/opencash">
              <el-button type="button">提现</el-button>
            </router-link>
          </div>
        </div>
        <div class="user-login-time">上次登入时间：{{userMsg.recentLogin}}</div>
      </el-card>
      <!-- 平台信息 -->
      <el-card class="platform-card">
        <div class="title">
          <div class="title-pic">
            <img src="../../static/images/defUserPic.png" alt />
          </div>
          <span>{{serviceMsg.names}}</span>
        </div>
        <div class="platform-main">
          <div class="left">
            <div class="phone">
              <div>联系方式：</div>
              <div>{{serviceMsg.phones}}</div>
            </div>
            <div class="address">
              <div>联系地址：</div>
              <div>{{serviceMsg.addr}}</div>
            </div>
          </div>
          <div class="right">
            <div class="code">
              <template v-if="serviceMsg.code!=''">
                <img :src="serviceMsg.code" alt />
              </template>
              <template v-else>
                <img src="../../static/images/code.jpeg" alt />
              </template>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import bus from "../assets/js/bus";
export default {
  data() {
    return {
      picurl: "http://lb3.28888753.cn/imges/",
      // 侧边栏
      sideBar: "",
      //  首页
      serviceLog: "",
      actNum: "",
      browseNum: "",
      shareNum: "",
      serviceMsg: "",
      userMsg: "",
    };
  },
  created() {
    this.getIndexData();
  },
  methods: {
    getIndexData() {
      var uid = localStorage.getItem("uid");
      const params = new URLSearchParams();
      params.append("uid", uid);
      this.$http
        .post(this.$api.systemIndex.systemIndex, params, true)
        .then((result) => {
          // 系统首页
          this.actNum = result.data.activity_num;
          this.browseNum = result.data.views_num;
          this.shareNum = result.data.share_volume;
          this.serviceLog = result.data.getnoticeVOList;
          this.serviceMsg = result.data.getUsersCustomerServiceList[0];
          // 用户
          this.userMsg = result.data.getUsersVO;
          // 侧边栏
          this.sideBar = result.data.getRolePermissionVOList;
          bus.$emit("userMsg", this.userMsg);
          bus.$emit("sideBar", this.sideBar);
          localStorage.setItem("userMsg", JSON.stringify(this.userMsg));
          localStorage.setItem("sideBar", JSON.stringify(this.sideBar));
        });
    },
  },
};
</script>
 
<style>
.index-warpper .el-card__body {
  overflow: hidden;
  padding: 15px 20px;
}
.index-warpper .top-tip {
  margin-bottom: 20px;
}
.index-warpper .top-tip .top-tip-card {
  overflow: hidden;
}
.index-warpper .top-tip .top-tip-card dt {
  float: left;
  font-size: 13.5px;
  color: #303133;
  margin-right: 5%;
}
.index-warpper .top-tip .top-tip-card dd {
  float: left;
  width: 35%;
  text-align: center;
}
.index-warpper .top-tip-card dd a {
  font-size: 13.5px;
  color: #303133;
}
.index-warpper .top-tip-card dd .rund {
  font-size: 13.5px;
  color: #c0c4cc;
}
.index-warpper .top-tip-card dd .new-msg {
  height: 19px;
  font-size: 12px;
  background-color: #fee;
  border: solid 1px #fdd;
  color: #ff5353;
  padding: 3px 5px;
  line-height: 19px;
  border-radius: 4px;
}
.index-warpper .top-tip-card dd .more {
  font-size: 13.5px;
  color: #303133;
}
.index-warpper .top-tip .top-tip-card dd:last-child {
  width: 8%;
  float: right;
  text-align: right;
}
.index-warpper .index-warpper {
  width: 100%;
}
.index-warpper .index-warpper .warp {
  width: 100%;
  display: flex;
  align-items: center;
}
/* 系统信息 */
.index-warpper .service-msg {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.index-warpper .service-msg .el-card {
  border-radius: 0;
}
.index-warpper .service-msg .msg-card {
  box-sizing: border-box;
  width: 24%;
  padding: 10px 30px 10px 10px;
  margin-right: 20px;
  overflow: hidden;
}
.index-warpper .service-msg .msg-card .msg-icon {
  float: left;
  width: 48px;
  height: 48px;
  padding: 20px;
  text-align: center;
  line-height: 48px;
  font-size: 48px;
  color: #2ec7c9;
}
.index-warpper .service-msg .msg-card .msg-icon.msg-icon2 {
  color: #8d98b3;
}
.index-warpper .service-msg .msg-card .msg-icon.msg-icon3 {
  color: #97b552;
}
.index-warpper .msg-card .msg-icon .iconfont {
  font-size: 48px;
}
.index-warpper .service-msg .msg-card:hover .msg-icon.msg-icon1 {
  background-color: #2ec7c9;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
  transition: color 0.5s ease-in-out;
}
.index-warpper .service-msg .msg-card:hover .msg-icon.msg-icon2 {
  background-color: #8d98b3;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
  transition: color 0.5s ease-in-out;
}
.index-warpper .service-msg .msg-card:hover .msg-icon.msg-icon3 {
  background-color: #97b552;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.5s ease-in-out;
  transition: color 0.5s ease-in-out;
}
.index-warpper .service-msg .msg-card .msg {
  float: right;
  text-align: right;
}
.index-warpper .service-msg .msg-card .el-card__body {
  padding: 0;
}
.index-warpper .msg-card .msg .msg-txt {
  padding: 18px 0 10px 0;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
}
.index-warpper .msg-card .msg .num {
  font-weight: bold;
  color: #666;
}
/* 用户卡片 */
.index-warpper .warp {
  display: flex;
}
.index-warpper .user-card {
  width: 49.6%;
  height: 290px;
}
.index-warpper .user-card .top {
  width: 100%;
  line-height: 40px;
  overflow: hidden;
}
.index-warpper .user-card .top .user-pic {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  float: left;
  margin-right: 20px;
  overflow: hidden;
}
.index-warpper .top .user-pic img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.index-warpper .top .user-name {
  float: left;
  color: #409eff;
}
.index-warpper .user-card .middle {
  width: 100%;
  padding: 20px 0;
  margin: 10px 0 5px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  background-color: #f8f8f8;
}
.index-warpper .user-card .middle .num {
  margin-bottom: 5px;
}
.index-warpper .user-card .middle .txt {
  font-size: 12px;
  font-weight: normal;
}
.index-warpper .user-card .bottom {
  margin: 20px 0;
  overflow: hidden;
}
.index-warpper .user-card .bottom .btn-box {
  width: 33.33%;
  margin-bottom: 20px;
  float: left;
  text-align: center;
}
.index-warpper .bottom .btn-box .el-button {
  width: 140px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 0;
  font-size: 16px;
}
.index-warpper .user-card .user-login-time {
  width: 100%;
  font-size: 10px;
  text-align: center;
  color: #909399;
}
/* 平台信息 */
.index-warpper .platform-card {
  width: 32%;
  height: 290px;
  margin-left: 20px;
}
.index-warpper .platform-card .title {
  width: 100%;
  margin-bottom: 30px;
  line-height: 40px;
  overflow: hidden;
}
.index-warpper .platform-card .title .title-pic {
  width: 40px;
  height: 40px;
  float: left;
  margin-right: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.index-warpper .platform-card .title span {
  color: #409eff;
}
.index-warpper .title .title-pic img {
  display: block;
  width: 100%;
}
.index-warpper .platform-card .platform-main {
  width: 100%;
  line-height: 25px;
  font-size: 16px;
  color: #303133;
}
.index-warpper .platform-card .platform-main .left {
  float: left;
}
.index-warpper .platform-card .platform-main .phone {
  margin-bottom: 10px;
}
.index-warpper .platform-card .platform-main .right {
  float: right;
}
.index-warpper .platform-main .right .code {
  width: 90px;
  height: 90px;
}
.index-warpper .right .code img {
  width: 100%;
}
</style>