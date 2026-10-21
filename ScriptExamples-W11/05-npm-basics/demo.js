// demo.js: a plain Node.js script. Run it with:  npm start
// (npm start runs the "start" script from package.json, which runs "node demo.js")
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

console.log('Project      :', pkg.name, pkg.version)
console.log('scripts      :', Object.keys(pkg.scripts).join(', '))
console.log('dependencies :', JSON.stringify(pkg.dependencies), ' <- needed when the program RUNS')
console.log('devDependencies:', JSON.stringify(pkg.devDependencies), ' <- only needed while DEVELOPING')
