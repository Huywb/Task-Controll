import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/UserCard";
import toast from "react-hot-toast";

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  console.log(allUsers);

  const getAllUser = async () => {
    try {
      const response = await axiosIntance.get(API_PATHS.USERS.GET_ALL_USERS);

      if (response.data.data?.length > 0) {
        setAllUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleDownLoadReport = async () => {
    try {
      const response = await axiosIntance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlxs");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Falled to download exprense details. Please try again");
    }
  };
  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="ml-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>

          <button
            className="flex md:flex download-btn"
            onClick={handleDownLoadReport}
          >
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {allUsers.map((user) => (
          <UserCard key={user._id} userInfo={user} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ManageUser;
