
var url = $('#url').val();
clearload();

setTimeout(function() {
  $('.spinner-wrapper').hide();
  sidebarOpen()
  $("#full-content").removeClass("sidebar-must-hide");
}, 500);



$(document).ready(function () {
  

  $(".button-menu-dad").click(function(){
    $("#menuSon").toggle();
  });

  $(".button-menu-dad-m").click(function(){
    $("#menuSonM").toggle();
  });

  
});

function returnsubmod(data) {
  messages(data);
  $("#index_blade2").show();
  $("#show_blade2").hide();
  $("#FormModalSN").modal('hide');
  $("#FormModalCSN").modal('hide');
}


const actions = {
  save: function (type, my_url, state, form, actions = '', view = '') {
    var st = state;
    $('.btn-save').prop("disabled", true);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
  
    
    no = $('#page_no_data').val();

    switch (actions) {
      case "file":
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          contentType: false,
          cache: false,
          processData: false,
          success: function (data) {
            console.log('Error:', data);
            $('.btn-save').prop("disabled", false);
            messages(data);
            if(st == 'add'){
                n = 1;
            }else{
              if (no) {
                n = no;
              } else {
                n = 1;
              }
            }
           
            getData(n, datasearch(data), data);

            $("#index_blade").show();
            $("#show_blade").hide();
            if (!view) {
              $("#FormModal").modal('hide');
            }


          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
          }
        });
        break;
      case 'submod':
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          success: function (data) {
            $('.btn-save').prop("disabled", false);
            //messages(data);
            returnsubmod(data);
          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
            returnsubmodError(data);
          }
        });
        break;
      default:
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          success: function (data) {
            console.log('Error:', data);
            $('.btn-save').prop("disabled", false);
            messages(data);

            if (no) {
              n = no;
            } else {
              n = 1;
            }
            getData(n, datasearch(data), data);

            $("#index_blade").show();
            $("#show_blade").hide();
            if (!view) {
              $("#FormModal").modal('hide');
            }
          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
          }
        });
    }
  },
  save_no_get: function (type, my_url, state, form, actions = '', view = '') {
    var st = state;
    $('.btn-save').prop("disabled", true);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
  
    
    no = $('#page_no_data').val();

    switch (actions) {
      case "file":
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          contentType: false,
          cache: false,
          processData: false,
          success: function (data) {
            console.log('Error:', data);
            $('.btn-save').prop("disabled", false);
            messages(data);
            if(st == 'add'){
                n = 1;
            }else{
              if (no) {
                n = no;
              } else {
                n = 1;
              }
            }
           
            setTimeout(getData(n, datasearch(data), data),500);

          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
          }
        });
        break;
      case 'submod':
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          success: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            //messages(data);
            returnsubmod(data);
          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
          }
        });
        break;
      default:
        $.ajax({
          type: type,
          url: my_url,
          data: form,
          dataType: 'json',
          success: function (data) {
            console.log('Error:', data);
            $('.btn-save').prop("disabled", false);
            messages(data);

            if (no) {
              n = no;
            } else {
              n = 1;
            }
            setTimeout(getData(n, datasearch(data), data),500);

            $("#index_blade").show();
            $("#show_blade").hide();
            if (!view) {
              $("#FormModal").modal('hide');
            }
          },
          error: function (data) {
            $('.btn-save').prop("disabled", false);
            console.log('Error:', data);
            messageserror(data);
          }
        });
    }
  },
  show: function (my_url, key = '', view = '',nv = '',) {
    if (key) {
      $('.btn-show-' + key).prop("disabled", true);
      $('.btn-detail-' + key).prop("disabled", true);
    } else {
      $('.btn-create').prop("disabled", true);
    }

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: my_url,
      success: function (data) {
        if (key) {
          $('.btn-show-' + key).prop("disabled", false);
          $('.btn-detail-' + key).prop("disabled", false);
        } else {
          $('.btn-create').prop("disabled", false);
        }
        $("#card_show").empty().html('');
        $("#card_show2").empty().html('');
        
        if (nv == true) {
            $("#card_show2").empty().html(data);
            $("#show_blade2").show();
            $("#FormModal").modal('show');
        } else {
            $("#card_show").empty().html(data);
            $("#show_blade").show();
              if (!view) {
                $("#FormModal").modal('show');
            }else{
              $("#index_blade").hide();
            }
          
        }

      },
      error: function (data) {
        console.log('Error:', data);
        if (key) {
          $('.btn-show-' + key).prop("disabled", false);
          $('.btn-detail-' + key).prop("disabled", false);
        } else {
          $('.btn-create').prop("disabled", false);
        }
      }
    });
  },
  restored: function (my_url) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
    $.ajax({
      type: "DELETE",
      url: my_url,
      success: function (data) {
        messages(data);
        getData(1, datasearch(data), data);
      },

      error: function (data) {
        console.log('Error:', data);
        messageserror(data);

      }
    });
  },
  delete: function (my_url) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
    $.ajax({
      type: "DELETE",
      url: my_url,
      success: function (data) {
        messages(data);
        getData(1, datasearch(data), data);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        if (data.responseJSON.message == "CSRF token mismatch.") {
          location.replace("/")
        }
      }
    });
  },
  status: function (my_url, ) {
    no = $('#page_no_data').val();
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
    $.ajax({
      type: "GET",
      url: my_url,
      success: function (data) {
        if (no) {
          n = no;
        } else {
          n = 1;
        }
        messages(data);
        getData(n, datasearch(data), data);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        if (data.responseJSON.message == "CSRF token mismatch.") {
          location.replace("/")
        }
      }
    });
  },
  detail: function (my_url, action = '') {
    $('.btn-show-' + action).prop("disabled", true);
    $('.btn-detail-' + action).prop("disabled", true);

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })

    var form = { action: action };
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: my_url,
      data: form,
      success: function (data) {
        $('.btn-detail-' + action).prop("disabled", false);
        $('.btn-show-' + action).prop("disabled", false);
        $("#card_show").empty().html(data);
        $("#show_blade").show();
        $("#FormModal").modal('show');
      },
      error: function (data) {
        console.log('Error:', data);
        $('.btn-detail-' + action).prop("disabled", false);
        $('.btn-show-' + action).prop("disabled", false);
        //location.replace("/")
      }
    });
  },
  back: function () {
    $("#index_blade").show();
    $("#show_blade").hide();
  }, 
  status_item_id: function (my_url,id) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    })
    
    $.ajax({
      type: "GET",
      url: my_url,
      success: function (data) {
        messages(data);
        $("#search").val(id).trigger('change');
        $('#' + data.name).css("background-color", data.color);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        if (data.responseJSON.message == "CSRF token mismatch.") {
          location.replace("/")
        }
      }
    });
  },
}
function messages(data) {

  $.notifyClose();

  $.notify({
    // options
    icon: 'glyphicon glyphicon-warning-sign',
    title: data.title,
    message: data.text,
  }, {
    // settings
    element: 'body',
    position: null,
    type: data.type,
    allow_dismiss: true,
    newest_on_top: false,
    showProgressbar: false,
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-xs-10 col-sm-3 alert alert-{0} text-center" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '</div>'
  });

}

function mensageError(data){

    $.notifyClose();
  
    $.notify({
      // options
      icon: 'glyphicon glyphicon-warning-sign',
      title: data.title,
      message: data.text,
    }, {
      // settings
      element: 'body',
      position: null,
      type: data.type,
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-10 col-sm-3 alert alert-{0} text-center" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '</div>'
    });
  
  
}
function messageserror(data) {

  $.notifyClose();
  $.each(data.responseJSON.errors, function (k, message) {
    $.notify({
      // options
      icon: 'glyphicon glyphicon-warning-sign',
      title: "Error!",
      message: message,
    }, {
      // settings
      element: 'body',
      position: null,
      type: "danger",
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: false,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-10 col-sm-3 alert alert-{0} text-center" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '</div>'
    });
  });
  
  return true;

}
//table actions 
function clearload() {
  if ($('.rowType').length == 0 || $('.rowType').length > 0) {
    $('.loading-table').hide();
  }
}

$(document).on('click', '.pagination a', function (event) {
  event.preventDefault();

  $('li').removeClass('active');
  $(this).parent('li').addClass('active');

  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  $('#page_no_data').val(page);
  getData(page, datasearch());
});

function getData(page, filter, row = '') {

  $('#index_table').hide();
  $('#loading').show();

  $.ajax(
    {
      url: '?page=' + page,
      data: filter,
      type: "get",
      datatype: "html"
    }).done(function (data) {

      $('.pagination').remove();
      $("#index_table").empty().html(data);
      location.hash = page;
      $('#loading').hide();
      $('#index_table').show();


      if (row) {

        $('#' + row.name).css("background-color", row.color);
        $('#orderbysearch').val(row.order)
        $('#statusearch').val(row.status);

      }
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('error');
    });
}

function getData2(page, filter = '', row = '') {

  $('#index_table2').hide();
  $('#loading2').show();

  $.ajax(
    {
      url: '?page=' + page,
      data: filter,
      type: "get",
      datatype: "html"
    }).done(function (data) {

      $('.pagination').remove();
      $("#index_table2").empty().html(data);
      location.hash = page;
      $('#loading2').hide();
      $('#index_table2').show();


      if (row) {

        $('#' + row.name).css("background-color", row.color);

      }
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('error');
    });
}
//other operations
function RestrictSpace() {
  if (event.keyCode == 32) {
    return false;
  }
}

const operations = {

  formatNumber: function (num) {
    if (!num || num == 'NaN') return '0.00';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
      num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
      cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
  },
}

$(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
  $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
    event.preventDefault();
  }
});

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


function logout() {
  event.preventDefault();
  $('#logoutUs').prop('disabled', true);
  document.getElementById('logout-form-d').submit();
  setTimeout(function () { $('#logoutUs').prop('disabled', false); }, 3000);
}

function logoutMobile() {
  event.preventDefault();
  $('#logoutUsM').prop('disabled', true);
  document.getElementById('logout-form-dM').submit();
  setTimeout(function () { $('#logoutUsM').prop('disabled', false); }, 3000);
}

function sidebarOpen(){
  $("#menu-sidebar").removeClass("sidebar-must-hide");
  $("#show-sidebar").hide();
  $("#full-content").removeClass("content-full-show");
}

function sidebarClose(){
  $("#full-content").addClass("content-full-show");
  $("#show-sidebar").show();
  $("#menu-sidebar").addClass("sidebar-must-hide");
}