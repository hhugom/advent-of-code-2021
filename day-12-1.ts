import fs from 'fs';

type TreeNode = {
  id: string
  leafs: string[];
  small: boolean;
}

type TreeNodeMap = {
  [key: string]: TreeNode;
}

const pathList: string[] = []

function findAllPaths(currentNode: TreeNode, currentPath: string[], map: TreeNodeMap) {
  const possibleNextNodes = currentNode.leafs.map(id => map[id]).filter(node => !(node.small && currentPath.includes(node.id)));
  possibleNextNodes.map(node => {
    const newPath = [...currentPath, node.id];
    if(node.id === 'end') {
      pathList.push(currentPath.join(','));
      return;
    }
    findAllPaths(node, newPath, map);
  })
}

function day12_1() {
  const data = fs.readFileSync('./inputs/day-12.txt', 'utf8');
  let formatedData:TreeNodeMap = {}
  data.split(/(?:\r\n|\r|\n)/g).map(value => {
    const inputs = value.split('-');
    if(formatedData[inputs[0]]) {
      formatedData[inputs[0]].leafs.push(inputs[1]);
    } else {
      formatedData[inputs[0]] = { leafs: [inputs[1]], small: inputs[0].toLowerCase() === inputs[0], id:inputs[0]};
    }

    if(formatedData[inputs[1]]){
      formatedData[inputs[1]].leafs.push(inputs[0]);
    } else {
      formatedData[inputs[1]] = {leafs: [inputs[0]], small: inputs[1].toLowerCase() === inputs[1], id: inputs[1]};
    }
  });
  
  findAllPaths(formatedData['start'], ['start'], formatedData);

  return pathList.length;
}


process.stdout.write(`${day12_1()}`);
