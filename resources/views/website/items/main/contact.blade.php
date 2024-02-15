<section id="contact" class="contact bg-purple">
      <div class="col-sm-10 mx-auto d-block" data-aos="fade-up">

        <div class="section-title">
          @if(isset($data->title))
            <h2 class="text-white-f">{!!$data->title!!}</h2>
          @endif
          @if(isset($data->description))
            <p class="text-white-f" >{!!$data->descriptio!!}</p>
          @endif
        </div>

        <div class="row">

          <div class="col-lg-5 d-flex align-items-stretch">
            <div class="info" >
              <iframe class="map-contact" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8183120847875!2d-89.67376332400124!3d21.039954587392533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5674fca0555555%3A0xfbbc8fbfb1a39837!2sFraccionamiento%20Real%20Montejo!5e0!3m2!1ses!2smx!4v1707963737776!5m2!1ses!2smx" frameborder="0"  loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div class="form-group has-default bmd-form-group">
                  <label class="text-white-f" for="name"><b>Nombre completo:</b></label>
                  <input type="text" name="name" class="form-control custom-input" id="name" required>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label class="text-white-f" for="name"><b>Email:</b></label>
                  <input type="email" class="form-control custom-input" name="email" id="email" required>
                </div>
                <div class="form-group col-md-6">
                  <label class="text-white-f" for="name"><b>Phone:</b></label>
                  <input type="text" class="form-control custom-input" name="subject" id="subject" required>
                </div>
              </div>
             
              <div class="form-group">
                <label class="text-white-f" for="name"><b>Mensaje:</b></label>
                <textarea class="form-control custom-input" name="message" rows="5" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit" class="btn ">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>