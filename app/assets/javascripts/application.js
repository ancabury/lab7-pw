//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).on('click', 'td', function(){
    var row_index = $(this).parent().index();
    var col_index = $(this).index();
    console.log(row_index + " " + col_index);
    $.ajax({
      type: 'GET',
      url: '/next',
      data: $.param({ col: col_index, line: row_index}),
      success: function(data) {
        $('#content').html(data);
      }
    });
});
