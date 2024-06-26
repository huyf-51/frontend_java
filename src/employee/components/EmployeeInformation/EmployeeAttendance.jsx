import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const EmployeeAttendance = ({ year, attendances }) => {
    const [isBoxOpen, setIsBoxOpen] = useState({});

    const toggleBox = (month) => {
        setIsBoxOpen((prev) => ({ ...prev, [month]: !prev[month] }));
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
                <tbody>
                    <tr
                        className="border-b border-black"
                        onClick={() => toggleBox(year)}
                        style={{ cursor: 'pointer' }}
                    >
                        <th
                            scope="row"
                            colSpan="3"
                            className="px-6 py-4 whitespace-nowrap"
                        >
                            <KeyboardArrowRightIcon
                                className={isBoxOpen[year] ? 'rotate-90' : ''}
                            />
                            <span className="p-4 text-center font-bold">
                                Năm {year}
                            </span>
                        </th>
                    </tr>
                    {isBoxOpen[year] &&
                        Object.keys(attendances).map((month) => (
                            <React.Fragment key={month}>
                                <tr
                                    className="border-b border-gray-200"
                                    onClick={() => toggleBox(month)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 dark:border-neutral-500 text-center"
                                    >
                                        <KeyboardArrowRightIcon
                                            className={
                                                isBoxOpen[month]
                                                    ? 'rotate-90'
                                                    : ''
                                            }
                                        />
                                        Tháng {month}
                                    </td>
                                </tr>
                                {isBoxOpen[month] &&
                                    Object.keys(attendances[month]).map(
                                        (day) => (
                                            <tr key={day}>
                                                <td className="border-r px-10 py-4 dark:border-neutral-500 text-center">
                                                    Ngày {day}
                                                </td>
                                                <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                                                    Giờ điểm danh{' '}
                                                    {
                                                        attendances[month][day]
                                                            .hour
                                                    }
                                                </td>
                                                <td className="border-r px-10 py-4 dark:border-neutral-500 text-center">
                                                    {
                                                        attendances[month][day]
                                                            .attendanceStatus
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeAttendance;
