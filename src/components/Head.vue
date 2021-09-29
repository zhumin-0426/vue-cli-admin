<template>
  <div class="head-container">
    <!-- 折叠按钮 -->
    <div class="folding-btn" @click="foldingChange">
      <i v-if="!folding" class="iconfont icon-daohangzhankai-"></i>
      <i v-else class="iconfont icon-weibiaoti26"></i>
    </div>
    <!-- 面包屑导航 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
          <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 用户下拉菜单 -->
    <el-dropdown class="select-warper" >
      <span class="el-dropdown-link" style="color:#303133">
        <span>{{userMsg.usersName}}</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="select-list" style="color:#303133">
        <router-link :to="{path:'/user/info'}">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link>
        <router-link :to="{path:'/user/password'}">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <router-link :to="{path:'/user/wx'}">
          <el-dropdown-item>微信绑定</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click.native="outLogin">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 用户头像 -->
    <div class="user-pic">
      <template v-if="userMsg.images!=''">
        <img :src="picurl+userMsg.images" alt />
      </template>
      <template v-else>
        <img src="../../static/images/defUserPic.png" alt />
      </template>
    </div>
    <!-- 全屏伸缩 -->
    <div class="full-screen" @click="handleFullScreen">
      <el-tooltip class="full-screen-btn" effect="dark" content="全屏" placement="bottom-start">
        <el-button>
          <div class="full-screen-icon">
            <i class="el-icon-rank" style="color: #303133;font-size: 20px;"></i>
          </div>
        </el-button>
      </el-tooltip>
    </div>
    <!-- 清理缓存 -->
    <!-- <div class="remove">
      <el-tooltip class="remove-btn" effect="dark" content="清理缓存并刷新当前页面" placement="bottom-start">
        <el-button>
          <div class="remove-icon">
            <i class="iconfont icon-exchangerate" style="color: #303133;font-size: 20px;"></i>
          </div>
        </el-button>
      </el-tooltip>
    </div> -->
    <!-- 返回上一页 -->
    <div class="page-back" @click="backTarget">
      <el-tooltip class="page-back-btn" effect="dark" content="返回" placement="bottom-start">
        <el-button>
          <i class="el-icon-back" style="color: #303133;font-size: 20px;"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
const pathToRegexp = require('path-to-regexp');
import bus from "../assets/js/bus";
export default {
  inject: ["reload"],
  data() {
    return {
      picurl: "http://lb3.28888753.cn/imges/",
      folding: true,
      levelList: null,
      userMsg:"",
      fullscreen:false
    };
  },
  created() {
    this.getBreadList();
    bus.$on("userMsg",result=>{
       this.userMsg = result
    })
    this.getData();
  },
  watch: {
    $route() {
      this.getBreadList();
    }
  },
  methods: {
    getData:function(){
       let newUserMsg = JSON.parse(localStorage.getItem("userMsg"));
       if(newUserMsg){
          this.userMsg = newUserMsg;
       }
    },
    // 退出登入
    outLogin:function(){
      localStorage.removeItem("uid");
      localStorage.removeItem("openId");
      window.location.reload();
    },
    // 面包屑导航
    getBreadList: function() {
      console.log(this.$route.matched);
      let matched = this.$route.matched.filter(item => item.meta.title); //$route.matched 将会是一个包含从上到下的所有对象 (副本)。
      this.levelList = matched;
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path); //url 的正则表达式,快速填充 url 字符串的参数值。
      return toPath(params);
    },
    foldingChange: function() {
      this.folding = !this.folding;
      bus.$emit("folding", this.folding);
    },
    // 返回上一页
    backTarget: function() {
      this.$router.go(-1);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style scoped>
.head-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  overflow: hidden;
}
.head-container .folding-btn {
  width: 80px;
  text-align: center;
  color: #fff;
  float: left;
}
.head-container .nav .el-breadcrumb {
  float: left;
  height: 50px;
  line-height: 50px;
}
.head-container .folding-btn:hover {
  background: rgba(0,0,0,.025);
}
.head-container .folding-btn .iconfont {
  font-size: 20px;
  color: #303133;
}
.head-container .page-back {
  float: right;
  padding-top: 3px;
  position: relative;
}
.head-container .page-back .page-back-btn {
  font-size: 30px;
  color: #fff;
  text-align: center;
  background: none;
  border: none;
}
.head-container .page-back .el-button {
  padding: 0;
}
.page-back .page-back-btn .el-icon-back {
  font-weight: bold;
}
.head-container .full-screen {
  float: right;
  position: relative;
  padding-top: 3px;
  margin: 0 10px;
}
.head-container .full-screen .full-screen-btn {
  font-size: 30px;
  color: #fff;
  text-align: center;
  background: none;
  border: none;
}
.full-screen .full-screen-btn .full-screen-icon {
  transform: rotate(45deg);
}
.head-container .full-screen .el-button {
  padding: 0;
}
.head-container .remove {
  float: right;
  position: relative;
  padding-top: 3px;
  margin-left: 10px;
}
.head-container .remove .remove-btn {
  font-size: 30px;
  color: #fff;
  text-align: center;
  background: none;
  border: none;
}
.remove .remove-btn .remove-icon {
  transform: rotate(45deg);
}
.head-container .remove .el-button {
  padding: 0;
}
.head-container .user-pic {
  float: right;
  padding-top: 3px;
  margin-right: 15px;
}
.head-container .user-pic img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.head-container .select-warper {
  float: right;
  margin-right: 50px;
}
.head-container .select-warper .el-dropdown-link {
  color: #fff;
}
</style>