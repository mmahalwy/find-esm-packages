const fs = require('fs');

const CHECK_DEPENDENCIES = true;
const CHECK_DEV_DEPENDENCIES = false;
const CHECK_PEER_DEPENDENCIES = false;

module.exports = function ({
  checkDependencies = CHECK_DEPENDENCIES,
  checkDevDependencies = CHECK_DEV_DEPENDENCIES,
  checkPeerDependencies = CHECK_PEER_DEPENDENCIES
} = {}) {
  const esmPackages = [];
  const checks = [];
  const rootPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

  if (checkDependencies) {
    checks.push(rootPackage.dependencies);
  }

  if (checkDevDependencies) {
    checks.push(rootPackage.devDependencies);
  }

  if (checkPeerDependencies) {
    checks.push(rootPackage.checkPeerDependencies);
  }


  checks.forEach((type) => {
    Object.keys(type).forEach((dependency) => {
      const dependencyPackage = JSON.parse(fs.readFileSync(`./node_modules/${dependency}/package.json`, 'utf8'));

      if (dependencyPackage.module) {
        esmPackages.push(dependency);
      }
    });
  });

  return esmPackages;
}
