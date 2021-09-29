<template>
  <div class="Map">
    <div class="top" style="margin-bottom:10px;display:flex;justify-content: space-between">
      <div class="left">
        <el-input placeholder="请填写详细位置信息，用于一键导航" v-model="keyAdr" clearable></el-input>
        <el-button @click="searchAdr">搜索</el-button>
      </div>
      <div class="right">
        <el-button @click="resetAdr">重置并关闭</el-button>
        <el-button type="primary" @click="useAdr">使用此位置</el-button>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import bus from "../assets/js/bus";
import Events from "../assets/js/events"
export default {
  data() {
    return {
      keyAdr: "",
      map: "",
      markers: [],
      searchService: "",
      citylocation: "",
      geocoder: "",
      marker: null,
      lng: 0,
      lat: 0,
      address: "",
      centerDialogVisible:false
    };
  },
  mounted() {
    // 地图
    this.init();
  },
  methods: {
    setMap() {
      const that = this;
      return new Promise(function (resolve, reject) {
        //设置城市信息查询服务
        that.citylocation = new qq.maps.CityService();
        //请求成功回调函数
        that.citylocation.setComplete(function (result) {
          //获取当前地址经纬度
          var center = result.detail.latLng;
          //实例化地图
          that.map = new qq.maps.Map(document.getElementById("container"), {
            center: center,
            zoom: 13,
          });
          resolve();
        });
        //请求失败回调函数
        that.citylocation.setError(function () {
          alert("出错了，获取经纬度失败！！！");
        });
        that.citylocation.searchLocalCity();
      });
    },
    //经纬度获取地址
    getAddress: function (latLng) {
      const that = this;
      return new Promise(function (resolve, reject) {
        //添加地址解析
        that.geocoder = new qq.maps.Geocoder({
          complete: function (result) {
            that.address = result.detail.address;
            that.lat = result.detail.location.lat;
            that.lng = result.detail.location.lng;
            var data = {
              name: result.detail.nearPois
                ? result.detail.nearPois[0]["name"]
                : "",
              address: that.address,
              lat: that.lat,
              lng: that.lng,
            };
            resolve(data);
          },
        });
        that.geocoder.getAddress(latLng);
      });
    },
    init: function () {
      const that = this;
      var lat = that.lat,
        lng = that.lng;
      that.setMap().then(function () {
        if (lng && lat) {
          var latLng = new qq.maps.LatLng(lat, lng);
          that.map.panTo(latLng);
          that.map.setCenter(latLng);
          that.map.zoomTo(15);
          var marker = new qq.maps.Marker({
            map: that.map,
            position: latLng,
          });
        }
        var latlngBounds = new qq.maps.LatLngBounds();
        that.searchService = new qq.maps.SearchService({
          complete: function (results) {
            var pois = results.detail.pois;
            for (var i = 0, l = pois.length; i < l; i++) {
              var poi = pois[i];
              //扩展边界范围，用来包含搜索到的Poi点
              latlngBounds.extend(poi.latLng);
              var marker = new qq.maps.Marker({
                map: that.map,
                position: poi.latLng,
              });
              marker.setTitle(poi.name); //设置标记提示
              that.markers.push(marker);
              qq.maps.event.addListener(marker, "click", function (e) {
                var address = poi.address;
                //获取点击的经纬度
                var latLng = new qq.maps.LatLng(
                  e.latLng.getLat().toFixed(6),
                  e.latLng.getLng().toFixed(6)
                );
                //经纬度获取地址
                that.getAddress(latLng).then(function (data) {
                  that.lng = e.latLng.lng;
                  that.lat = e.latLng.lat;
                  that.address = data.address;
                  marker.setTitle(data.name); //设置标记提示
                });
              });
            }
            //调整地图视野
            map.fitBounds(latlngBounds);
          },
          //若服务请求失败，则运行以下函数
          error: function () {
            alert("出错了，请输入正确的参数！！！");
          },
        });
        // 调用解析地址
        that.geocoder = new qq.maps.Geocoder({
          complete: function (result) {
            that.lng = result.detail.location.lng;
            that.lat = result.detail.location.lat;
            that.map.setCenter(result.detail.location);
            var marker = new qq.maps.Marker({
              map: that.map,
              position: result.detail.location,
            });
            var poi = result.detail;
            that.markers.push(marker);
            qq.maps.event.addListener(marker, "click", function (e) {
              //获取点击的经纬度
              var latLng = new qq.maps.LatLng(
                e.latLng.getLat().toFixed(6),
                e.latLng.getLng().toFixed(6)
              );
              //经纬度获取地址
              that.getAddress(latLng).then(function (data) {
                that.lng = e.latLng.lng;
                that.lat = e.latLng.lat;
                that.address = data.address;
                marker.setTitle(data.name); //设置标记提示
              });
            });
          },
          error: function (err) {
            Events.errPrompt(that.$message.error('请填写完整的商家地址'))
          },
        }),
          //添加监听事件   获取鼠标单击事件
          qq.maps.event.addListener(that.map, "click", function (event) {
            var marker = new qq.maps.Marker({
              position: event.latLng,
              map: that.map,
              flat: true,
            });
            //获取点击的经纬度
            var latLng = new qq.maps.LatLng(
              event.latLng.getLat().toFixed(6),
              event.latLng.getLng().toFixed(6)
            );
            //经纬度获取地址
            that.getAddress(latLng).then(function (data) {
              that.lng = data.lng;
              that.lat = data.lat;
              that.address = data.address;
              marker.setTitle(data.name); //设置标记提示
              //清除旧的标记
              qq.maps.event.addListener(that.map, "click", function (event) {
                marker.setMap(null);
              });
            });
          });
      });
    },
    // 地点搜索
    searchAdr: function () {
      this.geocoder.getLocation(this.keyAdr);
    },
    resetAdr:function(){
       let obj = {
         lat:"",
         lng:""
       }
       bus.$emit('pos',obj);
       bus.$emit('mapAct',this.centerDialogVisible)
    },
    useAdr:function(){
       let obj = {
         lat:this.lat,
         lng:this.lng
       }
       bus.$emit('pos',obj);
       bus.$emit('mapAct',this.centerDialogVisible)
    }
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 520px;
}
</style>