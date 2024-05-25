import React from 'react';

const EmployeeInfo = ({ userInfo }) => {
    return (
        <div>
            <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                bordercolor="#FFFFFF"
                width="100%"
            >
                <tr>
                    <td className="">Full Name:</td>
                    <td>
                        <strong className="">
                            {userInfo?.firstName} {userInfo?.lastName}
                        </strong>
                    </td>
                    <td className="">Date of birth:</td>
                    <td>
                        <strong>{userInfo?.birth}</strong>
                    </td>
                    <td className="">Sex:</td>
                    <td className="">
                        <strong>{userInfo?.sex}</strong>
                    </td>
                </tr>
                <tr>
                    <td className="">Student ID:</td>
                    <td>
                        <strong className="">{userInfo?.studentId}</strong>
                    </td>
                    <td className="">Class:</td>
                    <td className="">
                        <strong>{userInfo?.class}</strong>
                    </td>
                    {/* <td className="">Khoa:</td>
          <td className="">
            <strong>{userInfo?.department}</strong>
          </td> */}
                </tr>
                {/* <tr>
          <td className="">Bậc đào tạo:</td>
          <td>
            <strong className="">{userInfo?.educationLevel}</strong>
          </td>
          <td className="">Hệ đào tạo:</td>
          <td colspan="3">
            <strong className="">{userInfo?.educationProgram}</strong>
          </td>
        </tr> */}
            </table>
            <table
                cellpadding="2"
                cellspacing="0"
                border="1"
                bordercolor="#000000"
                width="100%"
            ></table>
        </div>
    );
};

export default EmployeeInfo;
