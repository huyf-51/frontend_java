import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../employee/components/Pages/HomePage/HomePage";

import Navigation from "../employee/components/Navigation/Navigation";
import Footer from "../employee/components/Footer/Footer";

import EmployeeTable from "../employee/components/EmployeeInformation/EmployeeTable";

import AdminPage from "../employee/Admin/components/AdminPage";
import Addemployee from "../employee/Admin/components/AddEmployee";
import UpdateSalary from "../employee/Admin/components/UpdateSalary";
import Lunch from "../employee/components/Lunch/Lunch";

const employeeRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/account/profile" element={<EmployeeTable />}></Route>
        <Route path="/account/lunch" element={<Lunch />}></Route>
        <Route path="/payment/:lunchId" element={<Lunch />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/add" element={<Addemployee />}></Route>

        <Route
          path="/employee/salary/update/:employeeId"
          element={<UpdateSalary />}
        ></Route>
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default employeeRouters;