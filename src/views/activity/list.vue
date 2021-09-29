<template>
  <div class="activity">
    <el-card class="search">
      <el-form :model="searchForm" ref="searchForm">
        <el-select
          class="search-item"
          clearable
          v-model="searchForm.cdxOne"
          placeholder="请选择活动状态"
        >
          <el-option
            v-for="item in actState"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          class="search-item"
          v-model="searchForm.cdxTwo"
          placeholder="请输入活动ID｜标题｜分享标题"
        ></el-input>
        <el-input
          class="search-item"
          v-model="searchForm.cdxThree"
          placeholder="请输入用户名|备注"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchSubmit"
          >搜索</el-button
        >
      </el-form>
    </el-card>
    <el-card class="activity-list">
      <div slot="header" class="card-head">
        <span class="title" style="float: left">活动列表</span>
        <el-button
          style="float: right; font-weight: 400"
          type="primary"
          @click="changeTarget"
          >+ 创建活动</el-button
        >
      </div>
      <div class="list">
        <!-- 列表 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="80"
          ></el-table-column>
          <el-table-column label="标题" width="220">
            <template slot-scope="scope">
              <div
                class="tip"
                style="display: none"
                :ref="'tipDOM_' + scope.$index"
              >
                <vue-qr
                  :text="scope.row.sao_ma_Activity_url"
                  :size="150"
                ></vue-qr>
              </div>
              <el-popover
                placement="top-start"
                width="150"
                trigger="hover"
                @show="tipShow(scope.$index)"
              >
                <div class="codeBox" slot>
                  <div class="code" v-html="newTipDOM"></div>
                </div>
                <span
                  slot="reference"
                  style="color: #00aaed; cursor: pointer"
                  >{{ scope.row.activityTitle }}</span
                >
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="活动状态" width="100">
            <template slot-scope="scope">
              <div class="act-state">
                <span
                  class="round"
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background-color: #ffeb3b;
                    border-radius: 50%;
                  "
                  v-if="scope.row.auditStatus == '1'"
                ></span>
                <span
                  class="round"
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background-color: #67c23a;
                    border-radius: 50%;
                  "
                  v-else-if="scope.row.auditStatus == '2'"
                ></span>
                <span
                  class="round"
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background-color: #f56c6c;
                    border-radius: 50%;
                  "
                  v-else-if="scope.row.auditStatus == '3'"
                ></span>
                <span
                  class="round"
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background-color: #66b1ff;
                    border-radius: 50%;
                  "
                  v-else-if="scope.row.auditStatus == '4'"
                ></span>
                <span
                  class="round"
                  style="
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background-color: #999;
                    border-radius: 50%;
                  "
                  v-else
                ></span>
                <span v-if="scope.row.auditStatus == '1'">待审核</span>
                <span v-else-if="scope.row.auditStatus == '2'">运行中</span>
                <span v-else-if="scope.row.auditStatus == '3'">审核驳回</span>
                <span v-else-if="scope.row.auditStatus == '4'">已暂停</span>
                <span v-else>已返还</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="openActivity" label="活动开关" width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.auditStatus == '2'?actSwitch = true:actSwitch = false"
                disabled
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="活动类型" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.pattern == '1'">分享朋友圈</span>
              <span v-else>推广赚钱</span>
            </template>
          </el-table-column>
          <el-table-column label="活动数据" width="220">
            <template slot-scope="scope">
              <div
                class="actData"
                v-if="
                  scope.row.viewsNum != null ||
                  scope.row.shareVolume != null ||
                  scope.row.zan != null
                "
              >
                <div v-if="scope.row.viewsNum != null">
                  活动浏览量：{{ scope.row.viewsNum }}
                </div>
                <div v-else>活动浏览量：0</div>
                <div v-if="scope.row.shareVolume != null">
                  活动分享量：{{ scope.row.shareVolume }}
                </div>
                <div v-else>活动分享量：0</div>
                <div v-if="scope.row.zan != null">
                  活动点赞数：{{ scope.row.zan }}
                </div>
                <div v-else>活动点赞数：0</div>
              </div>
              <div v-else>暂无活动数据</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="reasonsForFailureOfAudit"
            label="驳回原因"
          ></el-table-column>
          <el-table-column label="用户（地区/备注）" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.usersVO.region == '1'">全国</span>
              <span v-else>{{ scope.row.usersVO.region_province_city }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户信息">
            <template slot-scope="scope" width="200">
              <span>创建人：{{ scope.row.usersVO.usersName }}</span>
              <span v-if="scope.row.usersVO.role == '1'"
                >创建级别：超级管理员</span
              >
              <span v-else-if="scope.row.usersVO.role == '2'"
                >创建级别：普通管理员</span
              >
              <span v-else-if="scope.row.usersVO.role == '3'"
                >创建级别：代理商</span
              >
              <span v-else-if="scope.row.usersVO.role == '4'"
                >创建级别：活动商</span
              >
              <span v-else>创建级别：用户</span>
              <span>创建时间：{{ scope.row.createTimeName }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="270">
            <template slot-scope="scope">
              <div
                class="btn-box"
                v-if="scope.row.auditStatus == '1'"
                style="text-align: left"
              >
                <div v-if="role == '1'">
                  <el-button
                    size="small"
                    type="success"
                    @click="
                      changeActState(
                        scope.row.id,
                        '2',
                        scope.row.reasonsForFailureOfAudit
                      )
                    "
                    >运行</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editor(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button size="small" @click="copyActivity(scope.row.id)"
                    >复制</el-button
                  >
                  <el-button size="small">返还</el-button>
                  <el-button size="small" @click="rejected(scope.row.id)"
                    >审核驳回</el-button
                  >
                  <el-button size="small" @click="teacherSearch(scope.row.id)"
                    >获客大师</el-button
                  >
                </div>
                <div v-else-if="uid == scope.row.followers">
                  <el-button
                    size="small"
                    type="success"
                    @click="
                      changeActState(
                        scope.row.id,
                        '2',
                        scope.row.reasonsForFailureOfAudit
                      )
                    "
                    >运行</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editor(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button size="small" @click="copyActivity(scope.row.id)"
                    >复制</el-button
                  >
                  <el-button size="small">返还</el-button>
                  <el-button size="small" @click="rejected(scope.row.id)"
                    >审核驳回</el-button
                  >
                  <el-button size="small" @click="teacherSearch(scope.row.id)"
                    >获客大师</el-button
                  >
                </div>
                <div v-else></div>
              </div>
              <div v-else-if="scope.row.auditStatus == '2'">
                <el-button
                  size="small"
                  @click="
                    changeActState(
                      scope.row.id,
                      '4',
                      scope.row.reasonsForFailureOfAudit
                    )
                  "
                  >暂停</el-button
                >
                <el-button size="small" @click="copyActivity(scope.row.id)"
                  >复制</el-button
                >
              </div>
              <div
                class="btn-box"
                v-else-if="scope.row.auditStatus == '4'"
                style="text-align: left"
              >
                <el-button
                  size="small"
                  type="success"
                  @click="
                    changeActState(
                      scope.row.id,
                      '2',
                      scope.row.reasonsForFailureOfAudit
                    )
                  "
                  >运行</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click="editor(scope.row.id)"
                  >编辑</el-button
                >
                <el-button size="small" @click="copyActivity(scope.row.id)"
                  >复制</el-button
                >
                <el-button size="small">返还</el-button>
                <el-button size="small" @click="rejected(scope.row.id)"
                  >审核驳回</el-button
                >
                <el-button size="small" @click="teacherSearch(scope.row.id)"
                  >获客大师</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <div class="activity-prompt">注：活动只有暂停状态下才能结算</div>
    <!-- 审核驳回 -->
    <el-dialog
      title="审核驳回"
      :visible.sync="rejAct"
      :modal-append-to-body="false"
      top="7vh"
      width="40%"
      center
    >
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入驳回原因"
        maxlength="50"
        :show-word-limit="true"
        v-model="textarea"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejAct = false">取 消</el-button>
        <el-button type="primary" @click="rjtDtm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 获客大师 -->
    <el-dialog
      title="获客大师"
      :visible.sync="teacherPopupAct"
      width="42%"
      center
      :modal-append-to-body="false"
    >
      <el-form :model="teacherFrom" label-width="100px">
        <div class="dialog-content">
          <el-form-item label="链接">
            <el-select
              v-model="teacherFrom.teacherSelItem"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teacherListItems"
                :key="item.id"
                :label="item.advertisementName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template v-if="this.teacherId == ''">
          <el-button type="primary" @click="setTeacher">设置</el-button>
          <el-button @click="teacherPopupAct = false">取 消</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="changeTeacher">修改</el-button>
          <el-button @click="teacherPopupAct = false">取 消</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import Events from "../../assets/js/events"
export default {
  name:"List",
  components: {
    vueQr,
  },
  inject: ["reload"],
  data() {
    return {
      actState: [
        {
          value: "1",
          label: "待审核",
        },
        {
          value: "2",
          label: "运行中",
        },
        {
          value: "3",
          label: "审核驳回",
        },
        {
          value: "4",
          label: "已暂停",
        },
        {
          value: "5",
          label: "已返回",
        },
      ],
      searchForm: {
        cdxOne: "",
        cdxTwo: "",
        cdxThree: "",
      },
      // 活动列表
      tableData: [],
      page: "1",
      pageSize: "5",
      total: 0,
      disabled: false,
      actSwitch: true,
      code: "",
      uid: "",
      role: "",
      //获客大师
      teacherPopupAct: false,
      teacherListItems: [],
      teacherFrom: {
        teacherSelItem: "",
      },
      getActId: "",
      teacherId: "",
      // 驳回弹窗
      rejAct: false,
      actId: "",
      textarea: "",
      //二维码
      newTipDOM: "",
    };
  },
  created() {
    this.getActData();
    this.teacherList();
  },
  methods: {
    // 活动列表
    getActData: function () {
      this.uid = localStorage.getItem("uid");
      this.role = localStorage.getItem("role");
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      this.$http
        .post(this.$api.actList.actList, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.total = result.data.count;
            this.tableData = result.data.getActivityVOList;
            this.code = result.data.getActivityVOList;
          }
        });
    },
    // 活动复制
    copyActivity: function (id) {
      localStorage.setItem("activityId", id);
    },
    teacherList: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      this.$http
        .post(this.$api.teacherSelList.teacherSelList, params, true)
        .then((result) => {
          console.log("列表", result);
          if (result.data.state == "success") {
            this.teacherListItems = result.data.getAdvertisementVOList;
          }
        });
    },
    teacherSearch: function (actId) {
      this.getActId = actId;
      this.teacherPopupAct = true;
      const params = new URLSearchParams();
      params.append("ids", actId);
      this.$http
        .post(this.$api.actTeacherSearch.actTeacherSearch, params, true)
        .then((result) => {
          if (
            result.data.state == "success" &&
            result.data.activityAdvertisementVO != null
          ) {
            this.teacherId = result.data.activityAdvertisementVO.id;
            this.teacherFrom.teacherSelItem =
              result.data.activityAdvertisementVO.advertisementName;
          }
        });
      this.teacherFrom.teacherSelItem = "";
    },
    setTeacher: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("activity_id", this.getActId);
      params.append("h_id", this.teacherFrom.teacherSelItem);
      this.$http
        .post(this.$api.addTeacher.addTeacher, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "成功！",
                type: "success",
              })
            );
          }
        });
      this.teacherFrom.teacherSelItem = "";
      this.teacherPopupAct = false;
    },
    changeTeacher: function () {
      const params = new URLSearchParams();
      params.append("id", this.teacherId);
      params.append("h_id", this.teacherFrom.teacherSelItem);
      this.$http
        .post(this.$api.changeTeacher.changeTeacher, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            Events.errPrompt(
              this.$message({
                message: "成功！",
                type: "success",
              })
            );
          }
        });
      this.teacherFrom.teacherSelItem = "";
      this.teacherPopupAct = false;
    },
    changeActState: function (actId, actState, actWhy) {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", actId);
      params.append("auditStatus", actState);
      if (actState == "3") {
        params.append("reasonsForFailureOfAudit", actWhy);
      }
      this.$http
        .post(this.$api.changeActState.changeActState, params, true)
        .then((result) => {
          this.getActData();
        });
      this.teacherFrom.teacherSelItem == "";
      this.teacherPopupAct = false;
    },
    editor: function (actId) {
      this.$router.push({
        path: "/act/activity/editor",
        query: {
          id: actId,
        },
      });
    },
    searchSubmit: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("page", this.page);
      params.append("show_num", this.pageSize);
      params.append("auditStatus", this.searchForm.cdxOne);
      params.append("id_activityTitle_shareTitle", this.searchForm.cdxTwo);
      params.append("usersName_remarks", this.searchForm.cdxThree);
      this.$http
        .post(this.$api.actList.actList, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            if (result.data.count != 0) {
              this.total = result.data.count;
              this.tableData = result.data.getActivityVOList;
              this.code = result.data.getActivityVOList;
            } else {
              Events.errPrompt(
                this.$message({
                  showClose: true,
                  message: "错了哦，未查询到相应数据",
                  type: "error",
                })
              );
            }
          } else {
            Events.errPrompt(
              this.$message({
                showClose: true,
                message: "错了哦，未查询到相应数据",
                type: "error",
              })
            );
          }
        });
    },
    changeTarget: function () {
      this.$router.push({
        path: "/act/activity/create",
      });
    },
    tipShow: function (index) {
      this.newTipDOM = this.$refs["tipDOM_" + index].innerHTML;
    },
    rejected: function (actId) {
      this.actId = actId;
      this.rejAct = !this.rejAct;
    },
    rjtDtm: function () {
      const params = new URLSearchParams();
      params.append("uid", localStorage.getItem("uid"));
      params.append("id", this.actId);
      params.append("auditStatus", "3");
      if (this.textarea == "") {
        this.$message.error("请您输入驳回原因");
        return;
      } else {
        params.append("reasonsForFailureOfAudit", this.textarea);
      }
      this.$http
        .post(this.$api.rejected.rejected, params, true)
        .then((result) => {
          if (result.data.state == "success") {
            this.textarea = "";
            this.$message({
              message: "恭喜你,驳回成功",
              type: "success",
            });
            this.rejAct = !this.rejAct;
            this.getActData();
          }
        });
    },
    removeRejAct: function () {
      this.rejAct = !this.rejAct;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getActData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getActData();
    },
  },
};
</script>

<style scoped>
.activity .search {
  width: 100%;
  margin-bottom: 20px;
}
.activity .search .el-card__body {
  overflow: hidden;
}
.activity .search .search-item {
  width: 230px;
  display: block;
  float: left;
  margin-right: 20px;
}
/* 活动列表 */
.activity-list .card-head {
  overflow: hidden;
  line-height: 40px;
}
.activity-list .card-head span.title {
  display: block;
  float: left;
  color: #303133;
}
.activity .activity-prompt {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  font-size: 12px;
  color: #ff8484;
}
/* 去除提示边框 */
.el-table_1_column_2 .el-button {
  border: none;
  background-color: transparent;
  color: #00aaed;
}
.el-table_1_column_2 .el-button:hover {
  background-color: #dcdfe6;
}
.activity .list .code-warpper {
  position: relative;
}
</style>