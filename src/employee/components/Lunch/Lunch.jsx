import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import EmployeeInfo from "../EmployeeInformation/EmployeeInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import { useParams } from "react-router-dom";
import { updatePayment } from "../../../State/Payment/Action";
import LunchItem from "./LunchItem";
import { api } from "../../../config/apiconfig";

const Lunch = () => {
  const jwt = localStorage.getItem("accessToken");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);
  //update
  const { lunchId } = useParams();
  const [paymentId, setPaymentId] = useState();
  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);

    setPaymentId(urlParam.get("razorpay_payment_id"));
  }, []);
  useEffect(() => {
    const data = { lunchId, paymentId };
    dispatch(updatePayment(data));
  }, [lunchId, paymentId, dispatch]);
  //-----
  const handleLunch = () => {
    // Gửi POST request đến /add
    api
      .post("/lunch/register")
      .then((response) => {
        // Xử lý phản hồi thành công
        console.log(response);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  };
  const items = auth.user?.lunches.map((item) => <LunchItem lunch={item} />);
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
              LUNCH INFORMATION
            </th>
          </tr>
        </thead>
        {/* <div className="relative px-5 border">
          <EmployeeInfo userInfo={auth.user} />
        </div> */}
        <div class="relative px-5">
          <button
            onClick={handleLunch}
            className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register lunch of month
          </button>
        </div>
        <div class="relative px-5">
          <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
            <div>{items}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lunch;
