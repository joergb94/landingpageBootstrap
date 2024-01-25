
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
      search: answer['id'] ? answer['id'] : $('#search').val(),
      criterion: $('#search').val().length > 0 ? $('#criterionearch').val() : 'id',
      type: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      delivery: $('#deliverysearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      cost_center: $("#cost_center_search").val(),
      section: $('#sectionName').val(),
      verificated: $('#verificatedsearch').val(),

    }
    : {
      search: $('#search').val(),
      criterion: $('#search').val().length > 0 ? $('#criterionearch').val() : 'id',
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      delivery: $('#deliverysearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      type: $('#typesearch').val(),
      cost_center: $("#cost_center_search").val(),
      section: $('#sectionName').val(),
      verificated: $('#verificatedsearch').val(),
    };


  return data;
}
function update_quantity() {
  $.get(url + "/getQuantity", function (data) {
    $("#salesQ").html(data.SQ);
    $("#devolutionsQ").html(data.DQ);
    $("#changesQ").html(data.CSQ);
    $("#canceledQ").html(data.SCQ);
    $("#canceledChangeQ").html(data.CSCQ);
    $("#canceledDevolutionQ").html(data.DCQ);
  });
}

function take_serial_numbers() {
  var select = [];
  $(".serialNumber").each(function () {
    var code = $(this).val();
    if (this.checked) {
      select.push(code);
    }

  });
  return select;
}
function returnsubmod(data) {
  messages(data['message']);
  actions.back();
  $('#criterionearch').val('mat_dp');
  $('#search').val(data['mat_dp']);
  $('.search-query').trigger('change');
  
}
const transactions = {
  back: function () {
    actions.back();
  },
  refreshFilter: function () {
    $('#search').val('');
    $('#search').trigger('change');
  },
  verificated: function (id, status, transaction_type) {

    let sweetAlert = status == 0 ? {
      title: `Do You Want To Verify The ${transaction_type}`,
      text: `The ${transaction_type} Will Be Verify`,
      icon: `warning`,
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Yes, Verify It!`
    }
      : {
        title: `Do You Want To Verify The ${transaction_type}`,
        text: `The ${transaction_type} Will Be Verify`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, Cancel verify It!`
      };

    Swal.fire(sweetAlert).then((result) => {
      if (result.value) {
        var my_url = url + '/verify';
        var state = 'update';
        console.log(status);
        var form = {
          id: id,
          status: status,
          transaction_type: transaction_type
        };
        var type = "POST";
        actions.save(type, my_url, true, form, 'submod');
      }
    });

  }, 
  save_verificated: function (id, status, transaction_type) {

    let sweetAlert = status == 0 ? {
      title: `Do You Want To Verify The ${transaction_type}`,
      text: `The ${transaction_type} Will Be Verify`,
      icon: `warning`,
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Yes, Verify It!`
    }
      : {
        title: `Do You Want To Verify The ${transaction_type}`,
        text: `The ${transaction_type} Will Be Verify`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, Cancel Verify It!`
      };

    Swal.fire(sweetAlert).then((result) => {
      if (result.value) {
        var my_url = url + '/verify';
        var state = 'update';
        var form = {
          id: id,
          status: status,
          transaction_type: transaction_type,
          sns: take_serial_numbers(),
        };
        if(form.sns.length == 0){
            $.notify({
              title: "Error!",
              message: 'Select At Least One Serial Number.',
            }, {
              type: 'danger'
            });
          return false;
        }
        var type = "POST";
        actions.save(type, my_url, true, form, 'submod');
      }
    });

  },
  save_verificated_devolution: function (id, status, transaction_type) {
    let sweetAlert = status == 0 ? {
      title: `Do You Want To Verify The ${transaction_type}`,
      text: `The ${transaction_type} Will Be Verify`,
      icon: `warning`,
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Yes, Verify It!`
    }
      : {
        title: `Do You Want To Verify The ${transaction_type}`,
        text: `The ${transaction_type} Will Be Verify`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, Cancel Verify It!`
      };

    Swal.fire(sweetAlert).then((result) => {
      var description = result.value? result.value :"No comment";
      if (description) {
        var my_url = url + '/verify';
        var state = 'update';
        var form = {
          id: id,
          status: status,
          transaction_type: transaction_type,
          sns: take_serial_numbers(),
          description:description,
        };
        if(form.sns.length == 0){
            $.notify({
              title: "Error!",
              message: 'Select At Least One Serial Number.',
            }, {
              type: 'danger'
            });
          return false;
        }
        var type = "POST";
        actions.save(type, my_url, true, form, 'submod');
      }
    });

  },
  detail: function (id) {
    var my_url = url + '/data/' + id;
    actions.show(my_url, id, 'form');
  },
  check_all_checkbox: function () {
    if ($('.labelprint')[0].checked) {

      $('.labelprint').each(function () {
        this.checked = false;
      });

    } else {
      // Iterate each checkbox
      $('.labelprint').each(function () {
        this.checked = true;
      });
    }
  }
};

//section for const js 
const sales = {
  back: function () {
    actions.back();
  },
  detail: function (id) {
    var my_url = url + '/detail/' + id;
    actions.show(my_url, id, 'form');
  },
};

const devolutions = {
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
        var observation = data.devolutions['observation'] ? data.devolutions['observation'] : 'Without Observation';
        $('#devolutionD').html('Devolution ' + data.devolutions['mat_dp']);
        $('#employeeD').html(data.employee['name']);
        $('#creatorD').html(data.creator['name'] + ' ' + data.creator['last_name']);
        $('#chekerD').html(data.checker ? data.checker['name'] + ' ' + data.checker['last_name'] : 'Not Updated');
        $('#deliveryD').html(data.sale['mat_dp']);
        $('#dateD').html(data['date']);
        $('#dateDA').html(data.devolutions['assignment_date']);
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
                                ${detail.amount}
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
  close: function () {
    $("#ModalDevolution").modal('hide');
    $('#employeeD').html('');
    $('#creatorD').html('');
    $('#deliveryD').html('');
    $('#observationD').html('');
    $("#devolutionDetail").html('');
  },
};

const changes = {
  detail: function (change_id) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      id: change_id,
    };

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getDeliveryChange',
      data: form,
      success: function (data) {
        var observation = data.change['observtion'] ? data.change['observtion'] : 'Without Observation';
        $('#changeC').html('Change ' + data.change['mat_dp']);
        $('#employeeC').html(data.employee['name']);
        $('#creatorC').html(data.creator['name'] + ' ' + data.creator['last_name']);
        $('#chekerC').html(data.checker ? data.checker['name'] + ' ' + data.checker['last_name'] : 'Not Updated');
        $('#deliveryC').html(data.sale['mat_dp']);
        $('#dateC').html(data['date']);
        $('#dateCA').html(data.change['assignment_date']);
        $('#observationC').html(observation);

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
                          <div class="col-sm-6 text-center">
                                  <h6>${detail['detail_old']['sn']['serial_number']}</h6>
                                  <p>${detail['detail_old']['supply']['name']}</p>
                                  <h6>$${detail['detail_old']['price']}</h6>
                              </div>
                              <div class="col-sm-6 text-center">
                                  <h6>${detail['detail_new']['sn']['serial_number']}</h6> 
                                  <p>${detail['detail_new']['supply']['name']}</p>
                                  <h6>$${detail['detail_new']['price']}</h6>
                              </div>
                          </div>
                      </li>`;
          });
        }


        $("#changeDetail").html(datos);
        $("#ModalDeliveryC").modal('show');

      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  close: function () {
    $("#ModalDeliveryC").modal('hide');
    $('#employeeC').html('');
    $('#creatorC').html('');
    $('#deliveryC').html('');
    $('#observationC').html('');
    $("#changeDetail").html('');
  },
};


