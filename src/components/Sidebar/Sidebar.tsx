import { TbBulb, TbReportSearch } from "react-icons/tb";
import SidebarItem from "./SidebarItem";
import SidebarDropdownItem from "./SidebarDropdownItem";

const Sidebar = () => {
  return (
    <div className="h-full bg-[#2F3337] w-[350px] fixed">
      <div className="flex flex-col items-center justify-center h-[90px] bg-[#202122]">
        <div className="text-3xl text-[#03A96B]">VetChat</div>
        <div className="text-sm text-[#03A96B]">BackOffice</div>
      </div>
      <div className="flex flex-col pt-5">
        <div className="pl-10">
          <SidebarItem
            title="Case Summary"
            icon={<TbReportSearch className="text-[25px]" />}
            href="/"
          />
          <SidebarItem
            title="Question Set"
            icon={<TbBulb className="text-[25px]" />}
            href="#question"
          />
        </div>
        <SidebarDropdownItem />
      </div>
    </div>
  );
};

export default Sidebar;
