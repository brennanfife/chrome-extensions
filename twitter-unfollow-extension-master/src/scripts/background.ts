// /* global chrome */
import axios from "axios";
import "chrome-extension-async";
let focusedOnFollowingButtons: boolean;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === "start") start();
  else if (request.msg === "captureConfirmCoords") {
    (async () => {
      let confirmCoordinates = await getConfirmCoordinates();
      sendResponse({ confirmCoordinates });
    })();
  }
  return true;
});

async function start() {
  focusedOnFollowingButtons = true;
  let screenshotImage = await captureTab();
  let apiCoordinates = await apiCall(screenshotImage);
  if (apiCoordinates.length !== 0) sendMessageToContentScript(apiCoordinates);
  else if (apiCoordinates.length === 0) alert("Process Complete");
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function captureTab() {
  await delay(3000);
  let data = new FormData();
  let dataURL = await chrome.tabs.captureVisibleTab();
  function dataURLtoFile(dataUrl: string, filename = "file.jpg") {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1;
    }
    return new File([u8arr], filename, { type: mime });
  }
  const file = dataURLtoFile(dataURL);

  console.log("Focused on Following Buttons? ", focusedOnFollowingButtons);

  if (focusedOnFollowingButtons) data.append("image_follow", file);
  else data.append("image_unfollow", file);

  return data;
}

async function apiCall(data: FormData) {
  try {
    let axiosResults = await axios.post(
      "http://127.0.0.1:5000/twitter/following-buttons",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    let twodimensionalArray = axiosResults.data.Coordinates;
    let objectSet = twodimensionalArray.map((x: any) => {
      return {
        x: x[0],
        y: x[1],
      };
    });
    return objectSet;
  } catch (err) {
    console.log(err);
  }
}

function sendMessageToContentScript(
  unfollowButtonCoordinates: { x: number; y: number }[]
) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { parameter: unfollowButtonCoordinates },
      ({ message }) => {
        if (message === "done") start();
      }
    );
  });
}

async function getConfirmCoordinates() {
  focusedOnFollowingButtons = false;
  let screenshotImage = await captureTab();
  let apiCoordinates = await apiCall(screenshotImage);
  console.log("results from getConfirmCoordinates(): ", apiCoordinates);
  return apiCoordinates;
}
