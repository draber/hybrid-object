import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "../data/data.js";

test("length", () => {
    const eObj = new ElasticObject(dbStyle);
    expect(eObj.length()).toBe(3);
    eObj.set("random.path", "some Value");
    expect(eObj.length()).toBe(4);
});
