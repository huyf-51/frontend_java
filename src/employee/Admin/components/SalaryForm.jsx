import React from 'react';
import EmployeeSalary from '../../components/EmployeeInformation/EmployeeSalary';

const SalaryForm = ({ salaries }) => {
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
                    <thead class="flex justify-center">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
                                style={{ fontSize: '30px' }}
                            >
                                SALARIES
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

export default SalaryForm;
