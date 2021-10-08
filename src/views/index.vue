<template>
  <div class="index_warpper">
    <div class="top-tip">
      <el-card>
        <dl>
          <dt>系统公告</dt>
          <dd>
            <i class="rund">●</i>
            <router-link :to="{path:'/sys/tip/detail',query:{ids:`${serviceLog[0].id}`}}">
              {{serviceLog[0].title}}
              <span>{{serviceLog[0].createTime_show}}</span>
            </router-link>
            <span class="tag">新</span>
          </dd>
          <dd>
            <i class="rund">●</i>
            <router-link :to="{path:'/sys/tip/detail',query:{ids:`${serviceLog[1].id}`}}">
              {{serviceLog[1].title}}
              <span>{{serviceLog[1].createTime_show}}</span>
            </router-link>
            <span class="tag">新</span>
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
    <div class="columns">
        <div class="item">
          <div class="column-icon column-icon1">
             <i class="iconfont icon-icon"></i>
          </div>
          <div class="data">
            <div class="activity data-title">活动总数</div>
            <div class="num">{{actNum}}</div>
          </div>
        </div>
        <div class="item">
          <div class="column-icon column-icon2">
            <i class="el-icon-view"></i>
          </div>
          <div class="data">
            <div class="browse data-title">总浏览量</div>
            <div class="num">{{browseNum}}</div>
          </div>
        </div>
        <div class="item">
            <div class="column-icon column-icon3">
              <i class="iconfont icon-fenxiang"></i>
            </div>
            <div class="data">
              <div class="share data-title">总分享量</div>
              <div class="num">{{shareNum}}</div>
            </div>
        </div>
        <div class="item about-user">
          <div class="user-message">
            <div class="picture">
              <template v-if="userMsg.images!=''">
                <img :src="picurl + userMsg.images" alt />
              </template>
              <template v-else>
                <img src="../../static/images/defUserPic.png" alt />
              </template>
            </div>
            <div class="name">{{userMsg.usersName}}</div>
          </div>
          <div class="money">
            <template v-if="userMsg.smallChange_money_show!=null">
              <div class="num">{{userMsg.smallChange_money_show}}</div>
            </template>
            <template v-else>
              <div class="num">0.00</div>
            </template>
            <div class="word">余额（元）</div>
          </div>
          <div class="navigation-button">
            <div class="button-box">
              <router-link to="/act/activity/create">
                <el-button type="button">创建活动</el-button>
              </router-link>
            </div>
            <div class="button-box">
              <router-link to="/funds/payment/create">
                <el-button type="button">充值</el-button>
              </router-link>
            </div>
            <div class="button-box">
              <router-link to="/funds/cash/opencash">
                <el-button type="button">提现</el-button>
              </router-link>
            </div>
          </div>
          <div class="user-login-time">上次登入时间：{{userMsg.recentLogin}}</div>
        </div>
        <div class="item platform">
          <div class="platform-message">
            <div class="picture">
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
            <div class="platform-code">
              <div class="code">
                <template v-if="serviceMsg.code!=''">
                  <img :src="picurl + serviceMsg.code" alt />
                </template>
                <template v-else>
                  <img src="../../static/images/code.jpeg" alt />
                </template>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import bus from "../assets/js/bus";
import { image_url } from "../assets/js/common.js"
export default {
  data() {
    return {
      picurl: image_url,
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
    // 获取首页数据
    getIndexData() {
      const uid = localStorage.getItem("uid");
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
@import "../assets/css/index.css"
</style>