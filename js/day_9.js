{
  const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

  function parseInput(input) {
    return input.split("\n")
      .map(line => {
        return line.split("")
          .filter(char => char !== "")
          .map(Number);
      });
  }

  function getLowNumbers(matrix) {
    const lowNumbers = [];

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const curRow = matrix[rowIndex];
      for (let columnIndex = 0; columnIndex < curRow.length; columnIndex++) {
        const curValue = curRow[columnIndex];

        const isLow = [
          [ rowIndex - 1, columnIndex ],
          [ rowIndex, columnIndex - 1 ],
          [ rowIndex, columnIndex + 1 ],
          [ rowIndex + 1, columnIndex ],
        ]
        .reduce((acc, cur) => {
          if (matrix[cur[0]] == null
            || matrix[cur[0]][cur[1]] == null
          ) {
            return acc;
          }

          const toCompare = matrix[cur[0]][cur[1]];
          return acc && (toCompare > curValue);
        }, true);

        if (isLow) {
          lowNumbers.push([ [rowIndex, columnIndex], curValue ]);
        }
      }
    }

    return lowNumbers;
  }

  {
    function day9_1(input) {
      const matrix = parseInput(input);

      const lowNumbers = getLowNumbers(matrix);

      return lowNumbers.reduce((acc, [, cur]) => acc + cur + 1, 0);
    }

    const result = day9_1(testInput);
    const expected = 15;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day9_2(input) {
      const matrix = parseInput(input);

      const walked = [];

      function getBasinSize(matrix, startPos) {
        if (!walked.includes(startPos.join(","))) {
          walked.push(startPos.join(","));
        }

        function dunno(matrix, curPos) {
          const lookUp = {
            'left': (curPos) => [ curPos[0], curPos[1] - 1 ],
            'down': (curPos) => [ curPos[0] + 1, curPos[1] ],
            'right': (curPos) => [ curPos[0], curPos[1] + 1 ],
            'up': (curPos) => [ curPos[0] - 1, curPos[1] ],
          };

          const sum = [ 'left', 'down', 'right', 'up' ]
            .filter(direction => {
              const testPos = lookUp[direction](curPos);
              const posInString = testPos.join(",");

              if (matrix[testPos[0]] == null
                || matrix[testPos[0]][testPos[1]] == null
                || matrix[testPos[0]][testPos[1]] === 9
                || walked.includes(testPos.join(","))
              ) {
                return false;
              }

              walked.push(posInString);
              return true;
            })
            .reduce((acc, direction) => {
              const newPos = lookUp[direction](curPos);

              return acc + dunno(matrix, newPos);
            }, 0);

          return sum + 1;
        }

        const result = dunno(matrix, startPos);

        return result;
      }

      const basins = [];

      for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const curRow = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < curRow.length; columnIndex++) {
          const curValue = curRow[columnIndex];
          const curPos = [ rowIndex, columnIndex ];

          if (curValue !== 9 && !walked.includes(curPos.join(","))) {
            basins.push(
              getBasinSize(matrix, curPos, curValue)
            );
          }
        }
      }

      const sortedBasins = basins
        .sort((a, b) => b - a);

      return sortedBasins
        .slice(0, 3)
        .reduce((acc, cur) => acc * cur, 1);
    }

    const result = day9_2(testInput);
    const expected = 1134;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
