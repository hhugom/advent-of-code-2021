import fs from 'fs';

const foldHorizontaly = (foldCoordinate: number, coordinates: string[], split: 'horizontal' | 'vertical') => {
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

function day12_1() {
  const data = fs.readFileSync('./inputs/day-13.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g);
  let folded = foldHorizontaly(655, formatedData, 'vertical');
  return folded.length;
}


process.stdout.write(`${day12_1()}`);
