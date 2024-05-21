import { Box, Modal } from "@mui/material";
import React from "react";

import SalaryForm from "./SalaryForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 500,
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const SalaryModal = ({ handleClose, open, salaries }) => {
  console.log("value: ", salaries);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SalaryForm salaries={salaries} />
        </Box>
      </Modal>
    </div>
  );
};

export default SalaryModal;
