import Vue from 'vue';

import IconHover from '@/plugins/IconHover.vue';

let iconComp = {};

iconComp.install = function() {
  Vue.component(IconHover.name, IconHover); // testPanel.name 组件的name属性
};
Vue.use(iconComp);
