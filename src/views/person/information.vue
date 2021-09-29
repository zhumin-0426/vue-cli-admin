<template>
  <div class="info">
    <!-- 个人信息 -->
    <el-card class="person-info">
      <div slot="header" class="info-top">
        <div class="person-pic">
          <template v-if="userMessage.images!=''">
            <img :src="picurl+userMessage.images" alt />
          </template>
          <template v-else>
            <img src="../../../static/images/defUserPic.png" alt />
          </template>
        </div>
        <div class="info">
          <div class="name">{{userMessage.usersName}}</div>
          <div class="money">
            <template v-if="userMessage.smallChange_money_show!=null">
              <span class="num">{{userMessage.smallChange_money_show}}</span>
            </template>
            <template v-else>
              <span class="num">0.00</span>
            </template>
            元
          </div>
        </div>
        <div class="payment-btn">
          <el-button type="primary" @click="targetChange">充值</el-button>
          <template v-if="role=='1'||role=='3'">
            <router-link to="/user/appmsg">
              <el-button type="success">设置</el-button>
            </router-link>
          </template>
        </div>
      </div>
      <div class="info-bottom">
        <div class="info-item">地区：{{userMessage.region_province_city}}</div>
        <div class="info-item">账号：0/0(已开通/总数量)</div>
        <div class="info-item">时间：{{userMessage.recentLogin}}</div>
        <div class="info-item">
          商户类型：
          <span v-if="userMessage.merchantType=='1'">个人</span>
          <span v-else>企业</span>
        </div>
        <div class="info-item">负责人姓名：{{userMessage.usersName}}</div>
        <div class="info-item">负责人电话：{{userMessage.usersPhone}}</div>
      </div>
    </el-card>
    <!-- 修改账户信息 -->
    <div class="updata">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改账户信息</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px">
          <div class="main">
            <div class="tip">
              <div class="title">
                <div class="line"></div>
                <div class="txt">用户信息</div>
              </div>
            </div>
            <!-- 头像 -->
            <div class="up-person-img">
              <el-form-item label="头像" prop="userPicurl">
                <div class="photo-toload" ref="pic">
                  <template v-if="ruleForm.userPicurl==''">
                    <div class="block" @click="popupActive('userpic')"></div>
                    <i class="iconfont icon-add-select"></i>
                  </template>
                  <template v-else>
                    <template v-if="ruleForm.userPicurl==''">
                      <img src="../../../static/images/defUserPic.png" alt />
                    </template>
                    <template v-else>
                      <img :src="picurl+ruleForm.userPicurl" alt />
                      <div class="cover">
                        <i class="el-icon-zoom-in" @click="bigPicMirror('userPicurl')"></i>
                        <i class="el-icon-edit" @click="popupActive('userpic')"></i>
                        <i class="el-icon-delete" @click="delUserPic"></i>
                      </div>
                    </template>
                  </template>
                </div>
              </el-form-item>
            </div>
            <!-- 紧急联系人姓名 -->
            <div class="up-contact-name">
              <el-form-item label="紧急联系人姓名">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
            <!-- 紧急联系人电话 -->
            <div class="up-contact-phone">
              <el-form-item label="紧急联系人电话">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </div>
            <div class="tip">
              <div class="title">
                <div class="line"></div>
                <div class="txt">
                  商家信息
                  <span>(创建活动会展示商家信息)</span>
                </div>
              </div>
            </div>
            <!-- 商家名称 -->
            <div class="up-merchants-name">
              <el-form-item label="商家名称" prop="busName">
                <el-input v-model="ruleForm.busName" maxlength="13" show-word-limit></el-input>
              </el-form-item>
            </div>
            <!-- 商家定位 -->
            <div class="up-merchants-address">
              <el-form-item label="商家定位" prop="lat">
                <el-input
                  v-model="ruleForm.lat!=''?busPositionSuc:busPositionErr"
                  disabled
                  :placeholder="[ruleForm.lat!=''&&ruleForm.lon!=''?'已获取商家定位':'请点击定位按钮选择商家定位']"
                ></el-input>
                <el-button type="primary" @click="openMap">定位</el-button>
              </el-form-item>
            </div>
            <!-- 商家地址 -->
            <div class="up-merchants-location">
              <el-form-item label="商家地址" prop="busAddress">
                <el-input
                  v-model="ruleForm.busAddress"
                  type="textarea"
                  placeholder="请填写商家地址"
                  maxlength="50"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
            <!-- 商家电话 -->
            <div class="up-merchants-phone">
              <el-form-item label="商家电话" prop="busPhone">
                <el-input v-model="ruleForm.busPhone" placeholder="请输入商家电话"></el-input>
              </el-form-item>
            </div>
            <!-- 商家二维码 -->
            <div class="up-person-img">
              <el-form-item label="商家二维码" prop="codePicurl">
                <div class="photo-toload">
                  <template v-if="ruleForm.codePicurl==''">
                    <div class="block" @click="popupActive('code')"></div>
                    <i class="iconfont icon-add-select"></i>
                  </template>
                  <template v-if="ruleForm.codePicurl!=''">
                    <img :src="picurl+ruleForm.codePicurl" alt />
                    <div class="cover">
                      <i class="el-icon-zoom-in" @click="bigPicMirror('codePicurl')"></i>
                      <i class="el-icon-edit" @click="popupActive('code')"></i>
                      <i class="el-icon-delete" @click="delCodePic"></i>
                    </div>
                  </template>
                </div>
              </el-form-item>
            </div>
            <div class="prompt">1.图片尺寸比例为1：1；2.图片大小必须小于100KB</div>
            <!-- 按钮 -->
            <div class="updata-btn">
              <el-button type="primary" @click="upUsermsg('ruleForm')">更新</el-button>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
    <!-- 图片上传弹窗 -->
    <div class="popup" v-if="popupAct">
      <div class="head">
        <div class="title">文件管理</div>
        <div class="delete" @click="popupActive">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <ul class="content">
        <li v-for="(item,index) in picList" :key="index">
          <div
            class="licove"
            @dblclick="selPic($event)"
            :data-picUrl="item.urls"
            :data-types="types"
          ></div>
          <div class="pic">
            <img :src="picurl+item.urls" alt />
          </div>
          <div class="pic-msg">
            <div class="serve">{{item.names}}</div>
            <div class="time">{{item.sizes}}KB {{item.createTime}}</div>
          </div>
        </li>
      </ul>
      <div class="popup-footer">
        <div class="btn-warpper">
          <el-button size="medium" @click="prevPage">上一页</el-button>
          <el-button size="medium" @click="nextPage">下一页</el-button>
          <el-button type="primary" size="medium">
            <i class="el-icon-upload"></i>本地上传
            <input
              type="file"
              :data-types="types"
              name="sharePic"
              @change="handleFileChange($event)"
              ref="inputer"
            />
          </el-button>
        </div>
      </div>
    </div>
    <!-- 图片放大镜 -->
    <el-dialog
      :modal="false"
      :modal-append-to-body="false"
      :visible.sync="picBigMirror"
      width="50%"
      top="7vh"
      center
    >
      <img style="display:block;max-width:500px;margin:0 auto" :src="picName=='userPicurl'?picurl+ruleForm.userPicurl:picurl+ruleForm.codePicurl" alt />
    </el-dialog>
    <!-- 地图 -->
    <el-dialog
      title="商家位置"
      :visible.sync="centerDialogVisible"
      width="80%"
      top="7vh"
      left
      :modal-append-to-body="false"
      :show-close="false"
    >
      <div class="dialog_main">
        <div class="map-warpper">
          <Map></Map>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../../assets/js/bus";
import Events from "../../assets/js/events";
import Map from "../../components/Map";
export default {
  components: {
    Map,
  },
  data() {
    return {
      popupAct: false, //图片弹窗
      page: 1,
      pageSize: "8",
      tatol: 0,
      tableData: [],
      file: "",
      formData: [],
      picurl: "http://lb3.28888753.cn/imges/",
      picList: [],
      types: "1",
      // 总页
      allCodePic: "",
      allUserPic: "",
      // 显示信息
      userMessage: "",
      busPositionSuc: "已获取商家定位",
      busPositionErr: "请点击定位按钮选择商家定位",
      // 更新数据
      ruleForm: {
        userPicurl: "",
        name: "",
        phone: "13534363188",
        busName: "",
        lon: "",
        lat: "",
        busAddress: "",
        busPhone: "",
        serviceId: "",
        // 二维码
        codePicurl: "",
      },
      // 图片放大镜
      picBigMirror: false,
      picName:"",
      // 地图显示
      centerDialogVisible: false,
      searchAdr: "",
      //表单验证
      rules: {
        userPicurl: [
          { required: true, message: "请上传头像", trigger: "blur" },
        ],
        busName: [
          { required: true, message: "请设置正确的商家名称", trigger: "blur" },
        ],
        lat: [
          { required: true, message: "请设置正确的商家定位", trigger: "blur" },
        ],
        busAddress: [
          { required: true, message: "请设置正确的商家地址", trigger: "blur" },
        ],
        busPhone: [
          { required: true, message: "请设置正确的商家电话", trigger: "blur" },
        ],
        codePicurl: [{ required: true, message: "请上传公众号二维码" }],
      },
      role: "",
    };
  },
  created() {
    this.userMsg();
    bus.$on("mapAct", (result) => {
      this.centerDialogVisible = result;
    });
    // 获取经纬度
    bus.$on("pos", (result) => {
      this.ruleForm.lon = result.lng;
      this.ruleForm.lat = result.lat;
    });
  },
  methods: {
    // 图片放大镜
    bigPicMirror: function (picName) {
      this.picName = picName;
      this.picBigMirror = !this.picBigMirror;
    },
    targetChange: function () {
      this.$router.push({
        path: "/funds/payment/create",
      });
    },
    // 显示用户信息
    userMsg: function () {
      this.role = localStorage.getItem("role");
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("upUid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.userMsg.userMsg, params, true)
        .then((result) => {
          if ((result.data.state = "success")) {
            this.userMessage = result.data.getUsers;
            this.ruleForm.userPicurl = result.data.getUsers.images;
            this.ruleForm.name = result.data.getUsers.contactPersonName;
            this.ruleForm.phone = result.data.getUsers.contactPersonPhone;
            this.ruleForm.busName = result.data.getUsersCustomerServiceVO.names;
            this.ruleForm.lon = result.data.getUsersCustomerServiceVO.longitude;
            this.ruleForm.lat = result.data.getUsersCustomerServiceVO.latitude;
            this.ruleForm.busAddress =
              result.data.getUsersCustomerServiceVO.addr;
            this.ruleForm.busPhone =
              result.data.getUsersCustomerServiceVO.phones;
            this.ruleForm.codePicurl =
              result.data.getUsersCustomerServiceVO.code;
            this.ruleForm.serviceId = result.data.getUsersCustomerServiceVO.id;
          }
        });
    },
    // 更新个人信息
    upUsermsg: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.serviceId == "") {
            this.ruleForm.serviceId = "0";
          }
          const params = new URLSearchParams();
          params.append("serviceId", this.ruleForm.serviceId);
          params.append("uid", localStorage.getItem("uid"));
          params.append("id", localStorage.getItem("uid"));
          params.append("images", this.ruleForm.userPicurl);
          params.append("contactPersonName", this.ruleForm.name);
          params.append("contactPersonPhone", this.ruleForm.phone);
          params.append("names", this.ruleForm.busName);
          params.append("longitude", this.ruleForm.lon);
          params.append("latitude", this.ruleForm.lat);
          params.append("addr", this.ruleForm.busAddress);
          params.append("phones", this.ruleForm.busPhone);
          params.append("code", this.ruleForm.codePicurl);
          this.$http
            .post(this.$api.usersUp.usersUp, params, true)
            .then((result) => {
              if (result.data.state == "success") {
                Events.sucPrompt(
                  this.$message({
                    showClose: true,
                    message: "恭喜你，用户数据更新成功",
                    type: "success",
                  })
                );
              }
            });
        } else {
          document.getElementsByClassName("content")[0].scrollTop = 0;
          return false;
        }
      });
    },
    // 图片弹窗
    popupActive: function (res) {
      this.popupAct = !this.popupAct;
      if (res == "code") {
        this.types = "3";
      } else {
        this.types = "1";
      }
      if (this.popupAct) {
        this.userpicList(this.types);
      }
    },
    // 本地上传
    handleFileChange: function (e) {
      let types = e.target.dataset.types;
      if (types == "1") {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0]; // 通过DOM取文件数据
        let size = Math.floor(this.file.size / 1024); //计算文件的大小
        this.formData = new FormData(); //new一个formData事件
        this.formData.append("file", this.file); //将file属性添加到formData里
        this.formData.append("uid", localStorage.getItem("uid"));
        this.formData.append("types", "1");
        this.$http
          .post(this.$api.uploadActpic.uploadActpic, this.formData, true)
          .then((result) => {
            this.userpicList(types);
          });
      } else {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0]; // 通过DOM取文件数据
        let size = Math.floor(this.file.size / 1024); //计算文件的大小
        this.formData = new FormData(); //new一个formData事件
        this.formData.append("file", this.file); //将file属性添加到formData里
        this.formData.append("uid", localStorage.getItem("uid"));
        this.formData.append("types", "1");
        this.$http
          .post(this.$api.uploadCode.uploadCode, this.formData, true)
          .then((result) => {
            this.userpicList(types);
          });
      }
    },
    // 图片列表
    userpicList: function (type) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page.toString());
      params.append("types", type);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.upLoderFile.upLoderFile, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.picList = result.data.getUsersUploadVOList;
            this.allUserPic = result.data.page_zong;
          }
        });
    },
    // 上一页
    prevPage: function () {
      if (this.page <= 1) {
        this.page = 1;
        this.userpicList(this.types);
        return;
      }
      this.page -= 1;
      this.userpicList(this.types);
    },
    // 下一页
    nextPage: function () {
      if (this.page < parseInt(this.allUserPic)) {
        this.page += 1;
        this.userpicList(this.types);
      }
    },
    // 选择图片
    selPic: function (event) {
      var types = event.target.dataset.types;
      if (types == "1") {
        this.ruleForm.userPicurl = event.target.dataset.picurl;
        this.popupAct = !this.popupAct;
      } else {
        this.ruleForm.codePicurl = event.target.dataset.picurl;
        this.popupAct = !this.popupAct;
      }
    },
    // 删除头像图片
    delUserPic: function () {
      console.log(this.delUserPic);
      this.ruleForm.userPicurl = "";
      console.log(this.delUserPic);
    },
    // 删除二维码图片
    delCodePic: function (event) {
      this.ruleForm.codePicurl = "";
    },
    openMap: function () {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
  },
};
</script>

<style scoped>
.info .person-info {
  margin-bottom: 20px;
}
.info .person-info .info-top {
  display: flex;
  align-items: center;
}
.person-info .info-top .person-pic {
  width: 45px;
  height: 45px;
  border-radius: 100%;
  overflow: hidden;
}
.info-top .person-pic img {
  width: 100%;
  height: 100%;
}
.person-info .info-top .info {
  margin: 0 20px;
}
.info-top .info .name {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
}
.info-top .info .money {
  color: #66b1ff;
  font-size: 12px;
  line-height: 25px;
}
.person-info .info-bottom {
  overflow: hidden;
  margin-bottom: 20px;
}
.person-info .info-bottom .info-item {
  width: 30%;
  float: left;
  font-size: 14px;
  line-height: 30px;
}
/* 头像 */
.main .up-person-img .photo-toload {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
  position: relative;
  overflow: hidden;
}
.main .up-person-img .photo-toload .block {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.main .up-person-img .photo-toload .cover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.main .up-person-img .photo-toload:hover .cover {
  justify-content: space-around;
  align-items: center;
  display: flex;
}
.photo-toload .cover i {
  font-size: 20px;
  color: #fff;
}
.main .up-person-img .photo-toload img {
  display: block;
  width: 100%;
  max-height: 100%;
  border-radius: 6px;
}
.main .up-person-img .photo-toload:hover {
  border: 1px dashed #409eff;
  transition: border 0.3s;
}
.up-person-img .photo-toload .iconfont {
  font-size: 30px;
  color: #3b3a3a;
}
/* 二维码 */
.main .up-merchants-code .photo-toload {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
}
.main .up-merchants-code .photo-toload:hover {
  border: 1px dashed #409eff;
  transition: border 0.3s;
}
.up-merchants-code .photo-toload .iconfont {
  font-size: 30px;
  color: #3b3a3a;
}
.main .updata-btn {
  box-sizing: border-box;
  width: 100%;
  padding-left: 250px;
}
/* 头像上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 118px;
  height: 118px;
  line-height: 118px;
  text-align: center;
}
.avatar {
  width: 118px;
  height: 118px;
  display: block;
}
/* 弹窗 */
.info .popup {
  border: solid 1px red;
  width: 700px;
  height: 509px;
  border: 1px solid #c5c5c5;
  background-color: #c5c5c5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.info .popup .head {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  line-height: 40px;
  background-color: white;
  overflow: hidden;
}
.popup .head .title {
  float: left;
  font-size: 14px;
  font-weight: 600;
  color: #595959;
}
.popup .head .delete {
  float: right;
  font-size: 14px;
  font-weight: 600;
  color: #595959;
}
.popup .content {
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  overflow: hidden;
}
.popup .content li {
  box-sizing: border-box;
  width: 49%;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: solid 2px #fff;
  position: relative;
}
.popup .content li .licove {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.popup .content li:hover {
  border: solid 2px #409eff;
}
.content li .pic {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}
li .pic img {
  display: block;
  width: 100%;
  height: 100%;
}
li .pic-msg .serve {
  line-height: 20px;
  font-size: 14px;
  color: #595959;
}
li .pic-msg .time {
  line-height: 20px;
  font-size: 12px;
  color: #929292;
}
.popup .content li:nth-child(odd) {
  float: left;
}
.popup .content li:nth-child(even) {
  float: right;
}
.popup .popup-footer {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #fff;
}
.popup .popup-footer .btn-warpper {
  float: right;
}
.redpack-model-warpper span {
  padding: 0 20px;
}
.btn-warpper .el-button {
  position: relative;
}
.btn-warpper .el-button input {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.redpack-model-warpper .el-input {
  width: 16%;
}
.address-type-warpper .el-input {
  width: 300px;
}
</style>