import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import StudentInfo from './EmployeeInfo';
import { useDispatch, useSelector } from 'react-redux';
import AttendanceForm from '../../Admin/components/AttendanceForm';
import usePrivateApi from '../../../hooks/usePrivateApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserSuccess } from '../../../State/Auth/Action';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const api = usePrivateApi();
    const { auth } = useSelector((store) => store);

    const items = auth.user?.attendances || [];
    const attendances = Array.from(items);
    const handleAttend = () => {
        // Gửi POST request đến /add
        api.post('/employee/attend')
            .then(async (response) => {
                const res = await api.get(`/api/users/profile`, {});
                const user = res.data;

                dispatch(getUserSuccess(user));
                toast.success('Attend success');
            })
            .catch((error) => {
                toast.warning('You are attended today');
            });
    };
    return (
        <div>
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <thead class="flex justify-center">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
                            style={{ fontSize: '30px' }}
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
                        <AttendanceForm
                            attendances={attendances}
                        ></AttendanceForm>
                    </div>
                    <button
                        onClick={handleAttend}
                        className="px-4 py-2 tracking-wide transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Attend
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmployeeTable;
