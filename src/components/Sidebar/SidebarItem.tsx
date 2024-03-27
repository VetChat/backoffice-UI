import { NavLink } from "react-router-dom";
import { SidebarItemProps } from "./interface/SidebarItem";

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  href,
  onClick,
  isActive,
}) => {
  const style =
    "flex h-full gap-3 pl-10 items-center text-lg hover:text-white ";
  const activeStyle = style + "text-white";
  const defaultStyle = style + "text-[#7E7E7E]";
  return (
    <div className="h-[60px] w-full">
      <NavLink
        className={isActive ? activeStyle : defaultStyle}
        onClick={onClick}
        to={href}
      >
        {icon}
        {title}
      </NavLink>
    </div>
  );
};

export default SidebarItem;
