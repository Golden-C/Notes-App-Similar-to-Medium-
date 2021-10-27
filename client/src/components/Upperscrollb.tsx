import React from 'react'
import {useContext, useState , useEffect} from 'react'
import { Context } from "../UserContext";
import { Box, Tab, Tabs, TextField } from '@mui/material'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
// import Arrow from "../Assests/arrow.svg";
import Dropdown from "./Dropdown"
import axios from 'axios';
import Modals from './Modals';
import InviteModal from './InviteModal';
import { fontSize } from '@mui/system';
import SendMail from "./SendMail"
// import { border } from '@mui/system';
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
const UpperScroll = () => {
  let gen:det = {tags:[]}
  let sub:dat={}
    const [value, setValue] = useState(0);
    const [general, setGeneral] = useState(gen)
    const [ subGeneral, setSubGeneral ] = useState(sub)
    const [ date, setDate ] = useState("")
  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };
  const { noteLists, handleOnEdit, tabMemory, handleTabMemory, active, onEdit} = useContext(Context);
  let userDetails = window.localStorage.getItem('user')!
  console.log(onEdit, 'hgnv')
//   let id = "616c2b2fa626fe09a62c526d"
  let id = onEdit
let data: det
let crtBy: dat
  useEffect(()=>{
    const getNotes = async()=>{
      try{
       let logs = await axios({
          method : "GET",
          withCredentials : true,
          headers:{
              'authorization' : JSON.parse(userDetails).token
          },
          url : `https://notesxd.herokuapp.com/notes/${id}`,
      })
      console.log(logs.data, "123456789")
       data = logs.data as det
       console.log(data,"data")
       setGeneral(data)
       crtBy = data.createdBy as dat
      setSubGeneral(crtBy)
      let time = general.updatedAt!.split('T')[1].substring(0,5)
      let hrs = general.updatedAt!.split('T')[1].substring(0,2) 
      let mins = general.updatedAt!.split('T')[1].substring(3,5)
      if(parseInt(time.substring(0,2))>12){
            time = `${parseInt(hrs)-12}:${mins}PM`
      }else{
            time = `${hrs}:${mins}AM`
      }
      let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
setDate(`${months[parseInt(general.updatedAt!.split('-')[1]) -1].substring(0,3)} ${general.updatedAt!.split('-')[2].substring(0,2)}, ${general.updatedAt!.split('-')[0]} at ${time}`)
    //   console.log('title', lName)
    }catch(err){
        console.log(err, "wertyuiert")
    } 
  }
    getNotes()
},[onEdit]) 
//     let history = window.localStorage.getItem('tabHistory')
//     let parsedHistory = JSON.parse(history!)
// handleTabMemory!(parsedHistory)
    return (
        <div style={{display:"flex",  flexDirection:"column", marginBottom:'1rem'}}>
        <div style={{ width:"inherit", height:"10%"}}>
            <Box sx={{ width: "51%", bgcolor: '#EAEAEA', position:"absolute"}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
          {
            tabMemory!.reverse().filter((thing, index, self) =>
                index === self.findIndex((t) => (
                  t.id === thing.id && t.title === thing.title
                ))
                ).map(val=>{
                  return ( <Tab label={val.title}   onClick={()=> {handleOnEdit!(val.id)}} />)
                })
          }


        {/* <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
        <Tab label="Item Eight" /> */}
        
      </Tabs>  
    </Box> 
        <div style={{ display:"flex", marginLeft:"690px", flexDirection:"row", marginTop:"3rem"}}>
        {/* <img src="./Assests/arrow.svg" style={{width:"70px",marginTop:"3rem", height:"30px", marginLeft:"30px"}}/> */}
        <SendMail />
        <Dropdown />
        {/* <img src="./Assests/options.svg" style={{width:"700px",marginTop:"30rem", height:"30px"}}/> */}
        {/* <MoreHorizIcon sx={{ height:"180%"}}/> */}
        </div>
        </div>
        {/* <div style={{fontFamily:'poppins', fontSize:'2.5rem',color:'lightgrey', width:'30px', marginLeft:'2rem'}}>Untitled</div> */}
        <div style={{ width:"inherit", height:"30%", overflow:"scroll", backgroundColor: 'white', display:"flex", flexDirection:"column", alignItems:"flex-start", paddingLeft:"40px" }}>
            {/* <Box sx={{ width: "100%", height:"50%", overflow:"scroll"}}> */}
                {/* <span style={{padding:"0 0 30px"}}>Tittle of Note</span> */}
                <div style={{width:"95%", marginBottom:'1rem'}}>
                <TextField  key={general.updatedAt ? 'notLoadedYet' : 'loaded'} size="small" sx={{fontSize:'2.5rem'}} placeholder="Untitled" fullWidth id="email"  variant="standard" defaultValue={general.title }/>
                </div>
                <div style={{padding:"15px 0", display:"flex"}}>
                <span style={{padding:"0 55px 0 0", color:'#707070', fontFamily:'poppins', fontSize:'12px'}}>Created by</span> 
                <Avatar alt="Remy Sharp" src={subGeneral.avatar} sx={{width:'25px', height:'25px'}} />
                <span style={{padding:"0 0 0 5px",fontSize:'13px',  fontFamily:'poppins'}}>{`${subGeneral.firstName} ${subGeneral.lastName}`}</span>
                </div>
                <div style={{padding:"0 0 15px 0", display:"flex", color:'#707070', fontFamily:'poppins', fontSize:'12px'}}>
                <span style={{padding:"0 47px 0 0", display:"flex"}}>Collaborator</span>
                <Avatar sx={{width: '25px', height: '25px'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                {/* <span style={{padding:"0 0 0 5px", color:'#707070', fontFamily:'poppins', fontSize:'12px'}}>Collaborator </span> */}
                {/* <span style={{padding:"0 0 0 5px", }}><a  style={{ textDecoration:'none', color:"#32A05F",}} href="/">Invite Collaborator</a></span> */}
                <InviteModal />
                </div>
                <div style={{padding:"0 0 15px 0"}}>
                <span style={{padding:"20px 46px 20px 0", color:'#707070', fontFamily:'poppins', fontSize:'12px'}}>Last Updated</span><span style={{fontFamily:'poppins',  fontSize:'12px'}}>{date}</span>
                </div>
                {/* <div style={{display:"flex"}}> */}
                <div style={{padding:"0 0 20px 0", display:"flex", alignItems:"center"}}>
                <span style={{padding:"0 90px 0 0", color:'#707070', fontFamily:'poppins', fontSize:'12px'}}>Tags</span>
                {general.tags!.map((el:string,index)=>( 
                  <div key={index} style={{display:"flex"}}>
                <span style={{padding:"0 5px 0 0",}}>{`${el}`}</span>
                </div>
                 ))}
                 <Modals tagx={general.tags}/>
                {/* <a  href="/" style={{ color:"#32A05F", textDecoration:'none', height:"20px", fontSize:'13px', cursor:'pointer'}}>Add Tags</a> */}
                {/* <div  style={{padding:"0 0 20px 0", backgroundColor:"#EAEAEA", borderRadius:"5px", color:"#32A05F", height:"20px"}}><span>#Tags</span></div> */}
                </div>
                 {/* </div> */}
                <div style={{ width:"97%", height:"1px", backgroundColor:"#231F20",}}/>
            {/* </Box> */}
        </div>
        </div>
    )
}
export default UpperScroll