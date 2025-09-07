import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000/api/auth",
});

export const login = async (email: string, password: string) => {
   const response = await api.post(
      "/login",
      { email, password },
      { withCredentials: true }
   );
   console.log("Login response headers:", response.headers);
   console.log("Set-Cookie header:", response.headers["set-cookie"]);
   console.log("All response headers:", Object.keys(response.headers));
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
   const response = await api.post("/logout", { withCredentials: true });
   return response.data;
};
export const checkAuth = async () => {
   const response = await api.get("/check", { withCredentials: true });
   return response.data;
};
export const updateProfile = async (data: {
   fullName?: string;
   image?: File;
}) => {
   const response = await api.patch("/update-profile", data, {
      withCredentials: true,
   });
   return response.data;
};
