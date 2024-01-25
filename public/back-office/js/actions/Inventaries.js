
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {

  $('.search-query').bind("keyup change", function () {
    event.preventDefault();
    var filter = datasearch();
    getData(1, filter);
  });

  $(".select2-basic").select2({
    width: 'resolve'
  }); 

});

function datasearch(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      category: $('#categorysearch').val(),
      provider: $('#providersearch').val(),

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      category: $('#categorysearch').val(),
      provider: $('#providersearch').val(),

    };

  return data;
}


function calculate_totalQ() {
  qn = $('#quantity').val() != null && $('#quantity').val() != '' ? $('#quantity').val() : 0;
  total = $('#quantity_total').val();
  stock = $('#stock').val();
  Qin = $('#quantity_in').val();
  Qout = $('#quantity_out').val();
  res = parseInt(stock) + parseInt(Qin) + parseInt(Qout) + parseInt(qn);
  valres = res > 0 ? res : 0;

  resP = parseInt(stock) + parseInt(qn);
  valresP = resP > 0 ? resP : 0;

  $('#quantityNowTotal').html(valres + ' piece(s)');
  $('#quantityNowStock').html(valresP + ' piece(s)');
}
//section for const js 
const inventory = {
  detail: function (id) {
    var my_url = url + '/' + id + '/detail';
    actions.detail(my_url, id);
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url, '');
  },
  edit: function (id, option) {
    var my_url = url + '/' + id + '/' + option;
    actions.show(my_url, id);
  },
  save: function (state, id = '') {

    var formData1 = document.getElementById('inventory-form');
    var form1 = new FormData(formData1);
    form1.append("total_content", $("#total_content").val());
    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/' + id;
    } else if (state == 'updateQ') {

      var my_url = url + '/quantity/' + id;
    }
    actions.save(type, my_url, state, form1, 'file');
  },

  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Device?",
      text: "The Device Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.delete(my_url);
      }
    });

  },
  restored: function (id) {
    Swal.fire({
      title: "Do You Want To Restore The Device?",
      text: "The Device Will be Restored",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restore It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.restored(my_url);
      }
    });
  },
};

const print = {
  csv: function () {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var filter = datasearch();
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      type: "GET",
      url: url + '/print',
      data: filter,
      success: function (data) {
        inventory.add_table(data);
        $("#tableDelivery").tableHTMLExport({ type: 'csv', filename: `${$('#providersearch option:selected').text()}_inventory_${hoy.toISOString()}.csv` });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },

  pdf: function () {
    var filter = datasearch();
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      type: "GET",
      url: url + '/print',
      data: filter,
      success: function (data) {
        inventory.add_table(data);
        $("#tableDelivery").tableHTMLExport({ type: 'pdf', filename: `${$('#providersearch option:selected').text()}_inventory_${hoy.toISOString()}.pdf` });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }
};

