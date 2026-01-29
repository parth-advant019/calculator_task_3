let expression = "";
let justCalculated = false;

const display = document.getElementById("display");

function appendNumber(num) {
  if (justCalculated) {
    expression = num;
    justCalculated = false;
  } else {
    expression += num;

    display.value = expression;
  }
}

function setOperator(op) {
  if (expression === "") return;

  if (justCalculated) {
    justCalculated = false;
  }

  //stope 5++ or 2--
  const lastChar = expression.slice(-1);
  if ("+-*/^".includes(lastChar)) return;

  expression += op;
  display.value = expression;
}

function addDecimal(value) {
  if (value.includes(".")) return value;
  return value === "" ? "0." : value + ".";
}

function appendDecimal() {
  const parts = expression.split(/[\+\-\*\/\^]/);
  const lastPart = parts[parts.length - 1];

  if (lastPart.includes(".")) return;

  expression += lastPart === "" ? "0." : ".";

  display.value = expression;
}
//brackets
function openBracket() {
  if (expression === "" || /[\+\-\*\/\^\(]$/.test(expression)) {
    expression += "(";
    display.value = expression;
  }
}
function closeBracket() {
  const open = (expression.match(/\(/g) || []).length;
  const close = (expression.match(/\)/g) || []).length;

  if (open > close) {
    expression += ")";
    display.value = expression;
  }
}

function AllClear() {
  expression = "";
  display.value = "0";
}

function Eraser() {
  expression = expression.slice(0, -1);
  display.value = expression || "0";
}

function calculate() {
  try {
    const cap = expression.replace(/\^/g, "**");
    const result = Function(`"use strict"; return (${cap})`)();
    display.value = +result.toFixed(10);
    expression = display.value;
    justCalculated = true;
  } catch {
    display.value = "Error";
    expression = "";
  }
}

//squareRoot
function squareRoot() {
  if (expression === "") return;

  const value = Function(`"use strict"; return (${expression})`)();

  if (value < 0) {
    display.value = "Error";
    expression = "";
    return;
  }

  const result = Math.sqrt(value);

  display.value = +result.toFixed(10);
  expression = display.value;
  justCalculated = true;
}

function power() {
  if (expression === "") return;

  const value = Function(`"use strict"; return (${expression})`)();

  if (value < 0) {
    display.value = "Error";
    expression = "";
    return;
  }

  const result = Math.pow(value, 2);

  display.value = +result.toFixed(10);
  expression = display.value;
  justCalculated = true;
}

function Percentage() {
  if (expression === "") return;

  const value = Function(`"use strict"; return (${expression})`)();

  if (value < 0) {
    display.value = "Error";
    expression = "";
    return;
  }

  const result = value / 100;

  display.value = +result.toFixed(10);
  expression = display.value;
  justCalculated = true;
}

//sin
function sin() {
  expression += "Math.sin(";
  display.value = expression;
}

//cos
function cos() {
  expression += "Math.cos(";
  display.value = expression;
}
//tan
function tan() {
  expression += "Math.tan(";
  display.value = expression;
}

//x rais to ^ y
function setPower() {
  if (expression === "") return;

  if (justCalculated) {
    justCalculated = false;
  }
  expression += "^";
  display.value = expression;
}

function log() {
  if (expression === "") return;

  const value = Function(`"use strict"; return (${expression})`)();

  if (value < 0) {
    display.value = "Error";
    expression = "";
    return;
  }

  const result = Math.log10(value);

  display.value = +result.toFixed(10);
  expression = display.value;
  justCalculated = true;
}

function factorialCalc(n) {
  if (n < 0 || !Number.isInteger(n)) {
    return null;
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorial() {
  if (expression === "") return;
  const value = Function(`"use strict"; return (${expression})`)();

  const fact = factorialCalc(value);
  if (fact === null) {
    display.value = "Error";
    expression = "";
    return;
  }

  display.value = fact;
  expression = fact.toString();
  justCalculated = true;
}

//toggle function

function toggleScientific() {
  const panel = document.getElementById("scientificPanel");
  panel.classList.toggle("hidden");
}

//memory
let memoryStack = [];
let memoryValue = 0;

function memoryStore() {
  const value = Number(display.value);

  if (!isNaN(value)) {
    memoryStack.unshift(value);
    memoryValue = value;
    renderMemory();
    display.value = "0";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    isSecond = false;
    justCalculated = true;
  }
}

function memoryClear() {
  memoryStack = [];
  memoryValue = 0;
  renderMemory();
}

function memoryRecall() {
  if (memoryStack.length > 0) {
    const value = memoryStack[0].toString();

    display.value = value;
    firstNumber = value;
    secondNumber = "";
    operator = "";
    isSecond = false;

    justCalculated = true;
  }
}

function memoryAdd() {
  memoryValue += Number(display.value);
  memoryStack[0] = memoryValue;
  renderMemory();
  display.value = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  isSecond = false;
  justCalculated = true;
}

function memorySubtract() {
  memoryValue -= Number(display.value);
  memoryStack[0] = memoryValue;
  renderMemory();
  display.value = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  isSecond = false;
  justCalculated = true;
}

function renderMemory() {
  const memoryList = document.getElementById("memoryList");
  memoryList.innerHTML = "";

  memoryStack.slice(0, 3).forEach((val) => {
    const div = document.createElement("div");
    div.textContent = val;
    memoryList.appendChild(div);
  });
}
