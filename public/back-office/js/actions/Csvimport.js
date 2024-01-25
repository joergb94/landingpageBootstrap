var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

const convert = {

  csvImportShow: function (location) {
    var my_url = baseUrl + `/csv/${location}/import`;
    actions.show(my_url, '', '', true);
  },

  send: function (results, location) {
    var d = '';
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      type: "POST",
      url: baseUrl + `/csv/${location}/import`,
      data: {
        'data': results
      },
      success: function (data) {
        if (data['statuscode'] == 250) {
          $("#bnInsert").empty();
          data['notInserted'].forEach(element => {
            d += `
                        <tr class="table-danger">
                        <td>
                        ${element['name']}
                        </td>
                        <td>
                        ${element['phone']}
                        </td>
                        <td>
                        ${element['email']}
                        </td>
                        </tr>
                        `;
          });
          $("#bnInsert").append(d);
          $("#cnemployee").css('display', 'block');
          messages(data['message']);

        }
        else {
          messages(data['message']);
        }
        var filter = datasearch();
        getData(1, filter);
      }
    });
  },
  fileType: function (filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  },
  csvToJson: function (location) {
    if ($("#csvfile").val() == 0 || convert.fileType($("#csvfile").val()) != "csv") {
      Swal.fire({
        title: `File Error`,
        text: "The File Must Be .csv And No Empty",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
        }
      });
      return false;
    }
    $('#csvfile').parse({
      config: {
        complete: function (results, file) {
          if (results.data.length < 1) {
            mensageError({ title: 'Error!', text: 'You Have Already Added That Device' });
            return false;
          }
          var datacsv = results.data;
          Swal.fire({
            title: `Do you want insert ${datacsv.length - 1} Employees?`,
            text: "The Employees Will Be Inserted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Insert Them!'
          }).then((result) => {
            if (result.value) {
              convert.send(datacsv, location);
            }
          });
        }
      },
      before: function (file, inputElem) {
        // executed before parsing each file begins;
        // what you return here controls the flow
      },
      error: function (err, file, inputElem, reason) {
        // executed if an error occurs while loading the file,
        // or if before callback aborted for some reason
      },
      complete: function () {
        // executed after all files are complete
      }
    });
  }
};