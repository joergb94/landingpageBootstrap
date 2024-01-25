
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
//section for jquery
$(document).ready(function () {

    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });

  $(".select2-basic").select2({
    width: 'resolve'
  });

 
  $('.search-query').bind("keyup change", function () {
    event.preventDefault();
    var filter = datasearch();
    getData(1, filter);
  });

});

function datasearch(answer) {

  data = (answer)
    ? {
      code: $('#codeSearch').val(),
      from: $('#dateFrom').val(),
      to: $('#dateTo').val(),

    }
    : {
      code: $('#codeSearch').val(),
      from: $('#dateFrom').val(),
      to: $('#dateTo').val(),
    };

  return data;
}



