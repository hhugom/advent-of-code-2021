import fs from 'fs';

type Mapping = {
  [key: string]: string;
}

function day14_1() {
  const initialInput = 'SCVHKHVSHPVCNBKBPVHV';
  let result = initialInput;
  const data = fs.readFileSync('./inputs/day-14.txt', 'utf8');
  const mapping: Mapping = {}
  data.split(/(?:\r\n|\r|\n)/g).map((pair) => {
    const [key, value] = pair.split(' -> ');
    mapping[key] = value;
  });

  for(let step = 1; step <= 10; step++) {
    let previousletter = '';
    let newResult = '';
    
    result.split('').map(letter => {
      if(previousletter) {
        const pair = previousletter + letter;
      
        if(!newResult) {
          newResult = previousletter;
        }
        newResult += mapping[pair] + letter
        previousletter = letter;
      } else {
        previousletter = letter;
      }
    });
    
    result = newResult;
  }

  const individualLetters = [...new Set(result)];
  const letterCount = individualLetters.map(letter => {
    const strCopy = result;
    return strCopy.split(letter).length - 1;
  }).sort((a,b) => a - b);
  
  return letterCount[letterCount.length - 1] - letterCount[0];
}


process.stdout.write(`${day14_1()}`);
