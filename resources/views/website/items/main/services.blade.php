<section id="services" class="services section-bg" style="background-image:url('{{asset('assets/img/background/2.png')}}'); background-repeat: no-repeat; background-size:cover; background-size: 100% 100%;">
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
                <div class="image-services mx-auto d-block"><img src="{{asset('assets/img/icons/icono1.png')}}" class="img-fluid"></div>
                <h4><a href="">{!!$item->name!!}</a></h4>
                <p>{!!$item->description!!}</p>
              </div>
            </div>
          @endforeach
        </div>

      </div>
    </section>