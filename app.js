const BASE_URL = `https://api.frankfurter.app/latest?amount=1&from=EUR&to=INR`;



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;
  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${from}&to=${to}`;
  console.log("API URL:", URL);

  try {
    let response = await fetch(URL);
    let data = await response.json();
    console.log("API Response:", data);

    if (data.rates && data.rates[to]) {
      const finalAmount = data.rates[to];
      msg.innerText = `${amtVal} ${from} = ${finalAmount.toFixed(2)} ${to}`;
    } else {
      msg.innerText = "Exchange rate data not available.";
    }
  } catch (error) {
    msg.innerText = "Failed to fetch exchange rate.";
    console.error("Error fetching exchange rate:", error);
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
