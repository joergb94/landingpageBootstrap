<header class="header-mobile d-block d-lg-none bg-white">
  <div class="header-mobile__bar">
    <div class="container-fluid">
      <div class="header-mobile-inner">
        <a class="btn btn-warning btn-sm col-2" href="/scan">
         <i class="fa fa-camera"></i>
        </a>
        <a class="logo col-7" href="/home">
          <img class="img-fluid" style="height:8vh;" src="{{asset('images/icon/logoDP.png') }}" />
        </a>
        <button class="hamburger hamburger--slider col-3" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
  </div>
  <nav class="navbar-mobile">
    <div class="container-fluid">
    </div>
    <div class="bg-white text-center">
      <button type="button" class="btn btn-primary" id="logoutUsM" onclick="logoutMobile()">
        <i class="zmdi zmdi-power"></i>{{ __(' Logout') }}
      </button>
      <form id="logout-form-dM" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
      </form>
    </div>
    <ul class="navbar-mobile__list list-unstyled">
      <li class="has-sub" id="menuDadM">
      <ul id="menuSonM" class='list-unstyled navbar__sub-list js-sub-list'>
        @forelse($dm['data_menu'] as $menu)
        <li id="menuM{{$menu->id}}" style="margin-left:5px;">
          <a href="{{$menu->link}}">
            <i class="{{$menu->icon}}"></i>{{$menu->name}}</a>
        </li>
        @empty
        <li>
          Sin Accessos
        </li>
        @endforelse
      </ul>
      </li>

    </ul>
    </li>
    </ul>
    </div>
  </nav>
</header>