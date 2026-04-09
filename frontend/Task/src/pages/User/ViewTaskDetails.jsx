import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoBox from "../../components/InfoBox";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroup";
import TodoCheckList from "../../components/TodoCheckList";
import Attachment from "../../components/Attachment";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";

      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosIntance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id),
      );

      console.log(response.data.data);
      if (response.data.data) {
        const taskInfo = response.data.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoCheckList = async (index) => {
    console.log("index click:", index)
  console.log("item trước khi toggle:", task?.todoCheckList[index])
    const todoCheckList = task?.todoCheckList.map((item, i) =>
    i === index ? { ...item, completed: !item.completed } : item
  );
    const taskId = id;
    try {
      const response = await axiosIntance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
        { todoCheckList },
      );

      if (response.status === 200) {
        setTask(response.data?.data || { ...task, todoCheckList });
      } else {
        todoCheckList[index].completed = !todoCheckList[index].completed;
      }

      console.log(response.data.data)
    } catch (error) {
      todoCheckList[index].completed = !todoCheckList[index].completed;
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base md:text-xl font-medium">
                  {task?.title}
                </h2>

                <div
                  className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label className="">AssignedTo</label>

                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo CheckList
                </label>

                {task?.todoCheckList?.map((item, index) => (
                  <TodoCheckList
                    key={`todo ${index}`}
                    text={item.text}
                    isChecked={item.completed}
                    onChange={() => updateTodoCheckList(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link ${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;
