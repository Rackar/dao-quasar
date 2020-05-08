import Vue from 'vue';

import iconHover from '@/plugins/iconHover.vue';

let iconComp = {};

iconComp.install = function() {
  Vue.component(iconHover.name, iconHover); // testPanel.name 组件的name属性
};
Vue.use(iconComp);
