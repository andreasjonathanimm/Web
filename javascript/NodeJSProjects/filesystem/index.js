const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.resolve(__dirname, 'notes.txt'), 'UTF-8');
console.log(text);