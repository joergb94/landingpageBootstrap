<?php

namespace App\Repositories;

use App\Exceptions\GeneralException;
use App\Models\SectionWeb;
use App\Models\ItemWeb;
use App\Models\ItemWebDetail;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
/**
 * Class ItemRepository.
 */
class WebSiteRepository
{
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


    public function getSectionWebSite($type_item_web_id){
        return $this->model::with(['children','type_item_web:id,name'])->where('type_item_web_id',$type_item_web_id)->get();
    }

    function getWebSite()
    {
        $data['header_items'] = $this->getSectionWebSite(1);

        $data['main_items'] =  $this->model::with(['children','type_item_web:id,name'])->whereHas('type_item_web', function ($query) {
            $query->where('is_main', true); // Assuming 'active' is a boolean column
        })->get();

        $data['footer_items']=$this->getSectionWebSite(2);

        return $data;
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
