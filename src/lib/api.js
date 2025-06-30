import { axiosInstance } from "./axios";

export async function signUp(signupData){
    const res= await axiosInstance.post("/auth/signup",signupData)
    return res;
}

export async function getAuthUser(){
        const authUserData= await axiosInstance.get("/auth/me")
        return authUserData?.data;
}
