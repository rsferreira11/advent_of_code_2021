{
  {
    function day3_1(input) {
      const { gamma, epsilon } = input
        .reduce((acc, cur) => {
          const bits = cur.split("");

          bits.forEach((bit, i) => {
            if (acc[i] == null) acc[i] = [ 0, 0 ];
            acc[i][bit]++;
          });

          return acc;
        }, [])
        .reduce((acc, cur) => {
          acc.epsilon += cur[0] > cur[1] ? "1" : "0";
          acc.gamma += cur[0] <= cur[1] ? "1" : "0";

          return acc;
        }, {
          gamma: "",
          epsilon: ""
        });

      return (
        Number("0b" + gamma) * Number("0b" + epsilon)
      );
    }

    const result = day3_1([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010"
    ]);

    console.log("task1 test: ", result, 198, result === 198);
  }

  {
    function day3_2(input) {
      function getHighLowByBit(list, bitIndex) {
        return list
        .reduce((acc, cur) => {
          const bits = cur.split("");

          acc[bits[bitIndex]]++;

          return acc;
        }, [0, 0]);
      }

      function filterListByPredicate(list, predicate) {
        for (let i = 0; list.length > 1; i++) {
          const highLow = getHighLowByBit(list, i);

          list = list.filter((listEl) => predicate(listEl, highLow, i));
        }

        return list[0];
      }

      const oxygen = filterListByPredicate(input, (listEl, highLow, bitIndex) => {
        const higherBit = highLow[1] >= highLow[0] ? "1" : "0";
        return listEl[bitIndex] === higherBit;
      });

      const co2 = filterListByPredicate(input, (listEl, highLow, bitIndex) => {
        const lowerBit = highLow[1] < highLow[0] ? "1" : "0";
        return listEl[bitIndex] === lowerBit;
      });

      return (
        Number("0b" + oxygen) * Number("0b" + co2)
      );
    }

    const result = day3_2([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010"
    ]);

    console.log("task2 test: ", result, 230, result === 230);
  }
}
