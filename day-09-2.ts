import fs from 'fs';

type Coordinate = {
  x: number;
  y: number;
}

type BassinValue = {
  value: number;
  inBassin: boolean;
}


const isLowestAdjacent = (value: number, x: number, y: number, formatedData: BassinValue[][]) => {
  if (formatedData[y]?.[x + 1] !== undefined && value >= formatedData[y]?.[x + 1].value) {
    return false;
  }
  if (formatedData[y]?.[x - 1] !== undefined && value >= formatedData[y]?.[x - 1].value) {
    return false;
  }
  if (formatedData[y + 1]?.[x] !== undefined && value >= formatedData[y + 1]?.[x].value) {
    return false;
  }
  if (formatedData[y - 1]?.[x] !== undefined && value >= formatedData[y - 1]?.[x].value) {
    return false;
  }
  return true;
}


const findBassin = (x: number, y: number, bassin: BassinValue[][]) => {
  let modifiedBassin = [...bassin];
  bassin[y][x].inBassin = true;
  const value = bassin[y][x].value;
  const rightValue = bassin[y]?.[x + 1];
  const leftValue = bassin[y]?.[x - 1];
  const downValue = bassin[y + 1]?.[x];
  const upValue = bassin[y - 1]?.[x];

  if (rightValue !== undefined && rightValue.value < 9 && rightValue.value > value) {
    if(!rightValue.inBassin) {
      rightValue.inBassin = true;
      modifiedBassin = findBassin(x + 1, y, modifiedBassin);
    }
  }
  if (leftValue !== undefined && leftValue.value < 9 && leftValue.value > value) {
    if(!leftValue.inBassin) {
      leftValue.inBassin = true;
      modifiedBassin = findBassin(x - 1, y, modifiedBassin);
    }
  }
  if (downValue !== undefined && downValue.value < 9 && downValue.value > value) {
    if(!downValue.inBassin) {
      downValue.inBassin = true;
      modifiedBassin = findBassin(x, y + 1, modifiedBassin);
    }
  }
  if (upValue !== undefined && upValue.value < 9 && upValue.value > value) {
    if(!upValue.inBassin) {
      upValue.inBassin = true;
      modifiedBassin = findBassin(x, y - 1, modifiedBassin);
    }
  }

  return modifiedBassin;
}

const visualizeBassin = (bassin: BassinValue[][]) => {
  return bassin.map(line => line.reduce((prev, value) =>  value.inBassin ? prev +=`\x1b[36m${value.value}\x1b[0m` : prev += `${value.value}`, '')).join('\n');
}

const bassinSize = (bassin: BassinValue[][]) => {
  let size = 0;
  bassin.map(line => line.map(val => {
    if (val.inBassin) {
      size++;
    }
  }));

  return size;
}

function day9_2() {
  const data = fs.readFileSync('./inputs/day-09.txt', 'utf8');
  const formatedData: BassinValue[][] = data.split(/(?:\r\n|\r|\n)/g).map(line => line.split('').map(coordinate => ({ value: parseInt(coordinate), inBassin: false })));
  const lowestHeights: Coordinate[] = [];
  const bassinsSizes: number[] = [];

  formatedData.map((line, y) => {
    line.map((coordinate, x) => {
      if (isLowestAdjacent(coordinate.value, x, y, formatedData)) {
        lowestHeights.push({x, y});
      }
    });
  });

  
  const bassins = lowestHeights.map(({x,y})=> {
    return findBassin(x, y, JSON.parse(JSON.stringify(formatedData)));
  });

  bassins.map((bassin) => {
    bassinsSizes.push(bassinSize(bassin));
  });

  const sortedSizes = bassinsSizes.sort((a, b) => b - a);
  
  return sortedSizes[0] * sortedSizes[1] * sortedSizes[2];
}


process.stdout.write(`${day9_2()}`);
