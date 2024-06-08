import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios
                .post(`${process.env.REACT_APP_API}/upload`, formData)
                .then((response) => {
                    toast.success('submit file success');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            toast.warning('you must choose file!');
        }
    };

    useEffect(() => {
        // You can perform additional actions after the file state changes
        // For example, you can display a message or perform additional logic
        if (file) {
        }
    }, [file]);

    return (
        <div className="mb-20 pt-40 mx-40 mb-96">
            <h1
                className="text-center font-medium mb-6"
                style={{ fontSize: '30px' }}
            >
                REQUEST LEAVE
            </h1>
            <p className="text-slate-600 mb-4">
                Đặt tên file theo format:{' '}
                <strong>&lt;employee_id&gt;_&lt;full_name&gt;</strong>
            </p>
            <div className="flex">
                <input
                    className="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 rounded file:text-gray-100"
                    type="file"
                    onChange={handleFileChange}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded ml-5"
                    onClick={handleUpload}
                >
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default FileUpload;
