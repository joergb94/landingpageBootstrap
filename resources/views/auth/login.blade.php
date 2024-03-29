<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags-->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="au theme template">
  <meta name="author" content="Hau Nguyen">
  <meta name="keywords" content="au theme template">

  <!-- Title Page-->
  <title>Login</title>

  <!-- Fontfaces CSS-->
  <link href="{{ asset('back-office/css/font-face.css') }}" rel="stylesheet" media="all">
  <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet">
  <link href="{{ asset('back-office/vendor/font-awesome-4.7/css/font-awesome.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/font-awesome-5/css/fontawesome-all.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/mdi-font/css/material-design-iconic-font.min.css') }}" rel="stylesheet" media="all">

  <!-- Bootstrap CSS-->
  <link href="{{ asset('back-office/vendor/bootstrap-4.1/bootstrap.min.css') }}" rel="stylesheet" media="all">

  <!-- Vendor CSS-->
  <link href="{{ asset('back-office/vendor/animsition/animsition.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/wow/animate.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/css-hamburgers/hamburgers.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/slick/slick.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/select2/select2.min.css') }}" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/vendor/perfect-scrollbar/perfect-scrollbar.css') }}" rel="stylesheet" media="all">

  <!-- Main CSS-->
  <link href="{{ asset('back-office/css/theme.css') }}" type="text/css" rel="stylesheet" media="all">
  <link href="{{ asset('back-office/css/christmas.css') }}" type="text/css" rel="stylesheet" media="all">
</head>

<body >
 
  <div class="page-wrapper">
    <div class="page-content--bge5">
      <div class="container">
        <div class="login-wrap">
          <div class="login-content">
            <div class="login-logo">
              <a href="#">
                <img src="{{asset('back-office/images/icon/logo-login.png') }}" alt="CoolAdmin">
              </a>
              <div class="login-form">
                <form method="POST" action="{{ route('login') }}">
                  @csrf

                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                    <div class="col-md-6">
                      <input id="email" type="email" class="form-control login-form-inputs @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                      @error('email')
                      <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                      </span>
                      @enderror
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                    <div class="col-md-6">
                      <input id="password" type="password" class="form-control login-form-inputs @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                      @error('password')
                      <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                      </span>
                      @enderror
                    </div>
                  </div>
                  <div class="form-group row mb-0">
                    <div class="col-sm-12 text-center">
                      <button type="submit" class="btn btn-purple btn-lg">
                        {{ __('Sign in') }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>


    <!-- Jquery JS-->
    <script src="{{ asset('back-office/vendor/jquery-3.2.1.min.js') }}"></script>
    <!-- Bootstrap JS-->
    <script src="{{ asset('back-office/vendor/bootstrap-4.1/popper.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/bootstrap-4.1/bootstrap.min.js') }}"></script>
    <!-- Vendor JS       -->
    <script src="{{ asset('back-office/vendor/slick/slick.min.js') }}">
    </script>
    <script src="{{ asset('back-office/vendor/wow/wow.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/animsition/animsition.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js') }}">
    </script>
    <script src="{{ asset('back-office/vendor/counter-up/jquery.waypoints.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/counter-up/jquery.counterup.min.js') }}">
    </script>
    <script src="{{ asset('back-office/vendor/circle-progress/circle-progress.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('back-office/vendor/chartjs/Chart.bundle.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/select2/select2.min.js') }}">
    </script>

    <!-- Main JS-->
    <script src="{{ asset('back-office/js/main.js') }}"></script>
    <script src="{{ asset('back-office/js/MasterAjax.js') }}"></script>
    <script src="{{ asset('back-office/js/serviceworker.js') }}"></script>
    <script src="{{ asset('back-office/js/christmas.js') }}"></script>


</body>

</html>
<!-- end document-->