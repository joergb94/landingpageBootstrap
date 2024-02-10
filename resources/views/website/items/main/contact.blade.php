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
              <iframe class="map-contact" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0"  allowfullscreen></iframe>
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