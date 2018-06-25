<template>
<transition name="fade">
	<div class="calendar" v-if="option.open" >
		<div class="calendaWrap">
			<div class="submit-view">
				<div><span @click="option.open = false">取消</span></div>
				<div><span>{{ option.title || '选择日期' }}</span></div>
				<div><span @click="complete">确认</span></div>
			</div>
			<div class="weekly">
				<ul class="week">
					<li>日</li>
					<li>一</li>
					<li>二</li>
					<li>三</li>
					<li>四</li>
					<li>五</li>
					<li>六</li>
				</ul>
			</div>
			<div class="calendar-list">
				
				<div class="calendar-content">
					<div class="calendar-item" v-for="(date,index) in dateArr" :key="index">
						<div class="calendar-header">
							<span>{{date.y}}年{{date.m}}月</span>
						</div>
						<div class="calendar-body">
							<ul class="days">
								<li v-for="(day,index) in date.days" :key="index">
									<div v-if="day.getMonth()+1 != date.m">
										<span></span>
									</div>
									<div v-else-if="isToday(day)" @click="clickAction(day)"  :class="{active: chooseDate.indexOf(day) === -1 ? false : true}">
										<span class='todayText redText'>{{ '今天' }}</span>
										<span @click="clickChoose(day,$event)">{{ day.getDate() }}</span>
										<i class="nums">{{ isCurrentDay(day) || subscript }}</i>
									</div>
									<div v-else :class="{active: chooseDate.indexOf(day) === -1 ? false : true}">
										<i class="iconfont"></i>
										<template v-if="day<new Date() || isCurrentDay(day)">
											<span class="disabled">{{ day.getDate() }}</span>
										</template>
										<template v-else>
											<span @click="clickChoose(day,$event)">{{ day.getDate() }}</span>
										</template>
										<template v-if="day > new Date()">
											<i class="nums">{{ isCurrentDay(day) || subscript }}</i>
										</template>	
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div v-if="multiSelection" class="typeChoose" 
						:style="{display: showAlert ? 'flex' : 'none',top: typeAlert.y + 'px',left: typeAlert.x + 'px'}"
						>
						<button @click="submitType(chooseDate)">请假</button>
						<button @click="submitType(chooseDate)">休假</button>
						<button @click="chooseDate = [];showAlert = false">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>
<script>
export default {
	name: "v-calendar",
	data() {
		return {
			currentDate: {
				currentDay: null,
				currentMonth: null,
				currentYear: null,
				currentWeek: null
			},
			dateArr: [],
			clickNums: 0,
			chooseDate: [],
			typeAlert: {
				x: 100,
				y: 50
			},
			showAlert: false
		}
	},
	props: ['option', 'clickAction', "submitType", "multiSelection", "subscript", "itemsSubscript", "title"],
	created() {
		for (let x = 0; x < (this.option.aroud || 12); x++) {
			let days = this.calendarInit(this.currentDate.currentYear, this.currentDate.currentMonth ,x);
			let timeObj = {
				y: this.currentDate.currentYear,
				m: this.currentDate.currentMonth,
				days
			};
			this.dateArr.push(timeObj);
		}
		
	
	},
	computed: {
      getCurrentDate() {
			let d = this.chooseDate;
			console.log(d);
            for(let i = 0 ; i < d.length ; i ++) {
                if (d) {
                    return this.formatDate(d[i].getFullYear(), d[i].getMonth() + 1, d[i].getDate());
                } else {
                    d = new Date();
                    return this.formatDate(d[i].getFullYear(), d[i].getMonth() + 1, d[i].getDate());
                }
            }  
        }
  	},
	methods: {
		isCurrentDay(day) {
			let d = "";

			for(let i of this.itemsSubscript){
				d = i.date.replace(/\-\//g,",")
				if(day.getFullYear() == new Date(i.date).getFullYear() && day.getMonth() == new Date(i.date).getMonth() && day.getDate() == new Date(i.date).getDate()){
					return i.title
				}
			}
		},
		isToday(day) {
			return day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate() ? true : false;
		},
		getDay(date) {
			this.currentDate.currentDay = date.getDate();
			this.currentDate.currentYear = date.getFullYear();
			this.currentDate.currentMonth = date.getMonth() + 1;
			this.currentDate.currentWeek = date.getDay() + 1;
			if (this.currentDate.currentWeek == 0) {
				this.currentDate.currentWeek = 7;
			}
		},
		clickChoose(day,event) {
			let clientWidth = document.documentElement.clientWidth,
				clientHeight = document.documentElement.clientHeight,
				dayWidth = event.target.parentNode.offsetWidth,
				dayHeight = event.target.parentNode.offsetHeight;
			this.clickNums = this.chooseDate.length;
			if(this.clickNums > 4){
				alert("您的休假天数只剩4天，不能选择更多天数了！");
				this.clickNums = 0;
				this.chooseDate = [];
				this.showAlert = false;
			}else{
				if(this.chooseDate.length === 0 ){
					this.chooseDate.push(day);
					if(event.pageX > (clientWidth / 2)){
						this.typeAlert.x = (clientWidth / 2) - (dayWidth / 4);
					}
					if(event.pageY < (clientHeight / 4)){
						this.typeAlert.y = event.pageY + (dayHeight / 2);
					}
					if(event.pageX < (clientWidth / 2)){
						this.typeAlert.x = event.pageX - (dayWidth / 4);
					}
					if(event.pageY > (clientHeight / 4)){
						this.typeAlert.y = event.pageY - (dayHeight * 1.5);
					}
					this.showAlert = true;
				}else{
					let flag = true;
					this.chooseDate.forEach((element,key) => {
						if(day === element){
							flag = false;
							this.chooseDate.splice(key,1);
							if(this.currentDate.length < 1){
								this.showAlert = false;
							}
						}
						if(!this.multiSelection){
							this.chooseDate.splice(key,1);
						}
					});
					if(flag){
						this.chooseDate.push(day);
					}
				}
				
			}
		},
		complete () {
			if (!this.multiSelection){
				this.clickAction(this.getCurrentDate);
				this.option.open = false;
			}
		},
		submitEve(){
			this.showAlert = false;
			this.submitType(this.chooseDate);
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
		calendarInit(year, month, x) {
			let date, d;
			let days = [];
			if (year == null || month == null) {
				let _date = new Date();
				d = new Date(_date.getFullYear(), _date.getMonth() - 1, 1);
			} else {
				d = new Date(year, month - 1, 1);
			}
			d.setDate(42);
			date = new Date(d.getFullYear(), d.getMonth(), 1);
			this.getDay(date);
			for (let i = this.currentDate.currentWeek - 1; i >= 0; i--) {
				let d = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay);
				d.setDate(d.getDate() - i);
				days.push(d);
			}
			for (let i = 1; i <= 42 - this.currentDate.currentWeek; i++) {
				let d = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay);
				d.setDate(d.getDate() + i);
				days.push(d);
			}
			return days;
		},
	},
}
</script>
<style lang="scss">
@import "../assets/common.scss";
</style>