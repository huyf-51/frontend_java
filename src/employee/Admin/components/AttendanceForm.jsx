import React from 'react';
import EmployeeAttendance from '../../components/EmployeeInformation/EmployeeAttendance';

const AttendanceForm = ({ attendances }) => {
    // Tạo cấu trúc dữ liệu mới
    const extractedData = {};
    // Lặp qua mỗi phần tử trong mảng attendances
    attendances.forEach((attendance) => {
        const attendanceDay = new Date(attendance.attendanceDay);
        const year = attendanceDay.getFullYear();
        const month = attendanceDay.getMonth() + 1;
        const day = attendanceDay.getDate();
        const hour = attendanceDay.getHours().toString().padStart(2, '0');
        const minute = attendanceDay.getMinutes().toString().padStart(2, '0');
        const second = attendanceDay.getSeconds().toString().padStart(2, '0');

        // Kiểm tra xem năm đã tồn tại trong cấu trúc dữ liệu mới chưa
        if (!extractedData[year]) {
            extractedData[year] = {};
        }

        // Kiểm tra xem tháng đã tồn tại trong cấu trúc dữ liệu mới chưa
        if (!extractedData[year][month]) {
            extractedData[year][month] = {};
        }

        // Kiểm tra xem ngày đã tồn tại trong cấu trúc dữ liệu mới chưa
        if (!extractedData[year][month][day]) {
            extractedData[year][month][day] = {};
        }

        // Gán giá trị cho giờ trong cấu trúc dữ liệu mới
        extractedData[year][month][day].hour = `${hour}:${minute}:${second}`;
        extractedData[year][month][day].attendanceStatus =
            attendance.attendanceStatus;
    });

    // const items = attendances.map((item) => (
    //   <EmployeeAttendance attendances={item} />
    // ));
    // Lấy danh sách các năm từ extractedData
    const years = Object.keys(extractedData);

    // Tạo danh sách các item year và truyền cho component EmployeeAttendance
    const items = years.map((year) => (
        <EmployeeAttendance
            key={year}
            year={year}
            attendances={extractedData[year]}
        />
    ));
    return (
        <div className="relative overflow-x-auto">
            <div>
                <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-black">
                    <thead class="flex justify-center">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
                                style={{ fontSize: '30px' }}
                            >
                                ATTENDANCES
                            </th>
                        </tr>
                    </thead>

                    {/* <div className="relative px-5 border">{items}</div> */}
                    <div class="relative px-5">
                        <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                            <div>{items}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceForm;
