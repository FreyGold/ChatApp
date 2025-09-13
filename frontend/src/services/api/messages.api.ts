import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000/api/chat",
});

export const getContacts = async () => {
   const response = await axios.get("/users");
   return response.data;
};
export const getSharedMessages = async (targetUser: string, page: number) => {
   const response = await api.get(`/messages`, {
      params: { targetUser, page },
   });
   return response.data;
};

export const sendMessage = async (
   targetUser: string,
   text?: string,
   image?: File
) => {
   const response = await api.post("/message", { targetUser, text, image });
   return response.data;
};
export const deleteMessage = async (messageId: string) => {
   const response = await api.delete("/message", {
      params: { _id: messageId },
   });
   return response.data;
};
export const editMessage = async (data: {
   fullName?: string;
   image?: File;
}) => {
   const response = await api.patch("/update-profile", data, {
      withCredentials: true,
   });
   return response.data;
};
