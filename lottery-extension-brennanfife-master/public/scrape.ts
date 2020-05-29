(() => {
  setInterval(function() {
    let pageEntries = document.querySelectorAll("tr.lotteryResultsTable-tr");
    for (let i = 0; i < pageEntries.length; i++) {
      let nameElement = pageEntries[i].firstElementChild;
      let name = nameElement
        .querySelector("a.lotteryResultsTable-link")
        .innerText.trim();
      let winningNumbersParentElement = pageEntries[i].querySelector(
        "div.lotteryResultsTable-regular"
      );
      let winningNumbersChildElements = winningNumbersParentElement.querySelectorAll(
        "dd.lotteryResultsTable-ball"
      );
      let winningNumbers = [];
      for (let i = 0; i < winningNumbersChildElements.length; i++) {
        let numberText = winningNumbersChildElements[i].innerText.trim();
        winningNumbers.push(numberText);
      }
      let drawDateElement = pageEntries[i].querySelector(
        "div.lotteryResultsTable-details-lastDraw .lotteryResultsTable-time"
      );
      let drawDate = drawDateElement.innerText.trim();
      alert(
        "LOTTERY: " +
          name +
          "\nNUMBERS: " +
          winningNumbers +
          "\nDRAW DATE: " +
          drawDate
      );
    }
    // @ts-ignore
  }, convertedSeconds);
})();
