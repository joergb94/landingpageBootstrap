<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Arsha Bootstrap Template - Index</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="{{asset('assets/img/favicon.png')}}" rel="icon">
  <link href="{{asset('assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700" />

  <!-- Vendor CSS Files -->
  <link href="{{asset('assets/vendor/aos/aos.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/glightbox/css/glightbox.min.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/remixicon/remixicon.css')}}" rel="stylesheet">
  <link href="{{asset('assets/vendor/swiper/swiper-bundle.min.css')}}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{asset('assets/css/style.css')}}" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Arsha - v4.3.0
  * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Header ======= -->
  @include('website.items.header')
  <!-- End Header -->

  <!-- ======= Hero Section ======= -->
  @include('website.items.hero')
  <!-- End Hero -->

  <main id="main">

    <!-- ======= Cliens Section ======= 
    @include('website.items.main.clien')
    End Cliens Section -->

    <!-- ======= About Us Section ======= -->
    @include('website.items.main.aboutus')
    <!-- End About Us Section -->

    <!-- ======= Why Us Section ======= -->
    @include('website.items.main.whyus')
   <!-- End Why Us Section -->

    <!-- ======= Skills Section ======= 
    @include('website.items.main.skills')
    End Skills Section -->

    <!-- ======= Services Section ======= -->
    @include('website.items.main.services')
    <!-- End Services Section -->

    <!-- ======= Cta Section ======= 
    @include('website.items.main.cta')
    End Cta Section -->

    <!-- ======= Portfolio Section ======= 
    @include('website.items.main.portfolio')
     End Portfolio Section -->

    <!-- ======= Team Section ======= 
    @include('website.items.main.team')
     End Team Section -->

    <!-- ======= Pricing Section ======= 
    @include('website.items.main.pricing')
     End Pricing Section -->

    <!-- ======= Frequently Asked Questions Section ======= 
    @include('website.items.main.frequently')
    End Frequently Asked Questions Section -->

    <!-- ======= Contact Section ======= -->
    @include('website.items.main.contact')
    <!-- End Contact Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  @include('website.items.footer')
  <!-- End Footer -->

  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="{{asset('assets/vendor/aos/aos.js')}}"></script>
  <script src="{{asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
  <script src="{{asset('assets/vendor/glightbox/js/glightbox.min.js')}}"></script>
  <script src="{{asset('assets/vendor/isotope-layout/isotope.pkgd.min.js')}}"></script>
  <script src="{{asset('assets/vendor/php-email-form/validate.js')}}"></script>
  <script src="{{asset('assets/vendor/swiper/swiper-bundle.min.js')}}"></script>
  <script src="{{asset('assets/vendor/waypoints/noframework.waypoints.js')}}"></script>

  <!-- Template Main JS File -->
  <script src="{{asset('assets/js/main.js')}}"></script>

</body>

</html>