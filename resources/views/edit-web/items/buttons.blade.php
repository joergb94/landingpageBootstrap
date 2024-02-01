@if($item->deleted_at == null)
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <h5 class="dropdown-header  text-center bg-primary text-white">Options</h5>
  <button class="dropdown-item btn btn-link text-secondary btn-detail-{{$item['id']}}" onclick="users.detail({{$item['id']}})" href="#">Show User <i class='fas fa-info-circle'></i></button>
  <button class="dropdown-item btn btn-link text-warning btn-show-{{$item['id']}}" onclick="users.edit({{$item['id']}})" href="#">Update <i class='fas fa-edit'></i></button>
  <button class="dropdown-item btn btn-link text-primary btn-show-{{$item['id']}}" onclick="users.password({{$item['id']}})" href="#">Password <i class='fas fa-edit'></i></button>
  <button class="dropdown-item btn btn-link text-danger" onclick="users.delete({{$item['id']}})" href="#">Desactivated <i class='fas fa-trash'></i></button>
</div>

@else
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <button class="dropdown-item btn btn-link text-warning  btn-detail-{{$item['id']}}" onclick="users.detail({{$item['id']}})" href="#">Show User <i class='fas fa-info-circle'></i></button>
  <button type="button" class="dropdown-item btn btn-link text-success" onclick="users.restored({{$item['id']}})">
    Restore <i class='fas fa-undo'></i>
  </button>
</div>
@endif