{
  const testInput = "3,4,3,1,2";

  {
    function day6_1(input, numberOfDays = 80) {
      input = input.split(",").map(Number);

      const fishAgeCount = [];

      for (let i = 0; i < 9; i++) {
        fishAgeCount[i] = input.filter(age => age === i).length;
      }

      for (let i = 0; i < numberOfDays; i++) {
        const rebornCount = fishAgeCount.shift();

        fishAgeCount[6] += rebornCount;
        fishAgeCount[8] = rebornCount;
      }

      return fishAgeCount.reduce((acc, cur) => acc + cur, 0);
    }

    const result = day6_1(testInput);
    const expected = 5934;

    console.log("task1 test: ", result, expected, result === expected);
  }

  {
    function day6_2(input) {
      return day6_1(input, 256);
    }

    const result = day6_2(testInput);
    const expected = 26984457539;

    console.log("task2 test: ", result, expected, result === expected);
  }
}
