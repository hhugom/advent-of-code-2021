import fs from 'fs';

type Value = {value: string, count: 0};
type Mapping = {
  [key: string]: Value;
}


const initialParsing = (initialInput: string, mapping: Mapping) => {
  let previousletter = '';
  let initialPair: string = '';
  initialInput.split('').map(letter => {
    if(previousletter) {
      const pair = previousletter + letter;
      
      if(!initialPair) {
        initialPair = pair;
      } else {
        mapping[pair].count++;
      }
      previousletter = letter;
    } else {
      previousletter = letter;
    }
  });

  return initialPair;
}

function day14_2() {
  const initialInput = 'SCVHKHVSHPVCNBKBPVHV';
  const data = fs.readFileSync('./inputs/day-14.txt', 'utf8');
  const mapping: Mapping = {}
  data.split(/(?:\r\n|\r|\n)/g).map((pair) => {
    const [key, value] = pair.split(' -> ');
    mapping[key] = { value:value, count: 0 };
  });

  let initialPair = initialParsing(initialInput, mapping);

  for(let step = 1; step <= 40; step++) {
    const iterationMapping = JSON.parse(JSON.stringify(mapping));
    Object.keys(iterationMapping).map(key => {
      const [first, second] = key.split('');
      const pair1 = first + iterationMapping[key].value;
      const pair2 = iterationMapping[key].value + second;
      mapping[pair1].count += iterationMapping[key].count;
      mapping[pair2].count += iterationMapping[key].count;
      mapping[key].count -= iterationMapping[key].count;
    });
    
    const [first, second] = initialPair.split('');
    mapping[mapping[initialPair].value + second].count++;
    initialPair = first + mapping[initialPair].value
  }

  let result: any = {};
  initialPair.split('').map(letter => {
    if(!result[letter]) {
      result[letter] = 1;
    } else {
      result[letter]++;
    }
  });

  Object.keys(mapping).map(key => {
    const [,letter] = key;
    if(!result[letter]) {
      result[letter] = mapping[key].count;
    } else {
      result[letter] += mapping[key].count;
    }
  });

  const finalResults: any[] = Object.values(result).sort((a: any,b: any) => a - b);
  return finalResults[finalResults.length - 1] - finalResults[0];
}



process.stdout.write(`${day14_2()}`);
