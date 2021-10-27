
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import '@fontsource/noto-sans'
import '@fontsource/poppins'
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';

const useStyles = makeStyles({
    wrapper:{
     marginTop:'20px'
    },   
    section_header:{
     display:'flex',
     alignItems:'center',
     marginLeft:'30px'
    },
    section_items:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    // background:'#F8F8F8',
    padding:'20px'
    },
    section_box:{
        padding:'10px',
        borderRadius:'20px',
        background:'white',
        boxSizing:'border-box',
        width:'600px',
        marginRight:'15px',
        marginBottom:'15px',
        border:'0.5px solid #32A05F'
    },
    avatar:{
      display:'flex',
      alignItems:'center'
    },
    section_text:{
    },
    section_texts:{
        fontFamily:'poppins',
        fontSize:'15px',
        letterSpacing:'1px'
    },
    section_info:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
})

const MainSection = () => {
    const [result, setResult] =useState([])
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const wpm = 225;
    const x = "mins read"
    useEffect(()=>{
        const getNotes = async()=>{
          try{
           let logs = await axios({
              method : "GET",
              withCredentials : true,
              url : "https://notesxd.herokuapp.com/notes/allnotes",
            })
            console.log(logs.data, "19")
          setResult(logs.data as [])
        
           }catch(err){
              console.log(err, "wwwwww")
           } 
        }
        getNotes() 
    },[]) 
   
    const classes = useStyles();
    return (
        <>
         <div className={classes.wrapper}>
            <div className={classes.section_header}>     
              <UpdateIcon style={{background:'#32A05F', padding:'7px', color:'white', borderRadius:'50px', marginRight:'7px'}}/>
               <h3  style={{fontFamily:'poppins', fontSize:'35px', color:'black',letterSpacing:'1px'}}>Last Updated</h3>
            </div>
            <div className={classes.section_items}>

                {result?.map((el:any, index:any)=>(
                      <div className={classes.section_box} key={index}>
                      <div className={classes.avatar}>
                         <Avatar alt="Travis Howard" src={el.createdBy.avatar} 
                         sx={{width:'35px', height:'35px'}} style={{marginRight:'10px'}}/>
                         <p>{`${el.createdBy.firstName} ${el.createdBy.lastName}`}</p>
                      </div>
                      <div className={classes.section_text}>
                        <h3 className={classes.section_texts}>{el.title}</h3>
                      </div>
                      <div className={classes.section_info}>
                           <p style={{fontFamily:'poppins', fontSize:'13px', color:'#32A05F',  padding:'9px', borderRadius:'50px', cursor:'pointer'}}>{`${months[parseInt(el.createdAt.split('-')[1]) -1].substring(0,3).toUpperCase()} ${el.createdAt.split('-')[2].substring(0,2)}`}</p>
                           <p style={{fontFamily:'poppins', fontSize:'13px', color:'#32A05F', cursor:'pointer'}}>{ `${Math.ceil(el.body.trim().split(/\s+/).length / wpm)} ${x}`}</p>  

                      </div>
                  </div>
                ))}
            </div>
          </div>  
       </>
    )
}
export default MainSection