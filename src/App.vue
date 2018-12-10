<template>
  <div id="app">
		<p @click="openCalendar">选择日期：{{ currentDate[0] }}</p>
		<p>{{ currentDate[1] }}</p>
    <v-calendar :option="option" 
					:click-action="setCurrentDate" 
					:select-date="currentDate"
					:multi-selection="isMultiple"
					:interval-selection="isInterval"
					:subscript="subscript"
					:items-subscript="itemsSubscript"
					>
		</v-calendar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      option: {
				open: false,
				aroud: 12, //12个月
			},
			currentDate: '',//当前选择的日期
			isMultiple: true,
			isInterval: false,
			subscript: "可约",
			itemsSubscript:[
				{
					date: '2018-08-31',
					title: '不可休',
				},
				{
					date: '2018/09/01',
					title: '不可休',
				},
				{
					date: '2018,08,22',
					title: '不可休',
				}
			]
    }
  },
  created:function(){
      
  },
  methods:{
    openCalendar() {
			this.option.open = true;
		},
		setCurrentDate(d) {
			this.currentDate = d;//
			console.log(d);
		}
  }
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size:  calc(100vw/7.5);
}

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
