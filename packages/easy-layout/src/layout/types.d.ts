export type TreeNode = {
  id: string;
  pid?: string;
  text: string;
  icon: string;
  url: string | null;
  children: TreeNode[];
};
