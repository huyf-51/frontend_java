import React from 'react';
import EmailRegister from './EmailRegister';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Typography } from '@mui/material';
const Footer = () => {
    return (
        <footer className="bg-gray-200">
            <div className="py-10 border-t border-black mx-10 flex justify-center items-center gap-96 ">
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="pe-60"
                >
                    <CopyrightIcon fontSize="small" /> 2024 My Company. All
                    rights reserved.
                </Typography>
                <div className="text-lg font-bold ps-60">
                    Contact with us: abc@gmail.com
                </div>
            </div>
        </footer>
    );
};

export default Footer;
