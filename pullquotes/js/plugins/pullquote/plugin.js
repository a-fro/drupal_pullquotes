(function ($, Drupal, drupalSettings, CKEDITOR) {
  CKEDITOR.plugins.add('pullquote', {
    icons: 'pullquote',
    hidpi: false,

    init: function init(editor) {
      editor.addCommand('pullquote', {
        modes: { wysiwyg: 1 },
        canUndo: true,
        allowedContent: {
          span: {
            classes: {}
          }
        },
        exec: function exec(editor) {
          var selection = editor.getSelection();
          var selectedElement = getSelectedElement(editor);
          if (selectedElement && selectedElement.hasClass('pullquote')) {
            removePullquote(selectedElement);
          } else {
            addPullquote(selection);
          }
        }
      });

      var addPullquote = function(selection) {
        var style = new CKEDITOR.style( { element: 'span', attributes: { 'class': 'pullquote' } } );
        editor.applyStyle( style );
      };

      var removePullquote = function(element) {
        var style = new CKEDITOR.style( { element: 'span', attributes: { 'class': 'pullquote' }, type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 } );
        editor.removeStyle( style );
      };

      if (editor.ui.addButton) {
        editor.ui.addButton('Pullquote', {
          label: Drupal.t('Pullquote'),
          command: 'pullquote'
        });
      }

      var getSelectedElement = function(editor) {
        var selection = editor.getSelection();
        var selectedElement = selection.getSelectedElement();
        if (selectedElement && selectedElement.is('span')) {
          return selectedElement;
        }

        var range = selection.getRanges(true)[0];

        if (range) {
          range.shrink(CKEDITOR.SHRINK_TEXT);
          return editor.elementPath(range.getCommonAncestor()).contains('span', 1);
        }
        return null;
      }
    }
  });
})(jQuery, Drupal, drupalSettings, CKEDITOR);
