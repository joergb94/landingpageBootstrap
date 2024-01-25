
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

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
      criterion: $('#criterionearch').val(),
      type: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),


    }
    : {
      search: $('#search').val(),
      criterion: $('#criterionearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      type: $('#typesearch').val(),

    };

  return data;
}
//section for const js 
const devolutions = {
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete Devolution?",
      text: "The Devolution Will Be Delete",
      icon: 'warning',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
   
        var my_url = url + '/devolution/'+ id+'?comment='+result.value;
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
            $('#devDetail' + id).remove();
            getData(1, datasearch(data), data);
            $("#devolutionsTable").hide();
            $("#index_blade").show();
            $("#show_blade").hide();

          },
          error: function (data) {
            console.log('Error:', data);
            messageserror(data);
            if (data.responseJSON.message == "CSRF token mismatch.") {
              location.replace("/");
            }
          }
        });
      
    });
  },

  detail: function (devolution_id) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      id: devolution_id,
    };

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getDevolution',
      data: form,
      success: function (data) {
        var observation = data.devolutions['observation'] ? data.devolutions['observation'] : 'Without  Observation';
        var employee = data.employee['name'] ? data.employee['name'] : 'Without Information';
        $('#devolutionD').html('Devolution ' + data.devolutions['mat_dp']);
        $('#employeeD').html(employee);
        $('#creatorD').html(data.creator['name'] + ' ' + data.creator['last_name']);
        $('#chekerD').html(data.checker ? data.checker['name'] + ' ' + data.checker['last_name'] : 'Not Updated');
        $('#deliveryD').html(data.sale['mat_dp']);
        $('#dateD').html(data['date']);
        $('#observationD').html(observation);

        var datos = ``;
        if (data.detail.length == 0) {
          datos += `<li class="list-group-item">
                        <div class="col-sm-12 text-center">
                        <h4 class='text-warning'>No Data</h4>
                        </div>
                    </li>`;
        } else {
          $.each(data.detail, function (idx, detail) {
            datos += `<li class="list-group-item">
                                <div class="row">
                                <div class="col-sm-4 text-center">
                                        ${detail.data.sn['serial_number']}
                                    </div>
                                    <div class="col-sm-4 text-center">
                                        ${detail.data.supply.name}
                                        ${detail.data.supply.model}
                                    </div>
                                    <div class="col-sm-4 text-center">
                                        $${detail.amount}
                                    </div>
                                </div>
                            </li>`;
          });
        }
        $("#devolutionDetail").html(datos);
        $("#ModalDevolution").modal('show');

      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  delivery: function (id) {
    var page = window.location.href;
    no = page.split("#");
    Swal.fire({
      title: "Do You Want To Change The Delivery Status?",
      text: "The Delivery Will Change State",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/delivery/' + id;
        actions.status(my_url, no);
      }
    });
  },
  close: function () {
    $("#ModalDevolution").modal('hide');
    $('#employeeD').html('');
    $('#creatorD').html('');
    $('#deliveryD').html('');
    $('#observationD').html('');
    $("#devolutionDetail").html('');
  },
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
      datatype: "html",
      success: function (data) {
        for (let index = 0; index < data.length; index++) {
          var status = '';
          var date = new Date(data[index]['updated_at']);
          var delivery = '';
          var returnerd = '';
          if (data[index]['active'] == 1 && data[index]['InOut'] == 1) {
            status = 'At Office';
          } else {
            status = 'At Home Office';
          }
          if (data[index]['delivery'] == 1) {
            delivery = 'Delivered';
          } else {
            delivery = 'Not Delivered';
          }
          if (data[index]['returned'] == 1) {
            returnerd = 'Returned';
          } else {
            returnerd = 'Not Returned';
          }
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['client']['name']}
          </td>
          <td>
          ${data[index]['total']}
          </td>
          <td>
          ${delivery}
          </td>
          <td>
          ${status}
          </td>
          <td>
          ${returnerd}
          </td>
          <td>
          ${date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableDelivery").tableHTMLExport({ type: 'csv', filename: 'Delivery.csv' });
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
          var status = '';
          var date = new Date(data[index]['updated_at']);
          var delivery = '';
          var returnerd = '';
          if (data[index]['active'] == 1 && data[index]['InOut'] == 1) {
            status = 'At Office';
          } else {
            status = 'At Home Office';
          }
          if (data[index]['delivery'] == 1) {
            delivery = 'Delivered';
          } else {
            delivery = 'Not Delivered';
          }
          if (data[index]['returned'] == 1) {
            returnerd = 'Returned';
          } else {
            returnerd = 'Not Returned';
          }
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['client']['name']}
          </td>
          <td>
          ${data[index]['total']}
          </td>
          <td>
          ${delivery}
          </td>
          <td>
          ${status}
          </td>
          <td>
          ${returnerd}
          </td>
          <td>
          ${date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableDelivery").tableHTMLExport({ type: 'pdf', filename: 'Delivery.pdf' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  printCost: function (type) {
    $("#tableBody").empty();
    var d = '';
    var filter = datasearch();
    console.log(url);
    console.log(filter);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      type: "GET",
      url: url + '/print',
      data: filter,
      datatype: "html",
      success: function (data) {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
          var status = '';
          var date = new Date(data[index]['updated_at']);
          var delivery = '';
          var returnerd = '';
          if (data[index]['active'] == 1 && data[index]['InOut'] == 1) {
            status = 'At Office';
          } else {
            status = 'At Home Office';
          }
          if (data[index]['delivery'] == 1) {
            delivery = 'Delivered';
          } else {
            delivery = 'Not Delivered';
          }
          if (data[index]['returned'] == 1) {
            returnerd = 'Returned';
          } else {
            returnerd = 'Not Returned';
          }
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['client']['name']}
          </td>
          <td>
          ${data[index]['total']}
          </td>
          <td>
          ${delivery}
          </td>
          <td>
          ${status}
          </td>
          <td>
          ${returnerd}
          </td>
          <td>
          ${date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        //$("#tableDelivery").tableHTMLExport({ type: type, filename: `Delivery.${type}` });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }
};

