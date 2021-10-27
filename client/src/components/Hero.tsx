import React from 'react';
import { makeStyles } from '@mui/styles';
import '@fontsource/noto-sans'
import '@fontsource/poppins'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    wrapper:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        margin:'0px 50px'
    },
    hero_text:{
        flex:'40%',
      width:'80%',
      height:'60vh',
      paddingLeft:'10px',
      cursor:'pointer'
    },
    hero_textA:{
      fontFamily:'poppins',
      fontSize:'50px',
      color:'#32A05F',
    },
    hero_textB:{
        fontFamily:'poppins',
        fontSize:'15px'
    },
    hero_image:{
       flex:'60%',
       width:'80%',
       height:'80vh',
       paddingLeft:'140px',
       paddingTop:'15px'
    }
})
const Hero = () => {
    const classes = useStyles();
    const history = useHistory();


    function handleSubmit(event:any) {
      event.preventDefault()
      history.push("/login")
    }

    return (
        <>
          <div className={classes.wrapper}>
              <div className={classes.hero_text}>
               <p className={classes.hero_textA}>Notes.XD is a place to write, read, and connect</p>
               <p className={classes.hero_textB}>It's easy and free to post your thinking on any topic and connect with millions of readers.</p>
               <button style={{padding:'10px', border:'none', outline:'none', fontSize:'17px', background:'#32A05F', color:'white', cursor:'pointer', borderRadius:'50px'}}  onClick={(e)=>handleSubmit(e)}>
                   Start Writing
               </button>
              </div>
              <div className={classes.hero_image}>
                <img src='/notes.png' alt='notes-image' style={{ objectFit:'cover'}}/>
              </div>
        </div>  
        </>
    )
}
export default Hero