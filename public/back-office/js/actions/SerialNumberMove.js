
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
var supp = $('#supply_id').val();
var globalArray = [];
//JsBarcode(".barcode").init();
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
      location_id: $('#locationsearch').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      barcode: $('#barcode').val(),
      moved: JSON.parse(localStorage.getItem('serialNumbers')),

    }
    : {
      search: $('#search').val(),
      barcode: $('#barcode').val(),
      type: $('#typesearch').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      status_id: $('#statuss_id').val(),
      location_id: $('#locationsearch').val(),
      supply_id: $('#supply_id').val(),
      invoice: $('#invoiceSearch').val(),
      moved: JSON.parse(localStorage.getItem('serialNumbers')),


    };

  return data;
}

//section for const js 
const snMove = {
  moveToLocation: function () {
    let data = localStorage.getItem('serialNumbers');
    var my_url = url + '/moveToLocation?moved=' + data;
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
        $("#movetolocation").empty().html(data);
      }
    });
  },
  save: function (state, id = '') {
    Swal.fire({
      title: 'Select Location To Moved',
      input: 'select',
      inputOptions: {
        '1': 'Mexico',
        '2': 'Belize',
        '3': 'Belize(San Ignacio)',
      },
      inputPlaceholder: 'Required',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Move It!',
      cancelButtonText: 'Cancel',
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== '') {
            resolve();
          } else {
            resolve('You Need To Select A Location');
          }
        });
      }
    }).then(function (result) {
      if (result.isConfirmed) {
        var data = localStorage.getItem("serialNumbers");
        var form = {
          location: result.value,
          serials: data,
        };
        var my_url = url + '/moveToLocation';
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        // Populate Data in Edit Modal Form
        $.ajax({
          type: "POST",
          url: my_url,
          data: form,
          success: function (data) {
            localStorage.removeItem("serialNumbers");
            $("#movetolocation").empty().html('<ul class="list-group"><li class="list-group-item head-biopy"><strong>Move To Location</strong></li><li class="list-group-item">No Data</li></ul>');
            var filter = datasearch();
            getData(1, filter);
            globalArray = [];
            messages({ title: "Success!", text: 'Every serial number moved', type: 'success' });
          },
          error: function (data) {
            console.log('Error:', data);
            messageserror(data);

          }
        });
      }
    });

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

function SaveDataToLocalStorage(id) {
  //push to global array   
  globalArray.push(id);
  //set gblobal array to local storage
  localStorage.setItem('serialNumbers', JSON.stringify(globalArray));
  snMove.moveToLocation();
  $("#Serial_Number" + id).hide();
  messages({ title: "Success!", text: 'Add Serial Number For Move', type: 'success' });
}

function DeleteDataToLocalStorage(id) {
  //get index for global array 
  let index = globalArray.indexOf(id);
  //delete vale in global array
  delete globalArray[index];
  //filter for element null
  const results = globalArray.filter(element => {
    return element !== null;
  });
  //update global array 
  globalArray = results;
  //set gblobal array to local storage
  localStorage.setItem('serialNumbers', JSON.stringify(globalArray));
  $("#snMove" + id).remove();
  $("#Serial_Number" + id).show();

  messages({ title: "Success!", text: 'Removed Rerial Number For Move', type: 'warning' });
}