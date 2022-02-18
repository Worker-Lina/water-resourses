import React, { useState } from 'react'

const MySelect = ({active, setActive, options, setSelectedItem}) => {
  return (
    <div className={active ? "select-options" : "select-options select-options-active"}>
        {options.map(option => 
            <p className="select-option-text" key={option.id} onClick={()=>{setSelectedItem(option); setActive(false)}}>{option.name}</p>
        )}
    </div>
  )
}

export default MySelect