let justCalculated = false;

const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let isSecond = false;

function appendNumber(num) {

    //for = to

    if (justCalculated && !isSecond) {
        firstNumber = num;
        display.value = firstNumber;
        justCalculated = false;
        return;
    }
    // normal append
    if (!isSecond) {
        firstNumber += num;
        display.value = firstNumber;
    } else {
        secondNumber += num;

        display.value = firstNumber + " " + operator + " " + secondNumber;
    }

}

function setOperator(op) {
    if (firstNumber === "") return;
    operator = op;
    isSecond = true

    display.value = firstNumber + " " + operator;

}


function addDecimal(value) {
    if (value.includes(".")) return value;
    return value === "" ? "0." : value + ".";
}

function appendDecimal() {
    if (isSecond) {
        secondNumber = addDecimal(secondNumber);
        display.value = `${firstNumber} ${operator} ${secondNumber}`;
    } else {
        firstNumber = addDecimal(firstNumber);
        display.value = firstNumber;
    }
}

function AllClear() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    isSecond = false;
    display.value = "0";

}

function Eraser() {
    //for first number
    if (!isSecond) {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber || "0";
        return;

    }
    //remove operator only
    if (isSecond && secondNumber === "") {
        operator = "";
        isSecond = false; //state goes to first num true part
        display.value = firstNumber;
        return;

    }
    //for second number
    secondNumber = secondNumber.slice(0, -1);
    display.value = secondNumber
        ? firstNumber + " " + operator + " " + secondNumber : firstNumber + " " + operator; //tearnari op

}

function calculate() {
    if (firstNumber === "" || secondNumber === "" || operator === "") return;

    let result;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 === 0 ? "Error" : num1 / num2;
            break;
        case "^":
            result = Math.pow(num1, num2);
            break;

    }
    if (typeof result === "number") {
        result = +result.toFixed(10);
    }

    display.value = result;

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    isSecond = false;

    justCalculated = true;
}

//squareRoot
function squareRoot() {

    if (isSecond && secondNumber !== "") {
        alert("This work only in one digit number");
        return;
    }
    //apply first num
    if (firstNumber !== "") {
        let value = parseFloat(firstNumber);

        if (value < 0) {
            display.value = "Error";
            return 0;

        }
        let result = Math.sqrt(value);
        firstNumber = result.toString();

        display.value = firstNumber;
        operator = "";
        secondNumber = "";
        isSecond = false;
        justCalculated = true;

    }


}

function power() {
    //for second num
    if (isSecond && secondNumber !== "") {
        alert("This work only in one digit number");
        return;
    }
    //for first num
    if (firstNumber !== "") {
        let value = parseFloat(firstNumber);

        if (value < 0) {
            display.value = "Error";
            return 0;

        }
        let result = Math.pow(value, 2);
        firstNumber = result.toString();

        display.value = firstNumber;
        operator = "";
        secondNumber = "";
        isSecond = false;
        justCalculated = true;

    }


}

function Percentage() {
    if (!isSecond) {
        let value = parseFloat(firstNumber);
        let result = value / 100;

        firstNumber = result.toString();
        display.value = firstNumber;

        justCalculated = true;
    }

}

//Trigonometric 
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

//sin
function sin() {
    if (firstNumber !== "") {
        let value = parseFloat(firstNumber);
        let result = Math.sin(toRadians(value));

        firstNumber = result.toString();
        display.value = firstNumber;

        operator = "";
        secondNumber = "";
        isSecond = false;
        justCalculated = true;



    }

}

//cos
function cos() {
    if (firstNumber !== "") {
        let value = parseFloat(firstNumber);
        let result = Math.sin(toRadians(value));

        firstNumber = result.toString();
        display.value = firstNumber;

        operator = "";
        secondNumber = "";
        isSecond = false;
        justCalculated = true;



    }

}
//tan
function tan() {
    if (firstNumber !== "") {
        let value = parseFloat(firstNumber);
        let result = Math.sin(toRadians(value));

        firstNumber = result.toString();
        display.value = firstNumber;

        operator = "";
        secondNumber = "";
        isSecond = false;
        justCalculated = true;



    }

}

//x rais to ^ y
function setPower() {
    if (firstNumber === "") return;
    operator = "^";
    isSecond = true;
    display.value = firstNumber + " ^ ";
}










