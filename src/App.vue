<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
    <!-- <router-view name="head"></router-view>
    <router-view name="sidebar"></router-view> -->
    <template v-if="pagePath === '/login'">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="home-container">
        <div class="container" :class="[folding ? 'container-collapse' : '']">
          <v-head></v-head>
          <div class="content">
            <div class="content-main">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </div>
          <div class="footer">
            Copyright 2007-2020 顺的网络. All Rights Reserved
          </div>
        </div>
        <v-sidebar></v-sidebar>
      </div>
    </template>
  </div>
</template>
<script>
// import bus from "./common/js/bus";
// import vHead from "./common/Head";
// import vSidebar from "./common/Sliderbar";
import bus from "./assets/js/bus";
import vHead from "./components/Head";
import vSidebar from "./components/Sliderbar";
export default {
  name: "App",
  components: {
    vHead,
    vSidebar
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      pagePath: "/",
      folding: true
    };
  },
  watch: {
    $route(value) {
      console.log("value", value);
      this.pagePath = value.path;
    },
  },
  created() {
    bus.$on("content-main", (result) => {
      console.log("result", result)
      this.folding = result;
    })
    bus.$emit("content", this.$refs.content);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
@import "./assets/css/common.css";
</style>
