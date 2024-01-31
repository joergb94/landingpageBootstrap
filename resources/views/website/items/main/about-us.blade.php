

<section id="about" class="services section-bg" style="background-image:url('{{asset('assets/img/background/2.png')}}'); background-repeat: no-repeat; background-size:cover; background-size: 100% 100%;">
      <div class="container pb-5" data-aos="fade-up">

        <div class="section-title pb-5">
          @if(isset($data->title))
            <h2>{{$data->title}}</h2>
          @endif

          @if(isset($data->description))
            <h3 class="pb-3"><strong>{{$data->footer}}</strong></h3>
          @endif
          
          @if(isset($data->children[0]))
            <h4>{{$data->children[0]->description}}</h4>
          @endif
        </div>

        <div class="row  d-flex align-items-center flex-column justify-content-center pb-5">
          @foreach ($data->children as $index => $item)
            @if($index > 0)
              @if($index == 1)
                  <div id="div1" class="col-sm-10" data-aos="zoom-in" data-aos-delay="100">
                  <div class="row justify-content-center">
                    <div class="icon-box col-sm-8" style="color:white; background-color:#514e79;">
                            <div class="row">
                              <div class="col-sm-4">
                                <img src="{{asset('assets/img/icons/vision.png')}}" class="img-fluid mx-auto d-block">
                              </div>
                              <div class="col-sm-8 text-center">
                                <h3>{{$item->name}}</h3>
                                <h4>{{$item->description}}</h4>
                              </div>
                            </div>
                          
                        </div>
                      <div class="col-sm-1 justify-content-center">
                        <button class="btn btn-primary rounded-circle" onclick="toggleDiv()" style="margin-top: 150px; width:50px; height:50px; color:white; background-color:#3D3868;" > 
                          <div class="icon"><i class="bi bi-caret-right-fill"></i> </div>
                        </button>
                      </div>
                  </div>
                  </div>
              @elseif($index == 2)
                <div id="div2" class="col-sm-10 hidden" data-aos="zoom-in" data-aos-delay="100">
                <div class="row justify-content-center">
                    <div class="col-sm-1 justify-content-center">
                      <button class="btn btn-primary rounded-circle" onclick="toggleDiv()" style="margin-top: 150px; width:50px; height:50px; color:white; background-color:#3D3868;" > 
                        <div class="icon"><i class="bi bi-caret-left-fill"></i> </div>
                      </button>
                    </div>
                    <div class="icon-box col-sm-8 " style="color:white; background-color:#514e79;">
                        <div class="row">
                          <div class="col-sm-4">
                            <img src="{{asset('assets/img/icons/mission.png')}}" class="img-fluid mx-auto d-block">
                          </div>
                          <div class="col-sm-8 text-center">
                              <h3>{{$item->name}}</h3>
                              <h4>{{$item->description}}</h4>
                          </div>
                        </div>
                      
                    </div>
                </div>
                </div>
              @endif
            @endif
          @endforeach
        </div>

      </div>
    </section>