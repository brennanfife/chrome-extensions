/* global chrome */
import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

export const H3 = styled.h3`
  text-align: center;
`;

export const Link = styled.a`
  cursor: pointer;
`;

export const Button = styled.button`
  cursor: pointer;
  font-weight: 700;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border-width: 0.5rem;
  color: white;
  background-color: #08a0e9;
  border: 2px solid #0084b4;
  &:hover {
    background-color: #1dcaff;
    border-color: #08a0e9;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #80e1ff;
    border: 2px solid #84d4fb;
  }
`;

const App: React.FC = () => {
  const regex = RegExp("https://(?:www)?twitter.com/([a-zA-Z0-9_]+)/following");
  const [currentURL, setCurrentURL] = useState(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tabURL = tabs[0].url;
      setCurrentURL(tabURL);
    });
  }, [currentURL]);

  const handleLink = () => {
    chrome.tabs.create({ url: "http://www.twitter.com/following" });
  };

  const handleButton = () => {
    window.close();
    chrome.runtime.sendMessage({ msg: "start" });
  };

  if (!currentURL) return <h1>Loading...</h1>;
  else {
    return (
      <Wrapper>
        <H3>
          To begin, navigate to those you{" "}
          <Link onClick={() => handleLink()}>follow</Link>
        </H3>
        <Button
          disabled={!regex.test(currentURL)}
          onClick={() => handleButton()}
        >
          Start
        </Button>
      </Wrapper>
    );
  }
};

export default App;

// --------------

const GlobalStyle = createGlobalStyle`
 * {
     box-sizing: border-box;
 }

 body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightgray;
  }

  a {
    color: red;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);
