<div id="index_table">
<div class="row">
          @foreach ($data as $index => $item)
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
                    @include('edit-web.items.buttons', ['item' => $item])
                </div>
              
              </div>
            </div>
          @endforeach
        </div>
</div>