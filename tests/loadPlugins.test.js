import ElasticObject from "../ElasticObject.js";
import {
    numbers,
    plugins
} from "./assests/data.js";

test("loadPlugins", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.methodA).toBeUndefined();
    eObj.loadPlugins(plugins);
    expect(eObj.methodA).not.toBeUndefined();
});
