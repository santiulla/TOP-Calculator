// list of regex

const numbers = /[0-9.]/;

// const operations = /[+-/*]/;

// constants

let entryNumber = [];

let storeNumber = [];

let total;

// create buttos event listeners

const buttons = document.querySelectorAll(".buttons");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let elementId = e.target.id;
    //numbers
    if (numbers.test(elementId)) {
      addNumber(elementId);
    }
    if (elementId === "+") {
      sum(elementId);
    }
    if (elementId === "equal") {
      equal();
    }
  });
});

// numbers will be added to a entry variable

const addNumber = (num) => {
  if (entryNumber.includes(".") && num === ".") {
    return;
  }
  entryNumber.push(num);
  console.log(entryNumber);
  showTotal.innerText = entryNumber.join("");
};

// function for adding

const sum = (sign) => {
  storeNumber = [entryNumber.join("")];
  storeNumber.push(sign);
  entryNumber = [];
  console.log(storeNumber);
};

// function for result

const equal = () => {
  storeNumber.push(entryNumber.join(""));

  console.log(storeNumber);

  total = Function("return " + storeNumber.join(" "));

  showOperation.innerText = storeNumber.join(" ");
  entryNumber = total();
  showTotal.innerText = entryNumber;
};

// displayed variable will be the temporal variable

let showTotal = document.getElementById("screenBottom");
let showOperation = document.getElementById("screenTop");

// new entry variable

// show result
