# vue-calendars

[![npm](https://img.shields.io/npm/v/vue-calendars.svg?maxAge=2592000?style=flat-square)]()
<!-- [![npm](https://img.shields.io/npm/dt/vue-fullcalendar.svg?maxAge=2592000?style=flat-square)]() -->

> A simple calendar selection component based on vue.js!You can customize which day is not optional, or you can define subscripts for each day (or days). Single or multiple choice!

## Getting Started


#### install

By npm

``` bash

npm install vue-calendars --save

```

or download code and include it

``` shell

<script src='dist/vue-calendars.js'></script>

```

## Usage

Register component globally!

``` javascript
// Your entry main.js

import Vue from 'vue'
import App from './App.vue'
import vCalendar from "vue-calendars"

Vue.use(vCalendar)
new Vue({
  el: '#app',
  render: h => h(App)
})

```
or register locally in your .vue file

## Example

``` html
<template>
  <div class="hello">
    <div class="chooseView" @click="openCalendar">
        <span class="item">选择日期</span>
        <span class="result">{{getCurrentDate}}</span>
        <span class="select">请选择></span>
    </div>
    
    <calendar-el 
        :option="option" 
        :click-action="setCurrentDate" 
        :select-date="currentDate"
        :multi-selection="isMultiple"
        :subscript="subscript"
        :items-subscript="itemsSubscript"
        :submit-type="submitType"
        ></calendar-el>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        option: {
            open: false,  //是否打开日历📅；
            aroud: 12, //显示多少月的数据
        },
        currentDate: [],    //当前选择的日期
        isMultiple: false, //是否多选，false单选、true多选
        subscript: "可约",  //所有的日期下标标题
        itemsSubscript:[    // 自定义哪天不可选和自定义标题
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
        ]
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
  methods:{
    openCalendar() {
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
    setCurrentDate(d) {   //设置点击的日期
        this.currentDate= d;//
        this.closeCalendar();
    },
    submitType(type){
        this.currentDate = '';
        this.closeCalendar();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
	.chooseView{
        width: 100%;
    }
</style>
```

A sample screenshot is here, 

![vue-calendars example](./src/assets/example1.png)

## Options

Option  | Description
---|---
option | 传入一组object aroud(当前日期),如当前日期为2018/04/25 around为3 则显示2018/04 2018/05 2018/06 3个月；open(是否显示日历)，true(显示) or false（隐藏）
click-action | 选择日期之后执行的方法，可接方法名
select-date | 选择日期高亮
multi-selection | 是否多选,true(多选) or false(单选)
subscript | 所有日期的下标
items-subscrip | 选择哪些日期不可选，或哪些日期的自定义下标
submit-typ | 选择日期后的方法，仅多选可用

* 有什么问题欢迎随时提Issues！😊
