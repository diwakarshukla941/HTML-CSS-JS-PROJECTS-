// Get elements
const form = document.getElementById("tip-form");
const billInput = document.getElementById("bill");
const tipSelect = document.getElementById("tip");
const customTipInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");

const tipEach = document.getElementById("tipEach");
const totalEach = document.getElementById("totalEach");
const msg = document.getElementById("msg");

// Show custom tip input if "Custom" selected
tipSelect.addEventListener("change", () => {
  if (tipSelect.value === "custom") {
    customTipInput.style.display = "block";
  } else {
    customTipInput.style.display = "none";
    customTipInput.value = "";
  }
});

// Handle calculation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value, 10);

  let tipPercent =
    tipSelect.value === "custom"
      ? parseFloat(customTipInput.value)
      : parseFloat(tipSelect.value);

  if (isNaN(bill) || bill <= 0) {
    msg.textContent = "❌ Please enter a valid bill amount.";
    msg.style.color = "red";
    return;
  }

  if (isNaN(tipPercent) || tipPercent < 0) {
    msg.textContent = "❌ Please enter a valid tip percentage.";
    msg.style.color = "red";
    return;
  }

  if (isNaN(people) || people <= 0) {
    msg.textContent = "❌ Number of people must be at least 1.";
    msg.style.color = "red";
    return;
  }

  msg.textContent = ""; // clear message

  // Calculate
  const tipTotal = (bill * tipPercent) / 100;
  const total = bill + tipTotal;

  const tipPerPerson = tipTotal / people;
  const totalPerPerson = total / people;

  // Update UI
  tipEach.textContent = tipPerPerson.toFixed(2);
  totalEach.textContent = totalPerPerson.toFixed(2);
});

// Handle reset
form.addEventListener("reset", () => {
  tipEach.textContent = "0";
  totalEach.textContent = "0";
  msg.textContent = "";
  customTipInput.style.display = "none";
});
