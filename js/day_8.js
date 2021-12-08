{
  const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

  function parseInput(input) {
    return input.split("\n")
      .map(line => {
        return line.split(" | ")
          .map(part => {
            return part.split(" ").filter(_ => _ !== "");
          });
      });
  }

  {
    function day8_1(input) {
      const parsedInput = parseInput(input);

      const uniqueSegLengths = [ 2, 4, 3, 7 ];

      return parsedInput.reduce((acc, cur) => {
        const toAdd = cur[1].filter(digit => {
          return uniqueSegLengths.includes(digit.length);
        })
        .length;

        return acc + toAdd;
      }, 0);
    }

    const result = day8_1(testInput);
    const expected = 26;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day8_2(input) {
      const parsedInput = parseInput(input);

      /**
       * The display array starts on top, goes clockwise and has middle as last
       * The example array would look like [ 'a', 'c', 'f', 'g', 'e', 'b', 'd' ]
       */

      function arrayDiff(a, b) {
        return a.filter(el => !b.includes(el));
      }

      const lookUp = [
        function(one, seven) {
          return arrayDiff(seven.split(""), one.split("")).join("");
        },
        function(one, zeroSixNine) {
          return one.split("").find(char => {
            return zeroSixNine.filter(digit => digit.includes(char)).length === 2;
          });
        },
        function(one, secondSegment) {
          return one.split("").filter(char => char !== secondSegment)[0];
        }
      ]

      return parsedInput.reduce((acc, cur) => {
        const [ digits, display ] = cur;

        const one = digits.find(_ => _.length === 2);
        const four = digits.find(_ => _.length === 4);
        const seven = digits.find(_ => _.length === 3);
        const eight = digits.find(_ => _.length === 7);
        const zeroSixNine = digits.filter(_ => _.length === 6);
        const twoThreeFive = digits.filter(_ => _.length === 5);

        const displayArray = [];
        displayArray[0] = lookUp[0](one, seven);
        displayArray[1] = lookUp[1](one, zeroSixNine);
        displayArray[2] = lookUp[2](one, displayArray[1]);

        const two = twoThreeFive.filter(digit => {
          return digit.includes(displayArray[0])
            && digit.includes(displayArray[1])
            && !digit.includes(displayArray[2]);
        })
        [0];

        const three = twoThreeFive.filter(digit => {
          return digit.includes(displayArray[0])
            && digit.includes(displayArray[1])
            && digit.includes(displayArray[2]);
        })
        [0];

        const five = twoThreeFive.filter(digit => {
          return digit.includes(displayArray[0])
            && !digit.includes(displayArray[1])
            && digit.includes(displayArray[2]);
        })
        [0];

        const six = zeroSixNine.filter(digit => {
          return digit.includes(displayArray[0])
            && !digit.includes(displayArray[1])
            && digit.includes(displayArray[2]);
        })
        [0];

        const zero = zeroSixNine.filter(digit => {
          const candidate = arrayDiff(digit.split(""), four.split("")).join("");
          return digit !== six
            && candidate.length === 3;
        })
        [0];

        const nine = zeroSixNine.filter(digit => digit !== zero && digit !== six)
        [0];

        const unsortedDigits = [
          zero,
          one,
          two,
          three,
          four,
          five,
          six,
          seven,
          eight,
          nine,
        ];

        const sortedDigits = unsortedDigits.map(_ => _.split("").sort().join(""));

        const toAdd = Number(
          display.reduce((acc, cur) => {
            const sortedInput = cur.split("").sort().join("");
            const toSum = sortedDigits.indexOf(sortedInput);
            return acc + toSum;
          }, "")
        );

        return acc + toAdd;
      }, 0);
    }

    const result = day8_2(testInput);
    const expected = 61229;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
