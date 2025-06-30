import { useState } from "react";
import { Video } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { signUp } from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

   // it is used to manage the cache and invalidate queries (meaning it will refetch the data from the server when the mutation is successful)
  //useQueryClient is a hook from react-query that provides access to the query client instance.
    const queryClient = useQueryClient();  
    const {mutate:signUpMutation,isPending,error}=useMutation({
          mutationFn: signUp,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Signup successful!");
          },          
          onError: (error) => {
            console.error("Signup failed:", error);
            // toast.error("Signup failed. Please try again.");
          },
          retry: false, // Disable retries for this mutation
    })
  // Handle signup form submission
  const  handleSignup= (e) => {
    e.preventDefault();
    signUpMutation(signupData);
  }

  return (
    <div
      className="flex items-center justify-center lg:h-screen p-4 sm:p-6 md:p-8 "
      data-theme="forest"
    >
      <div className="bg-[#19271A] border border-primary/25 flex flex-col lg:flex-row  w-full max-w-7xl rounded-lg shadow-lg p-1 overflow-hidden">
                 {/* Sign up form Right Side Inner Container*/}
        <div className="flex-1 flex flex-col items-start p-4 bg-black rounded-md">
          {/* logo */}
          <div className="flex items-center justify-center gap-2">
            <Video color="#1DB548" className="size-9 xl:size-12" />
            <span className="font-mono font-semibold text-2xl md:text-3xl xl:text-4xl text-[#1DB548]">
              VIDEOFY
            </span>
          </div>
          <h1 className="text-xl md:text-2xl  font-medium text-white/75 mt-4">
            Create an account
          </h1>
          <p className="font-montesarate text-sm text-white">Join Videofy today and Start learning your language today.</p>
          {/* Error message */}
          {error && (
            <div className="alert alert-error shadow-lg mt-4">
              {error?.response?.data?.message}
            </div>
          )}

          {/* Sign up form */}
          <form onSubmit={handleSignup} className="w-full mt-2">
            {/* full name field */}
            <div>
              <span className="label font-montesarate text-sm text-white">Full Name</span>
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={signupData.fullname}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullname: e.target.value })
                }
                className="input rounded-full w-full border border-white/35  bg-transparent placeholder:text-white/30"
                required
              />
            </div>
            {/* email field */}
            <div>
              <span className="label font-montesarate text-sm text-white">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="input rounded-full w-full border border-white/35  bg-transparent placeholder:text-white/30"
                required
              />
            </div>
            {/* password field*/}
            <div>
              <span className="label font-montesarate text-sm text-white">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="input rounded-full w-full border border-white/35  bg-transparent placeholder:text-white/30"
                required
              />
            </div>
            {/* terms checkbox field*/}
            <div className="flex items-center justify-centers gap-1 mt-4">
            <input type="checkbox" defaultChecked className="checkbox checkbox-sm rounded-full" />  
            <label className="font-montesarate text-sm text-white">
              I agree to the{" "}
              <a href="#" className="link text-[#1DB548]">
                Terms and Conditions
              </a>
              {" "}and{" "}
              <a href="#" className="link text-[#1DB548]">
                Privacy Policy
              </a>
            </label>
            </div>
            {/* Sign up button */}
            <div className="mt-4">
                <button className="bg-[#1DB548] font-semibol font-sans text-black w-full rounded-full h-12">
                {isPending ?
                 <span className="loading loading-spinner loading-xs"></span>
                 :
                  "Create an account"}</button>
            </div>
            {/* Sign in Link */}
            <div className="flex justify-center mt-4">
            <span className="font-montesarate text-sm text-white">Already have an account? 
            <a href="#" className="text-[#1DB548]"> Sign in</a></span>
            </div>
          </form>
        </div>
                  {/* Left Side Sign up Image */}

        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-[#19271A] p-4 lg:p-8">
        <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm">
            <img src="/signup.png" alt=""  className=""/>
            </div>
           </div>
          <div className="flex flex-col items-center justify-center text-center mt-4">
          <h2 className="text-xl md:text-2xl  font-medium text-white ">
            Connect with Language partners worldwide
          </h2>
          <p className="font-montesarate text-sm text-white">Practice Conversations , make Friends and improve language skills together</p>

          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SignUpPage;
