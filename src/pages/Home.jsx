import React from "react";
import { axiosInstance } from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

const Home = () => {
  const {mutate} = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      console.log("Logout response:", response);
      return response.data;
    },
    onSuccess: () => {
      window.location.href = "/login"; // Redirect to login page after logout
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handlelogout = () => {
    mutate();
  };

  return (
    <div>
      <div>
        <button onClick={handlelogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
