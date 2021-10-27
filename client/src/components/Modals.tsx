import React, {SyntheticEvent, useContext, useState} from 'react';
import { Context } from "../UserContext";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};
export default function Modals(props:any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { noteLists, handleOnEdit, tabMemory, handleTabMemory, active, onEdit} = useContext(Context);
 
  const handleClose = () => {
    setOpen(false) 
    setWarningMsg("");
}
  const [tags, setTags] = useState("");
  const [warningMessage, setWarningMsg] = useState("")
  const [showWarning, setShowWarning] = useState(false);
  const history = useHistory()
  async function userTags(event: SyntheticEvent){
    event.preventDefault();
    let userDetails = window.localStorage.getItem('user')!
    let id = onEdit
    if(!tags){
      setShowWarning(true)
        setWarningMsg("Please input your tag")
      }else{
          const details = {
            title:props.title,
           tags:[...props.tagx,tags]
          };
          console.log(details, "wer456")
        let apiRes = null
        console.log(details, "details")
        try{
          setShowWarning(false)
          apiRes = await axios.put(`https://notesxd.herokuapp.com/notes/editnote/${id}`, details, 
              { headers:{
               'authorization' : JSON.parse(userDetails).token
              }
            })
          setWarningMsg("Tag added Successfully")
        //   let allHistory = window.localStorage.getItem('tabHistory')

        //   let parsedallHistory = JSON.parse(allHistory!)

        // let filteredHistory = parsedallHistory.map((val:{id:string, title:string})=> 
        // {     
        //     val.id !== tabId
        // }
        // )

        // window.localStorage.setItem('tabHistory', JSON.stringify(filteredHistory))
        // handleTabMemory!(filteredHistory)
          // history.push("/home")
          // handleClose()
        } catch (err:any) {
          apiRes = err.response;
          setShowWarning(true)
          setWarningMsg(err.response.data.message);
        } finally {
          console.log(apiRes);
        }
    }  
  }
  return (
    <div>
      <Button sx={{color:"#32A05F", fontFamily:'poppins', textTransform:"capitalize", fontSize:'12px'}} onClick={handleOpen}>Add Tags</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <CloseIcon style={{float:"right"}} onClick={handleClose}/>
        {showWarning ? <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"red", fontSize:'14px'}}>{warningMessage}</h5>
                    : <h5 style={{ paddingTop:"10px", display:"flex", justifyContent:"center", color:"#32A05F", fontSize:'14px'}}>{warningMessage}</h5>}
        <form style={{marginTop:"2%",fontFamily:"poppins"}} onSubmit={userTags}>
        <TextField margin="normal" size="small" fullWidth label="Add Tags" name="email" onChange={ (e)=> setTags(e.target.value)}/>
        <Button type="submit" variant="contained" style={{ backgroundColor: "#32A05F", float:"right" }} sx={{ mt: 3, mb: 2 }}>ADD</Button>
        </form>
        </Box>
      </Modal>
    </div>
  );
}