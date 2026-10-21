// semver-demo.js: shows what the version symbols in package.json really allow.
// Run it with:  npm run semver
import semver from 'semver'

const candidates = ['0.4.5', '0.5.0', '3.4.9', '3.5.0', '3.5.9', '3.12.4', '4.0.0']
const ranges = ['^3.5.0', '~3.5.0', '3.5.0', '^0.4.2']

console.log('Which versions does each range allow?\n')
console.log('range     ', candidates.map(v => v.padEnd(7)).join(' '))
for (const r of ranges) {
  const row = candidates.map(v => (semver.satisfies(v, r) ? 'yes' : '-').padEnd(7)).join(' ')
  console.log(r.padEnd(10), row)
}

console.log('\nHighest version in the list that npm may install for ^3.5.0:', semver.maxSatisfying(candidates, '^3.5.0'))
console.log('Highest version in the list that npm may install for ~3.5.0:', semver.maxSatisfying(candidates, '~3.5.0'))
console.log('\n^0.4.2 allows only 0.4.x, because for version 0 the caret does not move the minor number.')
console.log('npm install may update within the range; the lockfile pins the EXACT version; "npm ci" installs exactly the lockfile.')
