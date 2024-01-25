
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
function filter_list(){
  var filter = $('.select2-basic-search').val();
  if(filter=='')
  {
      $('.list-group-item').show();
  }
  else
  {
      $('.list-group-item').hide();
      $('.'+filter).show();
  }
}
function datasearch(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      ct: $('#ct').val(),
      wt: $('#wt').val(),
      order: answer['order'],
      status: answer['status'],
      place: $('#place').val(),
      delivery: $('#deliverysearch').val(),
      state: $("#stateSearch").val(),

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      ct: $('#ct').val(),
      wt: $('#wt').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      place: $('#place').val(),
      delivery: $('#deliverysearch').val(),
      state: $("#stateSearch").val(),


    };

  return data;
}
const transaction = {
  get_cities: function (cities) {
    let datos = `<option value="">Select City</option>`;

    $.each(cities, function (idx, cli) {
      datos += `<option class="opt${cli.id}" value="${cli.id}">${cli.name}</option>`;
    });

    $("#city_id").html(datos);
  },
  get_suburbs: function (suburbs,zipcode) {
    let datos = `<option value="">Select Colony</option>`;
    if(zipcode !== ''){
      $.each(suburbs, function (idx, sub) {
        if(sub.zipcode == `${zipcode}`){
          datos += `<option class="opt${sub.id}" value="${sub.id}">${sub.zipcode}-${sub.colony}</option>`;
        }
      });

    }else{
        $.each(suburbs, function (idx, sub) {
          datos += `<option class="opt${sub.id}" value="${sub.id}">${sub.zipcode}-${sub.colony}</option>`;
        });
    }
    

    $("#colony_id").html(datos);
  }
};
//section for const js 
const clients = {
  copyLink: function () {
    /* Get the text field */
    var copyText = document.getElementById("myInputlink");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    // options
    messages({
      title: "Advice!",
      text: 'Copied the link',
      type: 'warning'
    });
  },
  back: function () {
    actions.back();
  },
  detail: function (id) {
    var my_url = url + '/' + id + '/show';
    actions.show(my_url, id, 'form');
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url, 'form', 'form');
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id, 'form');
  },
  edit_contrat: function (id) {
    var my_url = url + '/' + id + '/contract';
    actions.show(my_url, id, 'form');
  },
  save: function (state, id = '') {
    var form = $('#client-form').serialize();
    console.log(form);
    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/update/' + id;
      var type = "PUT";
    } else if (state == 'contract') {
      var my_url = url + '/contract/' + id;
      var type = "PUT";
    }

    actions.save(type, my_url, state, form);
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Employee",
      text: "The Employee Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.delete(my_url);
      }
    });

  },
  restored: function (id) {
    Swal.fire({
      title: "Do You Want To Restore The Employee?",
      text: "The Employee Will be Restorerd",
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
  payout: function (id) {
    var page = window.location.href;
    no = page.split("#");
    Swal.fire({
      title: "Is This Employee At The Office?",
      text: "The Employee Will Change State",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/payout/' + id;
        actions.status(my_url, no);
      }
    });
  },
  get_date_cities: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      state: $("#state_id").val(),
    };

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getCities',
      data: form,
      success: function (data) {
        transaction.get_cities(data);
      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_date_suburbs: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var zipcode = $("#zip_code").val();
    var form = {
      city: $("#city_id").val(),
      zipcode: zipcode,
    };

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getSuburbs',
      data: form,
      success: function (data) {

        transaction.get_suburbs(data,zipcode);

      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_zipcode: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
      }
    });

    var zipcode = $("#zip_code").val();
    var my_url = $("#url").val() + '/getZipcode';

    if (zipcode.length == "") {
      $("#state_id").val('');
      $("#state_id").trigger("change");
      $("#city_id").val('');
      $("#city_id").trigger("change");


      return false;
    }
    $.ajax({
      type: "GET",
      url: my_url,
      data: { zipcode: zipcode },
      success: function (data) {
        $("#state_id").val(data.suburb.state_id);
        $("#state_id").trigger("change");
        setTimeout(function () { 
          if (data.suburbs.length > 0) {
            $("#city_id").val(data.suburb.city_id);
            $("#city_id").trigger("change");
            $.notify({
              title: "Ready!",
              message: 'Ubication Selected.',
            }, {
              type: 'success'
            });
          }
        }, 500);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  },
};

const contract = {
  filter: function (client) {
    var my_url = url + '/contract/filter';
    var date = $('#searchCDate').val();
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $('#contract_table').hide();
    $('#loading-contract').show();

    $.ajax({
      type: 'get',
      url: my_url,
      data: { client_id: client, date: date },
      success: function (data) {
        $("#contract_table").empty().html(data);
        $('#loading-contract').hide();
        $('#contract_table').show();
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });

  },
  clear_filter: function () {
    $('#searchCDate').val('').trigger("change");
  },
  create: function (client) {
    var my_url = url + '/contract/create';
    $("#card_show2").empty().html('');
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $.ajax({
      type: 'get',
      url: my_url,
      data: { client_id: client },
      success: function (data) {
        $("#card_show2").empty().html(data);
        $("#show_blade2").show();
        $("#FormModal2").modal('show');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });

  },
  edit: function (id, client) {
    var my_url = url + '/contract/edit/' + id;
    $("#card_show2").empty().html('');
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $.ajax({
      type: 'get',
      url: my_url,
      data: { client_id: client },
      success: function (data) {
        $("#card_show2").empty().html(data);
        $("#show_blade2").show();
        $("#FormModal2").modal('show');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });

  },
  save: function (state, client, id = "") {
    var form = {
      contract_type: $('#contract_type').val(),
      date_contract: $('#date_contract').val(),
      daily_salary: $('#daily_salary').val(),
      client_id: client,

    };

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var my_url = url + '/contract/create';
    var type = "POST";
    var ids = id;

    if (state == 'update') {
      my_url = url + '/contract/modify/' + ids;
      type = "PUT";
    }

    $.ajax({
      type: type,
      url: my_url,
      data: form,
      success: function (data) {
        contract.filter(form.client_id);
        contract.close();
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  delete: function (id, client_id) {
    Swal.fire({
      title: "Do You Want To Delete The Contract",
      text: "The Contract Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/contract/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "DELETE",
          url: my_url,
          success: function (data) {
            contract.filter(client_id);
            contract.close();
          },
          error: function (data) {
            messageserror(data);

          }
        });
      }
    });

  },
  close: function () {
    if ($("#FormModal2").modal('hide')) {
      $("#show_blade2").hide();
      $('#searchCDate').val('').trigger("change");
    }
    var filter = datasearch();
    getData(1, filter);

  }
};

const print = {
  csv: function () {
    $("#tableBody").empty();
    var d = '';
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
        for (let index = 0; index < data.length; index++) {
          var ubication = '';
          if (data[index]['ubication'] == 1) {
            ubication = 'At Office';
          } else {
            ubication = 'At Home Office';
          }
          var phone = '';
          if (data[index]['phone'] == null) {
            phone = "No Phone";
          } else {
            phone = data[index]['phone'];
          }
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['name']}
          </td>
          <td>
          ${data[index]['email']}
          </td>
          <td>
          ${phone}
          </td>
          <td>
          ${data[index]['work_types']['name']}
          </td>
          <td>
          ${data[index]['type_clients']['name']}
          </td>
          <td>
          ${ubication}
          </td>
          <td>
          ${data[index]['street'] ? data[index]['street'] : ''}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableEmployees").tableHTMLExport({ type: 'csv', filename: 'Employees.csv' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  pdf: function () {
    $("#tableBody").empty();
    var d = '';
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
        for (let index = 0; index < data.length; index++) {
          var ubication = '';
          if (data[index]['ubication'] == 1) {
            ubication = 'At Office';
          } else {
            ubication = 'At Home Office';
          }
          var phone = '';
          if (data[index]['phone'] == null) {
            phone = "No Phone";
          } else {
            phone = data[index]['phone'];
          }
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['name']}
          </td>
          <td>
          ${phone}
          </td>
          <td>
          ${data[index]['work_types']['name']}
          </td>
          <td>
          ${data[index]['type_clients']['name']}
          </td>
          <td>
          ${ubication}
          </td>
          <td>
          ${data[index]['street'] ? data[index]['street'] : ''}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableEmployees").tableHTMLExport({ type: 'pdf', filename: 'Employees.pdf' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }
};


