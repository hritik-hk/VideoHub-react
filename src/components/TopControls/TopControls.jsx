import { Switch,FormControlLabel,Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './TopControls.css'

export default function TopControls({handleModel,handleChange,checked,mode}){

    function handleClick(){
        handleModel();
      }

 return ( <div className='TopControls'>
   <Button  onClick={handleClick} variant="contained" startIcon={<AddIcon />}>
  Add Video
</Button>
    <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label={mode=='darkMode'?'Disable DarkMode':'Enable DarkMode'} />
  
        </div>)
}