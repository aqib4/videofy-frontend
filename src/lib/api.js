import { axiosInstance } from "./axios";

export async function signUp(signupData){
    const res= await axiosInstance.post("/auth/signup",signupData)
    return res;
}

export async function getAuthUser(){
        const authUser= await axiosInstance.get("/auth/me")
        console.log("authUser data", authUser);
        return authUser.data;
}

export async function completeOnboarding(onboarding) {

    const onbaordData=await axiosInstance.post("/auth/onboarding",onboarding);
    console.log("onbaordData", onbaordData);
    return onbaordData;
}

export async function loginUser(loginData) {
           const {data}=await axiosInstance.post("/auth/login", loginData);
           console.log("login Data", data);
           return data;
}

export async function getFriends() {
    const {data} = await axiosInstance.get("/user/friends");
    console.log("getFriends Data", data);
    return data.friends;
}

export async function getRecommendedUsers() {
    const {data} = await axiosInstance.get("/user/");
    console.log("getRecommendedUsers data", data);
    return data;
}

export async function GetOutGoingFriendRequests() {
    const {data} = await axiosInstance.get("/user/friend-request/sent");
    console.log("Out Going Friend Request ", data);
    return data;
}

export async function sendFriendRequest({ userId }) {
    const { data } = await axiosInstance.post('/user/friend-request/' + userId);
    console.log("sendFriendRequest data", data);
    return data;
}

export async function acceptFriendRequest({ userId }) {
    console.log("acceptFriendRequest userId", userId);
    const { data } = await axiosInstance.put(`/user/friend-request/${userId}/accept`);
    console.log("acceptFriendRequest data", data);
    return data;
}

export async function getFriendRequest() {
             const {data}= await axiosInstance.get("/user/friend-request");
              console.log("FriendRequests res", data);
             return data;
        
}

export async function getStreamToken() {
    try {
        const {data} = await axiosInstance.get("/chat/token");
        return data;
    } catch (error) {
        console.error("Error fetching Stream token:", error);
        throw new Error("Failed to fetch Stream token");
    }
}