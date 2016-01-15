var defaultOptions = {}, 
	options = {}; // current values

function initOptions(form, options) {
	var input;
	for (item in options) {
		input = form.elements[item];
	
		if (!input) continue;
			
		if (typeof(options[item]) === 'boolean') {
			input.checked = options[item];
		} else {
			input.value = options[item];
		}
	}
};

function readOptions(form, options) {
	var input;
	for (item in options) {
		input = form.elements[item];
	
		if (!input) continue;
		
		if (typeof(options[item]) === 'boolean') {
			options[item] = input.checked;
		} else if (!isNaN(options[item]))  {
			options[item] = parseInt(input.value);
		} else {
			options[item] = input.value;
		}
	}
	return options;
};

function compareOptions(settings, options) {
	var result = true;
	for (item in options) {
		result = result && (settings[item] === options[item]);
		if (!result) {
			return result;
		}
	}
	return result;
}

function displayStatus(text, time) {
		var status = document.getElementById('status');
		status.textContent = text;
		setTimeout(function() {
			status.textContent = '';
		}, time);
}

function saveOptions() {
	options = readOptions(optionsForm, options);
	options.useDefault = compareOptions(options, defaultOptions);
	chrome.storage.sync.set(options, displayStatus('Options saved', 1500));
}

function restoreOptions() {
	chrome.runtime.getBackgroundPage(function (backgroundPage) {
		defaultOptions = backgroundPage.defaultOptions;
		chrome.storage.sync.get(defaultOptions, function(items) {
			options = items;
			initOptions(optionsForm, options);
		});
	});
}

/* DOM & Events */

var optionsForm = document.forms['options'];
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

function changeTab(){

	var page = this.id.replace('tab','page'),
		captions = document.getElementsByClassName('tab-caption'),
		tabs = document.getElementsByClassName('tab');
	
	for (i=0; i<captions.length; i++) {
		captions[i].classList.remove('active');
	}
	for (i=0; i<tabs.length; i++) {
		tabs[i].classList.remove('active');
	}
	document.getElementById(page).classList.add('active');
	this.classList.add('active');
	
	fixScroll();
}

var tabCaptions = document.getElementsByClassName('tab-caption');
for (i=0; i<tabCaptions.length; i++) {
	tabCaptions[i].addEventListener('click', changeTab);
}




/* force scroll to wrapper only, if any
	@todo: 13 = padding + border of wrapper... compute it somehow?
	@todo: is here a better way to do this than a timer? Do Chrome animate the slot?
*/
function fixScroll() {
	var wh = window.innerHeight,
		dh = document.body.offsetHeight;
//		document.getElementById('content-wrapper').style.height = 'auto';
		setTimeout(function() {
				wh = window.innerHeight;
			if (dh > wh) {
				document.getElementById('content-wrapper').style.height = 
					(wh - document.getElementById('buttons').offsetHeight - 
						document.getElementById('tabs-head').offsetHeight) + 'px'; 
			}
		}, 800);
}

window.onload = function() {
	fixScroll();
};



