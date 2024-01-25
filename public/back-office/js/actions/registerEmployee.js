
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for const js 
const clients = {
  save: function (state) {
    var form = $('#clientRegister-form').serialize();
    console.log(form);

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    // Populate Data in Edit Modal Form
    $.ajax({
      type: "POST",
      url: url,
      data: form,
      success: function (data) {
        window.location.href = "https://dedicatedpeople.us/";
      },
      error: function (data) {
        console.log('Error:', data);
        messageserror(data);

      }
    });
  },
};


