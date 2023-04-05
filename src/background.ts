// For debugging

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) {
      sendResponse({
        'status': false,
        'reason': 'message is missing'
      });
    } else if(message.contentScriptQuery === 'post') {
      fetch(message.endpoint, {
        'method': 'POST'
      })
      .then((response) => {
        if (response && response.ok) {
          sendResponse(true);
        }
      })
      .catch((error) => {
        sendResponse(false);
      });
    }
  
    return true;
  });