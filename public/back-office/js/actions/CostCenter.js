
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

});

function datasearch(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      delivery: $('#deliverysearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      cost_center: $("#cost_center_search").val(),


    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      delivery: $('#deliverysearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      type: $('#typesearch').val(),
      cost_center: $("#cost_center_search").val(),

    };

  return data;
}

const transaction = {
  calculate_total: function (data) {
    console.log(data);
    var itemIva = parseFloat(data['supply']['price']) * 0.30;
    var priceItem = parseFloat(data['supply']['price']) + itemIva;
    var iva = 0.16;
    var cost = parseFloat($('#subtotal_sale').val());
    var subtotalOp = data.op == "subs" ? cost - priceItem : cost + priceItem;
    var totalIva = 0; // subtotalOp * iva
    var subtotal = (subtotalOp > 0) ? parseFloat(subtotalOp) : 0;
    var total = subtotal;
    $('#subtotal_sale').val(subtotal.toFixed(2));
    $('#iva').val(totalIva);
    $('#total_sale').val(total.toFixed(2));
    $('#ivatxt').html('$' + totalIva);
    $('#subtotal_saletxt').html('$' + subtotal.toFixed(2));
    $('#total_saletxt').html('$' + total.toFixed(2));

    return total;
  },
  update_quantity: function (data) {
    $.notify({
      // options
      title: "Advice!",
      message: 'Updated The Amount Of' + data.name,
    }, {
      // settings
      type: 'warning'
    });

    var quantityOld = $("#quantity" + data.supply_id).val();
    var quantityNew = parseFloat(quantityOld) + parseFloat(data.quantity);
    var subtotalNew = parseFloat(quantityNew) * parseFloat(data.price);
    $('#td-quantity' + data.supply_id).html(quantityNew);
    $('#td-subtotal' + data.supply_id).html('$' + operations.formatNumber(subtotalNew));
    $("#quantity" + data.supply_id).val(quantityNew);
    $("#subtotal" + data.supply_id).val(subtotalNew);

  },
  take_rows: function () {
    var select = [];
    $(".rw").each(function () {
      var code = $(this).val();
      var quantity = $("#quantity" + code).val();
      var price = $("#price" + code).val();
      var subtotal = $("#subtotal" + code).val();
      var supply = $("#supply" + code).val();

      detail = {
        serial_number_id: code,
        supply: supply,
        quantity: quantity,
        price: price,
        subtotal: subtotal,
      };
      select.push(detail);
    });

    return select;
  },
  take_data: function () {
    return {
      client: $("#client").val(),
      subtotal: $('#subtotal_sale').val(),
      InOut: $('#InOut').val(),
      iva: $('#iva').val(),
      total: $('#total_sale').val(),
      cost_center_id: $('#costcenter').val(),
    };

  },
  row_data: function (data) {
    var totaliva = parseFloat(data['supply']['price']) * 0.30;
    var priceDelivery = parseFloat(data['supply']['price']) + totaliva;
    var dato = '';
    if (data['snOld']) {
      var totalivaOld = parseFloat(data['supply']['price']) * 0.30;
      var priceDeliveryOld = parseFloat(data['supply']['price']) + totalivaOld;
      var status = $('#status_sn_old').val();
      dato = `<tr id="list${data['sn']['id']}" class="supply-row">
                              <td>
                                <h6>${data['sn']['sn']}</h6>
                                <p>${data['supply']['name']}</p>
                                <h6>$${operations.formatNumber(parseFloat(priceDelivery))}</h6>
                              </td>
                              <td>
                                <h6>${data['snOld']['sn']}</h6>
                                <p>${data['supplyOld']['name']}</p>
                                <h6>$${operations.formatNumber(parseFloat(priceDeliveryOld))}</h6>
                              </td>
                              <td class="text-center">
                                  <button id="da${data['sn']['id']}" value="${data['sn']['id']}" class="btn btn-sm btn-danger rw" onclick="sales.supllydelete(${data['sn']['id']},${data['snOld']['sn']});">-</button>
                                  <input id="supply${data['sn']['id']}"  type="hidden" value="${data['supply']['id']}"> 
                                  <input id="price${data['sn']['id']}"  type="hidden" value="${priceDelivery}"> 
                                  <input id="subtotal${data['sn']['id']}" class="qc" type="hidden"  value="${priceDelivery}">
                                  <input id="supplyOld${data['sn']['id']}"  type="hidden" value="${data['supply']['id']}">
                                  <input id="snOld${data['sn']['id']}"  type="hidden" value="${data['snOld']['id']}">
                                  <input id="statusOld${data['sn']['id']}"  type="hidden" value="${status}">
                              </td>
                              </tr>`;
      $('#sn_old').children("option:selected").hide();
      $('#sn_old').children("option:selected").removeClass("all");
      $('#sn_old').val('');
      $('#sn_old').trigger('change');

    } else {
      dato = `<tr id="list${data['sn']['id']}" class="supply-row">
              <td>
                <h6>${data['sn']['sn']}</h6>
                ${data['supply']['name']}
              </td>
              <td id="td-quantity${data.supply_id}">1</td>
              <td>$${operations.formatNumber(priceDelivery)}</td>
              <td class="text-center">
                  <button id="da${data['sn']['id']}" value="${data['sn']['id']}" class="btn btn-sm btn-danger rw" onclick="sales.supllydelete(${data['sn']['id']});">-</button>
                  <input id="supply${data['sn']['id']}"  type="hidden" value="${data['supply']['id']}"> 
                  <input id="price${data['sn']['id']}"  type="hidden" value="${priceDelivery}"> 
                  <input id="subtotal${data['sn']['id']}" class="qc" type="hidden"  value="${priceDelivery}"> 
              </td>
              </tr>`;
    }

    return dato;

  },
  take_rows_changes: function () {
    var select = [];
    $(".rw").each(function () {
      var code = $(this).val();
      var quantity = $("#quantity" + code).val();
      var price = $("#price" + code).val();
      var subtotal = $("#subtotal" + code).val();
      var supply = $("#supply" + code).val();
      var supplyOld = $("#supplyOld" + code).val();
      var sn_id = $("#snOld" + code).val();
      var status_id = $("#statusOld" + code).val();

      detail = {
        serial_number_id: code,
        supply: supply,
        quantity: quantity,
        price: price,
        subtotal: subtotal,
        oldDevice: {
          supply_id: supplyOld,
          sn_id: sn_id,
          status_id: status_id
        }
      };
      select.push(detail);
    });

    return select;
  },
  filter: function () {
    var sn = $('#scanBarcodeChange').val();

    if (sn.length > 0) {

      $('#sn_old').children(".all").hide();
      $('#sn_old').children("." + sn).show();
      var sn = $('#sn_old').children("." + sn).val();
      $('#sn_old').val(sn);
    } else {
      $('#sn_old').children(".all").show();
      $('#sn_old').val('');
    }
    $('#sn_old').trigger('change');
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
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url, 'form', 'form');
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id);
  },
  save: function (state, id = '') {
    var form = {
      delivery: transaction.take_data(),
      saleDetail: transaction.take_rows()
    };
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
      title: "Do You Want To Cancel The Delivery?",
      text: "The Delivery Will be Canceled",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.delete(my_url);
      }
    });

  },
  restored: function (id) {
    Swal.fire({
      title: "Do You Want To The Restore The Delivery?",
      text: "The Delivery Will Be Restored",
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
  delivery: function (id) {
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
        actions.status(my_url, '');
      }
    });
  },
  deliveryAnyDesk: function (id) {
    Swal.fire({
      title: "Do You Want To Change The Delivery Status?",
      text: "The Delivery Will Change State",
      icon: 'warning',
      html: '<input type="text" id="AnyDesk" class="swal2-input" placeholder="Enter AnyDesk">',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!',
      preConfirm: () => {
        const AnyDesk = Swal.getPopup().querySelector('#AnyDesk').value;
        if (!AnyDesk) {
          Swal.showValidationMessage(`Please AnyDesk`);
        }
        return { AnyDesk: AnyDesk };
      }
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/delivery/' + id;
        var formData = new FormData();
        actions.save('POST', my_url, 'update', result.value);
      }
    });
  },
  payout: function (id) {
    Swal.fire({
      title: "Is This Delivery At The Office?",
      text: "The Delivery Will Change State",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/payout/' + id;
        actions.status(my_url, '');
      }
    });
  },
  returned: function (id) {
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
        var my_url = url + '/returned/' + id;
        actions.status(my_url, '');
      }
    });
  },
  addSupply: function (sn) {
    $('.btn-detail-supply').prop("disabled", true);

    if ($('#list' + sn).length > 0) {
      mensageError({ title: 'Error!', text: 'You Have Already Added That Device' });
      return false;
    }

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      sn: sn,
      st: $('#st').val(),
      sn_old: $('#sn_old').val()
    };

    console.log(form);
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/supply',
      data: form,
      success: function (data) {

        $('.btn-detail-supply').prop("disabled", false);
        $("#supplytable").append(transaction.row_data(data));
        console.log(data);
        transaction.calculate_total(data);
        $('#supplyAdd').val('');
        $("#suplycard").empty().html('');
        $('#supplyAdd').trigger('change');
        $('#quantityAdd').val(1);
        $('#row-supply').hide();
      },
      error: function (data) {
        console.log('Error:', data);
        $('.btn-detail-supply').prop("disabled", false);
        messageserror(data);
      }
    });
  },
  addSupplyChange: function (sn) {
    $('.btn-detail-supply').prop("disabled", true);

    if ($('#list' + sn).length > 0) {
      mensageError({ title: 'Error!', text: 'You Have Already Added That Device' });
      return false;
    }
    if ($('#sn_old').val().length == 0) {
      mensageError({ title: 'Error!', text: "You Don't Selected Any Device" });
      return false;
    }
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      sn: sn,
      st: $('#st').val(),
      sn_old: $('#sn_old').val()
    };

    console.log(form);
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/supply',
      data: form,
      success: function (data) {

        $('.btn-detail-supply').prop("disabled", false);
        $("#supplytable").append(transaction.row_data(data));
        console.log(data);
        transaction.calculate_total(data);
        $('#supplyAdd').val('');
        $("#suplycard").empty().html('');
        $('#supplyAdd').trigger('change');
        $('#quantityAdd').val(1);
        $('#row-supply').hide();
      },
      error: function (data) {
        console.log('Error:', data);
        $('.btn-detail-supply').prop("disabled", false);
        messageserror(data);
      }
    });
  },
  supllydelete: function (supply, sn = '') {
    data = { supply: { price: $("#subtotal" + supply).val() }, op: 'subs' };
    transaction.calculate_total(data);

    if (sn) {
      $('#sn_old').children("." + sn).show();
      $('#sn_old').children("." + sn).addClass("all");
    }

    $("#list" + supply).remove();
    if ($('.supply-row').length <= 0) {

      $('#row-supply').show();
    }
  },
  get_client: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      client_id: $("#client").val(),
    };
    if (form.client_id == "") {
      $('#phonetxt').html('xxxxxxxxxxxx');
      $('#ubicationtxt').html('xxxxxxxxxxxx');
      return false;
    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getclient',
      data: form,
      success: function (data) {
        $('#phonetxt').html(data.phone);
        $('#ubicationtxt').html(data.ubication);
      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_pdf: function (type) {
    $("#supplytable").tableHTMLExport({ type: type, filename: 'Venta.pdf' });
  },
  new_client: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = $('#client-form-sale').serialize();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/newclient',
      data: form,
      success: function (data) {
        $("#client").append('<option value =' + data.id + '>' + data.name + '</option>');
        $("#client").val(data.id).trigger('change');
        $("#ModalClient").modal('hide');
        $('#client-form-sale').trigger("reset");
        $.notify({
          // options
          title: "Ready!",
          message: 'New Employee Was Created',
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
  },
  clear_client: function () {
    $("#ModalClient").modal('hide');
    $('#client-form-sale').trigger("reset");
  },
  getItem: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#scanBarcode').val();

    if (code.length == 0) {

      $("#suplycard").empty().html('');

      return false;

    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItem',
      data: { code: code },
      success: function (data) {
        $("#suplycard").empty().html(data);
        $('#scanBarcode').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
      }
    });
  },
  getItemChange: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#scanBarcode').val();

    if (code.length == 0) {

      $("#suplycard").empty().html('');

      return false;

    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItemChange',
      data: { code: code },
      success: function (data) {
        $("#suplycard").empty().html(data);
        $('#scanBarcode').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
      }
    });
  },
  close: function () {
    $('#serialNumber').val('');
    $("#myModalLabel").modal('hide');
  },

  deleteDetail: function (id) {
    Swal.fire({
      title: "Do You Want To Delete Device To Delivery?",
      text: "The Device Will Be Delete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/deleteDetail/' + id;
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

            $('#detail' + id).remove();
            if ($('.detail').length == 0) {
              getData(1, datasearch(data), data);
              $("#index_blade").show();
              $("#show_blade").hide();
            }


          },
          error: function (data) {
            console.log('Error:', data);
            messageserror(data);
            if (data.responseJSON.message == "CSRF token mismatch.") {
              location.replace("/");
            }
          }
        });

      }
    });

  },
};

const devolutions = {
  create: function (id) {
    var my_url = url + '/createDevolution/' + id;
    actions.show(my_url, 'form', 'form');
  },
  save: function (state, sale, client) {
    var form = {
      sale_id: sale,
      client_id: client,
      observation: $('#observation').val(),
      total: $('#total_sale').val(),
      saleDetail: transaction.take_rows()
    };

    var my_url = url + '/createDevolution';
    var type = "POST";

    actions.save(type, my_url, state, form);
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete Devolution?",
      text: "The Devolution Will Be Delete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/devolution/' + id;
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

      }
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
        $('#devolutionD').html('Devolution #' + data.devolutions['id']);
        $('#employeeD').html(data.employee['name']);
        $('#creatorD').html(data.creator['name']);
        $('#deliveryD').html('#' + data.devolutions['sale_id']);
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
                                        ${detail.sn['serial_number']}
                                    </div>
                                    <div class="col-sm-4 text-center">
                                        ${detail.device.name}
                                        ${detail.device.model}
                                    </div>
                                    <div class="col-sm-4 text-center">
                                        ${parseFloat(detail.device.price + (detail.device.price * 0.30)).toFixed(2)}
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
  getItem: function (sale_id) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#scanBarcode').val();

    if (code.length == 0) {

      $("#suplycard").empty().html('');

      return false;

    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItemDevolution',
      data: { code: code, sale_id: sale_id },
      success: function (data) {
        $("#suplycard").empty().html(data);
        $('#scanBarcode').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
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
  create: function (id) {
    var my_url = url + '/createChange/' + id;
    actions.show(my_url, 'form', 'form');
  },
  save: function (state, sale, client) {
    var form = {
      sale_id: sale,
      client_id: client,
      observation: $('#observation').val(),
      total: $('#total_sale').val(),
      saleDetail: transaction.take_rows_changes()
    };
    console.log(form);
    var my_url = url + '/createChange';
    var type = "POST";

    actions.save(type, my_url, state, form);
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Devolution?",
      text: "The Devolution Will be Delete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/change/' + id;
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
            $('#chDetail' + id).remove();
            getData(1, datasearch(data), data);
            $("#chagesTable").hide();
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

      }
    });

  },
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
        $('#chageC').html('Change #' + data.change['id']);
        $('#employeeC').html(data.employee['name']);
        $('#creatorC').html(data.creator['name']);
        $('#deliveryC').html('#' + data.change['sale_id']);
        $('#dateC').html(data['date']);
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
                                      <h6>$${operations.formatNumber(detail['detail_old']['price'])}</h6>
                                  </div>
                                  <div class="col-sm-6 text-center">
                                      <h6>${detail['detail_new']['sn']['serial_number']}</h6>
                                      <p>${detail['detail_new']['supply']['name']}</p>
                                      <h6>$${operations.formatNumber(detail['detail_new']['price'])}</h6>
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
  getItem: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#scanBarcode').val();

    if (code.length == 0) {

      $("#suplycard").empty().html('');

      return false;

    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItemChange',
      data: { code: code },
      success: function (data) {
        $("#suplycard").empty().html(data);
        $('#scanBarcode').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
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
          ${data[index]['cost_center']['name']}
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
          ${data[index]['cost_center']['name']}
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
};

