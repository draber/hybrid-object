import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "../data/data.js";

test("toJson, ugly", () => {
    const eObj = new ElasticObject(dbStyle);
    const json = '{"a":{"aa":{"aaa":1},"ab":42},"b":{"ba":{"baa":2},"bb":43},"c":{"ca":{"caa":3},"cb":44}}';
    expect(eObj.toJson()).toBe(json);
    expect(JSON.stringify(eObj)).toBe(json);
});


