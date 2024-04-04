import { BiSitemap } from "react-icons/bi";
import SidebarItem from "./SidebarItem";

const itemMenu = [
  { title: "Animal", href: "/items/animal" },
  { title: "General Symptom", href: "/items/symptom" },
  { title: "Urgent Symptom", href: "#urgentSymptom" },
];

const SidebarDropdownItem = () => {
  return (
    <div className="flex flex-col bg-zinc-700 mx-6 rounded-lg py-4">
      <div className="flex text-lg gap-3 text-white pb-4 px-4">
        <BiSitemap className="text-[25px]" />
        Items
      </div>
      {itemMenu.map((item, index) => (
        <div key={index} className="px-2">
          <SidebarItem
            title={item.title}
            href={item.href}
            className="pl-3 transition hover:w-full hover:bg-zinc-800 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default SidebarDropdownItem;
