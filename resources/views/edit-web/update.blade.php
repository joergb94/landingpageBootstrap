<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Arsha Bootstrap Template - Index</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="{{asset('assets/img/favicon.png')}}" rel="icon">
  <link href="{{asset('assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />

  <!-- Vendor CSS Files -->
  <link href="{{asset('assets/vendor/aos/aos.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/glightbox/css/glightbox.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/remixicon/remixicon.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{asset('assets/css/style.css')}}" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Arsha - v4.3.0
  * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>
 <div class="col-sm-12">
  <form id="edit-site-form">
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-end">

          <button class="btn btn-success" type="button" onclick="editItemweb.save('{{$data->id}}')">Aplicar cambios</button>
          <button class="btn btn-warning" type="button" onclick="getAllEditorContent()">Mostrar cambios</button>

        </div>
        <div class="col-sm-6">
            <div class="card mt-2">
              <div class="card-header"><h4>Texto Principal</h4></div>
              <div id="title-editor" class="card-body"><div id="t-{{$data->id}}" class="editor" >{{$data->title}}</div></div>
              <div class="card-header"><h4>Texto secundario</h4></div>
              <div id="footer-editor" class="card-body"><div id="f-{{$data->id}}" class="editor">{{$data->footer}}</div></div>
            </div>
        </div>
        <div class="col-sm-6">
          <div class="card mt-2">
            @foreach ($data->children as $index => $item)

            <div class="card-header"><h4>{{$item->element_web['name']}}</h4></div>
            <div id="detail-{{$item->id}}" class="card-body"><div id="{{$item->element_web['name']}}-{{$item->id}}" class="editor">{{$item->description}}</div></div>
            @endforeach
        </div>
        </div>
      </div>
  </form>
  </div>
  @if($data->type_item_web['is_main'])
         <main id="main"> @include('website.items.main.'.$data->type_item_web->name,['data' =>  $data]) </main>
  @else
         @include('website.items.'.$data->type_item_web->name,['data' =>  $data])
  @endif
  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  <input id="url" type="hidden" value="{{ \Request::url() }}">
  <!-- Vendor JS Files -->
  <script src="{{asset('assets/vendor/aos/aos.js')}}"></script>
  <script src="{{asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
  <script src="{{asset('assets/vendor/glightbox/js/glightbox.min.js')}}"></script>
  <script src="{{asset('assets/vendor/isotope-layout/isotope.pkgd.min.js')}}"></script>
  <script src="{{asset('assets/vendor/php-email-form/validate.js')}}"></script>
  <script src="{{asset('assets/vendor/swiper/swiper-bundle.min.js')}}"></script>
  <script src="{{asset('assets/vendor/waypoints/noframework.waypoints.js')}}"></script>

  <!-- Template Main JS File -->
  <script src="{{ asset('back-office/vendor/jquery-3.2.1.min.js') }}"></script>
  <script src="{{asset('assets/js/main.js')}}"></script>
  <script src="{{asset('back-office/js/ckeditor.js')}}"></script>
  <script src="{{asset('back-office/js/sweetalert2@9.js')}}"></script>

</body>

</html>
<script>
    var allEditors = document.querySelectorAll('.editor');
var editorInstances = []; // Array to store references to editor instances

for (var i = 0; i < allEditors.length; ++i) {
    const editorId = allEditors[i].id; // Get the ID of the textarea element
    ClassicEditor
        .create(allEditors[i], {
            language: 'es',
            toolbar: ['heading', '|', 'bold', 'italic', '|']
        })
        .then(editor => {
            console.log("Editor with ID", editorId, "was initialized", editor);
            editorInstances.push({ id: editorId, editor: editor }); // Push the editor instance and its ID into the array
        })
        .catch(error => {
            console.error(error);
        });
}

function getAllEditorContent() {
    editorInstances.forEach(editorData => {
        const content = editorData.editor.getData();
        var plainTextContent ='';
        const collection = document.getElementsByClassName(editorData.id);
        if(editorData.id.toLowerCase().includes("button")){
           plainTextContent= content.replace(/<p>|<\/p>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>/g, '');
        }else{
          plainTextContent = content;
        }
        collection[0].innerHTML = plainTextContent;
   
    });
}

function saveAllEditorContent() {
    editorInstances.forEach(editorData => {
        const content = editorData.editor.getData();
        var plainTextContent ='';
        const collection = document.getElementsByClassName(editorData.id);
        if(editorData.id.toLowerCase().includes("button")){
           plainTextContent= content.replace(/<p>|<\/p>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>/g, '');
        }else{
          plainTextContent = content;
        }
        collection[0].innerHTML = plainTextContent;
   
    });
}

//section for const js 
const editItemweb = {
  save: function (id = '') {

    Swal.fire({
      title: "Desea aplicarlos cambios en el contenido?",
      text: "Si aplica los cambios, se refejaran en el sitio web",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aplicalos!',
      cancelButtonText: 'Continuar editando!'
    }).then((result) => {
      if (result.value) {
        var form = $('#edit-site-form').serialize();
        console.log(form)
        var my_url = url + '/' + id;
        var type = "PUT";
  
    
        //actions.save(type, my_url, state, form);
      }
    });
    
  },
  back: function () {

    Swal.fire({
      title: "¿Deseas salir de la edicion?",
      text: "No has aplicado tus cambios a un, ¿Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, No los apliques!',
      cancelButtonText: 'Continuar editando!'
    }).then((result) => {
      if (result.isConfirmed) {
            // Allow the user to leave the page
            return true;
        } else {
            // Prevent the user from leaving the page
            event.preventDefault();
        }
    });

    },

};






</script>
