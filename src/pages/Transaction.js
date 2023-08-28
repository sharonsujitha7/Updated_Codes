import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DisplaySuccess from './TransferSuccesful';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Transaction() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [payees, setPayees] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  useEffect(() => {
    const username = sessionStorage.getItem('username');
    var detailsUrl = ({username}) => `http://localhost:8082/netbanking/${username}`;
    console.log(detailsUrl({username : username}));
    axios.get(detailsUrl({username: username}))
      .then((res) => {
        sessionStorage.setItem("account_num", res.data.account_num)
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
      
    var Url = ({userid}) => `http://localhost:8082/user/${userid}`;
    axios.get(Url({userid: sessionStorage.getItem("userId")})).then((res) => {
      console.log(res)
      const payee_data = res.data?.data?.account?.payee
      setPayees(payee_data)
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
    const [state, setState] = useState({
        transaction_type: "",
        deb_acc_num: sessionStorage.getItem("account_num"),
        cred_acc_num: "",
        remark : "",
        amount:"",
        transaction_date: ""
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
        console.log(state);
        if(state.transaction_type && state.remark && state.deb_acc_num && state.amount){
          const data = {
            'amount_transfer': parseFloat(state.amount),
            'credit_acc_num': parseInt(state.cred_acc_num),
            'account':{
              'account_num':parseInt(state.deb_acc_num)
            },
            'remark':state.remark,
            'transcation_type': state.transaction_type
          }
          axios.post('http://localhost:8082/transfer',data).then((res)=>{
            
          sessionStorage.setItem("remarks", state.remark);
          sessionStorage.setItem("mode", state.transaction_type);
          sessionStorage.setItem("cred_acc", state.cred_acc_num);
          sessionStorage.setItem("amt", state.amount);
          sessionStorage.setItem("timestamp",0);
          sessionStorage.setItem("ref_id",0);
            console.log("Displaying success next");
            navigate("/dashboard/success");
          }).catch((error)=>{
            console.log(error)
          })
        }
      };

    const handleOptionChange = (event) => {
        console.log("Option changed");
        const { name, value } = event.target;
        
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
          }));
    };

    const handleAddPayee = () => {
      navigate("/addpayee")
    }

    const handlePayeeChange = (nick) =>{
      const data = payees.find(account => account.nick_name === nick);
      if(data){
        setState((prevState) =>({
          ...prevState,
          cred_acc_num : data.id.payee_acc_num
        }))
      }
    }



    let additionalFields = null;
    let Note = null;
    let mandatoryFields = (
    <div>
        <div className="form-control">
            <label>From Account:</label>
            <input 
                type="int" 
                name="deb_acc_num" 
                defaultValue = {sessionStorage.getItem("account_num")}
                readOnly = {true}
            />
        </div>
        <div className="form-control">
            <label>To Account:</label>
            <select
                type="int" 
                name = "cred_acc_num"
                value={selectedAccount}
                onChange={ (e) =>{
                  setSelectedAccount(e.target.value);
                  handlePayeeChange(e.target.value);
                }}
                >
                  <option value ="">Select an option</option>
                {payees.map((account, index)=>(<option key = {index} value = {account.nick_name}>{account.nick_name}</option>))}
                </select>
              <button onClick = {handleAddPayee}> + </button>
        </div>
        <div className="form-control">
            <label>Amount:</label>
            <input
                type="int" 
                name="amount" 
                defaultValue = {state.amount}
                onChange={handleInputChange}
                />
        </div>
        <div>
            <label>Transaction Date:</label>
            <input
                type="text" 
                name="transaction_date" 
                defaultValue = {state.transaction_date}
                onChange={handleInputChange}
                />
        </div>
    </div>
    );
    let remarkField = (
        <div className="form-control">
            <label>Remark</label>
            <input
                type="text" 
                name="remark" 
                defaultValue = {state.remark}
                onChange={handleInputChange}
                />
        </div>
    )
    if (state.transaction_type === 'IMPS') {
      additionalFields = (
        <div>
          <label>Maturity Instructions:</label>
          <input type="text" name="Maturity_Instructions" />
        </div>
      );
    } else if(state.transaction_type==='NEFT'){
        Note = (
            <div>
                <p>Please note:</p>
                <p>1. Transactions will be executed on the next working day if they are scheduled for 
                    undays, National Holidays, NEFT Holidays(as declared by RBI)</p>
                <p>2. Timings for NEFT, Monday-Saturday(except 2nd and 4th Saturday) 6:00 AM-6:30 PM</p>
            </div>
        )
    }
    else if (state.transaction_type === 'RTGS') {
      additionalFields = (
        <div>
          <label>Maturity Instructions:</label>
          <input type="text" name="Maturity_Instructions" />
        </div>
      );
    }

    return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <div>
      <h1><b>Initiate Payment</b></h1>
        <label className="form-control">Select the type of payment:</label>
        <select name = "transaction_type" value={state.transaction_type} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="IMPS">IMPS</option>
          <option value="NEFT">NEFT</option>
          <option value="RTGS">RTGS</option>
        </select>
        {mandatoryFields}
        {additionalFields}
        {remarkField}
        {Note}
        {/* <Button
            type="save" // Is this how it is? What are legal types?
            //fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, mr: 1, color: "black" }}
        >
            Save
        </Button>
        <Button
            //fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, mx: 1, color: "black" }}
        >
            Reset
        </Button>
        <Button
            //fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2, mx: 1, color: "black"  }}
        >
            Save As Template
        </Button> */}
        <Button
            type="submit" // too sus
            //fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 1, bgcolor: "black", color: "white" }}
        >
            Transfer
        </Button>
      </div>
      </Box>
    );
}