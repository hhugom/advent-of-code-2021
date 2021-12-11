import fs from 'fs';

function getAdjacentCoordinates(x:number, y: number) {
  return [[x, y + 1], [x + 1, y + 1],[x + 1, y], [x + 1, y - 1], [x, y - 1], [x - 1, y - 1], [x - 1, y], [x - 1, y + 1]];
};

// function hasFlashingOctopus(octopuses: number[][]) {
//   return !!octopuses.find(line => line.find(octopuses => octopuses > 9))
// }

const visualizeOctopuses = (bassin: number[][]) => {
  return bassin.map(line => line.reduce((prev, value) =>  value === 0 ? prev +=`\x1b[1;31m${value}\x1b[0m` : prev += `${value}`, '')).join('\n');
}

function day11_1() {
  const data = fs.readFileSync('./inputs/day-11.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g).map(line => line.split('').map(number => parseInt(number)));
  let count = 0;
  
  for(let step = 0; step < 100; step++) {
    let hasFlashingOctopus = false;

    formatedData.map((line, y) => line.map((octopus, x) => {
      formatedData[y][x]++
      if(formatedData[y][x] > 9) {
        hasFlashingOctopus = true;
      }
    }));
   
    while (hasFlashingOctopus) {
      hasFlashingOctopus = false;

      formatedData.map((line, y) => line.map((octopus, x) => {
        if(formatedData[y][x] > 9) {
          count++;
          getAdjacentCoordinates(x, y).map((coordinates => {
            let element = formatedData[coordinates[1]]?.[coordinates[0]]
            if(element) {
              element++;
              formatedData[coordinates[1]][coordinates[0]] = element;
              if(element > 9) {
                hasFlashingOctopus = true;
              }
            }
          }));
          formatedData[y][x] = 0;
        }
      }));
    }
  }
 
  return count;
}


process.stdout.write(`${day11_1()}`);
