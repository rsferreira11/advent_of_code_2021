{
  const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

  function parseInput(input) {
    return input.split("\n")
      .map(line => {
        return line.split("");
      });
  }

  function validateLine(line) {
    const opposite = {
      "]": "[",
      ")": "(",
      "}": "{",
      ">": "<",
    };

    const stack = [
      line[0]
    ];

    for (let i = 1; i < line.length; i++) {
      const char = line[i];
      const isClosing = opposite[char] != null;

      if (!isClosing) {
        stack.push(char);
      }
      else {
        const stackTop = stack.pop();

        if (opposite[char] !== stackTop) {
          return [ "error", i, char ];
        }
      }
    }

    if (stack.length > 0) {
      const missingChars = [];
      const oppositeValues = Object.values(opposite);
      const oppositeKeys = Object.keys(opposite)

      do {
        missingChars.push(
          oppositeKeys[oppositeValues.indexOf(stack.pop())]
        );
      } while (stack.length > 0);

      return [ "incomplete", missingChars ];
    }

    return [ "ok" ];
  }

  {
    function day10_1(input) {
      const scoreHash = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
      };

      return parseInput(input)
        .map(line => {
          return validateLine(line);
        })
        .filter((lineResults) => {
          return lineResults[0] === "error";
        })
        .reduce((acc, cur) => {
          return acc + scoreHash[cur[2]];
        }, 0);
    }

    const result = day10_1(testInput);
    const expected = 26397;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day10_2(input) {
      const scoreHash = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
      }

      const sortedScore = parseInput(input)
        .map(line => {
          return validateLine(line);
        })
        .filter((lineResults) => {
          return lineResults[0] === "incomplete";
        })
        .map(([, chars]) => {
          let result = 0;
          chars.forEach(char => {
            result *= 5;
            result += scoreHash[char];
          });
          return result;
        })
        .sort((a, b) => a - b);

      return sortedScore[Math.floor(sortedScore.length / 2)];
    }

    const result = day10_2(testInput);
    const expected = 288957;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
