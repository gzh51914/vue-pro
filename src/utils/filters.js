import Vue from "vue"
import moment from "moment"


// 演员
Vue.filter("actorFilter", data => {
    if (data) {
        return data.map(item => item.name).join(" ")
    } else {
        return "暂无主演"
    }
})

// 日期 2020-12-12
Vue.filter("dateFilter", (date, option = '-') => {
    return moment(date * 1000).format("YYYY" + option + "MM" + option + "DD") // moment里面的参数是时间戳
})

// 日期 周五 4月10日
Vue.filter("dayFilter", (day) => {
    var days = moment(day * 1000).locale('zh-cn').format("dddd").slice(-1);
    return moment(day * 1000).format("周" + days + " MM月DD日");
})