import React, { SyntheticEvent, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  TextField,
  Box,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Typography,
  Container,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import {useCookies} from 'react-cookie'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import "@fontsource/poppins";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      style={{ backgroundColor: "whitesmoke" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        NotesXD
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles({
  headerWrapper: {
    background: "#65c368",
    height: "15vh",
    padding: "30px 0 10px 25px",
    position: "relative",
  },
  headerText: {
    color: "white",
    fontFamily: "poppins",
    letterSpacing: "1px",
    position: "absolute",
    left: "1%",
    top: "3%",
  },
  wrapper: {
    backgroundColor: "whitesmoke",
    height:'900px'
  },
  boxForm: {
    background: "white",
  },
  boxs: {
    marginTop: "2%",
    fontFamily: "poppins",
  },
});

const theme = createTheme();

const SignInForm = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [warningMessage, setWarningMsg] = useState("");
  const [Id, setId] = useCookies(['UserD'])
  const [showWarning, setShowWarning] = useState(false);
  const history = useHistory();

  function checkLoginDetails() {
    if (!email) {
      return false;
    } else if (!password) {
      return false;
    } else{
      return true;
    }
  }

  async function signInUser(event: SyntheticEvent) {
    event.preventDefault();
    const checker = checkLoginDetails();
    if (!checker) {
      setShowWarning(true)
      setWarningMsg("Email and Password is Required");
    } else {
      const details = {
        email,
        password,
      };
      let result;
      try {
        setShowWarning(false)
        result = await axios({
          method: "POST",
          data: details,
          withCredentials: true,
          url: "https://notesxd.herokuapp.com/users/login",
        })
        console.log(result , 'hgdw')
        let tc = result.data as unknown as {token :string}
        window.localStorage.setItem("user", JSON.stringify(tc));
        window.localStorage.setItem('tabHistory', JSON.stringify([]))
        
        setId('UserD', tc.token,{
          maxAge:186400
        })
        
        history.push("/home");
      } catch (err: any) {
        console.log(result, 'he2gdw')
        setShowWarning(true)  
        console.log(err.response.data.error, "ererehgcrer")
        setWarningMsg(err.response.data.error);
      }
    }
 }

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerWrapper}>
        <h1 className={classes.headerText}>SIGN IN</h1>
      </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
            className={classes.boxForm}
          >
            {showWarning ? <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
                    : <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}>{warningMessage}</h5>}
            <form className={classes.boxs} onSubmit={signInUser}>
              <TextField margin="normal" size="small" fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => setemail(e.target.value)}/>
              <TextField margin="normal" size="small" fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setpassword(e.target.value)}/>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
              <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: "#32A05F" }} sx={{ mt: 3, mb: 2 }}>
                SIGN IN
              </Button>
              <span style={{ textAlign: "center", marginBottom: "20px" }}>
                or
              </span>
              <div style={{ fontSize: "12px" }}>
                {" "}
                Sign in with Social Networks
              </div>
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
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
          <Copyright sx={{ mt: 10, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SignInForm;

