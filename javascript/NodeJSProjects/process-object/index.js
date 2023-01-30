const initialMemoryUsage = process.memoryUsage().heapUsed;
const yourName = process.argv[2];
const environment = process.env.NODE_ENV;

for(let i = 0; i < 10000; i++) {
    // This process increases the memory usage
}

const currentMemoryUsage = process.memoryUsage().heapUsed;

console.log(`Hai, ${yourName}`);
console.log(`Mode Environment: ${environment}`)
console.log(`Memory Usage from ${initialMemoryUsage} to ${currentMemoryUsage}`);