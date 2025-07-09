import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../lib/axios';

function useLogout() {
    const {mutate,isPending} = useMutation({
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
    return {
        mutate,
        isPending   
    }
      
    
}

export default useLogout