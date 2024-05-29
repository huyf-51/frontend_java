import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import timeChange from '../../../utils/time';
const NoticeItem = ({ notice }) => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);

    const toggleBox = () => {
        setIsBoxOpen(!isBoxOpen);
    };
    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr
                        className=""
                        onClick={toggleBox}
                        style={{ cursor: 'pointer' }}
                    >
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap grid grid-cols-4"
                        >
                            <KeyboardArrowRightIcon
                                className={isBoxOpen ? 'rotate-90' : ''}
                            />
                            <span className="font-bold col-span-2">
                                {notice.title}
                            </span>
                            <span className="font-bold">
                                {timeChange(notice.createdAt)}
                            </span>
                        </th>
                    </tr>
                    {isBoxOpen && (
                        <div className="px-12 text-slate-950 p-4 border-b dark:border-gray-900">
                            {notice.description}
                        </div>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default NoticeItem;
