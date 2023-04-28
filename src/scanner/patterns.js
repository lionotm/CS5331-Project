const cookiePatterns = [/\bdocument\s*\.\s*cookie\b/g]

const xssPatterns = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
  /<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi,
  /<\s*[a-zA-Z]+\s[^>]*(on\w+\s*=|src\s*=|href\s*=)[^>]*>/g,
]

const sqlInjectionPatterns = [
  /select.*from|insert.*into|update.*set|delete.*from/gi,
  /\'\s*or\s*\'|\"\s*or\s*\"/gi,
  /--.*$/gm,
]

const fileInclusionPatterns = [
  /include\(['"](?!\bhttp[s]?:\/\/)[^'"]+['"]\)/gi,
  /include_once\(['"](?!\bhttp[s]?:\/\/)[^'"]+['"]\)/gi,
  /require\(['"](?!\bhttp[s]?:\/\/)[^'"]+['"]\)/gi,
  /require_once\(['"](?!\bhttp[s]?:\/\/)[^'"]+['"]\)/gi,
]

const commandInjectionPatterns = [
  /(`|\$)(\()?\s*(cat|ls|pwd|echo|id)(\s|\|)/gi,
  /(exec|system|passthru|popen|proc_open)\s*\(.+\)/gi,
]

const externalCallRegex = [
  /(^|[^a-zA-Z0-9_$])\$(?:\(|ajax\(|get\(|post\(|getJSON\()/gm,
  /yield\s+this\._request\(/gi,
  /method:\s*"(GET|POST)"/gi,
  /fetch\(/gi,
];

const criticalPermissionRegex = [
  /("cookies"|"<all_urls>"|"webRequest"|"storage"|"declarativeNetRequest"|"geolocation"|"unsafe-eval")/gm
];

// Combine all patterns into a single array
export const vulnerabilityPatterns = [
  ...cookiePatterns,
  ...xssPatterns,
  ...sqlInjectionPatterns,
  ...fileInclusionPatterns,
  ...commandInjectionPatterns,
  ...externalCallRegex,
  ...criticalPermissionRegex
]

export function getTypeFromPattern(pattern) {
  if (xssPatterns.includes(pattern)) {
    return 'XSS'
  } else if (sqlInjectionPatterns.includes(pattern)) {
    return 'SQL Injection'
  } else if (fileInclusionPatterns.includes(pattern)) {
    return 'File Inclusion'
  } else if (commandInjectionPatterns.includes(pattern)) {
    return 'Command Injection'
  } else if (cookiePatterns.includes(pattern)) {
    return 'Cookie Theft'
  } else if (externalCallRegex.includes(pattern)) {
    return 'External call'
  } else if (criticalPermissionRegex.includes(pattern)) {
    return 'Critical permission/CSP'
  } else {
    return 'Unknown'
  }
}
