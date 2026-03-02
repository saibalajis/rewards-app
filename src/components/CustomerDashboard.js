import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Card, CardContent } from "@mui/material";

import { useTransactions } from "../hooks/useTransactions";
import { groupByCustomer } from "../utils/aggregationHelper";
import { PAGE_SIZE } from "../utils/constants";
import Pagination from "./Pagination";

const DEFAULT_PAGE = 1

const CustomerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const { data, loading, error } = useTransactions();
  const navigate = useNavigate();
  
  const groupedData = useMemo(() => groupByCustomer(data), [data]);

  const customerIds = Object.keys(groupedData);

  const totalPages = Math.ceil(customerIds.length / PAGE_SIZE);

  const totalCustomers = customerIds.length;
  const totalTransactions = data.length;
  const totalAmount = data.reduce((sum, txn) => sum + txn.amount, 0);
  const totalPoints = Object.values(groupedData).reduce(
    (sum, cust) => sum + cust.totalPoints,
    0
  );

  return (
    <div className="container">
      <Typography variant="h4">Customer Rewards Dashboard</Typography>
      <Typography variant="h6">Summary of reward points earned by customers over the last three months.</Typography>
      {loading &&
        <Typography>Loading...</Typography>
      }
      {error &&
        <Typography color="error">{error}</Typography> 
      }
      
      {!loading && !error && (
        <>
          <Grid container spacing={2} className="kpi-container">
            <Grid item xs={12} sm={6} md={3}>
              <Card className="kpi-card">
                <CardContent>
                  <Typography variant="subtitle2">Total Customer: {totalCustomers}</Typography>
                  <Typography variant="subtitle2">Total Transactions: {totalTransactions}</Typography>
                  <Typography variant="subtitle2">Total Amount Spent: ${totalAmount.toFixed(2)}</Typography>
                  <Typography variant="subtitle2">Total Reward Points: {totalPoints}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="body2" className="click-hint">Click on the below Customer Row to View monthly breakdown</Typography>
          <Paper className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Total Reward Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerIds
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map(id => (
                    <TableRow key={id} hover className="clickable-row" onClick={() => navigate(`/customer/${id}`)}>
                    <TableCell>{id}</TableCell>
                    <TableCell>${groupedData[id].totalAmount}</TableCell>
                    <TableCell>{groupedData[id].totalPoints}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
      )}
    </div>
  );
};
 
export default CustomerDashboard;
