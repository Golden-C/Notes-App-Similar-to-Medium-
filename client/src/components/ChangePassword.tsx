import React, { SyntheticEvent, useState } from "react";
import "@fontsource/poppins"
import axios from "axios";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props} style={{ backgroundColor: 'whitesmoke' }}>
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
  headerWrapper: {
    background: '#65c368',
    height: '15vh',
    padding: '30px 0 10px 25px',
    position: 'relative',
  },
  headerText: {
    color: 'white',
    fontFamily: 'poppins',
    letterSpacing: '1px',
    position: 'absolute',
    left: '1%',
    top: '3%'
  },
  wrapper: {
    backgroundColor: "whitesmoke",
    height:'900px'
  },
  boxForm: {
    background: 'white'
  },
})
const theme = createTheme();
const ChangePasswordForm = () => {
  let userDetails = window.localStorage.getItem('user')!
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("")
  const [warningMessage, setWarningMsg] = useState("")
  const [showWarning, setShowWarning] = useState(false);
  const history = useHistory()
  function checkDetails() {
    if (!(oldpassword && newpassword && confirmpassword)) {
      return "incomplete"
    } else if (newpassword !== confirmpassword) {
      return "unmatch"
    } else {
      return true
    }
  }
  const ChangePassword = async (event: SyntheticEvent) => {
    event.preventDefault();
    const checker = checkDetails()
    console.log(checker)
    if (checker === "incomplete") {
      setShowWarning(true)
      return setWarningMsg(" All Password Fields are required")
    }
    if (checker === "unmatch") {
      setShowWarning(true)
      return setWarningMsg("Password dosent match")
    }
    const details = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      confirmPassword: confirmpassword
    }
    let result = null
    try {
      setShowWarning(false)
      result = await axios({
        method: "POST",
        data: details,
        headers: {
          'authorization': JSON.parse(userDetails).token
        },
        withCredentials: true,
        url: "https://notesxd.herokuapp.com/users/changePassword",
      })
      setWarningMsg("Password updated successfully");
      history.push('/homepage')
    } catch (err: any) {
      result = err.response
      setShowWarning(true)
      setWarningMsg("Incorrect Old Password")
    } finally {
      console.log(result, "sdfgh");
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
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }} className={classes.boxForm}>
          {showWarning ? <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
                    : <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}>{warningMessage}</h5>}
            <Box component="form" onSubmit={ChangePassword} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" size="small" fullWidth name="Old Password" label="Old Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setoldpassword(e.target.value)} />
          <TextField margin="normal" size="small" fullWidth name="New Password" label="New Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setnewpassword(e.target.value)} />
          <TextField margin="normal" size="small" fullWidth name="Re-Enter New Password" label="Re-Enter New Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setconfirmpassword(e.target.value)} />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: '#32A05F' }} sx={{ mt: 3, mb: 2 }}>
             Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default ChangePasswordForm;