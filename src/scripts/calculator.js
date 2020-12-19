function getHistory() {
  return document.getElementById("history-value").innerText;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function getNumber() {
  return document.getElementsByClassName("number");
}

function getOperator() {
  return document.getElementsByClassName("operator");
}

function updateHistoryField(num) {
  document.getElementById("history-value").innerText = num;
}

function updateOutputField(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = num;
  } else {
    document.getElementById("output-value").innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  return Number(num).toLocaleString("en");
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

for (let index = 0; index < getOperator().length; index++) {
  getOperator()[index].addEventListener("click", function () {
    if (this.id == "clear") {
      updateHistoryField("");
      updateOutputField("");
    } else if (this.id == "backspace") {
      let outputForDelete = reverseNumberFormat(getOutput()).toString();
      if (outputForDelete) {
        outputForDelete = outputForDelete.substr(0, outputForDelete.length - 1);
        updateOutputField(outputForDelete);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          let result = eval(history);
          updateOutputField(result);
          updateHistoryField("");
        } else {
          history = history + this.id;
          updateHistoryField(history);
          updateOutputField("");
        }
      }
    }
  });
}

for (let index = 0; index < getNumber().length; index++) {
  getNumber()[index].addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output = output + this.id;
      updateOutputField(output);
    }
  });
}
