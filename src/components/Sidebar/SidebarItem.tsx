import { NavLink } from "react-router-dom";
import { SidebarItemProps } from "./interface/Sidebar";

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  href,
  className,
  activeStyle = "text-white",
  defaultStyle = "text-[#7E7E7E]",
}) => {
  const style = "flex h-full gap-3 items-center text-lg hover:text-white ";
  const activeStyling = style + activeStyle;
  const inActiveStyling = style + defaultStyle;
  return (
    <div className={`h-[60px] w-full ${className}`}>
      <NavLink
        className={({ isActive }) =>
          isActive ? activeStyling : inActiveStyling
        }
        to={href}
      >
        <div className="text-[25px]">{icon}</div>
        {title}
      </NavLink>
    </div>
  );
};

export default SidebarItem;
