import React, { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useHistory } from "react-router-dom";
import "@fontsource/poppins"
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
          padding: '30px 0 10px 35px',
          position:'relative',
      },
      headerText:{
      color: 'white',
      fontFamily: 'poppins',
      letterSpacing: '1px',
      position:'absolute', 
      left:'1%'
      },
      wrapper:{
          backgroundColor: "whitesmoke",
          height:'900px'
      },
      boxForm:{
          background:'white'
      },
  })
  const theme = createTheme();
const CollaboratorSignUpForm = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [password, setpassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMsg] = useState("")
    let params:{token:string} = useParams()
        const token=params.token
        const history = useHistory()
    function validatePassword() {
        if (password.length > 1 && repeatPassword !== password) {
            return false;
        } else {
            return true
        }
    }
    async function signUpCollab(event: SyntheticEvent) {
        event.preventDefault();
        const passwordMatch = validatePassword()
        if (!passwordMatch) {
            setShowWarning(true)
            setWarningMsg("Password do not match please check your password entry and try again!")
            
        } else {
            // setShowWarning(false);
            const details = {
                firstName: firstname,
                lastName: lastname,
                password,
                confirm_password: repeatPassword,
            };
            let apiRes = null
            try{
                setShowWarning(false)
              apiRes = await axios({
                method: "POST",
                data: details,
                withCredentials: true,
                url: `https://notesxd.herokuapp.com/notes/collab/${token}`,
              });
            history.push('/login')
            } catch (err:any) {
              apiRes = err.response.data.error;
              console.log(apiRes.data.error)
              setShowWarning(true)
              setWarningMsg(err.response.data.error);
            } finally {
              console.log(apiRes);
            }      
        }
    }
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.headerWrapper}>
                <h1 className={classes.headerText}>SIGN UP</h1>
            </div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" style={{background:'whitesmoke'}}>
                    <CssBaseline />
                    <Box sx={{ marginTop: 5, display:'flex', flexDirection: 'column', alignItems: 'center', padding:'0px 20px 20px 20px'}} className={classes.boxForm}>
                    {showWarning ? <h5 style={{ paddingTop:"2px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}> {warningMessage} </h5>
                    : <h5 style={{ paddingTop:"2px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}> {warningMessage} </h5>}           
                        <Box component="form" onSubmit={signUpCollab} noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" size="small" fullWidth id="first name" label="First Name" name="First Name" autoFocus onChange={(e) => setfirstname(e.target.value)}  />
                            <TextField margin="normal" size="small" fullWidth id="last name" label="Last Name" name="last name" autoFocus onChange={(e) => setlastname(e.target.value)}  />
                            <TextField margin="normal" size="small" fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setpassword(e.target.value)} />
                            <TextField margin="normal" size="small" fullWidth name="password" label="Repeat Password" type="password" id="password" onChange={(e) => setrepeatPassword(e.target.value)} />
                            <FormControlLabel
                                 control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#32A05F"}} sx={{ mt: 3, mb: 2 }} >Sign Up</Button>
                        </Box>
                    </Box>
                 <Copyright sx={{ mt: 2, mb: 2 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}
export default CollaboratorSignUpForm;