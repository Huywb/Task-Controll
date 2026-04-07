import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import PrivateRoutes from "./routes/privateRoutes";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUser from "./pages/Admin/ManageUser";
import UserDashboard from "./pages/User/Dashboard";
import UserTask from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./context/user-store";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <Toaster
        toastOptions={{ className: "", style: { fontSize: "13px" } }}
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Login />
              ) : user.role === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/user/dashboard" />
              )
            }
          />

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>

          {/*Admin Route */}

          <Route
            element={<PrivateRoutes allowedRoles={["admin"]}></PrivateRoutes>}
          >
            <Route
              path="/admin/dashboard"
              element={<Dashboard></Dashboard>}
            ></Route>
            <Route
              path="/admin/tasks"
              element={<ManageTasks></ManageTasks>}
            ></Route>
            <Route
              path="/admin/create-task"
              element={<CreateTask></CreateTask>}
            ></Route>
            <Route
              path="/admin/users"
              element={<ManageUser></ManageUser>}
            ></Route>
          </Route>

          {/*User Route */}

          <Route
            element={<PrivateRoutes allowedRoles={["member"]}></PrivateRoutes>}
          >
            <Route
              path="/user/dashboard"
              element={<UserDashboard></UserDashboard>}
            ></Route>
            <Route path="/user/tasks" element={<UserTask></UserTask>}></Route>
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails></ViewTaskDetails>}
            ></Route>
          </Route>

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
