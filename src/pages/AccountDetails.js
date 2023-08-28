import React, { useState, useEffect } from "react";
import axios from 'axios';

function AccountDetails() {
  const [accountData, setAccountData] = useState({
    username: "",
    account_num: "",
    account_type: "",
    open_date: "",
    balance: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    var detailsUrl = ({username}) => `http://localhost:8082/netbanking/${username}`;
    axios.get(detailsUrl({username: username}))
      .then((res) => {
        // Assuming the response properties match the state property names
        setAccountData({
          username: res.data.username,
          account_num: res.data.account_num,
          account_type: res.data.account_type,
          open_date: res.data.open_date,
          balance: res.data.balance
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>There was some error fetching your account details: {error.message}</p>
      </div>
    );
  }

  if (!accountData.username) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1><b>Account Details</b></h1>
      <p>Account Number: {accountData.account_num}</p>
      <p>Account type: {accountData.account_type}</p>
      <p>Balance: {accountData.balance}</p>
      <p>Date of opening: {accountData.open_date}</p>
    </div>
  );
}

export default AccountDetails;
