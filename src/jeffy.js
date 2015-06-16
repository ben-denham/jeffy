/*
 The MIT License (MIT)

 Copyright (c) 2015 ben-denham

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

;(function($) {

  // Utility function to retrieve the hash component of the current
  // window's location.
  function getHash() {
    var hash;
    if (window.location.hash) {
      hash = window.location.hash;
    }
    else if (document.location.hash) {
      hash = document.location.hash;
    }
    else if (location.hash) {
      hash = location.hash;
    }
    // If there is no hash, default to '#'.
    return hash ? hash : '#';
  }

  // Function to initialise jeffy on the page.
  function init(element, defaultPartial, routes) {
    // Create function to be called each time the location hash
    // changes.
    var hashChange = function() {
      var hash = getHash();
      // Find the template for the hash, or fall back to the default
      // template.
      var partial = routes[hash] || defaultPartial;
      // Retrieve the partial file.
      $.ajax(partial).then(function(html) {
        // Replace the contents of the element with the loaded HTML.
        $(element).html(html);
      });
    };

    // Call hashChange() whenever the hashchange event fires on the
    // window.
    $(window).on('hashchange', hashChange);

    // Call hashChange()
    hashChange();

    // Return this to allow jQuery method chaining.
    return this;
  }

  // Provide jeffy as a jQuery plugin.
  $.fn.jeffy = function(defaultPartial, routes) {
    init(this, defaultPartial, routes);
  };

  // Provide a jeffy object on the window for alternative usage.
  window.jeffy = {
    init: init
  };

})(jQuery);
