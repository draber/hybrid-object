# Elastic Object

The most common collection types in JavaScript are _Plain Objects_, _Arrays_, _Maps_ and _Sets_. They all have their rightful place, their advantages and shortcomings; the latter show especially on deeply nested collections. You can look at _Elastic Objects_ as a hybrid between an _Object_ and an _Array_ - you get the benefits of both, but you can also add new properties to the object. Since it is an extension of plain objects, you can use it like an object from the start. 

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
_Elastic Objects_ are extensions of plain objects so everything you can do with plain objects can be done with elastic objects, too. There are some differences, though:
- Static methods, such as `assign()` or `create()`, which you would expect to return regular objects, will return elastic objects instead.
- `keys()`, `values()`, `entries()` and `assign()` are also available as instance methods. When you use them in this way, they refer to `this`. In the case of `assign()`, `this` is the first argument.

### Accessors
Accessing properties with `set('path.to.property')` is a common implementation pattern, but it's not native to JavaScript. With `set()`, `get()`, `has()` and `unset()` _Elastic Object_ has built-in support for this pattern. To avoid confusion with JavaScript's native [dot notation](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation), this document uses the term `dotted.string.notation` instead. The feature is powered by Sindre Sorhus' [dot-prop](//www.npmjs.com/package/dot-prop) library.

### Array methods
Not all array methods make sense on an object, but `every()`, `filter()`, `find()`, `forEach()`, `includes()`, `length()`, `map()`, `reduce()`, `some()` and `sort()` certainly do and _Elastic Object_ has them all. There is also `findPath()` as an equivalent of `findIndex()`. All methods work pretty much like their array counterparts, which means they generally refer to the top level of the object. `findPath()`, however, searches all levels as long as the values are either arrays or objects. Note that `length()` is, contrary to the array implementation, built out as a function.

### Other methods
`toJson()`, `clone()` and `cloneProperty()` cover common tasks and it makes sense to have them available. The `flatten()` method finally returns a version of the object with all nested paths converted to strings in `dotted.string.notation`. The above example as a flat object looks like this:

```javascript
{
    "path.to.string": "foo",
    "path.to.integer": 42,
    "another.path.to.float": 3.14
}
```

### Adding properties
You aren't limited to _Elastic Object's_ native functionality. It has a plugin system that allows you to pass an object of new methods as an argument to the constructor. `/plugins/array.js` and `/plugins/native.js` are loaded by default and you can check out these modules if you wish to add your own set of methods.

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
```



## Method overview
The following table is an overview of the available methods. The links in the first column point to this documentation, the second column to the original documentation which you might also find helpful.

| Method | External reference | Notes |
|:-------|:-------------------|:------|
| [`eObj.assign()`](//elastic-object.netlify.app/ElasticObject.html#assign) | [`Object.assign()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | static: `ElasticObject.assign(eObj, rObj)`, instance: `eObj.assign(rObj)` |
| [`eObj.clone()`](//elastic-object.netlify.app/ElasticObject.html#clone) | [`stucturedClone()`](//developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones the whole object |
| [`eObj.cloneEntry()`](//elastic-object.netlify.app/ElasticObject.html#cloneEntry) | [`stucturedClone()`](//developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones any property of the object |
| [`eObj.entries()`](//elastic-object.netlify.app/ElasticObject.html#entries) | [`Object.entries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | static: `ElasticObject.entries(eObj)`, instance: `eObj.entries()` |
| [`eObj.every()`](//elastic-object.netlify.app/ElasticObject.html#every) | [`Array.every()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | Identical |
| [`eObj.filter()`](//elastic-object.netlify.app/ElasticObject.html#filter) | [`Array.filter()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Returns a _Elastic Object_, chain `.finalValues()` to get only the values |
| [`eObj.finalValues()`](//elastic-object.netlify.app/ElasticObject.html#finalValues)  | | Values of the flattened object |
| [`eObj.find()`](//elastic-object.netlify.app/ElasticObject.html#find)  | [`Array.find()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  | Identical |
| [`eObj.findPath()`](//elastic-object.netlify.app/ElasticObject.html#findPath) | [`Array.findIndex()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Returns path in `dotted.string.notation` rather than an index |
| [`eObj.flatten()`](//elastic-object.netlify.app/ElasticObject.html#flatten) | | Flattened version of the object |
| [`eObj.forEach()`](//elastic-object.netlify.app/ElasticObject.html#forEach) | [`Array.forEach()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | Identical |
| [`eObj.get()`](//elastic-object.netlify.app/ElasticObject.html#get)  | [`Lodash.get()`](//lodash.com/docs/#get) | Same signature, but without the first argument `object` |
| [`eObj.has()`](//elastic-object.netlify.app/ElasticObject.html#has)  | [`Lodash.has()`](//lodash.com/docs/#has) | Same signature, but without the first argument `object` |
| [`eObj.includes()`](//elastic-object.netlify.app/ElasticObject.html#includes) | [`Array.includes()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)  | Identical |
| [`eObj.keys()`](//elastic-object.netlify.app/ElasticObject.html#keys) | [`Object.keys()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | static: `ElasticObject.keys(eObj)`, instance: `eObj.keys()` |
| [`eObj.length()`](//elastic-object.netlify.app/ElasticObject.html#length) | [`Array.length()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) | In difference to `Array.length`, this is implemented as a function |
| [`eObj.map()`](//elastic-object.netlify.app/ElasticObject.html#map) | [`Array.map()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Identical |
| [`eObj.paths()`](//elastic-object.netlify.app/ElasticObject.html#paths)  | | Keys of the flattened object |
| [`eObj.reduce()`](//elastic-object.netlify.app/ElasticObject.html#reduce)  | [`Lodash.reduce()`](//lodash.com/docs/#reduce) | Same signature, but without the first argument `object` |
| [`eObj.set()`](//elastic-object.netlify.app/ElasticObject.html#set) | [`Lodash.set()`](//lodash.com/docs/#set)  | Same signature, but without the first argument `object` |
| [`eObj.some()`](//elastic-object.netlify.app/ElasticObject.html#some)  | [`Array.some()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | Identical |
| [`eObj.sort()`](//elastic-object.netlify.app/ElasticObject.html#sort) | [`Array.sort()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | Identical |
| [`eObj.toJson()`](//elastic-object.netlify.app/ElasticObject.html#toJson)  | [`JSON.stringify()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | With boolean `pretty` argument for pretty-print |
| [`eObj.unset()`](//elastic-object.netlify.app/ElasticObject.html#unset) | [`Lodash.unset()`](//lodash.com/docs/#unset) | Same signature, but without the first argument `object` |
| [`eObj.values()`](//elastic-object.netlify.app/ElasticObject.html#values)  | [`Object.values()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | static: `ElasticObject.values(eObj)`, instance: `eObj.xalues()` |


