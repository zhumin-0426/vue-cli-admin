import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import './assets/element-css/index.css';
import './assets/font/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import api from './http/api';
import http from './http/http';
import Moment from 'moment';
// axios 拦截器
import './http/axios';
Vue.use(mavonEditor);
Vue.use(ElementUI);
// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.$http = http;
// 时间格式化
Vue.prototype.moment = Moment;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
