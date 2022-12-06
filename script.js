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
let clearOperators = false;
let clearAll = true;

// Functions
function addInput(key) {
  resetOperators();
  if (clearDisplay) {
    display.textContent = "";
    clearDisplay = false;
  }
  if (clearAll) {
    actions.find((item) => item.name === "clear").node.textContent = "C";
    clearAll = false;
  }

  // Add pressed key to input
  input += key;

  // Display input inside the display
  if (display.textContent === "0" && key !== dotKey.textContent) {
    display.textContent = key;
  } else {
    display.textContent += key;
  }
  handleLargeNumber();
}

// Truncate long numbers
const maxCharLength = 12;
const ellipsis = "…";

function handleLargeNumber() {
  // Trim floats
  if (
    isFinite(parseFloat(display.textContent)) &&
    !Number.isInteger(parseFloat(display.textContent)) &&
    display.textContent.split(dotKey.textContent)[1].length > maxCharLength
  )
    display.textContent = parseFloat(display.textContent).toFixed(
      maxCharLength
    );

  // Trim long numbers on input
  if (display.textContent.length >= maxCharLength) {
    if (parseFloat(display.textContent) !== calcResult) {
      display.textContent =
        ellipsis +
        display.textContent.substring(
          display.textContent.length - maxCharLength + 1,
          maxCharLength + 1
        );
    }
    // Trim long results
    else if (parseFloat(display.textContent) === calcResult) {
      display.textContent =
        display.textContent.substring(0, maxCharLength) + ellipsis;
    }
  }
}

function resetOperators() {
  if (clearOperators) {
    operatorGroup.querySelectorAll("div").forEach((operator) => {
      operator.style.background = accentColor;
      operator.style.color = primaryColor;
    });
    clearOperators = false;
  }
}

function removeLastChar(string) {
  return string.substring(0, string.length - 1);
}

// Create number keys
const numKeys = [];

for (i = 9; i >= 0; i--) {
  const div = document.createElement("div");
  const keyNumber = i;
  div.classList.add("key");
  div.setAttribute("id", "num" + keyNumber);
  div.textContent = keyNumber;
  numberGroup.appendChild(div);

  // Add number to display
  div.addEventListener("click", () => {
    addInput(keyNumber);
  });

  // Add number to array for keyboard input
  numKeys.push(i.toString());
}

// Add dot key to the number group
const dotKey = document.createElement("div");
dotKey.classList.add("key");
dotKey.textContent = ".";
numberGroup.appendChild(dotKey);
dotKey.addEventListener("click", () => {
  if (!display.textContent.includes(dotKey.textContent))
    addInput(dotKey.textContent);
});

// Create action keys
const actions = [
  {
    name: "clear",
    symbol: "AC",
    key: "Clear",
    function: () => {
      input = "";
      display.textContent = "0";
      actions.find((item) => item.name === "clear").node.textContent = "AC";
      if (clearAll) {
        inputA = inputB = calcResult = null;
        clearOperators = true;
        resetOperators();
        console.clear();
      }
      clearAll = true;
      handleLargeNumber();
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
  action.node = div;
});

// Create operator keys
const operators = [
  {
    name: "divide",
    symbol: "÷",
    key: "/",
    function: (a, b) => (b === 0 ? "Error" : a / b),
  },
  {
    name: "multiply",
    symbol: "×",
    key: "*",
    function: (a, b) => a * b,
  },
  {
    name: "subtract",
    symbol: "-",
    key: "-",
    function: (a, b) => a - b,
  },
  {
    name: "add",
    symbol: "+",
    key: "+",
    function: (a, b) => a + b,
  },
  {
    name: "equal",
    symbol: "=",
    key: "Enter",
  },
];

const operate = (operator, a, b) =>
  operators.find((e) => e.name === operator).function(a, b);

operators.forEach((operator) => {
  const div = document.createElement("div");
  operator.node = div;
  div.classList.add("key");
  div.setAttribute("id", operator.name);
  div.textContent = operator.symbol;
  operatorGroup.appendChild(div);
  div.addEventListener("click", () => {
    // Clear display on next number input
    clearDisplay = true;
    clearOperators = true;

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
      // Highlight only active operator key
      resetOperators();
      div.style.background = primaryColor;
      div.style.color = accentColor;
    }

    // Display result before continuing calculation
    if ((operator.name === "equal" && input) || calcResult) {
      display.textContent = calcResult;
      handleLargeNumber();
    }
  });
});

// Handle keyboard input
const click = new Event("click");
document.addEventListener("keyup", (event) => {
  // console.log(key.event);

  // Number keys
  if (numKeys.includes(event.key)) {
    addInput(event.key);
  }
  // Dot key
  else if (event.key === ",") {
    dotKey.dispatchEvent(click);
  }
  // Clear key
  else if (event.key === "Clear") {
    actions.find((item) => item.name === "clear").node.dispatchEvent(click);
  }
  // Remove last input
  else if (event.key === "Backspace") {
    if (input) {
      input = removeLastChar(input);
      display.textContent = input;
    } else if (calcResult) {
      calcResult = removeLastChar(calcResult.toString());
      display.textContent = calcResult;
    }
  }
  // Operators
  else if (operators.find((operator) => operator.key === event.key)) {
    operators
      .find((operator) => operator.key === event.key)
      .node.dispatchEvent(click);
  }
});
