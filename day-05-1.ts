import fs from 'fs';

type Point = {
  intersect?: boolean;
}

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function getCoordinates({ x1, x2, y1, y2 }: Line): string[] {
  let coordinates: string[] = [];


  if (x1 !== x2 && y1 !== y2) {
    return coordinates;
  }

  if (x1 === x2) {
    const [start, end] = y1 > y2 ? [y2, y1] : [y1, y2];
    for (let i = start; i <= end; i++) {
      coordinates.push(`${x1}-${i}`)
    }
  } else {
    const [start, end] = x1 > x2 ? [x2, x1] : [x1, x2];
    for (let i = start; i <= end; i++) {
      coordinates.push(`${i}-${y1}`)
    }
  }

  return coordinates;
}

function day5_1() {
  const data = fs.readFileSync('./inputs/day-05.txt', 'utf8');
  const array = data.split(/(?:\r\n|\r|\n)/g);
  const pointsInfo: Map<string, Point> = new Map();
  let intersectionCount = 0;
  const formatedData = array.map(value => {
    const pairs = value.split(' -> ');
    const [x1, y1] = pairs[0].split(',');
    const [x2, y2] = pairs[1].split(',');
    return { x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2) }
  });

  formatedData.forEach((line) => {
    getCoordinates(line).map(point => {
      const pointInfo = pointsInfo.get(point);
      if (!pointInfo) {
        return pointsInfo.set(point, { intersect: false });
      }

      if (!pointInfo.intersect) {
        intersectionCount++;
        pointsInfo.set(point, { intersect: true });
      }
    })
  });

  return intersectionCount;
}

process.stdout.write(`${day5_1()}`);