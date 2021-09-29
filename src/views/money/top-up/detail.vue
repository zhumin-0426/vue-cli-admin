<template>
  <div class="PayMentdel">
    <el-card class="PayMentdel-card">
        <ul>
            <li><span>订单金额：{{orderMoney}}元</span></li>
            <li><span>创建订单时间：{{creatOrderMoney}}</span></li>
        </ul>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            orderMoney:"",
            creatOrderMoney:""
        }
    },
    created(){
        this.delData()
    },
    methods:{
        delData:function(){
            const params = new URLSearchParams();
            let cid = this.$route.query.id;
            params.append("uid", localStorage.getItem("uid"));
            params.append("cid", cid);
            this.$http.post(this.$api.payMentDel.payMentDel,params,true).then(result=>{
                if(result.data.state=="success"){
                    this.orderMoney = result.data.getrechargeVo.orderMoney_money_show;
                    this.creatOrderMoney = result.data.getrechargeVo.createTime_name;
                }
            })
        }
    }
};
</script>

<style>
    .PayMentdel ul{
        width: 100%;
        overflow: hidden;
    }
    .PayMentdel ul li{
        width: 50%;
        float: left;
    }
</style>