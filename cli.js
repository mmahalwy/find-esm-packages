const findEsmPackages = require('./index.js');

const packages = findEsmPackages();
console.log('Packages:');
console.log('');
console.log(packages);
