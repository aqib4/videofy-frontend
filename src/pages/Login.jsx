import { Loader, Video } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const { loginMutation, isPending, error } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div
        className="bg-[#19271A] flex flex-col lg:flex-row border border-primary/25 shadow-lg w-full max-w-5xl mx-auto rounded-xl overflow-hidden"
      >
        {/* left side container */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col  p-4 m-2 rounded-md" data-theme="black" >
          <div className="flex gap-1 justify-center items-center ">
          <Video color="#1DB548" className="size-8 xl:size-12" />
          <span className=" text-2xl md:text-3xl xl:text-4xl font-montesarate font-semibold text-[#1DB548]">
            VIDEOFY
          </span>
          </div>
          
          <h2 className="font-mono text-2xl text-white">Welcome Back </h2>
          <p className=" text-white font-montesarate text-[1rem] ">
            Sign in to your account to continue with your language journey
          </p>
          <div>
            {error && (
              <p className="text-red-500 mt-2">
                {error.response?.data?.message || "Login failed. Please try again."}
              </p>
            )}
          </div>
          {/* form */}
          <form onSubmit={handleLogin}
          className="w-full mt-4 space-y-4">
            {/* Email field */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend mb-3">Email</legend>
              <input type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
               className="input input-neutral  border border-primary/25 rounded-full w-full focus:outline-none focus:border-primary/75 focus:ring-1 focus:ring-primary/75" 
               placeholder="Your Email ..." />
            </fieldset>
            {/* Password field */}
            <fieldset className="fieldset ">
              <legend className="fieldset-legend mb-3">Email</legend>
              <input 
               type="password"
               className="input bg-transparent border border-primary/25 rounded-full w-full focus:outline-none focus:border-primary/75 focus:ring-1 focus:ring-primary/75" 
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="Your Email ..." />
            </fieldset>
            {/* Submit button */}
            <button className="btn btn-block bg-primary/75 rounded-full border border-primary/25">
              {
                isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Login"
                )
              }
            </button>         
             </form>
           <div className="flex justify-center"> 
           <p className="font-montesarate text-[1.1rem] text-white mt-4">
              Don't have an account? {" "}    
              <Link to="/signup" className="text-primary/75 hover:text-primary/100 transition-colors duration-200">Creat one</Link>
           </p>
           </div>
        </div>
        {/* right side container  */}
        <div className="flex-1 w-full lg:w-1/2  flex flex-col items-center justify-center p-4 md:p-6">
           <img src="signup.png" className="max-w-sm aspect-square"/>
           <h3 className="text-white/80 font-sans font-bold text-[1.4rem]">Connect with language partners worldwide</h3>
           <p className="text-center text-white/80 font-montesarate text-[1rem]">Practice Conversatioons, Make Friends, and improve your language together.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
