/**
 * Sort an array by its values, optionally with a comparator function. Key-value associations are preserved.
 * Equivalent of Array.sort
 * @param {Function} [compareFn] Args: a, b
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const obj = {
 *     a: 3,
 *     b: 2,
 *     c: 1,
 * };
 * const sorted = obj.sort((a, b) => {
 *    return a - b;
 * });
 * console.log(sorted); // ElasticObject { c: 1, b: 2, a: 3 }
 * console.log(sorted.keys()); // ['c', 'b', 'a']
 * console.log(sorted.values()); // [1, 2, 3]
 */
const sort = function (compareFn) {
    compareFn = compareFn || ((a, b) => a - b);
    const sortedObj = this.create({});
    const entries = this.entries();
    const sorted = entries.sort(
        ([keyA, valueA], [keyB, valueB]) => {
            if (compareFn) {
                return compareFn(valueA, valueB);
            }
            return valueA - valueB;
        }
    );
    sorted.forEach(([key, value]) => {
        sortedObj.set(key, value);
    });
    return sortedObj;
};

export default sort;