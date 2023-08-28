import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Banking System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotUserID() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    account_num : null,
    username:null,
    login_passwd_1:null,
    transaction_passwd_1:null,
    login_passwd_2:null,
    transaction_passwd_2:null,
    OTP:null,
    sendOTP: true
  });

  const [reqFields, setReqFields] = useState({
    account_num : true,
    username: true,
    login_passwd_1: true,
    login_passwd_2: true,
    transaction_passwd_1: true,
    transaction_passwd_2: true,
    OTP: true
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const missingFields = Object.keys(reqFields).filter(field => {
      return reqFields[field] && state[field]===""
    })
    if(missingFields.length >0){
      const missing = missingFields.join(", ")
      alert(`Some mandatory fields are empty! ${missingFields}`)
    }
    else if(state.login_passwd_1===state.login_passwd_2 && state.transaction_passwd_1===state.transaction_passwd_2){
      const data = {
        account_num: parseInt(state.account_num),
        username:state.username,
        login_passwd:state.login_passwd_1,
        transcation_passwd:state.transaction_passwd_1,
        otp: parseInt(state.OTP)
      }
      console.log(data)
      axios.post('http://localhost:8082/netbanking/register/validate', data).then().catch((error)=> {
      console.log(error.response.data)
    }) 
    alert("Registered Successfully!")
    navigate("/login");
    }
    else{
      console.log(state.login_passwd_1)
      console.log(state.login_passwd_2)
      console.log(state.transaction_passwd_1)
      console.log(state.transaction_passwd_2)
      alert("Passwords do not match!")
    }
  };
  const handleSendOTP = (event) => {
    console.log("OTP sent!");
    const data = {
      account_num : parseInt(state.account_num)
    }
    console.log(data)
    axios.post('http://localhost:8082/netbanking/register', data).then((res) => {
    console.log(res.response.data)
  }).catch((error)=> {
    console.log(error)
  })
    setState((prevProps) => ({
        ...prevProps,
        ["sendOTP"]: false
    }));
  }
  const handleResendOTP = (event) => {
    handleSendOTP(event);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div className="form-control">
          <label>Enter Account Number:</label>
          <input
            type="text"
            name="account_num"
            value={state.account_num}
            onChange={handleInputChange}
          />
          {reqFields.account_num && state.account_num==="" && "Account Number is mandatory!"}
        </div>
        <div>
                    <div className="form-control">
                    <label> Enter Username:</label>
                    <input 
                        type="text" 
                        name="username"
                        value={state.username}
                        onChange={handleInputChange} />
                        {reqFields.username && state.username==="" && "Username is mandatory!"}
                    </div>
                    <div className="form-control">
                    <label>Enter Login Password:</label>
                    <input 
                        type="password" 
                        name="login_passwd_1"
                        value={state.login_passwd_1}
                        onChange={handleInputChange} />
                        {reqFields.login_passwd_1 && state.login_passwd_1==="" && "Login password is mandatory!"}
                    </div>
                    <div className="form-control">
                    <label>Confirm Login Password:</label>
                    <input 
                        type="password" 
                        name="login_passwd_2"
                        value={state.login_passwd_2}
                        onChange={handleInputChange} />
                        {reqFields.login_passwd_2 && state.login_passwd_2==="" && "Confirm login password!"}
                    </div>
                    <div className="form-control">
                    <label>Transaction Password:</label>
                    <input 
                        type="password" 
                        name="transaction_passwd_1"
                        value={state.transaction_passwd_1}
                        onChange={handleInputChange} />
                        {reqFields.transaction_passwd_1 && state.transaction_passwd_1==="" && "Transaction password is mandatory!"}
                    </div>
                    <div className="form-control">
                    <label>Confirm Transaction Password:</label>
                    <input 
                        type="password" 
                        name="transaction_passwd_2"
                        value={state.transaction_passwd_2}
                        onChange={handleInputChange} />
                        {reqFields.transaction_passwd_2 && state.transaction_passwd_2==="" && "Confirm transaction password!"}
                    </div>

                </div>
        
        <div>
            {state.sendOTP && (
                <Button onClick={handleSendOTP}>Send OTP</Button>
            )}
            {!state.sendOTP && (
                <div>
                    <div className="form-control">
                    <label>Enter OTP:</label>
                    <input 
                        type="text" 
                        name="OTP"
                        value={state.OTP}
                        onChange={handleInputChange} />
                    </div>
                    <Button onClick={handleResendOTP}>Resend OTP</Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Register
                    </Button>
                </div>
            )}
        </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}