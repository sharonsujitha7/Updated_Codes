import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import "./CreateAccount.css"

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

export default function CreateAccount() {
  const [checkstate, setIsChecked] = useState({
    "is_credit_card":false,
    "is_debit_card":false,
    "is_net_banking":false
  });
  const [state, setState] = useState({
    "adhar_id": null,
    "age": null,
    "annual_income": null,
    "dob": null,
    "email": null,
    "father_name": null,
    "first_name": null,
    "gender": null,
    "income_source": null,
    "is_admin": null,
    "last_name": null,
    "middle_name": null,
    "mobile_num": null,
    "occupation_type": null,
    "perm_add_id": null,
    "temp_add_id": null,
    "perm_add_line_1":null,
    "perm_add_line_2": null,
    "perm_add_line_3": null,
    "temp_add_line_1": null,
    "temp_add_line_2": null,
    "temp_add_line_3": null,
    "title": null,
    "balance": null,
    "account_type":null,

  });
  const [requiredFields, setRequiredFields] = useState({
    "adhar_id": true,
    "age": true,
    "annual_income": true,
    "dob": true,
    "email": true,
    "father_name": true,
    "first_name": true,
    "gender": true,
    "income_source": true,
    "is_admin": true,
    "last_name": true,
    "middle_name": false,
    "mobile_num": true,
    "occupation_type": true,
    "perm_add_line_1":true,
    "perm_add_line_2": false,
    "perm_add_line_3": false,
    "temp_add_line_1": false,
    "temp_add_line_2": false,
    "temp_add_line_3": false,
    "title": false,
    "balance": true,
    "account_type":true,

  });

  const [emailerror, setEmailError] = useState(null)
  const [mobileerror, setMobileError] = useState(null)
  const [aadhaarerror, setAadhaarError] = useState(null)

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(input)){
      setEmailError("Invalid Email Address!")
    }
    else{
      setEmailError("")
    }
  };
  const validateMobileNumber = (input) => {
    const mobileRegex = /^\d{10}$/
    if(!mobileRegex.test(input)){
      setMobileError("Invalid Mobile Number")
    }
    else{
      setMobileError("")
    }
  };
  const validateAadhaarNumber = (input) => {
    const mobileRegex = /^\d{12}$/
    if(!mobileRegex.test(input)){
      setAadhaarError("Invalid Aadhaar Number")
    }
    else{
      setAadhaarError("")
    }
  };
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    const { value } = event.target
    setState((prevProps)=>({
      ...prevProps,
      email: value
    }))
    validateEmail(value);
  }
  const handleMobileChange = (event) => {
    const { value } = event.target
    setState((prevProps)=>({
      ...prevProps,
      mobile_num: value
    }))
    validateMobileNumber(value);
  }
  const handleAadhaarChange = (event) => {
    const { value } = event.target
    setState((prevProps)=>({
      ...prevProps,
      adhar_id: value
    }))
    validateAadhaarNumber(value);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));

  };

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    setIsChecked((prevProps) => ({
      ...prevProps,
      [name]: !prevProps[name]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const missingFields = Object.keys(requiredFields).filter(field => {
      return requiredFields[field] && state[field]===""
    })
    const disabled = aadhaarerror!=="" || emailerror!=="" || mobileerror!=""
    if(missingFields.length >0){
      const missing = missingFields.join(", ")
      alert(`Some mandatory fields are empty! ${missingFields}`)
    }
    else if(!disabled){
      let data = {
        'email': state.email,
        'mobile_num':parseInt(state.mobile_num),
        'adhar_id': parseInt(state.adhar_id),
        'title': state.title,
        'first_name': state.first_name,
        'middle_name': state.middle_name,
        'last_name': state.last_name,
        'father_name': state.father_name,
        'dob': state.dob,
        'age': parseInt(state.age),
        'gender': state.gender,
        'perm_add_id': state.perm_add_line_1 + ' ' + state.perm_add_line_2 + ' ' + state.perm_add_line_3,
        'temp_add_id': state.temp_add_line_1 + ' ' + state.temp_add_line_2 + ' ' + state.temp_add_line_3,
        'is_admin':parseInt(state.is_admin),
        'occupation_type': state.occupation_type,
        'income_source': state.income_source,
        'annual_income': parseInt(state.annual_income),
        'account':{
          'account_type':state.account_type,
          
          'balance': state.balance.toString(),
          'open_date':'',
          'timestamp':parseInt('0'),
          'is_credit_card':(checkstate.is_credit_card ? 1 : 0),
          'is_debit_card' : (checkstate.is_debit_card ? 1 : 0),
          'is_net_banking': (checkstate.is_net_banking ? 1 : 0)
        }
      }
      console.log(data)
      axios.post('http://127.0.0.1:8082/user', data).then((res) => {
        console.log(res.data)
        navigate("/")
        alert("Registration Successful!")
        
      }).catch((error)=> {
        console.log(error)
        alert("Invalid details!")
        
      })
    //   console.log(data)
    //   axios({
    //     method: 'post',
    //     url: 'http://127.0.0.1:8082/user',
    //     data: data,
        
    //   });
      };
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
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div className="form-control">
              <label>Email: </label>
              <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleEmailChange}
                onBlur = {()=>validateEmail(state.email)}
                required = {requiredFields.email}
                error = {requiredFields.email && state.email==""}
              />
              {emailerror && <div className="error-text">{emailerror}</div> }
              {requiredFields.email && state.email=="" && "Email is mandatory!"}
            </div>
            <div className="form-control">
              <label>Mobile Number: </label>
              <input
                type="int"
                name="mobile_num"
                value={state.mobile_num}
                onChange={handleMobileChange}
                onBlur = {()=>validateMobileNumber(state.mobile_num)}
                required = {requiredFields.mobile_num}
                error = {requiredFields.mobile_num && state.mobile_num===""}
              />
              {mobileerror && <div className="error-text">{mobileerror}</div> }
              {requiredFields.mobile_num && state.mobile_num==="" && "Mobile number is mandatory!"}
            </div>
            <div className="form-control">
              <label>Aadhaar Number: </label>
              <input
                type="int"
                name="adhar_id"
                value={state.adhar_id}
                onChange={handleAadhaarChange}
                onBlur = {()=>validateAadhaarNumber(state.adhar_id)}
                required = {requiredFields.adhar_id}
                error = {requiredFields.adhar_id && state.adhar_id === ""}
              />
              {aadhaarerror && <div className="error-text">{aadhaarerror}</div> }
              {requiredFields.adhar_id && state.adhar_id === "" && "Aadhaar ID is mandatory!"}
            </div>
            <div className="form-control">
              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={state.title}
                onChange={handleInputChange}
                required = {requiredFields.title}
                error = {requiredFields.title && state.title === ""}
              />
              {requiredFields.title && state.title === "" && "Title is mandatory!"}
            </div>
            <div className="form-control">
              <label>First Name: </label>
              <input
                type="text"
                name="first_name"
                value={state.first_name}
                onChange={handleInputChange}
                required = {requiredFields.first_name}
                error = {requiredFields.first_name && state.first_name === ""}
              />
              {requiredFields.first_name && state.first_name === "" && "First name is mandatory!"}
            </div>
            <div className="form-control">
              <label>Middle Name: </label>
              <input
                type="text"
                name="middle_name"
                value={state.middle_name}
                onChange={handleInputChange}
                required = {requiredFields.middle_name}
                error = {requiredFields.middle_name && state.middle_name === ""}
              />
              {requiredFields.middle_name && state.middle_name === "" && "Middle name is mandatory!"}
            </div>
            <div className="form-control">
              <label>Last Name: </label>
              <input
                type="text"
                name="last_name"
                value={state.last_name}
                onChange={handleInputChange}
                required = {requiredFields.last_name}
                error = {requiredFields.last_name && state.last_name === ""}
              />
              {requiredFields.last_name && state.last_name === "" && "Last name is mandatory!"}
            </div>
            <div className="form-control">
              <label>Father's Name: </label>
              <input
                type="text"
                name="father_name"
                value={state.father_name}
                onChange={handleInputChange}
                required = {requiredFields.father_name}
                error = {requiredFields.father_name && state.father_name === ""}
              />
              {requiredFields.father_name && state.father_name === "" && "Fathers name is mandatory!"}
            </div>
            <div className="form-control">
              <label>Date of Birth: </label>
              <input
                type="text"
                name="dob"
                value={state.dob}
                onChange={handleInputChange}
                required = {requiredFields.dob}
                error = {requiredFields.dob && state.dob===""}
              />
               {requiredFields.dob && state.dob==="" && "date of birth is mandatory"}
            </div>
            <div className="form-control">
              <label>Age: </label>
              <input
                type="int"
                name="age"
                value={state.age}
                onChange={handleInputChange}
                required = {requiredFields.age}
                error = {requiredFields.age && state.age===""}
              />
              {requiredFields.age && state.age==="" && "Age is mandatory"}
            </div>
            <div className="form-control">
              <label>Gender: </label>
              <input
                type="text"
                name="gender"
                value={state.gender}
                onChange={handleInputChange}
                required = {requiredFields.gender}
                error = {requiredFields.gender && state.gender===""}
              />
              {requiredFields.gender && state.gender==="" && "Gender is mandatory!"}
            </div>
            <h2>Permanent Address</h2>
            <div className="form-control">
              <label>Permanent Address Line 1: </label>
              <input
                type="text"
                name="perm_add_line_1"
                value={state.perm_add_line_1}
                onChange={handleInputChange}
                required = {requiredFields.perm_add_line_1}
                error = {requiredFields.perm_add_line_1 && state.perm_add_line_1===""}
              />
              {requiredFields.perm_add_line_1 && state.perm_add_line_1==="" && "Permanent address is mandatory!"}
            </div>
            <div className="form-control">
              <label>Permanent Address Line 2: </label>
              <input
                type="text"
                name="perm_add_line_2"
                value={state.perm_add_line_2}
                onChange={handleInputChange}
                required = {requiredFields.perm_add_line_2}
                error = {requiredFields.perm_add_line_2 && state.perm_add_line_2===""}
              />
              {requiredFields.perm_add_line_2 && state.perm_add_line_2==="" && "Permanent address is mandatory!"}
            </div>
            <div className="form-control">
              <label>Permanent Address Line 3: </label>
              <input
                type="text"
                name="perm_add_line_3"
                value={state.perm_add_line_3}
                onChange={handleInputChange}
                required = {requiredFields.perm_add_line_3}
                error = {requiredFields.perm_add_line_3 && state.perm_add_line_3===""}
              />
              {requiredFields.perm_add_line_3 && state.perm_add_line_3==="" && "Permanent address is mandatory!"}
            </div>
            <h2>Temporary Address</h2>
            <div className="form-control">
              <label>Temporary Address Line 1: </label>
              <input
                type="text"
                name="temp_add_line_1"
                value={state.temp_add_line_1}
                onChange={handleInputChange}
                required = {requiredFields.temp_add_line_1}
                error = {requiredFields.temp_add_line_1 && state.temp_add_line_1===""}
              />
              {requiredFields.temp_add_line_1 && state.temp_add_line_1==="" && "Temporary address is mandatory!"}
            </div>
            <div className="form-control">
              <label>Temporary Address Line 2: </label>
              <input
                type="text"
                name="temp_add_line_2"
                value={state.temp_add_line_2}
                onChange={handleInputChange}
                required = {requiredFields.temp_add_line_2}
                error = {requiredFields.temp_add_line_2 && state.temp_add_line_2===""}
              />
              {requiredFields.temp_add_line_2 && state.temp_add_line_2==="" && "Temporary address is mandatory!"}
            </div>
            <div className="form-control">
              <label>Temporary Address Line 3: </label>
              <input
                type="text"
                name="temp_add_line_3"
                value={state.temp_add_line_3}
                onChange={handleInputChange}
                required = {requiredFields.temp_add_line_3}
                error = {requiredFields.temp_add_line_3 && state.temp_add_line_3===""}
              />
              {requiredFields.temp_add_line_3 && state.temp_add_line_3==="" && "Temporary address is mandatory!"}
            </div>
            <div className="form-control">
              <label>Admin: </label>
              <input
                type="int"
                name="is_admin"
                value={state.is_admin}
                onChange={handleInputChange}
                required = {requiredFields.is_admin}
                error = {requiredFields.is_admin && state.is_admin===""}
              />
              {requiredFields.is_admin && state.is_admin==="" && "This field is mandatory!"}
            </div>
            <div className="form-control">
              <label>Occupation Type: </label>
              <input
                type="text"
                name="occupation_type"
                value={state.occupation_type}
                onChange={handleInputChange}
                required = {requiredFields.occupation_type}
                error = {requiredFields.occupation_type && state.occupation_type===""}
              />
              {requiredFields.occupation_type && state.occupation_type==="" && "Occupation type is mandatory!"}
            </div>
            <div className="form-control">
              <label>Source of Income: </label>
              <input
                type="text"
                name="income_source"
                value={state.income_source}
                onChange={handleInputChange}
                required = {requiredFields.income_source}
                error = {requiredFields.income_source && state.income_source ===""}
              />
              {requiredFields.income_source && state.income_source ==="" && "Income Source is mandatory!"}
            </div>
            <div className="form-control">
              <label>Annual Income: </label>
              <input
                type="int"
                name="annual_income"
                value={state.annual_income}
                onChange={handleInputChange}
                required = {requiredFields.annual_income}
                error = {requiredFields.annual_income && state.annual_income===""}
              />
              {requiredFields.annual_income && state.annual_income==="" && "Annual income is mandatory!"}
            </div>
            <h1> Account details : </h1>
            <div className="form-control">
              <label>Account Type: </label>
              <input
                type="text"
                name="account_type"
                value={state.account_type}
                onChange={handleInputChange}
                required = {requiredFields.account_type}
                error = {requiredFields.account_type && state.account_type===""}
              />
              {requiredFields.account_type && state.account_type==="" && "Account type is mandatory!"}
            </div>
            <div className="form-control">
              <label>Balance: </label>
              <input
                type="int"
                name="balance"
                value={state.balance}
                onChange={handleInputChange}
                required = {requiredFields.balance}
                error = {requiredFields.balance && state.balance ===""}
              />
              {requiredFields.balance && state.balance ==="" && "Balance is mandatory!"}
            </div>
            <div className="form-control">
              <label>Username: </label>
              <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleInputChange}
                required = {requiredFields.username}
                error = {requiredFields.username && state.username===""}
              />
              {requiredFields.username && state.username==="" && "Username is mandatory!"}
            </div>
            <FormControlLabel
              control={<Checkbox name="is_credit_card" color="primary"  onChange={handleCheckboxChange}/>}
              label="Credit Card?"
            />
            <FormControlLabel
              control={<Checkbox name="is_debit_card" color="primary"  onChange={handleCheckboxChange}/>}
              label="Debit Card?"
            />
            <FormControlLabel
              control={<Checkbox name="is_net_banking" color="primary"  onChange={handleCheckboxChange}/>}
              label="Net Banking?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">

                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">

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