import { SidebarDropdownItemProps } from "./interface/Container";

const SidebarDropdownContainer: React.FC<SidebarDropdownItemProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="flex flex-col bg-zinc-700 mx-6 rounded-lg py-4 mb-4">
      <div className="flex text-lg gap-3 text-white pb-4 px-4">
        <div className="flex items-center text-[25px]">{icon}</div>
        {title}
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
};

export default SidebarDropdownContainer;
