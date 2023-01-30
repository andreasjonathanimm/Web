const numbers = [1,2,3,5,7]
numbers.push(4)
console.log(numbers)

numbers.forEach((number) => {
    console.log(number)
})

const foundNumber = numbers.find((number) => {
    return number > 3
})

console.log(foundNumber)

const filteredNumbers = numbers.filter((number) => {
    return number > 3
})

console.log(filteredNumbers)

const doubledNumbers = numbers.map((number) => {
    return number*2
})
console.log(doubledNumbers)