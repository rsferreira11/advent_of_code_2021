{

  {
    function day2_1(input, startPos = [0, 0]) {
      const commandLookUp = {
        "forward": (value, pos) => [ pos[0], pos[1] + value ],
        "up": (value, pos) => [ pos[0] - value, pos[1] ],
        "down": (value, pos) => [ pos[0] + value, pos[1] ],
      };

      return input
        .reduce((acc, cur) => {
          const [ command, payload ] = cur.split(" ");

          acc = commandLookUp[command](Number(payload), acc);

          return acc;
        }, startPos)
        .reduce((acc, cur) => acc * cur, 1);
    }

    const task1_result = day2_1([
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ]);

    console.log(
     task1_result,
     150,
     task1_result === 150
    );
  }

  {
    function day2_2(input, startPos = [0, 0, 0]) {
      const commandLookUp = {
        "forward": (value, pos) => [ pos[0] + value, pos[1] + (pos[2] * value), pos[2] ],
        "up": (value, pos) => [ pos[0], pos[1], pos[2] - value ],
        "down": (value, pos) => [ pos[0], pos[1], pos[2] + value ],
      };

      const partial = input
        .reduce((acc, cur) => {
          const [ command, payload ] = cur.split(" ");

          acc = commandLookUp[command](Number(payload), acc);

          return acc;
        }, startPos);

      return partial[0] * partial[1];
    }

    const task2_result = day2_2([
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ]);

    console.log(
      task2_result,
      900,
      task2_result === 900
    );
  }

}
