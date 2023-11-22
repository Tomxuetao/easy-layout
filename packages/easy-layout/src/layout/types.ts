export type TreeNode = {
  id: string;
  text: string;
  icon: string;
  url: string | null;
  children: TreeNode[];
};
