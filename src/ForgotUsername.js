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
  const [state, setState] = useState({
    account_num : "",
    OTP:"",
    sendOTP: true
  });

  const [reqFields, setReqFields] = useState({
    account_num: true,
    OTP:true
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
    else{
      const data = {
        account_num: parseInt(state.account_num),
        otp: parseInt(state.OTP)
      }
      console.log(data)
      axios.post('http://localhost:8082/netbanking/forgot_username/validate', data).then((res) => {
      console.log(res.data)
    }).catch((error)=> {
      console.log(error)
    }) 
  }
  };
  
  const handleSendOTP = (event) => {
    console.log("OTP sent!");
    const data = {
      account_num : parseInt(state.account_num)
    }
    axios.post('http://localhost:8082/netbanking/forgot_username', data).then((res) => {
    console.log(res.data)
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
            Forgot Username
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
                        {reqFields.OTP && state.OTP==="" && "OTP is mandatory!"}
                    </div>
                    <Button onClick={handleResendOTP}>Resend OTP</Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Send User ID
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