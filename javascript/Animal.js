class Animal {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Halo");
    }

    info() {
        this.greet();
        console.log(`Nama saya adalah ${this.name}`);
    }
}

const animal = new Animal("John", 14);
animal.info();

