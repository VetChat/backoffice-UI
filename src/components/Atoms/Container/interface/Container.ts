import { ReactElement } from "react";

export interface SidebarDropdownItemProps {
  title: string;
  icon?: ReactElement;
  // menuItems: { title: string; href?: string }[];
  children: React.ReactNode;
}
