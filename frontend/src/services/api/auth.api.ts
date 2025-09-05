import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000/api/auth",
   withCredentials: true,
});

export const login = async (email: string, password: string) => {
   const response = await api.post(
      "/login",
      { email, password },
      { withCredentials: true }
   );
   return response.data;
};
export const signup = async (
   email: string,
   password: string,
   fullName: string
) => {
   const response = await api.post(
      "/signup",
      { email, password, fullName },
      { withCredentials: true }
   );
   return response.data;
};

export const logout = async () => {
   const response = await api.post("/logout");
   return response.data;
};
export const checkAuth = async () => {
   const response = await api.get("/check");
   return response.data;
};
export const updateProfile = async (data: {
   fullName?: string;
   image?: File;
}) => {
   const response = await api.patch("/update-profile", data);
   return response.data;
};
