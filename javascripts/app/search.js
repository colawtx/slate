!function(e){"use strict";function t(){$("h1, h2").each(function(){var e=$(this),t=e.nextUntil("h1, h2");o.add({id:e.prop("id"),title:e.text(),body:t.text()})})}function i(){h=$(".content"),r=$(".dark-box"),a=$(".search-results"),$("#input-search").on("keyup",l)}function l(e){if(s(),a.addClass("visible"),27===e.keyCode&&(this.value=""),this.value){var t=o.search(this.value).filter(function(e){return e.score>1e-4});t.length?(a.empty(),$.each(t,function(e,t){a.append("<li><a href='#"+t.ref+"'>"+$("#"+t.ref).text()+"</a></li>")}),n.call(this)):(a.html("<li></li>"),$(".search-results li").text('No Results Found for "'+this.value+'"'))}else s(),a.removeClass("visible")}function n(){this.value&&h.highlight(this.value,u)}function s(){h.unhighlight(u)}var h,r,a,u=($(e),{element:"span",className:"search-highlight"}),o=new lunr.Index;o.ref("id"),o.field("title",{boost:10}),o.field("body"),o.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(t),$(i)}(window);