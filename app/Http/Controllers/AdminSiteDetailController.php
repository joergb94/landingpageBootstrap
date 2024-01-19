<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ItemWebDetailRepository;
use App\Models\ItemWebDetail;
use Illuminate\Support\Facades\File;
use Carbon\Carbon; 

class AdminSiteDetailController extends Controller
{
        /**
     * CompanyController constructor.
     *
     * @param ItemWebDetailRepository $ItemDetailRepository
     */
    public function __construct(ItemWebDetailRepository $ItemDetailRepository)
    {
        $this->ItemDetailRepository = $ItemDetailRepository;
    }

    public function index(Request $request){

        if (!$request->ajax()) return view('adminDetail.index');
        return view('adminDetail.index');
    }
    
    public function indexData(Request $request,$item){
       
        if (!$request->ajax()) return view('adminDetail.index');
        
        $search = trim($request->search);
        $criterion = trim($request->criterion);
        $status = ($request->status)? $request->status : 1;
  
        return $this->ItemDetailRepository->getSearchPaginated($item,$criterion, $search, $status);
    }

    public function store(Request $request){
        
        if($request['image']){
            $image = $request->file('image');
            $nameImg = time().$image->getClientOriginalName();
            $file_path ='/images/ItemDetails/';
            $image->move(public_path().'/images/ItemDetails/',$nameImg);
        }else{
            $nameImg ='product.png';
            $file_path ='/images/icon/';
        }
        $this->ItemDetailRepository->create([
                                        'item_id'=>$request->item_id,
                                        'name'=>$request->name,
                                        'description' =>$request->description,
                                        'image'=>'/images/ItemDetails/'.$nameImg,
                                        'footer' => $request->footer,
                                    ]);
        return response()->json('ready');
    }

    public function update(Request $request){
        
        $imageToDelete = ItemWebDetail::find($request->id);

        if($request->image){
                $file_path = public_path().$imageToDelete->image;
                File::delete($file_path);
                $image = $request->file('image');
                $name = time().$image->getClientOriginalName();
                $image->move(public_path().'/images/ItemDetails/',$name);
                $nameImg = '/images/ItemDetails/'.$name;
        }
        else{
            $nameImg = $imageToDelete->image;
        }


        $this->ItemDetailRepository->update($request['id'],[
                                            'name'=>$request->name,
                                            'description' =>$request->description,
                                            'image'=> $nameImg,
                                        ]);

        return response()->json('ready');
    }


    public function deleteOrResotore(Request $request)
    {    
        $data = $this->ItemDetailRepository->deleteOrResotore($request['id']);
        return response()->json('exito');
    }
}
