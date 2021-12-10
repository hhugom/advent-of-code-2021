import fs from 'fs';

const openingChars = ['(', '[', '<', '{'];
const closingChars = [')', ']', '>', '}'];

function getScore(char: string):number {
  switch(char) {
    case ')':
      return 1;
    case ']':
      return 2;
    case '}': 
      return 3;
    default:
      return 4;
  }
}

function day8_1() {
  const data = fs.readFileSync('./inputs/day-10.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g);

  const result = formatedData.map(line => {
    let expectedClosing:string[] = [];
    const chars = line.split('');

    for(let i =0; i < chars.length; i++) {
      const char = line[i];
      if(openingChars.includes(char)) {
        expectedClosing.push(closingChars[openingChars.indexOf(char)]);
      } else {
        const expected = expectedClosing.pop();
        if(expected !== char) {
          return undefined;
        }
      }
    }
    let totalScore = 0;

    for(let y = expectedClosing.length - 1; y >= 0; y-- ){
      totalScore *= 5;
      totalScore += getScore(expectedClosing[y]);
    };

    return totalScore;
  }).filter(v => v !== undefined);

  return (result as number[]).sort((a,b) => a - b)[Math.floor(result.length / 2)];
}


process.stdout.write(`${day8_1()}`);
