import React from 'react'
import { deleteUser } from '../../http/userApi'
import MyButton from '../myButton/MyButton'
import "./deletionConfirm.css"

const DeletionConfirm = ({setActive, setAgreement}) => {
  return (
    <div className="deletion__modal" onClick={()=>setActive(false)}>
            <div className="deletion__modal__content" onClick={(e)=>e.stopPropagation()}>
                <div className="response__close" onClick={()=>setActive(false)}>
                    <span className="close__icon">&#10006;</span>
                </div>
                <p>Вы уверены, что хотите удалить выбранную запись?</p>
                <div className="page__buttons">
                    <MyButton variant="green" onClick={()=>{setAgreement(true); setActive(false)}}>Да</MyButton>
                    <MyButton variant="blue" onClick={()=>setActive(false)}>Нет</MyButton>
                </div>
            </div>
    </div>
  )
}

export default DeletionConfirm