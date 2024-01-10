<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuData extends Model
{
    protected $guarded=[];
    use HasFactory;
    
    public function data_menu()
    {
        return $this->hasMany(' App\Models\TypeUserDetail','data_menu_id','id');
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
        return $query->where('status', $status);
    }
}
