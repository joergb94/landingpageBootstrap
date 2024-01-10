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
class ItemRepository
{
    /**
     * ItemRepository constructor.
     *
     * @param  Item  $model
     */
    public function __construct(Item $model, ItemDetail $modelDetail)
    {
        $this->model = $model;
        $this->modelDetail = $modelDetail;
    }


    function getSearchPaginated($section,$criterion, $search, $status)
    {
            
        $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                     ? $this->model->where($criterion, 'like', '%'. $search . '%')->where('section_id',$section)
                     : $this->model->where('section_id',$section);
                
               
                
                $Items = $rg->orderBy('id', 'asc')->paginate(10);

        return [
                'pagination' => [
                    'total'        => $Items->total(),
                    'current_page' => $Items->currentPage(),
                    'per_page'     => $Items->perPage(),
                    'last_page'    => $Items->lastPage(),
                    'from'         => $Items->firstItem(),
                    'to'           => $Items->lastItem(),
                ],
                'Items' => $Items,
                'Section'=>Section::find($section),
                'Elements'=>Element::where('section_id',$section)->get(),
            ];
    }

  
  
    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return Item
     */
    public function create(array $data): Item
    {
        return DB::transaction(function () use ($data) {

            $Item = $this->model::create([
                'section_id' => $data['section_id'],
                'title' => $data['title'],
                'element' =>$data['element'],
                'image'=>$data['image'],
                'description' => $data['description'],
                'footer' =>$data['footer'],
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
     * @return Item
     */
    public function update($Item_id, array $data): Item
    {
       
        $Item = $this->model->find($Item_id);
        
        return DB::transaction(function () use ($Item, $data) {
            if ($Item->update([
                'section_id' => $data['section_id'],
                'title' => $data['title'],
                'element' =>$data['element'],
                'image'=>$data['image'],
                'description' => $data['description'],
                'footer' =>$data['footer']
            ])) {

                return $Item;
            }

            throw new GeneralException(__('There was an error updating the Item.'));
        });
    }

 
    public function deleteOrResotore($Item_id)
    {    
        $Bval = Item::withTrashed()->find($Item_id)->trashed();

            if($Bval){
                $Item = Item::withTrashed()->find($Item_id)->restore();
                $b=4;
            }else{
                $Item = Item::find($Item_id)->delete();
                $b=3;
            }

            if ($b) {
                return $b;
            }
    
            throw new GeneralException(__('Error deleteOrResotore of Item.'));
    }



}
