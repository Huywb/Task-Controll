import React from "react";
import logo from "../../assets/image.png";


const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg fontmedium">Task Manager</h2>
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url(../../assets/image.png)] bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img src={logo} alt="logo" className="w-64 lg:w-[90%]"></img>
      </div>
    </div>
  );
};

export default AuthLayout;
