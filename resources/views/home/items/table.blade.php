<div id="index_table">
    <div class="jumbotron">
        <h3>Estadisticas</h3>
        <div class="row w-100">
                <div class="col-sm-4">
                    <div class="card border-success mx-sm-1 p-3">
                        <div class="card border-success shadow text-success p-3 my-card"><h4>Vistas <span class="fa fa-eye text-success" aria-hidden="true"></h4></span></div>
                        <div class="text-success text-center mt-3"></div>
                        <div class="text-success text-center mt-2"><h1>{{$data['views']->quantity}}</h1></div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card border-danger mx-sm-1 p-3">
                        <div class="card border-danger shadow text-danger p-3 my-card" ><h4>Usuarios <span class="fa fa-heart text-danger" aria-hidden="true"></h4></span></div>
                        <div class="text-danger text-center mt-3"></div>
                        <div class="text-danger text-center mt-2"><h1>{{$data ['users']}}</h1></div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card border-warning mx-sm-1 p-3">
                        <div class="card border-warning shadow text-warning p-3 my-card" ><h4>Inbox <span class="fa fa-inbox text-warning" aria-hidden="true"></span></h4></div>
                        <div class="text-warning text-center mt-3"></div>
                        <div class="text-warning text-center mt-2"><h1>{{$data['inbox']}}</h1></div>
                    </div>
                </div>
            </div>
    </div>
    <div class="col-sm-12">
        <h3>Ultimas actualizaciones</h3>
        <div class="row">
          @foreach ($data['last_upadted'] as $index => $item)
            <div class="col-sm-12 col-md-6 col-lg-4" >
              <div class="card text-center rounded-border">
                <div class="col-sm-12 preview-edition">
                    @if($item->type_item_web->is_main)
                        @include('website.items-example.main.'.$item->type_item_web->name, ['data' => $item])
                    @else
                        @include('website.items-example.'.$item->type_item_web->name, ['data' => $item])
                    @endif
                </div>

                <div class="card-body">
                   {{$item->updated_at}}
                </div>
              
              </div>
            </div>
          @endforeach
        </div> 
    </div>
    
</div>