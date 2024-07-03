# Elastic Object

![](https://img.shields.io/github/license/draber/elastic-object.svg)
![](https://img.shields.io/github/package-json/v/draber/elastic-object.svg?)
![](https://img.shields.io/bundlephobia/min/elastic-object.svg)
[![DeepScan grade](https://deepscan.io/api/teams/17732/projects/21076/branches/594831/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=17732&pid=21076&bid=594831)

_Plain Objects_ are great for handling data, but they can be a bit clunky. This is where _Elastic Object_ comes in. On top of the regular object functionality, it features `get()` and `set()` with `dotted.string.notation`, as well as loops and all the other good stuff you already know from _Arrays_, _Maps_ or _Sets_. It is  easily extendable in case you want to add your own methods. And it's not huge either. 

## Installation

```bash
npm i elastic-object
```

## Usage

Below is a simple example of how to create an _Elastic Object_. For the methods, please refer to the [complete documentation](//elastic-object.netlify.app).
    
```javascript
import ElasticObject from 'elastic-object'; // note that ElasticObject is implemented as ESM and not in CJS

const eObj = new ElasticObject({
    path: {
        to: {
            string: "foo",
            integer: 42
        },
    },
    another: {
        path: {
            to: {
                float: 3.14
            }
        }
    }
});

console.log(eObj.get('path.to.string')); // "foo"
eObj.set('path.to.string', "bar");
console.log(eObj.get('path.to.string')); // "bar"
eObj.path.to.string = "quux";
console.log(eObj.get('path.to.string')); // "quux"

eObj.forEach((value, key) => {
    console.log(key, value); // "path", { to: { string: "bar", integer: 42 } } etc.
});
```

## Features

### Standard object methods
_Elastic Objects_ are extensions of plain objects, so everything you can do with plain objects can be done with elastic objects, too. There are some differences, though:
- Static methods, such as `assign()` or `create()`, which you would expect to return regular objects, will return elastic objects instead.
- `keys()`, `values()`, `entries()`, `assign()`, `create()` and `fromEntries()` are also available as instance methods. From within the instance `keys()`, `values()`, `entries()` refer to `this` and take no arguments. `assign()` uses `this` as the `target` argument. `create()` and `fromEntries()` work exactly like their static counterparts.

### Accessors
Accessing properties with `set('path.to.property')` is a common implementation pattern, but it's not native to JavaScript. With `set()`, `get()`, `has()` and `unset()` _Elastic Object_ has built-in support for this pattern. To avoid confusion with JavaScript's native [dot notation](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation), this document uses the term `dotted.string.notation` instead. The feature is powered by Sindre Sorhus' [dot-prop](//www.npmjs.com/package/dot-prop) library.

### Array methods
Not all array methods make sense on an object, but `every()`, `filter()`, `find()`, `forEach()`, `includes()`, `length()`, `map()`, `reduce()`, `reduceRight()`, `some()` and `sort()` certainly do; _Elastic Object_ has them all. There is also `findPath()` as an equivalent of `findIndex()`. All methods work pretty much like their array counterparts, which means they generally refer to the top level of the object. `findPath()`, however, searches all levels as long as the values are either arrays or objects. Note that `length()` is, contrary to the array implementation, built out as a function.

### Other methods
`toJson()`, `clone()` and `cloneProperty()` cover common tasks and it makes sense to have them available. The `flatten()` method finally returns a version of the object with all nested paths converted to strings in `dotted.string.notation`. The above example as a flat object looks like this:

```javascript
{
    'path': {to: {…}}
    'path.to': {string: 'string', integer: 42, float: 3.14, boolean: true, null: null}
    'path.to.boolean': true
    'path.to.float': 3.14
    'path.to.integer': 42
    'path.to.null': null
    'path.to.string': "string"
}
```

### Chainability
Whenever a method would normally return an object, an elastic object with the same plugins will be returned instead. This means that you can chain methods, like this:

```javascript
eObj.set('path.to.string', "foo").set('path.to.integer', 42).set('another.path.to.float', 3.14);
eObj.get('path.to.a.plain.object').filter(value => value > 3).values();
```

### Adding properties
You aren't limited to _Elastic Object's_ native functionality. It has a plugin system that allows you to pass an object of new methods as an argument to the constructor. `/plugins/array.js` and `/plugins/native.js` are loaded by default and you can check out these modules if you wish to add your own set of methods. Methods are added to the prototype chain, which may make them available project-wide depending on your implementation . Make sure that they implement the chainability paradigm as mentioned above.

Below is a short example of how this works. Keep in mind to use regular function syntax to ensure access to `this`.

```javascript
const myPlugins = {
    methodA: function() {        
        console.log(this);
    }
    // more methods
}

const data = { bar: 42 };

// standard Elastic Object
const eObj1 = new ElasticObject(data);
eObj1.methodA(); // TypeError: eObj1.methodA is not a function

// Elastic Object with custom methods
const eObj2 = new ElasticObject(data, myPlugins);
eObj2.methodA(); // ElasticObject { bar: 42 }

// Load plugins after creation
const eObj3 = ElasticObject.create(data);
eObj3.methodA(); // TypeError: eObj1.methodA is not a function
eObj3.loadPlugins(myPlugins); // now it works
eObj3.methodA(); // ElasticObject { bar: 42 }



// the magic formula for chainability:
import isPlainObject from "whats-the-type/isPlainObject.js";

const foo = function() {
    const value = {a: 1}; // or whereever your value comes from
    return isPlainObject(value) ? this.create(value) : value;
}
```



## Method overview
The following table is an overview of the available methods. The links in the first column point to this documentation, the second column to the original documentation which you might also find helpful.

| Method | External reference | Notes |
|:-------|:-------------------|:------|
| [`eObj.assign()`](//elastic-object.netlify.app/ElasticObject.html#assign) | [`Object.assign()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | Instance flavor: `eObj.assign(...sources)`, `this` is the target |
| [`ElasticObject.assign()`](//elastic-object.netlify.app/Static.html#assign) | [`Object.assign()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | Static flavor: `ElasticObject.assign(target, ...sources)` |
| [`eObj.create()`](//elastic-object.netlify.app/ElasticObject.html#create) | [`Object.create()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) | Instance flavor: `eObj.create(anyObj)` |
| [`ElasticObject.create()`](//elastic-object.netlify.app/Static.html#create) | [`Object.create()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) | Static flavor: `ElasticObject.create(anyObj)` |
| [`eObj.clone()`](//elastic-object.netlify.app/ElasticObject.html#clone) | [`stucturedClone()`](//developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones the whole object |
| [`eObj.cloneEntry()`](//elastic-object.netlify.app/ElasticObject.html#cloneEntry) | [`stucturedClone()`](//developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones any property of the object |
| [`eObj.entries()`](//elastic-object.netlify.app/ElasticObject.html#entries) | [`Object.entries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | Instance flavor: `eObj.entries()`, uses `this` |
| [`ElasticObject.entries()`](//elastic-object.netlify.app/Static.html#entries) | [`Object.entries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | Static flavor: `ElasticObject.entries(anyObj)` |
| [`eObj.every()`](//elastic-object.netlify.app/ElasticObject.html#every) | [`Array.every()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | Same signature and usage |
| [`eObj.filter()`](//elastic-object.netlify.app/ElasticObject.html#filter) | [`Array.filter()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Returns an _Elastic Object_, chain `.values()` to get only the values |
| [`eObj.find()`](//elastic-object.netlify.app/ElasticObject.html#find)  | [`Array.find()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  | Same signature and usage |
| [`eObj.findPath()`](//elastic-object.netlify.app/ElasticObject.html#findPath) | [`Array.findIndex()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Returns path in `dotted.string.notation` rather than an index |
| [`eObj.flatten()`](//elastic-object.netlify.app/ElasticObject.html#flatten) | | Flattened version of the object |
| [`eObj.forEach()`](//elastic-object.netlify.app/ElasticObject.html#forEach) | [`Array.forEach()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | Same signature and usage |
| [`eObj.fromEntries()`](//elastic-object.netlify.app/ElasticObject.html#fromEntries) | [`Object.fromEntries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) | Instance flavor: `eObj.fromEntries(iteratable)` |
| [`ElasticObject.fromEntries()`](//elastic-object.netlify.app/Static.html#fromEntries) | [`Object.fromEntries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) | Static flavor: `ElasticObject.fromEntries(iteratable)` |
| [`eObj.get()`](//elastic-object.netlify.app/ElasticObject.html#get)  | [`getProperty()`](//www.npmjs.com/package/dot-prop) | Same signature, but without the first argument `object` |
| [`eObj.has()`](//elastic-object.netlify.app/ElasticObject.html#has)  | [`hasProperty()`](//www.npmjs.com/package/dot-prop) | Same signature, but without the first argument `object` |
| [`eObj.includes()`](//elastic-object.netlify.app/ElasticObject.html#includes) | [`Array.includes()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)  | Same signature and usage |
| [`eObj.keys()`](//elastic-object.netlify.app/ElasticObject.html#keys) | [`Object.keys()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | Instance flavor: `eObj.keys()`, uses `this` |
| [`ElasticObject.keys()`](//elastic-object.netlify.app/Static.html#keys) | [`Object.keys()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | Static flavor: `ElasticObject.keys(anyObj)` |
| [`eObj.length()`](//elastic-object.netlify.app/ElasticObject.html#length) | [`Array.length`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) | In difference to `Array.length`, this is implemented as a function |
| [`eObj.map()`](//elastic-object.netlify.app/ElasticObject.html#map) | [`Array.map()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Same signature and usage |
| [`eObj.paths()`](//elastic-object.netlify.app/ElasticObject.html#paths)  | | Keys of the flattened object |
| [`eObj.reduce()`](//elastic-object.netlify.app/ElasticObject.html#reduce)  | [`Array.reduce()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) | Same signature and usage |
| [`eObj.reduceRight()`](//elastic-object.netlify.app/ElasticObject.html#reduceRight)  | [`Array.reduceRight()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) | Same signature and usage |
| [`eObj.set()`](//elastic-object.netlify.app/ElasticObject.html#set) | [`setProperty()`](//www.npmjs.com/package/dot-prop)  | Same signature, but without the first argument `object` |
| [`eObj.some()`](//elastic-object.netlify.app/ElasticObject.html#some)  | [`Array.some()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | Same signature and usage |
| [`eObj.sort()`](//elastic-object.netlify.app/ElasticObject.html#sort) | [`Array.sort()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | Same signature and usage |
| [`eObj.toJson()`](//elastic-object.netlify.app/ElasticObject.html#toJson)  | [`JSON.stringify()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | With boolean `pretty` argument for pretty-print |
| [`eObj.unset()`](//elastic-object.netlify.app/ElasticObject.html#unset) | [`deleteProperty()`](//www.npmjs.com/package/dot-prop)  | Same signature, but without the first argument `object` |
| [`eObj.values()`](//elastic-object.netlify.app/ElasticObject.html#values) | [`Object.values()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | Instance flavor: `eObj.values()`, uses `this` |
| [`ElasticObject.values()`](//elastic-object.netlify.app/Static.html#values) | [`Object.values()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | Static flavor: `ElasticObject.values(anyObj)` |



## Resources

- Repository: [github.com/draber/elastic-object](https://github.com/draber/elastic-object) 
- Package: [npmjs.com/package/elastic-object](https://npmjs.com/package/elastic-object)
- Docs: [elastic-object.netlify.app](https://elastic-object.netlify.app/)
