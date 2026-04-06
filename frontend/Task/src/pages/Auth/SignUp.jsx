import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import Input from "../../components/input/Input";
import { Link } from "react-router-dom";
import { axiosIntance } from "../../utils/AxiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { uploadImage } from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = ''

    if (!fullName) {
      setError("Please enter a full name");
      return;
    }

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
          if(profilePic){
            const imgUploadRes = await uploadImage(profilePic)
            profileImageUrl = imgUploadRes.imageUrl || ''
          }

          const response = await axiosIntance.post(API_PATHS.AUTH.REGISTER, {
            name: fullName,
            email,
            password,
            profileImageUrl,
            adminInviteToken
          });
    
          console.log(response);
    
        } catch (error) {
          console.log(error);
        }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Abc"
              type="text"
            />

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

            <Input
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              label="Admin Invite Token"
              placeholder="6 digits code"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
