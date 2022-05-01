import ElasticObject from "../ElasticObject.js";
import {
    primitives,
    numbers
} from "../data/data.js";

test("assign", () => {
    const eObj = new ElasticObject(primitives);
    expect(eObj.get('b')).toBeUndefined();
    eObj.assign(numbers);
    expect(eObj.get('b')).toBe(2);
});