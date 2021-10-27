import React, { SyntheticEvent, useState } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import "@fontsource/poppins"
import dotenv from 'dotenv'
dotenv.config();
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
const SignUpForm = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMsg] = useState("")
    function validatePassword() {
        if (password.length > 1 && repeatPassword !== password) {
            return false;
        } else {
            return true
        }
    }
    async function signUpUser(event: SyntheticEvent) {
        event.preventDefault();
        //check that the password and repeat password is a match
        const passwordMatch = validatePassword()
        if (!passwordMatch) {
            setWarningMsg("Password do not match please check your password entry and try again!")
            setShowWarning(true)
        } else {
            setShowWarning(false);
            const details = {
                firstName: firstname,
                lastName: lastname,
                email,
                password,
                confirm_password: repeatPassword,
            };
              await axios.post('https://notesxd.herokuapp.com/users/signup', details)
                .then((response) => {
                    // alert("success!")
                    setWarningMsg("success!")
                    console.log(response)
                }).catch(err => {
                    setWarningMsg(err.response.data.replace('\"',"").replace('\"',""));
                    setShowWarning(true)
            })
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
                    <Box component="form" onSubmit={signUpUser} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        id="first name"
                        label="First Name"
                        name="First Name"
                        autoFocus
                        onChange={(e) => setfirstname(e.target.value)}  />
                        <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        id="last name"
                        label="Last Name"
                        name="last name"
                        autoFocus
                        onChange={(e) => setlastname(e.target.value)}  />
                        <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setemail(e.target.value)} />
                        <TextField
                        margin="normal"
                        size="small"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setpassword(e.target.value)} />
                        <TextField
                          margin="normal"
                          size="small"
                          fullWidth
                          name="password"
                          label="Repeat Password"
                          type="password"
                          id="password"
                        onChange={(e) => setrepeatPassword(e.target.value)} />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: "#32A05F" }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <span style={{ textAlign: "center", marginBottom: "20px" }}>
                            or
                        </span>
                        <div style={{ fontSize: "12px" }}>
                            {" "}
                            Sign in with Social Networks
                        </div>
                        {/* </div> */}
                        <div>
                            <a href="https://notesxd.herokuapp.com/auth/facebook">
                            <FacebookRoundedIcon
                                sx={{ width: "30px", height: "30px" }}
                                style={{ color: "#32A05F" }}
                            />
                            </a>
                            <a href="https://notesxd.herokuapp.com/auth/google/">
                            <GoogleIcon
                                sx={{ width: "30px", height: "30px" }}
                                style={{ color: "#32A05F" }}
                            />
                            </a>
                        </div>
                        <Grid container style={{ display: "inline" }}>
                <Grid item xs>
                  <Link href="/email" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link  href="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SignUpForm;