import hm from "./ho-methods.js";

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
        paths: {
            /**
             * Retrieve _all_, not only the final paths as an array in `dotted.string.notation`
             * @memberof HybridObject
             * @method paths
             * @instance
             * @returns {Array}
             */
            value: function () {
                return hm.paths(this);
            },
        },
        set: {
            /**
             * Set a new or overwrite an existing value, supports `dotted.string.notation`
             * @param {String} path
             * @param {*} value
             * @memberof HybridObject
             * @method set
             * @instance
             * @returns {HybridObject}
             */
            value: function (path, value) {
                return hm.update(this, path, value);
            },
        },
        delete: {
            /**
             * Delete an existing value, supports `dotted.string.notation`
             * @param {String} path
             * @memberof HybridObject
             * @method delete
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
             * @returns {Boolean}
             */
            value: function (path) {
                return hm.update(this, path);
            },
        },
        get: {
            /**
             * Retrieve a single (sub-)entry, supports `dotted.string.notation`
             * @param {String|Number} path
             * @memberof HybridObject
             * @method get
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
             * @returns {String|Object}
             */
            value: function (path) {
                return hm.get(this, path);
            },
        },
        toJson: {
            /**
             * Convert data to JSON
             * @param {Boolean} [pretty]
             * @memberof HybridObject
             * @method toJson
             * @instance
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
             * @returns {HybridObject}
             */
            value: function (callbackFn, thisArg) {
                const filtered = {};
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    if (callbackFn(value, path, flat, thisArg)) {
                        hm.update(filtered, path, value);
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
             * @returns {Primitive|undefined}
             */
            value: function (callbackFn, thisArg) {
                const flat = this.flatten();
                const value = this.find(callbackFn, thisArg);
                return value === undefined
                    ? undefined
                    : Object.keys(flat).find((key) => flat[key] === value);
            },
        },
        flatten: {
            /**
             * Retrieve a version of the object with all 'keys.flattened.to.paths'
             * @memberof HybridObject
             * @method flatten
             * @instance
             * @returns {Object}
             */
            value: function () {
                return hm.flatten(this);
            },
        },
        nestedKeys: {
            /**
             * Retrieve an array with all 'keys.flattened.to.paths'
             * @memberof HybridObject
             * @method nestedKeys
             * @instance
             * @returns {Array}
             */
            value: function () {
                return Object.keys(this.flatten());
            },
        },
        finalValues: {
            /**
             * Retrieve all values that aren't collections
             * @memberof HybridObject
             * @method finalValues
             * @instance
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
             * Equivalent of Map|Set.has, checks if the object has a value at the given path.
             * @param {String} path
             * @memberof HybridObject
             * @method has
             * @instance
             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
             * @returns {Boolean}
             */
            value: function (path) {
                return this.paths().includes(path);
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
             * @returns {HybridObject}
             */
            value: function (callbackFn, thisArg) {
                const mapped = {};
                const flat = this.flatten();
                for (let [path, value] of Object.entries(flat)) {
                    hm.update(
                        mapped,
                        path,
                        callbackFn(value, path, flat, thisArg)
                    );
                }
                return new HybridObject(mapped);
            },
        },
        size: {
            /**
             * Equivalent of Map|Set.size. Get the number of keys at the top level of the object.
             * Note that in difference to Map|Set, this is implemented as a function.
             * @memberof HybridObject
             * @method size
             * @instance
             * @returns {Number}
             */
            value: function() { 
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
             * @returns {Array}
             */
            value: function () {
                return Object.values(this);
            },
        },
    });
}

export default HybridObject;
