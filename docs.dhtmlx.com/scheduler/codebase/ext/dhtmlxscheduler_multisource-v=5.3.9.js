/*

@license
dhtmlxScheduler v.5.3.9 Professional

This software can be used only as part of dhtmlx.com site.
You are not allowed to use it on any other site

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){!function(){function t(e){var t=function(){};return t.prototype=e,t}var a=e._load;e._load=function(e,n){if("object"==typeof(e=e||this._load_url))for(var i=t(this._loaded),r=0;r<e.length;r++)this._loaded=new i,a.call(this,e[r],n);else a.apply(this,arguments)}}()});