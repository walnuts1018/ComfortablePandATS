import { PostMessage } from "./features/integrationModules/type";

// from ./src/features/integrationModules/index.ts
// CORS回避の為
chrome.runtime.onMessage.addListener((message :PostMessage, sender, sendResponse) => {
    if (!message) {
      sendResponse({status: false, message: "message is empty"});
    } else{
      fetch(message.url, {
        method: "POST",
        //headers: message.headers,
        body: JSON.stringify(message.data)
      })
      .then((response) => {
        if (response && response.ok) {
          sendResponse({status: true, message: "ok"});
        }
      })
      .catch((error) => {
        console.error(error);
        sendResponse({status: false, message: "failed to post"});
      });
    }
  
    return true;
  });