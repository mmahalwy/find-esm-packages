const fs = require('fs');
const path = require('path');

module.exports = function(
  { dirname = process.cwd(), checks = ['dependencies'], paths = false } = {}
) {
  const esmPackages = [];
  const rootPackage = JSON.parse(
    fs.readFileSync(path.join(dirname, './package.json'), 'utf8')
  );

  checks.forEach(check => {
    if (!rootPackage[check]) {
      throw new Error(`Missing ${check} in package.json`);
    }

    Object.keys(rootPackage[check]).forEach(dependency => {
      const dependencyPackage = JSON.parse(
        fs.readFileSync(
          path.join(dirname, `./node_modules/${dependency}/package.json`),
          'utf8'
        )
      );

      if (dependencyPackage.module) {
        if (paths) {
          esmPackages.push({
            name: dependency,
            main: `${dependency}/${dependencyPackage.main}`,
            module: `${dependency}/${dependencyPackage.module}`,
          });
        } else {
          esmPackages.push(dependency);
        }
      }
    });
  });

  return esmPackages;
};
