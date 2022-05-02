import ElasticObject from "../ElasticObject.js";
import {
    numbers,
    plugins
} from "../data/data.js";


test("loadPlugins", () => {
    const eObj = new ElasticObject(numbers);
    expect(eObj.methodA).toBeUndefined();
    eObj.loadPlugins({...plugins, ...{ ignore: 'not a function' }});
    expect(eObj.methodA).not.toBeUndefined();
});
