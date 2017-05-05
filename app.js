
// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
    var itemsHTML = state.items.map(function(item) {
      var template = [
        '<li>',
          '<span class="shopping-item">@title</span>',
          '<div class="shopping-item-controls">',
            '<button class="shopping-item-toggle">',
              '<span class="button-label">check</span>',
            '</button>',
            '<button class="shopping-item-delete">',
              '<span class="button-label">delete</span>',
            '</button>',
          '</div>',
        '</li>'
      ].join('');

      var output = template.replace('@title', element.title);
      return output;
    });
    element.html(itemsHTML);
}

// Event listeners
//add to shopping list
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    // renderList(state, $('.shopping-list'));
    console.log("something happened");
});
//check as complete
$( ".shopping-list" ).on( "click", ".shopping-item-toggle", function( event ) {
    event.preventDefault();
    $(this).parent().parent().find('.shopping-item').toggleClass('shopping-item__checked');
});
//delete item
$( ".shopping-list" ).on( "click", ".shopping-item-delete", function( event ) {
    event.preventDefault();
    $(this).parent().parent().remove();
});
