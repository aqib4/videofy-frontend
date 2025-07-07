import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function useLogin() {
    const navigate=useNavigate();
    const queryClient = useQueryClient();
    const {mutate:loginMutation,isPending,error}=useMutation({
        mutationKey: ["login"],
        mutationFn:loginUser,
        onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["authUser"] });
          // Optionally, you can redirect or update state her
         toast.success("Login successful!");
          // Handle successful login, e.g., redirect or update state
         navigate("/");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
      return {
        loginMutation,
        isPending,
        error}
}

export default useLogin