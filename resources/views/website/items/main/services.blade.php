<section id="services" class="services bg-section-light-betta">
      <div class="col-sm-10 mx-auto d-block" data-aos="fade-up">

        <div class="section-title">
          @if(isset($data->title))
            <h2>{!!$data->title!!}</h2>
          @endif

          @if(isset($data->description))
            <p>{!!$data->description!!}</p>
          @endif
        </div>

        <div class="row">
          @foreach ($data->children as $index => $item)
            <div class="col-xl-3 col-md-6 d-flex align-items-stretch mb-3" data-aos="zoom-in" data-aos-delay="100">
              <div class="icon-box text-center">
                <div class="mx-auto d-block mb-2"><img src="{{asset('assets/img/icons/icono'.($index + 1).'.png')}}" class="img-fluid-services"></div>
                <h6 class="mb-3"><a class="text-services-dark" href="#"><b>{!!$item->name!!}</b></a></h6>
                <p>{!!$item->description!!}</p>
              </div>
            </div>
          @endforeach
        </div>

      </div>
    </section>