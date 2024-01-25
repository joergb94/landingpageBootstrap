
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

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      category: $('#categorysearch').val(),

    };

  return data;
}

function calculate_total() {
  $stock = $('#stock').val();
  $quantity_in = $("#quantity_in").val();
  $quantity_out = $("#quantity_out").val();
  $total = parseInt($stock) + parseInt($quantity_in) + parseInt($quantity_out);
  $("#total_supply").val($total);
}

$(document).on('click', '#addCategory', function() {
  $('#FormModal').modal('hide');
  $('#ModalCategory').modal('show');
});

//section for const js 
const supplys = {
  detail: function (id) {
    var my_url = url + '/' + id;
    console.log(my_url);
    actions.detail(my_url, id);
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url);
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id);
  },
  save: function (state, id = '') {

    var formData1 = document.getElementById('supply-form');
    var form1 = new FormData(formData1);
    form1.append("total_supply", $("#total_supply").val());
    console.log(form1);
    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/' + id;
    }
    actions.save(type, my_url, state, form1, 'file');
  },

  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Device?",
      text: "The Device Will Be Removed",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!',
      cancelButtonText: 'Cancel'
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
      text: "The Device Will Be Restored",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restore It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.restored(my_url);
      }
    });
  },
};

