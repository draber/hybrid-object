import ElasticObject from '../ElasticObject.js';
import { numbers, primitives } from './assests/data.js';

test('ElasticObject.assign', () => {
    const eObj = ElasticObject.assign(numbers, primitives);
    expect(eObj.get("path.to.string")).toBe("string");
    expect(eObj.get("a")).toBe(1);
  });
