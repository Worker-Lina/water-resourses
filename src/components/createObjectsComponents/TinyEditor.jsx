import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({setValue, item, text, register, getValues, ...props}) => {
  return (
    <div {...props}>
        <div className="label">{text}</div>
        <Editor apiKey="4f6xda5u2vvl39l0mpmyr57z04zu1xdf06xd8d5sugtqakv9"
            value={getValues(item)}
            onEditorChange={(newValue, editor) => {
                setValue(item, newValue)
            }}
            init={{
                height: 500,
                menubar: false,
            }} 
            {...register(item)}/>
    </div>
  )
}

export default TinyEditor