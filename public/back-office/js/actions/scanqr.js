

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete"
    || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  var resultContainer = document.getElementById('qr-reader-results');
  var lastResult, countResults = 0;
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
      ++countResults;
      lastResult = decodedText;
      let verify = 0;
      const arrayCode = lastResult.split('');

         for (let index = 0; index < arrayCode.length; index++) {
            if(isNaN(arrayCode[index])){
                verify ++;
                break;
            }
         }
  
        var data = (verify == 0 && arrayCode.length == 12)
        ?
        {
          icon: 'success',
          title: 'Scanned successfully',
          html: '<b>info:</b> '+ lastResult,
          confirmButtonText: 'See information!',
          reverseButtons: true
       }
        :{
          icon: 'error',
          title: 'This Qr is not valid',
          html: '<b>info:</b> '+ lastResult,
       }

      $('#qr-reader-results').val(data.icon == 'success'?lastResult:'');  
      var sweetalerData = Swal.fire(data);
      if(data.icon == 'success'){
        sweetalerData.then((result) => {
          if (result.isConfirmed) {
              QR.detail();
          }
        })
      }
     
    }
  }

  var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess);
});

var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
const QR = {
  detail: function () {
    var code = $('#qr-reader-results').val();
    var my_url = url + '/data?code=' + code;
    actions.detail(my_url, code);
  }
};