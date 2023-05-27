
import { useEffect, useState } from "react";
import "./Modal.css";

import useVideoDispatch from "../../Hooks/VideoDispatch";

function Modal({ setOpenModal, edit}) {

  const dispatch=useVideoDispatch();

    const[video, setVideo]=useState({
    time:"1 year ago",
    views:"1.5M",
    verified:true,
    title:"",
    channel:""
    })

    function handleSubmit(e){
        e.preventDefault();
        setOpenModal(false);
        if(!edit){
          dispatch({type:'ADD', payload:video})
        }else{
          dispatch({type:'UPDATE', payload:video})
        }
    }


    function handleChange(e){

        e.stopPropagation()

        setVideo({
            ...video,
            [e.target.name]:e.target.value
        })

    }

   
    useEffect(()=>{
     if(edit){
      setVideo(edit);
     } 
    },[edit])

   

  return (
    <div className="modalBackground">
      <div className="modalContainer" style={{color: "black"}}>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            style={{color: "black"}}
          >
            X
          </button>
        </div>
        <div className="title" >
          <h1 style={{color: "black"}}>{edit?'Edit Video':'Add New Video'}</h1>
        </div>
        <div className="modal-form">
            <form style={{color: "black"}} >

            <input type="text" 
            name="title"
            value={video.title}  
            onChange={handleChange}
            placeholder="Title" 
            style={{color: "black"}}/>

            <input type="text"
             name="channel"
             value={video.channel}  
             onChange={handleChange}
             placeholder="Channel" style={{color: "black"}}/>

            </form>
        </div>
        <div className="footer">
          <button
          onClick={handleSubmit}
            id="cancelBtn"
          >{edit?'Edit':'Add'}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;