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

    public function children()
    {
        return $this->hasMany('App\Models\ItemWebDetail','id','item_web_id');
    }

}