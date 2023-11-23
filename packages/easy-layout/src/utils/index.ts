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
