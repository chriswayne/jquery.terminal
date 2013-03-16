/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.5.4
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sat, 16 Mar 2013 16:33:34 +0000
*/
(function(g,I){function ea(d,h){var i;if(typeof d==="string"&&typeof h==="string"){localStorage[d]=h;return true}else if(typeof d==="object"&&typeof h==="undefined"){for(i in d)if(d.hasOwnProperty(i))localStorage[i]=d[i];return true}return false}function ba(d,h){var i,e;i=new Date;i.setTime(i.getTime()+31536E6);i="; expires="+i.toGMTString();if(typeof d==="string"&&typeof h==="string"){document.cookie=d+"="+h+i+"; path=/";return true}else if(typeof d==="object"&&typeof h==="undefined"){for(e in d)if(d.hasOwnProperty(e))document.cookie=
e+"="+d[e]+i+"; path=/";return true}return false}function fa(d){return localStorage[d]}function ga(d){var h,i,e;d+="=";h=document.cookie.split(";");for(i=0;i<h.length;i++){for(e=h[i];e.charAt(0)===" ";)e=e.substring(1,e.length);if(e.indexOf(d)===0)return e.substring(d.length,e.length)}return null}function ha(d){return delete localStorage[d]}function ia(d){return ba(d,"",-1)}function Y(d,h){var i=[],e=d.length;if(e<h)return[d];for(var j=0;j<e;j+=h)i.push(d.substring(j,j+h));return i}function ja(d){var h=
d?[d]:[];g.extend(this,{size:function(){return h.length},pop:function(){if(h.length===0)return null;else{var i=h[h.length-1];h=h.slice(0,h.length-1);return i}},push:function(i){h=h.concat([i]);return i},top:function(){return h.length>0?h[h.length-1]:null}})}function ka(d,h){var i=true;if(typeof d==="string"&&d!=="")d+="_";var e=g.Storage.get(d+"commands");e=e?(new Function("return "+e+";"))():[];var j=e.length-1;g.extend(this,{append:function(n){if(i)if(e[e.length-1]!==n){e.push(n);j=e.length-1;if(h&&
e.length>h)e=e.slice(-h);g.Storage.set(d+"commands",g.json_stringify(e))}},data:function(){return e},next:function(){j<e.length-1&&++j;if(j!==-1)return e[j]},reset:function(){j=e.length-1},last:function(){return e[length-1]},end:function(){return j===e.length-1},position:function(){return j},previous:function(){var n=j;j>0&&--j;if(n!==-1)return e[n]},clear:function(){e=[];g.Storage.remove(d+"commands")},enable:function(){i=true},disable:function(){i=false}})}function ca(d){return g("<div>"+g.terminal.strip(d)+
"</div>").text().length}g.omap=function(d,h){var i={};g.each(d,function(e,j){i[e]=h.call(d,e,j)});return i};var X=typeof window.localStorage!=="undefined";g.extend({Storage:{set:X?ea:ba,get:X?fa:ga,remove:X?ha:ia}});jQuery.fn.extend({everyTime:function(d,h,i,e,j){return this.each(function(){jQuery.timer.add(this,d,h,i,e,j)})},oneTime:function(d,h,i){return this.each(function(){jQuery.timer.add(this,d,h,i,1)})},stopTime:function(d,h){return this.each(function(){jQuery.timer.remove(this,d,h)})}});jQuery.extend({timer:{guid:1,
global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(d){if(d===I||d===null)return null;var h=this.regex.exec(jQuery.trim(d.toString()));return h[2]?parseInt(h[1],10)*(this.powers[h[2]]||1):d},add:function(d,h,i,e,j,n){var u=0;if(jQuery.isFunction(i)){j||(j=e);e=i;i=h}h=jQuery.timer.timeParse(h);if(!(typeof h!=="number"||isNaN(h)||h<=0)){if(j&&j.constructor!==Number){n=!!j;j=0}j=j||0;n=n||false;if(!d.$timers)d.$timers={};d.$timers[i]||(d.$timers[i]=
{});e.$timerID=e.$timerID||this.guid++;var m=function(){if(!(n&&m.inProgress)){m.inProgress=true;if(++u>j&&j!==0||e.call(d,u)===false)jQuery.timer.remove(d,i,e);m.inProgress=false}};m.$timerID=e.$timerID;d.$timers[i][e.$timerID]||(d.$timers[i][e.$timerID]=window.setInterval(m,h));this.global[i]||(this.global[i]=[]);this.global[i].push(d)}},remove:function(d,h,i){var e=d.$timers,j;if(e){if(h){if(e[h]){if(i){if(i.$timerID){window.clearInterval(e[h][i.$timerID]);delete e[h][i.$timerID]}}else for(var n in e[h])if(e[h].hasOwnProperty(n)){window.clearInterval(e[h][n]);
delete e[h][n]}for(j in e[h])if(e[h].hasOwnProperty(j))break;if(!j){j=null;delete e[h]}}}else for(var u in e)e.hasOwnProperty(u)&&this.remove(d,u,i);for(j in e)if(e.hasOwnProperty(j))break;if(!j)d.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",function(){var d=jQuery.timer.global,h;for(h in d)if(d.hasOwnProperty(h))for(var i=d[h],e=i.length;--e;)jQuery.timer.remove(i[e],h)});(function(d){if(String.prototype.split.toString().match(/\[native/)){var h=
String.prototype.split,i=/()??/.exec("")[1]===d,e;e=function(j,n,u){if(Object.prototype.toString.call(n)!=="[object RegExp]")return h.call(j,n,u);var m=[],C=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":""),z=0,D,y,A;n=RegExp(n.source,C+"g");j+="";i||(D=RegExp("^"+n.source+"$(?!\\s)",C));for(u=u===d?4294967295:u>>>0;y=n.exec(j);){C=y.index+y[0].length;if(C>z){m.push(j.slice(z,y.index));!i&&y.length>1&&y[0].replace(D,function(){for(var J=1;J<arguments.length-2;J++)if(arguments[J]===
d)y[J]=d});y.length>1&&y.index<j.length&&Array.prototype.push.apply(m,y.slice(1));A=y[0].length;z=C;if(m.length>=u)break}n.lastIndex===y.index&&n.lastIndex++}if(z===j.length){if(A||!n.test(""))m.push("")}else m.push(j.slice(z));return m.length>u?m.slice(0,u):m};String.prototype.split=function(j,n){return e(this,j,n)};return e}})();g.json_stringify=function(d,h){var i="",e;h=h===I?1:h;switch(typeof d){case "function":i+=d;break;case "boolean":i+=d?"true":"false";break;case "object":if(d===null)i+=
"null";else if(d instanceof Array){i+="[";var j=d.length;for(e=0;e<j-1;++e)i+=g.json_stringify(d[e],h+1);i+=g.json_stringify(d[j-1],h+1)+"]"}else{i+="{";for(j in d)if(d.hasOwnProperty(j))i+='"'+j+'":'+g.json_stringify(d[j],h+1);i+="}"}break;case "string":j=d;var n={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(e in n)if(n.hasOwnProperty(e))j=j.replace(RegExp(e,"g"),n[e]);i+='"'+j+'"';break;case "number":i+=String(d)}i+=h>1?",":"";if(h===1)i=i.replace(/,([\]}])/g,"$1");
return i.replace(/([\[{]),/g,"$1")};g.fn.cmd=function(d){function h(){K.toggleClass("inverted")}function i(){w="(reverse-i-search)`"+A+"': ";R()}function e(a){var q=G.data(),P=q.length;if(a&&J>0)P-=J;if(A.length>0)for(var M=A.length;M>0;M--){a=RegExp("^"+A.substring(0,M));for(var S=P;S--;)if(a.test(q[S])){J=q.length-S;o=0;m.set(q[S],true);H();if(A.length!==M){A=A.substring(0,M);i()}return}}}function j(a){var q=a.substring(0,z-D);a=a.substring(z-D);return[q].concat(Y(a,z))}function n(){C.focus();m.oneTime(1,
function(){m.insert(C.val());C.blur().val("")})}function u(a){if(d.keydown){var q=d.keydown(a);if(q!==I)return q}if(N){if(y&&(a.which===35||a.which===36||a.which===37||a.which===38||a.which===39||a.which===40||a.which===13||a.which===27)){w=O;y=false;J=null;A="";R();if(a.which===27)p="";H();u.call(this,a)}else if(a.altKey){if(a.which===68){m.set(p.slice(0,o)+p.slice(o).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(a.keyCode===13){if(G&&p&&(d.historyFilter&&d.historyFilter(p)||
!d.historyFilter))G.append(p);a=p;G.reset();m.set("");d.commands&&d.commands(a);typeof w==="function"&&R()}else if(a.which===32)if(y){A+=" ";i()}else m.insert(" ");else if(a.which===8)if(y){A=A.slice(0,-1);i()}else{if(p!==""&&o>0){p=p.slice(0,o-1)+p.slice(o,p.length);--o;H()}}else if(a.which===9&&!(a.ctrlKey||a.altKey))m.insert("\t");else if(a.which===46){if(p!==""&&o<p.length){p=p.slice(0,o)+p.slice(o+1,p.length);H()}return true}else if(G&&a.which===38||a.which===80&&a.ctrlKey){if(G.end())T=p;m.set(G.previous())}else if(G&&
a.which===40||a.which===78&&a.ctrlKey)m.set(G.end()?T:G.next());else if(a.which===37||a.which===66&&a.ctrlKey)if(a.ctrlKey&&a.which!==66){q=o-1;a=0;for(p[q]===" "&&--q;q>0;--q)if(p[q]===" "&&p[q+1]!==" "){a=q+1;break}else if(p[q]==="\n"&&p[q+1]!=="\n"){a=q;break}m.position(a)}else{if(o>0){--o;H()}}else if(a.which===82&&a.ctrlKey)if(y)e(true);else{O=w;i();T=p;p="";H();y=true}else if(a.which==71&&a.ctrlKey){if(y){w=O;R();p=T;H();y=false}}else if(a.which===39||a.which===70&&a.ctrlKey)if(a.ctrlKey&&a.which!==
70){p[o]===" "&&++o;a=p.slice(o).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!a||a[0].match(/^\s+$/))o=p.length;else if(a[0][0]!==" ")o+=a.index+1;else{o+=a.index+a[0].length-1;a[0][a[0].length-1]!==" "&&--o}H()}else{if(o<p.length){++o;H()}}else if(a.which===123)return true;else if(a.which===36)m.position(0);else if(a.which===35)m.position(p.length);else if(a.shiftKey&&a.which==45){n();return true}else if(a.ctrlKey||a.metaKey)if(a.shiftKey){if(a.which===84)return true}else if(a.which===87){if(p!==""){a=p.slice(0,
o);q=p.slice(o+1);var P=a.match(/([^ ]+ *$)/);o=a.length-P[0].length;p=a.slice(0,o)+q;H()}}else if(a.which===72){if(p!==""&&o>0){p=p.slice(0,--o);if(o<p.length-1)p+=p.slice(o);H()}}else if(a.which===65)m.position(0);else if(a.which===69)m.position(p.length);else if(a.which===88||a.which===67||a.which===84)return true;else if(a.which===86){n();return true}else if(a.which===75)if(o===0)m.set("");else o!==p.length&&m.set(p.slice(0,o));else{if(a.which===85){m.set(p.slice(o,p.length));m.position(0)}}else return true;
return false}}var m=this;m.addClass("cmd");m.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var C=g("<textarea/>").addClass("clipboard").appendTo(m);d.width&&m.width(d.width);var z,D,y=false,A="",J=null,O,F=d.mask||false,p="",o=0,w,N=d.enabled,W=d.historySize||60,c,G,K=m.find(".cursor"),H=function(a){function q(v,x){if(x===v.length){Q.html(g.terminal.encode(v));K.html("&nbsp;");U.html("")}else if(x===0){Q.html("");K.html(g.terminal.encode(v.slice(0,
1)));U.html(g.terminal.encode(v.slice(1)))}else{var r=g.terminal.encode(v.slice(0,x));Q.html(r);r=v.slice(x,x+1);K.html(r===" "?"&nbsp;":g.terminal.encode(r));x===v.length-1?U.html(""):U.html(g.terminal.encode(v.slice(x+1)))}}function P(v){return"<div>"+g.terminal.encode(v)+"</div>"}function M(v){var x=U;g.each(v,function(r,l){x=g(P(l)).insertAfter(x).addClass("clear")})}function S(v){g.each(v,function(x,r){Q.before(P(r))})}var Q=K.prev(),U=K.next();return function(){var v=F?p.replace(/./g,"*"):p,
x,r;a.find("div").remove();Q.html("");if(v.length>z-D-1||v.match(/\n/)){var l,b=v.match(/\t/g),f=b?b.length*3:0;if(b)v=v.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(v.match(/\n/)){var k=v.split("\n");r=z-D-1;for(x=0;x<k.length-1;++x)k[x]+=" ";if(k[0].length>r){l=[k[0].substring(0,r)];l=l.concat(Y(k[0].substring(r),z))}else l=[k[0]];for(x=1;x<k.length;++x)if(k[x].length>z)l=l.concat(Y(k[x],z));else l.push(k[x])}else l=j(v);if(b)l=g.map(l,function(s){return s.replace(/\x00\x00\x00\x00/g,"\t")});r=
l[0].length;if(o<r){q(l[0],o);M(l.slice(1))}else if(o===r){Q.before(P(l[0]));q(l[1],0);M(l.slice(2))}else{x=l.length;if(o<r){q(l[0],o);M(l.slice(1))}else if(o===r){Q.before(P(l[0]));q(l[1],0);M(l.slice(2))}else{b=l.slice(-1)[0];k=v.length-o;var t=b.length;v=0;if(k<=t){S(l.slice(0,-1));q(b,(t===k?0:t-k)+f)}else if(x===3){Q.before("<div>"+g.terminal.encode(l[0])+"</div>");q(l[1],o-r-1);U.after('<div class="clear">'+g.terminal.encode(l[2])+"</div>")}else{v=o;for(x=0;x<l.length;++x){r=l[x].length;if(v>
r)v-=r;else break}r=l[x];f=x;if(v===r.length){v=0;r=l[++f]}q(r,v);S(l.slice(0,f));M(l.slice(f+1))}}}}else if(v===""){Q.html("");K.html("&nbsp;");U.html("")}else q(v,o)}}(m),T,R=function(){var a=m.find(".prompt");return function(){if(typeof w==="string"){D=ca(w);a.html(g.terminal.format(w))}else w(function(q){D=ca(q);a.html(g.terminal.format(q))})}}();g.extend(m,{name:function(a){if(a!==I){c=a;G=new ka(a,W)}else return c},history:function(){return G},set:function(a,q){if(a!==I){p=a;if(!q)o=p.length;
H();if(typeof d.onCommandChange==="function")d.onCommandChange(p)}},insert:function(a,q){if(o===p.length)p+=a;else p=o===0?a+p:p.slice(0,o)+a+p.slice(o);q||(o+=a.length);H();if(typeof d.onCommandChange==="function")d.onCommandChange(p)},get:function(){return p},commands:function(a){if(a)d.commands=a;else return a},destroy:function(){g(document.documentElement).unbind(".commandline");m.find(".prompt").remove()},prompt:function(a){if(a===I)return w;else{if(typeof a==="string"||typeof a==="function")w=
a;else throw"prompt must be a function or string";R();H()}},position:function(a){if(typeof a==="number"){o=a<0?0:a>p.length?p.length:a;H()}else return o},visible:function(){var a=m.visible;return function(){a.apply(m,[]);H();R()}}(),show:function(){var a=m.show;return function(){a.apply(m,[]);H();R()}}(),resize:function(a){if(a)z=a;else{a=m.width();var q=K.innerWidth();z=Math.floor(a/q)}H()},enable:function(){if(!N){K.addClass("inverted");m.everyTime(500,"blink",h);N=true}},isenabled:function(){return N},
disable:function(){if(N){m.stopTime("blink",h);K.removeClass("inverted");N=false}},mask:function(a){if(typeof a==="boolean"){F=a;H()}else return F}});m.name(d.name||"");w=d.prompt||"> ";R();if(d.enabled===I||d.enabled===true)m.enable();g(document.documentElement||window).keypress(function(a){var q;if(a.ctrlKey&&a.which===99)return true;if(!y&&d.keypress)q=d.keypress(a);if(q===I||q){if(N)if(g.inArray(a.which,[38,32,13,0,8])>-1&&a.keyCode!==123&&!(a.which===38&&a.shiftKey))return false;else if(!a.ctrlKey&&
!(a.altKey&&a.which===100)){if(y){A+=String.fromCharCode(a.which);e();i()}else m.insert(String.fromCharCode(a.which));return false}else if(a.altKey)if(y){A+=String.fromCharCode(a.which);e();i()}else m.insert(String.fromCharCode(a.which))}else return q}).keydown(u);return m};var la=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,Z=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;Z=/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
var da=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ma=/https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,na=/((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;g.terminal={split_equal:function(d,h){for(var i=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,e=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,n=false,u=false,m="",C=[],z=d.replace(i,function(N,
W,c){N=W.match(/;/g).length;return"[["+W+(N==2?";;":N==3?";":"")+c.replace(/\\\]/g,"&#93;").replace(/\n/g,"\\n")+"]"+c+"]"}).split(/\n/g),D=0,y=z.length;D<y;++D)if(z[D]==="")C.push("");else for(var A=z[D],J=0,O=0,F=0,p=A.length;F<p;++F){if(A[F]==="["&&A[F+1]==="[")n=true;else if(n&&A[F]==="]")if(u)u=n=false;else u=true;else if(n&&u||!n)if(A[F]==="&"){var o=A.substring(F).match(/^(&[^;]+;)/);if(!o)throw"Unclosed html entity at char "+F;F+=o[0].length-1;++O;continue}else if(A[F]==="]"&&A[F-1]==="\\")--O;
else++O;if(O===h||F===p-1){o=A.substring(J,F+1);if(m){o=m+o;if(o.match("]"))m=""}J=F+1;O=0;var w=o.match(i);if(w){w=w[w.length-1];if(w[w.length-1]!=="]"){m=w.match(e)[1];o+="]"}else if(o.match(j)){o=o.replace(j,"");m=w.match(e)[1]}}C.push(o)}}return C},encode:function(d){return d.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(d){if(typeof d==="string"){d=
g.terminal.encode(g.terminal.from_ansi(d));var h=d.split(la);if(h&&h.length>1)d=g.map(h,function(i){return i===""?i:i.substring(0,1)==="["?i.replace(Z,function(e,j,n,u,m,C,z){if(z==="")return"<span>&nbsp;</span>";z=z.replace(/\\]/g,"]");e="";if(j.indexOf("b")!==-1)e+="font-weight:bold;";var D="text-decoration:";if(j.indexOf("u")!==-1)D+="underline ";if(j.indexOf("s")!==-1)D+="line-through";if(j.indexOf("s")!==-1||j.indexOf("u")!==-1)e+=D+";";if(j.indexOf("i")!==-1)e+="font-style:italic;";if(n.match(da)){e+=
"color:"+n+";";if(j.indexOf("g")!==-1)e+="text-shadow: 0 0 5px "+n+";"}if(u.match(da))e+="background-color:"+u;return'<span style="'+e+'"'+(m!==""?' class="'+m+'"':"")+' data-text="'+(C===""?z:C.replace(/&#93;/g,"]")).replace('"',"&quote;")+'">'+z+"</span>"}):"<span>"+i+"</span>"}).join("");return g.map(d.split(/(<\/?span[^>]*>)/g),function(i){return i.match(/span/)?i:i.replace(ma,function(e){var j=e.match(/\.$/);e=e.replace(/\.$/,"");return'<a target="_blank" href="'+e+'">'+e+"</a>"+(j?".":"")}).replace(na,
'<a href="mailto:$1">$1</a>')}).join("").replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(d){return d.replace(Z,"$6")},active:function(){return V.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function d(e){var j=e.split(";"),
n;e=[];var u="",m="",C;for(C in j){n=parseInt(j[C],10);n===1&&e.push("b");n===4&&e.push("u");if(i[n])m=i[n];if(h[n])u=h[n]}n=j=g.terminal.ansi_colors.normal;for(C=e.length;C--;)if(e[C]=="b"){if(u=="")u="white";n=g.terminal.ansi_colors.bold;break}return"[["+[e.join(""),n[u],j[m]].join(";")+"]"}var h={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},i={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(e){var j=
e.split(/(\[[0-9;]*m)/g);if(j.length==1)return e;e=[];if(j.length>3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var n=false,u=0;u<j.length;++u){var m=j[u].match(/^\[([0-9;]*)m$/);if(m){if(m[1]!="")if(n){e.push("]");if(m[1]=="0")n=false;else e.push(d(m[1]))}else{n=true;e.push(d(m[1]))}}else e.push(j[u])}n&&e.push("]");return e.join("")}}()};g.fn.visible=function(){return this.css("visibility","visible")};g.fn.hidden=function(){return this.css("visibility","hidden")};g.jrpc=function(d,h,i,e,j,n){h=
g.json_stringify({jsonrpc:"2.0",method:i,params:e,id:h});return g.ajax({url:d,data:h,success:j,error:n,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};X=/ {13}$/;var oa=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __",
"     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(X,"")+"version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __",
"     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(X,"")+"version 0.5.4","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],$=[],V=new function(d){var h=
d?[d]:[],i=0;g.extend(this,{rotate:function(){if(h.length===1)return h[0];else{if(i===h.length-1)i=0;else++i;return h[i]}},length:function(){return h.length},set:function(e){for(var j=h.length;j--;)if(h[j]===e){i=j;return}this.append(e)},front:function(){return h[i]},append:function(e){h.push(e)}})};g.fn.terminal=function(d,h){function i(){return c.get(0).scrollHeight>c.innerHeight()}function e(){var b=c.find(".cursor").width(),f=Math.floor(c.width()/b);if(i()){var k=c.innerWidth()-c.width();f-=Math.ceil((20-
k/2)/(b-1))}return f}function j(b,f){if(a.displayExceptions){c.error("&#91;"+f+"&#93;: "+(typeof b==="string"?b:typeof b.fileName==="string"?b.fileName+": "+b.message:b.message));if(typeof b.fileName==="string"){c.pause();g.get(b.fileName,function(k){c.resume();var t=b.lineNumber-1;(k=k.split("\n")[t])&&c.error("&#91;"+b.lineNumber+"&#93;: "+k)})}b.stack&&c.error(b.stack)}}function n(){var b=w.prop?w.prop("scrollHeight"):w.attr("scrollHeight");w.scrollTop(b)}function u(b,f){try{if(typeof f==="function")f(function(){});
else if(typeof f!=="string")throw b+" must be string or function";}catch(k){j(k,b.toUpperCase());return false}return true}function m(b){b=typeof b==="string"?b:String(b);var f,k;if(b.length>T){var t=g.terminal.split_equal(b,T);b=g("<div></div>");f=0;for(k=t.length;f<k;++f)t[f]===""||t[f]==="\r"?b.append("<div>&nbsp;</div>"):g("<div/>").html(g.terminal.format(t[f])).appendTo(b)}else b=g("<div/>").html("<div>"+g.terminal.format(b)+"</div>");K.append(b);b.width("100%");n();return b}function C(){if(h.greetings===
I)c.echo(c.signature);else h.greetings&&c.echo(h.greetings)}function z(b,f){var k=1,t=function(s,E){f.pause();g.jrpc(b,k++,s,E,function(B){if(B.error)f.error("&#91;RPC&#93; "+B.error.message);else if(typeof B.result==="string")f.echo(B.result);else if(B.result instanceof Array)f.echo(g.map(B.result,function(L){return g.json_stringify(L)}).join(" "));else typeof B.result==="object"&&f.echo(g.json_stringify(B.result));f.resume()},function(B,L){L!=="abort"&&f.error("&#91;AJAX&#93; "+L+" - Server reponse is: \n"+
B.responseText);f.resume()})};return function(s,E){if(s!==""){var B,L;if(s.match(/[^ ]* /)){s=s.split(/ +/);B=s[0];L=s.slice(1)}else{B=s;L=[]}if(!a.login||B==="help")t(B,L);else{var aa=E.token();aa?t(B,[aa].concat(L)):E.error("&#91;AUTH&#93; Access denied (no token)")}}}}function D(b){b=b.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var f=l.prompt();if(l.mask())b=b.replace(/./g,"*");typeof f==="function"?f(function(k){c.echo(k+b)}):c.echo(f+b)}function y(b,f){try{N=b;var k=r.top();if(b==="exit"&&
a.exit)if(r.size()===1)if(a.login)J();else{f||D(b);c.echo("You can't exit from main interpeter")}else c.pop("exit");else{f||D(b);b==="clear"&&a.clear?c.clear():k.eval(b,c)}}catch(t){j(t,"USER");c.resume();throw t;}}function A(){var b=null;l.prompt("login: ");a.history&&l.history().disable();l.commands(function(f){try{D(f);if(b){l.mask(false);c.pause();if(typeof a.login!=="function")throw"Value of login property must be a function";a.login(b,f,function(t){if(t){var s=a.name;s=s?"_"+s:"";g.Storage.set("token"+
s,t);g.Storage.set("login"+s,b);l.commands(y);F()}else{c.error("Wrong password try again");l.prompt("login: ");b=null}c.resume();a.history&&l.history().enable()},c)}else{b=f;l.prompt("password: ");l.mask(true)}}catch(k){j(k,"LOGIN",c);throw k;}})}function J(){if(typeof a.onBeforelogout==="function")try{if(a.onBeforelogout(c)==false)return}catch(b){j(b,"onBeforelogout");throw b;}var f=a.name;f=f?"_"+f:"";g.Storage.remove("token"+f,null);g.Storage.remove("login"+f,null);a.history&&l.history().disable();
A();if(typeof a.onAfterlogout==="function")try{a.onAfterlogout(c)}catch(k){j(k,"onAfterlogout");throw k;}}function O(){var b=r.top(),f="";if(b.name!==I&&b.name!=="")f+=b.name+"_";f+=H;l.name(f);typeof b.prompt=="function"?l.prompt(function(k){b.prompt(k,c)}):l.prompt(b.prompt);a.history&&l.history().enable();l.set("");if(typeof b.onStart==="function")b.onStart(c)}function F(){O();C();if(typeof a.onInit==="function")try{a.onInit(c)}catch(b){j(b,"OnInit");throw b;}}function p(b){var f=r.top();if(g.type(f.keydown)===
"function"){f=f.keydown(b,c);if(f!==I)return f}var k;c.oneTime(10,function(){Q()});if(g.type(a.keydown)==="function"){f=a.keydown(b,c);if(f!==I)return f}if(c.paused()){if(b.which===68&&b.ctrlKey){for(k=$.length;k--;){b=$[k];if(4!==b.readyState)try{b.abort()}catch(t){c.error("error in aborting ajax")}}c.resume();return false}}else{if(b.which!==9)W=0;if(b.which===68&&b.ctrlKey){if(l.get()==="")if(r.size()>1||a.login!==I)c.pop("");else{c.resume();c.echo("")}else c.set_command("");return false}else if(a.tabcompletion&&
b.which===9){++W;var s=l.get().substring(0,l.position());b=s.split(" ");if(b.length==1)f=b[0];else{f=b[b.length-1];for(k=b.length-1;k>0;k--)if(b[k-1][b[k-1].length-1]=="\\")f=b[k-1]+" "+f;else break}var E=RegExp("^"+f);r.top().completion(c,f,function(B){var L=[];for(k=B.length;k--;)E.test(B[k])&&L.push(B[k]);if(L.length===1)c.insert(L[0].replace(E,""));else if(L.length>1)if(W>=2){D(s);c.echo(L.join("\t"));W=0}});return false}else if(b.which===86&&b.ctrlKey)c.oneTime(1,function(){n()});else if(b.which===
9&&b.ctrlKey){V.length()>1&&c.focus(false);return false}else if(b.which===34)c.scroll(c.height());else b.which===33?c.scroll(-c.height()):c.attr({scrollTop:c.attr("scrollHeight")})}}function o(b){return function(f){if(f!==""){f=f.split(/ +/);var k=f[0];f=f.slice(1);var t=b[k],s=g.type(t);if(s==="function")t.apply(c,f);else if(s==="object"||s==="string"){var E=[];if(s==="object"){for(var B in t)t.hasOwnProperty(B)&&E.push(B);t=o(t)}c.push(t,{prompt:k+"> ",name:k,completion:function(L,aa,pa){pa(E)}})}else c.error("Command '"+
k+"' Not Found")}}}var w,N,W=0,c=this;if(this.length>1)return this.each(function(){g.fn.terminal.call(g(this),d,g.extend({name:c.selector},h))});else{var G=[],K,H=V.length(),T,R=[],a=g.extend({name:c.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,historyFilter:null,onInit:g.noop,onClear:g.noop,onBlur:g.noop,onFocus:g.noop,onTerminalChange:g.noop,onExit:g.noop,keypress:g.noop,keydown:g.noop},
h||{});a.width&&c.width(a.width);a.height&&c.height(a.height);w=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&c[0].tagName.toLowerCase()=="body"?g("html"):c;var q=!a.enabled;if(c.length===0)throw'Sorry, but terminal said that "'+c.selector+'" is not valid selector!';c.ajaxSend(function(b,f){$.push(f)});if(c.data("terminal"))return c.data("terminal");K=g("<div>").addClass("terminal-output").appendTo(c);c.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&
document instanceof DocumentTouch){c.click(function(){c.find("textarea").focus()});c.find("textarea").focus()}var P,M,S=[];g.extend(c,g.omap({clear:function(){K.html("");l.set("");G=[];try{a.onClear(c)}catch(b){j(b,"onClear");throw b;}c.attr({scrollTop:0});return c},export_view:function(){return{prompt:c.get_prompt(),command:c.get_command(),position:l.position(),lines:G.slice(0)}},import_view:function(b){c.set_prompt(b.prompt);c.set_command(b.command);l.position(b.position);G=b.lines;c.resize();return c},
exec:function(b,f){q?S.push([b,f]):y(b,f);return c},commands:function(){return r.top().eval},greetings:function(){C();return c},paused:function(){return q},pause:function(){if(l){q=true;c.disable();l.hidden()}return c},resume:function(){if(l){c.enable();var b=S;for(S=[];b.length;){var f=b.shift();c.exec.apply(c,f)}l.visible();n()}return c},cols:function(){return T},rows:function(){return G.length},history:function(){return l.history()},next:function(){if(V.length()===1)return c;else{var b=c.offset().top;
c.height();c.scrollTop();var f=c,k=g(window).scrollTop(),t=k+g(window).height(),s=g(f).offset().top;if(s+g(f).height()>=k&&s<=t){V.front().disable();b=V.rotate().enable();f=b.offset().top-50;g("html,body").animate({scrollTop:f},500);try{a.onTerminalChange(b)}catch(E){j(E,"onTerminalChange");throw E;}return b}else{c.enable();g("html,body").animate({scrollTop:b-50},500);return c}}},focus:function(b,f){c.oneTime(1,function(){if(V.length()===1)if(b===false)try{!f&&a.onBlur(c)!==false&&c.disable()}catch(k){j(k,
"onBlur");throw k;}else try{!f&&a.onFocus(c)!==false&&c.enable()}catch(t){j(t,"onFocus");throw t;}else if(b===false)c.next();else{var s=V.front();if(s!=c){s.disable();if(!f)try{a.onTerminalChange(c)}catch(E){j(E,"onTerminalChange");throw E;}}V.set(c);c.enable()}});return c},enable:function(){T===I&&c.resize();if(q)if(l){l.enable();q=false}return c},disable:function(){if(l){q=true;l.disable()}return c},enabled:function(){return q},signature:function(){var b=c.cols();b=b<15?null:b<35?0:b<55?1:b<64?
2:b<75?3:4;return b!==null?oa[b].join("\n")+"\n":""},version:function(){return"0.5.4"},get_command:function(){return l.get()},insert:function(b){if(typeof b==="string"){l.insert(b);return c}else throw"insert function argument is not a string";},set_prompt:function(b){if(u("prompt",b)){typeof b=="function"?l.prompt(function(f){b(f,c)}):l.prompt(b);r.top().prompt=b}return c},get_prompt:function(){return r.top().prompt},set_command:function(b){l.set(b);return c},set_mask:function(b){l.mask(b);return c},
get_output:function(b){return b?G:g.map(G,function(f,k){return typeof k=="function"?k():k}).join("\n")},resize:function(b,f){if(b&&f){c.width(b);c.height(f)}T=e();l.resize(T);var k=K.detach();K.html("");g.each(G,function(t,s){m(s&&typeof s=="function"?s():s)});c.prepend(k);n();if(g.type(a.onResize)==="function")a.onResize(c);return c},echo:function(b){G.push(b);m(g.type(b)==="function"?b():b);Q();return c},error:function(b){return c.echo("[[;#f00;]"+b.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+
"]")},scroll:function(b){var f;b=Math.round(b);if(w.prop){b>w.prop("scrollTop")&&b>0&&w.prop("scrollTop",0);f=w.prop("scrollTop")}else{b>w.attr("scrollTop")&&b>0&&w.attr("scrollTop",0);f=w.attr("scrollTop")}w.scrollTop(f+b);return c},logout:a.login?function(){for(;r.size()>1;)r.pop();J();return c}:function(){throw"You don't have login function";},token:a.login?function(){var b=a.name;return g.Storage.get("token"+(b?"_"+b:""))}:g.noop,login_name:a.login?function(){var b=a.name;return g.Storage.get("login"+
(b?"_"+b:""))}:g.noop,name:function(){return r.top().name},push:function(b,f){if(f&&(!f.prompt||u("prompt",f.prompt))||!f){f=f||{};f.name=f.name||N;r.top().mask=l.mask();if(g.type(b)==="string")b=z(b,c);else if(g.type(b)==="object"){var k=[],t;for(t in b)k.push(t);b=o(b);f=f||{};f.completion=function(s,E,B){B(k)}}else if(g.type(b)!="function")throw"Invalid value as eval in push command";r.push(g.extend({eval:b},f));O()}return c},pop:function(b){b!==I&&D(b);if(r.top().name===a.name){if(a.login){J();
if(g.type(a.onExit)==="function")try{a.onExit(c)}catch(f){j(f,"onExit");throw f;}}}else{b=r.pop();O();if(g.type(b.onExit)==="function")try{b.onExit(c)}catch(k){j(k,"onExit");throw k;}c.set_mask(r.top().mask)}return c},level:function(){return r.size()},reset:function(){for(c.clear();r.size()>1;)r.pop();F()}},function(b,f){return function(){try{return f.apply(this,Array.prototype.slice.apply(arguments))}catch(k){b!=="exec"&&j(k,"TERMINAL");throw k;}}}));var Q=function(){var b=i();return function(){if(b!==
i()){c.resize();b=i()}}}(),U;if(a.login&&g.type(a.onBeforeLogin)==="function")try{a.onBeforeLogin(c)}catch(v){j(v,"onBeforeLogin");throw v;}if(g.type(d)==="string"){U=d;d=z(d,c)}else if(g.type(d)==="array")throw"You can't use array as eval";else if(g.type(d)==="object"){for(var x in d)d.hasOwnProperty(x)&&R.push(x);d=o(d)}else if(g.type(d)!=="function")throw'Unknow object "'+String(d)+'" passed as eval';if(U&&(g.type(a.login)==="string"||a.login))a.login=function(b){var f=1;return function(k,t,s){c.pause();
g.jrpc(U,f++,b,[k,t],function(E){c.resume();!E.error&&E.result?s(E.result):s(null)},function(E,B){c.resume();c.error("&#91;AJAX&#92; Response: "+B+"\n"+E.responseText)})}}(g.type(a.login)==="boolean"?"login":a.login);if(u("prompt",a.prompt)){var r=new ja({name:a.name,eval:d,prompt:a.prompt,completion:a.completion?a.completion:function(b,f,k){k(R)},greetings:a.greetings}),l=c.find(".terminal-output").next().cmd({prompt:a.prompt,history:a.history,historyFilter:a.historyFilter,historySize:a.historySize,
width:"100%",keydown:p,keypress:a.keypress?function(b){return a.keypress(b,c)}:null,onCommandChange:function(b){if(g.type(a.onCommandChange)==="function")try{a.onCommandChange(b,c)}catch(f){j(f,"onCommandChange");throw f;}n()},commands:y});V.append(c);a.enabled===true?c.focus(I,true):c.disable();g(document).click(function(b){!g(b.target).parents().hasClass("terminal")&&a.onBlur(c)!==false&&c.disable()});g(window).resize(function(){var b=c.width(),f=c.height();if(M!==f||P!==b){M=f;P=b;c.resize()}});
c.click(function(){c.focus()});h.login&&c.token&&!c.token()&&c.login_name&&!c.login_name()?A():F();g.type(g.fn.init.prototype.mousewheel)==="function"&&c.mousewheel(function(b,f){f>0?c.scroll(-40):c.scroll(40);return false},true)}c.data("terminal",c);return c}}})(jQuery);
