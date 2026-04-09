import React, { useEffect, useState } from "react";
import { userUserAuth } from "../../hooks/userUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import moment from "moment";
import { useUserStore } from "../../context/user-store";
import InforCard from "../../components/InforCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/CustomPieChart";
import CustomBarChart from "../../components/CustomBarChart";


const COLORS= ['#8D51FF','#00B8DB','#7BCE00']

const UserDashboard = () => {
  userUserAuth();
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);


  const preparChartData = (data)=>{
    const taskDistribution = data?.taskDistribution || null
    const taskPriorityLevels = data?.taskPriorityLevels || null

    const taskDistributionData = [
      {status:"Pending", count: taskDistribution?.Pending || 0},
      {status:"In Progress", count: taskDistribution?.InProgress || 0},
      {status:"Completed", count: taskDistribution?.Completed || 0},
    ]


    setPieChartData(taskDistributionData)

    const PriorityLevelsData = [
      {status:"Low", count: taskDistribution?.Low || 0},
      {status:"Medium", count: taskDistribution?.Medium || 0},
      {status:"High", count: taskDistribution?.High || 0},
    ]
    setBarChartData(PriorityLevelsData)
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosIntance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA,
      );
      setDashboardData(response.data.data)
      preparChartData(response.data.data.charts)
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InforCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0,
            )}
            color="bg-primary"
          ></InforCard>

          <InforCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0,
            )}
            color="bg-violet-500"
          ></InforCard>

          <InforCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0,
            )}
            color="bg-cyan-500"
          ></InforCard>

          <InforCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0,
            )}
            color="bg-lime-500"
          ></InforCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
            <div className="card">
              <div className="flex items-center justify-between">
                  <h5 className="font-medium">Task Distribution</h5>
              </div>

              <CustomPieChart 
                data={pieChartData}
                colors={COLORS}
              />
            </div>
        </div>   

        <div>
            <div className="card">
              <div className="flex items-center justify-between">
                  <h5 className="font-medium">Task Priority Levels</h5>
              </div>

              <CustomBarChart 
                data={pieChartData}
              />
            </div>
        </div>   


        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>
              <button
                className="flex gap-2 items-center p-2 outline-none hover:bg-blue-100 text-[14px] text-gray-700 hover:text-gray-800 rounded-full  transition duration-300 cursor-pointer"
                onClick={onSeeMore}
              >
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
