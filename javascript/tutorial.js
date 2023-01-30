console.log(9%2);
const name = "Kate";
console.log(`Halo ${name}`);
name2 = "John";
console.log(`Halo ${name2}`);
x = 21
if (x>30) console.log(x)
else if (x === 21) console.log(x*x)
else console.log(x/2)

switch (x) {
    case "21":
        console.log(x)
        break
    default:
        console.log(21)
        break
}

while (x != 0) {
    console.log(x)
    x -= 7
}

for (i = 0; i < 10; i++) {
    console.log(i)
    i += 3
}

const fruits = ["apel", "pisang", "jeruk"]
for (i = 0; i < fruits.length; i++) {
    console.log(fruits[i])
}

const item = [{name : "Shuriken", price:30}, {name : "Pedang", price:120}]
console.log(item[1].name)

const introduce = function() {
    console.log("Halo");
}
introduce();

const number = () => {
    return 21
}
console.log(number())

const user = {
    name: "Ken",
    greet: () => {
        console.log("Halo")
    }
}

user.greet();

// module.exports = {user, introduce};
// const {user, introduce} = require("./tutorial.js");
// export {user, introduce}; (module -> "type"="module")
// import {user, introduce} from "./tutorial.js";

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

let json = '{"age": 100 }';

try {
    let user = JSON.parse(json);
    if (!user.name) {
        throw new ValidationError("'name' is required.");
    }
    if (!user.age) {
        throw new ValidationError("'age' is required.");
    }
    errorCode;
    console.log(user.name);
    console.log(user.age);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON Error: ${error.message}`);
    } else if(error instanceof ValidationError) {
        console.log(`Invalid Data: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }
} finally {
    console.log("Tetap eksekusi!");
}

console.log("Selamat Datang!");
setTimeout(() => {
    console.log("Terima kasih sudah mampir, silahkan datang kembali!");
}, 3000);
console.log("Apa yang bisa dibantu?");

const orderCoffee = callback => {
    let coffee = null;
    console.log("Sedang membuat kopi, silahkan tunggu...");
    setTimeout(() => {
        coffee = "Kopi sudah jadi!";
        callback(coffee);
    }, 3000);
}

/* const coffee = orderCoffee();
console.log(coffee);
*/

orderCoffee(coffee => {
    console.log(coffee);
})

/* function makeACake(...rawIngredients) {
    collectIngredients(rawIngredients).then(makeTheDough).then(pourDough).then(bakeACake).then(console.log);
} */

const executorFunction = (resolve, reject) => {
    const isCoffeeMachineReady = true;
    if (isCoffeeMachineReady) {
        resolve("Kopi berhasil dibuat");
    } else {
        reject("Mesin kopi tidak bisa digunakan");
    }
};

const makeCoffee = () => {
    return new Promise(executorFunction);
}

const coffeePromise = makeCoffee();
console.log(coffeePromise);