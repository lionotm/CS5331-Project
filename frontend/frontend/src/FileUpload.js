import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles) => {
    setLoading(true);
    setFiles(acceptedFiles);

    // Simulate processing the files
    setTimeout(() => {
      const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);
      setResult(`Uploaded ${acceptedFiles.length} files (${formatSize(totalSize)})`);
      setLoading(false);
    }, 2000);
  };

  const formatSize = (bytes) => {
    const kb = bytes / 1024;
    if (kb < 1024) {
      return kb.toFixed(1) + ' KB';
    } else {
      const mb = kb / 1024;
      return mb.toFixed(1) + ' MB';
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <Dropzone onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop a folder or files, or click to select them</p>
          </div>
        )}
      </Dropzone>
      {loading && (
        <div>
          <p>Processing files...</p>
          <div className="spinner"></div>
        </div>
      )}
      {result && (
        <div>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
