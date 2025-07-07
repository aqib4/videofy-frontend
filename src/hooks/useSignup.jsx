import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signUp } from '../lib/api';
import toast from 'react-hot-toast';

function useSignup() {
    const queryClient = useQueryClient();  
    const {mutate:signUpMutation,isPending,error}=useMutation({
          mutationKey: ["signup"],
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
    return {
        signUpMutation,
        isPending,
        error
    }
}

export default useSignup