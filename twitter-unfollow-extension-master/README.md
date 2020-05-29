# Twitter Mass Unfollowing

A TypeScript-based, Chrome Extension that utilizes a ML API to allow users to automatically unfollow all those who they are currently following.

## Installation

First, make sure you have [Node](https://nodejs.org/) installed and [Docker](https://docs.docker.com/get-docker/) installed and running on your machine via the Daemon.

Then, make sure you have the [api](https://gitlab.com/bitbrokerlabs-group/twitter-following-button-api) properly set up and running by navigating inside the folder directory (currently on dev branch) and running `docker-compose up`.

Next, navigate to the root of the client (i.e. this folder) and run `npm install` => `npm run build`

Finally, navigate to [chrome://extensions/](chrome://extensions/) inside Google Chrome. From there, turn on 'Developer mode', which will be located in the top, right corner. From there, click the 'Load unpacked' button, and select the build (i.e. `dist`) folder, which will have the required manifest.json file.
**NOTE**: After each additional change to the client, make sure to run `npm run build` inside the client, wait for it to finish building, and then click the refresh icon inside the Chrome extension card.

If the Chrome extension comes back with an error regarding the manifest.json's `content_security_policy`, follow this [link](https://stackoverflow.com/questions/25625412/chrome-extension-content-security-policy-executing-inline-code) or simply replace the hash chrome gives back to you.

If you'd like to debug, you can do so by clicking the _Inspect views background page_.

## Usage

## background.ts

- Extensions are event based programs used to modify or enhance the Chrome browsing experience. Events are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab. Extensions monitor these events in their **[background script](https://developer.chrome.com/extensions/background_pages)**, then react with specified instructions.

### In this extension, the background script will

- Take a screenshot of the current twitter tab i.e. **captureTab()**
- Send a POST request to the screenshot file to the API via axios i.e. **apiCall()**
- Send a message to the content script to provide it with coordinates i.e. **sendMessage**
- Listen for the content scripts request for confirmation button coordinates i.e. **chrome.runtime.onMessage.addListener**

## content.ts

- **[Content scripts](https://developer.chrome.com/extensions/content_scripts)** are files that run in the context of web pages. By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them and pass information to their parent extension.

### In this extension, the content script will

- Clicks the unfollow buttons with the corresponding coordinates provided by the background script
- In between each click of the unfollow button(s), it can call for the confirmation modals confirm button, i.e. **getConfirmCoordinates()**, in which it 'asks' (i.e. sends a message) the background script to take a screencap and find the coordinates of the confirmation button inside the confirmation modal.
- Once it has gone through the array of coordinates, it will scroll down one page view and then call the background script to begin the process again i.e. **scroll()**
