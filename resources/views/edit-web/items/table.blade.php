<div id="index_table">
<div class="row">
          @foreach ($data as $index => $item)
            <div class="col-sm-4" >
              <div class="card text-center rounded-border">
                <div class="col-sm-12 preview-edition">
                    @if($item->type_item_web->is_main)
                        @include('website.items-example.main.'.$item->type_item_web->name)
                    @else
                        @include('website.items-example.'.$item->type_item_web->name)
                    @endif
                </div>

                <div class="card-body">
                    <h4 class="card-title">{{$item->title}}</h4>
                    <p class="card-text">{{substr($item->footer, 0, 15)}}...</p>
                    @include('edit-web.items.buttons', ['item' => $item])
                </div>
              
              </div>
            </div>
          @endforeach
        </div>
</div>