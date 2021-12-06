import fs from 'fs';



function day6_1() {
  const data = fs.readFileSync('./inputs/day-06.txt', 'utf8');
  let array = data.split(',').map(value => parseInt(value));

  for (let i = 0; i < 80; i++) {
    let fishToAdd: number[] = [];
    array = array.map((value) => {
      if (value === 0) {
        fishToAdd.push(8);
        return 6;
      }
      return value - 1
    });
    array = array.concat(fishToAdd);
  }

  return array.length;
}


process.stdout.write(`${day6_1()}`);
