
function returnsubmod(data) {
  console.log(data);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  ev.preventDefault();

  var url = $('#url').val() + '/move';
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  var workler_id = data.replace(/[^\d.-]/g, '');
  var map_detail_id = ev.target.id.replace(/[^\d.-]/g, '');
  var form = { map_detail_id: map_detail_id, workler_id: workler_id };
  var state = 1;
  var type = "POST"; //for creating new resource
  var my_url = url;

  $.ajax({
    type: type,
    url: my_url,
    data: form,
    dataType: 'json',
    success: function (data) {
      messages(data);
    },
    error: function (data) {
      messageserror(data);
      reload_operators_places(1);
    }
  });
}

function open_manage(id) {
  var my_url = $('#url').val() + '/manage/';
  actions.show(my_url);
}

function reload_operators() {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  // Populate Data in Edit Modal Form
  $.ajax({
    type: "GET",
    url: $('#url').val() + '/manage/',
    data: { reload: true },
    success: function (data) {
      $("#list-operators").empty().html(data);
    }
  });
}

function reload_operators_places(page) {
  var search = { section: $('#map_id').val() };
  getData(1, search, '');
}


function add_operator(btn) {
  btn.disabled = true;
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  var map_detail_id = $('#map_detail_id').val();
  var workler_id = $('#workler_id').val();
  var url = $('#url').val() + '/add';
  var form = { map_detail_id: map_detail_id, workler_id: workler_id };
  var type = "POST"; //for creating new resource
  var my_url = url;

  $.ajax({
    type: type,
    url: my_url,
    data: form,
    dataType: 'json',
    success: function (data) {
      messages(data);
      reload_operators();
      reload_operators_places(1);
      $('#client_id').val('');
      $('#workler_id').val('');
      $('#map_detail_id').val('');

      btn.disabled = false;
      $('#manage').attr("disabled", false);
    },
    error: function (data) {
      messageserror(data);
      $('#manage').attr("disabled", false);
      btn.disabled = false;
    }
  });
}

function remove_operator(id, btn) {
  btn.disabled = true;
  var url = $('#url').val();
  Swal.fire({
    title: "Do You Want To Removed The Employee?",
    text: "The Employee Will Be Removed",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Removed It!'
  }).then((result) => {
    if (result.value) {
      var my_url = url + '/' + id;
      actions.delete(my_url);
      reload_operators();
      reload_operators_places(1);

    }
    btn.disabled = false;
    $('#manage').attr("disabled", false);
  });

}

function get_worklers() {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var form = { client_id: $("#client_id").val() };

  // Populate Data in Edit Modal Form
  $.ajax({
    type: "GET",
    url: $('#url').val() + '/getworklers',
    data: form,
    success: function (data) {
      var datos = `<option value="">Select Employee</option>`;

      $.each(data, function (idx, sup) {
        datos += `<option value="${sup.id}">${sup.name}</option>`;
      });

      $("#workler_id").html(datos);
      $.notify({
        // options
        title: "Ready!",
        message: 'Employees Were Loaded',
      }, {
        // settings
        type: 'success'
      });
    },
    error: function (data) {
      console.log('Error:', data);
      messageserror(data);

    }
  });


}

function ubicationsInfo(id) {
  var section = $("#section_id").val();
  var my_url = $('#baseUrl').val() + '/workstation/' + section + '/' + id + '/show';
  actions.detail(my_url, id);
}