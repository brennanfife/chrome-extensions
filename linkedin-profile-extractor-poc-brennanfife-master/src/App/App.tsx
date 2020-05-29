/* global chrome */
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Top,
  Middle,
  Bottom,
  Title,
  Form,
  PageSelector,
  Button,
  ListBody,
  Element,
  SaveButton
} from "./App.style";
import uuid from "uuid";

const handlePageChange = (page: Number) => {
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true, currentWindow: true },
    function(tabs) {
      let currentURL = tabs[0].url;
      let newURL;
      if (currentURL.includes("page=")) {
        do {
          currentURL = currentURL.slice(0, -1);
        } while (currentURL.charAt(currentURL.length - 1) !== "&");

        let pageLocation = `page=${page}`;
        newURL = currentURL!.concat(pageLocation);
        window.open(newURL);
      } else {
        let pageLocation = `&page=${page}`;
        newURL = currentURL!.concat(pageLocation);
        window.open(newURL);
      }
      return false;
    }
  );
};

const getEntries = () => {
  chrome.storage.local.get(["allEntries"], function(results) {
    alert(results);
  });
};

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  //TODO: DISABLE WHEN THERE IS NO LOCAL STORAGE
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  let savedList = [];
  const [listItems, setListItems] = useState([]);

  const handleScrape = () => {
    chrome.tabs.executeScript({ file: "scrape.ts" });
    setDisableSaveButton(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPage(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePageChange(page);
  };

  //TODO: get entries in current local storage and display them inside the extension list
  const handleSaveResults = () => {
    getEntries();
    // setListItems(
    //   savedList.map(person => <Element key={uuid()}>{person.name}</Element>)
    // );
  };

  return (
    <>
      <Top>
        <Title>LinkedIn Scrapper</Title>
        <Button type="button" onClick={handleScrape} isRed>
          Scrape Page
        </Button>
      </Top>
      <Middle>
        <Form>
          <PageSelector
            name="page"
            type="number"
            value={page}
            placeholder="#"
            min="1"
            max="100"
            onChange={handleChange}
          ></PageSelector>
          <Button type="submit" onClick={handleSubmit}>
            Change Page
          </Button>
        </Form>
      </Middle>
      <Bottom>
        <SaveButton
          type="button"
          disabled={disableSaveButton}
          onClick={handleSaveResults}
        >
          Save to List?
        </SaveButton>
        <ListBody>{listItems}</ListBody>
      </Bottom>
    </>
  );
};

export default App;
