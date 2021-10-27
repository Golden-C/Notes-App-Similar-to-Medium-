import React from 'react'
import {useParams} from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { Markup } from 'interweave';
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
const NotesPage = () => {
  const { id }:{id:string} = useParams()
  console.log(id)
  const decoded = jwt.verify(id,'secret') as unknown as det
  console.log(Object.keys(decoded))
  console.log(decoded.body)
//    
  const d = document.createElement("div")
    d.innerHTML= decoded.body!;
    let newBody = d.innerText
    console.log( d.innerText)

    return (
        <div style={{display:"flex", flexDirection:"column", height:"100vh",width:"100vw",backgroundColor:'#EAEAEA'}}>
           <div style={{padding:"30px", }}> <span>{decoded.title}</span></div>
           {/* <div style={{ width:"97%", height:"1px", backgroundColor:"#231F20"}}/> */}
           <div style={{padding:"0 0 35px 0"}}><span>{decoded.createdBy!.firstName} {decoded.createdBy!.lastName}</span></div>
           <div style={{padding:"0 0 40px 0"}}> <span>{decoded.tags!.map(val=>{
               return (<span>{val } </span>)
           })}</span></div>
           <div style={{width:"96%", height:"1px", backgroundColor:"#231F20", marginLeft:"30px"}}/>
           <div style={{padding:"20px 0 40px 0", width:"96%", backgroundColor:"white", height:"100%", marginLeft:"30px"}}><Markup content={decoded.body} /></div>
        </div>
    )
}
export default NotesPage