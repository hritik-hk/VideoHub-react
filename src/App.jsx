import './App.css'
import Video from './components/Video/Video'
import videoDB from './assets/data'
import {useRef,useEffect,useReducer, useState } from 'react'
import Modal from './components/Modal/Modal'
import ThemeContext from './context/ThemeContext'
import VideoDispatchContext from './context/VideoDispatchContext'
import TopControls from "./components/TopControls/TopControls"
import { Button,AlertTitle, Alert } from '@mui/material';


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
  const [error,setError]=useState(false);
 
  
  //for storing the total length of the data array
  //it will store total lenth of elements the were ever added to the data array
  // this used to solve key duplication while mapping data elements in react
  const totalLen=useRef(3); 


  function dataReducer(data,action){

    switch(action.type){

      case 'ADD':{
        const addedData=[
          ...data,
          {
            ...action.payload,
            id:totalLen.current+20
          }
        ]
        totalLen.current++;
        return addedData;
      }

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
        
        const res=action.payload.map((vid)=>{
           const obj= {...vid,id:totalLen.current+20}
           totalLen.current++;
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

      try{
    const res=await fetch('https://my.api.mockaroo.com/videos.json?key=271ef0b0');

        if(!res.ok){
          throw new Error("Something Went Wrong, Unable to fetch data from API!");
        }else{
           const apiData=await res.json();
           dispatch({type:"API", payload:apiData});
        }
      }catch(err){
         setError(true);
      }


  }



  return (
    <ThemeContext.Provider value={mode}>
    <VideoDispatchContext.Provider value={dispatch}>   
    <div ref={contentRef} style={{ height: divHeight, overflowY: 'auto' }} className={`app ${mode}`} >

    {modalOpen && <Modal 
   edit={edit}
   setOpenModal={setModalOpen} />}

{error && <Alert severity="error"
 action={
    <Button color="inherit" size="small" onClick={()=>setError(false)}>
      close
    </Button>
  }
 >
  <AlertTitle>Error</AlertTitle>
  Something Went Wrong— <strong>Unable to fetch data from API</strong>
</Alert>}

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
