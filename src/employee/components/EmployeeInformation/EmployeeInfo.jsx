import React from 'react';

const EmployeeInfo = ({ userInfo }) => {
    return (
        <div className="flex space-x-4 ms-20">
            <div>Full Name:</div>
            <strong className="">
                {userInfo?.firstName} {userInfo?.lastName}
            </strong>
        </div>
    );
};

export default EmployeeInfo;
