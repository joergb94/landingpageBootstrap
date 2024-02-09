<section id="why-us" class="why-us section-bg" style="background-image:url('{{asset('assets/img/background/3.png')}}'); background-repeat: no-repeat; background-size:cover; background-size: 100% 100%;">
      <div class="section-title container">
          @if(isset($data->title))
            <h2>{!!$data->title!!}</h2>
          @endif

          @if(isset($data->footer))
            <h4>{!!$data->footer!!}</h4>
          @endif
        </div>
      <div class="container-fluid" data-aos="fade-up">

        <div class="row">

          <div class="col-sm-8 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
            <div class="accordion-list">
              <ul>
                @foreach ($data->children as $index => $item)
                  @if($index == 0)
                    <li>
                      <a data-bs-toggle="collapse" class="collapse" data-bs-target="#accordion-list-1"><h4>{!!$item->name!!} </h4><i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                      <div id="accordion-list-1" class="collapse show" data-bs-parent=".accordion-list">
                        <h4 class="mt-5">
                          {!!$item->description!!}
                        </h4>
                      </div>
                    </li>
                  @else
                    <li>
                      <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" class="collapsed"><h4>{!!$item->name!!}</h4> <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                      <div id="accordion-list-2" class="collapse" data-bs-parent=".accordion-list">
                        <h4>
                        {!!$item->description!!}
                        </h4>
                      </div>
                    </li>
                  @endif
                @endforeach
              </ul>
            </div>

          </div>

          <div class="col-sm-4 align-items-stretch order-1 order-lg-2 img" style='background-image: url("{{asset('assets/img/icons/objectives.png')}}");' data-aos="zoom-in" data-aos-delay="150">&nbsp;</div>
        </div>

      </div>
    </section>