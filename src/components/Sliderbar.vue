<template>
  <!-- 未给默认激活状态 -->
  <div class="sidenav">
    <el-menu
      :collapse="!folding"
      :default-active="onRoutes"
      class="sidenav-el-menu"
      background-color="#2c3031"
      text-color="#cacaca"
      router
    >
      <template>
        <div class="logo">
            <!-- <img src="../../static/images/logo-icon.png" alt /> -->
        </div>
      </template>
      <template v-for="item in sideBar">
        <el-menu-item
          :index="item.permissionUrl"
          v-if="item.rolePermissionVOList.length==0&&item.permissionAvailable==1"
        >
          <i class="iconfont" :class="item.sysIcon"></i>
          <span slot="title">{{item.permissionName}}</span>
        </el-menu-item>
        <el-submenu
          :index="item.permissionUrl"
          v-else-if="item.rolePermissionVOList.length>0&&item.permissionAvailable==1"
        >
          <template slot="title">
            <i class="iconfont" :class="item.sysIcon"></i>
            <span>{{item.permissionName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="listItem.permissionUrl"
              v-for="(listItem,listIndex) in item.rolePermissionVOList"
              :key="listIndex"
              v-if="listItem.permissionAvailable==1"
            >{{listItem.permissionName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../assets/js/bus";
export default {
  data() {
    return {
      folding: true,
      sideBar: "",
    };
  },
  created: function () {
    bus.$on("folding", (result) => {
      this.folding = result;
      bus.$emit("content-main", result);
    });
    bus.$on("sideBar", (result) => {
      this.sideBar = result;
    });
    this.getData();
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
  },
  methods: {
    getData: function () {
      let newSideBar = JSON.parse(localStorage.getItem("sideBar"));
      if (newSideBar) {
        this.sideBar = newSideBar;
      }
    },
  },
};
</script>
<style>
.sidenav {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
}
.sidenav .logo {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  background: #2c3031;
  text-align: center;
}
.sidenav .logo img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.el-menu-item-group__title {
  display: none;
}
.sidenav ul li ul li {
  background-color: #1e2122 !important;
}
.sidenav ul li ul li:hover {
  background-color: #000 !important;
}
.sidenav .el-menu--collapse {
  width: 54px;
}
.sidenav::-webkit-scrollbar {
  width: 0;
}
.sidenav-el-menu:not(.el-menu--collapse) {
  width: 210px;
}
.sidenav > ul {
  height: 100%;
}
.el-menu-item i {
  margin-right: 10px;
}
.el-submenu__title i {
  margin-right: 10px;
  color: #cacaca;
}
</style>