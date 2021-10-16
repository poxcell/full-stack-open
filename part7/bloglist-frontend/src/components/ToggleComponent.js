import React,{ useState } from 'react'
import Button from '@mui/material/Button'


const ToggleComponent = (props) => {
  const [toggle,setToggle] = useState(false)

  const ToggleButton = ({ message,id }) => {
    return(
      <Button
        variant='contained'
        onClick={() => {setToggle(!toggle)}}
        id={`${id}-button`}>
        {message}
      </Button>
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