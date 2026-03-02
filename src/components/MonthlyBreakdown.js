import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Paper } from "@mui/material";
 
import { useTransactions } from "../hooks/useTransactions";
import { groupByCustomer } from "../utils/aggregationHelper";
 
const MonthlyBreakdown = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useTransactions();
 
  const groupedData = useMemo(() => groupByCustomer(data), [data]);
 
  const customerData = groupedData[id];
 
  return (
    <div className="container">
      <Typography variant="h5">Monthly Breakdown - {id}</Typography>
      {loading &&
        <Typography>Loading...</Typography>
      }
      {error &&
        <Typography color="error">{error}</Typography>
      }
      {!customerData && !loading && (
        <>
        <Typography>No transactions found for this customer</Typography>
        <Button onClick={() => navigate("/")}>Back</Button>
        </>
      )}
     
      {!loading && customerData && Object.entries(customerData?.monthly).map(([monthKey, monthData]) => (
        <Paper
          key={monthKey}
          className="month-card"
        >
          <Typography>{monthKey}</Typography>
          <Typography>Total Amount: ${monthData.totalAmount}</Typography>
          <Typography>Total Points: {monthData.totalPoints}</Typography>
 
          <Button variant="contained" onClick={() => navigate(`/customer/${id}/${monthKey}`)}>
            View Transactions
          </Button>
        </Paper>
      ))}
 
      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
    </div>
  );
};
 
export default MonthlyBreakdown;