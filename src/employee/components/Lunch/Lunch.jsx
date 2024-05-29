import React, { useEffect, useState } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updatePayment } from '../../../State/Payment/Action';
import LunchItem from './LunchItem';
import usePrivateApi from '../../../hooks/usePrivateApi';
import { getUser } from '../../../State/Auth/Action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lunch = () => {
    const api = usePrivateApi();
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();

    const { lunchId } = useParams();
    const [paymentId, setPaymentId] = useState();
    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);

        setPaymentId(urlParam.get('razorpay_payment_id'));
    }, []);
    useEffect(() => {
        const data = { lunchId, paymentId };
        dispatch(updatePayment(data));
    }, [lunchId, paymentId, dispatch]);
    //-----
    const handleLunch = () => {
        // Gửi POST request đến /add
        api.post('/lunch/register')
            .then((response) => {
                toast.success('register lunch of month success');
                dispatch(getUser(localStorage.getItem('accessToken')));
            })
            .catch((error) => {
                toast.warning('You registered');
                console.error(error);
            });
    };
    const items = auth.user?.lunches.map((item) => <LunchItem lunch={item} />);
    return (
        <div className="mb-96">
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <thead class="flex justify-center">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-slate-900"
                            style={{ fontSize: '30px' }}
                        >
                            LUNCH INFORMATION
                        </th>
                    </tr>
                </thead>
                {/* <div className="relative px-5 border">
          <EmployeeInfo userInfo={auth.user} />
        </div> */}
                <div class="relative px-5">
                    <button
                        onClick={handleLunch}
                        className="px-4 py-2 tracking-wide transition-colors duration-200 transform bg-sky-600 text-bold rounded-md hover:bg-sky-700 focus:outline-none focus:bg-blue-600"
                    >
                        Register lunch of month
                    </button>
                </div>
                <div class="relative px-5">
                    <div class="p-1">
                        <div>{items}</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Lunch;
