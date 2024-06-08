import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';

const TeacherPage = () => {
    return (
        <div className="pb-20">
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <thead className="flex justify-center">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 inline-block text-slate-600"
                            style={{ fontSize: '30px' }}
                        >
                            List of Employee
                        </th>
                    </tr>
                </thead>
                <EmployeeList></EmployeeList>
            </div>
        </div>
    );
};

export default TeacherPage;
