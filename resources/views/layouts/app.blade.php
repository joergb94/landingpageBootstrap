<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="au theme template">
    <meta name="author" content="Hau Nguyen">
    <meta name="keywords" content="au theme template">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Title Page-->
    <title>Dashboard</title>

    <!-- PWA  -->
    <meta name="theme-color" content="#00518c"/> 
    <link rel="apple-touch-icon" href="{{ asset('back-office/images/icons/pwa.png') }}">
    <link rel="manifest" href="{{ asset('back-office//manifest.json') }}">
    <meta name="viewport" content= "width=device-width, user-scalable=no">
    <!-- Fontfaces CSS-->
    <link href="{{ asset('back-office/css/font-face.css') }}" rel="stylesheet" media="all">
    <link href="https://fonts.googleapis.com/css2?family=Merienda:wght@600&display=swap" rel="stylesheet">
    <link href="{{ asset('back-office/vendor/font-awesome-4.7/css/font-awesome.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/font-awesome-5/css/fontawesome-all.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/mdi-font/css/material-design-iconic-font.min.css') }}" rel="stylesheet" media="all">

    <!-- Bootstrap CSS-->
    <link href="{{ asset('back-office/vendor/bootstrap-4.1/bootstrap.min.css') }}" rel="stylesheet" media="all">
   <link rel="stylesheet" href="{{ asset('back-office/vendor/jquery-ui.css') }}">

    <!-- Vendor CSS-->
    <link href="{{ asset('back-office/vendor/animsition/animsition.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/wow/animate.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/css-hamburgers/hamburgers.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/slick/slick.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/select2/select2.min.css') }}" rel="stylesheet" media="all">
    <link href="{{ asset('back-office/vendor/perfect-scrollbar/perfect-scrollbar.css') }}" rel="stylesheet" media="all">
    <link rel="stylesheet" href="{{asset('back-office/js/select2/select2.min.css')}}">
    <!-- Main CSS-->
    <link href="{{ asset('back-office/css/theme.css') }}" rel="stylesheet" media="all"> 
   
</head>

<body >
    <div  class="page-wrapper">
        
        <!-- HEADER MOBILE-->
        @include('layouts/items/loading')
        
        @if(isset($dm['data_menu']))
            <!-- HEADER MOBILE-->
            @include('layouts/items/headerMobile')
            <!-- END HEADER MOBILE-->
            <!-- MENU SIDEBAR-->
            @include('layouts/items/sidebar')
            <!-- END MENU SIDEBAR-->
        @endif

        <!-- PAGE CONTAINER-->
        <div id="full-content" class="page-container sidebar-must-hide" >
            <!-- HEADER DESKTOP-->
            <button type="button" id="show-sidebar" class="btn btn-purple float-left" style="display:none;" onclick="sidebarOpen()"><i class="fas fa-chevron-right"></i></button>
            @include('layouts/items/headerDesktop')
            <!-- HEADER DESKTOP-->

            <!-- MAIN CONTENT-->
            <div  id="page-container" class="main-content">
                <div class="section__content section__content--p30">
                    <div id="yield-content" class="col-12">
                        @yield('content')
                        <input type="hidden" id="page_no_data" value="1">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="copyright">
                                    <p>Copyright © 2024 FlexBetta. All rights reserved.</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT-->
            <!-- END PAGE CONTAINER-->
        </div>

    </div>
      <!--Start of Tawk.to Script-->

<!--End of Tawk.to Script-->
    @yield('modal')
    <!--PWA -->
    <script src="{{ asset('back-office//sw.js') }}"></script>
    <!-- Jquery JS-->
    <script src="{{ asset('back-office/vendor/jquery-3.2.1.min.js') }}"></script>
    <!-- Bootstrap JS-->
    <script src="{{ asset('back-office/vendor/bootstrap-4.1/popper.min.js') }}"></script>
    <script src="{{ asset('back-office/vendor/bootstrap-4.1/bootstrap.min.js') }}"></script>

    <script src="{{ asset('back-office/vendor/jquery-ui.js') }}"></script>
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
    <script src="{{ asset('back-office/vendor/select2/select2.min.js') }}"></script>
    <script src="{{asset('back-office/js/sweetalert2@9.js')}}"></script>
    <script src="{{asset('back-office/js/bootstrap-notify.js')}}"></script>
    <script src="{{asset('back-office/js/select2/select2.min.js')}}"></script>

    <!-- Main JS-->
    <script src="{{ asset('back-office/js/main.js') }}"></script>
    <script src="{{ asset('back-office/js/MasterAjax.js') }}"></script>
    <script src="{{ asset('back-office/js/serviceworker.js') }}"></script>
    <script src="{{ asset('back-office/js/pdf/jspdf.min.js') }}"></script>
    <script src="{{ asset('back-office/js/pdf/jspdf.plugin.autotable.min.js') }}"></script>
    <script src="{{ asset('back-office/js/pdf/tableHTMLExport.js') }}"></script>
    <script src="{{ asset('back-office/js/papaparse.min.js') }}"></script>
    @yield('js')
   
</body>

</html>
<!-- end document-->
