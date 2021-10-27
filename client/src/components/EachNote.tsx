import React from 'react'
import {useContext, useState , useEffect} from 'react'
import './fil.css';
import { Context } from "../UserContext";

interface NotesDetails {
    id?:string,
    date: string
    title : string
    body : string
    tags:string[]
}

export default function EachNote(props:NotesDetails) {

    const { handleOnEdit, onEdit, handleTabMemory } = useContext(Context);
    console.log(onEdit, 'edit')
    function setHistory(noteId:string,noteTitle:string) {

        let history =  window.localStorage.getItem('tabHistory')
        let parsedHistory = JSON.parse(history!)
        parsedHistory.push({
            id:noteId,
            title:noteTitle,
        })
        handleTabMemory!(parsedHistory)
        window.localStorage.setItem('tabHistory', JSON.stringify(parsedHistory))
    }
   

    let bod = {...props}.body
    let newBod = bod.substring(0,1).toLocaleUpperCase() + bod.substring(1, bod.length-1)
    let displayTags
    if(props.tags.length === 0){
        displayTags = ['Tags', 'Tags', 'Tags']
    }else{
        displayTags = props.tags
    }

    
    return (
        <>
            <div className="notes-list" style={{ textAlign:'left', cursor:'pointer' }} onClick={
                ()=>{
                    handleOnEdit!(props.id!)
                    setHistory(props.id!,props.title)
                    console.log(onEdit + 'klj')
                }
                
                }>
            <span className="note-date">{props.date}</span>
            <h3 className="note-title">{props.title}</h3>
            <p className="note-body">{(newBod.trim().split('').length === 0) ? 'No description yet' : newBod.replace( /(<([^>]+)>)/ig, '').substring(0,57)}{(newBod.replace( /(<([^>]+)>)/ig, '').length > 57) ? ('...'): ('')}</p>
            <div className="note-tags">
                {displayTags.map((val)=>(<p className="tag">#{val.toUpperCase()}</p>))}
            </div>
        </div>
        </>
        
    )
}
