(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{21:function(e,t,n){},27:function(e,t,n){e.exports=n(73)},32:function(e,t,n){},33:function(e,t,n){},63:function(e,t,n){var a={"./img_1.jpg":64,"./img_2.jpg":65,"./img_3.jpg":66,"./img_4.jpg":67,"./img_5.jpg":68,"./img_6.jpg":69};function r(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=i,e.exports=r,r.id=63},64:function(e,t,n){e.exports=n.p+"media/img_1.d9d83728.jpg"},65:function(e,t,n){e.exports=n.p+"media/img_2.981d091e.jpg"},66:function(e,t,n){e.exports=n.p+"media/img_3.0893d01e.jpg"},67:function(e,t,n){e.exports=n.p+"media/img_4.e004cf82.jpg"},68:function(e,t,n){e.exports=n.p+"media/img_5.d0aa4038.jpg"},69:function(e,t,n){e.exports=n.p+"media/img_6.33feaf22.jpg"},73:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),l=n.n(i),c=(n(32),n(33),n(24)),o=n(7),s=n(9),m=n(10),u=n(12),d=n(11),g=n(23),p=n.n(g),f=(n(62),n(21),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(s.a)(this,a),t.call(this,e)}return Object(m.a)(a,[{key:"render",value:function(){this.props.info.title,this.props.info.type;var e=this.props.info.img;return r.a.createElement("div",{class:"item cultural col-sm-6 col-md-4 col-lg-4 mb-4"},r.a.createElement("a",{href:"event_page.html",class:"item-wrap fancybox"},r.a.createElement("div",{class:"event-info"},r.a.createElement("h3",null,"title"),r.a.createElement("span",null,"type ",r.a.createElement("br",null)," Thursday 04/24 ",r.a.createElement("br",null)," 2:00-4:00 PM")),r.a.createElement("img",{class:"img-fluid",src:n(63)("./"+e+".jpg")})))}}]),a}(a.Component)),h=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(s.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={currentIndex:0,itemsInSlide:1,responsive:{0:{items:3}},galleryItems:e.galleryItems()},e.slidePrevPage=function(){var t=e.state.currentIndex-e.state.itemsInSlide;e.setState({currentIndex:t})},e.slideNextPage=function(){var t=e.state,n=t.itemsInSlide,a=t.galleryItems.length,r=e.state.currentIndex+n;r>a&&(r=a),e.setState({currentIndex:r})},e.handleOnSlideChange=function(t){var n=t.itemsInSlide,a=t.item;e.setState({itemsInSlide:n,currentIndex:a})},e}return Object(m.a)(n,[{key:"galleryItems",value:function(){return Array(6).fill().map((function(e,t){return r.a.createElement(f,{info:{title:"Event name",type:"Academic",img:"img_"+(t+1)}})}))}},{key:"render",value:function(){var e=this.state,t=e.currentIndex,n=e.galleryItems,a=e.responsive;return r.a.createElement("div",{class:"Row"},r.a.createElement("div",{class:"Column_side"},r.a.createElement("button",{class:"button",onClick:this.slidePrevPage},r.a.createElement("i",{class:"i arrow left"}))),r.a.createElement("div",{class:"Column_center"},r.a.createElement(p.a,{items:n,slideToIndex:t,responsive:a,buttonsDisabled:!1,onInitialized:this.handleOnSlideChange,onSlideChanged:this.handleOnSlideChange,onResized:this.handleOnSlideChange})),r.a.createElement("div",{class:"Column_side"},r.a.createElement("button",{class:"button",onClick:this.slideNextPage},r.a.createElement("i",{class:"i arrow right"}))))}}]),n}(a.Component);var v=function(){return r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(o.a,{exact:!0,path:"/",render:function(){return r.a.createElement(h,null)}}),r.a.createElement(o.a,{exact:!0,path:"/login",render:function(){return r.a.createElement("div",null,"Hello Again")}}),r.a.createElement(o.a,{exact:!0,path:"/allevents",render:function(){return r.a.createElement("div",null,"Hello hello hello")}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.7179ab28.chunk.js.map