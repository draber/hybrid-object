import { get as _get } from "lodash-es";
import { isPlainObject } from "lodash-es";

/**
 * Gets the value at path of object.
 * - If the resolved value is undefined and `defaultValue` is provided, `defaultValue` will be returned, undefined otherwise.
 * - If the resolved value is a plain object, it will be converted to a `ElasticObject`.
 * Uses Lodash's `get()` method, but without the `object` argument.
 * @param {Array|string} path The path of the property to get
 * @param {*} [defaultValue] The default value to return if the path doesn't exist
 * @see https://lodash.com/docs/#get
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: function() {}
 *     }
 * });
 * console.log(eObj.get('a.aa')); // 1
 * console.log(eObj.get('b.bb')); // [Function: bb]
 * console.log(eObj.get('c.cc')); // undefined
 * console.log(eObj.get('c.cc', 'default')); // default
 * console.log(eObj.get('b.bb', () => 'default')); // [Function: bb]
 * console.log(eObj.get('a')); // {aa:1}
 */
const get = function (path, defaultValue) {
    let value = _get(this, path, defaultValue);
    return isPlainObject(value) ? this.createInstance(value) : value;
};

export default get;
