import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "./assests/data.js";

test("clone", () => {
    const eObj = new ElasticObject(dbStyle);
    let clone = eObj.clone();
    expect(clone.constructor.name).toBe("ElasticObject");
    eObj.set("a.aa.aaa", 2);
    expect(eObj).not.toStrictEqual(clone);
});