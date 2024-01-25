<div class="col-sm-12">
  <div class="row justify-content-between">
    <select class="form-control col-sm-3 search-query justify-content-between" id="profilesearch">
      <option value="all" selected>All Profiles</option>
      @foreach($tu as $t)
      <option value="{{$t->id}}">{{$t->name}}</option>
      @endforeach
    </select>
    <select class="form-control col-sm-2 search-query" id="typesearch">
      <option value="name">Name</option>
      <option value="last_name" selected>Last Name</option>
    </select>

    <input type="text" class="form-control col-sm-4 search-query" id="search">
    <select class="form-control text-center search-query col-sm-2" id="statusearch">
      <option value="1" selected>Actives</option>
      <option value="D">Inactive</option>
    </select>
  </div>
</div>
<br>