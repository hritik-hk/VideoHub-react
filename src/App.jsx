import './App.css'
import Video from './components/Video/Video'
import videoDB from './assets/data'
import {useRef,useEffect,useReducer, useState } from 'react'
import Modal from './components/Modal/Modal'
import ThemeContext from './context/ThemeContext'
import VideoDispatchContext from './context/VideoDispatchContext'
import TopControls from "./components/TopControls/TopControls"
import { Button } from '@mui/material';


function App() {
  const [divHeight, setDivHeight] = useState('100vh');
  const contentRef = useRef(null);
  

  useEffect(() => {
    const contentDiv = contentRef.current;
    const updateDivHeight = () => {
      const contentHeight = contentDiv.offsetHeight;
      setDivHeight(contentHeight);
    };

    updateDivHeight();
    window.addEventListener('resize', updateDivHeight);

    return () => {
      window.removeEventListener('resize', updateDivHeight);
    };
  }, []);


  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit]= useState(null);
  const [mode, setMode]= useState('darkMode');
  const [checked,setChecked]=useState(true);
 
  


  function dataReducer(data,action){

    switch(action.type){

      case 'ADD':
       return [
          ...data,
          {
            ...action.payload,
            id:data.length+20
          }
        ]

      case 'DELETE':
        return data.filter(video=>video.id!==action.payload)

      case 'UPDATE':{
        const index= data.findIndex(vid=>vid.id===action.payload.id);
        const updatedData=[...data];
        updatedData.splice(index,1,action.payload);
        setEdit(null);
        return updatedData;
      }

      case 'API':{
        let len=data.length;
        const res=action.payload.map((vid)=>{
           const obj= {...vid,id:len+20}
           len++;
           return obj
        })

        return [...data,...res]
      }
     

      default:
        return data
        
    }

  }

  const[data,dispatch]=useReducer(dataReducer,videoDB)

  

  function handleModel(){
    setModalOpen(true);
  }


  function handleEdit(id){
    setEdit(data.find((video)=>video.id===id));
    setModalOpen(true);
  }

  function handleChange(){
    setMode(mode=='darkMode'?'':'darkMode')
    setChecked(!checked)
  }

  async function handleClick(){

    const res=await fetch('https://my.api.mockaroo.com/videos.json?key=271ef0b0');

    const apiData=await res.json();

    dispatch({type:"API", payload:apiData});

  }



  return (
    <ThemeContext.Provider value={mode}>
    <VideoDispatchContext.Provider value={dispatch}>   
    <div ref={contentRef} style={{ height: divHeight, overflowY: 'auto' }} className={`app ${mode}`} >

    {modalOpen && <Modal 
   edit={edit}
   setOpenModal={setModalOpen} />}

      <TopControls handleChange={handleChange} handleModel={handleModel} checked={checked} mode={mode}/>

      <div style={{paddingLeft:"20px"}}>
      <Button   variant="contained" onClick={handleClick}>Get Videos From API</Button>
      </div>
   
 {
  data.map(video=>{
    return (<Video 
    key={video.id}
    id={video.id}
    title={video.title}
    channel={video.channel}
    time={video.time}
    views={video.views}
    verified={video.verified}
    handleEdit={handleEdit}
    />)
  })
 }

  </div>
  </VideoDispatchContext.Provider>
  </ThemeContext.Provider>
  )
}

export default App
