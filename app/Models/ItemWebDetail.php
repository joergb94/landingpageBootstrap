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

    public function item_web()
    {
        return $this->belongsTo('App\Models\ItemWeb','item_web_id','id');
    }
}
