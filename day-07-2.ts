import fs from 'fs';

function day7_2() {
  const data = fs.readFileSync('./inputs/day-07.txt', 'utf8');

  const pos = data.split(',').map(v => parseInt(v)).sort((a, b) => a - b);
  const avg = Math.round(pos.reduce((p, v) => p + v, pos[0]) / pos.length) - 1;

  const getFuelCount = (crabPos: number) => {
    const steps = Math.abs(crabPos - avg);
    let fuel = 0;
    for (let i = 1; i <= steps; i++) fuel += i;
    return fuel;
  }

  return pos.reduce((p, v) => p + getFuelCount(v), pos[0]);
}


process.stdout.write(`${day7_2()}`);
