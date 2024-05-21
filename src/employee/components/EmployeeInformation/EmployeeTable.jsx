import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";

import StudentInfo from "./EmployeeInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import AttendanceModal from "../../Admin/components/AttendanceModal";
import AttendanceForm from "../../Admin/components/AttendanceForm";
import { Link } from "react-router-dom";
import { api } from "../../../config/apiconfig";

const EmployeeTable = () => {
  const jwt = localStorage.getItem("accessToken");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  const items = auth.user?.attendances || [];
  const attendances = Array.from(items);
  const handleAttend = () => {
    // Gửi POST request đến /add
    api
      .post("/employee/attend")
      .then((response) => {
        // Xử lý phản hồi thành công
        console.log(response);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  };
  return (
    <div>
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-black">
        <thead class="flex justify-center">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
              style={{ fontSize: "30px" }}
            >
              Employee Profile
            </th>
          </tr>
        </thead>
        <div className="relative px-5 border">
          <StudentInfo userInfo={auth.user} />
        </div>

        {/* <div className="relative px-5 border">{items}</div> */}
        <div class="relative px-5">
          <div>
            <AttendanceForm attendances={attendances}></AttendanceForm>
          </div>
          <button
            onClick={handleAttend}
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Attend
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
