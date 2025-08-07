// wrapper.js
const { exec } = require('child_process');
exec('npm start', { cwd: process.cwd(), shell: true, windowsHide: true }, (e, stdout, stderr) => {
  if (e) console.error(e);
  console.log(stdout);
  console.error(stderr);
});
