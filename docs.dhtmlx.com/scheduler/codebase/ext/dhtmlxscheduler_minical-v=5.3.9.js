/*

@license
dhtmlxScheduler v.5.3.9 Professional

This software can be used only as part of dhtmlx.com site.
You are not allowed to use it on any other site

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.templates.calendar_month=e.date.date_to_str("%F %Y"),e.templates.calendar_scale_date=e.date.date_to_str("%D"),e.templates.calendar_date=e.date.date_to_str("%d"),e.config.minicalendar={mark_events:!0},e._synced_minicalendars=[],e.renderCalendar=function(t,a,n){var i=null,r=t.date||e._currentDate();if("string"==typeof r&&(r=this.templates.api_date(r)),a)i=this._render_calendar(a.parentNode,r,t,a),e.unmarkCalendar(i);else{var o=t.container,d=t.position
;if("string"==typeof o&&(o=document.getElementById(o)),"string"==typeof d&&(d=document.getElementById(d)),d&&void 0===d.left){var s=e.$domHelpers.getOffset(d);d={top:s.top+d.offsetHeight,left:s.left}}o||(o=e._get_def_cont(d)),i=this._render_calendar(o,r,t),i.onclick=function(t){t=t||event;var a=t.target||t.srcElement,n=e.$domHelpers;if(n.closest(a,".dhx_month_head")&&!n.closest(a,".dhx_after")&&!n.closest(a,".dhx_before")){
var i=n.closest(a,"[data-cell-date]"),r=i.getAttribute("data-cell-date"),o=e.templates.parse_date(r);e.unmarkCalendar(this),e.markCalendar(this,o,"dhx_calendar_click"),this._last_date=o,this.conf.handler&&this.conf.handler.call(e,o,this)}}}if(e.config.minicalendar.mark_events)for(var _=e.date.month_start(r),l=e.date.add(_,1,"month"),c=this.getEvents(_,l),h=this["filter_"+this._mode],u={},g=0;g<c.length;g++){var v=c[g];if(!h||h(v.id,v)){var f=v.start_date;for(f.valueOf()<_.valueOf()&&(f=_),
f=e.date.date_part(new Date(f.valueOf()));f<v.end_date&&(u[+f]||(u[+f]=!0,this.markCalendar(i,f,"dhx_year_event")),f=this.date.add(f,1,"day"),!(f.valueOf()>=l.valueOf())););}}return this._markCalendarCurrentDate(i),i.conf=t,t.sync&&!n&&this._synced_minicalendars.push(i),i.conf._on_xle_handler||(i.conf._on_xle_handler=e.attachEvent("onXLE",function(){e.updateCalendar(i,i.conf.date)})),this.config.wai_aria_attributes&&this.config.wai_aria_application_role&&i.setAttribute("role","application"),i},
e._get_def_cont=function(e){return this._def_count||(this._def_count=document.createElement("div"),this._def_count.className="dhx_minical_popup",this._def_count.onclick=function(e){(e||event).cancelBubble=!0},document.body.appendChild(this._def_count)),this._def_count.style.left=e.left+"px",this._def_count.style.top=e.top+"px",this._def_count._created=new Date,this._def_count},e._locateCalendar=function(t,a){if("string"==typeof a&&(a=e.templates.api_date(a)),
+a>+t._max_date||+a<+t._min_date)return null;for(var n=t.querySelector(".dhx_year_body").childNodes[0],i=0,r=new Date(t._min_date);+this.date.add(r,1,"week")<=+a;)r=this.date.add(r,1,"week"),i++;var o=e.config.start_on_monday,d=(a.getDay()||(o?7:0))-(o?1:0);return n.rows[i].cells[d].firstChild},e.markCalendar=function(e,t,a){var n=this._locateCalendar(e,t);n&&(n.className+=" "+a)},e.unmarkCalendar=function(e,t,a){if(t=t||e._last_date,a=a||"dhx_calendar_click",t){var n=this._locateCalendar(e,t)
;n&&(n.className=(n.className||"").replace(RegExp(a,"g")))}},e._week_template=function(t){for(var a=t||250,n=0,i=document.createElement("div"),r=this.date.week_start(e._currentDate()),o=0;o<7;o++)this._cols[o]=Math.floor(a/(7-o)),this._render_x_header(o,n,r,i),r=this.date.add(r,1,"day"),a-=this._cols[o],n+=this._cols[o];return i.lastChild.className+=" dhx_scale_bar_last",i},e.updateCalendar=function(e,t){e.conf.date=t,this.renderCalendar(e.conf,e,!0)},e._mini_cal_arrows=["&nbsp;","&nbsp;"],
e._render_calendar=function(t,a,n,i){var r=e.templates,o=this._cols;this._cols=[];var d=this._mode;this._mode="calendar";var s=this._colsS;this._colsS={height:0};var _=new Date(this._min_date),l=new Date(this._max_date),c=new Date(e._date),h=r.month_day,u=this._ignores_detected;this._ignores_detected=0,r.month_day=r.calendar_date,a=this.date.month_start(a);var g,v=this._week_template(t.offsetWidth-1-this.config.minicalendar.padding);i?g=i:(g=document.createElement("div"),
g.className="dhx_cal_container dhx_mini_calendar"),g.setAttribute("date",this._helpers.formatDate(a)),g.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_grid"+(e.config.rtl?" dhx_grid_rtl'>":"'>")+"<div class='dhx_year_week'>"+(v?v.innerHTML:"")+"</div><div class='dhx_year_body'></div></div>";var f=g.querySelector(".dhx_year_month"),m=g.querySelector(".dhx_year_week"),p=g.querySelector(".dhx_year_body");if(f.innerHTML=this.templates.calendar_month(a),
n.navigation)for(var y=function(t,a){var n=e.date.add(t._date,a,"month");e.updateCalendar(t,n),e._date.getMonth()==t._date.getMonth()&&e._date.getFullYear()==t._date.getFullYear()&&e._markCalendarCurrentDate(t)},b=["dhx_cal_prev_button","dhx_cal_next_button"],x=["left:1px;top:2px;position:absolute;","left:auto; right:1px;top:2px;position:absolute;"],w=[-1,1],k=function(t){return function(){if(n.sync)for(var a=e._synced_minicalendars,i=0;i<a.length;i++)y(a[i],t);else e.config.rtl&&(t=-t),y(g,t)}
},D=[e.locale.labels.prev,e.locale.labels.next],E=0;E<2;E++){var N=document.createElement("div");N.className=b[E],e._waiAria.headerButtonsAttributes(N,D[E]),N.style.cssText=x[E],N.innerHTML=this._mini_cal_arrows[E],f.appendChild(N),N.onclick=k(w[E])}g._date=new Date(a),g.week_start=(a.getDay()-(this.config.start_on_monday?1:0)+7)%7;var S=g._min_date=this.date.week_start(a);g._max_date=this.date.add(g._min_date,6,"week"),this._reset_month_scale(p,a,S,6),i||t.appendChild(g),
m.style.height=m.childNodes[0].offsetHeight-1+"px";var M=e.uid();e._waiAria.minicalHeader(f,M),e._waiAria.minicalGrid(g.querySelector(".dhx_year_grid"),M),e._waiAria.minicalRow(m);for(var A=m.querySelectorAll(".dhx_scale_bar"),C=0;C<A.length;C++)e._waiAria.minicalHeadCell(A[C]);for(var O=p.querySelectorAll("td"),T=new Date(S),C=0;C<O.length;C++)e._waiAria.minicalDayCell(O[C],new Date(T)),T=e.date.add(T,1,"day");return e._waiAria.minicalHeader(f,M),this._cols=o,this._mode=d,this._colsS=s,
this._min_date=_,this._max_date=l,e._date=c,r.month_day=h,this._ignores_detected=u,g},e.destroyCalendar=function(t,a){!t&&this._def_count&&this._def_count.firstChild&&(a||(new Date).valueOf()-this._def_count._created.valueOf()>500)&&(t=this._def_count.firstChild),t&&(t.onclick=null,t.innerHTML="",t.parentNode&&t.parentNode.removeChild(t),this._def_count&&(this._def_count.style.top="-1000px"),t.conf&&t.conf._on_xle_handler&&e.detachEvent(t.conf._on_xle_handler))},e.isCalendarVisible=function(){
return!!(this._def_count&&parseInt(this._def_count.style.top,10)>0)&&this._def_count},e._attach_minical_events=function(){e.event(document.body,"click",function(){e.destroyCalendar()}),e._attach_minical_events=function(){}},e.attachEvent("onTemplatesReady",function(){e._attach_minical_events()}),e.templates.calendar_time=e.date.date_to_str("%d-%m-%Y"),e.form_blocks.calendar_time={render:function(t){
var a="<input class='dhx_readonly' type='text' readonly='true'>",n=e.config,i=this.date.date_part(e._currentDate()),r=1440,o=0;n.limit_time_select&&(o=60*n.first_hour,r=60*n.last_hour+1),i.setHours(o/60),t._time_values=[],a+=" <select class='dhx_lightbox_time_select'>";for(var d=o;d<r;d+=1*this.config.time_step){a+="<option value='"+d+"'>"+this.templates.time_picker(i)+"</option>",t._time_values.push(d),i=this.date.add(i,this.config.time_step,"minute")}a+="</select>";e.config.full_day
;return"<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time dhx_lightbox_minical'>"+a+"<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>"+a+"</div>"},set_value:function(t,a,n,i){function r(t,a,n){c(t,a,n),t.value=e.templates.calendar_time(a),t._date=e.date.date_part(new Date(a))}function o(e){for(var t=i._time_values,a=60*e.getHours()+e.getMinutes(),n=a,r=!1,o=0;o<t.length;o++){var d=t[o];if(d===a){r=!0;break}d<a&&(n=d)}
return r||n?r?a:n:-1}var d,s,_=t.getElementsByTagName("input"),l=t.getElementsByTagName("select"),c=function(t,a,n){t.onclick=function(){e.destroyCalendar(null,!0),e.renderCalendar({position:t,date:new Date(this._date),navigation:!0,handler:function(a){t.value=e.templates.calendar_time(a),t._date=new Date(a),e.destroyCalendar(),e.config.event_duration&&e.config.auto_end_date&&0===n&&v()}})}};if(e.config.full_day){if(!t._full_day){
var h="<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> "+e.locale.labels.full_day+"&nbsp;</label></input>";e.config.wide_form||(h=t.previousSibling.innerHTML+h),t.previousSibling.innerHTML=h,t._full_day=!0}var u=t.previousSibling.getElementsByTagName("input")[0],g=0===e.date.time_part(n.start_date)&&0===e.date.time_part(n.end_date);u.checked=g,l[0].disabled=u.checked,l[1].disabled=u.checked,u.onclick=function(){if(!0===u.checked){var a={}
;e.form_blocks.calendar_time.get_value(t,a),d=e.date.date_part(a.start_date),s=e.date.date_part(a.end_date),(+s==+d||+s>=+d&&(0!==n.end_date.getHours()||0!==n.end_date.getMinutes()))&&(s=e.date.add(s,1,"day"))}var i=d||n.start_date,o=s||n.end_date;r(_[0],i),r(_[1],o),l[0].value=60*i.getHours()+i.getMinutes(),l[1].value=60*o.getHours()+o.getMinutes(),l[0].disabled=u.checked,l[1].disabled=u.checked}}if(e.config.event_duration&&e.config.auto_end_date){var v=function(){
d=e.date.add(_[0]._date,l[0].value,"minute"),s=new Date(d.getTime()+60*e.config.event_duration*1e3),_[1].value=e.templates.calendar_time(s),_[1]._date=e.date.date_part(new Date(s)),l[1].value=60*s.getHours()+s.getMinutes()};l[0].onchange=v}r(_[0],n.start_date,0),r(_[1],n.end_date,1),c=function(){},l[0].value=o(n.start_date),l[1].value=o(n.end_date)},get_value:function(t,a){var n=t.getElementsByTagName("input"),i=t.getElementsByTagName("select")
;return a.start_date=e.date.add(n[0]._date,i[0].value,"minute"),a.end_date=e.date.add(n[1]._date,i[1].value,"minute"),a.end_date<=a.start_date&&(a.end_date=e.date.add(a.start_date,e.config.time_step,"minute")),{start_date:new Date(a.start_date),end_date:new Date(a.end_date)}},focus:function(e){}},e.linkCalendar=function(t,a){var n=function(){var n=e._date,i=new Date(n.valueOf());return a&&(i=a(i)),i.setDate(1),e.updateCalendar(t,i),!0};e.attachEvent("onViewChange",n),e.attachEvent("onXLE",n),
e.attachEvent("onEventAdded",n),e.attachEvent("onEventChanged",n),e.attachEvent("onEventDeleted",n),n()},e._markCalendarCurrentDate=function(t){var a=e.getState(),n=a.min_date,i=a.max_date,r=a.mode,o=e.date.month_start(new Date(t._date)),d=e.date.add(o,1,"month");if(!({month:!0,year:!0,agenda:!0,grid:!0}[r]||n.valueOf()<=o.valueOf()&&i.valueOf()>=d.valueOf()))for(var s=n;s.valueOf()<i.valueOf();)o.valueOf()<=s.valueOf()&&d>s&&e.markCalendar(t,s,"dhx_calendar_click"),s=e.date.add(s,1,"day")},
e.attachEvent("onEventCancel",function(){e.destroyCalendar(null,!0)})});