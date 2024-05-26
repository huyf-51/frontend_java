import React from 'react';
import EmployeeSalary from '../../components/EmployeeInformation/EmployeeSalary';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewSalary = () => {
    const location = useLocation();
    const salaries = location.state;
    // Tạo cấu trúc dữ liệu mới
    const extractedData = {};
    // Lặp qua mỗi phần tử trong mảng attendances
    salaries.forEach((salary) => {
        const salaryPay = new Date(salary.payAt);
        const year = salaryPay.getFullYear();
        const month = salaryPay.getMonth() + 1;
        // const day = salaryPay.getDate();
        // const hour = salaryPay.getHours().toString().padStart(2, "0");
        // const minute = salaryPay.getMinutes().toString().padStart(2, "0");
        // const second = salaryPay.getSeconds().toString().padStart(2, "0");

        // Kiểm tra xem năm đã tồn tại trong cấu trúc dữ liệu mới chưa
        if (!extractedData[year]) {
            extractedData[year] = {};
        }

        // Kiểm tra xem tháng đã tồn tại trong cấu trúc dữ liệu mới chưa
        if (!extractedData[year][month]) {
            extractedData[year][month] = {};
        }

        // Gán giá trị cho giờ trong cấu trúc dữ liệu mới
        extractedData[year][month].numberOfLeaveDays = salary.numberOfLeaveDays;
        extractedData[year][month].grossSalary = salary.grossSalary;
        extractedData[year][month].netSalary = salary.netSalary;
        extractedData[year][month].incomeTax = salary.incomeTax;
    });

    const years = Object.keys(extractedData);

    // Tạo danh sách các item year và truyền cho component EmployeeSalary
    const items = years.map((year) => (
        <EmployeeSalary key={year} year={year} salaries={extractedData[year]} />
    ));
    return (
        <div className="relative overflow-x-auto">
            <div>
                <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                    <Link to={'/admin'} className="ms-6">
                        {' '}
                        <button
                            type="button"
                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                        >
                            <svg
                                className="w-5 h-5 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>
                            <span>Go back</span>
                        </button>
                    </Link>
                    <thead class="flex justify-center">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-slate-900"
                                style={{ fontSize: '30px' }}
                            >
                                SALARIES
                            </th>
                        </tr>
                    </thead>

                    {/* <div className="relative px-5 border">{items}</div> */}
                    <div class="relative px-5">
                        <div class="border-2 border-sky-600">
                            <div>{items}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSalary;
