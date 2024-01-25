
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
var supp = $('#supply_id').val();
//section for jquery
$(document).ready(function () {

  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $(".select2-basic").select2({
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
      criterion: $('#typesearch').val(),
      order: answer['order'],
      status: answer['status'],
      status_id: $('#statuss_id').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      barcode: $('#barcode').val(),
      cost_center: $('#cost_center_search').val(),

    }
    : {
      search: $('#search').val(),
      barcode: $('#barcode').val(),
      type: $('#typesearch').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      status_id: $('#statuss_id').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      cost_center: $('#cost_center_search').val(),


    };

  return data;
}

function calculate_total() {
  $stock = $('#stock').val();
  $quantity_in = $("#quantity_in").val();
  $quantity_out = $("#quantity_out").val();
  $total = parseInt($stock) + parseInt($quantity_in) + parseInt($quantity_out);
  $("#total_supply").val($total);
}

//section for const js 
const supplys = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.detail(my_url, id);
  },
  historical: function (id) {
    var my_url = url + '/historical/' + id;
    actions.detail(my_url, id);
  },
  print: function (sn) {
    console.log(sn);
    $('#serialNumber').val(String(sn));
    $("#myModalLabel").modal('show');
  },
  printClose: function () {
    $('#serialNumber').val('');
    $("#myModalLabel").modal('hide');
  },
  create: function () {
    var my_url = url + '/create';
    actions.show(my_url);
  },
  edit: function (id) {
    var my_url = url + '/' + id + '/edit';
    actions.show(my_url, id);
  },
  save: function (state, id = '') {

    var formData1 = document.getElementById('supply-form');
    var form1 = new FormData(formData1);
    form1.append("status_id", $("#status_id").val());
    console.log(form1);
    var my_url = url + '/create';
    var type = "POST";

    if (state == 'update') {
      var my_url = url + '/' + id;
    }
    actions.save(type, my_url, state, form1, 'file');
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Device?",
      text: "The Device Will Be Removed",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.delete(my_url);
      }
    });

  },
  restored: function (id) {
    Swal.fire({
      title: "Do You Want To Restore The Device?",
      text: "The Device Will be Restored",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restore It!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/' + id;
        actions.restored(my_url);
      }
    });
  },
  showMultiple: function () {
    var val = [];
    $(':checkbox:checked').each(function (i) {
      val[i] = $(this).val();
    });
    if (val.length > 0) {
      Swal.fire({
        title: "Do You Want To Update The Location Of The Item/s?",
        text: "The Item/s Will Be Updated",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update It!'
      }).then((resulto) => {
        if (resulto.value) {
          var my_url = url + '/updateSerialmultiple';
          var formData = new FormData();
          var json_arr = JSON.stringify(val);
          formData.append('serials', json_arr);
          formData.append('loct', $("#locationC").val());
          console.log(formData);
          $.ajax({
            url: my_url,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
              location.reload();
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'At Least One Item Must Be Selected',
        footer: '<a href="">Why Do I Have This Issue?</a>'
      });
    }
  }
};


function DataItem(detail) {

  buttons = `<button type="button" class="btn btn-danger" onclick="snd.delete(${detail['detail']['id']})"><i class="fas fa-minus"></i></button>`;
  

  dato = ` <li class="list-group-item item-${detail['detail']['id']}">
              <div class="col-sm-12">
                  <div class="row">
                      <div class="col-sm-5 text-center">
                          <h6>${detail['SN']['sn']}</h6>
                          ${detail['supply']['name']}
                      </div>
                      <div class="col-sm-5 text-center"> 
                        <h6>${detail['supply']['model']}</h6>
                        ${detail['SN']['quantity']}m
                        ($${detail.price_format})
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

//section for const js 
const snd = {
  createSND: function (id) {
    var my_url = url + '/create/snd/' + id;
    actions.show(my_url);
  },
  updateSNCable: function (id) {
    var my_url = url + '/update/sncable/' + id;
    actions.show(my_url);
  },
  delete: function (id) {
    Swal.fire({
      title: "Do You Want To Delete The Device?",
      text: "The Device Will Be Eliminated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
      if (result.value) {
        var my_url = url + '/delete/snd/' + id;
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        var sn = $('#sn').val();

        // Populate Data in Edit Modal Form
        $.ajax({
          type: "delete",
          url: my_url,
          data: { sn: sn },
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
  getItem: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var code = $('#scanBarcode').val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/geItem/snd',
      data: { code: code },
      success: function (data) {
        snd.addItem(data.sn.id);
        $('#scanBarcode').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  getItemCable: function () {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var quantitysnd = $('#quantitysnd').val();
    // Populate Data in Edit Modal Form
    $.ajax({
      type: "GET",
      url: url + '/geItem/sncable',
      data: { quantitysnd: quantitysnd },
      success: function (data) {
        snd.addItemCable(data.sn.id);
        $('#quantitysnd').val('');
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },
  addItem: function (snd) {
    console.log(snd);
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var sn = $('#sn').val();

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/create/snd',
      data: { sn: sn, snd: snd },
      success: function (data) {
        $('#scanBarcode').val('');
        messages({ title: 'Success!', text: 'Device Has Been Added' });
        var dato = "";
        console.log(data);
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
  addItemCable: function (sn_id) {

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    var quantitysnd = $('#quantitysnd').val();
    console.log(quantitysnd);


    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url + '/create/sncable',
      data: { id: sn_id, quantity: quantitysnd },
      success: function (data) {
        $('#quantitysnd').val('');
        messages({ title: 'Success!', text: 'Device Has Been Added' });
        var dato = "";
        console.log(data);
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



};

