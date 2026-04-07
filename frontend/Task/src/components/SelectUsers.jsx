import React, { useEffect, useState } from "react";
import { axiosIntance } from "../utils/AxiosInstance";
import { API_PATHS } from "../utils/apiPath";
import { LuUser } from "react-icons/lu";
import Model from "./Model";
import AvatarGroup from "./AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUser, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  
  const selectedUserAvatars = allUser
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  const getAllUser = async () => {
    try {
      const response = await axiosIntance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data.data) {
        setAllUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModelOpen(false);
  };


  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModelOpen(true)}>
          <LuUser className="text-sm" />
          Add Members
        </button>
      )}

      {
        selectedUserAvatars.length > 0 && (
            <div className="cursor-pointer" onClick={()=>setIsModelOpen(true)}>
                <AvatarGroup avartars={[selectedUserAvatars]} maxVisible={3}/>
            </div>
        )
      }

      <Model
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUser.map((user) => (
            <div
              className="flex items-center gap-4 p-3 border-b border-gray-200"
              key={user._id}
            >
              <img
                src={user.profileImageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-4">
            <button className="card-btn" onClick={()=>setIsModelOpen(false)}>
                Cancel
            </button>
            <button className="card-btn-fill" onClick={handleAssign}>
                Done
            </button>
        </div>
      </Model>
    </div>
  );
};

export default SelectUsers;
