 (function() {
	var checkState = setInterval(function() {
	  if (document.readyState === 'complete') {
		clearInterval(checkState);
  
		const leeturl = chrome.runtime.getURL('data/leetcode.json');
		const leeticon = chrome.runtime.getURL('icons/leetcode.png');
		addUrls(leeturl, leeticon);
  
		const gfgurl = chrome.runtime.getURL('data/gfgdata.json');
		const gfgicon = chrome.runtime.getURL('icons/gfg.png');
		addUrls(gfgurl, gfgicon);
	  }
	}, 10);
  })();
  
  const rqt =
	  async (url) => {
	const response = await fetch(url);
	const json = await response.json();
	return json;
  }
  
  const urlRe = /(https:\/\/www\.interviewbit\.com\/problems\/[^\/]*\/)/;
  const urlRe2 = /(https:\/\/www\.pepcoding\.com\/resources\/online-java-foundation\/stacks-and-queues\/[^\/]*\/)/;
  function getURL(url) {
	// Injecting leetcode links 
	if (url.includes('#')) return '';
	if (urlRe.test(url)) {
	  return url.match(urlRe)[1];
	}
	if (urlRe2.test(url)) {
		return url.match(urlRe2)[1];
	}
	return url;
  }
  
  async function addUrls(url, icon) {
	var currentUrl = getURL(window.location.href);
	const metadata = await rqt(url);
  
	function addLinkHere() {
	  var url = getURL(this.href);
	  if (url in metadata) {
		var platformUrl = metadata[url];
		var button = $('<a/>').attr(
			{style: 'margin-right:10px', target: '_blank', href: platformUrl});
		var img =
			$('<img id="dynamic" class="lc-icon-big">').attr({'src': icon})
		button.append(img);
		button.appendTo(this.parentNode);
	  }
	}
  
	// Problem Page
	if (currentUrl in metadata) {
	  var platformUrl = metadata[currentUrl];
	  var button = $('<a/>').attr({
		type: 'button',
		style: 'margin-right:10px',
		target: '_blank',
		href: platformUrl
	  });
	  button.addClass('pull-right');
	  button.addClass('btn');
	  button.addClass('btn-default');
	  var img = $('<img id="dynamic" class="lc-icon">').attr({'src': icon})
	  button.append(img);
	  $('.problem-action-wrapper').append(button);
	  setTimeout(() => $('a').each(addLinkHere), 3000);
	} else {
	  $('a').each(addLinkHere);
	}
  }
  