import React, {SyntheticEvent, useState} from "react";
import axios from 'axios'
import { makeStyles } from '@mui/styles'
import { Button, TextField, Box, Container, Typography, CssBaseline, Link, FormControlLabel, Checkbox }from "@mui/material";
import "@fontsource/poppins"
import { useParams, useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props} style={{backgroundColor:'whitesmoke'}}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        NotesXD
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
headerWrapper:{
  background: '#65c368',
  height: '15vh',
  padding: '30px 0 10px 25px',
  position:'relative',
},
headerText:{
color: 'white',  
fontFamily: 'poppins',
letterSpacing: '1px',
position:'absolute',
left:'1%',
top:'3%'
},
wrapper:{
  backgroundColor: "whitesmoke",
  height:'100vh'
},
boxForm:{
  background:'white'
},
boxs:{ 
  marginTop:"2%",
  fontFamily:"poppins"
},
});

const theme = createTheme();
 
const PasswordInput =() => {
    const [password, setpassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [warningMessage, setWarningMsg] = useState("")
    const [showWarning, setShowWarning] = useState(false);
    //const [alertMessage, setAlertMsg] = useState("")
    let params:{token:string} = useParams()
    const history = useHistory()
    function validatePassword() {
        if( repeatPassword !== password ){
            return false;
        }else{
            return true
        }
    }
  async function userPassword(event: SyntheticEvent){
    event.preventDefault();
    const passwordMatch = validatePassword()
    if(!passwordMatch){
      setShowWarning(true)
      setWarningMsg("Password do not match please check your password entry and try again!")
    }else{
      const details = { 
        password,
        confirmPassword:repeatPassword,
        token : params.token
      };
      let apiRes = null
      try{
        setShowWarning(false)
        apiRes = await axios.post("https://notesxd.herokuapp.com/users/reset", details)
        setWarningMsg("Password Changed Successfully")
        history.push('/')
      } catch (err:any) {
        apiRes = err.response;
        setShowWarning(true)
        setWarningMsg(err.response.data.error);
      } finally {
          console.log(apiRes);
      }
    }  
  }

    const classes = useStyles();
    return (
      <div  className={classes.wrapper}>
      <div className={classes.headerWrapper}>
          <h1 className={classes.headerText}>FORGOT PASSWORD</h1>
      </div>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding:'20px'}} className={classes.boxForm}>
        {showWarning ? <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
                    : <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}>{warningMessage}</h5>}
      <form className={classes.boxs} onSubmit={userPassword}>
        <TextField margin="normal" size="small" fullWidth name="New Password" label="New Password" type="password" id="password" autoComplete="current-password" onChange={ (e)=> setpassword(e.target.value)}/>
        <TextField margin="normal" size="small" fullWidth name="Re-Enter New Password" label="Re-Enter New Password" type="password" id="password" autoComplete="current-password" onChange={ (e)=> setrepeatPassword(e.target.value)} />
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
      <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#32A05F' }} sx={{ mt: 3, mb: 2 }}>
          SUBMIT
        </Button> 
      </form> 
    </Box>
    <Copyright sx={{ mt: 28, mb: 2 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default PasswordInput;

