import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "../data/data.js";

test("cloneProperty", () => {
    const eObj = new ElasticObject(dbStyle);
    let clonedProp = eObj.cloneProperty("a.aa.aaa");
    expect(eObj.get("a.aa.aaa")).toBe(clonedProp);
    eObj.set("a.aa.aaa", "new value");
    expect(eObj.get("a.aa.aaa")).not.toBe(clonedProp);
    let clonedPropObj = eObj.cloneProperty("a.aa");
    expect(clonedPropObj.constructor.name).toBe("ElasticObject");
});

test("cloneProperty vs. get", () => {
    const eObj = new ElasticObject(dbStyle);
    let getProp = eObj.get("a");
    getProp.set("aa.aaa", "new value");
    expect(eObj.get("a")).toStrictEqual(getProp);
});
