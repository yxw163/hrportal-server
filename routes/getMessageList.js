'use strict'

const AV = require('leanengine')
var Todo = AV.Object.extend('MessageList');

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

let pub = {}

pub.getMessageList = async (req, res) => {
  let queryMessageList = () => {
    let query = new AV.Query(Todo)
    return query.find()
  }
  try {
    const data = await queryMessageList()
    let arr = []

    if(data) {
      for (let item of data) {
        let result = {}
        result.content = item.get('content')
        result.title = item.get('Title')
        result.summary = item.get('Summary')
        result.author = item.get('author')
        result.authorImg = item.get('authorImg').get('url')
        result.contentImg = item.get('contentImg').get('url')
        result.createdAt = item.get('createdAt').Format("yyyy-MM-dd hh:mm:ss")
        arr.push(result)
      }
    }
    res.send(arr)
  }
  catch (err) {
    res.send(err)
  }
}

module.exports = pub