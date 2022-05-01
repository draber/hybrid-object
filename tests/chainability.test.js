import ElasticObject from "../ElasticObject.js";
import {
    dbStyle
} from "../data/data.js";

test("clone", () => {
    const eObj = new ElasticObject(dbStyle);
    eObj.set('path.to.string', "foo").set('path.to.new', "bar").set('another.path.to.something', "baz");    
    expect(eObj.get('path.to.string')).toBe("foo"); 
    expect(eObj.get('path.to.new')).toBe("bar");
    expect(eObj.get('another.path.to.something')).toBe("baz");
});

