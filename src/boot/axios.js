import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://chatdao.com:3031';
Vue.prototype.$axios = axios
