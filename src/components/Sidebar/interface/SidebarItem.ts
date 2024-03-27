import { ReactElement } from "react";

export interface SidebarItemProps {
  title: string;
  icon: ReactElement;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}
