import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import { validateEmail } from "../../utils/helper";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useUserStore } from "../../context/user-store.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

  const  setUser  = useUserStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      setLoading(true)
      const response = await axiosIntance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log(response.data.data);

      if (response.data) {
        setUser(response.data.data._doc);
      }

      if(response.data.data._doc.role === 'admin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/user/dashboard')
      }
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            placeholder="ABC@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="*******"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary underline">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
