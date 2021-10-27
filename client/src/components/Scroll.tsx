import React from 'react'
import { makeStyles } from '@mui/styles';
import { borderLeft } from '@mui/system';
import TextEditor from './TextEditor';
import UpperScroll from './Upperscroll'

const useStyles = makeStyles({
    scrollWrapper:{
        flex:'55%',
        borderLeft:'1px solid black'
    }
});

const Scroll = () => {
    const classes = useStyles();
    return (
        <>
        {/* <TextEditor /> */}
        <div className={classes.scrollWrapper} style={{ height:'92vh', overflow:'scroll'}}>
            <UpperScroll />
          <TextEditor />
        </div>
        </>
    )
}

export default Scroll 



// import React from 'react'
// import { makeStyles } from '@mui/styles';
// import { borderLeft } from '@mui/system';

// const useStyles = makeStyles({
//     scrollWrapper:{
//         flex:'50%',
//         borderLeft:"0.5px solid grey"
//     }
// });

// const Scroll = () => {
//     const classes = useStyles();
//     return (
//         <>
//         <div className={classes.scrollWrapper}>
//            MAIN CONTENTS TO BE HERE
//         </div>
//         </>
//     )
// }

// export default Scroll 
