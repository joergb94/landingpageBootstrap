@if($user->deleted_at == null)
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <h5 class="dropdown-header  text-center bg-primary text-white">Options</h5>
  <button class="dropdown-item btn btn-link text-secondary btn-detail-{{$user['id']}}" onclick="users.detail({{$user['id']}})" href="#">Show User <i class='fas fa-info-circle'></i></button>
  <button class="dropdown-item btn btn-link text-warning btn-show-{{$user['id']}}" onclick="users.edit({{$user['id']}})" href="#">Update <i class='fas fa-edit'></i></button>
  <button class="dropdown-item btn btn-link text-primary btn-show-{{$user['id']}}" onclick="users.password({{$user['id']}})" href="#">Password <i class='fas fa-edit'></i></button>
  <button class="dropdown-item btn btn-link text-danger" onclick="users.delete({{$user['id']}})" href="#">Desactivated <i class='fas fa-trash'></i></button>
</div>

@else
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <button class="dropdown-item btn btn-link text-warning  btn-detail-{{$user['id']}}" onclick="users.detail({{$user['id']}})" href="#">Show User <i class='fas fa-info-circle'></i></button>
  <button type="button" class="dropdown-item btn btn-link text-success" onclick="users.restored({{$user['id']}})">
    Restore <i class='fas fa-undo'></i>
  </button>
</div>
@endif