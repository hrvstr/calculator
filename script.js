// Nodes
const display = document.getElementById("display");
const numberGroup = document.getElementById("numbers");
const operatorGroup = document.getElementById("operators");
const actionGroup = document.getElementById("actions");

// Colors
const bodyStyle = getComputedStyle(document.body);
const primaryColor = bodyStyle.getPropertyValue("--primary");
const accentColor = bodyStyle.getPropertyValue("--accent");

// Calc
let input = "";
let inputA;
let inputB;
let calcResult;

// States
let clearDisplay = false;

function resetOperators() {
  operatorGroup.querySelectorAll("div").forEach((key) => {
    key.style.background = accentColor;
    key.style.color = primaryColor;
  });
}

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
    resetOperators();
    clearDisplay ? (display.textContent = "") : null;
    display.textContent += keyNumber;
    input += keyNumber;
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
    symbol: "AC",
    function: () => {
      display.textContent = "";
      input = "";
      calcResult = null;
      console.clear();
    },
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
  div.addEventListener("click", action.function);
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
  div.addEventListener("click", () => {
    clearDisplay = true;
    if (calcResult) {
      inputA = calcResult;
    }
    if (!inputA) {
      inputA = input;
      input = "";
    } else {
      inputB = input;
      input = "";
    }
    if (inputA && inputB) {
      calcResult = parseFloat(inputA) + parseFloat(inputB);
      inputA = inputB = null;
    }
    if (operator.name === "equal") {
      display.textContent = calcResult;
    } else {
      div.style.background = primaryColor;
      div.style.color = accentColor;
    }
  });
});
