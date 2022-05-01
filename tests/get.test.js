import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "./assests/data.js";

test("get", () => {
    const eObj = new ElasticObject(primitives);
    expect(eObj.get("path.to.string")).toBe("string");
    expect(eObj.get("path.to.integer")).toBe(42);
    expect(eObj.get("path.to.float")).toBe(3.14);
    expect(eObj.get("path.to.boolean")).toBe(true);
    expect(eObj.get("path.to.null")).toBe(null);
    expect(eObj.get("path.to.undefined")).toBeUndefined();
    expect(eObj.get("path.to").constructor.name).toBe("ElasticObject");
});
