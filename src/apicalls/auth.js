import { axiosInstance } from ".";

export const RegisterUser = async (payload) => {
  const response = await axiosInstance(
    "post",
    "http://localhost:5000/api/auth/register",
    payload
  );
  return response;
};
export const LoginUser = async (payload) => {
  const response = await axiosInstance(
    "post",
    "http://localhost:5000/api/auth/login",
    payload
  );
  return response;
};

export const GetCurrentUser = async () => {
  const response = await axiosInstance(
    "get",
    "http://localhost:5000/api/auth/currentUser"
  );
  return response;
};
