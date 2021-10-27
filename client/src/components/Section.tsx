import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import { makeStyles } from '@mui/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Avatar from '@mui/material/Avatar';
import '@fontsource/noto-sans'
import '@fontsource/poppins'
const useStyles = makeStyles({
    wrapper:{
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
    background:'#F8F8F8',
    padding:'20px'
    },
    section_box:{
        padding:'10px',
        borderRadius:'20px',
        background:'white',
        boxSizing:'border-box',
        width:'450px',
        marginRight:'15px',
        marginBottom:'15px'
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

interface  det {
    title?: string
    createdBy?: dat
    createdAt?: string
    updatedAt?: string
    id?: string
    tags?: []
    folderId?: string
    fileUpload?: []
    softDelete?: boolean
    collaboratorId?: []
    body?:string
  }
  interface dat {
    createdAt? : string
    updatedAt? : string
    id?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    avatar?:string
    gender?: string
    about?: string
    location?: string
  }
  
const Section = () => {

    let tr:{img?:string,name?:string,title?:string,date?:string,read?:string}[] = []
    const [trending, setTrending] = useState(tr)

    useEffect(()=>{
        let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

       let result =  axios.get('https://notesxd.herokuapp.com/notes/trendingNotes')
       .then((res)=> {
           let resultData = res.data as det[]


           let newRees = resultData.map((val:det)=>{
            let fg:string = val.updatedAt!
            return {
                img: val.createdBy!.avatar,
                name:`${val.createdBy!.firstName} ${val.createdBy!.lastName}`,
                title:val.title,
                date: `${months[parseInt(fg.split('-')[1]) -1].substring(0,3).toUpperCase()} ${fg.split('-')[2].substring(0,2)}`,
            }
           }
       )
       console.log(newRees + "utgukjbj")
       setTrending(newRees)
        // console.log(res)
    })
       console.log(result)
    //    console.log(trending, 'jhghn')
    },[])
    
    const classes = useStyles();
    
    return (
        <>
          <div className={classes.wrapper}>
            <div className={classes.section_header}>     
              <TrendingUpIcon style={{background:'#32A05F', padding:'7px', color:'white', borderRadius:'50px', marginRight:'7px'}}/>
               <h3  style={{fontFamily:'poppins', fontSize:'35px', color:'black',letterSpacing:'1px'}}>Trending on Notes.XD</h3>
            </div>
            <div className={classes.section_items}>
                {trending.map((el, index)=>(
                      <div className={classes.section_box} key={index}>
                      <div className={classes.avatar}>
                         <Avatar alt="Travis Howard" src={el.img} 
                         sx={{width:'35px', height:'35px'}} style={{marginRight:'10px'}}/>
                         <p>{el.name}</p>
                      </div>
                      <div className={classes.section_text}>
                        <h3 className={classes.section_texts}>{el.title}</h3>
                      </div>
                      <div className={classes.section_info}>
                           <p style={{fontFamily:'poppins', fontSize:'13px', color:'black', border:'1px solid #32A05F', padding:'9px', borderRadius:'50px', cursor:'pointer'}}>{el.date}</p>
                           <p style={{fontFamily:'poppins', fontSize:'13px', color:'#32A05F', cursor:'pointer'}}>{el.read}</p>  
                      </div>
                  </div>
                ))}
            </div>
          </div>  
        </>
    )
}
export default Section