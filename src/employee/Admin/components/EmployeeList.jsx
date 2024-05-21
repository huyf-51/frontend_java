import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CreateSalaryAll,
  FetchUserList,
  Removeuser,
} from "../../../State/Admin/Action";
import AttendanceModal from "./AttendanceModal";
import { getUser } from "../../../State/Auth/Action";
import { Pagination, TextField } from "@mui/material";
import FileUpload from "./FileUpload";
import SalaryModal from "./SalaryModal";

const EmployeeList = (props) => {
  const jwt = localStorage.getItem("accessToken");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const location = useLocation();
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const pageNumber = searchParams.get("page") || 1;
  const navigate = useNavigate();
  //const { user } = useSelector((store) => store);
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);
  const [currentPage, setCurrentPage] = useState(pageNumber);
  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);
  useEffect(() => {
    const data = {
      pageNumber: pageNumber - 1,
      pageSize: 10,
    };
    dispatch(FetchUserList(data, jwt));
    // props.loaduser(data);
  }, [pageNumber, dispatch]);

  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      //props.loaduser();
      toast.success("User removed successfully.");
    }
  };
  const handleCreateSalaryForAll = () => {
    if (window.confirm("Do you want to create salary?")) {
      props.createSalaryForAll();
      //props.loaduser();
      toast.success("Created successfully.");
    }
  };
  const [openModals, setOpenModals] = useState({});

  const [openModalsSalary, setOpenModalsSalary] = useState({});

  const handleOpen = (attendances) => {
    // Set the state for the specific item
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [attendances]: true,
    }));
  };
  const handleClose = (attendances) => {
    // Set the state for the specific item
    setOpenModals((prevOpenModalsSalary) => ({
      ...prevOpenModalsSalary,
      [attendances]: false,
    }));
  };
  const handleOpenSalary = (salaries) => {
    // Set the state for the specific item
    setOpenModalsSalary((prevOpenModalsSalary) => ({
      ...prevOpenModalsSalary,
      [salaries]: true,
    }));
  };
  const handleCloseSalary = (salaries) => {
    // Set the state for the specific item
    setOpenModalsSalary((prevOpenModalsSalary) => ({
      ...prevOpenModalsSalary,
      [salaries]: false,
    }));
  };
  if (auth.user?.roles[0].name !== "ROLE_ADMIN") {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-white text-lg">
          You do not have permission to view this page. Please sign in first.
        </h2>
      </div>
    );
  }

  const filteredUserList = props.user.userlist?.content
    ? props.user.userlist.content.filter((item) =>
        item.lastName.includes(inputText)
      )
    : [];
  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div className="mt-10">
      <div className="search">
        <TextField
          className="bg-white"
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search by employee name"
          InputLabelProps={{ style: { fontWeight: "bold" } }}
          InputProps={{ style: { fontWeight: "bold" } }}
        />
      </div>
      <div className="card">
        <div className="flex">
          <FileUpload />
        </div>

        <div className="card-header flex space-x-4">
          <Link
            to={"/add"}
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
          >
            Add Employee
          </Link>

          <button
            onClick={() => {
              handleCreateSalaryForAll(1);
            }}
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
          >
            Create Month Salary for all
          </button>
        </div>

        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
        <div class="relative overflow-x-auto mt-5 bg">
          <table class="w-full">
            <thead class="text-xs border-white">
              <tr className="bg-black text-white border-white">
                <th
                  scope="col"
                  class="border-r px-6 py-4 border-white text-center"
                >
                  Id
                </th>
                <th
                  scope="col"
                  class="border-r px-10 py-4 border-white text-center"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  class="border-r px-10 py-4 border-white text-center"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  class="border-r px-6 py-4 border-white text-center"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="border-r px-6 py-4 border-white text-center"
                >
                  Attendance
                </th>
                <th
                  scope="col"
                  class="border-r px-6 py-4 border-white text-center"
                >
                  Salary
                </th>
                <th
                  scope="col"
                  class="border-r px-6 py-4 border-white text-center"
                >
                  Action
                </th>
              </tr>
              {props.user.userlist?.content &&
                filteredUserList.map((item) => (
                  <tr key={item.id} className="bg-black text-white">
                    <td className="border-r px-6 py-4 border-white text-center ">
                      {item.id}
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      {item.firstName}
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      {item.lastName}
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      {item.email}
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      {/* <Link
                        to={"/user/point/add/" + item.studentId}
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      >
                        Add Point
                      </Link>
                      {"   "} -----{" "} */}
                      <button
                        onClick={() => handleOpen(item.attendances)}
                        className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      <Link
                        to={"/employee/salary/update/" + item.id}
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                      >
                        Update Salary
                      </Link>
                      {"   "} -----
                      <button
                        onClick={() => handleOpenSalary(item.salaries)}
                        className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        View Salary
                      </button>
                    </td>
                    <td className="border-r px-6 py-4 border-white text-center ">
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                    <AttendanceModal
                      handleClose={() => handleClose(item.attendances)}
                      open={openModals[item.attendances] || false}
                      attendances={item.attendances}
                    />

                    <SalaryModal
                      handleCloseSalary={() => handleCloseSalary(item.salaries)}
                      open={openModalsSalary[item.salaries] || false}
                      salaries={item.salaries}
                    />
                  </tr>
                ))}
            </thead>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-10 bg-green-900">
        <p className="text-red-600">Page {currentPage}</p>
        <Pagination
          count={props.user.userlist?.totalPages}
          color="secondary"
          onChange={handlePaginationChange}
          page={currentPage}
          style={{ color: "red" }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: (data) => dispatch(FetchUserList(0, 10)),
    removeuser: (code) => dispatch(Removeuser(code)),
    createSalaryForAll: () => dispatch(CreateSalaryAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
