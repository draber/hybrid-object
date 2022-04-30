import { isPlainObject } from 'is-plain-object';

/**
 * Retrieve all paths as an array in `dotted-string-notation`
 * @param {Object} obj
 * @param {Array} [flattened]
 * @param {String} [propStr]
 * @ignore
 * @returns {Object}
 */
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

/**
 * Retrieve a version of the object with all 'keys.flattened.to.paths'. This returns a regular object because its keys contain dots and it would require
 * some sort of escaping strategy to make it work with `ElasticObject.get()`.
 * @memberof ElasticObject
 * @instance
 * @returns {Object}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.flatten()); // {a.aa:1,b.bb:2}
 */
const flatten = function () {
    return flattenObject(this);
};

export default flatten;
