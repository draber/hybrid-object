/*!
 * ElasticObject <https://github.com/draber/elastic-object>
 *
 * Copyright (c) 2022, Dieter Raber.
 * Released under the MIT License.
 */
import arrayPlugins from "./plugins/array.js";
import nativePlugins from "./plugins/native.js";

const defaultPlugins = {
    ...nativePlugins,
    ...arrayPlugins,
};

// This namespace tricks the documentor into creating an extra block for static methods
/**
 * @namespace Static
 */

/**
 * Implementation on top of plain objects that brings a variety of array-like functionality.
 * It also supports `dotted.string.notation` for accessing properties.
 * @class ElasticObject
 * @extends Object
 * @param {Object} [data]
 */
class ElasticObject extends Object {
    /**
     * Override the default `assign` method and ensure that the first argument is an instance of `ElasticObject`.
     * Doesn't support addition of plugins, look into `ElasticObject.loadPlugins()` for that.
     * @param {Object|ElasticObject} target
     * @param  {...*} sources Objects|ElasticObjects to be merged
     * @static
     * @returns ElasticObject
     * @method Static.assign
     * @example
     * const obj1 = {a: 1, b: 2};
     * const obj2 = {c: 3, d: 4};
     * console.log(ElasticObject.assign(obj1, obj2)); // ElasticObject {a: 1, b: 2, c: 3, d: 4}
     * const obj3 = {e: 5, f: 6};
     * const obj4 = new ElasticObject({g: 7, h: 8});
     * console.log(ElasticObject.assign(obj3, obj4)); // ElasticObject {e: 5, f: 6, g: 7, h: 8}
     */
    static assign(target, ...sources) {
        return Object.assign(new ElasticObject(target), ...sources);
    }

    /**
     * Creates a new ElasticObject from an existing object.
     * @param {*} data
     * @param {*} [plugins]
     * @static
     * @returns ElasticObject
     * @method Static.create
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
     * @example
     * const obj = ElasticObject.create({a: 1, b: 2});
     */
    static create(data, plugins = {}) {
        return new ElasticObject(data, plugins);
    }

    /**
     * Creates a new ElasticObject from an iterable.
     * @param {Iterable} entries
     * @param {*} [plugins]
     * @returns ElasticObject
     * @static
     * @method Static.fromEntries
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
     * @example
     * const entries = new Map([
     *  ['foo', 'bar'],
     *  ['baz', 42]
     *  ]);
     * const eObj = ElasticObject.createFrom(entries);
     */
    static fromEntries(entries, plugins = {}) {
        return new ElasticObject(Object.fromEntries(entries), plugins);
    }

    /**
     * Constructor
     * @param {Object|ElasticObject} data
     * @param {Object} [plugins] - An object containing the plugins to be used.
     */
    constructor(data = {}, plugins = {}) {
        super();

        /**
         * Load the plugins. This method can also be used to add new plugins Elastic Objects created with
         * `ElasticObject.create()`, `ElasticObject.createFrom()` or `ElasticObject.assign()`.
         * Note that in this case this method needs to be called before the `ElasticObject` is used.
         * @param {Object} plugins - An object containing additinal methods.
         * @see https://github.com/draber/elastic-object/blob/main/plugins
         * @example
         * const myPlugins = {
         *    methodA: function() {
         *        console.log(this);
         *    }
         *    // more methods
         *}
         * const eObj = ElasticObject.create({a: 1, b: 2});
         * eObj.loadPlugins(myPlugins);
         * eObj.methodA(); // logs ElasticObject { bar: 42 }
         */
        ElasticObject.prototype.loadPlugins = function (plugins) {
            Object.entries(plugins).forEach(([name, plugin]) => {
                if (typeof plugin === "function") {
                    ElasticObject.prototype[name] = plugin;
                }
            });
        };

        this.loadPlugins({ ...defaultPlugins, ...plugins });

        ElasticObject.prototype.create = function (data = {}) {
            return ElasticObject.create(data, plugins);
        };
        Object.assign(this, data);
    }
}

export default ElasticObject;
