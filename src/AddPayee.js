import React, { useEffect } from 'react'
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

export default function AddPayee() {
  const [state, setState] = useState({
    user_acc_num:null,
    name:"",
    nick:"",
    acc_num_1:null,
    acc_num_2:null,
  });
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
    if(state.acc_num_1===state.acc_num_2){
        const data = {
        "id":{
            "payee_acc_num": state.acc_num_1
        },
        "name":state.name,
        "nick_name":state.nick,
        "account" : {
            "account_num": parseInt(sessionStorage.getItem("account_num"))
        }

        }
        console.log(data);
        axios.post('http://localhost:8082/payee', data).then((res)=>{
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        })
    }

  };

  useEffect(()=>{
    if(sessionStorage.getItem("username")===null){
      navigate("/login")
    }

  })

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
            Add New Beneficiary
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div className="form-control">
            <label>Add beneficiary to Account:</label>
            <input 
                type="int" 
                name="deb_acc_num" 
                defaultValue = {sessionStorage.getItem("account_num")}
                readOnly = {true}
            />
        </div>
          <div className='full-form'>
          <div className="form-field">
            <div className='left-col'>
          <label>Beneficiary Name:</label>
          </div>
          <input
            type="text"
            name="name"
            className='right-col'
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-field">
            <div className='left-col'>
          <label>Enter Beneficiary Account Number:</label>
          </div>
          <input
            type="text"
            name="acc_num_1"
            className='right-col'
            value={state.acc_num_1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
            <div className='left-col'>
          <label>Confirm Beneficiary Account Number:</label>
          </div>
          <input
            type="text"
            name="acc_num_2"
            className='right-col'
            value={state.acc_num_2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <div className='left-col'>
          <label>Nickname: </label>
          </div>
          <input
            className='right-col'
            type="text"
            name="nick"
            value={state.nick}
            onChange={handleInputChange}
          />
        </div>
        </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Beneficiary
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}