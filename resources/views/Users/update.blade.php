<div class="modal fade" id="FormModal">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Edicion de Usuario</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <form id="user-form">
          <div class="row">
              <div class="form-group col-6">
                <label>Nombres(s):</label>
                <input type="text" id="name" name="name" value="{{$data->name}}" class="form-control">
              </div>
              <div class="form-group col-6">
                <label>Apellidos(s):</label>
                <input type="text" id="last_name" name="last_name" value="{{$data->last_name}}" class="form-control">
              </div>
              <div class="form-group col-6">
                <label>Telefono:</label>
                <input type="number" id="phone" name="phone" value="{{$data->phone}}" class="form-control">
              </div>
              <div class="form-group  col-6">
                <label>E-mail:</label>
                <input type="text" id="email" value="{{$data->email}}" name="email" class="form-control">
              </div>
              <div class="form-group col-12">
                <label>Perfil:</label>
                <select class="form-control" id="type" name="type">
                  @foreach($type as $t)
                  @if($data->type_user_id == $t->id)
                  <option value="{{$t->id}}" selected>{{$t->name}}</option>
                  @else
                  <option value="{{$t->id}}">{{$t->name}}</option>
                  @endif
                  @endforeach
                </select>
              </div>
             
          </div>
         
        </form>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success btn-save" onclick="users.save('update',{{$data->id}})">Update <i
            class='fas fa-edit'></i></button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel <i
            class='fas fa-window-close'></i></button>
      </div>

    </div>
  </div>
</div>
<script>
  $('.js-example-basic-multiple').select2({
    tags: true,
    placeholder: "Update"
  });
</script>