import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/auth";
import { message } from "antd";
import { SetCurrentUser } from "../redux/userSlice";
import { getLogUserName } from "../utils/helper";

const ProtectedPage = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response?.success) {
        message.success(response?.message);
        dispatch(SetCurrentUser(response?.data));
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else navigate("/login");
  }, []);
  return (
    currentUser && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary text-white p-5">
          <div>
            <h2 className="text-2xl">BloodBank App</h2>
            <span className="text-md">
              {currentUser.userType.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-user"></i>
            <div className="flex flex-col">
              <span
                className="mr-5 text-md cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getLogUserName(currentUser).toUpperCase()}
              </span>
            </div>
            <div>
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>
        </div>
        {/**body */}
        <div className="px-5 py-2"> {children} </div>
      </div>
    )
  );
};

export default ProtectedPage;
