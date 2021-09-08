import React,{ useState } from 'react'

const ToggleComponent = (props) => {
  const [toggle,setToggle] = useState(false)

  const ToggleButton = ({ message,id }) => {
    return(
      <button onClick={() => {setToggle(!toggle)}} id={`${id}-button`}>{message}</button>
    )
  }
  if (toggle){
    return(
      <div>
        {props.children}
        <ToggleButton message='cancel'id={`${props.id}-cancel`}/>
      </div>
    )
  }
  return(
    <ToggleButton message='create Blog' id={`${props.id}-create`}/>
  )
}

export default ToggleComponent