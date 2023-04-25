import { getTypeFromPattern, vulnerabilityPatterns } from './patterns'

export function handleFileRead(event, setVulnerablities) {
  const fileContent = event.target.result
  const lines = fileContent.split('\n')
  const vulnerabilities = []

  lines.forEach((line, index) => {
    vulnerabilityPatterns.forEach((pattern) => {
      let match
      while ((match = pattern.exec(line)) !== null) {
        const type = getTypeFromPattern(pattern)
        const start = Math.max(match.index - 20, 0)
        const end = Math.min(match.index + match[0].length + 20, line.length)
        const snippet = line.substring(start, end)
        vulnerabilities.push({
          type,
          line: index + 1,
          snippet,
        })
      }
    })
  })

  setVulnerablities(vulnerabilities)
}
