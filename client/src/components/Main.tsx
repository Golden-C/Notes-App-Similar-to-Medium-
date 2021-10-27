import React,{useState, useRef, SyntheticEvent, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import Sidebar from './Sidebar';
import Tabs from './Tabs'
import Scroll from './Scroll'
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles({
    mainWrapper:{
        display:'flex'
    },
    modalContainer:{
        position:'absolute',
        left:0,
        top:0,
        bottom:0,
        right:0,
        height:"900px",
        "background-color":'rgba(0,0,0,0.8)',
        "z-index":100,
        transition:'all 0.4s linear'
    },
    modalContentContainer:{
        margin:"10rem auto",
        width:"30%",
        height:"18rem",
        backgroundColor:"white",
        borderRadius:"1rem",
        zIndex:109,
        transition:'all 0.4s linear'
    },
    modalContentHeader:{
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        padding:"0.5rem 1rem",
        marginBottom:"1rem",
        backgroundColor:"#32A05F"  
    },
    modalCloseBtn:{
        cursor: "pointer",
    },
    modalInput:{
        width:"90%",
        height: "2rem",
        marginBottom:"2rem",
        marginTop:'2rem',
        borderRadius:"0.5rem",
    },
    submitButton:{
        height: "2.5rem",
        backgroundColor:"#32A05F",
        color:'#EAEAEA',
        borderRadius:"30px",
        border:'none',
        outline: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding:'0.3rem'
    }
});
const Main = () => {
    const classes = useStyles();
    const [displayModal, setDisplayModal] = useState(false);
    return (
        <>
        <div className={classes.mainWrapper}>
            {/* SIDEBAR */}
            <Sidebar toggleModal={setDisplayModal}/>
            {/* TABS */}   
            <Tabs />
            {/* MAIN */} 
            <Scroll />
        </div>
        {displayModal && <Modal toggleModal={setDisplayModal}/> }
        </>
    )
}

const Modal = (props :any)=>{
    const classes = useStyles();
    const [titleField, setTitle] = useState("");
    const [errMsg, setErrorMsg] = useState("");
    const [falseMsg, setFalseMsg] = useState("");
    const [disabled, disableBtn]= useState(true)
    const [displayModal, setDisplayModal] = useState(false);
    useEffect( ()=>{
        if(titleField){
            disableBtn(false)
        }else{
            disableBtn(true)
        }
    }, [titleField])
    const handleTitleField = (e : {target:{value:string}})=>{
        setTitle(e.target.value)
    }
    const handleSubmit = (e : SyntheticEvent)=>{
        let userDetails = window.localStorage.getItem('user')!
        console.log("Button clicked")
        disableBtn(true)
        e.preventDefault();
        if(!titleField){
            setErrorMsg("Title Field cannot be empty!")
            disableBtn(false)
            return;
        }
        axios.request({
            url:"https://notesxd.herokuapp.com/notes/createFolder",
            data:{
                title:titleField
            },
            headers:{
                'authorization': JSON.parse(userDetails).token
            },
            method:"post"
        })
        .then((response)=>{
            console.log(response)   
            let f1:{message:string, folder:string} = response.data as {message:string, folder:string}
            const msg  =  f1.message; 
            const createdFolder = f1.folder;
            disableBtn(true)
            if(response.status.toString() === '200'){
                setFalseMsg(msg)
                return
            }
            // alert(msg);
            console.log(response.status)
            props.toggleModal(false)
            window.location.reload()
        }).catch(err=>{
            console.log(err.response.error)
            setErrorMsg(err.response.error)
            props.toggleModal(false)
            disableBtn(false)
        })
    }
    return <div className={classes.modalContainer}  >
            <div className={classes.modalContentContainer}>
                <div className={classes.modalContentHeader}>
                    <h3 style={{display:"inline-block", color:'#EAEAEA', fontWeight: 'bold'}}>Create New Folder</h3>
                    <span className={classes.modalCloseBtn} onClick={e=> props.toggleModal(false)}><CloseIcon style={{ color:'white'}}/></span>
                </div>
                <form onSubmit={handleSubmit}>
                <span style={{display:"inline-block", color:'#cc0000', }}>{falseMsg}</span>
                    <div >
                    <label htmlFor="folderName">
                        <input id="folderName"  className={classes.modalInput} onChange={handleTitleField} required/>
                    </label>
                    </div>
                    <button className={classes.submitButton} disabled={disabled} style={{color:"black"}} >Create Folder</button>
                </form>
                {errMsg && <p style={{color:"red"}}>{errMsg}</p>}
            </div>
            {displayModal && <Modal toggleModal={setDisplayModal}/> }
    </div>
}
export default Main;