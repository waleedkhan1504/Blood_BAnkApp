import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogUserName } from "../utils/helper";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{getLogUserName.currentUser}</h3>
    </div>
  );
};

export default HomePage;
