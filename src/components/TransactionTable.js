import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@mui/material";
 
import { useTransactions } from "../hooks/useTransactions";
import { groupByCustomer } from "../utils/aggregationHelper";
 
const TransactionTable = () => {
  const { id, month } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useTransactions();
 
  const groupedData = useMemo(() => groupByCustomer(data), [data]);
 
  const customerData = groupedData[id];
 
  const transactions = customerData?.monthly[month]?.transactions ?? [];
 
  return (
    <>
      <h1>Transactions - {id} - {month}</h1>
      {loading &&
        <Typography>Loading...</Typography>
      }
      {error &&
        <Typography color="error">{error}</Typography>
      }
      {!transactions && !loading && (
        <Typography>No Transactions found</Typography>
      )}
 
      {!loading && transactions && (
        <>
          <Paper className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Button onClick={() => navigate(`/customer/${id}`)}>Back to Monthly</Button>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </>
      )}
    </>
  );
};
 
export default TransactionTable;