import React from "react";
import PropTypes from "prop-types";
import {Button, Typography, Stack} from "@mui/material";
 
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
 
  return (
    <div className="paginated-container">
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
 
      <Typography>Page {currentPage} of {totalPages}</Typography>
 
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
      </Stack>
    </div>
  );
};
 
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
 
export default Pagination;