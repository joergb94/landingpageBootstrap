<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ItemWeb extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[];

    public function mapped()
    {
        return [
      
                'id' => $this->id,
                'title' => $this->title,
                'footer' => $this->footer,
                'is_main'=>$this->is_main,
                'image'=>$this->image,
                'section_web_id' => $this->section_web_id,
                'type_item_web_id' => $this->type_item_web_id,
                'section_web' => $this->section_web ? $this->section_web: null,
                'type_item_web' => $this->type_item_web ? $this->type_item_web: null,
                'children' => $this->children ? $this->children->map(function ($child) {
                    return (object)$child->mapped();
                }) : null,
     
            ];
    }


    public function section_web()
    {
        return $this->belongsTo('App\Models\SectionWeb','section_web_id','id');
    }

    public function type_item_web()
    {
        return $this->belongsTo('App\Models\TypeItemWeb','type_item_web_id','id');
    }

    public function children()
    {
        return $this->hasMany('App\Models\ItemWebDetail', 'item_web_id', 'id');
    }

}