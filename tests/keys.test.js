import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "./assests/data.js";

test("keys", () => {
    const eObj = new ElasticObject(dbStyle);
    expect(eObj.keys()).toStrictEqual(["a", "b", "c"]);
});

