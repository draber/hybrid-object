import get from "lodash-es/get.js";
import set from "lodash-es/set.js";
import unset from "lodash-es/unset.js";
import has from "lodash-es/has.js";
import isPlainObject from "lodash-es/isPlainObject.js";

/**
 * Retrieve all paths as an array in dot-notation
 * @param {Object} obj
 * @param {Array} [dotArr]
 * @param {String} [propStr]
 * @returns {Object}
 */
 const flatten = (obj, flattened = {}, propStr = "") => {
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
        const nestedPropStr = propStr + (propStr ? "." : "") + (isArray ? `[${key}]` : key);
        if (isPlainObject(val) || Array.isArray(val)) {
            flatten(val, flattened, nestedPropStr);
        } else {
            flattened[nestedPropStr] = val;
        }
    });
    return flattened;
};

/**
 * Implementation on top of plain objects that brings a variety of array-like functionality.
 * It also supports `dotted.string.notation` for accessing properties.
 * @function HybridObject
 * @param {Object} [data]
 * @exports HybridObject
 * @namespace HybridObject
 */
function HybridObject(data = {}) {
    Object.assign(this, data);

    /**
     * Non-enumerable properties
     */
    Object.defineProperties(this, {
        set: {
            /**
             * Sets the value at path of object. If a portion of path doesn't exist, it's created.
             * Arrays are created for missing index properties while objects are created for all other missing properties.
             * Uses Lodash's `set` method, but without the `object` argument.
             * @param {Array|string} path The path of the property to set
             * @param {*} value
             * @memberof HybridObject
             * @instance
             * @see https://lodash.com/docs/#set
             * @since 1.0.0
             * @returns {HybridObject}
             */
            value: function (path, value) {
                return set(this, path, value);
            },
        },
        unset: {
            /**
             * Removes the property at path of object.
             * Uses Lodash's `unset` method, but without the `object` argument.
             * @param {Array|string} path The path of the property to unset
             * @memberof HybridObject
             * @method unset
             * @instance
             * @see https://lodash.com/docs/#unset
             * @since 1.0.0
             * @returns {Boolean}
             */
            value: function (path) {
                return unset(this, path);
            },
        },
        get: {
            /**
             * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
             * Uses Lodash's `get` method, but without the `object` argument.
             * @param {Array|string} path The path of the property to get
             * @param {*} [defaultValue] The default value to return if the path doesn't exist
             * @memberof HybridObject
             * @method get
             * @instance
             * @see https://lodash.com/docs/#get
             * @since 1.0.0
             * @returns {String|Object}
             */
            value: function (path, defaultValue) {
                return get(this, path, defaultValue);
            },
        },
        toJson: {
            /**
             * Convert data to JSON
             * @param {Boolean} [pretty]
             * @memberof HybridObject
             * @method toJson
             * @instance
             * @since 1.0.0
             * @returns {String}
             */
            value: function (pretty = false) {
                return JSON.stringify(this, null, pretty ? "\t" : null);
            },
        },
        clone: {
            /**
             * Get a deep clone of either all data in the object or a partial by providing `path`
             * @param {String} [path]
             * @memberof HybridObject
             * @method clone
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
             * @since 1.0.0
             * @returns {HybridObject}
             */
            value: function (path) {
                return new HybridObject(
                    structuredClone(path ? this.get(path) : this)
                );
            },
        },
        entries: {
            /**
             * Returns an array of the object's own enumerable string-keyed property [key, value] pairs
             * Equivalent to `Object.entries(this)`
             * @memberof HybridObject
             * @method entries
             * @instance
             * @since 1.0.0
             * @returns {Array}
             */
            value: function () {
                return Object.entries(this);
            },
        },
        every: {
            /**
             * Equivalent of Array.every
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method every
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
             * @since 1.0.0
             * @returns {Boolean}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    if (!callbackFn(value, path, flat, thisArg)) {
                        return false;
                    }
                }
                return true;
            },
        },
        filter: {
            /**
             * Equivalent of Array.filter
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method filter
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
             * @since 1.0.0
             * @returns {HybridObject}
             */
            value: function (callbackFn, thisArg) {
                const filtered = {};
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    if (callbackFn(value, path, flat, thisArg)) {
                        set(filtered, path, value);
                    }
                }
                return new HybridObject(filtered);
            },
        },
        find: {
            /**
             * Equivalent of Array.find
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method find
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
             * @since 1.0.0
             * @returns {Primitive|Function|undefined}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    if (callbackFn(value, path, flat, thisArg)) {
                        return value;
                    }
                }
            },
        },
        findPath: {
            /**
             * Equivalent of Array.findIndex
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method findPath
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
             * @since 1.0.0
             * @returns {Primitive|undefined}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                const value = this.find(callbackFn, thisArg);
                return value === undefined
                    ? undefined
                    : this.paths().find((key) => flat[key] === value);
            },
        },
        flatten: {
            /**
             * Retrieve a version of the object with all 'keys.flattened.to.paths'
             * @memberof HybridObject
             * @method flatten
             * @instance
             * @since 1.0.0
             * @returns {Object}
             */
            value: function () {
                return flatten(this);
            },
        },
        paths: {
            /**
             * Retrieve an array with all 'keys.flattened.to.paths'
             * @memberof HybridObject
             * @method paths
             * @instance
             * @since 1.0.0
             * @returns {Array}
             */
            value: function () {
                return Object.keys(this.flatten());
            },
        },
        values: {
            /**
             * Retrieve all values from the object
             * @memberof HybridObject
             * @method values
             * @instance
             * @since 1.0.0
             * @returns {Array}
             */
            value: function () {
                return Object.values(this.flatten());
            },
        },
        forEach: {
            /**
             * Equivalent of Array.forEach
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method forEach
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
             * @since 1.0.0
             * @returns {undefined}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    callbackFn(value, path, flat, thisArg);
                }
            },
        },
        has: {
            /**
             * Checks if path is a direct property of object.
             * Uses Lodash's `has` method, but without the `object` argument.
             * @param {Array|string} path The path to check
             * @memberof HybridObject
             * @method has
             * @instance
             * @see https://lodash.com/docs/#has
             * @since 1.0.0
             * @returns {Boolean} Returns true if path exists, else false.
             */
            value: function (path) {
                return has(this, path);
            },
        },
        includes: {
            /**
             * Equivalent of Array.includes, though without the index argument
             * @param {Primitive} searchElement The value to search for
             * @memberof HybridObject
             * @method includes
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
             * @since 1.0.0
             * @returns {Boolean}
             */
            value: function (searchElement) {
                return Object.values(this.flatten()).includes(searchElement);
            },
        },
        keys: {
            /**
             * Retrieve an array of all keys at the top level of the object
             * @memberof HybridObject
             * @method keys
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
             * @since 1.0.0
             * @returns {Array}
             */
            value: function () {
                return Object.keys(this);
            },
        },
        map: {
            /**
             * Equivalent of Array.map
             * @param {Function} callbackFn callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method map
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
             * @since 1.0.0
             * @returns {HybridObject}
             */
            value: function (callbackFn, thisArg) {
                const mapped = {};
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    set(mapped, path, callbackFn(value, path, flat, thisArg));
                }
                return new HybridObject(mapped);
            },
        },
        size: {
            /**
             * Get the number of keys at the top level of the object.
             * Equivalent of `Map|Set.size`, but implemented as a function.
             * @memberof HybridObject
             * @method size
             * @instance
             * @since 1.0.0
             * @returns {Number}
             */
            value: function () {
                return this.keys().length;
            },
        },
        some: {
            /**
             * Equivalent of Array.some
             * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
             * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
             * @memberof HybridObject
             * @method some
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
             * @since 1.0.0
             * @returns {Boolean}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    if (callbackFn(value, path, flat, thisArg)) {
                        return true;
                    }
                }
                return false;
            },
        },
        values: {
            /**
             * Equivalent of Object.values(object), retrieves an array of all values
             * @memberof HybridObject
             * @method values
             * @instance
             * @since 1.0.0
             * @returns {Array}
             */
            value: function () {
                return Object.values(this);
            },
        },
    });
}

export default HybridObject;
