
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
var supp = $('#supply_id').val();

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
      search: $('#search').val(),
      type: $('#typesearch').val(),
      criterion: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      status_id : $('#statuss_id').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      barcode: $('#barcode').val(),
      cost_center: $('#cost_center_search').val(),

    }
    : {
      search: $('#search').val(),
      barcode: $('#barcode').val(),
      type: $('#typesearch').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      status_id : $('#statuss_id').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      cost_center: $('#cost_center_search').val(),


    };

  return data;
}



//section for const js 
const supplys = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.detail(my_url, id);
  }
}

