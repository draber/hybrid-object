import ElasticObject from '../ElasticObject.js';
import { numbers, primitives } from '../data/data.js';

test('ElasticObject.assign', () => {
    const eObj = ElasticObject.assign(numbers, primitives);
    expect(eObj.get("path.to.string")).toBe("string");
    expect(eObj.get("a")).toBe(1);
  });
