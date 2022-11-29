const display = document.getElementById("display");
const numBlock = document.getElementById("numBlock");
const operators = document.getElementById("operators");

// Create number keys
for (i = 9; i >= 0; i--) {
  const div = document.createElement("div");
  const keyNumber = i;
  div.classList.add("key");
  div.setAttribute("id", "num" + keyNumber);
  div.textContent = keyNumber;
  numBlock.appendChild(div);

  // Add number to display
  div.addEventListener("click", () => {
    display.textContent += keyNumber;
  });
}

// Create operator keys
const operatorArray = [
  {
    name: "divide",
    symbol: "÷",
  },
  {
    name: "multiply",
    symbol: "×",
  },
  {
    name: "subtract",
    symbol: "-",
  },
  {
    name: "add",
    symbol: "+",
  },
  {
    name: "equal",
    symbol: "=",
  },
];

operatorArray.forEach((operator) => {
  const div = document.createElement("div");
  div.classList.add("key");
  operators.appendChild(div);
  div.setAttribute("id", operator.name);
  div.textContent = operator.symbol;
});
