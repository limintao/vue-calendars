<template>
<transition name="fade">
	<div class="calendar" v-if="option.open" >
		<div class="calendaWrap">
			<div class="submit-view">
				<div><span @click="cancel()">取消</span></div>
				<div><span>{{ option.title || '选择日期' }}</span></div>
				<div><span @click="complete()">确认</span></div>
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
									<div v-if="day.m + 1 != date.m">
										<span></span>
									</div>
									<div v-else-if="isToday(day)" @click="clickAction(day)"  :class="{active: JSON.stringify(clickIndex).indexOf(JSON.stringify(day)) != -1}">
										<span class='todayText redText'>{{ '今天' }}</span>
										<span @click="clickChoose(day,$event,index)">{{ day.d }}</span>
										<i class="nums">{{ isCurrentDay(day) || subscript }}</i>
									</div>
									<div v-else :class="{active: JSON.stringify(clickIndex).indexOf(JSON.stringify(day)) != -1}">
										<i class="iconfont"></i>
										<template v-if="new Date(day.y, day.m, day.d) < new Date() || isCurrentDay(day)">
											<span class="disabled">{{ day.d }}</span>
										</template>
										<template v-else>
											<span @click="clickChoose(day,$event,index)">{{ day.d }}</span>
										</template>
										<template v-if="new Date(day.y, day.m, day.d) > new Date()">
											<i class="nums">{{ isCurrentDay(day) || subscript }}</i>
										</template>	
									</div>
								</li>
							</ul>
						</div>
					</div>
					<!-- <div v-if="multiSelection" class="typeChoose" 
						:style="{display: showAlert ? 'flex' : 'none',top: typeAlert.y + 'px',left: typeAlert.x + 'px'}"
						>
						<slot name="operating"></slot>
					</div> -->
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
			clickIndex: [],
			chooseDate: [],
			typeAlert: {
				x: 100,
				y: 50
			},
			// showAlert: false
		}
	},
	props: ['option', 'clickAction', "multiSelection", "intervalSelection", "subscript", "itemsSubscript", "title"],
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
	mounted() {
		
	},
	computed: {
      getCurrentDate() {
			let [ ...d ] = this.chooseDate,
				arr = [];
            for(let i of d) {
                if (d) {
					arr.push(this.formatDate(i.y, i.m + 1, i.d));
                } else {
                    let now = new Date();
					arr.push(this.formatDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
				}
			}
			return arr;
        }
  	},
	methods: {
		isCurrentDay(day) {
			let d = "";

			for(let i of this.itemsSubscript){
				d = i.date.replace(/\-\//g,",")
				if(day.y == new Date(i.date).getFullYear() && day.m == new Date(i.date).getMonth() && day.d == new Date(i.date).getDate()){
					return i.title
				}
			}
		},
		isToday(day) {    // 判断是否是今天
			return day.y == new Date().getFullYear() && day.m == new Date().getMonth() && day.d == new Date().getDate() ? true : false;
		},
		getDay(date) {     // 获取天数
			this.currentDate.currentDay = date.getDate();
			this.currentDate.currentYear = date.getFullYear();
			this.currentDate.currentMonth = date.getMonth() + 1;
			this.currentDate.currentWeek = date.getDay() + 1;
			if (this.currentDate.currentWeek == 0) {
				this.currentDate.currentWeek = 7;
			}
		},
		clickChoose(day,event) {    //  点击日期的方法
			if(this.chooseDate.length > 1 && this.intervalSelection){    //  如果选择天数的个数大于两，则算是重新选择开始时间
				this.chooseDate = [];    // 清空选择的天数
				this.clickIndex = [];     //  清空选择的下标
				this.chooseDate.push(day);    //把新选择的天添加进去
				this.clickIndex.push(day);   //  把新选的天的下标添加进去
			}else{                              //  如果选择的天数不大于二
				if(this.chooseDate.length === 0 ){     
					this.chooseDate.push(day);   // 添加进去天
					this.clickIndex.push(day);    // 添加进去天的下标
				}else{							// 如果已选择一天的操作
					this.chooseDate.forEach((element,key) => {
						if(day === element){      // 如果所点的这一天和上次点的是同一天则取消选择
							this.chooseDate.splice(key,1);     // 删除掉所选的天数
							this.clickIndex.splice(key,1);      //  删除掉所选天的下标
						}else if(!this.multiSelection && !this.intervalSelection){         //  如果所点的不是一天并且不是多选
							this.chooseDate.splice(key,1,day);	//  替换掉当前值
							this.clickIndex.splice(key,1,day);
						}else if (this.multiSelection){      //  如果是多选，push进数组
							this.chooseDate.push(day);
							this.clickIndex.push(day);
						}else if(this.intervalSelection){     //   如果是区域选择
							let [ ...arr ] = this.clickIndex,
								startTime = new Date(arr[0].y, arr[0].m, arr[0].d),
								endTime = new Date(day.y, day.m, day.d);
							if((endTime.getTime() - startTime.getTime()) < 0){     //   判断结束时间如果小于开始时间则把结束时间放在开始时间之前
								startTime = endTime;
								endTime = new Date(arr[0].y, arr[0].m, arr[0].d);
								this.chooseDate.unshift(day);
								this.clickIndex.unshift(day);
							}
							while( (endTime.getTime() - startTime.getTime()) > 0 ){
								startTime.setDate(startTime.getDate() + 1);
								((time) => {
									this.clickIndex.push({
										y: time.getFullYear(),
										m: time.getMonth(),
										d: time.getDate()
									});
								})(startTime);
							}
							this.chooseDate.push(day);
						}
					});
					
				}
				
			}
		},
		complete () {     //  点确认传递数据
			if (this.intervalSelection){
				if (this.chooseDate.length < 2){
					alert("请选择结束日期！");
				}else {
					this.clickAction(this.getCurrentDate);
					this.option.open = false;
				}
			}else {
				this.clickAction(this.getCurrentDate);
				this.option.open = false;
			}
		},
		formatDate(year, month, day) {    //  日期格式化
			let y = year;
			let m = month;
			if (m < 10) m = "0" + m;
			let d = day;
			if (d < 10) d = "0" + d;
			return y + "-" + m + "-" + d
		},
		cancel(){     //  点击取消清空数据
			this.option.open = false;
			this.chooseDate = [];
			this.clickIndex = [];
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
				d = {
					y: d.getFullYear(),
					m: d.getMonth(),
					d: d.getDate()
				}
				days.push(d);
			}
			for (let i = 1; i <= 42 - this.currentDate.currentWeek; i++) {
				let d = new Date(this.currentDate.currentYear, this.currentDate.currentMonth - 1, this.currentDate.currentDay);
				d.setDate(d.getDate() + i);
				d = {
					y: d.getFullYear(),
					m: d.getMonth(),
					d: d.getDate()
				}
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