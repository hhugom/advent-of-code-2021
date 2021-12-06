import fs from 'fs';

function day6_1() {
  const data = fs.readFileSync('./inputs/day-06.txt', 'utf8');

  const fishs = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]

  data.split(',').map(value => fishs[parseInt(value)]++);

  for (let i = 0; i < 256; i++) {
    let iterationFishs = [...fishs];
    for (let index = 8; index >= 0; index--) {
      const value = iterationFishs[index];

      if (index === 0) {
        fishs[8] = value;
        fishs[6] += value;
        continue;
      }

      fishs[index - 1] = value;
    }
  }

  return fishs.reduce((p, v) => p + v, 0);
}


process.stdout.write(`${day6_1()}`);
