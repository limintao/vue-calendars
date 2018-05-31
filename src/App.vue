<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <v-calendar :option="option" 
					:click-action="setCurrentDate" 
					:select-date="currentDate"
					:multi-selection="isMultiple"
					:subscript="subscript"
					:items-subscript="itemsSubscript"
					:submit-type="submitType"
					:selected-component="selectedComponent"></v-calendar>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
 data () {
    return {
      msg: "撒很快就安徽省考虑的撒",
      option: {
				open: false,
				aroud: 12, //12个月
			},
			currentDate: [],//当前选择的日期
			pepoleNum: 10,
			cardNum: 10,
			isMultiple: false,
			subscript: "可约",
			itemsSubscript:[
				{
					date: '2018-05-31',
					title: '不可休',
				},
				{
					date: '2018/06/01',
					title: '不可休',
				},
				{
					date: '2018,06,22',
					title: '不可休',
				}
			],
			selectedComponent: ""
    }
  },
  computed: {
	
		getCurrentDate() {
			let d = this.currentDate;
			for(let i = 0 ; i < d.length ; i ++)
				if (d) {
					return this.formatDate(d[i].getFullYear(), d[i].getMonth() + 1, d[i].getDate());
				} else {
					d = new Date();
					return this.formatDate(d[i].getFullYear(), d[i].getMonth() + 1, d[i].getDate());
				}
		}
	},
  created:function(){
      
  },
  methods:{
    openCalendar() {
			this.getCalendarAndMum();
			this.option.open = true;
		},
		closeCalendar() {
			this.option.open = false;
		},
		formatDate(year, month, day) {
			let y = year;
			let m = month;
			if (m < 10) m = "0" + m;
			let d = day;
			if (d < 10) d = "0" + d;
			return y + "-" + m + "-" + d
		},
		setCurrentDate(d) {
			this.currentDate= d;//
			this.closeCalendar();
		},
		getCalendarAndMum() {
			//此处可以获取数据  比如获取对应日期的人数
		},
		submitType(type){
			console.log(type);
			this.currentDate = '';
			this.closeCalendar();
		}
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
