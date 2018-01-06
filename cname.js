var fs = require('fs')

try {
  fs.accessSync('./build', fs.F_OK);
  fs.writeFileSync('./build/CNAME', 'https://ribeiroevandro.github.io/carmo2016')
  console.log('SUCCESS: CNAME file was created!')
} catch (e) {
  console.log('ERROR: Missing build folder!')
}
