export interface LayoutResolverOptions {
  /**
   * Set the referenced module type.
   *
   * @default 'esm'
   */
  module?: 'esm' | 'cjs'

  /**
   * exclude components or API that do not require automatic import
   *
   * @default []
   */
  exclude?: string[]
}

/**
 * Button->button; ButtonGroup->button-group
 */
function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

function getModuleType(options: LayoutResolverOptions): string {
  const { module = 'esm' } = options

  return module === 'cjs' ? 'lib' : 'es'
}

function getSideEffects(dirName: string, options: LayoutResolverOptions) {
  const moduleType = getModuleType(options)

  return `layout-vue3/${moduleType}/${dirName}/style/index`
}

export function LayoutResolver(options: LayoutResolverOptions = {}) {
  const moduleType = getModuleType(options)

  return {
    type: 'component' as const,

    resolve: (name: string) => {
      if (name.startsWith('ev-')) {
        const partialName = name.slice(3)
        if (!options.exclude?.includes(partialName)) {
          return {
            name: partialName,
            from: `layout-vue3/${moduleType}`,
            sideEffects: getSideEffects(kebabCase(partialName), options)
          }
        }
      }
    }
  }
}
