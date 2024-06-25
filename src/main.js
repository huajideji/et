import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Picker } from 'vant';
import { Area } from 'vant';
import './assets/iconfont/demo.css'
import './assets/css/colorStyle.scss'
import './assets/colorstyleFont/iconfont.css'
import {getStyleArr} from  './utils/colorstyle.js'
import '@vant/touch-emulator'

Vue.use(Picker,Area);
console.log(getStyleArr)
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
Vue.prototype.getStyleArr = getStyleArr
// 引入配置
import './permission'

Vue.prototype.setSessionItem = function (key, newVal) {
    // 创建 StorageEvent 事件
    let newStorageEvent = document.createEvent("StorageEvent");
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
  
        // 初始化 StorageEvent 事件
        newStorageEvent.initStorageEvent(
          "setItem", // 事件别名
          false,
          false,
          k,
          null,
          val,
          null,
          null
        );
  
        // 派发事件
        window.dispatchEvent(newStorageEvent);
      },
    };
    return storage.setItem(key, newVal);
  };

new Vue({
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')