# find-esm-packages

Find libraries in your package.json file that have the 'module' attribute. This signifies that the library contains an esm directory that could be resolved to, thus improving tree shaking abilities. This is great to use if you're using webpack or rollup.

### Usage

```javascript
const findEsmPackages = require('find-esm-packages');

findEsmPackages();
```


### Options
#### dirname
Directory path

#### checks
Array of the dependencies to check. E.g. ['dependencies', 'devDependencies']

#### paths
Will return the `main` and `module` values.

```javascript
[
  {
    name: 'foo',
    main: 'foo/lib/index.js',
    module: 'foo/esm/index.esm.js',
  },
]
```
