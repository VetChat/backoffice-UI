import { ReactElement } from "react";

export interface SidebarItemProps {
  title: string;
  icon?: ReactElement;
  href: string;
  className?: string;
  activeStyle?: string;
  defaultStyle?: string;
}

export interface SidebarDropdownProps {
  title: string;
  icon?: ReactElement;
  menuItems?: DropDownMenu[];
}

export interface DropDownMenu {
  title: string;
  href: string;
}
