<aside id="menu-sidebar"  class="menu-sidebar  d-none d-lg-block js-scrollbar1 sidebar-must-hide" >
<button type="button" class="btn btn-link float-right" onclick="sidebarClose()"><i class="fas fa-chevron-left"></i></button>
  <div class="bg-white text-center">
    <div class="sideBarToggle justify-content-center">
      <img class="img-fluid" src="{{asset('back-office/images/icon/logo.png') }}" alt="Cool Admin" />
    </div>
    <br>
    @guest
    @else
    @include('layouts.items.userName')
    <button type="button" class="btn btn-green btn-sm mt-3" id="logoutUs" onclick="logout()">
          <i class="zmdi zmdi-power"></i> {{ __(' Logout ') }}
        </button>
        <form id="logout-form-d" action="{{ route('logout') }}" method="POST" style="display: none;">
          @csrf
        </form>
    @endguest
  </div>
  <div class="menu-sidebar__content" >
    <nav class="navbar-sidebar">
      <ul class="list-unstyled navbar__list">

        <ul id="menuSon" class='list-unstyled navbar__sub-list js-sub-list'>
          @forelse($dm['data_menu'] as $menu)

            @if($menu->id != 15)
              <li id="menu{{$menu->id}}">
                <a href="{{$menu->link}}">
                  <i class="{{$menu->icon}}"></i>{{$menu->name}}</a>
              </li>
            @endif
          @empty
          <li>
            Sin Accessos
          </li>
          @endforelse
        </ul>
    </nav>
  </div>
</aside>