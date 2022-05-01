import ElasticObject from "../ElasticObject.js";
import {
    entryMap,
    plugins
} from "./assests/data.js";

test("static-fromEntries", () => {
    const eObj1 = ElasticObject.fromEntries(entryMap);
    expect(eObj1.constructor.name).toBe("ElasticObject");
    const eObj2 = ElasticObject.fromEntries(entryMap, plugins);
    expect(eObj2.methodB()).toBe(42);
});

