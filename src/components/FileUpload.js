import React from 'react'
import { useDropzone } from 'react-dropzone'

function FileUpload(props) {
  const { onFileRead, onReset } = props

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.warn('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = onFileRead
      reader.readAsText(file)
    })
  }

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'text/html': [],
      'text/javascript': [],
      'text/plain': [],
    },
    maxFiles: 1,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  })

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const onOpenClick = () => {
    open()
    onReset?.()
  }

  return (
    <div className='file-upload--container'>
      <h2>File Upload</h2>
      <div {...getRootProps({ className: 'file-upload--dropzone ' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here</p>
        <em>(Only *.html, *.js and *.txt will be accepted)</em>
        <button type='button' onClick={onOpenClick} style={{ marginTop: 16 }}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>File</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  )
}

export default FileUpload
