interface Dice {
  blue: number;
  red: number;
  green: number;
}

interface Game {
  id: number;
  minimum: () => Dice;
  dices: Dice[];
}

class DiceGame implements Game {
  constructor(public id: number, public dices: Dice[]) {
    this.id = id;
    this.dices = dices;
  }

  minimum: () => Dice = () => {
    return {
      red: this.dices.reduce((acc, dice) => Math.max(acc, dice.red), 0),
      blue: this.dices.reduce((acc, dice) => Math.max(acc, dice.blue), 0),
      green: this.dices.reduce((acc, dice) => Math.max(acc, dice.green), 0),
    };
  };

  power: () => number = () => {
    const minimum = this.minimum();

    return minimum.red * minimum.blue * minimum.green;
  };
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

  console.log(dicegames.reduce((acc, dicegame) => acc + dicegame.power(), 0));
}

await main(Bun.argv[2]);
