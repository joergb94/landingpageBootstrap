var urlac = $('#url').val();
var baseUrlac = $('#baseUrl').val();
const add_category = {
    add_category: function () {

        var form = {name: $('#new_category_name').val()};
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        // Populate Data in Edit Modal Form
        $.ajax({
          type: "POST",
          url: urlac + '/category/add',
          data: form,
          success: function (data) {
            $("#category_id").append('<option value =' + data.id + '>' + data.name + '</option>');
            $("#category_id").val(data.id).trigger('change');
            $("#div_new_category").hide();
            $('#new_category_name').val('')
            $.notify({
              // options
              title: "Ready!",
              message: 'A new Category was Created',
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
      clear_category: function () {
        $("#div_new_category").hide();
        $('#new_category_name').val('')
      },
      openmodal: function() {
        $("#div_new_category").show();
      }
}