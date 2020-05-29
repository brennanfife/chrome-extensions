/* global chrome */
import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const scrapePage = (seconds: Number) => {
  let convertedSeconds: Number = 1000 * +seconds;
  chrome.tabs.executeScript(
    { code: "let convertedSeconds = " + convertedSeconds + ";" },
    function() {
      chrome.tabs.executeScript({ file: "scrape.ts" });
    }
  );
};

const App = () => {
  const [seconds, setSeconds] = useState(60);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSeconds(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrapePage(seconds);
  };

  const handleStopScraping = () => {
    chrome.tabs.executeScript({ file: "clearInterval.ts" });
  };

  return (
    <Wrapper>
      <Form>
        <Top>
          <Label htmlFor="secondsInput">Scrape every</Label>
          <Input
            name="secondsInput"
            type="number"
            value={seconds}
            placeholder="seconds"
            required
            min="1"
            onChange={handleChange}
          />
          <Span>seconds</Span>
        </Top>
        <Button type="submit" onClick={handleSubmit}>
          Start
        </Button>
        <StopButton type="button" onClick={handleStopScraping}>
          Stop
        </StopButton>
      </Form>
    </Wrapper>
  );
};

const lightRed = "#fc8181";
const red = "#f56565";
const darkRed = "#e53e3e";
const lightGreen = "#68d391";
const green = "#48bb78";
const darkGreen = "#38a169";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input`
  width: 2.5rem;
  text-align: center;
  font-size: 12px;
  padding: 0.5rem;
  margin: 10px;
  background-color: #e2e8f0;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: black;
  }
  &:focus {
    outline: 0;
  }
`;

const Span = styled.span``;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border-width: 4px;
  color: white;
  background-color: ${red};
  border-color: ${darkRed};
  &:hover {
    background-color: ${lightRed};
    border-color: ${red};
  }
  &:focus {
    outline: 0;
  }
`;

const StopButton = styled(Button)`
  margin-bottom: 1rem;
  background-color: ${green};
  border-color: ${darkGreen};
  &:hover {
    background-color: ${lightGreen};
    border-color: ${green};
  }
`;

export default App;
