import React, { SyntheticEvent, useState,useContext , useEffect} from 'react';
import { Context } from "../UserContext";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { useHistory } from 'react-router-dom'
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
const shortUrl = require('node-url-shortener');
export default function SendMail() {
  let gen:det = {tags:[],collaboratorId:[]}
  const [general, setGeneral] = useState(gen)
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [warningMessage, setWarningMsg] = useState("")
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { noteLists, handleOnEdit, tabMemory, handleTabMemory, active, onEdit} = useContext(Context);
  const history = useHistory()
  async function userTags(event: SyntheticEvent){
    event.preventDefault();
    let userDetails = window.localStorage.getItem('user')!
    let id = onEdit
    if(!email){
        setWarningMsg("Please input your tag")
      }else{
          const details = {
           email,
           message
          };
        let apiRes = null
        try{
          apiRes = await axios.put(`https://notesxd.herokuapp.com/notes/editnote/${id}`, details, 
              { headers:{
               'authorization' : JSON.parse(userDetails).token
              }
            })
          setWarningMsg("Tag added Successfully")
          history.push("/home")
        } catch (err:any) {
          apiRes = err.response;
          setWarningMsg(err.response.data.message);
        } finally {
          console.log(apiRes);
        }
    }  
  }
  useEffect(()=>{
    const getNotes = async()=>{
      let data
      let userDetails = window.localStorage.getItem('user')!
      try{
       let logs = await axios({
          method : "GET",
          withCredentials : true,
          headers:{
              'authorization' : JSON.parse(userDetails).token
          },
          url : `https://notesxd.herokuapp.com/notes/${onEdit}`,
      })
      console.log(logs.data, "123456789")
       data = logs.data as det
       console.log(data,"data")
       setGeneral(data)
       
      
      
    }catch(err){
        console.log(err, "wertyuiert")
    } 
  }
    getNotes()
},[onEdit]) 

function handleCopy () {
  const el = document.createElement('textarea') as unknown as HTMLInputElement;
  el.value = link;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
} 
  const handleClick = async(event:any) => {

    console.log(link)
    setAnchorEl(event.currentTarget);
    const token = await jwt.sign(
      general,
      'secret',
      { expiresIn: '24h' }
    );
    let Notelink = `http://localhost:3000/viewnotes/${token}`
      setLink(Notelink)
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
          <img src="./Assests/arrow.svg" style={{width:"20px", height:"25px"}}/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { height: "350px", width: '23ch', padding: "0 20px 20px"},
        }}
      >
      <Box style={{fontFamily:"poppins"}} onSubmit={userTags}>
      <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
      <span style={{ paddingTop:"10px", fontSize:'14px'}}>LINK TO THE NOTE</span>
      <div> 
        {/* <span style = {{wordBreak: 'break-all'}}>{link}</span>  */}
        <a href={link}>LINK </a> </div>
      {/* <div id='someTextAreaToCopy'>{link}</div> */}
       {/* <TextField margin="normal" size="small" fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus  style={{marginBottom:"30px" }} onChange={ (e)=> setEmail(e.target.value)}/>
       <TextField id="outlined-multiline-static" fullWidth multiline rows={4} placeholder="Message" onChange={ (e)=> setMessage(e.target.value)}/> */}
       {/* <Button onClick={handleCopy} variant="contained" style={{backgroundColor: "white", color: "#32A05F", float:"right" }} sx={{ mt: 3, mb: 2 }}>SEND NOTE</Button> */}
        </Box>
      </Menu>
    </div>
  );
}

