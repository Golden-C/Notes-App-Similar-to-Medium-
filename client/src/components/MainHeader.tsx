import React from 'react'
import { makeStyles } from '@mui/styles';
import '@fontsource/noto-sans'
import '@fontsource/poppins'
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
    wrapper:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        height:'62px',
        width:'100%',
        marginTop:'10px',
        marginBottom:'10px',
        borderBottom:'0.4px solid grey',
        position:'sticky',
        top:'0',
        zIndex:99,
        background:'white',
    },
    logo:{
        marginLeft:'55px',
        textTransform:'uppercase',
        color:'#32A05F',
        fontFamily:'poppins',
        fontSize:'20px',
        letterSpacing:'1.5px',
        cursor:'pointer'
     },
     xd:{
        textTransform:'uppercase',
        color:'black',
        cursor:'pointer'
      },
      header_nav:{
        display:'flex',
        alignItems:'center',
        marginRight:'55px',
      },
      nav:{
         marginLeft:'15px',
         fontFamily:'poppins',
         fontSize:'13px',
         cursor:'pointer'
      },
      navX:{
        marginLeft:'15px',
        fontFamily:'poppins',
        fontSize:'15px',
        cursor:'pointer',
        background:'green',
        padding:'8px',
        borderRadius:'50px',
        color:'white'
      }
})
const MainHeader = () => {
    const tname = 'notes'
    const classes = useStyles();
    const history = useHistory();

    function handleSubmit(event:any) {
      event.preventDefault()
      history.push("/signup")
    }

    return (
        <>
         <div className={classes.wrapper}>
              <h3 className={classes.logo}>{tname}<span className={classes.xd}>.xd</span></h3> 
              <div className={classes.header_nav}>
                   <p className={classes.nav}>Our Story</p>
                   <p className={classes.nav}>Write</p>
                   <p className={classes.nav}>Sign In</p>
                   <div onClick={(e)=>handleSubmit(e)}><p className={classes.navX}>Get Started</p></div>

              </div>
        </div>       
        </>
    )
}
export default MainHeader