const fs = require('fs')

// Read the file path from command line arguments
const filePath = process.argv[2]
const fileContent = fs.readFileSync(filePath, 'utf8')

// Regular expressions for detecting security vulnerabilities
const xssRegex =
  /<[\w\s]*?(\b(on\w+\s*=|src\s*=|href\s*=)\b)[\s\S]*?>|([\w\s]*?document\.\bcookie\b[\s\S]*?)/g
const sqlInjectionRegex =
  /\b(SELECT|UPDATE|DELETE|INSERT|ALTER|DROP)\b[\s\S]*?\bFROM\b[\s\S]*?\bWHERE\b[\s\S]*?(=|LIKE|<|>|<>|<=|>=)\b[^;]*?['"`\s\b\)]/g
const fileInclusionRegex = /\b(include|require)(_once)?\b[\s\S]*?['"`][^'"`]+['"`]/g
const commandInjectionRegex =
  /\b(exec|shell_exec|system|passthru|popen)\b[\s\S]*?['"`][^'"`]+['"`]/g

// Function to log out the type of vulnerability
function logVulnerability(type, line) {
  console.log(`Found ${type} vulnerability in line ${line}`)
}

// Scan for XSS vulnerabilities
let match
while ((match = xssRegex.exec(fileContent)) !== null) {
  logVulnerability('XSS', getLineNumber(match.index, fileContent))
}

// Scan for SQL Injection vulnerabilities
while ((match = sqlInjectionRegex.exec(fileContent)) !== null) {
  logVulnerability('SQL Injection', getLineNumber(match.index, fileContent))
}

// Scan for File Inclusion vulnerabilities
while ((match = fileInclusionRegex.exec(fileContent)) !== null) {
  logVulnerability('File Inclusion', getLineNumber(match.index, fileContent))
}

// Scan for Command Injection vulnerabilities
while ((match = commandInjectionRegex.exec(fileContent)) !== null) {
  logVulnerability('Command Injection', getLineNumber(match.index, fileContent))
}

// Function to get line number from character index
function getLineNumber(index, content) {
  const lines = content.slice(0, index + 1).split('\n')
  return lines.length
}
