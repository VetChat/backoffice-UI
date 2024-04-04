import { ReactElement } from "react";

export interface SidebarItemProps {
  title: string;
  icon?: ReactElement;
  href: string;
  className?: string;
  activeStyle?: string;
  defaultStyle?: string;
}
