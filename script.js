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

// function toggleClearAll()

function resetOperators() {
  operatorGroup.querySelectorAll("div").forEach((key) => {
    key.style.background = accentColor;
    key.style.color = primaryColor;
  });
}

function addInput(key) {
  if (clearAll) {
    clearKey.textContent = "C";
    clearAll = false;
  }
  if (display.textContent === "0") {
    display.textContent = key;
  } else {
    display.textContent += key;
  }
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
      input = "";
      display.textContent = "0";
      clearKey.textContent = "AC";
      if (clearAll) {
        inputA = inputB = calcResult = null;
        resetOperators();
        console.clear();
      }
      clearAll = true;
    },
  },
  {
    name: "sign",
    symbol: "±",
    function: () => {
      if (input) input = parseFloat(input) * -1;
      display.textContent = input;
    },
  },
  {
    name: "percent",
    symbol: "%",
    function: () => {
      if (input) input = parseFloat(input) / 100;
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

const operators = [
  {
    name: "divide",
    symbol: "÷",
    function: (a, b) => a / b,
  },
  {
    name: "multiply",
    symbol: "×",
    function: (a, b) => a * b,
  },
  {
    name: "subtract",
    symbol: "-",
    function: (a, b) => a - b,
  },
  {
    name: "add",
    symbol: "+",
    function: (a, b) => a + b,
  },
  {
    name: "equal",
    symbol: "=",
  },
];

const operate = (operator, a, b) =>
  operators.find((e) => e.name === operator).function(a, b);

const convertCalcToString = () => {
  return;
};

operators.forEach((operator) => {
  const div = document.createElement("div");
  div.classList.add("key");
  div.setAttribute("id", operator.name);
  div.textContent = operator.symbol;
  operatorGroup.appendChild(div);
  div.addEventListener("click", () => {
    // Clear display on next number input
    clearDisplay = true;

    // Use last result as first input
    if (calcResult) inputA = calcResult;

    // Assign input pair and clear input
    !inputA
      ? (inputA = input) && (input = "")
      : (inputB = input) && (input = "");

    // If input pair is available do calculation
    if (inputA && inputB) {
      inputA = parseFloat(inputA);
      inputB = parseFloat(inputB);
      calcResult = operate(calcMode, inputA, inputB);
      console.log(
        `${inputA} ${
          operators.find((e) => e.name == calcMode).symbol
        } ${inputB} = ${calcResult}`
      );
      inputA = inputB = null;
    }

    if (operator.name !== "equal" && (inputA || calcResult)) {
      // Set calculation mode
      calcMode = operator.name;
      // Highlight active operator key
      div.style.background = primaryColor;
      div.style.color = accentColor;
    }

    // Display result before continuing calculation
    if (operator.name === "equal" || calcResult) {
      display.textContent = calcResult;
    }
  });
});

// Handle keyboard input
document.addEventListener("keyup", (event) => {
  console.log(event.key);
  // if (event.key == 1) {
  addInput(event.key);
  // }
});
