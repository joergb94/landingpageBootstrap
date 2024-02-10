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
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />

  <!-- Vendor CSS Files -->
  <link href="{{asset('assets/vendor/aos/aos.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
  <link href="{{ asset('back-office/vendor/font-awesome-5/css/fontawesome-all.min.css') }}" rel="stylesheet" media="all">
  <link href="{{asset('assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/glightbox/css/glightbox.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/remixicon/remixicon.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{asset('assets/css/style.css')}}" rel="stylesheet">
  <link href="{{asset('back-office/css/edit-web.css')}}" rel="stylesheet">
</head>

<body>
 <div id="wrapper" class="toggled">
            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                      <div class="col-sm-12">
                          <button class="btn btn-link col-sm-12 mt-2" type="button" onclick="editItemweb.show_form('general')"><h6>Informacion Principal  <i class="fa fa-chevron-down"></i></h6></button>
                          <div id="general" class="card mt-2" style="display:none">
                            <div class="card-header" ><h6>Texto Principal</h6></div>
                            <div id="title-editor" class="card-body"><div id="title-{{$data->id}}" class="editor" >{!! $data->title !!}</div></div>
                            <div class="card-header"><h6>Texto secundario</h6></div>
                            <div id="footer-editor" class="card-body"><div id="footer-{{$data->id}}" class="editor">{!! $data->footer !!}</div></div>
                          </div>
                      </div>
                      @foreach ($data->children as $index => $item)
                          <div id="detail" class="col-sm-12">
                              <button class="btn btn-link col-sm-12 mt-2" type="button" onclick="editItemweb.show_form('detail-{{$item->id}}')"><h6>{{$item->element_web['name']}} {!! $item->name !!}  <i class="fa fa-chevron-down"></i></h6></button>
                              <div id="detail-{{$item->id}}" class="card mt-2" style="display:none">
                                  @if( $item->element_web['name'] == 'button')
                                      <div class="card-header" ><h6>Texto Principal</h6></div>
                                      <div class="card-body">
                                        <textarea id="{{$item->element_web['name']}}-description-{{$item->id}}" class="editor">{!! $item->description !!}</textarea>
                                      </div>
                                  @else
                                    <div class="card-header" ><h6>Texto Principal</h6></div>
                                      <div class="card-body">
                                        <textarea id="{{$item->element_web['name']}}-name-{{$item->id}}" class="editor">{!! $item->name !!}</textarea>
                                    </div>
                                    <div class="card-header" ><h6>Texto Secundario</h6></div>
                                      <div class="card-body">
                                        <textarea id="{{$item->element_web['name']}}-description-{{$item->id}}" class="editor">{!! $item->description !!}</textarea>
                                    </div>

                                  @endif
                                  </div>
                            </div>
                      @endforeach   
                      <div class="col-sm-12 mt-2">
                                    <button class="btn btn-success col-sm-12" type="button" onclick="editItemweb.save({{ json_encode($data) }})">Aplicar cambios</button>
                                   
                      </div>
            </div> <!-- /#sidebar-wrapper -->
            <div id="page-content-wrapper">
              <a class="btn btn-danger" href="/adminFlex/edit-web">Regresar a la pagina anterior <i class="fa fa-undo"></i></a>
              @if($data->type_item_web['is_main'])
                    @include('website.items.main.'.$data->type_item_web->name,['data' =>  $data]) 
              @else
                    @include('website.items.'.$data->type_item_web->name,['data' =>  $data])
              @endif
            </div>

</div>

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
  <script src="{{asset('back-office/js/sweetalert2@9.js')}}"></script>
  <script src="{{asset('back-office/js/bootstrap-notify.js')}}"></script>
  <script src="{{asset('back-office/js/ckeditor.js')}}"></script>
  <script src="{{ asset('back-office/js/MasterAjax.js') }}"></script>
  <script src="{{ asset('back-office/js/EditionItemWebSite.js') }}"></script>

</body>

</html>

