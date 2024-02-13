@if($inbox->deleted_at == null)
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <h5 class="dropdown-header  text-center bg-primary text-white">Opciones</h5>
  <button class="dropdown-item btn btn-link text-secondary btn-detail-{{$inbox['id']}}" onclick="users.detail({{$inbox['id']}})" href="#">Ver mensaje <i class='fas fa-info-circle'></i></button>
  <button class="dropdown-item btn btn-link text-danger" onclick="users.delete({{$inbox['id']}})" href="#">Eliminar mensaje<i class='fas fa-trash'></i></button>
</div>

@else
<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
  <i class="fa fa-wrench"></i>
</button>
<div class="dropdown-menu">
  <button class="dropdown-item btn btn-link text-warning  btn-detail-{{$inbox['id']}}" onclick="users.detail({{$inbox['id']}})" href="#">Ver mensaje <i class='fas fa-info-circle'></i></button>
  <button type="button" class="dropdown-item btn btn-link text-success" onclick="users.restored({{$inbox['id']}})">
    Restaurar mensaje <i class='fas fa-undo'></i>
  </button>
</div>
@endif