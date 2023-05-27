import './PlayButton.scss'

export default function PlayButton(){

    return (
        
        <>
    <div className="circle" onClick={()=>console.log("hellow world")}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="40,30 65,50 40,70"></polygon>
      </svg>
      </div>
    </>
       
    )

}