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