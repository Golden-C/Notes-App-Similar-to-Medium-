import { createContext, useState, useEffect } from "react";

interface cont {
  noteLists?: NotesDetails[],
  onEdit?: string,
  handleOnEdit?: React.Dispatch<React.SetStateAction<string>>,
  active?: string,
  setActive?: React.Dispatch<React.SetStateAction<string>>,
  handleSetNoteLists?: React.Dispatch<React.SetStateAction<NotesDetails[]>>,
  tabMemory?:TabInterface[],
  handleTabMemory?: React.Dispatch<React.SetStateAction<TabInterface[]>>
}
interface NotesDetails {
  id:string
  date: string
  title : string
  body : string
  tags:string[]
}
interface TabInterface {
  id: string
  title: string
}

let init:cont = {}
const Context = createContext(init);
let first:NotesDetails[] = []
let tab:TabInterface[] = []
function NameContextProvider(props:any) {
  const [name, setName] = useState(first);
  const [activeFolder, setActiveFolder] = useState("");
  const [activeEdit, setactiveEdit] = useState("");
  const [tabMemory, setTabMemory] = useState(tab);
  const [stat, setStat] = useState('');

const def = window.localStorage.getItem('tabHistory')

useEffect(()=>{
  if(!def){
    setactiveEdit('')
  }else{
    let parsedDef= JSON.parse(def!)
    let ans = parsedDef.reverse().filter((thing:{id:string, title:string}, index:number, self:[]) =>
    index === self.findIndex((t:{id:string, title:string}) => (
      t.id === thing.id && t.title === thing.title
    ))
    )
    setTabMemory(ans)
    if(ans.length> 0){
      let first = ans[0].id
      setactiveEdit(first)
    }else{
      setactiveEdit('')
    }
    
  }
},[def])



  return (
    <Context.Provider
      value={{ 
        noteLists: name, 
        handleSetNoteLists:setName, 
        active:activeFolder, 
        setActive:setActiveFolder, 
        onEdit:activeEdit, 
        handleOnEdit:setactiveEdit,
        tabMemory:tabMemory,
        handleTabMemory:setTabMemory
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

// let expcontext = { NameContextProvider, Context };

export  { NameContextProvider, Context }
