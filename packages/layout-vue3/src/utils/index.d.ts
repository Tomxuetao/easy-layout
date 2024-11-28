import { type TreeNode } from '../layout/types'
export declare const clapTree: (
  menuList: TreeNode[],
  mapKey?: keyof TreeNode,
) => Map<any, TreeNode>
export declare const computedRootNode: (
  curId: string,
  menuMap: Map<string, TreeNode>,
) => TreeNode | undefined
