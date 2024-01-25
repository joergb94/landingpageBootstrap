var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {

  $('.search-query').bind("keyup change", function () {
    event.preventDefault();
    getHome();
  });


});

function getHome() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $('#index_blade').hide();
  $('#loading').show();
  var form = {
    date: $('#datesearch').val(),
    type: $('#typesearch').val(),
  };
  // Populate Data in Edit Modal Form
  $.ajax({
    type: "GET",
    url: url,
    data: form,
    success: function (data) {
      console.log(data);
      $('#loading').hide();
      $("#show_blade").hide();
      $('#index_blade').show();
      $("#index_blade").empty().html(data);
    }
  });
}

const sales = {
  back: function () {
    actions.back();
  },
  detail: function (location, id) {
    var my_url = baseUrl + '/sales/' + location + '/detail/' + id;
    actions.show(my_url, id, 'form');
  },
  delete: function (location, id) {
    Swal.fire({
      title: "Do You Want To Delete The Delivery?",
      text: "The Delivery Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = baseUrl + '/sales/' + location + '/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "DELETE",
          url: my_url,
          success: function (data) {
            messages(data);
            getHome();
          },

          error: function (data) {
            console.log('Error:', data);
            messageserror(data);

          }
        });
      }
    });

  },
  restored: function (location, id) {
    Swal.fire({
      title: "Do You Want To Restore The Delivery?",
      text: "The Delivery Will be Restored.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restored It!'
    }).then((result) => {
      if (result.value) {
        var my_url = baseUrl + '/sales/' + location + '/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "DELETE",
          url: my_url,
          success: function (data) {
            messages(data);
            getHome();
          },

          error: function (data) {
            console.log('Error:', data);
            messageserror(data);

          }
        });
      }
    });
  },
  delivery: function (location, id) {
    Swal.fire({
      title: "Do You Want To Change The Delivery Status?",
      text: "The Delivery Will Change State.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var my_url = baseUrl + '/sales/' + location + '/delivery/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "get",
          url: my_url,
          success: function (data) {
            messages(data);
            getHome();
          },

          error: function (data) {
            console.log('Error:', data);
            messageserror(data);

          }
        });
      }
    });
  },
  payout: function (location, id) {
    Swal.fire({
      title: "Is This Delivery At The Office?",
      text: "The Delivery Will Change State.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var my_url = baseUrl + '/sales/' + location + '/payout/' + id;
        if (!actions.status(my_url)) {
          window.location.reload();
        }
      }
    });
  },
};

//section for const js 
const reminders = {
  create: function (location) {
    var my_url = baseUrl + '/reminders/' + location + '/create';
    actions.show(my_url, '', true, true);
  },
  status: function (location, id) {
    Swal.fire({
      title: "It's Ready This Reminder?",
      text: "The Reminder Will Be Finished",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Finished It!'
    }).then((result) => {
      if (result.value) {
        var my_url = baseUrl + '/reminders/' + location + '/active/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
            type: "GET",
            url: my_url,
            success: function (data) {
              messages(data);
              getHome();
            },
  
            error: function (data) {
              console.log('Error:', data);
              messageserror(data);
  
            }
        });
      }
    });
  },
  save: function (location, state, id = '') {
    var form = $('#category-form').serialize();
    var my_url = baseUrl + '/reminders/' + location + '/create';
    var type = "POST";
    var title = $('#title').val();
    if (title.length > 0) {
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
          type: "POST",
          url: my_url,
          data: form,
          success: function (data) {
            messages(data);
            $("#show_blade2").hide();
            $(".modal-backdrop").remove()
            getHome();
          },

          error: function (data) {
            console.log('Error:', data);
            messageserror(data);

          }
      });
    
    }
  },
};
