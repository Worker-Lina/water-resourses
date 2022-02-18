import React from 'react'
import "./responseRequest.css"

const ResponseRequets = ({success, active, setActive}) => {
  return (<div className="response__container">
    <div className="response__content">
        <div className="response__close" onClick={()=>setActive(false)}>
            <span className="close__icon">&#10006;</span>
        </div>
        <div className="response__request">
            <div className={success ? "success" : "success error"}>
                <span className="success__icon"> {success ? <>&#10004;</> : <>&#10006;</>}</span>
            </div>
            <div>{success ? "Success" : "Error"}</div>
        </div>
    </div>
    <div className={success ? "success__line" : "success__line error__line"}></div>
    </div>
  )
}

export default ResponseRequets