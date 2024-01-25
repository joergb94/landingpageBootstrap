
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
      category: $('#categorysearch').val(),
      provider: $('#providersearch').val(),

    }
    : {
      search: $('#search').val(),
      criterion: $('#typesearch').val(),
      order: $('#orderbysearch').val(),
      status: $('#statusearch').val(),
      category: $('#categorysearch').val(),
      provider: $('#providersearch').val(),

    };

  return data;
}

//section for const js 
const inventory = {
  detail: function (id) {
    var my_url = url + '/' + id + '/detail';
    actions.detail(my_url, id);
  },
  add_table: function (data){
        $("#tableBody").empty();
        var d = '';
        for (let index = 0; index < data.length; index++) {
          
          var toOrder=0;
          if(data[index]['stock'] == 0){
            toOrder = '-'+data[index]['minimum'];
          }
          else if((data[index]['stock'] - data[index]['maximum']) > 0 && data[index]['stock'] > data[index]['maximum']){
            toOrder = ((data[index]['stock'] - data[index]['maximum'])*1)+' Exceso';
          }
          else if((data[index]['stock'] - data[index]['minimum']) < 0){
            toOrder =((data[index]['stock'] - data[index]['minimum'])*-1)+' Pedir';
          }

          d += `<tr>
          <td>
          ${data[index]['code']}
          </td>
          <td>
          ${data[index]['name']}
          </td>
          <td>
          ${data[index]['stock']}
          </td> 
          <td>
          ${data[index]['stock_checking']}
          </td>
          <td>
          ${data[index]['stock'] - data[index]['stock_checking']}
          </td>
          <td>
          ${data[index]['quantity_in']}
          </td>
          <td>
          ${data[index]['quantity_out']}
          </td>
          <td>
          ${data[index]['minimum']}
          </td>
          <td>
          ${data[index]['maximum']}
          </td>
          <td>
            ${toOrder}
          </td>
          <td>
          ${data[index]['total_supply']}
          </td>
          </tr>`
        }
        $("#tableBody").append(d);
  }
}

const print = {
  csv: function(){
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
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
      success: function(data){
          inventory.add_table(data)
          $("#tableDelivery").tableHTMLExport({type:'csv',filename:`${$('#providersearch option:selected').text()}_inventory_${hoy.toISOString()}.csv`});
      },
      error: function()
      {
        console.log('Error:', data);
        messageserror(data);
      }
    });
  },

  pdf: function(){
      var filter = datasearch();
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        type: "GET",
        url: url + '/print',
        data: filter,
        success: function(data){
          inventory.add_table(data)
            $("#tableDelivery").tableHTMLExport({type:'pdf',filename:`${$('#providersearch option:selected').text()}_inventory_${hoy.toISOString()}.pdf`});
        },
        error: function()
        {
          console.log('Error:', data);
          messageserror(data);
        }
    });
  }
}

