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

function datasearch(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      work_type_id: $('#work_type_id').val(),
      type_client_id: $('#type_client_id').val(),
      InOut: $('#inout').val(),
      supply_id: $('#supply_id').val(),
      category: $('#category').val(),
      criterion: $('#criterion').val(),
      provider: $('#providersearch').val(),
      employee_id: $('#employee_id').val(),
      date_start: $('#datestarPsearch').val(),
      date_end: $('#dateendPsearch').val(),
    }
    : {
      search: $('#search').val(),
      type: $('#typesearch').val(),
      work_type_id: $('#work_type_id').val(),
      type_client_id: $('#type_client_id').val(),
      InOut: $('#inout').val(),
      supply_id: $('#supply_id').val(),
      category: $('#category').val(),
      criterion: $('#criterion').val(),
      provider: $('#providersearch').val(),
      employee_id: $('#employee_id').val(),
      date_start: $('#datestarPsearch').val(),
      date_end: $('#dateendPsearch').val(),
    };

  return data;
}

const print = {
  csv: function (type) {
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
          var code = '';
          if (data[index]['code'] == null) {
            code = "No Code";
          } else {
            code = data[index]['code'];
          }
          d += `<tr>
          <td>
          ${code}
          </td>
          <td>
          ${data[index]['device']}
          </td>
          <td>
          ${data[index]['image']}
          </td>
          <td>
          ${data[index]['quantity']}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);

      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },

  pdf: function (type) {
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
          var code = '';
          if (data[index]['code'] == null) {
            code = "No Code";
          } else {
            code = data[index]['code'];
          }
          d += `<tr>
          <td>
          ${code}
          </td>
          <td>
          ${data[index]['device']}
          </td>
          <td>
          ${data[index]['image']}
          </td>
          <td>
          ${data[index]['quantity']}
          </td>
          </tr>`;
        }
        $("#tableBody").append(d);
        $("#tableDevices").tableHTMLExport({ type: 'pdf', filename: 'ReportOfDevices.pdf' });
      },
      error: function () {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  }

};

const report = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.show(my_url, id, 'form');
  },
  back: function () {
    actions.back();
  },
  print: function (type) {
    $("#tablepurchase").tableHTMLExport({ type: `${type}`, filename: `ReportOfDevices.${type}` });
  },
  search: function (id) {

    var filter = {
      date_start: $('#datestarPsearch').val(),
      date_end: $('#dateendPsearch').val(),

    };
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $.ajax(
      {
        url: url + '/' + id + '/detail',
        data: filter,
        type: "get",
        datatype: "html"
      }).done(function (data) {
        $("#detailPurchase-modal").empty().html(data);
      }).fail(function (jqXHR, ajaxOptions, thrownError) {
        alert('error');
      });
  },
  printD: function (type) {
    $("#tableDetail").tableHTMLExport({ type: `${type}`, filename: `Report-devices-detail.${type}` });
  }
};

const reportc = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.show(my_url, id);
  },
  print: function (type) {
    $("#tablecategory").tableHTMLExport({ type: `${type}`, filename: `ReportOfCategory.${type}` });
  },
  urlExport() {
    var data = {
      search: $('#search').val(),
      type: $('#typesearch').val(),
    };
    search = data.search.length > 0 ? data.search : '';
    type = data.type ? data.type : '';

    exportUlr = url + '/export?search=' + search + '&type=' + type;
    window.open(exportUlr, '_blank');
  },
};

const reportDE = {
  detail: function (id) {
    var my_url = url + '/' + id;
    actions.show(my_url, id);
  },
  print: function (type) {
    $("#tabledevicesemployee").tableHTMLExport({ type: `${type}`, filename: `ReportDevicesOfEmployees.${type}` });
  },
  urlExport() {
    var data = {
      work_type_id: $('#work_type_id').val(),
      type_client_id: $('#type_client_id').val(),
      InOut: $('#inout').val(),
      supply_id: $('#supply_id').val(),
      employee_id: $('#employee_id').val(),
      date_start: $('#datestarPsearch').val(),
      date_end: $('#dateendPsearch').val(),
    };
    work_type_id = data.work_type_id.length > 0 ? data.work_type_id : '';
    type_client_id = data.type_client_id.length > 0 ? data.type_client_id : '';
    InOut = data.InOut.length > 0 ? data.InOut : '';
    supply_id = data.supply_id.length > 0 ? data.supply_id : '';
    employee_id = data.employee_id.length > 0 ? data.employee_id : '';
    date_start = data.date_start ? data.date_start : '';
    date_end = data.date_end ? data.date_end : '';

    exportUlr = url + '/export?work_type_id=' + work_type_id + '&type_client_id=' + type_client_id + '&InOut=' + InOut + '&supply_id=' + supply_id + '&employee_id=' + employee_id + '&date_start=' + date_start + '&date_end=' + date_end;
    window.open(exportUlr, '_blank');
  },
};