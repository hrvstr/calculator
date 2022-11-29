const display = document.getElementById("display");
const numberGroup = document.getElementById("numbers");
const operatorGroup = document.getElementById("operators");
const actionGroup = document.getElementById("actions");

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

// Add dot key to the number group
const dotKey = document.createElement("div");
dotKey.classList.add("key");
dotKey.textContent = ".";
numberGroup.appendChild(dotKey);

// Create action keys
const actions = [
  {
    name: "clear",
    symbol: "C",
  },
  {
    name: "sign",
    symbol: "±",
  },
  {
    name: "percent",
    symbol: "%",
  },
];

actions.forEach((action) => {
  const div = document.createElement("div");
  div.classList.add("key");
  div.setAttribute("id", action.name);
  div.textContent = action.symbol;
  actionGroup.appendChild(div);
});

// Create operator keys
const operators = [
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

operators.forEach((operator) => {
  const div = document.createElement("div");
  div.classList.add("key");
  div.setAttribute("id", operator.name);
  div.textContent = operator.symbol;
  operatorGroup.appendChild(div);
});
