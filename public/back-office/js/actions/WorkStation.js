
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
      order: answer['order'],
      status: answer['status'],

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),

    };

  return data;
}

function DataItem(detail) {

  buttons = `<button type="button" class="btn btn-danger" onclick="ws.delete(${detail['detail']['id']})"><i class="fas fa-minus"></i></button>`;


  dato = ` <li class="list-group-item item-${detail['detail']['id']}">
              <div class="col-sm-12">
                  <div class="row">
                      <div class="col-sm-5 text-center">
                          <h6>${detail['SN']['sn']}</h6>
                          ${detail['supply']['name']}
                      </div>
                      <div class="col-sm-5 text-center"> 
                        <h6>${detail['supply']['model']}</h6>
                        ($${detail['supply']['price']})
                        </div>
                      <div class="col-sm-2 text-center">
                          <div class="btn-group">
                              ${buttons}
                          </div>
                      </div>
                  </div>
              </div>
          </li>`;

  return dato;
}

const transactions = {
  addItem: function (location, sn) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var md = $('#map_detail').val();

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/addItem',
      data: { md: md, sn: sn, location: location },
      success: function (data) {

        $('#scanBarcode').val('').trigger('change');
        messages({ title: 'Success!', text: 'Device Has Been Added' });
        var dato = "";
        if (data.length == 0) {
          dato += `<li id="without-item" class="list-group-item">No Data</li>`;
        } else {
          $.each(data['devices'], function (index, da) {
            dato += DataItem(da);
          });
        }
        $("#items-menu").html(dato);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
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
      map_detail_id: $('#map_detail_id').val()
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
  get_data_select: function (data,select) {

    let datos = `<option value="">Select ${select.name}</option>`;
 
      $.each(data, function (idx, item) {
        datos += `<option class="opt${item.id}" value="${item.id}">${item.name}</option>`;
      });
    
    $(`#${select.html}`).html(datos);
    $(`#${select.html}`).val('').trigger('change'); 
  },

  take_data_change:function(id){

  
    let locationTxt = $( "#location_id option:selected" ).text()
    let sectionTxt = $( "#section_id option:selected" ).text();
    let statioTxt = $( "#station_id option:selected" ).text();
    let name = `${locationTxt}-${sectionTxt}-${statioTxt}`
    let location = $("#location_id").val();
    let section = $("#section_id").val();
    let station = $("#station_id").val();
    let old_station = id;
    let sn = [];

    $(".ws").each(function () {
      var id = $(this).val();
      var sn_id = $("#sn-"+id).val();
      if (this.checked) {
        sn.push({
          id:id,
          sn_id:sn_id
        });
      }

    });
    if(location < 1 || section < 1 || station < 1 || sn.length < 1){
       return false;
    }else{
      return {
                name:name,
                location:location,
                section:section,
                station:station,
                sn:sn,
                old_station:old_station
              }
    }
  },
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
};
//section for const js 
const ws = {
  detail: function (id) {
    var my_url = url + '/' + id + '/show';
    actions.show(my_url, '', true, true);
  },
  changeDevices: function (id) {
    var my_url = url + '/' + id + '/changeDetail';
    actions.show(my_url, '', true, true);
  },
  workstationDelivery: function (id) {
    var my_url = url + '/' + id + '/createDelivery';
    actions.show(my_url, id,'form');
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url, '', true, true);
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, '', true, true);
  },
  save: function (state, id = '') {
    var form = $('#map-detail-form').serialize();
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
      title: "Do You Want To Delete The device?",
      text: "The Device Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        var md = $('#map_detail').val();

        // Populate Data in Edit Modal Form
        $.ajax({
          type: "delete",
          url: my_url,
          data: { md: md },
          success: function (data) {
            messages({ title: 'Success!', text: 'Device Has Been Deleted' });
            var dato = "";
            if (data.length == 0) {
              dato += `<li id="without-item" class="list-group-item">No Data</li>`;
            } else {
              $.each(data['devices'], function (index, da) {
                dato += DataItem(da);
              });
            }
            $("#items-menu").html(dato);
          },
          error: function (data) {
            console.log('Error:', data);
            messageserror(data);
          }
        });
      }
    });

  },
  getItem: function (location) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var code = $('#scanBarcode').val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/getItem',
      data: { code: code },
      success: function (data) {
        transactions.addItem(data.location, data.sn.id);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }, 
  getSelect: function (name,select,url) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var id = $(`#${name}`).val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + `/${url}`,
      data: { id: id },
      success: function (data) {
        transactions.get_data_select(data,select);
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }, 
 changeSerialNumbers: function (id) {
    var formData = transactions.take_data_change(id);
    console.log(formData);
    if(formData == false){
      mensageError({
        title:"Error!",
        text:"You Don't Have Complete All Fields",
        type:"danger"
      })

      return false;
    }
    Swal.fire({
      title: "Do You Want To Move To?",
      text: "The Devices Will Be Moved To",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Move It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/'+id+'/changeDetail';
        var type = "POST";
        actions.save(type, my_url,'update', formData);
      }
    });

  },
  checkAllDev:function(){
    $('.ws').not(this).prop('checked', this.checked);
  }

};

const sales = {
  back: function () {
    actions.back();
  },
  save: function (state,location) {
    var deliveries = baseUrl + '/sales/' + location;
    var form = {
      delivery: transactions.take_data(),
      saleDetail: transactions.take_rows()
    };
    console.log(form);
    var my_url = baseUrl + '/sales/' + location + '/create';
    var type = "POST";

    actions.save(type, my_url, state, form);

    Swal.fire({
      icon: 'success',
      title: 'Show Deliveries',
      text: 'Do You Want To Go To Deliveries?',
      footer: '<a href="'+deliveries+'">Go To Deliveries</a>'
    })
  },
  addSupply: function (sn,location) {
    $('.btn-detail-supply').prop("disabled", true);

    if ($('#list' + sn).length > 0) {
      mensageError({ title: 'Error!', text: 'You Have Already Added That Device' });
      return false;
    }
    var my_url = baseUrl + '/sales/' + location + '/supply';
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
      url: my_url,
      data: form,
      success: function (data) {

        $('.btn-detail-supply').prop("disabled", false);
        $("#supplytable").append(transactions.row_data(data));
        console.log(data);
        transactions.calculate_total(data);
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
  addSupplyChange: function (sn,location) {
    $('.btn-detail-supply').prop("disabled", true);

    if ($('#list' + sn).length > 0) {
      mensageError({ title: 'Error!', text: 'You Have Already Added That Device' });
      return false;
    }
    if ($('#sn_old').val().length == 0) {
      mensageError({ title: 'Error!', text: "You Don't Selected Any Device" });
      return false;
    }
    var my_url = baseUrl + '/sales/' + location + '/supply';
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
      url: my_url,
      data: form,
      success: function (data) {

        $('.btn-detail-supply').prop("disabled", false);
        $("#supplytable").append(transactions.row_data(data));
        console.log(data);
        transactions.calculate_total(data);
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
    transactions.calculate_total(data);

    if (sn) {
      $('#sn_old').children("." + sn).show();
      $('#sn_old').children("." + sn).addClass("all");
    }

    $("#list" + supply).remove();
    if ($('.supply-row').length <= 0) {

      $('#row-supply').show();
    }
  },
  get_date_cities: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/getCities';
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
      url: my_url,
      data: form,
      success: function (data) {
        transactions.get_cities(data);
      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_date_suburbs: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/getSuburbs';
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
      url: my_url,
      data: form,
      success: function (data) {

        transactions.get_suburbs(data, zipcode);

      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_zipcode: function (location) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
      }
    });

    var zipcode = $("#zipcode").val();
    var my_url =  baseUrl + '/sales/' + location + '/getZipcode';

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
  get_date_cities: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/getCities';
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
      url: my_url,
      data: form,
      success: function (data) {
        transactions.get_cities(data);
      },
      error: function (data) {
        console.log('Error:', data);

      }
    });
  },
  get_client: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/getclient';
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
      url: my_url,
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
                message: 'Ubication Selected.',
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
  new_client: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/newclient';
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    var form = $('#client-form-sale').serialize();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: my_url,
      data: form,
      success: function (data) {
        $("#client").append('<option value =' + data.id + '>' + data.name + '</option>');
        $("#client").val(data.id).trigger('change');
        $("#clientModal").modal('hide');
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
  clear_client: function (location) {
    $("#clientModal").modal('hide');
    $('#client-form-sale').trigger("reset");
  },
  getItem: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/getItem';
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
        url: my_url,
        data: {
          code: code,
          st: $('#st').val(),
          sn_old: $('#sn_old').val()
        },
        success: function (data) {


          if ($(`#list${data['sn']['id']}`).length == 0) {
            $('.btn-detail-supply').prop("disabled", false);
            $("#supplytable").append(transactions.row_data(data));
            transactions.calculate_total(data);
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
  openModalClient: function (location) {
    var my_url = baseUrl + '/sales/' + location + '/modalClient';
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
        transactions.get_clients(data['type']);
        transactions.get_type_work(data['work_type']);
        $("#clientModal").modal('show');
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });

  },
};

