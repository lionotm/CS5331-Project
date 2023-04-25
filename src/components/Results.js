import React from 'react'

export const Results = (props) => {
  const { vulnerabilities = [] } = props

  return (
    <div>
      {vulnerabilities.length > 0 && (
        <div>
          <h2>{vulnerabilities.length} Potential Vulnerabilities Found:</h2>
          <ul style={{ wordBreak: 'break-word' }}>
            {vulnerabilities.map((vulnerability, index) => (
              <li key={index}>
                {vulnerability.type} vulnerability in line {vulnerability.line}
                <pre>{vulnerability.snippet}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
