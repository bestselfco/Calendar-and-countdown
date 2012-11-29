/**
Google tracking for all pages that include functions.js
*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21196533-2']);

_gaq.push(['_setCustomVar',
      1,                   // This custom var is set to slot #2.  Required parameter.
      'popup', // The name of the custom variable.  Required parameter.
      settings.popup,               // The value of the custom variable.  Required parameter.
                           //  (you might set this value by default to No)
      2                    // Sets the scope to session-level.  Optional parameter.
   ]);

//Disable tracking here, to be done somewhere else!
//_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

