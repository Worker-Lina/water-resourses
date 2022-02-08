import React from 'react';
import "./myButton.css"

const MyButton = ({children, ...props}) => {
    const selectClassName = () => {
        switch(props.variant){
            case 'blue small':
                return "btn btn-blue btn-small";
            case 'blue':
                return "btn btn-blue";
            case 'blue large':
                return "btn btn-blue btn-large";
            case 'orange small':
                return "btn btn-orange btn-small";
            case 'orange':
                return "btn btn-orange";
            case 'orange large':
                return "btn btn-orange btn-large"
            case 'border small':
                return "btn btn-border btn-small";
            case 'border':
                return "btn btn-border";
            case 'border large':
                return "btn btn-border btn-large";
            default:
                return "btn"
        }
    }

  return (
    <button className= {selectClassName()} {...props}>
        {children}
    </button>
  )
};

export default MyButton;
