<div id="index_table">
  <div class="row">
    <!--table section-->
    <div class="col">
      <div class="col-12">
        <table class="table table-bordered text-center">
          <thead class="head-biopy">
            <tr>
              <th>Nombre</th>
              <th class="td-diplay">Telefono</th>
              <th class="td-diplay">Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            @forelse($data as $inbox)
            <tr id="User{{$inbox->id}}">
              <td>{{ $inbox->name }}</td>
              <td class="td-diplay">
              <h5><label for="" class="text_breack_word">{{$inbox->phone}}</label> <b><a
                    class="btn btn-success btn-sm text-white" href="https://wa.me/52{{$inbox->phone}}"
                    target="_blank" style="color:#000;">Send Message <i style="font-size:13px;"
                      class="fab fa-whatsapp"></i></b></a></h5>
              </td>
              <td>{{ $inbox->email }}</td>
              <td class="btn-td">@include('inbox.items.buttons', ['inbox' => $inbox])</td>
            </tr>
            @empty
            <tr id="table-row" class="text-center">
              <th colspan="4" class="text-center no-data">
                <h1 class="text-biopy">No hay correos</h1>
              </th>
            </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>
    <!--pagination section-->
    <div class="col-sm-12">
      <br>
      <div class="row">
        <div class="col-7 span-lg-diplay">
          <div class="float-left">
            {!! $data->total() !!} {{ trans_choice('Correo|Correos', $data->total()) }}
          </div>
        </div>
        <!--col-->
        <div class="col-5 span-lg-diplay">
          <div class="float-right">
            {!! $data->render() !!}
          </div>
        </div>
        <div class="col-12 span-sm-diplay scroll-paginate">
          {!! $data->render() !!}
        </div>
        <!--col-->
      </div>
      <!--row-->
    </div>
  </div>
</div>