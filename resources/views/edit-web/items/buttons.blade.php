@if($item->deleted_at == null)
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-th-list"></i>
</button>
<div class="dropdown-menu">
  <h5 class="dropdown-header  text-center">Opciones</h5>
  <a class="dropdown-item btn btn-link text-warning btn-show-{{$item['id']}}" href="/adminFlex/edit-web/{{$item['id']}}/edit">Modificar elemento <i class="fas fa-quidditch"></i></a>
  <button class="dropdown-item btn btn-link text-danger" onclick="users.delete({{$item['id']}})" href="#">Desactivated <i class='fas fa-trash'></i></button>
</div>

@else
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-th-list"></i>
</button>
<div class="dropdown-menu">
  <button type="button" class="dropdown-item btn btn-link text-success" onclick="users.restored({{$item['id']}})">
    Restore <i class='fas fa-undo'></i>
  </button>
</div>
@endif