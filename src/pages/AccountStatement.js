import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountStatement() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    var detailsUrl = ({username}) => `http://localhost:8082/netbanking/${username}`;
    console.log(detailsUrl({username : username}));
    axios.get(detailsUrl({username: username}))
      .then((res) => {
        setTransactions(res.data.transcations);
        console.log(transactions);
      })
      
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>There was some error fetching your transactions: {error.message}</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return <p>No transactions available.</p>;
  }

  return (
    <div>
      <h1><b>Account Statement</b></h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Transaction Type</th>
            <th>Amount Transfer</th>
            <th>Credit Account Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction["transcaction_id"]}</td>
              <td>{transaction["transcation_type"]}</td>
              <td>{transaction["amount_transfer"]}</td>
              <td>{transaction["credit_acc_num"]}</td>
              <td>{transaction["timestamp"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountStatement;