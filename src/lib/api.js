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

export async function getFriends() {
    const res = await axiosInstance.get("/user/friends");
    console.log("getFriends res", res);
    return res.data;
}

export async function getRecommendedUsers() {
    const res = await axiosInstance.get("/user/");
    console.log("getRecommendedUsers res", res);
    return res.data;
}

export async function GetOutGoingFriendRequests() {
    const res = await axiosInstance.get("/user/friend-request/sent");
    console.log("getFriendRequests res", res);
    return res.data;
}

export async function sendFriendRequest({ userId }) {
    const { data } = await axiosInstance.post('/user/friend-request/' + userId);
    console.log("sendFriendRequest data", data);
    return data;
}

