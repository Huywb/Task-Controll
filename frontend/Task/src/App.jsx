import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import PrivateRoutes from './routes/privateRoutes'
import Dashboard from './pages/Admin/Dashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUser from './pages/Admin/ManageUser'
import UserDashboard from './pages/User/Dashboard'
import UserTask from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <div>
      <Toaster toastOptions={{ className: '', style: {fontSize: '13px'}}}></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signUp' element={<SignUp></SignUp>}></Route>

          {/*Admin Route */}

          <Route element={<PrivateRoutes allowedRoles={['admin']}></PrivateRoutes>}>
            <Route path='/admin/dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/admin/tasks' element={<ManageTasks></ManageTasks>}></Route>
            <Route path='/admin/create-task' element={<CreateTask></CreateTask>}></Route>
            <Route path='/admin/users' element={<ManageUser></ManageUser>}></Route>
          </Route>

          {/*User Route */}

          <Route element={<PrivateRoutes allowedRoles={['member']}></PrivateRoutes>}>
            <Route path='/user/dashboard' element={<UserDashboard></UserDashboard>}></Route>
            <Route path='/user/task' element={<UserTask></UserTask>}></Route>
            <Route path='/user/task-details/:id' element={<ViewTaskDetails></ViewTaskDetails>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
