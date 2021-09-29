<template>
  <div class="detail">
    <el-card class="box-card">
         <div class="tip-detail-head">
            {{title}}
         </div>
         <div class="tip-detail-content" v-html="content">
         </div>
         <div class="tip-detail-footer">
             <div class="top">拓客汇</div>
             <div class="time">{{footer}}</div>
         </div>
    </el-card>
  </div>
</template>

<script>
// import Events from "../../../common/js/events";
import marked from "marked";
export default {
  data(){
    return{
      title:"",
      content:"",
      footer:"",
      picurl: "http://lb3.28888753.cn/imges/",
      showAct:true
    }
  },
  created(){
    this.tipDel()
  },
  methods:{
    tipDel:function(){
      let ids = this.$route.query.ids
      console.log('a',ids)
      const params = new URLSearchParams();
      params.append("ids", ids);
      this.$http.post(this.$api.tipDel.tipDel,params,true).then(result=>{
        console.log("公告详情",result)
        if(result.data.state="success"){
            this.title = result.data.getNoticeVO.title;
            // this.content = result.data.getNoticeVO.content;
            // 内容
            this.content = marked(result.data.getNoticeVO.content||"",{
              sanitize:true
            })
            this.footer = result.data.getNoticeVO.createTime_show;
        }
      })
    },
    imgError(){
       this.showAct = false
    },
  }
};
</script>

<style scoped>
.detail .tip-detail-head{
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 30px 0;
}
.detail .tip-detailcontent p{
    width: 100%;
} 
.detail .tip-detailcontent img{
    max-width: 100%;
}
.detail .tip-detail-footer{
    width: 100%;
    margin: 30px 0;
    text-align: right;
}
.detail .tip-detail-footer .top{
    font-size: 16px;
    color: #303133;
    margin: 10px;
}
.detail .tip-detail-footer .time{
    font-size: 16px;
    color: #303133;
    margin: 10px;
}
</style>