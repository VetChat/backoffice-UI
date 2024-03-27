import { TbBulb, TbReportSearch } from "react-icons/tb";
import SidebarItem from "./SidebarItem";
import { BiSitemap } from "react-icons/bi";
import { useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>();
  return (
    <div className="h-full bg-[#2F3337] w-[450px]">
      <div className="flex flex-col items-center justify-center h-[90px] bg-[#202122]">
        <div className="text-3xl text-[#03A96B]">VetChat</div>
        <div className="text-sm text-[#03A96B]">BackOffice</div>
      </div>
      <div className="flex flex-col pt-5">
        <SidebarItem
          title="Case Summary"
          icon={<TbReportSearch className="text-[25px]" />}
          href="/"
          onClick={() => setActiveItem("case")}
          isActive={activeItem === "case"}
        />
        <SidebarItem
          title="Question Set"
          icon={<TbBulb className="text-[25px]" />}
          href="#question"
          onClick={() => setActiveItem("question")}
          isActive={activeItem === "question"}
        />
        <SidebarItem
          title="Items"
          icon={<BiSitemap className="text-[25px]" />}
          href="#items"
          onClick={() => setActiveItem("item")}
          isActive={activeItem === "item"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
