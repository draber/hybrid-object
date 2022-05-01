import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "./assests/data.js";

test("some", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.some((value) => value > 0)).toBe(true);
    expect(eObj.some((value) => value < 10)).toBe(true);
    expect(eObj.some((value) => value < 5)).toBe(true);
});
