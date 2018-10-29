(function ($, Drupal) {
  Drupal.behaviors.pullquote = {
    attach: function (context) {
      var count = 1;
      var $pullquotes = $('span.pullquote', context);
      var $quote, $parent;
      var template = '<aside class="pullquote pullquote--_align_"><p>_quote_</p></aside>';

      function createPullquotes() {
        $pullquotes.each(function(){
          $quote = $(this).text();
          $parent = $(this).closest('p');
          $parent.prepend(template.replace('_quote_',$quote).replace('_align_', isOdd(count) ? 'right' : 'left'));
          count++;
        });
      }

      function isOdd(num) {
        return 'number'!==typeof num ? 'NaN' : !!(num % 2);
      }

      createPullquotes();
    }
  };
}(jQuery, Drupal));
