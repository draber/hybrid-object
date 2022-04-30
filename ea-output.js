(function () {
    'use strict';

    const every = function (callbackFn, thisArg) {
        const entries = this.entries();
        for (let [path, value] of entries) {
            if (!callbackFn(value, path, entries, thisArg)) {
                return false;
            }
        }
        return true;
    };

    const filter = function (callbackFn, thisArg) {
        const filtered = this.createInstance({});
        const entries = this.entries();
        for (let [path, value] of entries) {
            if (callbackFn(value, path, entries, thisArg)) {
                filtered.set(path, value);
            }
        }
        return filtered;
    };

    /*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */
    function isObject(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    }
    function isPlainObject(o) {
      var ctor,prot;
      if (isObject(o) === false) return false;
      ctor = o.constructor;
      if (ctor === undefined) return true;
      prot = ctor.prototype;
      if (isObject(prot) === false) return false;
      if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
      }
      return true;
    }

    const find = function (callbackFn, thisArg) {
        const flat = this.flatten();
        for (let [path, value] of Object.entries(flat)) {
            if (callbackFn(value, path, flat, thisArg)) {
                return isPlainObject(value) ? this.createInstance(value) : value;
            }
        }
    };

    const forEach = function (callbackFn, thisArg) {
        const entries = this.entries();
        for (let [path, value] of entries) {
            callbackFn(value, path, entries, thisArg);
        }
    };

    const includes = function (searchElement) {
        return Object.values(this.flatten()).includes(searchElement);
    };

    const length = function () {
        return this.keys().length;
    };

    const map = function (callbackFn, thisArg) {
        const mapped = {};
        const flat = this.flatten();
        for (let [path, value] of Object.entries(flat)) {
            set(mapped, path, callbackFn(value, path, flat, thisArg));
        }
        return this.createInstance(mapped);
    };

    const reduce = function (callbackFn, initialValue, thisArg) {
        const flat = this.flatten();
        let accumulator = initialValue;
        for (let [path, value] of Object.entries(flat)) {
            accumulator = callbackFn(accumulator, value, path, flat, thisArg);
        }
        return accumulator;
    };

    const some = function (callbackFn, thisArg) {
        const flat = this.flatten();
        for (let [path, value] of Object.entries(flat)) {
            if (callbackFn(value, path, flat, thisArg)) {
                return true;
            }
        }
        return false;
    };

    const sort = function (compareFn) {
        const flat = this.flatten();
        const sorted = Object.entries(flat).sort(
            ([pathA, valueA], [pathB, valueB]) => {
                if (compareFn) {
                    return compareFn(valueA, valueB);
                }
                return valueA - valueB;
            }
        );
        return this.createInstance(
            sorted.reduce((accumulator, [path, value]) => {
                set(accumulator, path, value);
                return accumulator;
            }, {})
        );
    };

    var arrayPlugins = {
        every,
        filter,
        find,
        forEach,
        includes,
        length,
        map,
        reduce,
        some,
        sort
    };

    const assign = function (...sources) {
        return Object.assign(this, ...sources);
    };

    const clone = function () {
        return this.createInstance(structuredClone(this));
    };

    const cloneProperty = function (path) {
        return structuredClone(this.get(path));
    };

    const entries = function () {
        return Object.entries(this);
    };

    const findPath = function (callbackFn, thisArg) {
        const flat = this.flatten();
        for (let [path, value] of Object.entries(flat)) {
            if (callbackFn(value, path, flat, thisArg)) {
                return path;
            }
        }
    };

    const flattenObject = (obj, flattened = {}, propStr = "") => {
        if (typeof obj === "undefined" || obj === null) {
            return flattened;
        }
        const isArray = Array.isArray(obj);
        if (isArray) {
            obj = {
                ...obj,
            };
        }
        Object.entries(obj).forEach(([key, val]) => {
            const nestedPropStr =
                propStr + (propStr ? "." : "") + key;
            if (isPlainObject(val) || Array.isArray(val)) {
                flattened[nestedPropStr] = val;
                flattenObject(val, flattened, nestedPropStr);
            } else {
                flattened[nestedPropStr] = val;
            }
        });
        return flattened;
    };
    const flatten = function () {
        return flattenObject(this);
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var objectPath$1 = {exports: {}};

    (function (module) {
    	(function (root, factory) {
    	  {
    	    module.exports = factory();
    	  }
    	})(commonjsGlobal, function () {
    	  var toStr = Object.prototype.toString;
    	  function hasOwnProperty (obj, prop) {
    	    if (obj == null) {
    	      return false
    	    }
    	    return Object.prototype.hasOwnProperty.call(obj, prop)
    	  }
    	  function isEmpty (value) {
    	    if (!value) {
    	      return true
    	    }
    	    if (isArray(value) && value.length === 0) {
    	      return true
    	    } else if (typeof value !== 'string') {
    	      for (var i in value) {
    	        if (hasOwnProperty(value, i)) {
    	          return false
    	        }
    	      }
    	      return true
    	    }
    	    return false
    	  }
    	  function toString (type) {
    	    return toStr.call(type)
    	  }
    	  function isObject (obj) {
    	    return typeof obj === 'object' && toString(obj) === '[object Object]'
    	  }
    	  var isArray = Array.isArray || function (obj) {
    	    return toStr.call(obj) === '[object Array]'
    	  };
    	  function isBoolean (obj) {
    	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]'
    	  }
    	  function getKey (key) {
    	    var intKey = parseInt(key);
    	    if (intKey.toString() === key) {
    	      return intKey
    	    }
    	    return key
    	  }
    	  function factory (options) {
    	    options = options || {};
    	    var objectPath = function (obj) {
    	      return Object.keys(objectPath).reduce(function (proxy, prop) {
    	        if (prop === 'create') {
    	          return proxy
    	        }
    	        if (typeof objectPath[prop] === 'function') {
    	          proxy[prop] = objectPath[prop].bind(objectPath, obj);
    	        }
    	        return proxy
    	      }, {})
    	    };
    	    var hasShallowProperty;
    	    if (options.includeInheritedProps) {
    	      hasShallowProperty = function () {
    	        return true
    	      };
    	    } else {
    	      hasShallowProperty = function (obj, prop) {
    	        return (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop)
    	      };
    	    }
    	    function getShallowProperty (obj, prop) {
    	      if (hasShallowProperty(obj, prop)) {
    	        return obj[prop]
    	      }
    	    }
    	    var getShallowPropertySafely;
    	    if (options.includeInheritedProps) {
    	      getShallowPropertySafely = function (obj, currentPath) {
    	        if (typeof currentPath !== 'string' && typeof currentPath !== 'number') {
    	          currentPath = String(currentPath);
    	        }
    	        var currentValue = getShallowProperty(obj, currentPath);
    	        if (currentPath === '__proto__' || currentPath === 'prototype' ||
    	          (currentPath === 'constructor' && typeof currentValue === 'function')) {
    	          throw new Error('For security reasons, object\'s magic properties cannot be set')
    	        }
    	        return currentValue
    	      };
    	    } else {
    	      getShallowPropertySafely = function (obj, currentPath) {
    	        return getShallowProperty(obj, currentPath)
    	      };
    	    }
    	    function set (obj, path, value, doNotReplace) {
    	      if (typeof path === 'number') {
    	        path = [path];
    	      }
    	      if (!path || path.length === 0) {
    	        return obj
    	      }
    	      if (typeof path === 'string') {
    	        return set(obj, path.split('.').map(getKey), value, doNotReplace)
    	      }
    	      var currentPath = path[0];
    	      var currentValue = getShallowPropertySafely(obj, currentPath);
    	      if (path.length === 1) {
    	        if (currentValue === void 0 || !doNotReplace) {
    	          obj[currentPath] = value;
    	        }
    	        return currentValue
    	      }
    	      if (currentValue === void 0) {
    	        if (typeof path[1] === 'number') {
    	          obj[currentPath] = [];
    	        } else {
    	          obj[currentPath] = {};
    	        }
    	      }
    	      return set(obj[currentPath], path.slice(1), value, doNotReplace)
    	    }
    	    objectPath.has = function (obj, path) {
    	      if (typeof path === 'number') {
    	        path = [path];
    	      } else if (typeof path === 'string') {
    	        path = path.split('.');
    	      }
    	      if (!path || path.length === 0) {
    	        return !!obj
    	      }
    	      for (var i = 0; i < path.length; i++) {
    	        var j = getKey(path[i]);
    	        if ((typeof j === 'number' && isArray(obj) && j < obj.length) ||
    	          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
    	          obj = obj[j];
    	        } else {
    	          return false
    	        }
    	      }
    	      return true
    	    };
    	    objectPath.ensureExists = function (obj, path, value) {
    	      return set(obj, path, value, true)
    	    };
    	    objectPath.set = function (obj, path, value, doNotReplace) {
    	      return set(obj, path, value, doNotReplace)
    	    };
    	    objectPath.insert = function (obj, path, value, at) {
    	      var arr = objectPath.get(obj, path);
    	      at = ~~at;
    	      if (!isArray(arr)) {
    	        arr = [];
    	        objectPath.set(obj, path, arr);
    	      }
    	      arr.splice(at, 0, value);
    	    };
    	    objectPath.empty = function (obj, path) {
    	      if (isEmpty(path)) {
    	        return void 0
    	      }
    	      if (obj == null) {
    	        return void 0
    	      }
    	      var value, i;
    	      if (!(value = objectPath.get(obj, path))) {
    	        return void 0
    	      }
    	      if (typeof value === 'string') {
    	        return objectPath.set(obj, path, '')
    	      } else if (isBoolean(value)) {
    	        return objectPath.set(obj, path, false)
    	      } else if (typeof value === 'number') {
    	        return objectPath.set(obj, path, 0)
    	      } else if (isArray(value)) {
    	        value.length = 0;
    	      } else if (isObject(value)) {
    	        for (i in value) {
    	          if (hasShallowProperty(value, i)) {
    	            delete value[i];
    	          }
    	        }
    	      } else {
    	        return objectPath.set(obj, path, null)
    	      }
    	    };
    	    objectPath.push = function (obj, path ) {
    	      var arr = objectPath.get(obj, path);
    	      if (!isArray(arr)) {
    	        arr = [];
    	        objectPath.set(obj, path, arr);
    	      }
    	      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    	    };
    	    objectPath.coalesce = function (obj, paths, defaultValue) {
    	      var value;
    	      for (var i = 0, len = paths.length; i < len; i++) {
    	        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
    	          return value
    	        }
    	      }
    	      return defaultValue
    	    };
    	    objectPath.get = function (obj, path, defaultValue) {
    	      if (typeof path === 'number') {
    	        path = [path];
    	      }
    	      if (!path || path.length === 0) {
    	        return obj
    	      }
    	      if (obj == null) {
    	        return defaultValue
    	      }
    	      if (typeof path === 'string') {
    	        return objectPath.get(obj, path.split('.'), defaultValue)
    	      }
    	      var currentPath = getKey(path[0]);
    	      var nextObj = getShallowPropertySafely(obj, currentPath);
    	      if (nextObj === void 0) {
    	        return defaultValue
    	      }
    	      if (path.length === 1) {
    	        return nextObj
    	      }
    	      return objectPath.get(obj[currentPath], path.slice(1), defaultValue)
    	    };
    	    objectPath.del = function del (obj, path) {
    	      if (typeof path === 'number') {
    	        path = [path];
    	      }
    	      if (obj == null) {
    	        return obj
    	      }
    	      if (isEmpty(path)) {
    	        return obj
    	      }
    	      if (typeof path === 'string') {
    	        return objectPath.del(obj, path.split('.'))
    	      }
    	      var currentPath = getKey(path[0]);
    	      getShallowPropertySafely(obj, currentPath);
    	      if (!hasShallowProperty(obj, currentPath)) {
    	        return obj
    	      }
    	      if (path.length === 1) {
    	        if (isArray(obj)) {
    	          obj.splice(currentPath, 1);
    	        } else {
    	          delete obj[currentPath];
    	        }
    	      } else {
    	        return objectPath.del(obj[currentPath], path.slice(1))
    	      }
    	      return obj
    	    };
    	    return objectPath
    	  }
    	  var mod = factory();
    	  mod.create = factory;
    	  mod.withInheritedProps = factory({includeInheritedProps: true});
    	  return mod
    	});
    } (objectPath$1));
    var objectPath = objectPath$1.exports;

    const get = function(path) {
        const value = objectPath.get(this, path);
        return isPlainObject(value) ? this.createInstance(value) : value;
    };

    const has = function (path) {
        return typeof objectPath.get(this, path) !== 'undefined';
    };

    const keys = function () {
        return Object.keys(this);
    };

    const paths = function () {
        return Object.keys(this.flatten());
    };

    const set$1 = function (path, value) {
        return objectPath.set(this, path, value);
    };

    const toJson = function (pretty = false) {
        return JSON.stringify(this, null, pretty ? "\t" : null);
    };

    const unset = function (path) {
        return objectPath.del(this, path);
    };

    const values = function () {
        return Object.values(this);
    };

    var nativePlugins = {
        assign,
        clone,
        cloneProperty,
        entries,
        findPath,
        flatten,
        get,
        has,
        keys,
        paths,
        set: set$1,
        toJson,
        unset,
        values
    };

    class ElasticObject extends Object {
        static assign(target, ...sources) {
            return Object.assign(new ElasticObject(target), ...sources);
        }
        constructor(data = {}, plugins = {}) {
            super();
            for (const [name, plugin] of Object.entries({
                ...nativePlugins,
                ...arrayPlugins,
                ...plugins,
            })) {
                ElasticObject.prototype[name] = plugin;
            }
            ElasticObject.prototype.createInstance = function(data = {}){
                return new ElasticObject(data, plugins);
            };
            Object.assign(this, data);
        }
    }

    return ElasticObject;

})();
