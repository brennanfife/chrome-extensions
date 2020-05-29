// //* Called from App.js. Allows us to scrape the content

(() => {
  window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
  setTimeout(function() {
    //WAIT 1 second to scroll page
    let postingEntries = document.querySelectorAll("div.search-result__info");
    for (let i = 0; i < postingEntries.length; i++) {
      let linkElement = postingEntries[i].firstElementChild;
      // @ts-ignorets-ignore
      let link = linkElement.href.trim();
      let nameElement = linkElement.firstElementChild;
      // @ts-ignorets-ignore
      let name = nameElement.innerText.trim();
      let titleElement = linkElement.nextElementSibling;
      // @ts-ignorets-ignore
      let title = titleElement.innerText.trim();
      let locationElement = titleElement.nextElementSibling;
      let location = locationElement.innerHTML.trim();

      let person = {
        name,
        link,
        title,
        location
      };

      console.log(person);

      // Parse any JSON previously stored in allEntries
      let entries = JSON.parse(localStorage.getItem("allEntries"));
      if (entries == null) entries = [];
      localStorage.setItem("person", JSON.stringify(person));
      // Save allEntries back to local storage
      entries.push(person);
      localStorage.setItem("allEntries", JSON.stringify(entries));
    }
    alert("Check the console for data");
  }, 1000);
})();
