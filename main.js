const chf = document.getElementById("chf");
const eur = document.getElementById("eur");
const gbp = document.getElementById("gbp");
const jpy = document.getElementById("jpy");
const api_key = ""; // insert here your own API key
const convertButton = document.getElementById("convert-button");
const currencyFrom = document.getElementById("currency-from");
const currencyTo = document.getElementById("currency-to");
const selectList = document.getElementsByClassName("select-list");
const enteredAmount = document.getElementById("entered-amount")
const convertedAmount = document.getElementById("converted-amount")


fetch(`https://openexchangerates.org/api/latest.json?app_id=${api_key}`) 
.then(res => res.json())
.then(data => {
  const rates = data.rates
  const chfCurrencyRate = data.rates['CHF']
  const eurCurrencyRate = data.rates['EUR']
  const gbpCurrencyRate = data.rates['GBP']
  const jpyCurrencyRate = data.rates['JPY']
  const keysTab = []

  chf.innerHTML = chfCurrencyRate.toFixed(2)
  eur.innerHTML = eurCurrencyRate.toFixed(2)
  gbp.innerHTML = gbpCurrencyRate.toFixed(2)
  jpy.innerHTML = jpyCurrencyRate.toFixed(2)

  const currencyKeys = Object.keys(rates);
  // for each key in available rates
  currencyKeys.forEach((key) => {
    keysTab.push(`<option value=${key}>${key}</option>`)
  })

  // populating select tags with options
  currencyFrom.innerHTML = keysTab;
  currencyTo.innerHTML = keysTab;
})


convertButton.addEventListener("click", () => {
  fetch(`https://openexchangerates.org/api/latest.json?app_id=${api_key}`)
  .then(res => res.json())
  .then(data => {
    // passing to function currency codes and amount to be converted
    // and those codes are the values from select tags
    let convertedCurrency = convertCurrency(data.rates[`${currencyFrom.value}`], data.rates[`${currencyTo.value}`], `${enteredAmount.value}`);
    convertedAmount.value = convertedCurrency.toFixed(2) + ' ' + `${currencyTo.value}`
  })
})


function convertCurrency(fromRate, toRate, amount) {
  let convertedAmount = (amount / fromRate ) * toRate;
  return convertedAmount 
}