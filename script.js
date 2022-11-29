const display = document.getElementById("display");
const numberGroup = document.getElementById("numbers");
const operatorGroup = document.getElementById("operators");

// Create number keys
for (i = 9; i >= 0; i--) {
  const div = document.createElement("div");
  const keyNumber = i;
  div.classList.add("key");
  div.setAttribute("id", "num" + keyNumber);
  div.textContent = keyNumber;
  numberGroup.appendChild(div);

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
  operatorGroup.appendChild(div);
  div.setAttribute("id", operator.name);
  div.textContent = operator.symbol;
});
