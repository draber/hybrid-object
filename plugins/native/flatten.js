import { isPlainObject } from 'is-plain-object';

/**
 * Retrieve a flattened version of an object with all paths on all levels in `dotted-string-notation`
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
 * Retrieve a version of the object with all 'keys.flattened.to.paths'. 
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.flatten()); // ElasticObject { a: { aa: 1 }, 'a.aa': 1, b: { bb: 2 }, 'b.bb': 2 }
 */
const flatten = function () {
    return this.create(flattenObject(this));
};

export default flatten;
