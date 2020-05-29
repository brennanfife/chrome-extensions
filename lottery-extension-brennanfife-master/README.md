# To run extension

- 'npm i' to install dependencies
- 'npm run build' to create a build folder
- Then load it into chrome extensions.

Note: if running Windows, you may have to convert the typescript files insides the public folder (i.e. background.ts, clearIntervals.ts, and scrape.ts) over into javascript. To do so,
cd into the public folder and run 'tsc background.ts' for the background script and the same for the other two files. Then, inside manifest.json and App.js, make sure to update the extension names from .ts -> .js

https://www.youtube.com/watch?v=ASmGHJS75T8