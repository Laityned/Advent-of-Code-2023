interface Dice {
  blue: number;
  red: number;
  green: number;
}

interface Game {
  id: number;
  possible: () => boolean;
  dices: Dice[];
}

class DiceGame implements Game {
  // this.
  maxSingle: Dice = {
    red: 12,
    blue: 14,
    green: 13,
  };

  constructor(public id: number, public dices: Dice[]) {
    this.id = id;
    this.dices = dices;
  }

  possible() {
    return this.dices.every((dice) => this._max_single_dices(dice));
  }

  _max_single_dices(dice: Dice) {
    return (
      dice.blue <= this.maxSingle.blue &&
      dice.red <= this.maxSingle.red &&
      dice.green <= this.maxSingle.green
    );
  }
}

function parseGame(game: string): Dice {
  const blue = game.match(/(\d+)\s+blue/);
  const red = game.match(/(\d+)\s+red/);
  const green = game.match(/(\d+)\s+green/);

  return {
    blue: blue ? Number(blue[1]) : 0,
    red: red ? Number(red[1]) : 0,
    green: green ? Number(green[1]) : 0,
  };
}

function parseDiceGame(game: string): DiceGame {
  const [gameInfo, games] = game.split(":");
  const id = Number(gameInfo.match(/Game\s+(\d+)/)![1]);

  const dices = games.split(";").map((game) => parseGame(game));

  return new DiceGame(Number(id), dices);
}

async function main(filename: string) {
  const file = Bun.file(filename);

  const filecontent = await file.text();

  const dicegames = filecontent.split("\n").map((line) => parseDiceGame(line));

  const possible = dicegames.filter((dicegame) => dicegame.possible());

  console.log(possible.reduce((acc, dicegame) => acc + dicegame.id, 0));
}

await main(Bun.argv[2]);
