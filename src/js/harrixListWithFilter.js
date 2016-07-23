 /*
 * File: harrixListWithFilter.js
 * Desc: list with filter.
 * Requires: jQuery.
 * License: MIT.
 */
(function( $ ){

  $.fn.harrixListWithFilter = function(ul, input, options) {
    
    //plugin settings
    var defaults = {
      clearListStyle : true,
      searchBy : 'content',
      functionSearch: findString,
      collapsedStart: true,
	  }; 
    settings = $.extend({}, defaults, options);

    //launch processing filter
    $(input)
    .change(function() {
      doFilter($(ul), $(input).val().toLowerCase());
    })
    .on('keyup paste', function () {
      setTimeout(function () {
        $(input).change();
      }, 100);
    });
    
    //$(ul).click(handler);
    //$(ul).find("ul").hide;
    
    console.log(settings.findString);
    console.log(findString);
    
    //bypassing all items
    listTraversal ($(ul).children());
    
    return this;
  };
  
  function handler(event) {
    var target = $(event.target);
    if (target.is("li")) {
      target.children().toggle();
    }
  }
  
  function listTraversal (children)
  {
    if (children.length > 0) {
      $.each( children, function( i, element ) {
        var element = $(element);        
        workWithElement (element);        
        listTraversal(element.children());
      });
    }        
  }
  
  function workWithElement (element) {
    
    if (settings.clearListStyle == true)
      element.css('list-style', 'none');
    
    if (element.children().length > 0)
      element.css('cursor', 'pointer');
    else
      element.css('cursor', 'default');
    
    /*element.click(function(event) {
      if (this == event.target) {
        var element = $(this);    
        var text = getTextFromLiInNestedList(element);  
        alert( text );
      }
    });*/
    
  }

  function doFilter(obj, filter) {
    var showObj = false;
    $.each( obj.children(), function( i, element ) {
      var li = $(element);
      if (li.is('li')) {
        var show = checkChildren( li.children(), filter );
        if (show == false)
          show = settings.functionSearch( getTextFromLiInNestedList(li).toLowerCase(), filter );
          //show = findString( getTextFromLiInNestedList(li).toLowerCase(), filter );
        if (show == true)
          li.show();
        else
          li.hide();
        if (show == true)
          showObj = true;
      }
    });
    if (obj.is('li'))
      if (showObj == true)
        obj.show();
      else
        obj.hide();
    return showObj;
  };
  
  function getTextFromLiInNestedList (element)
  {
    var text;
    if (settings.searchBy == 'content')
      text = element.text();
    if (settings.searchBy == 'value') {
      text = element.data('value');
      if (text === undefined) {
        text = element.text();
      }
      else if (!text.trim()) {
        text = element.text();
      }
    }
    //console.log(text);
    return text;
  }
  
  function checkChildren(children, filter) {
    var show = false;
    if (children.length > 0) {
      $.each( children, function( i, element ) {
        if (doFilter($(element), filter) == true)
          show = true;
      });
    }
    return show;      
  };
  
  function findString(text, textFind) {
    alert(1);
    var find = false;
    if (text.indexOf(textFind) >= 0)
      find = true;
    return find;      
  };

})( jQuery );