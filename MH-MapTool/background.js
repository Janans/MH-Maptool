// chrome.tabs.executeScript(null, {file:"contentscript.js"});

/* page action rules

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: '.mechhero.', pathContains: 'World.' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

*/

var defaultOptions = {
		'gridLines' : true,
		'portals' : false,
		'fieldValue' : true,
		'city' : 'none',
		'scanDebris' : false,
		'scanDelayTime' : 220,
		'keepDebrisTime' : 300,
		'rescanDebrisTime' : 1,
		'scanNpc' : false,
		'countHarvest' : false,
		'roundHarvs' : 3,
		'harvsButtonAll' : false,
		'harvsButtonStuff' : false,
		'harvsButtonMinus' : false,
		'defaultButton' : 'native',
		'useDefault' : true
	};


