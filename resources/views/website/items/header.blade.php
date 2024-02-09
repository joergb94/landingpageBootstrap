<section id="hero" class="d-flex align-items-center" style="background-image:url('{{asset('assets/img/background/1.png')}}'); background-repeat: no-repeat; background-size:cover; background-size: 100% 100%;">
  <div class="hero-content container">
    <div class="row">
      <div class="col-sm-12 d-flex align-items-center flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1 class="title-{{$data->id}}">{!! $data->title !!}</h1>
          <h2 class="footer-{{$data->id}}">{!! $data->footer !!}</h2>
        <div class="hero-div d-flex justify-content-center justify-content-lg-start">
          <a href="#about" class="btn btn-get-started scrollto button-{{$data->children[0]->id}}">{{$data->children[0]->description}}</a>
        </div>
      </div>
    </div>
  </div>

</section>