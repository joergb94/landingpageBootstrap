<section id="why-us" class="why-us section-bg mt-2 rounded-border preview-background-edition bg-purple">
      <div class="section-title container">
          @if(isset($data->title))
            <h2 class ="text-white-f">{!!$data->title!!}</h2>
          @endif
          <h4>......</h4>
        </div>
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">
          <div class="col-sm-6">
    
              <ul class="list-group list-group-flush">
                <li  class="list-group-item">
                  <a><h6><b>01</b> ... </h6><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                </li>
                <li  class="list-group-item">
                  <a><h6><b>02</b> ... </h6><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                </li>
                <li  class="list-group-item">
                  <a><h6><b>03</b> ... </h6><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                </li>
              
              </ul>

          </div>

          <div class="col-sm-4">
            <img src="{{asset('assets/img/icons/objectives.png')}}" alt="" class="img-fluid";</div>
          </div>
        </div>
      </div>
    </section>