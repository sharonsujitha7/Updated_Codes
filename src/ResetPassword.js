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
import { useNavigate } from 'react-router-dom';


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

export default function ResetPassword() {
  const [state, setState] = useState({
    account_num: "",
    password1: "",
    password2: "",
  });
  const [reqFields, setReqFields] = useState({
    account_num: true,
    password1: true,
    password2: true
  });
  const navigate=useNavigate();
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
      if(state.password1 === state.password2){
          let data = {
            account_num: state.account_num,
              password : state.password1
          }
          axios.post('http://localhost:8082/netbanking/new_password', data).then((res) => {
      console.log(res.data);
      
      navigate("/login")
          }).catch((error)=>{
            console.log(error);
          })
          console.log(state);
      }
      else{
        alert("Passwords are not matching!")
      }
    }
    
  };

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
            Reset Password
          </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <div className="form-control">
          <label>Enter Account Number</label>
          <input
            type="account_num"
            name="account_num"
            value={state.account_num}
            onChange={handleInputChange}
          />
          {reqFields.account_num && state.account_num==="" && "Account number is mandatory!"}
        </div>
          <div className="form-control">
          <label>Enter New Password</label>
          <input
            type="password"
            name="password1"
            value={state.password1}
            onChange={handleInputChange}
          />
          {reqFields.password1 && state.password1==="" && "Enter new password!"}
        </div>
        <div className="form-control">
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="password2"
            value={state.password2}
            onChange={handleInputChange}
          />
          {reqFields.password2 && state.password2==="" && "Confirm new password!"}
        </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}