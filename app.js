// list of regex

const numbers = /[0-9.]/;

const operations = /[\+\-\/\*]/;

// constants

let entryNumber = [];

let storeNumber = [];

let lastOperation = "";

let total;

const resetEntryNumber = () => (entryNumber = []);
const resetStoreNumber = () => (storeNumber = []);
const showTotalFunction = (show) => {
  showTotal.innerText = show;
};
const showOperationFunction = (show) => {
  showOperation.innerText = show;
};

// create buttos event listeners

const buttons = document.querySelectorAll(".buttons");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let elementId = e.target.id;
    //numbers
    if (numbers.test(elementId)) {
      addNumber(elementId);
    }
    if (operations.test(elementId)) {
      operate(elementId);
    }
    if (elementId === "equal") {
      equal();
    }
    if (elementId === "erase") {
      eraser();
    }
    if (elementId === "c") {
      reset();
    }
    if (elementId === "invert") {
      invert();
    }
  });
});

let keys = window.addEventListener("keydown", (event) => {
  key = event.key;
  if (numbers.test(key)) {
    return addNumber(key);
  }
  if (operations.test(key)) {
    return operate(key);
  }
  if (key === "Enter") {
    return equal();
  }
  if (key === "Backspace") {
    return eraser();
  }
  if (key === "\\") {
    return invert();
  }
  if (key === "Escape" || key === "Delete") {
    return reset();
  }
  console.log(key);
});

// numbers will be added to a entry variable

const addNumber = (num) => {
  if (entryNumber.includes(".") && num === ".") {
    console.log("coma");
    return;
  }
  if (entryNumber.length === 0 && num === ".") {
    entryNumber[0] = "0";
  }
  if (lastOperation === "equal") {
    resetEntryNumber();
    resetStoreNumber();
    showOperationFunction(storeNumber);
  }
  entryNumber.push(num);
  console.log(entryNumber);
  showTotal.innerText = entryNumber.join("");
  lastOperation = "addNumber";
};

// function for adding

const operate = (sign) => {
  validateNumber(entryNumber);
  if (lastOperation === "operation") {
    storeNumber.splice(1, 1, sign);
    showOperationFunction(storeNumber.join(" "));
    return;
  }
  if (typeof entryNumber === "object") {
    storeNumber = [entryNumber.join("")];
  } else {
    storeNumber = [entryNumber];
  }
  storeNumber.push(sign);
  resetEntryNumber();
  showOperationFunction(storeNumber.join(" "));
  showTotalFunction(entryNumber);

  lastOperation = "operation";

  console.log(storeNumber);
};

// function for result

const equal = () => {
  if (lastOperation === "operation") {
    entryNumber = storeNumber[0];
    resetStoreNumber();
  } else {
    if (lastOperation === "equal") {
      storeNumber[0] = entryNumber[0];
    } else {
      storeNumber.push(entryNumber.join(""));
    }

    console.log(storeNumber);

    total = Function("return " + storeNumber.join(" "));

    entryNumber = [total().toString()];
  }
  showOperationFunction(storeNumber.join(" "));
  showTotalFunction(entryNumber);

  lastOperation = "equal";
};

// erase function

const eraser = () => {
  entryNumber.splice(entryNumber.length - 1, 1);
  showTotalFunction(entryNumber.join(""));
};

// reset function

const reset = () => {
  console.log("reset");
  resetEntryNumber();
  showTotalFunction(entryNumber);

  if (lastOperation === "reset" || lastOperation === "equal") {
    resetStoreNumber();
    showOperationFunction(storeNumber);
  }

  lastOperation = "reset";
};

// reset function

const invert = () => {
  entryNumber = entryNumber.join("").split("");
  if (entryNumber[0] === "-") {
    entryNumber.splice(0, 1);
  } else {
    entryNumber.splice(0, 0, "-");
  }
  entryNumber = [entryNumber.join("")];
  lastOperation = "invert";
  showTotalFunction(entryNumber);
  console.log(entryNumber);
};

// validate number

validateNumber = (array) => {
  while (
    array.includes(".") &&
    (array[array.length - 1] === "0" || array[array.length - 1] === ".")
  ) {
    array.splice(array.length - 1, 1);
  }
};

// displayed variable will be the temporal variable

let showOperation = document.getElementById("screenTop");
let showTotal = document.getElementById("screenBottom");
