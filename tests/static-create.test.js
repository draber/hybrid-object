import ElasticObject from '../ElasticObject.js';
import { numbers, plugins } from './assests/data.js';

test('ElasticObject.create', () => {
    const eObj1 = ElasticObject.create(numbers);
    expect(eObj1.constructor.name).toBe("ElasticObject");
    const eObj2 = ElasticObject.create(numbers, plugins);
    expect(eObj2.methodA()).toBe(numbers.f);
  });
