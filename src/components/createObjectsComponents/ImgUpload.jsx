import React from 'react'
import { useState } from 'react/cjs/react.development'
import ImgCart from './ImgCart'

const ImgUpload = ({text, image, setImage}) => {
    const [active, setActive] =useState(false)
    const [someImg, setSomeImg] = useState(null)

    const genUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
        })
      }
    function dragStartHandler(e){
        e.preventDefault();
    }
    function dragLeaveHandler(e){
        e.preventDefault();
    }

    async function ondropHandler(e){
      e.preventDefault();
      let files = [...e.dataTransfer.files]
      if(files[0].size >= 5242880){
          return
      }
      if(files[0].type !== "image/jpeg" && files[0].type !== "image/png"){
        return
      }
      setImage(files[0])
      var reader = new FileReader();
      reader.onload = function (e) {
          let img = {id:genUUID(), url:e.target.result, type:files[0].type, name: files[0].name}
          setSomeImg(img)
      }        
      reader.readAsDataURL(files[0]);
    }

    async function onAddImage(e){
      console.log("onaddimage")
      let files = [...e.target.files]
      if(files[0].size >= 5242880){
        return
      }
      if(files[0].type !== "image/jpeg" && files[0].type !== "image/png"){
        return
      }
      setImage(files[0])
      var reader = new FileReader();
      reader.onload = function (e) {
          let img = {id:genUUID(), url:e.target.result, type:files[0].type, name: files[0].name}
          setSomeImg(img)
      }        
      reader.readAsDataURL(files[0]);
  }
    
  return (
    <div>
        <div className="label">{text}</div>
            {someImg ? <ImgCart image={someImg} setImage={setSomeImg} /> 
            : image ? <ImgCart image={image} setImage={setImage} /> :
            <div className="img__upload"
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e=>ondropHandler(e)}>
                <p>
                    .jpg, .png <br/> Не более 5МБ
                </p>
                <input className="input__upload" type="file" accept=".jpg,.jpeg,.png" onChange={(e)=>onAddImage(e)}></input>
            </div> }
    </div>
  )
}

export default ImgUpload