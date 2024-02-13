<header class="header-mobile d-block d-lg-none bg-white">
  <div class="header-mobile__bar">
    <div class="container-fluid">
      <div class="header-mobile-inner">

        <a class="logo col-" href="/home">
          <img class="img-fluid" style="height:8vh;" src="{{asset('back-office/images/icon/logo.png') }}" />
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
    
    <ul class="navbar-mobile__list list-unstyled">
      <li class="has-sub" id="menuDadM">
      <ul id="menuSonM" class='list-unstyled navbar__sub-list js-sub-list'>
      @forelse($dm['data_menu'] as $menu)
                <li id="menu{{$menu['menu_data']->id}}">
                  <a href="/adminFlex{{$menu['menu_data']->link}}">
                    <i class="{{$menu['menu_data']->icon}} ml-2"></i>{{$menu['menu_data']->name}}</a>
                </li>
            @empty
        <li>
          Sin Accessos
        </li>
        @endforelse
      </ul>
      </li>
      <li>
        <div class="bg-white text-center mt-2">
          <button type="button" class="btn btn-primary" id="logoutUsM" onclick="logoutMobile()">
            <i class="zmdi zmdi-power"></i>{{ __(' Logout') }}
          </button>
          <form id="logout-form-dM" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
          </form>
        </div>
      </li>
    </ul>
    </li>
    </ul>
    </div>
  </nav>
</header>