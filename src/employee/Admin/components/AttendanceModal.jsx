import { Box, Modal } from '@mui/material';
import React from 'react';

import AttendanceForm from './AttendanceForm';

const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 1000,
    // height: 500,
    // outline: 'none',
    // boxShadow: 24,
    // p: 4,
};

const AttendanceModal = ({ handleClose, open, attendances }) => {
    return (
        <div className="bg-white">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AttendanceForm attendances={attendances} />
                </Box>
            </Modal>
        </div>
    );
};

export default AttendanceModal;
