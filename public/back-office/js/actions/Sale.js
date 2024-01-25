
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
var locatin_sale = $('#location_sale').val();

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

function returnsubmod(request) {
    const arraymat_dp = request.data['mat_dp'].split('');
    let url = baseUrl;
    let mat = arraymat_dp[0];
    let text = mat =='D'?'Devolution':'Change'; 
    actions.back();
  if (mat == 'S') {
    messages(request);
    $('#criterionearch').val('mat_dp');
    $('#search').val(request.data['mat_dp']);
    $('.search-query').trigger('change');
  } else{
         url += mat == 'D'
              ?'/devolutions/'+locatin_sale+'?search='+request.data['mat_dp']+'&criterion=mat_dp'
              :'/changes/'+locatin_sale+'?search='+request.data['mat_dp']+'&criterion=mat_dp&type='+arraymat_dp[1];
        
              Swal.fire({
                title: 'Do you want to see the new'+text+'?',
                text: "the page redirects!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, redirect it!',
                cancelButtonText: 'No, stay here!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  location.replace(url)
                }else if (result.dismiss === Swal.DismissReason.cancel){
                  $('#criterionearch').val('id');
                  $('#search').val(request.data.sale_id);
                  $('.search-query').trigger('change');
                }
              })
            
  } 
    
  
}

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

  calculate_price_coil: function(data){
    console.log(data);
    var price = parseFloat(data['supply']['price']/['serial_number']['quantity']);
    var priceTotal = parseFloat(data['serial_number']['quantity']*price);
    var total = priceTotal;

    $('#subtotal_price').val(priceTotal.toFixed(2));
    $('#total_pricetxt').html('$'+ total.toFixed(2));

    return total;
  },
  update_quantity: function (data) {
    $.notify({
      // options
      title: "Advice!",
      message: 'Updated the amount of' + data.name,
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
      state_id: $('#state').val(),
      city_id: $('#city').val(),
      suburb_id: $('#colony').val(),
      zipcode: $('#zipcode').val(),
      date_delivery: $('#date_delivery').val(),
      map_detail_id: 0

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
                                  <button id="da${data['sn']['id']}" value="${data['sn']['id']}" class="btn btn-sm btn-danger rw" onclick="sales.supllydelete(${data['sn']['id']},'${data['snOld']['sn']}');">-</button>
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
                  <button id="da${data['sn']['id']}" value="${data['sn']['id']}" class="btn btn-sm btn-danger rw" onclick="sales.supllydelete(${data['sn']['id']},'',${data['sn']['sn']});">-</button>
                  <input id="supply${data['sn']['id']}"  type="hidden" value="${data['supply']['id']}"> 
                  <input id="price${data['sn']['id']}"  type="hidden" value="${priceDelivery}"> 
                  <input id="subtotal${data['sn']['id']}" class="qc" type="hidden"  value="${priceDelivery}"> 
              </td>
              </tr>`;
      if($('.sn_return_data').length > 0){
        $('#sn_return_data').children(`.${data['sn']['sn']}`).hide();
        $('#sn_return_data').children(`.${data['sn']['sn']}`).removeClass("all");
        $('#sn_return_data').val('');
        $('#sn_return_data').trigger('change');
       
      }
      
             
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
  },
  get_clients: function (clients) {
    let datos = `<option value="">Select Client</option>`;

    $.each(clients, function (idx, cli) {
      datos += `<option class="opt${cli.id}" value="${cli.id}">${cli.name}</option>`;
    });

    $("#type_client").html(datos);
  },
  get_type_work: function (works) {
    let datos = `<option value="">Select Employee</option>`;

    $.each(works, function (idx, work) {
      datos += `<option class="opt${work.id}" value="${work.id}">${work.name}</option>`;
    });

    $("#work_type").html(datos);
  },
  get_cities: function (cities) {
    let datos = `<option value="">Select City</option>`;

    $.each(cities, function (idx, cli) {
      datos += `<option class="opt${cli.id}" value="${cli.id}">${cli.name}</option>`;
    });

    $("#city").html(datos);
  },
  get_suburbs: function (suburbs, zipcode) {
    let datos = `<option value="">Select Colony</option>`;
    if (zipcode !== '') {
      $.each(suburbs, function (idx, sub) {
        if (sub.zipcode == `${zipcode}`) {
          datos += `<option class="opt${sub.id}" value="${sub.id}">${sub.zipcode}-${sub.colony}</option>`;
        }
      });

    } else {
      $.each(suburbs, function (idx, sub) {
        datos += `<option class="opt${sub.id}" value="${sub.id}">${sub.zipcode}-${sub.colony}</option>`;
      });
    }


    $("#colony").html(datos);
  }, 
  get_supplies: function (coils) {
  let datos = `<option value="">Select Cable</option>`;

  $.each(coils, function (idx, coil) {
    datos += `<option class="opt${coil.id}" value="${coil.id}">${coil.name}-${coil.serial_number}-${coil.location}</option>`;
  });

  $("#supply_coil").html(datos);
  },
  get_type_cable: function (coils) {
  let datos = `<option value="">Select Piece of Cable</option>`;

  $.each(coils, function (idx, coil) {
    datos += `<option class="opt${coil.id}" value="${coil.serial_number}">${coil.quantity}m-${coil.name}-${coil.serial_number}-${coil.location}</option>`;
  });

  $("#old_type_cable").html(datos);
},
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

    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/' + id;
      var type = "PUT";
    }
    actions.save(type, my_url, true, form, 'submod'); 
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Cancel The Delivery?",
      text: "The Delivery Will Be Canceled",
      icon: 'warning',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel It!'
    }).then((result) => {
      let comment = result.value.length > 0? result.value:'No comments'
      if (comment) {
        var my_url = url + '/' + id + '?comment=' + comment;
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
    var page = window.location.href;
    no = page.split("#");
    Swal.fire({
      title: "Do You Want To Change the Delivery Status?",
      text: "The Delivery Will Change State",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var type = "GET";
        var my_url = url + '/delivery/' + id;
        actions.save(type, my_url, true, result.value, 'submod');
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
     
    }).then((result) => {
      if (result.value) {
        var type = "POST";
        var my_url = url + '/delivery/' + id;
        var formData = new FormData();
        actions.save(type, my_url, true, result.value, 'submod');
      }
    });
  },
  payout: function (id) {
    var page = window.location.href;
    no = page.split("#");

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
        var type = "GET";
        var my_url = url + '/payout/' + id;
        actions.save(type, my_url, true, result.value, 'submod');
      }
    });
  },
  returned: function (id) {
    var page = window.location.href;
    no = page.split("#");

    Swal.fire({
      title: "Is This Delivery At The Office?",
      text: "The Delivery Will Change State.",
      icon: 'warning',
      html: '<input id="datepicker" readonly class="swal2-input">',
      customClass: 'swal2-overflow',
      onOpen: function () {
        $('#datepicker').datepicker({
          dateFormat: 'yy/mm/dd',
          defaultDate: new Date(),
        });
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change It!'
    }).then((result) => {
      if (result.value) {
        var type = "GET";
        var my_url = url + '/returned/' + id + '?date=' + $('#datepicker').val();
        actions.save(type, my_url, true, result.value, 'submod');
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
  openModalCoil: function () {
        $('#searchCable').val('');
        $("#supply_coil").val('')
        $("#supply_coil").trigger('change');
        $("#old_type_cable").val('')
        $("#old_type_cable").trigger('change');
        $("#old-cable").hide();
        $("#old-cable-btn").hide();
        $("#new-cable").hide();
        $("#new-cable-btn").hide();
        $('#cable-form').trigger('reset');
        $("#ModalCable").modal('show');
        
  },
  openCoil: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var form = {
      quantity: $('#searchCable').val(),
    }

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/modalCoil',
      data: form,
      success: function (data) {
        
        if(data['coils']){
          transaction.get_supplies(data['coils']);
          $("#old-cable").hide();
          $("#old-cable-btn").hide();
          $("#new-cable").show();
          $("#new-cable-btn").show();
          $('#cable-form').trigger('reset');
        }else{
          transaction.get_type_cable(data['type_cable']);
          $("#new-cable").hide();
          $("#new-cable-btn").hide();
          $("#old-cable").show();
          $("#old-cable-btn").show();
          $('#cable-form').trigger('reset');

        }
        $('#searchCable').val('');
      
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });

  },
  clear_supply: function () {
    $("#ModalCable").modal('hide');
    $('#cable-form').trigger("reset");
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
  supllydelete: function (supply, sn = '', returned = '') {

    data = { supply: { price: $("#subtotal" + supply).val() }, op: 'subs' };
    transaction.calculate_total(data);

    if (sn) {
      $('#sn_old').children("." + sn).show();
      $('#sn_old').children("." + sn).addClass("all");
    }
    if(returned){
        $('#sn_return_data').children("." + returned).show();
        $('#sn_return_data').children("." + returned).addClass("all");
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
      $("#zipcode").val();
      $("#state").val();
      $("#city").val();
      $("#colony").val();
      return false;
    }
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getclient',
      data: form,
      success: function (data) {
        console.log(data)
        $('#phonetxt').html(data.client.phone);
        $('#ubicationtxt').html(data.client.street);

        if (data.detail.zip_code) {
          $("#zipcode").val(data.detail.zip_code).trigger("change");
        } else {
          $("#zipcode").val('');
          $("#state").val(data.client.state_id).trigger("change");
          setTimeout(function () {
            if (data.client.city_id) {
              $("#city").val(data.client.city_id);
              $("#city").trigger("change");

              $.notify({
                title: "Ready!",
                message: 'Ubication selected.',
              }, {
                type: 'success'
              });
            }
          }, 500);

        }

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
        $("#clientModal").modal('hide');
        $('#client-form-sale').trigger("reset");
        $.notify({
          // options
          title: "Ready!",
          message: 'New Employee was Created',
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
    $("#clientModal").modal('hide');
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

    } else if (code.length > 11) {
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/getItem',
        data: {
          code: code,
          st: $('#st').val(),
          sn_old: $('#sn_old').val()
        },
        success: function (data) {


          if ($(`#list${data['sn']['id']}`).length == 0) {
            $('.btn-detail-supply').prop("disabled", false);
            $("#supplytable").append(transaction.row_data(data));
            transaction.calculate_total(data);
            $('#supplyAdd').val('');
            $("#suplycard").empty().html('');
            $('#supplyAdd').trigger('change');
            $('#quantityAdd').val(1);
            $('#row-supply').hide();
            $('#scanBarcode').val('');

          } else {
            $("#suplycard").empty().html('<h4 class="text-danger">No Repeat Code.</h4>');
          }


        },
        error: function (data) {
          console.log('Error:', data);
          messageserror(data);
          $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
        }
      });
    }
  },
  getItemOldCable: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#old_type_cable').val();


    if (code.length == 0) {

      $("#suplycard").empty().html('');

      return false;

    } else if (code.length > 11) {
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/getItem',
        data: {
          code: code,
          st: $('#st').val(),
          sn_old: $('#sn_old').val()
        },
        success: function (data) {


          if ($(`#list${data['sn']['id']}`).length == 0) {
            $('.btn-detail-supply').prop("disabled", false);
            $("#supplytable").append(transaction.row_data(data));
            transaction.calculate_total(data);
            $('#supplyAdd').val('');
            $("#suplycard").empty().html('');
            $('#supplyAdd').trigger('change');
            $('#quantityAdd').val(1);
            $('#row-supply').hide();
            $('#scanBarcode').val('');
            $("#ModalCable").modal('hide');
            $('#cable-form').trigger("reset");



          } else {
            $("#suplycard").empty().html('<h4 class="text-danger">No Repeat Code.</h4>');
          }


        },
        error: function (data) {
          console.log('Error:', data);
          messageserror(data);
          $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
        }
      });
    }
  },
  getItemCable: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      id: $('#supply_coil').val(),
      quantity: $('#quantity_cable').val(),
    };

  
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/getItemCable',
        data: form,
        success: function (data) {

          console.log(data);
          if ($(`#list${data['sn']['id']}`).length == 0) {
            $('.btn-detail-supply').prop("disabled", false);
            $("#supplytable").append(transaction.row_data(data));
            transaction.calculate_total(data);
            $('#supplyAdd').val('');
            $("#suplycard").empty().html('');
            $('#supplyAdd').trigger('change');
            $('#quantityAdd').val(1);
            $('#row-supply').hide();
            $('#scanBarcode').val('');
            $("#ModalCable").modal('hide');
            $('#cable-form').trigger("reset");

          } else {
            $("#suplycard").empty().html('<h4 class="text-danger">No Repeat Code.</h4>');
          }


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
  openModalClient: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/modalClient',
      success: function (data) {
        transaction.get_clients(data['type']);
        transaction.get_type_work(data['work_type']);
        $("#clientModal").modal('show');
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });

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
  get_date_cities: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      state: $("#state").val(),
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
    var zipcode = $("#zipcode").val();
    var form = {
      city: $("#city").val(),
      zipcode: zipcode,
    };

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getSuburbs',
      data: form,
      success: function (data) {

        transaction.get_suburbs(data, zipcode);

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

    var zipcode = $("#zipcode").val();
    var my_url = $("#url").val() + '/getZipcode';

    if (zipcode.length == "") {
      $("#state").val('');
      $("#state").trigger("change");
      $("#city").val('');
      $("#city").trigger("change");


      return false;
    }
    $.ajax({
      type: "GET",
      url: my_url,
      data: { zipcode: zipcode },
      success: function (data) {
        $("#state").val(data.suburb.state_id);
        $("#state").trigger("change");
        setTimeout(function () {
          if (data.suburbs.length > 0) {
            $("#city").val(data.suburb.city_id);
            $("#city").trigger("change");

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
  get_date_cities: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = {
      state: $("#state").val(),
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
  }
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
      assignment_date: $('#assignment_date').val(),
      total: $('#total_sale').val(),
      saleDetail: transaction.take_rows()
    };

    var my_url = url + '/createDevolution';
    var type = "POST";

    actions.save(type, my_url, true, form, 'submod'); 
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete Devolution?",
      text: "The Devolution Will Be Delete",
      icon: 'warning',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {

      var my_url = url + '/devolution/' + id + '?comment=' + result.value;
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
      data: {
        code: code,
        sale_id: sale_id,
        st: $('#st').val(),
        sn_old: $('#sn_old').val()
      },
      success: function (data) {

        if ($(`#list${data['sn']['id']}`).length == 0) {
          $('.btn-detail-supply').prop("disabled", false);
          $("#supplytable").append(transaction.row_data(data));
          transaction.calculate_total(data);
          $('#supplyAdd').val('');
          $("#suplycard").empty().html('');
          $('#supplyAdd').trigger('change');
          $('#quantityAdd').val(1);
          $('#row-supply').hide();
          $('#scanBarcode').val('');
        } else {
          $("#suplycard").empty().html('<h4 class="text-danger">No Repeat Code.</h4>');
        }


      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
        $("#suplycard").empty().html('<h4 class="text-danger">Data Not Found, Enter Other Code.</h4>');
      }
    });
  },
  getItemSelect:  function (sale_id) {
 
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      var code = $('#sn_return_data').val();
  
      if (code.length == 0) {
  
        $("#suplycard").empty().html('');
  
        return false;
  
      }
      // Populate Data in Edit Modal Form
      $.ajax({
        type: "GET",
        url: url + '/getItemDevolution',
        data: {
          code: code,
          sale_id: sale_id,
          st: $('#st').val(),
          sn_old: $('#sn_old').val()
        },
        success: function (data) {
  
          if ($(`#list${data['sn']['id']}`).length == 0) {
            $('.btn-detail-supply').prop("disabled", false);
            $("#supplytable").append(transaction.row_data(data));
            transaction.calculate_total(data);
            $('#supplyAdd').val('');
            $("#suplycard").empty().html('');
            $('#supplyAdd').trigger('change');
            $('#quantityAdd').val(1);
            $('#row-supply').hide();
            $('#scanBarcode').val('');
          } else {
            $("#suplycard").empty().html('<h4 class="text-danger">No Repeat Code.</h4>');
          }
  
  
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
  }
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
      assignment_date: $('#assignment_date').val(),
      observation: $('#observation').val(),
      total: $('#total_sale').val(),
      saleDetail: transaction.take_rows_changes()
    };
    var my_url = url + '/createChange';
    var type = "POST";

    actions.save(type, my_url, true, form, 'submod'); 
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete Devolution?",
      text: "The Devolution Will Be Delete",
      input: 'textarea',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/change/' + id + '?comment=' + result.value;
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
  },
  print: function (type) {
    $("#tabledeliveries").tableHTMLExport({ type: `${type}`, filename: `ReportOfCategory.${type}` });
  },
  urlExport() {
    var data = {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      delivery: $('#deliverysearch').val(),
      client: $('#clientsearch').val(),
      date: $('#datesearch').val(),
      cost_center: $("#cost_center_search").val(),
    };
    search = data.search.length > 0 ? data.search : '';
    type = data.type ? data.type : '';
    delivery = data.delivery.length > 0 ? data.delivery : '';
    client = data.client.length > 0 ? data.client : '';
    date = data.date ? data.date : '';
    cost_center = data.cost_center ? data.cost_center : '';

    exportUlr = url + '/export?search=' + search + '&type=' + type + '&delivery=' + delivery + '&client=' + client + '&date=' + date + '&cost_center=' + cost_center;
    window.open(exportUlr, '_blank');
  }
};

