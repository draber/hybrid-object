/**
 * Check whether a value is a plain object
 * @param {Any} value
 * @returns {Boolean}
 */
const isPlainObject = (value) => {
    if ([true, false, null, undefined].includes(value)) {
        return false;
    }
    return (
        typeof value === "object" &&
        Object.getPrototypeOf(value) === Object.prototype
    );
};

/**
 * Check whether a value is a plain object or an array
 * @param {Any} value
 * @returns {Boolean}
 */
const isCollection = (value) => {
    return isPlainObject(value) || Array.isArray(value);
};

/**
 * Retrieve all paths as an array in dot-notation
 * @param {Object} obj
 * @param {Array} [dotArr]
 * @param {String} [propStr]
 * @returns
 */
const flatten = (obj, flattened = {}, propStr = "") => {
    if (typeof obj === "undefined" || obj === null) {
        return flattened;
    }
    if (Array.isArray(obj)) {
        obj = {
            ...obj,
        };
    }
    Object.entries(obj).forEach(([key, val]) => {
        const nestedPropStr = propStr + (propStr ? "." : "") + key;
        if (isCollection(val)) {
            flatten(val, flattened, nestedPropStr);
        } else {
            flattened[nestedPropStr] = val;
        }
    });
    return flattened;
};

const paths = (obj, _paths = [], propStr = "") => {
    if (typeof obj === "undefined" || obj === null) {
        return _paths;
    }
    if (Array.isArray(obj)) {
        obj = {
            ...obj,
        };
    }
    Object.entries(obj).forEach(([key, val]) => {
        const nestedPropStr = propStr + (propStr ? "." : "") + key;
        if (isCollection(val)) {
            _paths.push(nestedPropStr);
            paths(val, _paths, nestedPropStr);
        } else {
            _paths.push(nestedPropStr);
        }
    });
    return _paths;
}

/**
 * Build a new object with the given path and value, the opposit of flatten()
 * @param {Object} obj 
 * @returns 
 */
const expand = (obj) => {
    const expanded = {};
    for (let [path, value] of Object.entries(obj)) {
        update(expanded, path, value);
    }
    return expanded;
};

/**
 * Returns a value based on a key, can also be `foo.bar`
 * @param {Object} obj
 * @param {String} keyStr
 * @returns {String|undefined}
 * @private
 */
const get = (obj, keyStr) => {
    const keys = keyStr.toString().split(".");
    return keys.reduce((current, token) => {
        return current?.[token];
    }, obj);
};

/**
 * Sets or deletes a value
 * @param {Object} obj
 * @param {String} keyStr
 * @param {Any|undefined}
 * @returns {Object}
 * @private
 */
const update = (obj, keyStr, value) => {
    const keys = keyStr.toString().split(".");
    const last = keys.pop();
    for (let token of keys) {
        if (!obj[token]) {
            obj[token] = {};
        }
        if (Object.prototype.toString.call(obj) !== '[object Object]') {
        //if (!isPlainObject(obj)) {
            throw `${token} is not of the type object`;
        }
        obj = obj[token];
    }
    if (typeof value !== "undefined") {
        obj[last] = value;
        return obj;
    } else {
        delete obj[last];
        return true;
    }
};

export default {
    expand,
    flatten,
    get,
    isCollection,
    isPlainObject,
    update,
    paths
};
