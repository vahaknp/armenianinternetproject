console.log('Initializing background script...');
chrome.tabs.onUpdated.addListener((tabID, info, tab) => {
  chrome.tabs.executeScript(tabID, { file: 'contentscript.js' });
});
