const fs = require('fs');

const spices = fs.readFileSync('spices.txt', 'utf8').split('\n');

function pick(array) {
    return array[Math.floor(Math.random()*array.length)];
}

module.exports = function () {
    return 'Farmer ' + pick(spices);
};