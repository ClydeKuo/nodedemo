var request =require("request")
var selff=require('./tem.js')
var cheerio = require('cheerio')

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
request({
  method:"GET",
  url:'http://adpays.net/v.php?user=4297',
  proxy:"http://80.240.60.165:8081/",
  followAllRedirects:true,
  headers:{
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
    'upgrade-insecure-requests':'1',
    "authority":"hidemy.name",
    "cache-control":"max-age=0",
    // "Connection":"keep-alive",
    // 'Cookie':"__cfduid=d76cafce38bd01b3b60041af7c7da412c1491010798; PHPSESSID=gflj3dti5bhj6rjol2130iheo7; TawkConnectionTime=0; __tawkuuid=e::adpays.net::nlF8BgfwL9/xShZQs7lP+IDLjoC4VJNJFauv4HokXlnn3l1uvpkAud9hlBKxHIXO::2; Tawk_5703f9be5c96cca60a9d16c2=vs3.tawk.to::0; ptp=1494564903; _ga=GA1.2.518476455.1494559785; _gid=GA1.2.1591825687.1494565013; _gat=1",
  }
},function(error, response, body){
  if(error){
    console.log("error"+error)
  }else{
    var $ = cheerio.load(body)
    $($("script")[3]).empty()
    $($("script")[4]).empty()
    // console.log($.html())
    // $($("script")[5]).attr('src','http://ootid8wao.bkt.clouddn.com/jsdom.js')
    $($("iframe")).remove()
    // debugger
    console.log("got html")
    const {window} = new JSDOM($.html(), {
      url: "http://adpays.net/v.php?user=4297",
      // referrer: "https://www.discoveryland.tk/",
      contentType: "text/html;q=0.9,image/webp,*/*;q=0.8",
      userAgent: "Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
      includeNodeLocations: true,
      runScripts: "dangerously"
    });
selff.selff(window);
  }
})
