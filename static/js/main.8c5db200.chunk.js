(this["webpackJsonpstatus-pwa"]=this["webpackJsonpstatus-pwa"]||[]).push([[0],{125:function(e,n,t){e.exports=t(251)},130:function(e,n,t){},132:function(e,n,t){e.exports=t.p+"static/media/logo.03e67ea3.png"},251:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),a=t(23),c=t.n(a),i=(t(130),t(67)),l=t.n(i),s=t(102),u=t(116),d=t(257),f=t(259),p=t(258),h=t(115),v={bakerloo:{color:"996633"},central:{color:"CC3333"},circle:{color:"FFCC00"},district:{color:"006633"},dlr:{color:"009999"},"hammersmith-city":{color:"CC9999"},jubilee:{color:"868F98"},"london-overground":{color:"EE7C0E"},metropolitan:{color:"9B0056"},northern:{color:"000000"},piccadilly:{color:"003688"},victoria:{color:"0098D4"},"waterloo-city":{color:"95CDBA"},"tfl-rail":{color:"white"}},w=(t(132),function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],c=function(){var e=Object(s.a)(l.a.mark((function e(){var n,t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status");case 2:return n=e.sent,e.next=5,n.json();case 5:t=e.sent,a(t);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(o.useEffect)((function(){c()}),[]),r.a.createElement(d.a,null,t.map((function(e){return r.a.createElement(f.a,{key:e.id,padded:"very"},r.a.createElement(p.a.Group,null,r.a.createElement(o.Fragment,null,r.a.createElement(p.a,null,r.a.createElement(p.a.Content,null,r.a.createElement(p.a.Header,null,e.name),e.lineStatuses.map((function(e){return r.a.createElement(p.a.Description,{key:e.id},e.statusSeverityDescription)})),r.a.createElement(h.a,{style:{backgroundColor:"#".concat(v[e.id].color)}}))))))})))}),g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function m(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}t(250);c.a.render(r.a.createElement(w,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/status-pwa",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/status-pwa","/sw.js");g?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):m(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):m(n,e)}))}}()}},[[125,1,2]]]);
//# sourceMappingURL=main.8c5db200.chunk.js.map