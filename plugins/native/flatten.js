import isPlainObject from "whats-the-type/isPlainObject.js";
import isArray from "whats-the-type/isArray.js";
import isUndefined from "whats-the-type/isUndefined.js";
import isNull from "whats-the-type/isNull.js";

/**
 * Retrieve a flattened version of an object with all paths on all levels in `dotted-string-notation`
 * @param {Object} obj
 * @param {Array} [flattened]
 * @param {String} [propStr]
 * @ignore
 * @returns {Object}
 */
const flattenObject = (obj, flattened = {}, propStr = "") => {
    if (isUndefined(obj) || isNull(obj)) {
        return flattened;
    }
    Object.entries(obj).forEach(([key, val]) => {
        const nestedPropStr =
            propStr + (propStr ? "." : "") + key;
        if (isPlainObject(val) || isArray(val)) {
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
