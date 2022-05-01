import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "../data/data.js";

test("find", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.find((value) => value > 3)).toBe(4);
    expect(eObj.find((value) => value < 5)).toBe(1);
    expect(eObj.find((value) => value > 100)).toBeUndefined();
});
