{
  const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
  8  2 23  4 24
21  9 14 16  7
  6 10  3 18  5
  1 12 20 15 19

  3 15  0  2 22
  9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
  2  0 12  3  7`;

  function parseInput(input) {
    const sets = input.split("\n\n");

    const numbers = sets.shift().split(",").map(Number);

    const bingos = sets
      .map((bingoString) => {
        return bingoString.split("\n").map(bingoRow => {
          return bingoRow.split(" ")
            .filter(_ => _ !== "")
            .map(Number);
        });
      });

    return {
      numbers,
      bingos
    };
  }

  function playBingoRound(bingo, scoreCard, newNumber) {
    for (let rowIndex = 0; rowIndex < bingo.length; rowIndex++) {
      for (let colIndex = 0; colIndex < bingo.length; colIndex++) {
        if (newNumber === bingo[rowIndex][colIndex]) {
          scoreCard[rowIndex][colIndex] = true;
          return [ rowIndex, colIndex ];
        }
      }
    }
  }

  function extractMatrixSection(matrix, index, isVertical) {
    if (isVertical) {
      return matrix[index];
    }

    return matrix.map(row => {
      return row[index];
    });
  }

  {
    function day4_1(input, { keepPlaying }) {
      const { numbers, bingos } = parseInput(input);

      const scoreCards = bingos.map(bingo => bingo.map((rows) => rows.map(() => false)));
      const wonBingoIndexes = [];

      let nonWinSequence;
      let winningNumber;

      for (let i = 0; i < numbers.length; i++) {
        const curNumber = numbers[i];
        for (let bingoIndex = 0; bingoIndex < bingos.length; bingoIndex++) {
          if (wonBingoIndexes.includes(bingoIndex)) {
            continue;
          }

          const bingo = bingos[bingoIndex];
          const scoreCard = scoreCards[bingoIndex];

          const winningCoordinate = playBingoRound(bingo, scoreCard, curNumber);

          if (winningCoordinate != null) {
            const isWin = extractMatrixSection(scoreCard, winningCoordinate[0], true)
            .reduce((acc, cur) => acc && cur, true)
              || extractMatrixSection(scoreCard, winningCoordinate[1], false)
                  .reduce((acc, cur) => acc && cur, true);

            if (isWin) {
              wonBingoIndexes.push(bingoIndex);
              winningNumber = curNumber;
              const flatScoreCard = scoreCard.flat();
              nonWinSequence = bingo
                .flat()
                .filter((_number, index) => {
                  return !flatScoreCard[index];
                });
            }
          }
        }

        if (!keepPlaying && winningNumber != null) {
          break;
        }
      }

      return nonWinSequence.reduce((acc, cur) => acc + cur, 0) * winningNumber;
    }

    const result = day4_1(testInput, { keepPlaying: false });
    const expected = 4512;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day4_2(input) {
      return day4_1(input, { keepPlaying: true });
    }

    const result = day4_2(testInput);
    const expected = 1924;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
