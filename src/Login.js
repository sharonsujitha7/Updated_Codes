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
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import setAuthToken from './setAuthToken';
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

export default function SignIn() {
  const [state, setState] = useState({
    username: null,
    password: null
  });
  const [reqFields, setReqFields] = useState({
    username: true,
    password: true
  })
  const navigate = useNavigate();

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
        username: state.username,
        password: state.password
      }
      console.log(data)
      axios.post('http://localhost:8082/netbanking/login', data).then((res) => {
        sessionStorage.setItem('username', state.username);
        sessionStorage.setItem('userId', res.data?.data?.user_id)
        sessionStorage.setItem('jwt_token', res.data.jwt_token )
        setAuthToken(res.data.data.jwt_token)
        console.log(res.data.data.jwt_token)
        navigate("/dashboard")
        alert("Login Successful")
        
      }).catch((error)=> {
        console.log(error)
        alert("Bad User Credentials")
        
      })
      // sessionStorage.setItem("userID", state.username);

    //   const sessionTimeoutMinutes = 15;
    // const sessionTimeoutMilliseconds = sessionTimeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
    // const clearSessionTimer = setTimeout(() => {
    //   sessionStorage.clear();
    // }, sessionTimeoutMilliseconds);   

    //   navigate("/dashboard");

    }
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div className='full-form'>
          <div className="form-field">
            <div className='left-col'>
          <label>Username:</label>
          </div>
          <input
            type="text"
            name="username"
            className='right-col'
            value={state.username}
            onChange={handleInputChange}
          />
          {reqFields.username && state.username==="" && "Username is mandatory!"}
        </div>
        <div className="form-field">
          <div className='left-col'>
          <label>Password</label>
          </div>
          <input
            className='right-col'
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
          {reqFields.password && state.password=="" && "Password is mandatory!"}
        </div>
        </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotUsername" variant="body2">
                  {"Forgot Username?"}
                </Link>

              </Grid>
              <Grid item>

                <Link href="/Register" variant="body2">
                  {"First Time User? Register"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>

              <Grid item>

                <Link href="/forgotPassword" variant="body2">
                  {"Forgot Password?"}
                </Link>
              </Grid>
            </Grid>
          
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}