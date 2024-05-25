import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const EmployeeSalary = ({ year, salaries }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openMonth, setOpenMonth] = useState(null);

    const toggleYear = () => {
        setIsOpen(!isOpen);
    };

    const toggleMonth = (month) => {
        setOpenMonth(openMonth === month ? null : month);
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left bg-white border-collapse">
                <tbody>
                    <tr className="border-b border-red-400">
                        <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                            onClick={toggleYear}
                            style={{ cursor: 'pointer' }}
                        >
                            <KeyboardArrowRightIcon
                                className={
                                    isOpen
                                        ? 'text-red-600 rotate-90'
                                        : 'text-red-600'
                                }
                            />
                            <span className="p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                                Năm {year}
                            </span>
                        </th>
                        {isOpen &&
                            Array.from({ length: 12 }).map((_, index) => (
                                <td
                                    key={index}
                                    className={`px-6 py-4 dark:border-neutral-500 text-center cursor-pointer ${
                                        openMonth === index + 1
                                            ? 'bg-gray-200'
                                            : ''
                                    }`}
                                    onClick={() => toggleMonth(index + 1)}
                                >
                                    Tháng {index + 1}
                                </td>
                            ))}
                    </tr>
                    {isOpen &&
                        Object.keys(salaries).map((month) => {
                            const grossSalary = salaries[month].grossSalary;
                            const numberOfLeaveDays =
                                salaries[month].numberOfLeaveDays;
                            const leaveDeduction = 200000 * numberOfLeaveDays;
                            const adjustedGross = grossSalary - leaveDeduction;
                            const socialInsurance = adjustedGross * 0.08;
                            const healthInsurance = adjustedGross * 0.015;
                            const unemploymentInsurance = adjustedGross * 0.01;
                            const preTaxIncome =
                                adjustedGross -
                                socialInsurance -
                                healthInsurance -
                                unemploymentInsurance;
                            const personalDeduction = 11000000;
                            const dependentDeduction = 0; // Assuming no dependents for this example
                            const taxableIncome =
                                preTaxIncome -
                                personalDeduction -
                                dependentDeduction;

                            return (
                                <React.Fragment key={month}>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? 'bg-gray-100'
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Lương GROSS:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            {grossSalary.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Số ngày nghỉ:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            {numberOfLeaveDays}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Bảo hiểm xã hội (8%):
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {socialInsurance.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Bảo hiểm y tế (1.5%):
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {healthInsurance.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Bảo hiểm thất nghiệp (1%):
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {unemploymentInsurance.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? 'bg-gray-100'
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Thu nhập trước thuế:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            {preTaxIncome.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Giảm trừ gia cảnh bản thân:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {personalDeduction.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Giảm trừ gia cảnh người phụ thuộc:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {dependentDeduction.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? 'bg-gray-100'
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Thu nhập chịu thuế:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            {taxableIncome.toLocaleString(
                                                'en-US'
                                            )}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? ''
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Thuế thu nhập cá nhân (*):
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            -{' '}
                                            {salaries[
                                                month
                                            ].incomeTax.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                    <tr
                                        className={`border-b border-gray-200 ${
                                            openMonth === parseInt(month)
                                                ? 'bg-gray-100'
                                                : 'hidden'
                                        }`}
                                    >
                                        <td
                                            className="px-6 py-4 font-bold"
                                            colSpan="2"
                                        >
                                            Lương NET:
                                        </td>
                                        <td
                                            className="px-6 py-4 text-right"
                                            colSpan="2"
                                        >
                                            {salaries[
                                                month
                                            ].netSalary.toLocaleString('en-US')}
                                            {/* {netIncome.toLocaleString("en-US")} */}
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeSalary;
