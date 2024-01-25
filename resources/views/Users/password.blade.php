<div class="modal fade" id="FormModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Update Password</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <form id="user-form">
          <div class="form-group">
            <label>Password:</label>
            <input type="password" id="password" value="" name="password" class="form-control">
          </div>
          <div class="form-group">
            <label>Confirm Password:</label>
            <input type="password" id="password_confirmation" value="" name="password_confirmation"
              class="form-control">
          </div>
        </form>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success btn-save" onclick="users.save('pass',{{$data->id}})">Update
          Password <i class='fas fa-edit'></i></button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel <i
            class='fas fa-window-close'></i></button>
      </div>

    </div>
  </div>
</div>