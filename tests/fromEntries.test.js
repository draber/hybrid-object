import ElasticObject from "../ElasticObject.js";
import {
    entryMap
} from "../data/data.js";

test("fromEntries", () => {
    const eObj1 = new ElasticObject({});
    const eObj2 = eObj1.fromEntries(entryMap);
    expect(eObj2.constructor.name).toBe("ElasticObject");
    expect(eObj2.get('baz')).toBe(42);
});


