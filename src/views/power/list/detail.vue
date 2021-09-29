<template>
  <div class="deliverySetting">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
        style="display: flex;align-items: center;justify-content: space-between;"
      >
        <span>权限修改</span>
        <el-button type="primary" @click="changePms">立即修改</el-button>
      </div>
      <div class="deliverySetting-table">
        <el-checkbox-group v-model="checkList">
          <div
            class="table-body"
            v-for="(partition,partitionIndex) in distributorsInfo"
            :key="partitionIndex"
          >
            <div class="selection">
              <el-checkbox
                :label="partition.id"
                @change="handleCheckedCountryAllChange(partitionIndex,partition.partitionId,$event)"
                :key="partitionIndex"
              >{{ partition.permissionName }}</el-checkbox>
            </div>
            <div class="width185">
              <p>{{ partition.permissionName }}</p>
            </div>
            <!-- 二级 -->
            <div class="width265">
              <el-checkbox
                v-for="(country,countryIdx) in partition.rolePermissionVOList"
                :key="countryIdx"
                @change="handleCheckedCountryChange(partitionIndex,country.id,partition.partitionId,$event)"
                :label="country.id"
              >{{country.permissionName}}</el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "deliverySetting",
  components: {},
  props: {},
  data() {
    return {
      checkList: [],
      checkedCities: "",
      levelOne: "",
      distributorsInfo: [],
      ischeckAll: false, //一级全选状态
      setDistributorDailog: false,
      indeterminate: false,
    };
  },
  created() {
    this.pmsAll();
    // 初始化权限
    this.initial();
  },
  methods: {
    initial() {},
    // 权限集合
    pmsAll() {
      var id = this.$route.query.id;
      const params = new URLSearchParams();
      params.append("ids", id);
      this.$http
        .post(this.$api.poalDel.poalDel, params, true)
        .then((result) => {
          console.log("权限集合", result);
          this.distributorsInfo = result.data.getRolePermissionVOList;
          for (let i = 0; i < result.data.getRole_yi_xuan_VOList.length; i++) {
            this.checkList.push(result.data.getRole_yi_xuan_VOList[i].id);
          }
        });
    },
    // 修改权限
    changePms: function () {
      var id = this.$route.query.id;
      const params = new URLSearchParams();
      params.append("ids", id);
      params.append("idList", this.checkList.join());
      this.$http
        .post(this.$api.changePms.changePms, params, true)
        .then((result) => {
          console.log("修改权限", result);
          this.successMsg();
          this.$router.push({
            path: "/pms/poal",
          });
        });
    },
    successMsg() {
      this.$message({
        message: "恭喜你，修改权限成功",
        type: "success",
      });
    },
    handleCheckAllChange(e) {
      //一级change事件
      this.ischeckAll = e;
      if (e == true) {
        this.indeterminate = false;
        for (var i = 0, len = this.distributorsInfo.length; i < len; i++) {
          //二级全选反选不确定
          this.distributorsInfo[i].selected = e;
          for (
            var j = 0,
              len1 = this.distributorsInfo[i].rolePermissionVOList.length;
            j < len1;
            j++
          ) {
            this.distributorsInfo[i].rolePermissionVOList[j].selected = e;
          }
        }
      } else {
        this.indeterminate = false;
        for (var i = 0, len = this.distributorsInfo.length; i < len; i++) {
          //三级全选反选不确定
          this.distributorsInfo[i].selected = e;
          for (
            var j = 0,
              len1 = this.distributorsInfo[i].rolePermissionVOList.length;
            j < len1;
            j++
          ) {
            this.distributorsInfo[i].rolePermissionVOList[j].selected = e;
          }
        }
      }
    },
    handleCheckedCountryAllChange(index, topId, e) {
      console.log("b");
      //二级change事件
      this.distributorsInfo[index].selected = e; //二级勾选后，子级全部勾选或者取消
      if (e == false) this.distributorsInfo[index].indeterminate = false; //去掉二级不确定状态
      var childrenArray = this.distributorsInfo[index].rolePermissionVOList;
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].selected = e;

      this.getIsCheckAll();
    },
    handleCheckedCountryChange(topIndex, sonId, topId, e) {
      console.log("a");
      //三级change事件
      var childrenArray = this.distributorsInfo[topIndex].rolePermissionVOList;
      var tickCount = 0,
        unTickCount = 0,
        len = childrenArray.length;
      for (var i = 0; i < len; i++) {
        if (sonId == childrenArray[i].id) childrenArray[i].selected = e;
        if (childrenArray[i].selected == true) tickCount++;
        if (childrenArray[i].selected == false) unTickCount++;
      }
      if (tickCount == len) {
        //三级级全勾选
        this.distributorsInfo[topIndex].selected = true;
        this.distributorsInfo[topIndex].indeterminate = false;
      } else if (unTickCount == len) {
        //三级级全不勾选
        this.distributorsInfo[topIndex].selected = false;
        this.distributorsInfo[topIndex].indeterminate = false;
      } else {
        this.distributorsInfo[topIndex].selected = false;
        this.distributorsInfo[topIndex].indeterminate = true; //添加二级不确定状态
      }

      this.getIsCheckAll();
    },
    getIsCheckAll() {
      var tickCount = 0,
        unTickCount = 0,
        ArrLength = this.distributorsInfo.length;
      for (var j = 0; j < ArrLength; j++) {
        //全选checkbox状态
        if (this.distributorsInfo[j].selected == true) tickCount++;
        if (this.distributorsInfo[j].selected == false) unTickCount++;
      }
      if (tickCount == ArrLength) {
        //二级全勾选
        this.ischeckAll = true;
        this.indeterminate = false;
      } else if (unTickCount == ArrLength) {
        //二级全不勾选
        this.ischeckAll = false;
        this.indeterminate = false;
      } else {
        this.ischeckAll = false;
        this.indeterminate = true; //添加一级不确定状态
      }
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.deliverySetting {
  padding: 20px 0;
  position: relative;
  .el-table {
    thead {
      tr {
        th {
          font-size: 14px;
        }
      }
    }
    tbody {
      tr {
        td {
          vertical-align: baseline;
          p {
            line-height: 30px;
          }
          .el-checkbox-group {
            display: flex;
            flex-direction: column;
            label {
              line-height: 30px;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
  .deliverySetting-table {
    font-size: 14px;
    color: #333;
    .table-head,
    .table-body {
      display: flex;
      padding: 10px 0;
      .selection {
        width: 45px;
        text-align: center;
        line-height: 36px;
      }
      .width185 {
        width: 185px;
      }
      .width265 {
        width: 265px;
      }
    }
    .table-head {
      height: 36px;
      align-items: center;
      background-color: #e7f2ff;
    }
    .table-body {
      border-bottom: 1px solid #e4e4e4;
      color: #666;
      &:hover {
        background-color: #f5f7fa;
      }
      .width265 {
        display: flex;
        flex-direction: column;
        label {
          line-height: 30px;
          margin-left: 0;
          color: #666;
        }
      }
      p {
        line-height: 30px;
      }
    }
  }
  .deliverySetting-btn {
    /*width: 100%;*/
    height: 59px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: -55px;
    right: -16px;
    z-index: 100;
    .tabs-btn {
      min-width: 90px;
      height: 34px;
      line-height: 32px;
      padding: 0 10px;
      color: #2387f7;
      border: solid 1px #4fa2ff;
      background-color: #e7f2ff;
      cursor: pointer;
      &:nth-of-type(2) {
        margin: 0 15px;
      }
      input {
        border: none;
        background: transparent;
        color: inherit;
        cursor: inherit;
        outline: none;
        margin: 0;
        padding: 0;
      }
      &:hover {
        color: #fff;
        background-color: #2387f7;
      }
    }
  }
  .setDistributorDailog {
    .el-input {
      width: 270px;
    }
  }
}
</style>