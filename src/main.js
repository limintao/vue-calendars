import Vue from 'vue'
import App from './App.vue'
import Vcalendar from "./lib/index.js"

Vue.use(Vcalendar)
new Vue({
  el: '#app',
  render: h => h(App)
})
