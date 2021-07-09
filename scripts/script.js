const screenText = document.querySelector("#screen-text");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let answer;
let operator;

const copyToClipboardButton = document.querySelector("#copytoclipboard");
copyToClipboardButton.addEventListener("click", () =>
{
  textArea = document.createElement("textarea");
  textArea.value = screenText.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert(screenText.textContent + " Copied to clipboard.");
});

const ANS = document.querySelector("#answer");
ANS.addEventListener("click", () =>
{
  if (answer == null) return; 
  screenText.textContent += answer;
});

const DEL = document.querySelector("#del");
function del()
{
  let deletedText = screenText.textContent.slice(0, -1);
  screenText.textContent = deletedText;
  if (!screenText.textContent.match(/[+*/-]/g))
  {
    operator = null;
  }
}
DEL.addEventListener("click", (e) =>
{
  del();
});

const AC = document.querySelector("#clear");
function Clear()
  {
    screenText.textContent = "";
    answer = null;
    operator = null;
  }
AC.addEventListener("click", () =>
{
  Clear()
});

function add(a, b)
{
  return +a + +b;
}

function subtract(a, b)
{
  return +a - +b;
}

function multiply(a, b)
{
  return +a * +b;
}

function divide(a, b)
{
  return +a / +b;
}

function operate(a, operator, b)
{
  switch(operator)
  {
    case "plus":
      return add(a, b);
      break;
    
    case "minus":
      return subtract(a, b);
      break;
    
    case "multiply":
      return multiply(a, b);
      break;

    case "divide":
      return divide(a, b);
      break;
  }
}

function Calculate()
{
  let inputs = screenText.textContent.split(/[/*+-]/g);
  if (inputs[1] === "") return screenText.textContent = "ERROR!";
  inputs.splice(1, 0, operator);
  answer = operate(...inputs);
  if (answer == "Infinity") screenText.textContent = "Fuck Off";
  else screenText.textContent = answer;
  operator = null;
}

numbers.forEach((_number) =>
{
  _number.addEventListener("click", () =>
  {
    if (screenText.textContent.includes("ERROR!") || screenText.textContent === "Fuck Off") Clear();
    if (_number.id === "dot" && screenText.textContent.includes(".")) return;
    screenText.textContent += _number.textContent;
    _number.classList.toggle("pressed-red");
    window.setTimeout(() => _number.classList.toggle("pressed-red"), 75);
  });
});

operators.forEach((_operator) =>
{
  _operator.addEventListener("click", () =>
  {
    if (screenText.textContent.includes("ERROR!") || screenText.textContent === "Fuck Off") Clear();
    if (operator == null) operator = _operator.id;
    else Calculate();
    operator = _operator.id;
    screenText.textContent += _operator.textContent;
    _operator.classList.toggle("pressed-red");
    window.setTimeout(() => _operator.classList.toggle("pressed-red"), 75);
  });
});

equalsOperator = document.querySelector("#equals");
equalsOperator.addEventListener("click", () =>
{
  Calculate();
});

window.addEventListener("keydown", (e) =>
{
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
  nums.forEach(num =>
  {
    if (screenText.textContent.includes("ERROR!") || screenText.textContent === "Fuck Off") Clear();
    if (num === "." && screenText.textContent.includes(".")) return;
    if (e.key == num) screenText.textContent += e.key;
    else return;
    numbers.forEach(number =>
    {
      if (number.id === e.key)
      {
        number.classList.toggle("pressed-red");
        window.setTimeout(() => number.classList.toggle("pressed-red"), 75);
      }
    });
  });
  
  const ops = ["divide", "multiply", "minus", "plus"]
  ops.forEach(op =>
    {
      operators.forEach(_operator =>
        {
          if (_operator.textContent == e.key && _operator.id == op)
          {
            if (screenText.textContent.includes("ERROR!") || screenText.textContent === "Fuck Off") Clear();
            if (operator == null) operator = e.key;
            else Calculate();
            operator = op;
            screenText.textContent += _operator.textContent;;
            _operator.classList.toggle("pressed-red");
            window.setTimeout(() => _operator.classList.toggle("pressed-red"), 75);
          }
        });
    });
  
  if (e.key === "Enter") Calculate();
  if (e.key === "Backspace" || e.key === "Delete") del();
});