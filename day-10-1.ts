import fs from 'fs';

const openingChars = ['(', '[', '<', '{'];
const closingChars = [')', ']', '>', '}'];

function getScore(char: string):number {
  switch(char) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}': 
      return 1197;
    default:
      return 25137;
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
          console.log(`Found ${char} instead of ${expected}`)
          return getScore(char);
        }
      }
    }
  }).filter(v => !!v);

  return (result as number[]).reduce((p,v) => p + v, 0);
}


process.stdout.write(`${day8_1()}`);
