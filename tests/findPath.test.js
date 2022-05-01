import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "./assests/data.js";

test("findPath", () => {
    const eObj = new ElasticObject(dbStyle);
    expect(eObj.findPath((value) => value === 43)).toBe("b.bb");
    expect(eObj.findPath((value) => value > 50)).toBeUndefined();
});

