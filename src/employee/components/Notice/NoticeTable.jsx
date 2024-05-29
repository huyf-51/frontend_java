import React, { useEffect } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';

import NoticeItem from './NoticeItem';
import { useDispatch, useSelector } from 'react-redux';
import { getNotice } from '../../../State/Notice/Action';

const NoticeTable = ({ data }) => {
    const dispatch = useDispatch();
    const { notice } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getNotice());
    }, [dispatch]);

    // const items = data.slice(0, 10).map((item) => <NoticeItem notice={item} />);
    const items = notice.notices.map((item) => <NoticeItem notice={item} />);
    return (
        <div>
            <tr>
                <th
                    scope="col"
                    className="px-6 py-3 ps-10"
                    style={{ fontSize: '20px' }}
                >
                    THÔNG BÁO CHUNG
                </th>
            </tr>
            {/* <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"> */}

            <div class="p-1 border-2 border-black bg-white mx-6">
                <div>{items}</div>
            </div>
            {/* <div className="relative px-5 border-2 border-rose-500">{items}</div> */}
        </div>
    );
};

export default NoticeTable;
