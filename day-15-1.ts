import fs from 'fs';
import { stringify } from 'querystring';


function findLowestDistanceNode(visited: string[], distance:{[key: string]: number}): [number, number] {
  let lowestDistanceNode: string = ''; 
  Object.keys(distance).map((key) => {
    if(!visited.includes(key)) {
      lowestDistanceNode = distance[key] < (distance[lowestDistanceNode] || Infinity) ? key : lowestDistanceNode;
    }
  });

  return (lowestDistanceNode.split(',').map(value => parseInt(value)) as [number, number]);
};

function day15_1() {
  const data = fs.readFileSync('./inputs/day-15.txt', 'utf8');
  const NodeMap: number[][] = data.split(/(?:\r\n|\r|\n)/g).map(line => line.split('').map(value => parseInt(value)));
  const visited: string[] = [];
  const distance: {[key: string]: number} = {};
  distance['0,0'] = 0;
  
  // track distances from the start node using a hash object
  let pos = [0,0];
  let currentNodeKey = '0,0';

  do {
    const coordinates:[number, number][] = [[pos[0] + 1, pos[1]], [pos[0], pos[1] + 1], [pos[0] - 1, pos[1]], [pos[0], pos[1] - 1]];

    coordinates.map((coord) => {
      const value = NodeMap[coord[1]]?.[coord[0]];
      if(value) {
        const key = coord.join(',');
        const newDistance = distance[currentNodeKey] + value;
        distance[key] = newDistance < (distance[key] || Infinity) ? newDistance : distance[key];
      }
    });
    
    visited.push(currentNodeKey);
    pos = findLowestDistanceNode(visited, distance);
    currentNodeKey = pos.join(',');
  } while(currentNodeKey !==`${NodeMap.length - 1},${NodeMap.length - 1}`)
    
  
  return distance[currentNodeKey];
}


process.stdout.write(`${day15_1()}`);
