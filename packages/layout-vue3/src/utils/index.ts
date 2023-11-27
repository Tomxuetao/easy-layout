import { type TreeNode } from '../layout/types'

export const clapTree = (menuList: TreeNode[]) => {
  const menuMap: Map<string, TreeNode> = new Map()

  const recursion = (menuList: TreeNode[], parent: TreeNode | undefined) => {
    for (const node of menuList) {
      menuMap.set(
        node.id,
        Object.assign(node, { pid: parent ? parent.id : undefined })
      )
      recursion(node.children, node)
    }
  }

  recursion(menuList, undefined)

  return menuMap
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
