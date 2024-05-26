import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDispatch } from 'react-redux';
import { createPayment } from '../../../State/Payment/Action';

const LunchItem = ({ lunch }) => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);

    const toggleBox = () => {
        setIsBoxOpen(!isBoxOpen);
    };

    const dispatch = useDispatch();
    const handleCheckout = () => {
        dispatch(createPayment(lunch.id));
    };
    //update
    // const { tuitionId } = useParams();
    // const [paymentId, setPaymentId] = useState();
    // useEffect(() => {
    //   const urlParam = new URLSearchParams(window.location.search);

    //   setPaymentId(urlParam.get("razorpay_payment_id"));
    // }, []);
    // useEffect(() => {
    //   const data = { tuitionId, paymentId };
    //   dispatch(updatePayment(data));
    // }, [tuitionId, paymentId, dispatch]);
    return (
        <div className="relative overflow-x-auto mx-40 border-2 border-sky-600 bg-white">
            <table className="w-full text-sm text-left">
                <tbody>
                    <tr
                        className="border-b"
                        onClick={toggleBox}
                        style={{ cursor: 'pointer' }}
                    >
                        <th scope="row" className="ps-6 py-4 whitespace-nowrap">
                            <KeyboardArrowRightIcon />
                            <span
                                className="p-4 text-center font-bold"
                                style={{ marginRight: '-80px' }}
                            >
                                Tháng {lunch.month} - Năm {lunch.year}
                            </span>
                        </th>

                        {isBoxOpen && (
                            <div className="relative overflow-x-auto">
                                <table className="w-full">
                                    <thead className="text-xs">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                Tiền ăn
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                {(
                                                    lunch.totalPay * 240
                                                ).toLocaleString('en-US')}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                Trạng thái thanh toán
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                {lunch.paymentStatus ||
                                                    'chưa thanh toán'}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                Thời gian đóng
                                            </th>
                                            <th
                                                scope="col"
                                                className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                            >
                                                {lunch.payAt}
                                            </th>
                                        </tr>

                                        {lunch.paymentStatus ===
                                        'Đã thanh toán' ? null : ( // Nếu paymentStatus là "Đã thanh toán", nút sẽ biến mất
                                            // Nếu paymentStatus không phải "Đã thanh toán", hiển thị nút "Thanh toán"
                                            <tr>
                                                <th scope="col"></th>
                                                <th
                                                    scope="col"
                                                    className="border-r px-6 py-4 dark:border-neutral-500 text-center"
                                                >
                                                    <button
                                                        type="button"
                                                        className="border-2 border-sky-600 hover:bg-sky-700 font-semibold px-6 py-3 rounded-md"
                                                        onClick={handleCheckout}
                                                    >
                                                        Thanh toán
                                                    </button>
                                                </th>
                                            </tr>
                                        )}
                                    </thead>
                                </table>
                            </div>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LunchItem;
