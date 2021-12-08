import fs from 'fs';

const acceptableSizes = [2, 3, 4, 7];

function day8_1() {
  const data = fs.readFileSync('./inputs/day-08.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g).map(value => value.split('|'));
  let counter = 0;

  formatedData.map(pair => pair[1].split(' ').map(digits => {
    if (acceptableSizes.includes(digits.length)) counter++;
  }))

  return counter;
}


process.stdout.write(`${day8_1()}`);
