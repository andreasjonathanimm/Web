'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    // Write your code here
    let o = {};
    
    // Remove all but one variables divisible by k
    for(let i = 0; i < s.length; i++) {
        let r = s[i] % k;
        o[r] = o[r] ? o[r] + 1: 1;
    }
    
    let c = 0;
    for(let key in o) {
        let f = parseInt(key);
        if(f == 0) {
            if(o[f] >= 1) {c++;}
        } else {
            let f2 = k - f;
            if (f > f2 && o[f2]) {continue;}
            else if (f == f2) {
                if (o[f] >= 1) {c++;}
            } else {
                let a = o[f] || 0;
                let b = o[f2] || 0;
                c += Math.max(a, b);
            }
        }
    }
    return c;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
