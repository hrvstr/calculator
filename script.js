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
let calcMode;
let calcResult;

// States
let clearDisplay = false;
let clearAll = true;

// Functions
function toggleClearDisplay() {
  if (clearDisplay) {
    display.textContent = "";
    clearDisplay = !clearDisplay;
  }
}

function resetOperators() {
  operatorGroup.querySelectorAll("div").forEach((key) => {
    key.style.background = accentColor;
    key.style.color = primaryColor;
  });
}

function addInput(key) {
  if (clearAll) {
    clearKey.textContent = "C";
  }
  display.textContent += key;
  input += key;
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
    toggleClearDisplay();
    addInput(keyNumber);
  });
}

// Add dot key to the number group
const dotKey = document.createElement("div");
dotKey.classList.add("key");
dotKey.textContent = ".";
numberGroup.appendChild(dotKey);
dotKey.addEventListener("click", () => {
  resetOperators();
  toggleClearDisplay();
  addInput(dotKey.textContent);
});

// Create action keys
const actions = [
  {
    name: "clear",
    symbol: "AC",
    function: () => {
      display.textContent = "";
      input = "";
      calcResult = null;
      resetOperators();
      console.clear();
    },
  },
  {
    name: "sign",
    symbol: "±",
    function: () => {
      input = parseFloat(input) * -1;
      display.textContent = input;
    },
  },
  {
    name: "percent",
    symbol: "%",
    function: () => {
      input = parseFloat(input) / 100;
      display.textContent = input;
    },
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

const clearKey = document.getElementById("clear");

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
    // Get result from previous calculation
    if (calcResult) inputA = calcResult;
    if (input && operator.name !== "equal") {
      calcMode = operator.name;
      div.style.background = primaryColor;
      div.style.color = accentColor;
    }

    // Assign input to calculation pair
    !inputA
      ? (inputA = input) && (input = "")
      : (inputB = input) && (input = "");

    if (inputA && inputB) {
      // Convert strings to numbers
      inputA = parseFloat(inputA);
      inputB = parseFloat(inputB);

      // Do the math and get result
      if (calcMode === "add") {
        calcResult = inputA + inputB;
      } else if (calcMode === "subtract") {
        calcResult = inputA - inputB;
      } else if (calcMode === "multiply") {
        calcResult = inputA * inputB;
      } else if (calcMode === "divide") {
        calcResult = inputA / inputB;
      }
      console.table({ a: inputA, mode: calcMode, b: inputB, res: calcResult });
      inputA = inputB = null;
    }

    // Show results in display
    if (operator.name === "equal") display.textContent = calcResult;
  });
});
