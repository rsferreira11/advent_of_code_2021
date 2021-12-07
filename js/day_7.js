{
  const testInput = "16,1,2,0,4,2,7,1,2,14";

  function parseInput(input) {
    return input.split(",").map(Number);
  }

  {
    function day7_1(input) {
      const positions = parseInput(input);
      const biggest = Math.max(...positions);
      const smallest = Math.min(...positions);

      const energyConsumptionVec = [];

      for (i = smallest; i <= biggest; i++) {
        const positionToCompare = i;
        energyConsumptionVec.push(
          positions
            .map(pos => Math.abs(pos - positionToCompare))
            .reduce((acc, cur) => acc + cur, 0)
        );
      }

      return Math.min(...energyConsumptionVec);
    }

    const result = day7_1(testInput);
    const expected = 37;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day7_2(input) {
      const positions = parseInput(input);
      const biggest = Math.max(...positions);
      const smallest = Math.min(...positions);

      const energyConsumptionVec = [];

      for (i = smallest; i <= biggest; i++) {
        const positionToCompare = i;
        energyConsumptionVec.push(
          positions
            .map(pos => Math.abs(pos - positionToCompare))
            .map(energy => {
              return Array.apply(null, { length: energy })
                .reduce((acc, _cur, i) => {
                  return acc + (i + 1);
                }, 0);
            })
            .reduce((acc, cur) => acc + cur, 0)
        );
      }

      return Math.min(...energyConsumptionVec);
    }

    const result = day7_2(testInput);
    const expected = 168;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
