const buyPriceInput = document.querySelector("#buyPrice>input");
const sellPriceInput = document.querySelector("#sellPrice>input");
const spreadInput = document.querySelector("#Spread>input");
const amountInput = document.querySelector("#amount>input");

const buyPriceLabel = document.querySelector("#buyPrice label");
const sellPriceLabel = document.querySelector("#sellPrice label");
const spreadLabel = document.querySelector("#Spread label");

const buyFeeInput = document.querySelector("#buyFee>input");
const sellFeeInput = document.querySelector("#sellFee>input");

buyPriceLabel.classList.add("bg");
sellPriceLabel.classList.add("bg");
spreadInput.classList.add("output");

buyPriceLabel.addEventListener("mousedown", () => {
  buyPriceLabel.classList.toggle("bg");
  if (
    sellPriceLabel.classList.contains("bg") &&
    sellPriceLabel.classList.contains("bg")
  ) {
    {
      spreadLabel.classList.toggle("bg");
      spreadInput.classList.toggle("output");
      buyPriceInput.classList.toggle("output");
    }
  }
});

sellPriceLabel.addEventListener("mousedown", () => {
  if (buyPriceLabel.classList.contains("bg")) {
    sellPriceLabel.classList.toggle("bg");
    spreadLabel.classList.toggle("bg");

    if (sellPriceLabel.classList.contains("bg")) {
      spreadInput.classList.toggle("output");
      sellPriceInput.classList.toggle("output");
    } else {
      sellPriceInput.classList.toggle("output");
    }
  } else {
    sellPriceLabel.classList.toggle("bg");
    buyPriceInput.classList.toggle("output");
    sellPriceInput.classList.toggle("output");

    console.log(1);
  }
});

spreadLabel.addEventListener("mousedown", () => {
  if (buyPriceLabel.classList.contains("bg")) {
    sellPriceLabel.classList.toggle("bg");
    spreadLabel.classList.toggle("bg");

    if (spreadLabel.classList.contains("bg")) {
      sellPriceInput.classList.toggle("output");
      spreadInput.classList.toggle("output");
    } else {
      spreadInput.classList.toggle("output");
    }
  } else {
    spreadLabel.classList.toggle("bg");
    buyPriceInput.classList.toggle("output");
  }
});

buyPriceInput.addEventListener("input", operate);
sellPriceInput.addEventListener("input", operate);
amountInput.addEventListener("input", operate);
spreadInput.addEventListener("input", operate);

function roundNum(num) {
  return Math.round(num * 100) / 100;
}
// console.log(roundNum(3.145556));

function buyAndSellToSpread(buy, sell, amount) {
  console.log("buyAndSellToSpread");
  // spreadInput.disabled = true;
  const totalBuy = buy * amount;
  const totalSell = sell * amount;

  const discount = 0.38;
  const feePercent = (0.1425 / 100) * discount;
  const stockTax = 0.3 / 100;

  let buyFee = buy * feePercent * amount;
  buyFee = buyFee < 1 ? 1 : Math.round(buyFee);

  let sellFee = sell * feePercent * amount;
  sellFee = sellFee < 1 ? 1 : Math.round(sellFee);

  let sellTax = sell * stockTax * amount;
  sellTax = sellTax < 1 ? 1 : Math.round(sellTax);

  const finalBuy = totalBuy + buyFee;
  const finalSell = totalSell + sellFee + sellTax;
  buyFeeInput.value = roundNum(finalBuy);
  sellFeeInput.value = roundNum(finalSell);

  if (finalBuy && finalSell) {
    const spread = totalSell - totalBuy - buyFee - sellTax - sellFee;
    spreadInput.value = roundNum(spread);
  }
}

function buyAndSpreadToSell(buy, spread, amount) {
  console.log("buyAndSpreadToSell");

  const totalBuy = buy * amount;
  const discount = 0.38;
  const feePercent = (0.1425 / 100) * discount;
  const stockTax = 0.3 / 100;

  let buyFee = buy * feePercent * amount;
  buyFee = buyFee < 1 ? 1 : Math.round(buyFee);

  const finalBuy = totalBuy + buyFee;
  buyFeeInput.value = roundNum(finalBuy);

  if (finalBuy) {
    // spread + totalBuy + buyFee = totalSell - sellTax - sellFee;
    // spread + totalBuy + buyFee = sell * amount - sell * stockTax * amount - sell * feePercent * amount;
    // spread + totalBuy + buyFee = sell * amount *(1-stockTax-feePercent);
    // sell=(spread + totalBuy + buyFee)/ (amount* (1-stockTax-feePercent))  ;

    let sell =
      (spread + totalBuy + buyFee) / (amount * (1 - stockTax - feePercent));
    let sellFee = sell * feePercent * amount;
    let sellTax = sell * stockTax * amount;
    sellFee = sellFee < 1 ? 1 : Math.round(sellFee);
    sellTax = sellTax < 1 ? 1 : Math.round(sellTax);
    sell = (spread + totalBuy + buyFee + sellTax + sellFee) / amount;

    const totalSell = sell * amount;
    const finalSell = totalSell + sellFee + sellTax;

    sellFeeInput.value = roundNum(finalSell);
    sellPriceInput.value = roundNum(sell);
  }
}

function operate() {
  let buy = parseFloat(buyPriceInput.value);
  let sell = parseFloat(sellPriceInput.value);
  let amount = parseFloat(amountInput.value);
  let spread = parseFloat(spreadInput.value);

  if (
    buyPriceLabel.classList.contains("bg") &&
    sellPriceLabel.classList.contains("bg")
  ) {
    buyAndSellToSpread(buy, sell, amount);
  } else if (
    buyPriceLabel.classList.contains("bg") &&
    spreadLabel.classList.contains("bg")
  ) {
    buyAndSpreadToSell(buy, spread, amount);
  }
}
