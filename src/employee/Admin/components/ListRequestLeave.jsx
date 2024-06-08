import axios from 'axios';
import { useEffect, useState } from 'react';

const ListRequestLeave = () => {
    const [listRequest, setListRequest] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/files`)
            .then((response) => {
                setListRequest(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div className="pt-40 mb-96 pb-10">
            <h1
                className="text-center font-medium mb-6"
                style={{ fontSize: '30px' }}
            >
                LIST REQUEST LEAVE
            </h1>
            <div className="bg-white mx-20">
                {listRequest.map((request, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-200 py-4 gap-x-3 ms-40"
                    >
                        <p className="text-lg">{request.name}</p>
                        <a href={request.url} className="text-blue-500 pe-20">
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListRequestLeave;
