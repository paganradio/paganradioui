import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Chat from "vue-beautiful-chat";

Vue.config.productionTip = false;
Vue.use(Chat);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
