import React from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import { Results } from './components/Results'
import { handleFileRead } from './scanner/handleFileRead'

function App() {
  const [vulnerabilities, setVulnerabilities] = React.useState([])

  const onFileRead = (event) => {
    handleFileRead(event, setVulnerabilities)
  }

  const onReset = () => {
    setVulnerabilities([])
  }

  return (
    <div className='app'>
      <FileUpload onFileRead={onFileRead} onReset={onReset} />
      <Results vulnerabilities={vulnerabilities} />
    </div>
  )
}

export default App
