import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import VueResource from 'vue-resource';
import JsonExcel from "vue-json-excel";
import Toasted from 'vue-toasted';
import Vuelidate from 'vuelidate'
import store from './store'

Vue.use(VueResource) //http | post|get|put 
Vue.use(Vuelidate)   //Validasyon 
Vue.use(Toasted, {
  iconPack: 'material'     //Toaster mesaj
});

Vue.use(JsonExcel)   //Excel download
Vue.component("downloadExcel", JsonExcel); //Template tarafında kullanmamızı sağlar

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
