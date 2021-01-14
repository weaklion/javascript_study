(function() {
  var elements = document.querySelectorAll('[two-way-data]');
      scope = {};

  elements.forEach((ele) => {
    if(ele.type === 'text' || ele.type === 'textarea') {
      var propToBind = ele.getAttribute('two-way-data');
      addScopeProp(propToBind);
      ele.onkeyup = function() {
        scope[propToBind] = ele.value;
      }
    };
    //bind prop to elements
    function addScopeProp(prop) {
      if(!scope.hasOwnProperty(prop)) {
        var value;
        Object.defineProperty(scope, prop, {
          set : function (newValue) {
            value = newValue;
            elements.forEach((element) => {
              if(element.getAttribute('two-way-data') === prop) {
                if(element.type && (element.type ==='text' || element.type === 'textarea')) {
                  element.value = newValue;
                }
                else if(!element.type) {
                  element.innerHTML = newValue;
                }
              }
            })
          },
          get : (() => {
              return value;
          }),
          enumerable : true
        })
      }
    }
  })
})();

