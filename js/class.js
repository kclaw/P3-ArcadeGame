/* temperorary
var Class = function() {
    var parent,
        methods,
        klass = function() {
          this.initialize.apply(this, arguments);
          //copy the properties so that they can be called directly from the child
          //class without $super, i.e., this.name
          var reg = /\(([\s\S]*?)\)/;
          var params = reg.exec(this.initialize.toString());
          if (params) {
            var param_names = params[1].split(',');
            for ( var i=0; i<param_names.length; i++ ) {
              this[param_names[i]] = arguments[i];
            }
          }
        },
        extend = function(destination, source) {
          for (var property in source) {
            destination[property] = source[property];
          }
                  //IE 8 Bug: Native Object methods are only accessible directly
                  //and do not come up in for loops. ("DontEnum Bug")
          if (!Object.getOwnPropertyNames) {
            var objMethods = [
               'toString'
              ,'valueOf'
              ,'toLocaleString'
              ,'isPrototypeOf'
              ,'propertyIsEnumerable'
              ,'hasOwnProperty'
            ];

            for(var i=0; i<objMethods.length; i++) {
             // if (  isNative(source,objMethods[i])
              if (typeof source[objMethods[i]] === 'function'
                 &&      source[objMethods[i]].toString().indexOf('[native code]') == -1) {
                   document.writeln('copying ' + objMethods[i]+'<br>');
                   destination[objMethods[i]] = source[objMethods[i]];
              }
            }
          }

          destination.$super =  function(method) {
            return this.$parent[method].apply(this.$parent, Array.prototype.slice.call(arguments, 1));
          }
          return destination;
    };

    if (typeof arguments[0] === 'function') {
       parent  = arguments[0];
       methods = arguments[1];
    } else {
       methods = arguments[0];
    }

    if (parent !== undefined) {
       extend(klass.prototype, parent.prototype);
       klass.prototype.$parent = parent.prototype;
    }
    extend(klass.prototype, methods);
    klass.prototype.constructor = klass;

    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};

    return klass;
};
*/
/*no use*/
Object.prototype.equals = function( x, y ) {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}
