const wrapper = document.querySelectorAll(".wrapper div");
const winner = document.querySelector(".winner");

const arr = [];

const winnerRules = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];

let identifyPlayer = true;
let gameOver = false;

wrapper.forEach((div) => {
  div.addEventListener("click", () => {
    if (gameOver || div.textContent !== "") return;

    const mark = identifyPlayer ? "x" : "o";
    div.textContent = mark;
    identifyPlayer = !identifyPlayer;

    arr.push({
      datasetId: Number(div.dataset.id),
      choosen: mark,
    });

    checkWinner();
  });
});

function checkWinner() {
  for (let rule of winnerRules) {
    const a = rule[0];
    const b = rule[1];
    const c = rule[2];

    const checkeda = arr.find((item) => item.datasetId === a);
    const checkedb = arr.find((item) => item.datasetId === b);
    const checkedc = arr.find((item) => item.datasetId === c);

    if (!checkeda || !checkedb || !checkedc) continue;

    if (
      checkeda.choosen === checkedb.choosen &&
      checkedb.choosen === checkedc.choosen
    ) {
      winner.textContent = checkeda.choosen + " wins";
      const elementA = document.querySelector(
        `[data-id="${checkeda.datasetId}"]`,
      );
      const elementB = document.querySelector(
        `[data-id="${checkedb.datasetId}"]`,
      );
      const elementC = document.querySelector(
        `[data-id="${checkedc.datasetId}"]`,
      );

      if (elementA) elementA.style.backgroundColor = "green";
      if (elementB) elementB.style.backgroundColor = "green";
      if (elementC) elementC.style.backgroundColor = "green";

      console.log(winner);

      gameOver = true;

      return;
    }
  }

  if (!gameOver && arr.length === 9 && winner.textContent.length === 0) {
    winner.textContent = "Draw!";
  }
}
