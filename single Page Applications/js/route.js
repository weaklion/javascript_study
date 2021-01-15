'use strict';

function Route(name, htmlName, defaultRoute) {
  try {
    if(!name || !htmlName) {
      throw 'error : name and htmlName params are mandatories';
    }
    this.constructor(name, html, defaultRoute);
  } catch (error) {
    console.error(error);
  }
}

Route.prototype = {
  name : undefined, //routeName
  htmlName : undefined, //html load name
  defaultRoute : undefined, // 앱의 기본 경로일 경우 true
  constructor : function (name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.defaultRoute = defaultRoute;
  },
  isActiveRoute : function (hashpath) { // 실제 창의 위치 return
    console.log(hashpath.replace('#', '') === this.name,'');
    return hashpath.replace('#', '') === this.name;
  }
}