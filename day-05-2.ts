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
  const [startY, endY, directionY] = y1 > y2 ? [y2, y1, 'decrease'] : [y1, y2, 'increase'];
  const [startX, endX, directionX] = x1 > x2 ? [x2, x1, 'decrease'] : [x1, x2, 'increase'];

  if (x1 !== x2 && y1 !== y2) {
    const diff = endX - startX;

    for (let i = 0; i <= diff; i++) {
      const x = directionX === 'increase' ? x1 + i : x1 - i;
      const y = directionY === 'increase' ? y1 + i : y1 - i;
      coordinates.push(`${x}-${y}`)
    }
  } else if (x1 === x2) {
    for (let i = startY; i <= endY; i++) {
      coordinates.push(`${x1}-${i}`)
    }
  } else {
    for (let i = startX; i <= endX; i++) {
      coordinates.push(`${i}-${y1}`)
    }
  }

  return coordinates;
}

function day5_2() {
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


process.stdout.write(`${day5_2()}`);
