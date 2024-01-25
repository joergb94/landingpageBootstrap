
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {

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
      order: answer['order'],
      status: answer['status'],

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
    };

  return data;
}

//section for const js 
const providers = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.detail(my_url, id);
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url, '');
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id);
  },
  save: function (state, id = '') {
    var form = $('#provider-form').serialize();
    console.log(form);
    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/' + id;
      var type = "PUT";
    }

    actions.save(type, my_url, state, form);
  },

  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Provider?",
      text: "The Provider Will be Eliminated",
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
      title: "Do You Want To Restore The Provider?",
      text: "The Provider Will Be Restored",
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

