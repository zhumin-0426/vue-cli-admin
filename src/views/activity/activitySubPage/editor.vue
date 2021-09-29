<template>
  <div class="editor">
    <el-card>
      <div slot="header" class="clearfix">
        <span>活动编辑</span>
      </div>
      <!-- form内容区 -->
      <el-form :model="actEditor" ref="ruleForm" label-width="250px" :rules="rules">
        <div class="main-set">
          <div class="tip">
            <div class="title">
              <div class="line"></div>
              <div class="txt">活动内容设置</div>
            </div>
          </div>
          <div class="warpper">
            <el-form-item label="活动名称" prop="actName">
              <el-input
                v-model="actEditor.actName"
                type="textarea"
                placeholder="请输入内容"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="活动结束日期" prop="actEndTime">
              <el-date-picker
                align="right"
                v-model="actEditor.actEndTime"
                :picker-options="pickerOptions"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <div class="prompt">字数在20个以内</div>
            <el-form-item label="开启留言">
              <el-switch v-model="actEditor.leverMsg"></el-switch>
            </el-form-item>
            <el-form-item label="活动详情" prop="actDetail">
              <mavon-editor
                ref="md"
                @imgAdd="handleEditorImgAdd"
                @imgDel="handleEditorImgDel"
                v-model="actEditor.actDetail"
              />
            </el-form-item>
          </div>
        </div>
        <!-- 分享设置 -->
        <div class="share-set">
          <div class="tip">
            <div class="title">
              <div class="line"></div>
              <div class="txt">活动分享设置</div>
            </div>
          </div>
          <el-form-item label="分享标题" prop="shareTitle">
            <el-input
              v-model="actEditor.shareTitle"
              type="textarea"
              placeholder="请输入内容"
              maxlength="40"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div class="prompt">推荐40个汉字以内</div>
          <el-form-item label="分享描述" prop="shareDec">
            <el-input
              v-model="actEditor.shareDec"
              type="textarea"
              placeholder="请输入内容"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <div class="prompt">推荐30个汉字以内</div>
          <!-- 分享图片 -->
          <div class="share-photo">
            <el-form-item label="分享图片" prop="sharePicurl">
              <div class="photo-toload" ref="pic">
                <template v-if="actEditor.sharePicurl==''">
                  <div class="block" @click="popupActive('sharePicurl')"></div>
                  <i class="iconfont icon-add-select"></i>
                </template>
                <template v-if="actEditor.sharePicurl!=''">
                  <img :src="actEditor.sharePicurl" alt />
                  <div class="cover">
                    <i class="el-icon-zoom-in" @click="bigPicMirror('sharePicurl')"></i>
                    <i class="el-icon-edit" @click="popupActive('sharePicurl')"></i>
                    <i class="el-icon-delete" @click="delPic('sharePicurl')" :data-types="types"></i>
                  </div>
                </template>
              </div>
            </el-form-item>
          </div>
          <div class="prompt">1.图片尺寸：1:1；2.图片大小必须小于100KB</div>
        </div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">红包配置</div>
          </div>
        </div>
        <el-form-item label="提现方式" required>
          <el-radio-group v-model="actEditor.extractType">
            <el-radio label="1">小程序</el-radio>
            <el-radio label="2">直接提现</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 红包领取模式 -->
        <el-form-item label="红包领取模式" required>
          <el-radio-group v-model="actEditor.redpackType">
            <el-radio label="1">分享朋友圈直接到账</el-radio>
            <el-radio label="2">推广赚钱（分享好友赚钱）</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="actEditor.redpackType=='1'">
          <div class="prompt">红包领取模式在审核成功后将不能修改</div>
          <el-form-item label="红包领取次数" required>
            <el-radio-group v-model="actEditor.redpackNum">
              <el-radio label="1">每人只能领一次</el-radio>
              <el-radio label="2">每人每天领取一次</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="actEditor.redpackNum=='2'">
            <el-form-item label="红包领取次数上限" required>
              <el-input v-model="actEditor.onLine"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="红包模式" required>
            <el-radio-group v-model="actEditor.redpackModel">
              <el-radio label="1">随机模式</el-radio>
              <el-radio label="2">等额模式</el-radio>
              <el-button
                v-if="actEditor.redpackModel=='2'"
                @click="addDomain"
                icon="el-icon-plus"
                type="primary"
                circle
              ></el-button>
            </el-radio-group>
          </el-form-item>
          <template v-if="actEditor.redpackModel=='1'">
            <el-form-item label="随机最小金额" required>
              <el-input v-model="actEditor.smallMoney"></el-input>
            </el-form-item>
            <el-form-item label="随机最大金额" required>
              <el-input v-model="actEditor.bigMoney"></el-input>
            </el-form-item>
          </template>
          <!-- 等额模式 -->
          <template v-else>
            <el-form-item
              v-for="(domain, index) in actEditor.domains"
              :key="index"
              :label="'等额模式' + (index+1)"
              required
            >
              <div class="equalMoneyModel" style="display:flex">
                <span style="padding:0 10px;">金额</span>
                <el-form-item :rules="rules.moneyRule" :prop="'domains.'+index+'.money'">
                  <el-input v-model="domain.money"></el-input>
                </el-form-item>
                <span style="padding:0 10px;">概率</span>
                <el-form-item
                  :rules="rules.probabilityRule"
                  :prop="'domains.'+index+'.probability'"
                >
                  <el-input v-model="domain.probability"></el-input>
                </el-form-item>
                <el-button
                  @click.prevent="removeDomain(domain)"
                  style="margin-left:20px"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </div>
            </el-form-item>
          </template>
          <el-form-item label="是否开启点击赚钱">
            <el-switch v-model="actEditor.makeMoney"></el-switch>
          </el-form-item>
          <div class="prompt">开启后，好友每次点击获得0.1元，最高10元</div>
          <template v-if="actEditor.makeMoney">
            <el-form-item label="获取金额">
              <el-input v-model="actEditor.onceGetMoney" placeholder="请输入单次点击金额"></el-input>
            </el-form-item>
            <div class="prompt">好友单次点击朋友圈获取金额！</div>
            <el-form-item label="金额限制">
              <el-input v-model="actEditor.moneyLimit" placeholder="请输入点击朋友圈获取金额限制"></el-input>
            </el-form-item>
            <div class="prompt">设定好友每次点击获取金额限制！</div>
            <el-form-item label="转发量限制">
              <el-input v-model="actEditor.forwardingNum" placeholder="请输入好友转发量限制"></el-input>
            </el-form-item>
            <div class="prompt">好友转发量多少时才能获取所得金额（默认值为0）</div>
          </template>
          <el-form-item label="地区选择类型" prop="addressType">
            <el-radio-group v-model="actEditor.addressType">
              <el-radio label="1">指定地区</el-radio>
              <el-radio label="2">指定范围（针对商圈）</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="actEditor.addressType=='2'">
            <el-form-item label="红包领取范围中心" prop="scopeCenter">
              <el-input
                v-model="actEditor.lat!=''?actEditor.busPositionSuc:actEditor.busPositionErr"
                :placeholder="[actEditor.lat!=''&&actEditor.lon!=''?'已获取商家定位':'请点击定位按钮选择商家定位']"
                disabled
              ></el-input>
              <el-button type="primary" @click="openMap">定位</el-button>
            </el-form-item>
            <el-form-item label="红包领取地区范围(km)" prop="scopeRegion">
              <el-input v-model="actEditor.scopeRegion"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="精确选择地区" prop="accurateAdr">
              <div class="accurateAdr">
                <el-cascader
                  v-model="actEditor.accurateAdr"
                  :options="options"
                  :props="props"
                  clearable
                ></el-cascader>
              </div>
            </el-form-item>
          </template>
        </template>
        <template v-else>
          <div class="prompt">红包领取模式在审核成功后将不能修改。</div>
          <el-form-item label="分享单个好友获得金额" required>
            <el-input v-model="actEditor.minimumMoney"></el-input>
          </el-form-item>
          <div class="prompt">1.用户通过推广赚钱参与同一活动，赚取金额上限：系统默认为10元。2.分享单个好友获得金额:0.1~1</div>
          <el-form-item label="地区选择类型">
            <el-radio-group v-model="actEditor.addressType">
              <el-radio label="1">指定地区</el-radio>
              <el-radio label="2">指定范围（针对商圈）</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="actEditor.addressType=='2'">
            <el-form-item label="红包领取范围中心" prop="scopeCenter">
              <el-input
                v-model="actEditor.lat!=''?actEditor.busPositionSuc:actEditor.busPositionErr"
                :placeholder="[actEditor.lat!=''&&actEditor.lon!=''?'已获取商家定位':'请点击定位按钮选择商家定位']"
                disabled
              ></el-input>
              <el-button type="primary" @click="openMap">定位</el-button>
            </el-form-item>
            <el-form-item label="红包领取地区范围(km)">
              <el-input v-model="actEditor.scopeRegion"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="精确选择地区" prop="accurateAdr">
              <el-cascader
                v-model="actEditor.accurateAdr"
                :options="options"
                :props="props"
                clearable
              ></el-cascader>
            </el-form-item>
          </template>
          <div class="prompt">不选则表示全国范围均可参与活动</div>
        </template>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">红包提示信息</div>
          </div>
        </div>
        <el-form-item label="是否上传背景音乐">
          <el-switch v-model="actEditor.bagMusic"></el-switch>
        </el-form-item>
        <template v-if="actEditor.bagMusic==true">
          <el-form-item label="背景音乐">
            <el-input placeholder="请输入内容" v-model="actEditor.bagMuc">
              <template slot="append">
                <el-button type="info" @click="popupActive('bagMuc')">选择文件</el-button>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <div class="prompt" v-if="actEditor.bagMusic==true">1.文件格式为mp3；2.文件大小必须小于5M；3.不传则播放默认红包提示音乐</div>
        <el-form-item label="红包领取倒计时">
          <el-input v-model="actEditor.reserveTime"></el-input>
        </el-form-item>
        <div class="prompt">倒计时为0则，不出现倒计时且不播放背景音乐。</div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">卡劵配置</div>
          </div>
        </div>
        <el-form-item label="是否开启卡劵">
          <el-switch v-model="actEditor.cardSet"></el-switch>
        </el-form-item>
        <template class="card-set-yes" v-if="actEditor.cardSet==true">
          <el-form-item label="卡劵比例">
            <el-input v-model="actEditor.cardRatio" placeholder="请填写卡劵比例"></el-input>
            <el-button type="primary" icon="el-icon-plus" @click="addDomainCard">卡劵</el-button>
          </el-form-item>
        </template>
        <div
          class="prompt"
          v-if="actEditor.cardSet==true"
        >开启卡劵后需要填写卡劵比例并添加1-5种卡劵。比如，卡劵比例为10，则在100个用户中会有10个用户分享后获得卡劵。</div>
        <div v-if="actEditor.cardSet==true" class="card-model-warpper">
          <el-form-item
            v-for="(domain, index) in actEditor.domainsCard"
            :key="index"
            :label="'卡劵' + (index+1)"
            required
          >
            <div class="setCardBox" style="display:flex">
              <span style="padding:0 10px;">名称</span>
              <el-form-item>
                <el-select @change="onChangeProgram" v-model="domain.name" placeholder="请选择">
                  <el-option
                    v-for="item in domain.nameList"
                    v-show="domain.name==item.id||!selectIdsArr.includes(item.id)"
                    :key="item.id"
                    :label="item.cardName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <span style="padding:0 10px;">数量</span>
              <el-form-item>
                <el-input v-model="domain.num"></el-input>
              </el-form-item>
              <el-button
                @click.prevent="removeDomainCard(domain)"
                style="margin-left:20px"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </div>
          </el-form-item>
        </div>
        <div v-if="actEditor.cardSet==true" class="prompt" style="font-weight:bold">
          <span v-if="iscard==true">{{cardAddPrompt}}</span>
        </div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">首屏配置</div>
          </div>
        </div>
        <!-- 首屏广告 -->
        <div class="first-screen-set">
          <el-form-item label="首屏广告">
            <div class="photo-toload" ref="pic">
              <template v-if="actEditor.firstScreenurl==''">
                <div class="block" @click="popupActive('firstScreenurl')"></div>
                <i class="iconfont icon-add-select"></i>
              </template>
              <template v-if="actEditor.firstScreenurl!=''">
                <img :src="actEditor.firstScreenurl" alt />
                <div class="cover">
                  <i class="el-icon-zoom-in" @click="bigPicMirror('firstScreenurl')"></i>
                  <i class="el-icon-edit" @click="popupActive('firstScreenurl')"></i>
                  <i class="el-icon-delete" @click="delPic('firstScreenurl')" :data-types="types"></i>
                </div>
              </template>
            </div>
          </el-form-item>
        </div>
        <div class="prompt">1.图片尺寸：750px*1334px；2.图片大小必须小于1000KB；3.不传则不显示首屏广告</div>
        <div class="tip">
          <div class="title">
            <div class="line"></div>
            <div class="txt">页面风格</div>
          </div>
        </div>
        <!-- 页面风格 -->
        <div class="page-style">
          <el-form-item label="页面模版" required>
            <el-radio-group v-model="actEditor.pageStyle">
              <el-radio label="1">模版一</el-radio>
              <el-radio label="2">模版二</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div class="page-module">
              <div class="pic-box">
                <!-- <img src="../../../static/images/screen.jpeg" alt /> -->
              </div>
              <div class="pic-box">
                <!-- <img src="../../../static/images/screen.jpeg" alt /> -->
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="goBack">返回</el-button>
          <el-button type="primary" @click="changeActData('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
            :data-picUrl="picurl+item.urls"
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
      <img
        style="display:block;max-width:500px;margin:0 auto"
        :src="picName=='sharePicurl'?this.actEditor.sharePicurl:this.actEditor.firstScreenurl"
        alt
      />
    </el-dialog>
    <!-- 地图 -->
    <el-dialog
      title="红包领取范围中心"
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
import bus from "../../../assets/js/bus";
import Map from "../../../components/Map";
import Events from "../../../assets/js/events";
export default {
  components: {
    Map,
  },
  data() {
    var validateActName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写活动名称"));
      } else {
        callback();
      }
    };
    var validateActDetail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写活动详情"));
      } else {
        callback();
      }
    };
    var validateShareTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请设置分享标题"));
      } else {
        callback();
      }
    };
    var validateActEndTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择活动结束日期"));
      } else {
        callback();
      }
    };
    var validateShareDec = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写活动描述"));
      } else {
        callback();
      }
    };
    var validateSharePicurl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请设置分享图片"));
      } else {
        callback();
      }
    };
    var validateAccurateAdr = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择地区类型"));
      } else {
        callback();
      }
    };
    return {
      isActive: 1,
      picurl: "http://lb3.28888753.cn/imges/",
      // 图片列表
      types: "1",
      page: 1,
      pageSize: "8",
      picList: [],
      popupAct: false,
      allUserPic: "",
      // 图片放大镜
      picBigMirror: false,
      picName: "",
      // 活动编辑
      actEditor: {
        actName: "",
        actEndTime: "",
        leverMsg: false,
        actDetail: "",
        shareTitle: "",
        shareDec: "",
        // 分享图片
        sharePicurl: "",
        // 提现方式
        extractType: "1",
        // 红包领取模式
        redpackType: "1",

        redpackNum: "1",
        redpackModel: "1",
        smallMoney: "0.30",
        bigMoney: "0.80",
        // 是否开启赚钱
        makeMoney: false,
        makeMoneytxt: "2",
        onceGetMoney: "0.10",
        moneyLimit: "1.00",
        forwardingNum: "3",

        addressType: "1",
        // 精确选择地址
        accurateAdr: [],
        selAdr: "",
        busPositionSuc: "已获取商家定位",
        busPositionErr: "请点击定位按钮选择商家定位",
        reserveTime: "0",
        // 是否开启卡劵
        cardSet: false,
        cardSettxt: "2",
        // 背景音乐
        bagMusic: false,
        bagMuc: "",
        // 首屏广告
        firstScreenurl: "",
        pageStyle: "1",
        minimumMoney: "0.10",
        onLine: 0,
        // 红包领取范围中心
        scopeCenter: "",
        lon: "",
        lat: "",

        scopeRegion: "",
        cardRatio: "1",
        // 等额模式
        domains: [
          {
            money: "0.30",
            probability: 50,
          },
          {
            money: "0.50",
            probability: 30,
          },
          {
            money: "1.00",
            probability: 20,
          },
        ],
        // 开启卡劵
        domainsCard: [
          {
            name: "",
            nameList: [],
            num: "1",
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      selectIdsArr: [],
      // 精确选择地区
      props: { multiple: true },
      options: [],
      iscard: false,
      // 地图显示
      centerDialogVisible: false,
      // 活动编辑验证
      rules: {
        actName: [
          { required: true, validator: validateActName, trigger: "blur" },
        ],
        actEndTime: [
          { required: true, validator: validateActEndTime, trigger: "blur" },
        ],
        actDetail: [
          { required: true, validator: validateActDetail, trigger: "blur" },
        ],
        shareTitle: [
          { required: true, validator: validateShareTitle, trigger: "blur" },
        ],
        shareDec: [
          { required: true, validator: validateShareDec, trigger: "blur" },
        ],
        sharePicurl: [
          { required: true, validator: validateSharePicurl, trigger: "blur" },
        ],
        accurateAdr: [
          {
            required: true,
            validator: validateAccurateAdr,
            trigger: "change",
            type: "array",
          },
        ],
        // 金额验证
        moneyRule: [
          {
            validator: (rule, value, callback) => {
              let arr = {};
              for (var i = 0; i < this.actEditor.domains.length; i++) {
                arr["a" + this.actEditor.domains[i].money * 100] = 1;
              }
              let newArr = Object.keys(arr);
              if (newArr.length < this.actEditor.domains.length) {
                callback(new Error("等额模式金额不能重复"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //概率验证
        probabilityRule: [
          {
            validator: (rule, value, callback) => {
              let sum = 0;
              for (let i = 0; i < this.actEditor.domains.length; i++) {
                sum += parseInt(this.actEditor.domains[i].probability);
              }
              if (sum > 100) {
                callback(new Error("所有概率之和应该为100 "));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 卡劵名称列表
    this.nameList();
    // 获取地区列表
    this.addressList();
    // 地图显示隐藏
    bus.$on("mapAct", (result) => {
      this.centerDialogVisible = result;
    });
    // 获取经纬度
    bus.$on("pos", (result) => {
      this.actEditor.lon = result.lng;
      this.actEditor.lat = result.lat;
    });
    // 数据回显
    this.getEditorData();
  },
  methods: {
    // 图片放大镜
    bigPicMirror: function (picName) {
      this.picName = picName;
      this.picBigMirror = !this.picBigMirror;
    },
    // 数据回显
    getEditorData() {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("ids", this.$route.query.id);
      this.$http
        .post(this.$api.editorActEcho.editorActEcho, params, true)
        .then((result) => {
          console.log("数据回显", result);

          if (result.data.state == "success") {
            // 活动设置
            this.actEditor.actName = result.data.getActivityVO.activityTitle;
            this.actEditor.leverMsg = result.data.getActivityVO.leavingAMessage;
            this.actEditor.actDetail = result.data.getActivityVO.content;
            this.actEditor.shareTitle = result.data.getActivityVO.shareTitle;
            this.actEditor.shareDec = result.data.getActivityVO.shareDescribe;
            this.actEditor.sharePicurl =
              this.picurl + result.data.getActivityVO.shareShowImage;
            this.actEditor.actEndTime =
              result.data.getActivityVO.activityEndTime_show;
            //提现方式
            this.actEditor.extractType = result.data.getActivityVO.withdrawalMethod.toString();
            // 红包领取模式
            this.actEditor.redpackType = result.data.getActivityVO.pattern.toString();
            // 红包领取次数
            this.actEditor.redpackNum = result.data.getActivityVO.receive_num.toString();
            // 红包模式
            this.actEditor.redpackModel = result.data.getActivityVO.red_envelopes_pattern.toString();
            // 随机最小金额
            result.data.getActivityVO.mail_Money &&
              (this.actEditor.smallMoney =
                result.data.getActivityVO.mail_Money);
            // 随机最大金额
            result.data.getActivityVO.max_Money &&
              (this.actEditor.bigMoney = result.data.getActivityVO.max_Money);
            // 是否开启赚钱
            this.actEditor.makeMoney =
              result.data.getActivityVO.clickToMakeMoney == "2" ? false : true;
            result.data.getActivityVO.clickToMakeMoney_money &&
              (this.actEditor.onceGetMoney =
                result.data.getActivityVO.clickToMakeMoney_money);
            result.data.getActivityVO.clickToMakeMoney_max_money &&
              (this.actEditor.moneyLimit =
                result.data.getActivityVO.clickToMakeMoney_max_money);
            result.data.getActivityVO.share_click_nums &&
              (this.actEditor.forwardingNum =
                result.data.getActivityVO.share_click_nums);
            // 地区选择类型
            this.actEditor.addressType = result.data.getActivityVO.ranges.toString();
            // 精确选择地区
            let accurateAdr =
              result.data.getActivityVO.activityMapAppointRegionVO;
            for (let i = 0; i < accurateAdr.length; i++) {
              this.actEditor.accurateAdr.push([
                accurateAdr[i].province,
                accurateAdr[i].city,
                accurateAdr[i].area,
              ]);
            }
            // 是否上传背景音乐
            this.actEditor.bagMusic =
              result.data.getActivityVO.backgroundMusicOpen == "2"
                ? false
                : true;
            // 背景音乐
            this.picurl + result.data.getActivityVO.backgroundMusic &&
              (this.actEditor.bagMuc =
                this.picurl + result.data.getActivityVO.backgroundMusic);
            // 红包领取倒计时
            result.data.getActivityVO.receiveRedEnvelopesTime &&
              (this.actEditor.reserveTime =
                result.data.getActivityVO.receiveRedEnvelopesTime);
            // 是否开启卡劵
            this.actEditor.cardSet =
              result.data.getActivityVO.openCardRoll == "1" ? true : false;
            // 页面模版
            this.actEditor.pageStyle = result.data.getActivityVO.pageTemplateTypes.toString();
            // 分享单个好友获得金额
            result.data.getActivityVO.share_single_Friends_money &&
              (this.actEditor.minimumMoney =
                result.data.getActivityVO.share_single_Friends_money);
            // 红包领取次数上限
            result.data.getActivityVO.day_receive_num &&
              (this.actEditor.onLine =
                result.data.getActivityVO.day_receive_num);
            // 金额 概率
            this.actEditor.domains = [];
            for (
              let i = 0;
              i <
              result.data.getActivityVO.activityShareFriendEqualPatternVOList
                .length;
              i++
            ) {
              this.actEditor.domains.push({
                money:
                  result.data.getActivityVO
                    .activityShareFriendEqualPatternVOList[i].momey_show,
                probability:
                  result.data.getActivityVO
                    .activityShareFriendEqualPatternVOList[i].probability,
              });
            }
            // 红包领取范围中心
            result.data.getActivityVO.map_appoint_range_longitude &&
              (this.actEditor.lon =
                result.data.getActivityVO.map_appoint_range_longitude);
            result.data.getActivityVO.map_appoint_range_latitude &&
              (this.actEditor.lat =
                result.data.getActivityVO.map_appoint_range_latitude);
            // 红包领取地区范围(km)
            result.data.getActivityVO.km &&
              (this.actEditor.scopeRegion = result.data.getActivityVO.km);
            //卡劵比例
            result.data.getActivityVO.cardRollProportion &&
              (this.actEditor.cardRatio =
                result.data.getActivityVO.cardRollProportion);
            // 卡劵名称列表
            this.nameList();
            //卡劵名称 卡劵数量
            if (result.data.getActivityVO.activityCardRollVOList.length > 0) {
              this.actEditor.domainsCard = [];
              for (
                let i = 0;
                i < result.data.getActivityVO.activityCardRollVOList.length;
                i++
              ) {
                this.actEditor.domainsCard.push({
                  name:
                    result.data.getActivityVO.activityCardRollVOList[i]
                      .cardRollVO.cardName,
                  num:
                    result.data.getActivityVO.activityCardRollVOList[i]
                      .cardRollNum,
                });
              }
            }
            // 首屏广告
            this.actEditor.firstScreenurl =
              this.picurl +
              result.data.getActivityVO.firstScreenAdvertisementImg;
          }
        });
    },
    // 活动修改
    changeActData(formName) {
      console.log("this.$refs[formName]", this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定修改此活动吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              const params = new URLSearchParams();
              params.append("uid", localStorage.getItem("uid"));
              params.append("id", this.$route.query.id);
              params.append("activityTitle", this.actEditor.actName);
              params.append(
                "leavingAMessage",
                this.actEditor.leverMsg ? "1" : "2"
              );
              params.append("content", this.actEditor.actDetail);
              params.append("shareTitle", this.actEditor.shareTitle);
              params.append("shareDescribe", this.actEditor.shareDec);
              params.append(
                "shareShowImage",
                this.actEditor.sharePicurl.split("imges/")[1]
              );
              var reg = RegExp(/-/);
              if (reg.exec(this.actEditor.actEndTime)) {
                console.log(this.actEditor.actEndTime);
                let endTime = this.moment(this.actEditor.actEndTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                params.append("activityEndTime_show", endTime);
              } else {
                // 时间格式化
                let endTime = this.moment(this.actEditor.actEndTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                params.append("activityEndTime_show", endTime);
              }
              // 提现方式
              params.append("withdrawalMethod", this.actEditor.extractType);
              // 红包领取模式
              params.append("pattern", this.actEditor.redpackType);
              // 红包领取次数
              params.append("receive_num", this.actEditor.redpackNum);
              // 红包模式
              params.append(
                "red_envelopes_pattern",
                this.actEditor.redpackModel
              );
              // 随机最小金额
              params.append("mail_Money", this.actEditor.smallMoney);
              // 随机最大金额
              params.append("max_Money", this.actEditor.bigMoney);
              // 是否开启赚钱
              if (this.actEditor.makeMoney) {
                this.actEditor.makeMoneytxt = "1";
              } else {
                this.actEditor.makeMoneytxt = "2";
              }
              params.append("clickToMakeMoney", this.actEditor.makeMoneytxt);
              params.append(
                "clickToMakeMoney_money",
                this.actEditor.onceGetMoney
              );
              params.append(
                "clickToMakeMoney_max_money",
                this.actEditor.moneyLimit
              );
              params.append("share_click_nums", this.actEditor.forwardingNum);
              // 地区选择类型
              params.append("ranges", this.actEditor.addressType);
              // 精确选择地区
              var str = "";
              for (var i = 0; i < this.actEditor.accurateAdr.length; i++) {
                str += this.actEditor.accurateAdr[i] + "$";
              }
              this.actEditor.selAdr = str
                .split(",")
                .join("/")
                .split("$")
                .join(",")
                .substr(0, str.length - 1);
              params.append("range_map_appoint_region", this.actEditor.selAdr);
              // 是否上传背景音乐
              params.append(
                "backgroundMusicOpen",
                this.actEditor.bagMusic == true ? "1" : "2"
              );
              // 背景音乐
              params.append(
                "backgroundMusic",
                this.actEditor.bagMuc.split("imges/")[1]
              );
              // 红包领取倒计时
              params.append(
                "receiveRedEnvelopesTime",
                this.actEditor.reserveTime
              );
              // 是否开启卡劵
              if (this.actEditor.cardSet) {
                this.actEditor.cardSettxt = "1";
              } else {
                this.actEditor.cardSettxt = "2";
              }
              params.append("openCardRoll", this.actEditor.cardSettxt);
              // 页面模版
              params.append("pageTemplateTypes", this.actEditor.pageStyle);
              // 分享单个好友获得金额
              params.append(
                "share_single_Friends_money",
                this.actEditor.minimumMoney
              );
              // 红包领取次数上限
              params.append("day_receive_num", this.actEditor.onLine);
              // 金额
              let sumStr = "";
              for (var i = 0; i < this.actEditor.domains.length; i++) {
                sumStr += this.actEditor.domains[i].money + ",";
              }
              params.append("moneys", sumStr.substr(0, sumStr.length - 1));
              // 概率
              let probabilityStr = "";
              for (var i = 0; i < this.actEditor.domains.length; i++) {
                probabilityStr += this.actEditor.domains[i].probability + ",";
              }
              params.append(
                "probability",
                probabilityStr.substr(0, probabilityStr.length - 1)
              );
              // 红包领取范围中心
              console.log("this.actEditor.lon", this.actEditor.lon);
              params.append("map_appoint_range_longitude", this.actEditor.lon); //经度
              params.append("map_appoint_range_latitude", this.actEditor.lat); //纬度
              // 红包领取地区范围(km)
              params.append("km", this.actEditor.scopeRegion);
              //卡劵比例
              params.append("cardRollProportion", this.actEditor.cardRatio);
              //卡劵名称
              let cardId = "";
              for (var i = 0; i < this.actEditor.domainsCard.length; i++) {
                cardId += this.actEditor.domainsCard[i].name + ",";
              }
              params.append(
                "cardRollIdList",
                cardId.substr(0, cardId.length - 1)
              );
              //卡劵数量
              let cardNum = "";
              for (var i = 0; i < this.actEditor.domainsCard.length; i++) {
                cardNum += this.actEditor.domainsCard[i].num + ",";
              }
              params.append(
                "cardRollNumList",
                cardNum.substr(0, cardNum.length - 1)
              );
              // 首屏广告
              console.log(
                "this.actEditor.firstScreenurl",
                this.actEditor.firstScreenurl
              );
              params.append(
                "firstScreenAdvertisementImg",
                this.actEditor.firstScreenurl.split("imges/")[1]
              );
              this.$http
                .post(this.$api.changeActData.changeActData, params, true)
                .then((result) => {
                  this.$router.push({
                    path: "/act/activity",
                  });
                  Events.errPrompt(
                    this.$message({
                      message: "卡劵编辑成功！",
                      type: "success",
                    })
                  );
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑器添加图片回调
    handleEditorImgAdd: function (pos, $file) {
      const that = this;
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("uid", localStorage.getItem("uid"));
      this.formData.append("types", this.types);
      this.formData.append("file", $file);
      this.$http
        .post(this.$api.actUploadpic.actUploadpic, this.formData, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.$refs.md.$img2Url(pos, this.picurl + result.data.url);
          }
        });
    },
    // 编辑器删除图片回调
    handleEditorImgDel: function (pos) {
      // delete this.imgFile[pos]
    },
    // 获取地区列表
    addressList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.addressList.addressList, params, true)
        .then((result) => {
          console.log("地区列表", result);
          if (result.data.state == "success") {
            var list = result.data.getCnRegionInfoVOList;
            var objList = {
              value: 1,
              label: "江西",
              children: [
                {
                  value: 2,
                  label: "九江市",
                  children: [{ value: 3, label: "修水县" }],
                },
              ],
            };
            var arr_i = [];
            for (var i = 0; i < list.length; i++) {
              var arr_p = [];
              for (var p = 0; p < list[i].cnRegionInfoVOList.length; p++) {
                var arr_x = [];
                for (
                  var x = 0;
                  x < list[i].cnRegionInfoVOList[p].cnRegionInfoVOList.length;
                  x++
                ) {
                  arr_x.push({
                    value:
                      list[i].cnRegionInfoVOList[p].cnRegionInfoVOList[x]
                        .cRINAME,
                    label:
                      list[i].cnRegionInfoVOList[p].cnRegionInfoVOList[x]
                        .cRINAME,
                  });
                }
                arr_p.push({
                  value: list[i].cnRegionInfoVOList[p].cRINAME,
                  label: list[i].cnRegionInfoVOList[p].cRINAME,
                  children: arr_x,
                });
              }
              arr_i.push({
                value: list[i].cRINAME,
                label: list[i].cRINAME,
                children: arr_p,
              });
            }
            this.options = arr_i;
          }
        });
    },
    // 地图
    openMap: function () {
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    // 图片弹窗
    popupActive: function (dom) {
      this.popupAct = !this.popupAct;
      if (dom == "sharePicurl") {
        if (this.popupAct) {
          this.userpicList((this.types = "4"));
          this.types = "4";
        }
      } else if (dom == "bagMuc") {
        if (this.popupAct) {
          this.mucList((this.types = "2"));
          this.types = "2";
        }
      } else {
        if (this.popupAct) {
          this.userpicList((this.types = "5"));
          this.types = "5";
        }
      }
    },
    // 图片列表
    userpicList: function (types) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page.toString());
      params.append("types", types);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.upLoderFile.upLoderFile, params, true)
        .then((result) => {
          this.picList = result.data.getUsersUploadVOList;
          this.allUserPic = result.data.page_zong;
        });
    },
    // 音乐列表
    mucList: function (types) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("types", types);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.mucList.mucList, params, true)
        .then((result) => {
          this.picList = result.data.getUsersUploadVOList;
        });
    },
    // 双击选取
    selPic: function (event) {
      if (this.types == "4") {
        // 分享图片
        this.actEditor.sharePicurl = event.target.dataset.picurl;
        this.popupAct = !this.popupAct;
      } else if (this.types == "5") {
        // 首屏广告
        this.actEditor.firstScreenurl = event.target.dataset.picurl;
        this.popupAct = !this.popupAct;
      } else {
        this.actEditor.bagMuc = event.target.dataset.picurl;
        this.popupAct = !this.popupAct;
      }
    },
    // 删除图片
    delPic: function (name) {
      if (name == "sharePicurl") {
        this.actEditor.sharePicurl = "";
      } else {
        this.actEditor.firstScreenurl = "";
      }
    },
    // 本地上传
    handleFileChange: function (types) {
      if (this.types == "4" || this.types == "5") {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0]; // 通过DOM取文件数据
        let size = Math.floor(this.file.size / 1024); //计算文件的大小
        this.formData = new FormData(); //new一个formData事件
        this.formData.append("file", this.file); //将file属性添加到formData里
        this.formData.append("uid", localStorage.getItem("uid"));
        this.formData.append("types", this.types);
        this.$http
          .post(
            this.$api.actUploadpicTypes.actUploadpicTypes,
            this.formData,
            true
          )
          .then((result) => {
            console.log("图片上传", result);
            this.userpicList(this.types);
          });
      } else {
        let inputDOM = this.$refs.inputer;
        this.file = inputDOM.files[0]; // 通过DOM取文件数据
        let size = Math.floor(this.file.size / 1024); //计算文件的大小
        this.formData = new FormData(); //new一个formData事件
        this.formData.append("file", this.file); //将file属性添加到formData里
        this.formData.append("uid", localStorage.getItem("uid"));
        this.$http
          .post(this.$api.uploadMuc.uploadMuc, this.formData, true)
          .then((result) => {
            if (result.data.state == "success") {
              this.actEditor.bagMuc = this.picurl + result.data.url;
              this.userpicList(this.types);
            }
          });
      }
    },
    prevPage: function () {
      if (this.page <= 1) {
        this.page = 1;
        this.userpicList(this.types);
        return;
      }
      this.page -= 1;
      this.userpicList(this.types);
    },
    nextPage: function () {
      if (this.page < parseInt(this.allUserPic)) {
        this.page += 1;
        this.userpicList(this.types);
      }
    },
    //等额模式
    addDomain() {
      //添加
      this.actEditor.domains.push({
        value: "",
        key: Date.now(),
      });
      if (this.actEditor.domains.length > "5") {
        Events.sucPrompt(this.$message("等额模式下，最多配置五种等额模式"));
        this.actEditor.domains.pop();
      }
    },
    removeDomain(item) {
      //删除
      var index = this.actEditor.domains.indexOf(item);
      if (index !== -1 && this.actEditor.domains.length - 1 != "0") {
        this.actEditor.domains.splice(index, 1);
      } else {
        Events.sucPrompt(this.$message("等额模式下，至少需要配置一种等额模式"));
      }
    },
    //卡劵
    nameList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.cardnameList.cardnameList, params, true)
        .then((result) => {
          console.log("卡劵名称列表", result);
          for (var i = 0; i < this.actEditor.domainsCard.length; i++) {
            this.actEditor.domainsCard[i].nameList =
              result.data.getCardRollVOList;
          }
        });
    },
    // 卡劵名称
    onChangeProgram() {
      this.selectIdsArr = [];
      for (let i = 0; i < this.actEditor.domainsCard.length; i++) {
        if (this.actEditor.domainsCard[i].name) {
          this.selectIdsArr.push(this.actEditor.domainsCard[i].name);
        }
      }
    },
    addDomainCard: function () {
      this.actEditor.domainsCard.push({
        name: "",
        key: Date.now(),
      });
      if (this.actEditor.domainsCard.length > "5") {
        Events.sucPrompt(this.$message("等额模式下，最多配置五种等额模式"));
        this.actEditor.domainsCard.pop();
      }
      // 卡劵名称列表
      this.nameList();
    },
    removeDomainCard(item) {
      //删除
      var index = this.actEditor.domainsCard.indexOf(item);
      if (index !== -1 && this.actEditor.domainsCard.length - 1 != "0") {
        this.actEditor.domainsCard.splice(index, 1);
      } else {
        Events.sucPrompt(this.$message("等额模式下，至少需要配置一种等额模式"));
      }
    },
    goBack: function () {
      this.$router.push({
        path: "/act/activity",
      });
    },
  },
};
</script>

<style scoped>
/* 分享图片 */
.share-set .share-photo .photo-toload {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
  position: relative;
  overflow: hidden;
}
.share-set .share-photo .photo-toload .block {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.share-set .share-photo .photo-toload .cover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.share-set .share-photo .photo-toload:hover .cover {
  justify-content: space-around;
  align-items: center;
  display: flex;
}
.photo-toload .cover i {
  font-size: 20px;
  color: #fff;
}
.share-set .share-photo .photo-toload img {
  display: block;
  width: 100%;
  max-height: 100%;
  border-radius: 6px;
}
.share-set .share-photo .photo-toload:hover {
  border: 1px dashed #409eff;
  transition: border 0.3s;
}
.share-photo .photo-toload .iconfont {
  font-size: 30px;
  color: #3b3a3a;
}

.creatact .next {
  box-sizing: border-box;
  width: 100%;
  padding-left: 250px;
}
/* 页面模版 */
.main .page-style .page-module {
  box-sizing: border-box;
  width: 100%;
  padding-left: 250px;
  overflow: hidden;
}
.page-style .page-module .pic-box {
  float: left;
  width: 375px;
  margin-right: 20px;
}
.page-module .pic-box img {
  width: 100%;
}
.main .btn-warpper {
  box-sizing: border-box;
  width: 100%;
  padding-left: 250px;
  margin-top: 20px;
}
.btn-warpper button {
  margin-right: 5px;
}
/* 审核 */
.main .audit {
  width: 100%;
  text-align: center;
}
.audit .icon .iconfont {
  font-size: 40px;
  color: #409eff;
}
.audit .txt {
  margin: 20px 0;
}
/* 弹窗 */
.editor .popup {
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
.editor .popup .head {
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
.card-model-warpper span {
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
/* 首屏广告 */
.first-screen-set .photo-toload {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
  position: relative;
  overflow: hidden;
}
.first-screen-set .photo-toload .block {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.first-screen-set .photo-toload .cover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.first-screen-set .photo-toload:hover .cover {
  justify-content: space-around;
  align-items: center;
  display: flex;
}
.photo-toload .cover i {
  font-size: 20px;
  color: #fff;
}
.first-screen-set .photo-toload img {
  display: block;
  width: 100%;
  max-height: 100%;
  border-radius: 6px;
}
.first-screen-set .photo-toload:hover {
  border: 1px dashed #409eff;
  transition: border 0.3s;
}
.first-screen-set .photo-toload .iconfont {
  font-size: 30px;
  color: #3b3a3a;
}
</style>