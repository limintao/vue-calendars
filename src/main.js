import Vue from 'vue'
import App from './App.vue'
import vCalendar from "./lib/index.js"

Vue.use(vCalendar)
new Vue({
  el: '#app',
  render: h => h(App)
})
