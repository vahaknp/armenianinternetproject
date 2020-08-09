console.log('!');
chrome.tabs.onUpdated.addListener((tabID, info, tab) => {
  chrome.tabs.executeScript(tabID, { file: 'contentscript.js' });
});