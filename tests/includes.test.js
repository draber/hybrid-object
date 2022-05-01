import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "../data/data.js";

test("includes", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.includes(1)).toBe(true);
    expect(eObj.includes(10)).toBe(false);
});

