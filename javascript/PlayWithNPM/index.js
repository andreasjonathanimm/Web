import _ from 'lodash';

const myArray = [1, 2, 3, 4];
/* let sum = 0;

for (let i = 0; i < myArray.length; i++) {
    sum += myArray[i];
}; */

/* let sum = myArray.reduce((prev, curr) => {
    return prev + curr;
}) */

const sum = _.sum(myArray);

console.log(sum);

