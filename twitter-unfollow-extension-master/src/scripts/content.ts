/* global chrome */
import "chrome-extension-async";

const onMessage = (message: any, sender: any, sendResponse: any) => {
  let receivedParameters = message.parameter;
  console.log("Received Coordinates:", receivedParameters);
  (async () => {
    for (let i = 0; i < receivedParameters.length; i++) {
      try {
        let x = receivedParameters[i].x;
        let y = receivedParameters[i].y;
        let followButton: HTMLElement = document.elementFromPoint(
          x,
          y
        ) as HTMLElement;
        console.log("clicking unfollow: ", x, y);
        followButton.click();

        let confirmCoords: any = await getConfirmCoordinates();
        console.log("Confirm Coordinates:", confirmCoords);
        let confirmx = confirmCoords.confirmCoordinates[0].x;
        let confirmy = confirmCoords.confirmCoordinates[0].y;

        let confirmButton: HTMLElement = document.elementFromPoint(
          confirmx,
          confirmy
        ) as HTMLElement;
        console.log("clicking confirm: ", confirmx, confirmy);
        confirmButton.click();
      } catch (error) {
        console.log(error);
      }
    }

    //SCROLL
    const MAGIC_NUMBER = 10;
    window.scrollBy(0, document.body.clientHeight - MAGIC_NUMBER);
    sendResponse({
      message: "done",
    });
  })();
  return true;
};

const getConfirmCoordinates = async () => {
  let results = await chrome.runtime.sendMessage({
    msg: "captureConfirmCoords",
  });
  return results;
};

chrome.runtime.onMessage.addListener(onMessage);
