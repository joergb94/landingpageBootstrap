
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {
  $(".select2-basic-purchase").select2({
    width: 'resolve'
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
      date: $('#datesearch').val(),


    }
    : {
      search: $('#search').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      provider: $('#providersearch').val(),
      date: $('#datesearch').val(),
      type: $('#typesearch').val(),

    };

  return data;
}

function datasearchPrint(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      status: answer['status'],
      date: $('#datesearch').val(),


    }
    : {
      search: $('#search').val(),
      status: $('#statusearch').val(),
      provider: $('#providersearch').val(),
      date: $('#datesearch').val(),
      type: $('#typesearch').val(),

    };

  return data;
}

function returnsubmod(data) {
  messages(data);
  $("#index_blade2").show();
  $("#show_blade2").hide();
  $("#FormModalSN").modal('hide');
  $("#FormModalCSN").modal('hide');
}

const transaction = {
  calculate_total: function (data) {
    console.log(data);
    var iva = 0.125;
    var mexico = 9.70;
    var cost = parseFloat($('#subtotal_sale').val());
    var subtotal = data.op == "subs" ? cost - data.subtotal : cost + data.subtotal;
    console.log(subtotal);
    var subtotalLocation = subtotal * mexico;
    var totalIvaLocation = subtotalLocation * iva;
    var totalIva = subtotal * iva;
    var total = subtotal + totalIva;
    var totalLocation = subtotalLocation + totalIvaLocation;
    $('#subtotal_sale').val(subtotal.toFixed(2));
    $('#iva').val(totalIva);
    $('#total_sale').val(total.toFixed(2));
    $('#ivatxt').html('$' + totalIva.toFixed(2));
    $('#subtotal_saletxt').html('$' + subtotal.toFixed(2) + ' '+ 'BZD');
    $('#total_saletxt').html('$' + total.toFixed(2));
    $('#total_sale_blz').val(totalLocation.toFixed(2));
    $('#total_saletxt_blz').html('$' + totalLocation.toFixed(2) + ' '+ 'MX');
    return total;

  },
  update_quantity: function (data) {
    $.notify({
      // options
      title: "Advice!",
      message: 'Updated the amount of:' + data.name,
    }, {
      // settings
      type: 'warning'
    });

    var quantityOld = $("#quantity" + data.supply_id).val();
    var priceU = parseFloat(data.price);
    var quantityNew = parseFloat(quantityOld) + parseFloat(data.quantity);
    var subtotalNew = parseFloat(quantityNew) * parseFloat(data.price);
    $('#price' + data.supply_id).val();
    $('#td-price' + data.supply_id).html('$' + operations.formatNumber(priceU));
    $('#td-quantity' + data.supply_id).html(quantityNew);
    $('#td-subtotal' + data.supply_id).html('$' + operations.formatNumber(subtotalNew));
    $("#quantity" + data.supply_id).val(quantityNew);
    $("#subtotal" + data.supply_id).val(subtotalNew);

  },
  take_rows: function () {
    var select = [];
    $(".rw").each(function () {
      var supply = $(this).val();
      var quantity = $("#quantity" + supply).val();
      var price = $("#price" + supply).val();
      var subtotal = $("#subtotal" + supply).val();
      detail = {
        supply: supply,
        quantity: quantity,
        price: price,
        subtotal: subtotal,
      };
      select.push(detail);
    });

    return select;
  },
  take_sn: function () {
    var select = [];
    $(".sn").each(function () {
      var sn_id = $(this).val();
      var barcode = $(".barcode" + sn_id).val();


      detail = {
        sn_id: sn_id,
        barcode: barcode,
      };
      select.push(detail);


    });

    return select;
  },
  take_snl: function () {
    var select = [];
    $(".snl").each(function () {
      var sn_id = $(this).val();
      var loc = $("#sn-" + sn_id).val();


      detail = {
        sn_id: sn_id,
        loc: loc,
      };
      select.push(detail);


    });

    return select;
  },
  take_data: function () {
    return {
      invoice: $('#invoice').val(),
      date_invoice: $('#date_invoice').val(),
      Providers: $("#Providers").val(),
      subtotal: $('#subtotal_sale').val(),
      iva: $('#iva').val(),
      total: $('#total_sale').val(),
      location: $('#location').val(),
      total_location: $('#total_sale_blz').val(),
    };

  },
  get_supplies: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = { id: $("#Providers").val() };
    if (form['id'] > 0) {
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/getsupplies',
        data: form,
        success: function (data) {
          var datos = `<option value="">Select a Product</option>`;

          $.each(data, function (idx, sup) {
            datos += `<option class="opt${sup.id}" value="${sup.id}"><strong>${sup.code}</strong>-${sup.name}-${sup.color}</option>`;
          });

          $("#supplyAdd").html(datos);
          $('.btn-detail-supply').show();
          $.notify({
            // options
            title: "Ready!",
            message: 'Products Were Loaded',
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
    } else {
      $("#supplyAdd").html(`<option value="">Select A Product</option>`);
      $('.btn-detail-supply').hide();
      $.notify({
        // options
        title: "Warning!",
        message: 'You Have Not Selected Any Provider',
      }, {
        // settings
        type: 'warning'
      });
    }

  },
  check_invoice: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = { invoice: $("#invoice").val() };
    if (form['invoice'].length > 0) {
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/check_invoice',
        data: form,
        success: function (data) {
          var validate = (data == 0) ? '<h4 class="text-success">This Code Invoice Is Free.</h4>'
            : '<h4 class="text-danger">This Code Invoice Used.</h4>';

          if (data == 0) {
            $('.pur-form').show();
          } else {
            $('.pur-form').hide();
          }

          $('#request-invoice').html(validate);
        },
        error: function (data) {
          console.log('Error:', data);
          messageserror(data);

        }
      });
    } else {
      $('#request-invoice').html('<h4 class="text-warning">The Invoice Is empty.</h4>');
    }

  },
  take_serial_numbers: function () {
    var select = [];
    $(".serialNumber").each(function () {
      var code = $(this).val();
      if (this.checked) {
        select.push(code);
      }

    });


    console.log(select);
    return select;
  },
  getCat: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getCat',
      success: function (data) {
        var datos = `<option value="">Select a Category</option>`;

        $.each(data, function (idx, sup) {
          datos += `<option class="opt${sup.id}" value="${sup.id}">${sup.name}</option>`;
        });

        $("#category_id").html(datos);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  },
};

//section for const js 
const purchase = {
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
  addMultipleSN: function (id, supply_id) {
    var my_url = url + '/addMultipleSN/' + id;
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: my_url,
      data: { supply_id: supply_id },
      success: function (data) {
        $("#card_show2").empty().html(data);
        $("#show_blade2").show();
        $("#FormModalSN").modal('show');
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
  saveMultipleSN: function (state) {
    var form = {
      SN: transaction.take_sn()
    };
    console.log(form);
    var my_url = url + '/addMultipleSN';
    var type = "POST";

    actions.save(type, my_url, state, form, 'submod');
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id);
  },
  save: function (state, id = '') {
    var form = {
      Purchase: transaction.take_data(),
      PurchaseDetail: transaction.take_rows()
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
      title: "Do You Want To Cancel The Purchase?",
      text: "The Purchase Will Be Canceled",
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
      title: "Do You Want To Restore The Purchase?",
      text: "The Purchase Will Be Restored",
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
      confirmButtonText: 'Yes, Change It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/delivery/' + id;
        actions.status(my_url);
      }
    });
  },
  payout: function (id) {
    Swal.fire({
      title: "Do You Want To Change The Status Of The Purchase?",
      text: "The Purchase Will Change Status",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/payout/' + id;
        actions.status(my_url);
      }
    });
  },
  addSupply: function () {
    $('.btn-detail-supply').prop("disabled", true);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var supply = $("#supplyAdd").val();

    if ($('#list' + supply).length > 0) {
      if ($('#priceAdd').val() !== $(`#price${supply}`).val()) {

        $.notify({
          // options
          title: "Error!",
          message: 'El precio que ya tiene la compra es diferente al nuevo precio, borre el producto de la compra y agregue el nuevo precio',
        }, {
          // settings
          type: 'danger'
        });
        $('.btn-detail-supply').prop("disabled", false);
        return false;
      }
    }

    var form = {
      supply_id: supply,
      quantity: $('#quantityAdd').val(),
      price: $('#priceAdd').val(),
      old: $('#quantity' + supply).val(),
    };
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/supply',
      data: form,
      success: function (data) {
        $('#Providers').prop("disabled", true);
        $('#addProvider').hide();
        $('.btn-detail-supply').prop("disabled", false);
        if ($('#list' + data.supply_id).length > 0) {
          transaction.update_quantity(data);
        } else {
          var dato = `<tr id="list${data.supply_id}">
                                <td>
                                  ${data.name}
                                  <h6>${data.color}</h6>
                                </td>
                                <td>
                                  <h6>${data.model}</h6>
                                </td>
                                <td id="td-price${data.supply_id}">$${operations.formatNumber(data.price)}</td>
                                <td id="td-quantity${data.supply_id}">${data.quantity}</td>
                                <td id="td-subtotal${data.supply_id}">$${operations.formatNumber(data.subtotal)}</td>
                                <td class="text-center">
                                    <button id="da${data.supply_id}" value="${data.supply_id}" class="btn btn-sm btn-danger rw" onclick="purchase.supllydelete(${data.supply_id});"> <i class='fas fa-minus'></i></button>
                                    <input id="quantity${data.supply_id}" type="hidden" value="${data.quantity}">
                                    <input id="price${data.supply_id}"  type="hidden" value="${data.price}"> 
                                    <input id="subtotal${data.supply_id}" class="qc" type="hidden"  value="${data.subtotal}"> 
                                </td>
                                </tr>`;

          $("#supplytable").append(dato);
        }
        transaction.calculate_total(data);
        $('#supplyAdd').val('');
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
  supllydelete: function (supply) {
    data = { subtotal: $("#subtotal" + supply).val(), op: 'subs' };
    var result = transaction.calculate_total(data);
    $("#list" + supply).remove();
    if (result <= 0) {
      $('#row-supply').show();
    }
  },
  get_provider: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      Provider_id: $("#Providers").val(),
    };
    if (form.Provider_id == "") {
      $('#phonetxt').html('xxxxxxxxxxxx');
      $('#ubicationtxt').html('xxxxxxxxxxxx');
      return false;
    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getprovider',
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
    $("#supplytable").tableHTMLExport({ type: type, filename: 'Compra.pdf' });
  },
  new_provider: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = $('#provider-form-sale').serialize();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/newprovider',
      data: form,
      success: function (data) {
        $("#Providers").append('<option value =' + data.id + '>' + data.name + '</option>');
        $("#Providers").val(data.id).trigger('change');
        $("#ModalProvider").modal('hide');
        $('#provider-form-sale').trigger("reset");
        $.notify({
          // options
          title: "Ready!",
          message: 'A New Provider Was Created',
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
  new_supply: function () {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = $('#supply-form').serialize();
    form += '&provider_id=' + $('#Providers').val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/newsupply',
      data: form,
      success: function (data) {
        console.log(data);
        $("#supplyAdd").append(`<option value = ${data.id} selected > ${data.code}-${data.name}-${data.color}</option>`);
        $("#supplyAdd").val(data.id).trigger('change');
        $("#ModalProduct").modal('hide');
        $('#supply-form').trigger("reset");
        $.notify({
          // options
          title: "Ready!",
          message: 'A New Device Was Created',
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
  clear_provider: function () {
    $("#ModalProvider").modal('hide');
    $('#provider-form-sale').trigger("reset");
  },
  clear_supply: function () {
    $("#ModalProduct").modal('hide');
    $('#supply-form').trigger("reset");
  },
  getItem: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var id = $('#supplyAdd').val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItem',
      data: { id: id },
      success: function (data) {
        var price = parseFloat(data.price);
        $('#priceAdd').val(price);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  },
  deleteDetail: function (id) {
    Swal.fire({
      title: "Do You Want To Delete This Item?",
      text: "The Item Will Be Delete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/detail/' + id;
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
            $('#purDetail' + id).remove();
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
  openSupply: function () {
    transaction.getCat();
    $('#ModalProduct').modal('show');
  },
  closeSupply: function () {
    $('#ModalProduct').modal('hide');
    $('#supply-form').trigger("reset");
  },
  showChanges: function (id) {
    var my_url = url + '/showSNPurchase/' + id;
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: my_url,
      success: function (data) {
        $("#card_show2").empty().html(data);
        $("#show_blade2").show();
        $("#FormModalCSN").modal('show');
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
  updateMultiple: function (state) {
    Swal.fire({
      title: "Do You Want To Update The Location Of The Item/s?",
      text: "The Item/s Will Be Updated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update It!'
    }).then((resulto) => {
      if (resulto.value) {
        var my_url = url + '/updateSerialmultiple';
        var form = {
          SN: transaction.take_snl()
        };
        console.log(form);
        var type = "POST";

        actions.save(type, my_url, state, form, 'submod');

      }
    });

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
const print = {
  csv: function (location) {
    $("#tableBody").empty();
    var d = '';
    var filter = datasearchPrint();
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
          var date = new Date(data[index]['updated_at']);
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['provider']['name']}
          </td>
          <td>
          ${data[index]['invoice']}
          </td>
          <td>
          ${data[index]['total']}
          </td>
          <td>
          ${date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableDelivery").tableHTMLExport({ type: 'csv', filename: 'Purchase.csv' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  pdf: function (location) {
    $("#tableBody").empty();
    var d = '';
    var filter = datasearchPrint();
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
          var date = new Date(data[index]['updated_at']);
          d += `<tr>
          <td>
          ${data[index]['id']}
          </td>
          <td>
          ${data[index]['provider']['name']}
          </td>
          <td>
          ${data[index]['invoice']}
          </td>
          <td>
          ${data[index]['total']}
          </td>
          <td>
          ${date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableDelivery").tableHTMLExport({ type: 'pdf', filename: 'Purchase.pdf' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  label: function (data) {
    console.log(data);
    d = '<li class="list-group-item active">Serial Numbers  <button type="button" onclick="purchase.check_all_checkbox()" class="btn btn-warning float-right">Select All <i class="far fa-check-square"></i></button></li>';
    for (let index = 0; index < data.length; index++) {
      d += `<li class="list-group-item">
              <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input serialNumber" value="${data[index]['sn']}">${data[index]['sn']}
              </label>
            </li>`;
    }
    $("#list-serial-number").html(d);
    $("#myModalLabel").modal('show');
  },
  close: function () {
    $('#serialNumber').val('');
    $("#myModalLabel").modal('hide');
  },
}; 
