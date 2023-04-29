var cookies = document.cookie

var userInput = "<script>alert('XSS');</script>"
document.write(userInput)

var query = "SELECT * FROM users WHERE username='" + userInput + "';"

var filename = 'userfile.php'
include('filename')

var command = 'ls ' + userInput
exec(command)

var userInput2 = "<img src='x' onerror='alert(\"XSS\");'>"
document.write(userInput2)

var command2 = 'ls ' + userInput2
shell_exec(command2)

fetch("https://www.mallory.com/").then()

var permissions = {"permissions":"declarativeNetRequest"}