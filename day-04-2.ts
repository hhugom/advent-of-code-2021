import fs from 'fs';

function day4_2() {
  const data = fs.readFileSync('./inputs/day-04.txt', 'utf8');
  const array = data.replace(/(?:\r\n|\r|\n)/g, '|').split('||');
  const numbers = array.shift()?.split(',');
  const boards: string[][][] = array.map(matrix => matrix.split('|').map(line => line.split(/\s+/).filter(value => !!value)));
  const length = boards[0][0].length;
  const numbersToCheck: string[] = [];

  if (!numbers) {
    throw new Error();
  }

  const checkColumn = ((winningNumbers: string[], board: string[][], index: number) => {
    let rightNumbersColumn = 0;
    board.map(line => {
      if (winningNumbers.includes(line[index])) {
        rightNumbersColumn++;
      }
    })
    return rightNumbersColumn === length;
  });

  const checkLine = ((winningNumbers: string[], line: string[]) => {
    let rightNumbersLine = 0;
    line.map(value => {
      if (winningNumbers.includes(value)) {
        rightNumbersLine++;
      }
    })
    return rightNumbersLine === length;
  });

  const isBoardWinner = (winningNumbers: string[], board: string[][]): boolean => {
    let winningBoard = false;
    board.map((line, index) => {
      if (checkLine(winningNumbers, line) || checkColumn(winningNumbers, board, index)) {
        winningBoard = true;
      }
    });

    return winningBoard;
  };

  const getResult = (winningNumbers: string[], board: string[][]) => {
    let sum = 0;
    board.map(line => line.map(value => {
      if (!winningNumbers.includes(value)) {
        sum += parseInt(value);
      }
    }))
    return sum * parseInt(winningNumbers.pop() || '0');
  }

  let result: number = -1;
  let winningBoards: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    numbersToCheck.push(numbers[i]);
    boards.map((board, index) => {
      if (isBoardWinner(numbersToCheck, board) && !winningBoards.includes(index)) {
        winningBoards.push(index);
      }
    });

    if (winningBoards.length === boards.length) {
      result = getResult(numbersToCheck, boards[winningBoards[winningBoards.length - 1]]);
      break;
    }
  }

  return result;
}

process.stdout.write(`${day4_2()}`)