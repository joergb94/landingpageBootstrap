<div class="modal fade" id="FormModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Informacion del correo</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="col-sm-12 text-center">
          <div class="row">
            <div class="col-sm-12">
              <label class="col-sm-12"><strong>Name(s):</strong></label>
              {{$data->name}}
            </div>
            <div class="col-sm-12">
              <label class="col-sm-12"><strong>Phone:</strong></label>
              <h5>{{$data->phone}}</h5>
              @if($data->phone != '')
              <a class="btn btn-success text-white" href="https://wa.me/52{{$data->phone}}" target="_blank"
                style="color:#000;">Send Message &nbsp; <i style="font-size:18px;" class="fab fa-whatsapp"></i></b></a>
              @else
              <span>No Phone</span>
              @endif
            </div>
            <div class="col-sm-12">
              <label class="col-sm-12"><strong>E-mail:</strong></label>
              <p class="text_breack_word">{{$data->email}}</p>
            </div>
            <div class="col-sm-12">
              <label class="col-sm-12"><strong>Mensaje:</strong></label>
              <p class="text_breack_word">{{$data->description}}</p>
            </div>
            <div class="col-sm-12">
              <label class="col-sm-12">fecha de envio:</label>
              <strong>{{$data->created_at}}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close <i
            class='fas fa-window-close'></i></button>
      </div>

    </div>
  </div>
</div>