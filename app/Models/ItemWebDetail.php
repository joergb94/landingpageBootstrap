<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ItemWebDetail extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded=[];

    public function mapped()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image,
            'item_web_id' => $this->item_web_id,
            'element_web_id' => $this->element_web_id,
            'item_web' => $this->item_web ? $this->item_web->toArray() : null,
            'element_web' => $this->element_web ? $this->element_web->toArray() : null,
        ];
    }

    public function item_web()
    {
        return $this->belongsTo('App\Models\ItemWeb','item_web_id','id');
    }

    public function element_web()
    {
        return $this->belongsTo('App\Models\ElementWeb','element_web_id','id');
    }
}
