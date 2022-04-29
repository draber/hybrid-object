import arrayPlugins from "./plugins/array.js";
import nativePlugins from "./plugins/native.js";

//import console from 'a-nicer-console'

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
     * Not to be confused with the eponymous `instance.assign()` method.
     * @param {Object|ElasticObject} target
     * @param  {...*} sources Objects|ElasticObjects to be merged
     * @static
     * @ignore
     * @returns ElasticObject
     * @namespace ElasticObject
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
     * Constructor
     * @param {Object|ElasticObject} data
     * @param {Object} [plugins] - An object containing the plugins to be used.
     */
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
        }
        Object.assign(this, data);
    }
}

export default ElasticObject;
