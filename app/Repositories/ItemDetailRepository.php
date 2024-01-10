<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\Section;
use App\Models\Element;
use App\Models\Item;
use App\Models\ItemDetail;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
/**
 * Class ItemRepository.
 */
class ItemDetailRepository
{
    /**
     * ItemRepository constructor.
     *
     * @param  Item  $model
     */
    public function __construct(ItemDetail $model)
    {
        $this->model = $model;
    }


    function getSearchPaginated($item,$criterion, $search, $status)
    {
        $dataItem = Item::where('id',$item)->first();  
        $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                     ? $this->model->where($criterion, 'like', '%'. $search . '%')->where('item_id',$item)
                     : $this->model->where('item_id',$item);
                
               
                
                $ItemDetails = $rg->orderBy('id', 'asc')->paginate(10);

        return [
                'pagination' => [
                    'total'        => $ItemDetails->total(),
                    'current_page' => $ItemDetails->currentPage(),
                    'per_page'     => $ItemDetails->perPage(),
                    'last_page'    => $ItemDetails->lastPage(),
                    'from'         => $ItemDetails->firstItem(),
                    'to'           => $ItemDetails->lastItem(),
                ],
                'ItemDetails' => $ItemDetails,
                'Item'=> $dataItem,
                'Section'=>Section::find($dataItem['section_id']),
            ];
    }

  
  
    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return ItemDetail
     */
    public function create(array $data): ItemDetail
    {
        return DB::transaction(function () use ($data) {

            $Item = $this->model::create([
                'item_id' => $data['item_id'],
                'name' => $data['name'],
                'description' => $data['description'],
                'image'=>$data['image']
            ]);

            if ($Item) {
                return $Item;
            }

            throw new GeneralException(__('There was an error created the Item.'));
        });
    }

    /**
     * @param Item  $Item
     * @param array $data
     *
     * @throws GeneralException
     * @throws \Exception
     * @throws \Throwable
     * @return ItemDetail
     */
    public function update($Item_id, array $data): ItemDetail
    {
       
        $Item = $this->model->find($Item_id);
        
        return DB::transaction(function () use ($Item, $data) {
            if ($Item->update([
                'name' => $data['name'],
                'image'=>$data['image'],
                'description' => $data['description'],
            ])) {

                return $Item;
            }

            throw new GeneralException(__('There was an error updating the Item.'));
        });
    }

 
    public function deleteOrResotore($ItemDetail_id)
    {    
        $Bval = ItemDetail::withTrashed()->find($ItemDetail_id)->trashed();

            if($Bval){
                $ItemDetail = ItemDetail::withTrashed()->find($ItemDetail_id)->restore();
                $b=4;
            }else{
                $ItemDetail = ItemDetail::find($ItemDetail_id)->delete();
                $b=3;
            }

            if ($b) {
                return $b;
            }
    
            throw new GeneralException(__('Error deleteOrResotore of ItemDetail.'));
    }



}
