import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../Auth/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../../../State/Auth/Action';

export default function Navigation() {
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const jwt = localStorage.getItem('accessToken');
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleOpen = (event) => {
        setOpenAuthModal(true);
    };
    const handleClose = (event) => {
        setOpenAuthModal(false);
    };

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt, dispatch]);

    useEffect(() => {
        if (auth.user) {
            handleClose();
        }
    }, [auth.user]);

    return (
        <div className="bg-white pb-10 z-50">
            <header className="fixed top-0 w-full z-50 bg-white">
                <nav aria-label="Top" className="mx-auto">
                    <div className="flex h-16 items-center px-11 bg-sky-700">
                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 pe-10">
                            <button onClick={() => navigate('/')}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                                    alt=""
                                    width="36px"
                                ></img>
                            </button>
                        </div>
                        {auth.user?.roles[0].name === 'ROLE_EMPLOYEE' ? (
                            <div className="flex gap-10">
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/account/profile')}
                                >
                                    Profile
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/account/lunch')}
                                >
                                    Register Lunch
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : auth.user?.roles[0].name === 'ROLE_ADMIN' ? (
                            <div className="flex items-center gap-10">
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/admin')}
                                >
                                    All Employee
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/create-notice')}
                                >
                                    Create Notice
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleOpen}
                                className="text-sm font-medium hover:text-red-600"
                                style={{ color: 'white' }}
                            >
                                Signin
                            </Button>
                        )}
                    </div>
                </nav>
            </header>
            <AuthModal handleClose={handleClose} open={openAuthModal} />
        </div>
    );
}
