<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\ItemWeb;
use App\Models\ItemWebDetail;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
/**
 * Class ItemRepository.
 */
class ItemWebRepository
{   
    protected $model;
    protected $modelDetail;
    /**
     * ItemRepository constructor.
     *
     * @param  ItemWeb  $model
     */
    public function __construct(ItemWeb $model, ItemWebDetail $modelDetail)
    {
        $this->model = $model;
        $this->modelDetail = $modelDetail;
    }


    function getSearchPaginated($criterion, $search, $status)
    {
            
        $rg = (strlen($criterion) > 0 &&  strlen($search) > 0) 
                     ? $this->model->where($criterion, 'like', '%'. $search . '%')
                     : $this->model->where('id','>',0);

                $Items = $rg->with('type_item_web:id,name,is_main')->orderBy('id', 'asc')->paginate(10);

        return  $Items;
    }

    public function findById(int $id):ItemWeb{
        return $this->model->withTrashed()->with(['type_item_web','section_web','children'])->find($id);
    }

    public function findDataToBlade(int $id = null){
        $data = []; 
        if($id > 0){
            $result = $this->findById($id)->mapped();
            $data['data'] = (object) $result;
            
        }
        return $data;
    }

  
  
    /**
     * @param array $data
     *
     * @throws \Exception
     * @throws \Throwable
     * @return Item
     */
    public function create(array $data): ItemWeb
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
    public function update(array $data): ItemWeb
    {
       
        $itemWeb = ItemWeb::findOrFail($data['id']);
        
        return DB::transaction(function () use ($itemWeb, $data) {


            if($itemWeb->update([
                'title' => $data['title'],
                'footer' => $data['footer'],
                'image' => $data['image'],
                'section_web_id' => $data['section_web_id'],
                'type_item_web_id' => $data['type_item_web_id'],
            ])){
                // Assuming 'children' is a relationship, you would handle it like this
                $itemWeb->children()->delete(); // Delete existing children
                // Create new children without 'element_web' and 'item_web'
                $cleanedChildren = [];
                foreach ($data['children'] as $child) {
                    // Remove 'element_web' and 'item_web' from each child data
                    unset($child['id']);
                    unset($child['element_web']);
                    unset($child['item_web']);
                    $cleanedChildren[] = $child;
                }
                $itemWeb->children()->createMany($cleanedChildren);
                if($itemWeb){
                    return $itemWeb;
                }
             
            }
            throw new GeneralException(__('There was an error updating the Item.'));
        });
    }

 
    public function deleteOrResotore($ItemWeb_id)
    {    
        $Bval = ItemWeb::withTrashed()->find($ItemWeb_id)->trashed();

            if($Bval){
                $ItemWeb = ItemWeb::withTrashed()->find($ItemWeb_id)->restore();
                $b=4;
            }else{
                $ItemWeb = ItemWeb::find($ItemWeb_id)->delete();
                $b=3;
            }

            if ($b) {
                return $b;
            }
    
            throw new GeneralException(__('Error deleteOrResotore of Item.'));
    }



}
