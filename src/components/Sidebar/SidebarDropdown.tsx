import SidebarDropdownContainer from "../Atoms/Container/SidebarDropdownContainer";
import SidebarItem from "./SidebarItem";
import { SidebarDropdownProps } from "./interface/Sidebar";

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  title,
  icon,
  menuItems,
}) => {
  return (
    <SidebarDropdownContainer title={title} icon={icon}>
      {menuItems?.map((item, index) => (
        <div key={index}>
          <SidebarItem
            title={item.title}
            href={item.href || ""}
            className="pl-3 transition hover:w-full hover:bg-zinc-800 rounded-lg"
          />
        </div>
      ))}
    </SidebarDropdownContainer>
  );
};

export default SidebarDropdown;
