import fs from 'fs';

const instructions: [number, 'horizontal' | 'vertical'][] = [
  [655, 'vertical'], 
  [447, 'horizontal'], 
  [327, 'vertical'], 
  [223, 'horizontal'],
  [163, 'vertical'],
  [111, 'horizontal'],
  [81, 'vertical'],
  [55, 'horizontal'],
  [40, 'vertical'],
  [27, 'horizontal'],
  [13, 'horizontal'],
  [6, 'horizontal'],
];

const fold = (foldCoordinate: number, coordinates: string[], split: 'horizontal' | 'vertical') => {
  const newCoordinates = [...coordinates]; 
  coordinates.map((coordinates, index)=> {
    const [x, y] = coordinates.split(',').map(c => parseInt(c));
    if(split === 'horizontal' && y > foldCoordinate) {
      const distance = y - foldCoordinate;
      const newY = y - 2 * distance;
      newCoordinates[index] = `${x},${newY}`; 
    } else if(split === 'vertical' && x > foldCoordinate) {
      const distance = x - foldCoordinate;
      const newX = x - 2 * distance;
      newCoordinates[index] = `${newX},${y}`; 
    }
  });

  return [...new Set(newCoordinates)];
};

const printOrigami = (folded: number[][]) => {
  let maxX = 0;
  let maxY = 0;
  folded.forEach(coordinates => {
    const [x, y] = coordinates;
    if(x > maxX) maxX = x;
    if(y > maxY) maxY = y;
  });

  const visualisation = Array(maxY + 1).fill([]).map(() => Array(maxX + 1).fill('.'));

  folded.forEach(coordinates => {
    const [x, y] = coordinates;
    visualisation[y][x] = '#';
  }); 

  return visualisation.map(line => line.join('')).join('\n');
};

function day12_2() {
  const data = fs.readFileSync('./inputs/day-13.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g);
  let folded = formatedData;

  instructions.forEach((instruction) => {
    const [foldCoordinate, split] = instruction;
    folded = fold(foldCoordinate, folded, split);
  });
  
  return printOrigami(folded.map(value => value.split(',').map(c => parseInt(c))));
}


process.stdout.write(`${day12_2()}`);
