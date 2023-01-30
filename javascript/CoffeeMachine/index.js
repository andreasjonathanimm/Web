import {coffeeStock as stock, isCoffeeMachineReady} from "./state.js";

console.log("Menyalakan mesin kopi");
console.log("Menggiling biji kopi");
console.log("Memanaskan air");
console.log("Mencampurkan air dan kopi");
console.log("Menuangkan kopi ke dalam gelas");
console.log("Menuangkan susu ke dalam gelas");
console.log("Kopi Anda telah siap");

/* const makeCoffee = (type, miligrams) => {
    if (stock[type] >= miligrams) {
        console.log("Kopi berhasil dibuat!");
    } else {
        console.log("Biji kopi habis!");
    }
} */

const displayStock = stock => {
    for (const type in stock) {
        console.log(type);
    }
}

/* const checkStock = () => {
    return new Promise((resolve, reject) => {
        if (stock.coffeeBeans >= 16 && stock.water >= 250) {
            resolve("Stok cukup. Bisa membuat kopi");
        } else {
            reject("Stok tidak cukup");
        }
    });
};

const handleSuccess = resolvedValue => {
    console.log(resolvedValue);
}

const handleFailure = rejectionReason => {
    console.log(rejectionReason);
}

// checkStock().then(handleSuccess, handleFailure);
checkStock().then(handleSuccess).catch(handleFailure);

console.log(isCoffeeMachineReady);
makeCoffee("robusta", 80);
displayStock(stock); */

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

const state = {
    stock: {
        coffeeBeans: 250,
        water: 1000
    },
    isCoffeeMachineBusy: false,
}

const checkStock = () => {
    return new Promise((resolve, reject) => {
        state.isCoffeeMachineBusy = true;
        setTimeout(() => {
            if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
                resolve("Stok cukup. Bisa membuat kopi");
            } else {
                reject("Stok tidak cukup!");
            }
        }, 1500);
    });
};

const checkAvailability = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!state.isCoffeeMachineBusy) {
                resolve("Mesin kopi siap digunakan.");
            } else {
                reject("Maaf, mesin sedang sibuk.");
            }
        }, 1000);
    });
};

const brewCoffee = () => {
    console.log("Membuatkan kopi Anda...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Kopi sudah siap!");
        }, 2000);
    });
};

const boilWater = () => {
    return new Promise((resolve, reject) => {
        console.log("Memanaskan air...");
        setTimeout(() => {
            resolve("Air panas sudah siap!");
        }, 2000);
    });
};

const grindCoffeeBeans = () => {
    return new Promise((resolve, reject) => {
        console.log("Menggiling biji kopi...");
        setTimeout(() => {
            resolve("Kopi sudah siap!");
        }, 1000);
    });
};

/* function makeEspresso() {
    checkAvailability().then((value) => {
        console.log(value);
        return checkStock();
    }).then((value) => {
        console.log(value);
        const promises = [boilWater(), grindCoffeeBeans()];
        return Promise.all(promises);
    }).then((value) => {
        console.log(value);
        return brewCoffee();
    }).then((value) => {
        console.log(value);
    }).catch((rejectedReason) => {
        console.log(rejectedReason);
        state.isCoffeeMachineBusy = false;
    });
}

makeEspresso(); */

async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        await Promise.all([boilWater(), grindCoffeeBeans()]);
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
};

makeEspresso();

const getCoffee = () => {
    return new Promise((resolve, reject) => {
        const seeds = 9;
        setTimeout(() => {
            if (seeds >= 10) {
                resolve("Kopi didapatkan!");
            } else {
                reject("Biji kopi habis!");
            }
        }, 1000);
    });
};

async function makeCoffee2() {
    try {
    const coffee = await getCoffee();
    console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}

makeCoffee2();