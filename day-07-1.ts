import fs from 'fs';

function day7_1() {
  const data = fs.readFileSync('./inputs/day-07.txt', 'utf8');

  const pos = data.split(',').map(v => parseInt(v)).sort((a, b) => a - b);
  const mediane = data.length % 2 === 0
    ? pos[(pos.length / 2) - 1]
    : (pos[Math.floor((pos.length / 2) - 1)] + pos[Math.ceil((pos.length / 2) - 1)]) / 2

  return pos.reduce((p, v) => {
    return p + Math.abs(v - mediane)
  }, pos[0]);

}


process.stdout.write(`${day7_1()}`);
