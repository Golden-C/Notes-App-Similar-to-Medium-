import {useContext, useState , useEffect} from 'react'
import { Context } from "../UserContext";
import axios from "axios";
import { Editor,  } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import "./editor.css"
import {
 EditorState,
 ContentState, 
 convertFromRaw,
 convertToRaw,
 convertFromHTML,
} from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
function TextEditor() {
  const {  onEdit } = useContext(Context);
  // const [bod, setBod] = useState('<p><span style="color: #e4e1e0;"><em>You can write your notes here</em></span></p>')
  const blocksFromHTML = convertFromHTML('Type Your Note here');
  const [bod, setBod] = useState('<p><span style="color: #e4e1e0;"><em>You can write your notes here</em></span></p>')
 
  // let realbo
    const [editorState, setEditorState] = useState(EditorState.createWithContent(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      )
    ),)

  useEffect(()=>{
const getNote = async(inp:string)=>{
  let result:any = null
  let userDetails = window.localStorage.getItem('user')!
  
  try{
    result = await axios({
      headers:{
          'authorization' : JSON.parse(userDetails).token
      },
      withCredentials : true,
      url : `https://notesxd.herokuapp.com/notes/${inp}`,
  }) 

       setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(result.data.body).contentBlocks,
          convertFromHTML(result.data.body).entityMap,
        )
      ),
     )
  result.data.body =  'hkern'
  setBod(result.data.body)

  }catch(err:any){
    result = err.message
  }
}
getNote(onEdit!)
},[onEdit, bod, setBod])
  const onEditorStateChange = (editorState:any) => {
    setEditorState(editorState)
  }
  const rawContentState = convertToRaw(editorState.getCurrentContent())
  const markup = draftToHtml(rawContentState)


  const handleSubmit = async() => {
    console.log(markup + onEdit)
    let result:any = null
    let userDetails = window.localStorage.getItem('user')!
    
    try{
      result = await axios({
        method: 'PUT',
        headers:{
            'authorization' : JSON.parse(userDetails).token
        },
        data: {body:markup},
        withCredentials : true,
        url : `https://notesxd.herokuapp.com/notes/editnote/${onEdit}`,
    }) 
    console.log(result)
    window.location.reload()

    }catch(err:any){
      result = err.message
    }
  }


  
  return (
    <div className="text_editor">
      <Editor
          

      editorState={editorState}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      onEditorStateChange={onEditorStateChange}
      // onChange = {setBod}
      />
  <button onClick={handleSubmit} >Submit</button>
    </div>
  )
}
export default TextEditor





















// import { useEffect, useState } from "react";
// import { Editor, EditorState, ContentState } from "draft-js";
// import "draft-js/dist/Draft.css";

// // helper function
// const createState = (text:any) => {
//   return EditorState.createWithContent(ContentState.createFromText(text));
// };

// const ControlledEditor = ({ htmlContent }:{htmlContent?:any}) => {
//   // define the local state, using the createState callback to create the initial value
//   const [editorState, setEditorState] = useState(createState(htmlContent));

//   // override the local state any time that the props change
//   useEffect(() => {
//     setEditorState(createState(htmlContent));
//   }, [htmlContent]);

//   return (
//     <Editor
//     // toolbarClassName="toolbar-class"
//       // wrapperClassName="wrapper-class"
//       // editorClassName="editor-class"
//       editorState={editorState}
//       onChange={setEditorState}
//     />
//   );
// };
// // export default ControlledEditor
// export default function Appe() {
//   const [text, setText] = useState("Hello World");
//   return (
//     <div>
//       <h2>Source Text</h2>
//       <textarea value={text} onChange={(e) => setText(e.target.value)} />
//       <h2>Editor</h2>
//       <ControlledEditor htmlContent={text} />
//     </div>
//   );
// }