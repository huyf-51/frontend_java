import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination, TextField } from '@mui/material';
import FileUpload from './FileUpload';
import usePrivateApi from '../../../hooks/usePrivateApi';
import { getUserList } from '../../../State/Admin/Action';

const EmployeeList = () => {
    console.log('render');
    const api = usePrivateApi();
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();

    const location = useLocation();
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const pageNumber = parseInt(searchParams.get('page'), 10) || 1;
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };
    const [inputText, setInputText] = useState('');
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const [currentPage, setCurrentPage] = useState(pageNumber);
    useEffect(() => {
        setCurrentPage(pageNumber);
    }, [pageNumber]);

    const data = {
        pageNumber: pageNumber - 1,
        pageSize: 10,
    };

    useEffect(() => {
        api.get(
            `/employee/getAll?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
        )
            .then((res) => {
                const userlist = res.data;
                console.log('res.data>>>', res.data);
                dispatch(getUserList(userlist));
            })
            .catch((err) => {});
        // props.loaduser(data);
    }, [pageNumber, dispatch]);

    const handledelete = async (code) => {
        if (window.confirm('Do you want to remove this employee?')) {
            try {
                const res = await api.delete(`/employee/delete/` + code);
                // console.log('res.data>>>', res.data);
                // dispatch(FetchUserList(data, api)).then(() => {
                //     toast.success('User removed successfully.');
                // });
                api.get(
                    `/employee/getAll?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
                ).then((res) => {
                    const userlist = res.data;
                    dispatch(getUserList(userlist));
                    toast.success('Employee removed successfully.');
                });
            } catch (err) {
                // dispatch(failRequest(err.message));
            }
        }
    };
    const handleCreateSalaryForAll = async () => {
        if (window.confirm('Do you want to create salary?')) {
            try {
                await api.get(`/employee/create/salary/all`);
                toast.success('Created successfully.');
                api.get(
                    `/employee/getAll?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`
                ).then((res) => {
                    const userlist = res.data;
                    dispatch(getUserList(userlist));
                });
            } catch (err) {}
            //props.loaduser();
        }
    };
    if (auth.user?.roles[0].name !== 'ROLE_ADMIN') {
        return (
            <div className="flex justify-center items-center">
                <h2 className="text-lg">
                    You do not have permission to view this page. Please sign in
                    first.
                </h2>
            </div>
        );
    }

    const filteredUserList = user.userlist?.content
        ? user.userlist.content.filter((item) =>
              item.lastName.includes(inputText)
          )
        : [];

    if (user.loading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }
    if (user.errmessage) {
        return (
            <div>
                <h2 className="">{user.errmessage}</h2>
            </div>
        );
    }
    if (user.userlist) {
        return (
            <div className="mt-10">
                {/* <div className="card"> */}
                <div>
                    <div className="card-header grid grid-cols-2 mb-10">
                        <div className="flex space-x-20">
                            <Link
                                to={'/add'}
                                className="self-center bg-orange-400 font-semibold hover:bg-amber-500 px-6 py-3 rounded-md"
                            >
                                Add Employee
                            </Link>

                            <button
                                onClick={() => {
                                    handleCreateSalaryForAll(1);
                                }}
                                className="self-center bg-yellow-500 font-semibold hover:bg-yellow-400 px-6 py-3 rounded-md"
                            >
                                Create Month Salary for all
                            </button>
                        </div>
                        <div className="search px-40">
                            <TextField
                                className="bg-white"
                                id="outlined-basic"
                                onChange={inputHandler}
                                variant="outlined"
                                fullWidth
                                label="Search by employee name"
                                InputLabelProps={{
                                    style: { fontWeight: 'bold' },
                                }}
                                InputProps={{ style: { fontWeight: 'bold' } }}
                            />
                        </div>
                    </div>
                    {/* <div className="flex">
                            <FileUpload />
                        </div> */}
                    {/* </div> */}

                    {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                    <div className="relative overflow-x-auto mt-5 bg">
                        <table className="w-full">
                            <thead className="text-xs border-white">
                                <tr className="border-white">
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 border-white text-center text-base"
                                    >
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-10 py-4 border-white text-center text-base"
                                    >
                                        First Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-10 py-4 border-white text-center text-base"
                                    >
                                        Last Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 border-white text-center text-base"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 border-white text-center text-base"
                                    >
                                        Attendance
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 border-white text-center text-base"
                                    >
                                        Salary
                                    </th>
                                    <th
                                        scope="col"
                                        className="border-r px-6 py-4 border-white text-center text-base"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.userlist?.content &&
                                    filteredUserList.map((item) => (
                                        <tr key={item.id} className="">
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
                                                    onClick={() =>
                                                        // handleOpen(
                                                        //     item.attendances
                                                        // )
                                                        navigate(
                                                            '/employee/attendance',
                                                            {
                                                                state: item.attendances,
                                                            }
                                                        )
                                                    }
                                                    className="px-4 py-2 tracking-wide transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-gray-100"
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="border-r px-6 py-4 border-white text-center ">
                                                <Link
                                                    to={
                                                        '/employee/salary/update/' +
                                                        item.id
                                                    }
                                                    className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 text-gray-100"
                                                >
                                                    Update Salary
                                                </Link>
                                                {'   '} -----
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            '/employee/salary',
                                                            {
                                                                state: item.salaries,
                                                            }
                                                        )
                                                    }
                                                    className="px-4 py-2 tracking-wide transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-gray-100"
                                                >
                                                    View Salary
                                                </button>
                                            </td>
                                            <td className="border-r px-6 py-4 border-white text-center ">
                                                <button
                                                    onClick={() => {
                                                        handledelete(item.id);
                                                    }}
                                                    className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-slate-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <Pagination
                        count={user.userlist?.totalPages}
                        color="primary"
                        onChange={handlePaginationChange}
                        page={currentPage}
                        shape="rounded"
                        className="bg-white px-2 py-2 rounded border-2 border-sky-500"
                    />
                </div>
                <ToastContainer />
            </div>
        );
    }
};

export default EmployeeList;
