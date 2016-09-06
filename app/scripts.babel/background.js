'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

function getClickHandler() {
  return function({srcUrl}) {
    var url = 'info.html#' + srcUrl;
    chrome.windows.create({
      url,
      width: 920,
      height: 660
    });
  };
}

chrome.contextMenus.create({
  'title' : 'Identify this image',
  'type' : 'normal',
  'contexts' : ['image'],
  'onclick' : getClickHandler()
});
