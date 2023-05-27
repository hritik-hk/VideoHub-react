import './Video.css'
import PlayButton from '../PlayButton/PlayButton';
import { RxCrossCircled } from "react-icons/rx";
import {AiOutlineEdit} from "react-icons/ai";
import useVideoDispatch from '../../Hooks/VideoDispatch';

function Video(props){

    const {id,title,channel,views, time, verified=false,handleEdit}=props; //putting default verified value to false

    const dispatch=useVideoDispatch();

    function handleModify(){
        handleEdit(id);
    }

    return(
        <>
        <div className="container">
        <PlayButton/>
        <RxCrossCircled className='remove' onClick={()=>dispatch({type:'DELETE', payload:id})}/>
        <AiOutlineEdit className='edit' onClick={handleModify}/>
       <img className="thumbnail" src={`https://picsum.photos/id/${id}/300/150`} alt="image" />
       <div>{title}</div>
       <div className="info">
       <div>{channel} {verified && '✅'}</div>
        {views} views <span>.</span> {time}
       </div>
       </div>
       </>
    )

}

export default Video