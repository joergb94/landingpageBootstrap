
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
      criterion: $('#typesearch').val(),
      employeesearch: $('#employeesearch').val(),
      order: answer['order'],
      status: answer['status'],
      date: $('#datesearch').val(),


    }
    : {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      criterion: $('#typesearch').val(),
      employeesearch: $('#employeesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      date: $('#datesearch').val(),



    };

  return data;
}

//section for const js 
const googleaccount = {
  back: function () {
    actions.back();
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
    var form = $('#google-form').serialize();
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
      title: "Do You Want to Delete the Account",
      text: "The Account Will be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete it!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.delete(my_url);
      }
    });

  },
  restored: function (id) {
    Swal.fire({
      title: "Do You Want To Restore The Account?",
      text: "The Account Will Be Restorerd",
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

