import fs from 'fs';

const findFromOne = (mapping: string[], input: string) => {
  let newMapping = [...mapping];
  let splittedInput = input.split('');
  const values = `${splittedInput[0]},${splittedInput[1]}`
  newMapping[2] = values
  newMapping[5] = values
  return newMapping;
}

const findFromSeven = (mapping: string[], input: string) => {
  let newMapping = [...mapping];
  const possibleValues = getAllPossibleValue(mapping);
  let splittedInput = input.split('');
  splittedInput.map((value) => {
    if (!possibleValues.includes(value)) newMapping[0] = value;
  })
  return newMapping;
}

const findFromFour = (mapping: string[], input: string) => {
  let newMapping = [...mapping];
  const possibleValues = getAllPossibleValue(mapping)
  let splittedInput = input.split('');
  let unknownValues: string[] = []
  splittedInput.map((value) => {
    if (!possibleValues.includes(value)) {
      unknownValues.push(value)
    };
  });
  newMapping[1] = unknownValues.join(',');
  newMapping[3] = unknownValues.join(',');
  return newMapping;
}

const findMiddleAndLastFromFiveLength = (mapping: string[], inputs: string[]) => {
  let newMapping = [...mapping];
  const possibleValues = getAllPossibleValue(mapping)
  const firstInput = inputs[0];
  firstInput.split('').map((letter) => {
    if (inputs.reduce((p, input) => input.includes(letter) ? p + 1 : p, 0) === 3) {
      if (!newMapping.includes(letter)) {
        if (!possibleValues.includes(letter)) {
          newMapping[6] = letter;
        } else {
          newMapping = converIncertainValueToCertainValue(newMapping, letter, 3);
        }
      }
    }
  });

  inputs.map(input => {
    if (input.split('').reduce((p, letter) => newMapping.includes(letter) ? p + 1 : p, 0) === 4 && input.includes(newMapping[1])) {
      input.split('').map(letter => {
        if (!newMapping.includes(letter)) {
          newMapping = converIncertainValueToCertainValue(newMapping, letter, 5);
        }
      })
    }
  })

  return newMapping;
}

const converIncertainValueToCertainValue = (mapping: string[], letter: string, index: number): string[] => {
  let newMapping = [...mapping];
  mapping.map((value, mapIndex) => {
    if (index === mapIndex) {
      newMapping[index] = letter;
    } else if (value && value.includes(letter)) {
      newMapping[mapIndex] = value.split(',').find(v => v !== letter) || '';
    }
  });
  return newMapping;
}

const findFromEight = (mapping: string[], input: string) => {
  let newMapping = [...mapping];
  input.split('').map(letter => {
    if (!newMapping.includes(letter)) {
      newMapping[4] = letter;
    }
  })
  return newMapping;
}

const getAllPossibleValue = (mapping: string[]) => {
  let incertainValues: string[] = [];
  const mappingWithoutUndefined = mapping.filter(v => {
    if (!v) {
      return false;
    }
    if (v.length !== 1) {
      v.split(',').map(incVal => {
        if (!incertainValues.includes(v)) {
          incertainValues.push(incVal)
        }
      })
      return false;
    }
    return true;
  });
  return [...incertainValues, ...mappingWithoutUndefined]
}


const decrypt = (completedMapping: string[], input: string) => {
  let count = 0;
  input.split('').reduce((prev, letter) => {
    return count += completedMapping.findIndex(value => value === letter) + 1;
  }, 0);

  switch (count) {
    case 9:
      return 1;
    case 10:
      return 7;
    case 15:
      return 4;
    case 21:
      return 3;
    case 23:
      return 9;
    case 28:
      return 8;
    case 24:
      return 0;
    case 25:
      return 6;
    case 20:
      if (input.split('').includes(completedMapping[1])) {
        return 5;
      }
      return 2;
    default:
      break;
  }
  return count;
}

function day8_1() {
  const data = fs.readFileSync('./inputs/day-08.txt', 'utf8');
  const formatedData = data.split(/(?:\r\n|\r|\n)/g).map(value => value.split('|'));
  let totalCounter = 0;

  formatedData.map(pair => {
    let mapping: string[] = [];
    const digits = pair[0].split(' ');
    mapping = findFromOne(mapping, digits.find(digit => digit.length === 2) || '');
    mapping = findFromSeven(mapping, digits.find(digit => digit.length === 3) || '');
    mapping = findFromFour(mapping, digits.find(digit => digit.length === 4) || '')
    mapping = findMiddleAndLastFromFiveLength(mapping, digits.filter(digit => digit.length === 5));
    mapping = findFromEight(mapping, digits.find(digit => digit.length === 7) || '')
    const decryptedNumber = pair[1].split(' ').flatMap(digits => {
      if (digits) { return decrypt(mapping, digits) };
    });
    totalCounter += parseInt(decryptedNumber.join(''));
  })

  return totalCounter;
}


process.stdout.write(`${day8_1()}`);
