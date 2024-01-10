<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTypeDetail extends Model
{
    protected $guarded=[];
    use SoftDeletes;
    use HasFactory;

    public function user_type()
    {
        return $this->belongsTo('App\Models\UserType','user_type_id','id');
    }

    public function menu_data()
    {
        return $this->belongsTo('App\Models\MenuData','menu_data_id','id');
    }


   /**
     * @return bool
     */
    public function isActive()
    {
        return $this->status;
    }

    /**
     * @param $query
     * @param bool $status
     *
     * @return mixed
     */
    public function scopeActive($query, $status = true)
    {
        return $query->where('active', $status);
    }
}
