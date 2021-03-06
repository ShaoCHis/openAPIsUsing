import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import X2JS from "x2js";

Vue.prototype.$x2js =new X2JS();

axios.defaults.withCredentials = true;

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
