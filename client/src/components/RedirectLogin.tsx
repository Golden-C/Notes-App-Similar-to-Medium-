import React from "react";
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";

const RedirectLogin =  () => {

        let params:{token:string} = useParams()
        const token=params.token
        const history = useHistory()
        let apiRes = null
        try{
           apiRes = async()=>{
           return await axios.get(`https://notesxd.herokuapp.com/users/confirm/${token}`)
             }
             apiRes()
           history.push('/')
        } catch (err:any) {
           apiRes = err.response;
        } finally {
           console.log(apiRes);
        }
    return (
        <div>

        </div>
    );
}

export default RedirectLogin
