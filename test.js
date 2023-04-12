// Example 1: Accessing document.cookie
var cookies = document.cookie // Match: document.cookie

// Example 2: Potential XSS vulnerability
var userInput = "<script>alert('XSS');</script>" // Match: <script>alert('XSS');</script>
document.write(userInput) // Match: document.write(userInput)

// Example 3: Potential SQL Injection vulnerability
var query = "SELECT * FROM users WHERE username='" + userInput + "';" // Match: SELECT * FROM users WHERE username='[userInput]';

// Example 4: Potential file inclusion vulnerability
var filename = 'userfile.php'
include(filename) // Match: include(filename)

// Example 5: Potential command injection vulnerability
var command = 'ls ' + userInput // Match: ls [userInput]
exec(command) // Match: exec(command)

// Example 6: Potential XSS vulnerability with different attribute names
var userInput2 = "<img src='x' onerror='alert(\"XSS\");'>" // Match: <img src='x' onerror='alert(\"XSS\");'>
document.write(userInput2) // Match: document.write(userInput2)

// Example 7: Potential file inclusion vulnerability with different function names
var filename2 = 'userfile.php'
require_once(filename2) // Match: require_once(filename2)

// Example 8: Potential command injection vulnerability with different function names
var command2 = 'ls ' + userInput2 // Match: ls [userInput2]
shell_exec(command2) // Match: shell_exec(command2)
