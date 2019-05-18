var analyticsID = 'UA-57642578-2';
var VERSION = 'v0.1.0-1';

// Load in the header and google analytics.
$(document).ready(function () {
	$('#header').load('header.html', function () {
		prepareHeader();
		// Analytics needs to be loaded after header to ensure header in DOM
		googleAnalytics();
	});

	$('#version').text(VERSION);
	$('.dlink').each(function () {
		this.href =
			'https://github.com/forgedsoftware/measurementjs/releases/download/'
			+ this.href + VERSION + '/' + this.text;
	});
});

function prepareHeader() {
	$('#menu').click(function () {
		// Can't just use .toggle() here as that never clears element.style
		var val = $('#header-content').css('display');
		if (val !== 'none') {
			$('#header-content').css('display', '');
		} else {
			$('#header-content').css('display', 'block');
		}
	});

	$(document).click(function (e) {
		var clicked = '#' + e.target.id;
		if (clicked != '#header-content' && clicked != '#menu') {
			$("#header-content").css('display', '');
		}
	});
}

function googleAnalytics() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', analyticsID, 'auto');

	//Track Pageviews
	ga('send', 'pageview');

	// Track Downloads
	$('.dlink').click(function (e) {
		ga('send', 'event', 'download', 'click', e.target.text);
	});

	// Track external links
	$('a').click(function (e) {
		// Check if external link
		if (e.target.href.indexOf('http') == 0) {
			ga('send', 'event', 'outbound', 'click', e.target.text);
		}
	});
}
