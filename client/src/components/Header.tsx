import {useContext, useState , useEffect} from 'react'
import { Context } from "../UserContext";
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import '@fontsource/noto-sans'
import '@fontsource/poppins'
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import axios from 'axios'
const useStyles = makeStyles({
    headerWrapper:{
      // width: "100%",
      // position:"fixed",
      // top: 0,
      // zIndex: 2,
     background:'#F8F8F8',
     display:'flex',
     justifyContent:'space-between',
     alignItems:'center',
     height:'62px'
    },
    logo:{
       marginLeft:'55px',
       textTransform:'uppercase',
       color:'#32A05F',
       fontFamily:'poppins',
       fontSize:'18px',
       letterSpacing:'1.5px'
    },
    xd:{
      textTransform:'uppercase',
      color:'black'
    },
    headerSearch:{
    },
    search:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      paddingRight:'40px'
    }
});
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius:'20px',  
    backgroundColor:'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '342px !important',
      height:'25px !important',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
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
  interface NotesDetails {
    _id:string
    id:string
    updatedAt: string
    title : string
    body : string
    tags:string[]
}
const tname = 'notes'
const Header:React.FC = () => {
  let userDetails = window.localStorage.getItem('user')!
    let Det:userdet = JSON.parse(userDetails).user
  const [ notifications, setNotification ] = useState('0')
  const [ searchInput, setSearchInput ] = useState('')
  const { noteLists, handleSetNoteLists, active } = useContext(Context);
  const [ info, setInfo ] = useState([])

  useEffect(()=> {
    const userDetails = window.localStorage.getItem('user') as any
    const {user} = JSON.parse(userDetails as any) 
    const userId = user._id
    const {token} = JSON.parse(userDetails as any)//typings
    axios.post('https://notesxd.herokuapp.com/notes/search', {sort:searchInput}, {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then((res: any) => {//verify typings
      console.log( "jy")
      console.log(res.data)
      if(res.data.message){
        setInfo([]);
      }
      let rees = res.data.filter((obj:any) => obj.createdBy === userId)
      console.log(rees)
      console.log(res.data.message)
      setInfo(rees);
      let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let ret = info.map((val:NotesDetails)=>{
        let fg:string = val.updatedAt
        return {
            id:val._id,
            date:  `${months[parseInt(fg.split('-')[1]) - 1].substring(0,3).toUpperCase()} ${fg.split('-')[2].substring(0,2)}`,
            title : val.title,
            body : val.body,
            tags: val.tags
        }
    })  
    handleSetNoteLists!(ret)

    })
    .catch(e=>{
      console.log(e)
    })
  }, [searchInput])

  console.log('info', info)
  console.log('search-input',searchInput)
  const searchItem = (searchValue: string) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = info.filter((item:any) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      // console.log('filtered-data',filteredData)
      // console.log('search-input',searchInput)
      // setFilteredResults(filteredData)
  }
  else{
      // setFilteredResults([])
      console.log(info)
      // handleSetNoteLists!(info)
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
          url : "https://notesxd.herokuapp.com/notes/getNotification",
      })
       console.log(logs.data, "12")
       let data
           data = '0'
           if(Array.isArray(logs.data)){
             data = logs.data.length as number
           }
          setNotification(data.toString())
          console.log(notifications)
      //  setNotification(data.reverse())
    }
    getFolders()
},[])
    const classes = useStyles();
    return (
        <>
           <div className={classes.headerWrapper}>
                <h3 className={classes.logo}>{tname}<span className={classes.xd}>.xd</span></h3>
              <div className={classes.search}>
                <Search>
                   <SearchIconWrapper>
                     <SearchIcon />
                   </SearchIconWrapper>
                <StyledInputBase
                onChange={(e)=>searchItem(e.target.value)}
                    placeholder="SEARCH"
                   inputProps={{ 'poppins': 'search' }}
                   />
               </Search>
               <Badge badgeContent={notifications} color="error">
                    <NotificationsNoneIcon color="action" sx={{ fontSize:30}}/>
                 </Badge>
            </div>
            </div>    
        </>
    )
}
export default Header

