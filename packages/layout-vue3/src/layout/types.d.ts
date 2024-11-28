export type TreeNode = {
  id: string;
  pid?: string;
  text: string;
  icon: string;
  url?: string;
  isMenu: boolean;
  children: TreeNode[];
};
