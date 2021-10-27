import React, { useState, useEffect, useContext, FC } from 'react'
import { Context } from "../UserContext";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { makeStyles } from '@mui/styles';
import '@fontsource/poppins';
import '@fontsource/source-sans-pro'
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
const useStyles = makeStyles({
    sidebarWrapper:{
        flex:'15%',
        height:'100vh',
        width:'100%',
        backgroundColor:'#F4F4F4',
       position:'relative'
    },
    profile:{
      display:'flex',
      alignItems:'center',
      margin:'15px 20px 15px 30px'
    },
    profileText:{
    },
    username:{
      marginRight:'25px',
      fontSize:'14px',
      fontFamily:'poppins',
      letterSpacing:'1px',
    },
    menu:{
     display:'inline',
     transition: 'all 0.3s linear',
    },
    menu_text:{
        backgroundColor:'#F8F8F8',
      fontSize:'12px',
    },
    hide_menu_text:{
      display:'none',
      transition: 'all 0.3s linear',
    },
    menuicon:{
      display:'flex',
      alignItems:'center',
      marginLeft:'30px'
    },
    text:{
       fontSize:'14px',
       fontFamily:'poppins',
        marginLeft:'5px',
       letterSpacing:'1px',
       color:'green'
    },
    notes:{
    //   backgroundColor:'#EAEAEA',
      display:'flex',
      alignItems:'center',
       padding:'15px 0px',
       marginLeft:'30px',
       borderRadius:'30px 0 0 30px'
    },
    note:{
      },
    menu_items:{
      marginLeft:'10px',
      fontSize:'14px',
      fontFamily:'source-sans-pro'
    },
    menu_subitems:{
        padding:'10px 0',
        marginLeft:'10px',
        fontSize:'14px',
        fontFamily:'source-sans-pro'
    },
    menu_item:{
      fontSize:'16px',
      fontFamily:'source-sans-pro',
      textTransform:'uppercase',
      color:'white'
      },
    play:{
        marginLeft:'15px'
    },
    addNew:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     borderTop:'0.5px solid black',
     position:'sticky',
     top:'93%',
    },
    newFolder:{
        fontSize:'14px',
        fontFamily:'source-sans-pro',
        marginLeft:'4px',
        fontWeight: 'lighter',
        color:'white'
    }, 
});
interface NotesDetails {
    _id:string
    updatedAt: string
    title : string
    body : string
    tags:string[]
}
const Textstyles ={fontSize:'20px', cursor:'pointer', fontFamily:'poppins', letterSpacing:'1px'}
const navtitle=[
    {name:'NOTES'},
    {name:'TASKS'},
    {name:'FOLDER 1'},
    {name:'FOLDER 2'}
]
interface userdet {
    firstName : string
    lastName: string
    email: string
    about : string
    location : string
    id: string
    gender: string
    avatar : string
  }
const Sidebar: FC<{toggleModal: Function}> = (props) => {
    let userDetails = window.localStorage.getItem('user')!
    let Det:userdet = JSON.parse(userDetails).user
    const [menu, setMenu ] = useState(false)
    const [submenu, setSubmenu ] = useState(false)
    const [ folders, setFolders ] = useState([])
    const { noteLists, handleSetNoteLists, active, setActive } = useContext(Context);
    const [cookies, setCookie, removeCookie] = useCookies(["UserD"]);


console.log('active', active)
    async function setNotes (id:string){
        let result:any = null
    let userDetails = window.localStorage.getItem('user')!
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // console.log("select 1",select)  
    console.log(JSON.parse(userDetails).token)
    try{
      result = await axios({
        method : "GET",
        headers:{
            'authorization' : JSON.parse(userDetails).token
        },
        withCredentials : true,
        url : `https://notesxd.herokuapp.com/notes/getAllNote/${id}`,
    }) 
    console.log(result.data)
    let ret = result.data.map((val:NotesDetails)=>{
        let fg:string = val.updatedAt
        return {
            id:val._id,
            date:  `${months[parseInt(fg.split('-')[1]) -1].substring(0,3).toUpperCase()} ${fg.split('-')[2].substring(0,2)}`,
            title : val.title,
            body : val.body,
            tags: val.tags
        }
    })  
    handleSetNoteLists!(ret)

    }catch(err:any){
      result = err.message
    }
}
async function getTrash(){

    let result:any = null
    let userDetails = window.localStorage.getItem('user')!
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    try{
        result = await axios({
          method : "GET",
          headers:{
              'authorization' : JSON.parse(userDetails).token
          },
          withCredentials : true,
          url : `https://notesxd.herokuapp.com/notes/gettrash`,
      }) 
      console.log(result.data + 'l jklkjlm')
      let ret = result.data.map((val:NotesDetails)=>{
          let fg:string = val.updatedAt
          return {
              id:val._id,
              date:  `${months[parseInt(fg.split('-')[1]) -1].substring(0,3).toUpperCase()} ${fg.split('-')[2].substring(0,2)}`,
              title : val.title,
              body : val.body,
              tags: val.tags
          }
      })  
      handleSetNoteLists!(ret)
  
      }catch(err:any){
        result = err.message
      }
}
async function getCollaboratedNotes(){

    let result:any = null
    let userDetails = window.localStorage.getItem('user')!
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    try{
        result = await axios({
          method : "GET",
          headers:{
              'authorization' : JSON.parse(userDetails).token
          },
          withCredentials : true,
          url : `https://notesxd.herokuapp.com/notes/collaborators/notes`,
      }) 
      console.log(result.data)
      console.log('jhds')
      let ret = result.data.notes.map((val:NotesDetails)=>{
          let fg:string = val.updatedAt
          return {
              id:val._id,
              date:  `${months[parseInt(fg.split('-')[1]) - 1].substring(0,3).toUpperCase()} ${fg.split('-')[2].substring(0,2)}`,
              title : val.title,
              body : val.body,
              tags: val.tags
          }
      })  
      console.log('jhds')
      handleSetNoteLists!(ret)
  console.log(noteLists! + 'notes')
      }catch(err:any){
        result = err.message
        console.log('error' , err)
      }
}

    useEffect(()=>{
              const getFolders = async()=>{
                // let newId:{token?:string,id?:string} = {...Id}
                // let tokens = newId.token
                 let logs = await axios({
                    method : "GET",
                    withCredentials : true,
                    headers:{
                        'authorization' : JSON.parse(userDetails).token
                    },
                    url : "https://notesxd.herokuapp.com/notes/getfolder",
                })
                 console.log(logs.data, "123456")
                 let data:[] = logs.data as []
                setFolders(data.reverse())
              }
              getFolders()
     },[]) 
            console.log(folders, "wertyu")
    const classes = useStyles();
    // const username ={Det.firstName}
    const trashCount ='4'
    const collaboratorCount ='8'
    return (
        <>
        <div className={classes.sidebarWrapper}>
            <div className={classes.profile}>
               <Avatar alt="Remy Sharp" src={Det.avatar} sx={{width:'35px', height:'35px'}} style={{marginRight:'10px'}}/>
                  <p className={classes.username}><strong>{Det.firstName}</strong></p>
                <ExpandMoreIcon onClick={()=> setMenu(!menu)} style={{cursor:'pointer'}} sx={{width:"30px",height:'30px' }}/>
            </div>
            <div className={ menu ? classes.menu : classes.hide_menu_text}>
                   <div className={classes.menu_text}>
                      <a href="/profile">
                       <div className={classes.menuicon} >
                          <AccountCircleIcon style={{color:'black'}}/>
                          <h2 className={classes.text}>Profile</h2>
                       </div>
                      </a>
                      <a href="/changepassword">
                       <div className={classes.menuicon}>
                          <SettingsIcon style={{color:'black'}}/>
                          <h2 className={classes.text}>Password</h2>
                       </div>
                       </a>
                       <a href="/logout">
                       <div className={classes.menuicon} onClick={()=>{
                           window.localStorage.removeItem('user')
                           removeCookie('UserD')
                           
                           }}>
                          <LogoutIcon style={{color:'black'}}/>
                          <h2 className={classes.text}>Log Out</h2>
                       </div>
                       </a>
                   </div>
            </div>
            <div style={{ height:'60vh', overflow:'scroll'}}>
              {folders.map((el:{_id:string, title:string},index)=>
              {
                  // let cl = 
                  return(
              <div key={index}>
                  <div className={classes.notes} style={(active === el._id) ? {backgroundColor:'#EAEAEA',cursor:'pointer' } : {cursor:'pointer'}} onClick={()=> {
                      setSubmenu(sub=>!sub)
                      setNotes(el._id)
                      setActive!(el._id)
                      }} >
                  <PlayArrowIcon className={classes.play}  sx={{width:"15px",height:'15px'}}style={(active === el._id) ? {cursor:'pointer', color:'#020202' } : {cursor:'pointer', color:'#4a4949'}}     />
                  <div className={classes.menu_items} style={(active === el._id) ? {fontFamily:'poppins', color:'#020202' } : {fontFamily:'poppins', color:'#4a4949'}} >{el.title.toUpperCase()}</div>
              </div>
              {/* <div className={ submenu ? classes.menu_items : classes.hide_menu_text}>{el.title}</div> */}
              </div>
              )}
              )}
               </div>
              <div >
                  <div className={classes.notes} onClick={()=> {getTrash()}} >
                  {/* <PlayArrowIcon className={classes.play} sx={{width:"15px",height:'15px'}}  style={{cursor:'pointer'}}   /> */}
                  <div className={classes.menu_items} style={{color:'#4a4949', fontFamily:'poppins', paddingLeft:'30px'}}>TRASH</div>
              </div>
              {/* <div className={ submenu ? classes.menu_items : classes.hide_menu_text}>hkanbs dk</div> */}
              </div>
              <div >
                <div className={classes.notes} onClick={()=> {getCollaboratedNotes()}} >
                {/* <PlayArrowIcon className={classes.play} sx={{width:"15px",height:'15px'}}  style={{cursor:'pointer'}}   /> */}
                <div className={classes.menu_items} style={{color:'#4a4949', fontFamily:'poppins', paddingLeft:'30px', }}>COLLABORATORS</div>
             </div>
             {/* <div className={ submenu ? classes.menu_items : classes.hide_menu_text}>hkanbs dk</div> */}
             </div>
         


               
            <div className={classes.addNew} style= {{cursor:'pointer'}}>
               <AddIcon style={{ color:'#4a4949'}}/>
              <h3 className={classes.newFolder} style={{fontFamily:'poppins', color:'#4a4949'}} onClick={e=> props.toggleModal(true)}> NEW FOLDER </h3>
            </div>
        </div>
        </>
    )
}
export default Sidebar