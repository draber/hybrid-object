import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "./assests/data.js";

test("every", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.every((value) => value > 0)).toBe(true);
    expect(eObj.every((value) => value < 10)).toBe(true);
    expect(eObj.every((value) => value < 5)).toBe(false);
});
