import fs from 'fs';
import { stringify } from 'querystring';


function findLowestDistanceNode(visited: {[key: string]: boolean}, distance:{[key: string]: number}): [number, number] {
  let lowestDistanceNode: string = ''; 
  Object.keys(distance).map((key) => {
    if(!visited[key]) {
      lowestDistanceNode = distance[key] < (distance[lowestDistanceNode] || Infinity) ? key : lowestDistanceNode;
    }
  });

  return (lowestDistanceNode.split(',').map(value => parseInt(value)) as [number, number]);
};


const visualizeMap = (bassin: number[][]) => {
  return bassin.map(line => line.reduce((prev, value) => prev += `${value}`, '')).join('\n');
}

function day15_1() {
  const data = fs.readFileSync('./inputs/day-15.txt', 'utf8');
  const NodeMap: number[][] = data.split(/(?:\r\n|\r|\n)/g).map(line => line.split('').map(value => parseInt(value)));
  const visited: {[key: string]: boolean} = {};
  const distance: {[key: string]: number} = {};
  distance['0,0'] = 0;
  
  let extendMap: number[][] = Array<number[]>(NodeMap.length * 5).fill(Array<number>(NodeMap.length * 5));
  
  function increaseLineValue(line: number[]) {
    return line.map(value => {
      if(value === 9) return 1;
      return value + 1;
    })
  };
  
  NodeMap.map((line, index) => {
    let currentLine = line;
    extendMap[index] = line;
    for(let i = 1; i <= 4; i++) {
      currentLine = increaseLineValue(currentLine);
      extendMap[index + (NodeMap.length * i)] = currentLine;
    }
  });

  extendMap = extendMap.map(line => {
    let currentLine = line
    let newLine = line;
    for(let i = 1; i <= 4; i++) {
      currentLine = increaseLineValue(currentLine);
      newLine = [...newLine, ...currentLine];
    }
    return newLine;
  })

  // track distances from the start node using a hash object
  let pos = [0,0];
  let currentNodeKey = '0,0';
  let counter = 0;

  do {
    const coordinates:[number, number][] = [[pos[0] + 1, pos[1]], [pos[0], pos[1] + 1], [pos[0] - 1, pos[1]], [pos[0], pos[1] - 1]];

    coordinates.map((coord) => {
      const value = extendMap[coord[1]]?.[coord[0]];
      if(value) {
        const key = coord.join(',');
        const newDistance = distance[currentNodeKey] + value;
        distance[key] = newDistance < (distance[key] || Infinity) ? newDistance : distance[key];
      }
    });
    
    visited[currentNodeKey] = true;
    pos = findLowestDistanceNode(visited, distance);
    currentNodeKey = pos.join(',');
    console.log(++counter);
  } while(currentNodeKey !==`${extendMap.length - 1},${extendMap.length - 1}`)
    
  
  return distance[currentNodeKey];
}


process.stdout.write(`${day15_1()}`);