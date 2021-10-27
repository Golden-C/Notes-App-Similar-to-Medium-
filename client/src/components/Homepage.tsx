import React from 'react';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar'

const Homepage = () => {
    return (
        <div className='homepage' style={{height:'100vh', overflow:'hidden'}}>
            <Header />
            <Main />
        </div>
    )
}

export default Homepage



// import React from 'react';
// import Header from './Header';
// import Main from './Main';
// import Sidebar from './Sidebar'

// const Homepage = () => {
//     return (
//         <div className='homepage'>
//             <Header />
//             <Main />
//             <Sidebar />
//         </div>
//     )
// }

// export default Homepage
