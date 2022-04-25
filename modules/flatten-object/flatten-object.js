import isPlainObject from "lodash-es/isPlainObject.js";

/**
 * Retrieve all paths as an array in Lodash-style dot-notation
 * @param {Object} obj
 * @param {Array} [flattened]
 * @param {String} [propStr]
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
            propStr + (propStr ? "." : "") + (isArray ? `[${key}]` : key);
        if (isPlainObject(val) || Array.isArray(val)) {
            flattenObject(val, flattened, nestedPropStr);
        } else {
            flattened[nestedPropStr] = val;
        }
    });
    return flattened;
};

export default flattenObject;