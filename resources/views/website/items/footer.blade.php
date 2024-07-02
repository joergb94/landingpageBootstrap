<footer class="footer-top pt-3 bg-dark">
  <div class="container-fluid">
    <div class="row">

      <div class="col-md-2 col-sm-12 text-center">
        <img src="{{asset('assets/img/logo-footer.png')}}" class="img-fluid image-footer">
      </div>

      <div class="col-md-4 col-sm-12 footer-contact">
        <!-- Tu contenido de información de contacto va aquí -->
      </div>

      <div class="col-md-3 footer-links">
        <ul>
        @if(isset($data->children[0]))
          <li>
            <div class="col-12">
              <div class="row align-items-center">
                <div class="col-2">
                  <span class="badge badge-pill bg-white rounded-item"><i class="bx bx-phone"></i></span>
                </div>
                <div class="col-10">
                  <h6 class="mt-1"><a class="text-white" href="#">{!! $data->children[0]->name !!}</a></h6>
                </div>
              </div>
            </div>
          </li>
          @endif
          @if(isset($data->children[0]))
            <li>
                <div class="col-12">
                  <div class="row align-items-center">
                    <div class="col-2">
                      <span class="badge badge-pill bg-white rounded-item"><i class="bx bx-map"></i></span>
                    </div>
                    <div class="col-10">
                      <h6 class="mt-1"><a class="text-white" href="#">{!! $data->children[0]->description !!}</a></h6>
                    </div>
                  </div>
                </div>
              </li>
          @endif
        
        </ul>
      </div>
      @if(isset($data->children[1]))
        <div class="col-md-3 footer-links text-center">
          <h4>Nuestras redes sociales</h4>
          <div class="social-links mt-3">
            @for ($i = 1; $i < count($data->children); $i++)
              <a href="{{$data->children[$i]->description}}" class="{{$data->children[$i]->name}}" target="_blank"><i class="bx bxl-{{$data->children[$i]->name}}"></i></a>
            @endfor
          </div>
        </div>
      @endif
    </div>
  </div>
</footer>
