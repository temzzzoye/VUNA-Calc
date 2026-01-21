var left = "";
var operator = "";
var right = "";

const germanNumbers = {
  0: "null",
  1: "eins",
  2: "zwei",
  3: "drei",
  4: "vier",
  5: "fünf",
  6: "sechs",
  7: "sieben",
  8: "acht",
  9: "neun"
};

function appendToResult(value) {
  if (operator === "") {
    left += value;
  } else {
    right += value;
  }
  updateResult();
}

function operatorToResult(value) {
  if (right !== "") {
    calculateResult();
  }
  operator = value;
  updateResult();
}

function clearResult() {
  left = "";
  right = "";
  operator = "";
  document.getElementById("result").value = "";
  document.getElementById("word-result").innerHTML = "";
}

function backspace() {
  if (right !== "") {
    right = right.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else {
    left = left.slice(0, -1);
  }
  updateResult();
}

function updateResult() {
  document.getElementById("result").value = left + operator + right;
}

function calculateResult() {
  try {
    const result = eval(left + operator + right);
    document.getElementById("result").value = result;
    numberToGermanWords(result);
    left = result.toString();
    right = "";
    operator = "";
  } catch {
    document.getElementById("result").value = "Error";
  }
}

function numberToGermanWords(value) {
  let words = [];

  for (let char of value.toString()) {
    if (char === ".") {
      words.push("Komma");
    } else {
      words.push(germanNumbers[char]);
    }
  }

  document.getElementById("word-result").innerHTML = words.join(" ");
}
