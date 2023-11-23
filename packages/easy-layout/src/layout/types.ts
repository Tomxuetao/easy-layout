import type { MenuProps, SubMenuProps, MenuItemProps } from 'element-plus'

export type TreeNode = {
  id: string;
  pid?: string;
  text: string;
  icon: string;
  url: string | null;
  children: TreeNode[];
};

export { MenuProps, SubMenuProps, MenuItemProps }
