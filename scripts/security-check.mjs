import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '..')
const files = ['plugin.js', 'README.md', 'install.ps1', 'install.sh', 'package.json']
const forbidden = [/discord_?token\s*[:=]/i, /authorization\s*[:=]/i, /password\s*[:=]/i, /C:\\Users\\/i, /AppData\\Roaming\\Hermes\\Partitions/i]
for (const file of files) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  for (const pattern of forbidden) if (pattern.test(content)) throw new Error(`${file} matched forbidden pattern ${pattern}`)
}
console.log('Security check passed: no credential assignments or personal paths found.')
