!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";n(2)},function(t,e,n){"use strict";n(0)},function(t,e,n){"use strict";var o=n(3),r=function(t){return t&&t.__esModule?t:{default:t}}(o),s=n(7).MongoClient,i={pd:"mongodb://runoob:asdqwe123@localhost:27017/runoob",dev:"mongodb://runoob:asdqwe123@104.160.45.118:27017/runoob"}.dev;s.connect(i,function(t,e){console.log("连接成功！"),new r.default({address:"0.0.0.0",port:6881,db:e}).start(),e.close()})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),r=n(5),s=n(4),i=[["router.bittorrent.com",6881],["dht.transmissionbt.com",6881]],d=function(){return r.createHash("sha1").update(r.randomBytes(20)).digest()},u=function(t){for(var e=[],n=0;n+26<=t.length;n+=26)e.push({nid:t.slice(n,n+20),address:t[n+20]+"."+t[n+21]+"."+t[n+22]+"."+t[n+23],port:t.readUInt16BE(n+24)});return e},a=function(t,e){return Buffer.concat([t.slice(0,10),e.slice(10)])},c=function(t){this.nid=d(),this.nodes=[],this.maxsize=t};c.prototype.push=function(t){this.nodes.length>=this.maxsize||this.nodes.push(t)};var h=function(t){this.address=t.address,this.port=t.port,this.db=t.db,this.udp=o.createSocket("udp4"),this.ktable=new c(200)};h.prototype.sendKRPC=function(t,e){var n=s.encode(t);this.udp.send(n,0,n.length,e.port,e.address)},h.prototype.onFindNodeResponse=function(t){var t=u(t);t.forEach(function(t){t.address!=this.address&&t.nid!=this.ktable.nid&&t.port<65536&&t.port>0&&this.ktable.push(t)}.bind(this))},h.prototype.sendFindNodeRequest=function(t,e){var n=void 0!=e?a(e,this.ktable.nid):this.ktable.nid,o={t:d().slice(0,4),y:"q",q:"find_node",a:{id:n,target:d()}};this.sendKRPC(o,t)},h.prototype.joinDHTNetwork=function(){i.forEach(function(t){this.sendFindNodeRequest({address:t[0],port:t[1]})}.bind(this))},h.prototype.makeNeighbours=function(){this.ktable.nodes.forEach(function(t){this.sendFindNodeRequest({address:t.address,port:t.port},t.nid)}.bind(this)),this.ktable.nodes=[]},h.prototype.onGetPeersRequest=function(t,e){try{var n=t.a.info_hash,o=t.t,r=t.a.id,s=n.slice(0,2);if(void 0===o||20!=n.length||20!=r.length)throw new Error}catch(t){return}this.sendKRPC({t:o,y:"r",r:{id:a(n,this.ktable.nid),nodes:"",token:s}},e)},h.prototype.onAnnouncePeerRequest=function(t,e){var n;try{var o=t.a.info_hash,r=t.a.token,s=t.a.id,i=t.t;if(void 0==i)throw new Error}catch(t){return}if(o.slice(0,2).toString()==r.toString()&&!((n=void 0!=t.a.implied_port&&0!=t.a.implied_port?e.port:t.a.port||0)>=65536||n<=0)){this.sendKRPC({t:i,y:"r",r:{id:a(s,this.ktable.nid)}},e),console.log("magnet:?xt=urn:btih:%s from %s:%s",o.toString("hex"),e.address,e.port);var d={url:o.toString("hex"),address:e.address+":"+e.port};db.collection("magnet").insert(d,function(t,e){if(t)return void console.log("Error:"+t)})}},h.prototype.onMessage=function(t,e){try{var t=s.decode(t);"r"==t.y&&t.r.nodes?this.onFindNodeResponse(t.r.nodes):"q"==t.y&&"get_peers"==t.q?this.onGetPeersRequest(t,e):"q"==t.y&&"announce_peer"==t.q&&this.onAnnouncePeerRequest(t,e)}catch(t){}},h.prototype.start=function(){this.udp.bind(this.port,this.address),this.udp.on("listening",function(){console.log("UDP Server listening on %s:%s",this.address,this.port)}.bind(this)),this.udp.on("message",function(t,e){this.onMessage(t,e)}.bind(this)),this.udp.on("error",function(){}.bind(this)),setInterval(function(){this.joinDHTNetwork(),this.makeNeighbours()}.bind(this),1e3)},e.default=h},function(t,e){t.exports=require("bencode")},function(t,e){t.exports=require("crypto")},function(t,e){t.exports=require("dgram")},function(t,e){t.exports=require("mongodb")}]);