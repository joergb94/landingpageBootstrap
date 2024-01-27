@extends('layouts.app')

@section('content')
<div class="card" id="index_blade">
  <div class="card-body">
    <div class="row">
      <div class="col-sm-6">
        <h4 class="card-title mb-0">
          Inicio  <i class='fa fa-home'></i>
        </h4>
      </div>
      <!--col-->
      <div class="col-sm-6">
        @include('home.items.header-buttons')
      </div>
      <!--col-->
    </div>
    <!--row-->

    </br>
    <div class="col-sm-12">
      @include('home.items.search')
    </div>
    @include('home.items.table')
    <div id="loading" style="display:none" class="col-sm-12 text-center">
      </br></br></br>
      <div class="col-sm-12">
        <h2>Loading...</h2>
      </div>
      <div class="spinner-grow text-muted"></div>
      <div class="spinner-grow text-primary"></div>
      <div class="spinner-grow text-info"></div>
      <div class="spinner-grow text-danger"></div>
      <div class="spinner-grow text-secondary"></div>
      </br></br></br></br>
    </div>
  </div>
  <!--card-body-->
</div>
<!--card-->

<!-- Passing BASE URL to AJAX -->
<input id="url" type="hidden" value="{{ \Request::url() }}">
<input id="baseUrl" type="hidden" value="{{ \Request::root() }}">
@endsection
@section('modal')
<div id="show_blade" style="display:none">
  <div id="card_show"></div>
</div>
@endsection
@section('js')
<!-- <script src="{{asset('back-office/js/actions/home.js')}}"></script>-->
@endsection