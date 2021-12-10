import fs from 'fs';

function day9_1() {
  const data = fs.readFileSync('./inputs/day-09.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g).map(line => line.split('').map(coordinate => parseInt(coordinate)));
  const lowestHeights: number[] = [];
  const isLowestAdjacent = (value: number, x: number, y: number) => {
    if (formatedData[y]?.[x + 1] !== undefined && value >= formatedData[y]?.[x + 1]) {
      return false;
    }
    if (formatedData[y]?.[x - 1] !== undefined && value >= formatedData[y]?.[x - 1]) {
      return false;
    }
    if (formatedData[y + 1]?.[x] !== undefined && value >= formatedData[y + 1]?.[x]) {
      return false;
    }
    if (formatedData[y - 1]?.[x] !== undefined && value >= formatedData[y - 1]?.[x]) {
      return false;
    }
    return true;
  }

  formatedData.map((line, y) => {
    line.map((coordinate, x) => {
      if (isLowestAdjacent(coordinate, x, y)) {
        lowestHeights.push(coordinate);
      }
    });
  });

  return lowestHeights.reduce((p, v) => p + v + 1, 0);
}


process.stdout.write(`${day9_1()}`);
