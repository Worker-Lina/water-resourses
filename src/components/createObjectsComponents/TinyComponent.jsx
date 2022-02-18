import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';


const TinyComponent = ({text, item, setItem, ...props}) => {
    const editorRef = useRef(null);
  return (<div {...props}>
      <div className="label">{text}</div>
       <Editor apiKey="4f6xda5u2vvl39l0mpmyr57z04zu1xdf06xd8d5sugtqakv9"
        value={item}
        onEditorChange={(newValue, editor) => {
          setItem(newValue);
        }}
        init={{
          height: 500,
          menubar: false,
        }}
      />
  </div>
  )
}
export default TinyComponent