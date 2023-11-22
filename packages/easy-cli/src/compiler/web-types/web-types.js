// create web-types.json to provide autocomplete in JetBrains IDEs
export function genWebTypes(tags, options) {
  return {
    $schema:
      'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: options.name,
    version: options.version,
    contributions: {
      html: {
        tags,
        attributes: []
      }
    },
    'js-types-syntax': 'typescript'
  }
}
