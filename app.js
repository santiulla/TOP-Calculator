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
  });
});

// numbers will be added to a entry variable

const addNumber = (num) => {
  if (entryNumber.includes(".") && num === ".") {
    console.log("coma");
    return;
  }
  if (lastOperation === "equal") {
    resetEntryNumber();
    resetStoreNumber();
    showOperation.innerText = storeNumber;
  }
  entryNumber.push(num);
  console.log(entryNumber);
  showTotal.innerText = entryNumber.join("");
  lastOperation = "addNumber";
};

// function for adding

const operate = (sign) => {
  if (lastOperation === "operation") {
    storeNumber.splice(1, 1, sign);
    showOperation.innerText = storeNumber.join(" ");
    return;
  } else if (storeNumber[1]) {
    equal();
  }
  if (typeof entryNumber === "object") {
    storeNumber = [entryNumber.join("")];
  } else {
    storeNumber = [entryNumber];
  }
  storeNumber.push(sign);
  resetEntryNumber();
  showOperation.innerText = storeNumber.join(" ");
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

    entryNumber = [total()];
  }
  showOperation.innerText = storeNumber.join(" ");
  showTotalFunction(entryNumber);

  lastOperation = "equal";
};

// displayed variable will be the temporal variable

let showOperation = document.getElementById("screenTop");
let showTotal = document.getElementById("screenBottom");

// new entry variable

// show result
