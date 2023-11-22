import { join } from 'node:path'
import {pascalize,
  getComponents,
  smartOutputFile,
  normalizePath} from '../common/index.js'
import { SRC_DIR, getPackageJson, getVantConfig } from '../common/constant.js'
function getPathByName(name, pathResolver) {
  let path = join(SRC_DIR, name)
  if (pathResolver) {
    path = pathResolver(path)
  }
  return normalizePath(path)
}
function genImports(names, pathResolver, namedExport) {
  return names
    .map((name) => {
      const pascalName = pascalize(name)
      const importName = namedExport ? `{ ${pascalName} }` : pascalName
      const importPath = getPathByName(name, pathResolver)
      return `import ${importName} from '${importPath}';`
    })
    .join('\n')
}
function genExports(names, pathResolver, namedExport) {
  if (namedExport) {
    const exports = names
      .map((name) => `export * from '${getPathByName(name, pathResolver)}';`)
      .join('\n')
    return `
  export {
    install,
    version,
  };
  ${exports}
`
  }
  return `
  export {
    install,
    version,
    ${names.map(pascalize).join(',\n  ')}
  };
  `
}
export function genPackageEntry({ outputPath, pathResolver }) {
  var _a, _b
  const names = getComponents()
  const vantConfig = getVantConfig()
  const namedExport =
    ((_a = vantConfig.build) === null || _a === void 0
      ? void 0
      : _a.namedExport) || false
  const skipInstall = (
    ((_b = vantConfig.build) === null || _b === void 0
      ? void 0
      : _b.skipInstall) || []
  ).map(pascalize)
  const version = process.env.PACKAGE_VERSION || getPackageJson().version
  const components = names.map(pascalize)
  const content = `${genImports(names, pathResolver, namedExport)}

const version = '${version}';

function install(app) {
  const components = [
    ${components.filter((item) => !skipInstall.includes(item)).join(',\n    ')}
  ];

  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

${genExports(names, pathResolver, namedExport)}

export default {
  install,
  version
};
`
  smartOutputFile(outputPath, content)
}
