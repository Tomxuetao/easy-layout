import { type TreeNode } from '../layout/types'

export const clapTree = (
  menuList: TreeNode[],
  mapKey: keyof TreeNode = 'id'
) => {
  const resMap: Map<any, TreeNode> = new Map()

  const recursion = (menuList: TreeNode[], parent: TreeNode | undefined) => {
    for (const node of menuList) {
      const tempKey = node[mapKey]
      if (tempKey) {
        resMap.set(
          tempKey,
          Object.assign(node, { pid: parent ? parent.id : undefined })
        )
      }
      recursion(node.children, node)
    }
  }

  recursion(menuList, undefined)

  return resMap
}

export const computedRootNode = (
  curId: string,
  menuMap: Map<string, TreeNode>
) => {
  let topLevelId = ''
  const recursion = (id: string) => {
    const { pid } = menuMap.get(id)!
    if (pid) {
      const { id } = menuMap.get(pid)!
      recursion(id)
    } else {
      topLevelId = id
    }
  }
  recursion(curId)

  return menuMap.get(topLevelId)
}
