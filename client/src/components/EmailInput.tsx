import React, {SyntheticEvent, useState} from "react";
import { makeStyles } from '@mui/styles'
import { Button, TextField, Box, Container, Typography, CssBaseline, Link } from "@mui/material";
import "@fontsource/poppins"
import axios from 'axios'
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
  height:'900px'
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

const EmailInput = () => {
  const [email, setemail] = useState("");
  const [warningMessage, setWarningMsg] = useState("")
  const [showWarning, setShowWarning] = useState(false);

async function userEmail(event: SyntheticEvent){
  event.preventDefault();
  if(!email){
      setShowWarning(true)
      setWarningMsg("Please input your Email")
      //submit user details 
    }else{
      setShowWarning(false)
        const details = { 
          email
      };
      let apiRes = null
      try{
        apiRes = await axios.post("https://notesxd.herokuapp.com/users/recovery-email", details)
        setWarningMsg("A Mail has been sent to you to verify your email")
      } catch (err:any) {
        apiRes = err.response;
        setShowWarning(true)
        setWarningMsg(err.response.data.message);
      } finally {
        console.log(apiRes);
      }
  }  
}

    const classes = useStyles();
     return (
       <div className={classes.wrapper}>
          <div className={classes.headerWrapper}>
            <h1 className={classes.headerText}>FORGOT PASSWORD</h1>
          </div>
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline /> 
       <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding:'20px'}} className={classes.boxForm}>
       {showWarning ? <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
                    : <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}>{warningMessage}</h5>}
          <form className={classes.boxs} onSubmit={userEmail}>
                <TextField margin="normal" size="small" fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus onChange={ (e)=> setemail(e.target.value)}/>
                <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#32A05F' }} sx={{ mt: 3, mb: 2 }}>
                  SUBMIT
                </Button> 
          </form>
        </Box>
      <Copyright sx={{ mt: 40, mb: 2 }} />
    </Container>
    </ThemeProvider>
    </div>
  );
};

export default EmailInput;

