{
  const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

  {
    function day5_1(input, { ignoreDiagonal } = {}) {
      function parseInput(input) {
        return input.split("\n")
          .map(line => {
            return line.split(" -> ")
              .map(pair => pair.split(",").map(Number))
          });
      }

      function vec2sub(a, b) {
        return [ a[0] - b[0], a[1] - b[1] ];
      }

      const coordinateScore = parseInput(input)
        .reduce((acc, cur) => {
          const [ from, to ] = cur;

          const diffVec = vec2sub(to, from);
          const stableIndex = diffVec.indexOf(0);

          if (ignoreDiagonal && stableIndex === -1) {
            return acc;
          }

          const movingIndex = [0, -1].includes(stableIndex) ? 1 : 0;
          const steps = Math.abs(diffVec[movingIndex]);

          for (let i = 0; i <= steps; i++) {
            const signalX = diffVec[0] < 0 ? -1 : 1;
            const signalY = diffVec[1] < 0 ? -1 : 1;

            const coordinateAsString = stableIndex === -1
              ? (from[0] + (i * signalX)) + "," + (from[1] + (i * signalY))
              : stableIndex === 0
                ? from[0] + "," + (from[1] + (i * signalY))
                : (from[0] + (i * signalX)) + "," + from[1];

            if (acc[coordinateAsString] == null) {
              acc[coordinateAsString] = 0;
            }

            acc[coordinateAsString]++;
          }

          return acc;
        }, {});

      return Object.values(coordinateScore).filter(score => score > 1).length;
    }

    const result = day5_1(testInput, { ignoreDiagonal: true });
    const expected = 5;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day5_2(input) {
      return day5_1(input, { ignoreDiagonal: false });
    }

    const result = day5_2(testInput);
    const expected = 12;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
