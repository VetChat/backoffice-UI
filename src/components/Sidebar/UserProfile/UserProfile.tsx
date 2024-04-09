import { Avatar } from "@mantine/core";
import { IoIosMore } from "react-icons/io";

const UserProfile = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center mt-10">
      <div className="flex justify-between items-center w-60">
        <div className="flex items-center">
          <Avatar size={40} color="cyan" radius="xl">
            PK
          </Avatar>
          <div className="ml-3">
            <div className="text-sm font-semibold text-gray-400">
              Pakapop Cheunchomsirakul
            </div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
        <div className="mr-3">
          <div className="text-sm font-semibold text-gray-400">
            <IoIosMore size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
