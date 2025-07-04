import { axiosInstance } from "./axios";

export async function signUp(signupData){
    const res= await axiosInstance.post("/auth/signup",signupData)
    return res;
}

export async function getAuthUser(){
        const authUserData= await axiosInstance.get("/auth/me")
        return authUserData?.data;
}

export async function completeOnboarding(onboarding) {

    const onbaordData=await axiosInstance.post("/auth/onboarding",onboarding);
    console.log("onbaordData", onbaordData);
    return onbaordData;
}

export async function loginUser(loginData) {
           const res=await axiosInstance.post("/auth/login", loginData);
           console.log("login res", res);
           return res.data;
}
