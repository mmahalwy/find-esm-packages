const findEsmPackages = require('../');

describe('find-esm-packages', () => {
  test('finds dependencies', () => {
    const packages = findEsmPackages({ dirname: __dirname });

    expect(packages).toEqual(['foo']);
  });

  test('finds devDependencies', () => {
    const packages = findEsmPackages({
      dirname: __dirname,
      checks: ['devDependencies'],
    });

    expect(packages).toEqual(['bar']);
  });

  test('finds peerDependencies', () => {
    const packages = findEsmPackages({
      dirname: __dirname,
      checks: ['peerDependencies'],
    });

    expect(packages).toEqual(['hello']);
  });

  test('paths', () => {
    const packages = findEsmPackages({
      dirname: __dirname,
      paths: true,
    });

    expect(packages).toEqual([
      {
        name: 'foo',
        main: 'foo/lib/index.js',
        module: 'foo/esm/index.esm.js',
      },
    ]);
  });
});
