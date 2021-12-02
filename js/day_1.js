{

  {
    function day1_1(input) {
      return input
        .reduce((acc, cur) => {
          cur = Number(cur);

          if (acc.prev !== -1 && cur > acc.prev) {
            acc.result++;
          }

          acc.prev = cur;

          return acc;
        }, {
          prev: -1,
          result: 0
        })
        .result;
    }

    const result1_1 = day1_1([
      "199",
      "200",
      "208",
      "210",
      "200",
      "207",
      "240",
      "269",
      "260",
      "263"
    ]);

    console.log(
      result1_1,
      7,
      result1_1 === 7
    );
  }

  {
    function day1_2(input, groupSize = 3) {
      return input
        .reduce((acc, cur) => {
          cur = Number(cur);

          acc.groupAcc.push(cur);

          if (acc.groupAcc.length === groupSize) {
            const curSum = acc.groupAcc.reduce((a, c) => a + c, 0);

            if (acc.prevSum !== -1 && curSum > acc.prevSum) {
              acc.result++;
            }

            acc.prevSum = curSum;
            acc.groupAcc = acc.groupAcc.slice(1);
          }

          return acc;
        }, {
          prevSum: -1,
          groupAcc: [],
          result: 0
        })
        .result;
    }

    const result1_2 = day1_2([
      "199",
      "200",
      "208",
      "210",
      "200",
      "207",
      "240",
      "269",
      "260",
      "263"
    ]);

    console.log(
      result1_2,
      5,
      result1_2 === 5
    );
  }

}
