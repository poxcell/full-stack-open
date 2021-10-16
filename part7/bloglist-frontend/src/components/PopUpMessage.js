import React from 'react'
import { useSelector } from 'react-redux'

const PopUpMessage = () => {

  const popup = useSelector(state => state.popup)
  const styledPopUp ={
    color: popup ? popup.color : 'green' ,
    fontSize: '1.2em',
    backgroundColor:'lightgray',
    padding:'.6em',
    paddingLeft:'1.2em',
    border: popup ? `solid 4px ${popup.color}` : 'solid 4px',
    borderRadius:'50px'
  }
  if(popup){
    return<div style={styledPopUp} className='popUp'>
      <strong>{popup.message}</strong>
    </div>
  }
  return(
    <div></div>
  )
}

export default PopUpMessage