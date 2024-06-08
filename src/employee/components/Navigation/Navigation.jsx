import { useEffect, useState } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModal from '../../Auth/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../../../State/Auth/Action';

export default function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [employeeAnchorEl, setEmployeeAnchorEl] = useState(null);
    const [adminAnchorEl, setAdminAnchorEl] = useState(null);

    const jwt = localStorage.getItem('accessToken');
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpenAuthModal(true);
    };
    const handleClose = () => {
        setOpenAuthModal(false);
    };

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');
    };

    const handleEmployeeMenuOpen = (event) => {
        setEmployeeAnchorEl(event.currentTarget);
    };

    const handleEmployeeMenuClose = () => {
        setEmployeeAnchorEl(null);
    };

    const handleAdminMenuOpen = (event) => {
        setAdminAnchorEl(event.currentTarget);
    };

    const handleAdminMenuClose = () => {
        setAdminAnchorEl(null);
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
                        <div className="ml-auto flex gap-10 items-center">
                            {auth.user?.roles[0].name === 'ROLE_EMPLOYEE' ? (
                                <>
                                    <Avatar
                                        alt={auth.user.name}
                                        src="/path-to-employee-avatar.jpg" // Replace with the actual path to the employee's avatar image
                                        onClick={handleEmployeeMenuOpen}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Menu
                                        anchorEl={employeeAnchorEl}
                                        open={Boolean(employeeAnchorEl)}
                                        onClose={handleEmployeeMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/account/profile');
                                                handleEmployeeMenuClose();
                                            }}
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/account/lunch');
                                                handleEmployeeMenuClose();
                                            }}
                                        >
                                            Register Lunch
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/employee/leave');
                                                handleEmployeeMenuClose();
                                            }}
                                        >
                                            Request Leave
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : auth.user?.roles[0].name === 'ROLE_ADMIN' ? (
                                <>
                                    <Avatar
                                        alt={auth.user.name}
                                        src="/path-to-admin-avatar.jpg" // Replace with the actual path to the admin's avatar image
                                        onClick={handleAdminMenuOpen}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <Menu
                                        anchorEl={adminAnchorEl}
                                        open={Boolean(adminAnchorEl)}
                                        onClose={handleAdminMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/admin');
                                                handleAdminMenuClose();
                                            }}
                                        >
                                            All Employee
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/create-notice', {
                                                    state: location.pathname,
                                                });
                                                handleAdminMenuClose();
                                            }}
                                        >
                                            Create Notice
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                navigate(
                                                    '/admin/list-request-leave'
                                                );
                                                handleAdminMenuClose();
                                            }}
                                        >
                                            Request Leave
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
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
                    </div>
                </nav>
            </header>
            <AuthModal handleClose={handleClose} open={openAuthModal} />
        </div>
    );
}
