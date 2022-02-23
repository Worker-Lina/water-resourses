import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { deleteObject } from '../../http/reservoirApp'
import Loading from '../loading/Loading'
import MyButton from '../myButton/MyButton'
import "./objectItem.css"

const ObjectItem = ({item, objects, setObjects, setSuccess, setResponseActive}) => {
    const [active, setActive] = useState(false)
    const [preLoader, setPreLoader] = useState(false)

    const deleteItem = async () =>{
        setActive(false)
        setPreLoader(true);
        deleteObject(item.id).then(data=>{console.log(data); setObjects(objects.filter(ob => ob.id !== item.id));
            setResponseActive(true);
            setSuccess(true);})
    }

  return (<>
      {preLoader ? <Loading/> : <></>}
    <div className="object__item">
        <p className="user__item__text">{item.id}</p>
        <p className="user__item__text">{item.name}</p>
        <div className={item.status.id === 4 ? "user__item__status" : item.status.id === 3 ?  "user__item__status develop" : item.status.id === 2 ? "user__item__status pending__planning" :  "user__item__status pending__funding"}> {item.status.name}</div>
        <div>
            <Link to={"/objects/"+ item.id}> <svg className="icon eye-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.4386 9.98755C20.097 7.75155 17.0858 4.00049 11.9972 4.00049C6.90959 4.00049 3.89842 7.75155 2.55579 9.98755C1.81099 11.2285 1.81099 12.7715 2.55579 14.0125C3.89842 16.2485 6.90959 19.9995 11.9972 19.9995C17.0858 19.9995 20.097 16.2485 21.4386 14.0125C22.1834 12.7715 22.1834 11.2295 21.4386 9.98755ZM19.7241 12.9835C18.5994 14.8575 16.1011 18.0005 11.9972 18.0005C7.89432 18.0005 5.395 14.8565 4.27031 12.9835C3.90641 12.3775 3.90641 11.6235 4.27031 11.0165C5.395 9.14348 7.89432 5.99951 11.9972 5.99951C16.1011 5.99951 18.5994 9.14248 19.7241 11.0165C20.088 11.6235 20.088 12.3775 19.7241 12.9835ZM11.9972 7.50049C9.51687 7.50049 7.49843 9.51949 7.49843 12.0005C7.49843 14.4815 9.51687 16.5005 11.9972 16.5005C14.4775 16.5005 16.496 14.4815 16.496 12.0005C16.496 9.51949 14.4775 7.50049 11.9972 7.50049ZM11.9972 14.5005C10.6196 14.5005 9.49788 13.3795 9.49788 12.0005C9.49788 10.6215 10.6196 9.50049 11.9972 9.50049C13.3748 9.50049 14.4965 10.6215 14.4965 12.0005C14.4965 13.3795 13.3748 14.5005 11.9972 14.5005Z" fill="#3D9897"/>
            </svg></Link>
            <Link to={"/create-object/"+item.id}> <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.6578 3.34253C19.7928 2.47753 18.6427 2.00049 17.4197 2.00049C16.1967 2.00049 15.0467 2.47753 14.1817 3.34253L3.64872 13.8755C3.20372 14.3205 2.91371 14.8835 2.81071 15.5035L2.02073 20.2415C1.94073 20.7215 2.09875 21.2145 2.44175 21.5575C2.72675 21.8425 3.11372 21.9995 3.51072 21.9995C3.59372 21.9995 3.67571 21.9925 3.75871 21.9785L8.49674 21.1885C9.11674 21.0855 9.67973 20.7955 10.1247 20.3505L20.6578 9.8175C21.5228 8.95251 21.9997 7.80147 21.9997 6.57947C21.9997 5.35647 21.5228 4.20753 20.6578 3.34253ZM8.71073 18.9385C8.56273 19.0865 8.37474 19.1835 8.16874 19.2175L4.10673 19.8945L4.78373 15.8325C4.81773 15.6265 4.91472 15.4385 5.06272 15.2905L12.9687 7.38452L16.6167 11.0325L8.71073 18.9385ZM19.2438 8.40454L18.0307 9.61743L14.3827 5.96948L15.5957 4.75647C16.0827 4.26947 16.7317 4.00049 17.4197 4.00049C18.1087 4.00049 18.7568 4.26947 19.2438 4.75647C19.7308 5.24347 19.9997 5.89144 19.9997 6.58044C19.9997 7.26944 19.7308 7.91754 19.2438 8.40454Z" fill="#55A5E0"/>
            </svg></Link>
            <svg onClick={()=>setActive(true)} className="icon basket-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5H17.441C17.01 5 16.629 4.72602 16.492 4.31702L16.176 3.36694C15.903 2.54994 15.14 2 14.279 2H9.71997C8.85797 2 8.095 2.55004 7.823 3.36804L7.50702 4.31604C7.37102 4.72504 6.98898 5 6.55798 5H3C2.448 5 2 5.447 2 6C2 6.553 2.448 7 3 7H4.065L4.81598 18.266C4.95498 20.36 6.70801 22 8.80701 22H15.194C17.293 22 19.046 20.359 19.185 18.266L19.936 7H21C21.552 7 22 6.553 22 6C22 5.447 21.552 5 21 5ZM9.72101 4L14.28 3.99902L14.596 4.94897C14.602 4.96697 14.611 4.982 14.618 5H9.38397C9.38997 4.982 9.40001 4.966 9.40601 4.948L9.72101 4ZM17.189 18.1331C17.119 19.1801 16.243 20 15.193 20H8.80603C7.75703 20 6.88 19.1801 6.81 18.1331L6.06897 7H6.55902C6.66602 7 6.77098 6.98598 6.87598 6.97498C6.91898 6.98098 6.95598 7 7.00098 7H17.001C17.045 7 17.083 6.97998 17.126 6.97498C17.231 6.98598 17.335 7 17.443 7H17.933L17.189 18.1331ZM15 11V16C15 16.553 14.552 17 14 17C13.448 17 13 16.553 13 16V11C13 10.447 13.448 10 14 10C14.552 10 15 10.447 15 11ZM11 11V16C11 16.553 10.552 17 10 17C9.448 17 9 16.553 9 16V11C9 10.447 9.448 10 10 10C10.552 10 11 10.447 11 11Z" fill="#FF0000"/>
            </svg>
        </div>
    </div>
    <div className="line"></div>
    {active ? 
        <div className="deletion__modal" onClick={()=>setActive(false)}>
            <div className="deletion__modal__content" onClick={(e)=>e.stopPropagation()}>
                <div className="response__close" onClick={()=>setActive(false)}>
                    <span className="close__icon">&#10006;</span>
                </div>
                <p>Вы уверены, что хотите удалить выбранную запись?</p>
                <div className="page__buttons">
                    <MyButton variant="green" onClick={deleteItem}>Да</MyButton>
                    <MyButton variant="blue" onClick={()=>setActive(false)}>Нет</MyButton>
                </div>
            </div>
        </div>
    : <></>}
    </>
  )
}

export default ObjectItem