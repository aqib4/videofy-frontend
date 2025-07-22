import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { sendFriendRequest } from '../lib/api';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function useSendFriendRequest() {
    const queryClient = useQueryClient();

    const { mutate: friendRequestMutate }=useMutation({
        mutationKey: ['sendFriendRequest'],
        mutationFn: sendFriendRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outGoingRequests'] });
            toast.success("Friend request sent successfully!");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    toast.error("You have already sent a friend request to this user.");
                } else {
                    toast.error("Failed to send friend request. Please try again.");
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    });
    return {
        friendRequestMutate
    }
}
