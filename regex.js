const regexList = [
    // XSS
    /<script\b[^>]*>(.*?)<\/script>/g,
    /<iframe[^>]*>.*<\/iframe>/g,
    /javascript:(.*)/g,
    /on[a-z]+\s*=/g,
    /exec\(/g,
    /eval\(/g,
    /setTimeout\(/g,
    /setInterval\(/g,

    // SQLI
    /SELECT.+FROM/g,
    /DROP.+TABLE/g,
    /INSERT\s+INTO/g,

    // Command Injection
    /\&\&|\|\|/g,
    /;.*/g,

    // File Inclusion
    /include\s*\(.+\)/g,
    /require\s*\(.+\)/g,
    /File\.Open\(/g,

    // Secrets
    /-----BEGIN\s+PRIVATE\s+KEY-----/g,
    /secret|apikey/g,

    // Information Leaks
    /chrome\.(extension|tabs|cookies|history|runtime)\.(\w|\d)+/g,
    /http:\/\/|https:\/\//g,
    /localStorage\.setItem\(/g,

    // Insecure Calls
    /http:\/\//g,
    /XMLHttpRequest\(/g,
    /https?\:\/\/(www\.)?example\.com/g,

    // Cookie Stuffing
    /document.cookie/g,
    /cookie=\w+/g,
]