import React, {useState} from 'react'

const NewSelect = ({options, setValue, register, item, getValues, setIsCorrectType}) => {
  const [active, setActive] = useState(false);

  const selectClick = (e)=>{
    setActive(!active);
    e.stopPropagation();
    document.body.addEventListener('click', function(){setActive(false)});
    document.body.removeEventListener('click', function(){setActive(false)})         
  }

  return (
    <div onClick={(e)=>selectClick(e)} className="select">
        <input className="input select-input" readOnly {...register(item, { required: true})} />
        {getValues(item) ? <input className="input select-input" readOnly value={getValues(item).name}/> : <></>}
        {getValues(item) ? <span className="select-cross" onClick={()=>{setValue(item, "");  setIsCorrectType(false);}}>&#10006;</span>: ""}
        <span className="select__line"></span>
        <div className={active ? "select-icon select-icon-active" : "select-icon"}></div>
        {active ? <div className="select-div">
            {options.map(option => 
                <div className="select-item" key={option.id} onClick={()=>{setValue(item, option); 
                  if((option.id === 2 || option.id === 3) && item === "type"){
                    setIsCorrectType(true);
                  }else{
                    setIsCorrectType(false);
                  }}}
                  >{option.name}</div>
            )}
        </div> : <></>}
    </div>
  )
}

export default NewSelect