import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import { PRIORITY_DATA } from "../../utils/data";
import SelectDropdown from "../../components/SelectDropdown";
import SelectUsers from "../../components/SelectUsers";
import TodoListInput from "../../components/input/TodoListInput";
import AddAttachmentsInput from "../../components/input/AddAttachmentsInput";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import moment from "moment";
import Model from "../../components/Model";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  console.log(taskId)

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleChangeValue = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };
  console.log(taskData)

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  const createTask = async () => {

    setLoading(true)
    try {
      const todoList = taskData.todoCheckList?.map((item)=>({
        text:item,
        completed: false
      }))
      const response = await axiosIntance.post(API_PATHS.TASKS.CREATE_TASK,{
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList
      })

      toast.success('Task Created success')

      clearData()
    } catch (error) {
      console.log('Error Creating task',error)
      setLoading(false)
    } finally {
      setLoading(false)
    }

  };
  const updateTask = async () => {
    setLoading(true)
    try {
      const todoList = taskData.todoCheckList?.map((item)=>{
        const prevTodoCheckList = currentTask?.todoCheckList || []
        const matchedTask = prevTodoCheckList.find((task)=> task.text == item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false
        }
      })

      const reponse = await axiosIntance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),{
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList
      })

      toast.success("Task update Successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }


  };
  const handleSubmit = async () => {
    setError(null)
    if(!taskData.title.trim()){
      setError("Title is required")
      return
    }
    if(!taskData.description.trim()){
      setError("Description is required")
      return
    }
    if(!taskData.dueDate){
      setError("dueDate is required")
      return
    }
    if(taskData.assignedTo?.length === 0){
      setError("Task not assign to member")
      return
    }
    if(taskData.todoCheckList?.length === 0){
      setError("Add at least one todo")
      return
    }

    if(taskId){
      updateTask()
      return
    }

    createTask()
  };
  const getTaskDetailsById = async () => {
    try {
      const response = await axiosIntance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId))

      if(response.data.data){
        const taskInfo = response.data.data
        setCurrentTask(taskInfo)
        setTaskData((prev)=>({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD") : null,
          assignedTo: taskInfo?.assignedTo?.map((item)=> item?._id) || [],
          todoCheckList: taskInfo?.todoCheckList?.map((item)=>item?.text) || [],
          attachments: taskInfo?.attachments || [],

        }))
      }
    } catch (error) {
      console.log(error)
    }

  };
  const deleteTask = async () => {

    try {
      await axiosIntance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))
      setOpenDeleteAlert(false)
      toast.success("Expense details deleted sucessfully")
      navigate('/admin/tasks')
    } catch (error) {
      console.log(error.response?.data?.message || error.message)
    }

  };

  useEffect(()=>{
    if(taskId){
      getTaskDetailsById(taskId)
    }
  },[taskId])

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className={`flex items-center ${taskId ? 'justify-between' :"justify-center"}`}>
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex justify-end items-center gap-1.5 text-[13px] text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={(e) => handleChangeValue("title", e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>

              <textarea
                placeholder="Description Task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={(e) =>
                  handleChangeValue("description", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleChangeValue("priority", value)}
                  placeholder="Select Prioriry"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>

                <input
                  type="date"
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={(e) => handleChangeValue("dueDate", e.target.value)}
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">Assign To</label>
                
                <SelectUsers 
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value)=> {
                    handleChangeValue('assignedTo',value)
                  }}
                />
              </div>
            </div>


            <div className="mt-3">
                  <label className="text-xs font-medium text-slate-600">
                    TODO Checklist
                  </label>

                  <TodoListInput 
                    todoList={taskData?.todoCheckList}
                    setTodoList={(value)=>{
                      handleChangeValue('todoCheckList',value)
                    }}
                  />
            </div>

            <div className="mt-3">
                  <label className="text-xs font-medium text-slate-600">
                    Add Attachments
                  </label>

                  <AddAttachmentsInput 
                    attachments={taskData?.attachments}
                    setAttachments={(value)=>{
                      handleChangeValue('attachments',value)
                    }}
                  />
            </div>

            {
              error && (
                <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
              )
            }

            <div className="flex justify-end mt-7">
              <button className="add-btn" onClick={handleSubmit} disabled={loading}>
                  {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <Model 
        isOpen={openDeleteAlert}
        onClose={()=>setOpenDeleteAlert(false)}
        title="Delete Task"
      >

        <DeleteAlert
          content="Are you sure want to delete this task"
          onDelete={()=>deleteTask()}
        />

      </Model>
    </DashboardLayout>
  );
};

export default CreateTask;
