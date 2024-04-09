import { TbReportSearch } from "react-icons/tb";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { BiSitemap } from "react-icons/bi";
import { DropDownMenu } from "./interface/Sidebar";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import UserProfile from "./UserProfile/UserProfile";

const itemMenus: DropDownMenu[] = [
  { title: "Animal", href: "/animal" },
  { title: "General Symptom", href: "/symptom" },
];

const knowledgeMenus: DropDownMenu[] = [
  { title: "Urgent Symptoms", href: "/urgent" },
  { title: "Question Sets", href: "/questionSet" },
];

const Sidebar = () => {
  return (
    <div className="h-full bg-[#2F3337] w-[350px] fixed overflow-auto z-50">
      <div className="flex flex-col w-[350px] items-center justify-center h-[90px] bg-[#202122] fixed">
        <div className="text-3xl text-[#03A96B]">VetChat</div>
        <div className="text-sm text-[#03A96B]">BackOffice</div>
      </div>
      <div className="flex flex-col pt-5 mt-[90px]">
        <div className="pl-10">
          <SidebarItem
            title="Case Summary"
            icon={<TbReportSearch />}
            href="/"
          />
        </div>
        <SidebarDropdown
          title="Items"
          icon={<BiSitemap />}
          menuItems={itemMenus}
        />
        <SidebarDropdown
          title="Knowledge"
          icon={<BsFillJournalBookmarkFill className="text-[22px]" />}
          menuItems={knowledgeMenus}
        />
        <UserProfile />
      </div>
    </div>
  );
};

export default Sidebar;
