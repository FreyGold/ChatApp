import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   deleteMessage,
   editMessage,
   getContacts,
   getSharedMessages,
   sendMessage,
} from "../api/messages.api";

export const useGetContacts = () => {
   return useQuery({
      queryKey: ["contacts"],
      queryFn: getContacts,
      staleTime: 5 * 60 * 1000, // 5 minutes
   });
};

export const useGetSharedMessages = (targetUser: string, page: number) => {
   return useQuery({
      queryKey: ["messages", targetUser, page],
      queryFn: () => getSharedMessages(targetUser, page),
      enabled: !!targetUser, // Only run if targetUser exists
   });
};

export const useSendMessage = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         targetUser,
         text,
         image,
      }: {
         targetUser: string;
         text?: string;
         image?: File;
      }) => sendMessage(targetUser, text, image),
      onSuccess: (_, variables) => {
         // Invalidate messages queries to refetch latest messages
         queryClient.invalidateQueries({
            queryKey: ["messages", variables.targetUser],
         });
      },
   });
};

export const useDeleteMessage = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: deleteMessage,
      onSuccess: () => {
         // Invalidate all message queries to refetch
         queryClient.invalidateQueries({ queryKey: ["messages"] });
      },
   });
};

export const useEditProfile = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: editMessage,
      onSuccess: () => {
         // Invalidate contacts to refetch updated profile
         queryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
   });
};
