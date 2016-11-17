import readline from 'readline';

console.log("welcome to rich");
console.log("welcome to rich");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log('Thank you for your valuable feedback:', answer);

    rl.close();
});