<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\ItemWebRepository;
use App\Models\ItemWeb;
use Illuminate\Support\Facades\File;
use Carbon\Carbon; 

class AdminSiteController extends Controller
{
         /**
     * CompanyController constructor.
     *
     * @param ItemRepository $ItemRepository
     */
    public function __construct(ItemWebRepository $ItemRepository)
    {
        $this->ItemRepository = $ItemRepository;
    }

    public function index(Request $request){

        if (!$request->ajax()) return view('admin.index');
        return view('admin.index');
    }
    
    public function indexData(Request $request,$section){
       
        if (!$request->ajax()) return view('admin.index');
        
        $search = trim($request->search);
        $criterion = trim($request->criterion);
        $status = ($request->status)? $request->status : 1;
  
        return $this->ItemRepository->getSearchPaginated($section,$criterion, $search, $status);
    }

    public function store(Request $request){
        
        if($request['image']){
            $image = $request->file('image');
            $nameImg = time().$image->getClientOriginalName();
            $file_path ='/images/items/';
            $image->move(public_path().'/images/items/',$nameImg);
        }else{
            $nameImg = NULL;
        }
        $this->ItemRepository->create([
                                        'section_id'=>$request->section_id,
                                        'title'=>$request->title,
                                        'description' =>$request->description,
                                        'element'=>$request->element,
                                        'image'=>'/images/items/'.$nameImg,
                                        'footer' => $request->footer,
                                    ]);
        return response()->json('ready');
    }

    public function update(Request $request){
        
        $imageToDelete = Item::find($request->id);

        if($request->image){
                $file_path = public_path().'/images/items/'.$imageToDelete->image;
                File::delete($file_path);
                $image = $request->file('image');
                $nameImg = time().$image->getClientOriginalName();
                $image->move(public_path().'/images/items/',$nameImg);
        }
        else{
            $nameImg = '/images/items/'.$imageToDelete->image;
        }


        $this->ItemRepository->update($request['id'],[
                                            'section_id'=>$request->section_id,
                                            'title'=>$request->title,
                                            'description' =>$request->description,
                                            'element'=>$request->element,
                                            'image'=>'/images/items/'.$nameImg,
                                            'footer' => $request->footer,
                                        ]);

        return response()->json('ready');
    }


    public function deleteOrResotore(Request $request)
    {    
        $data = $this->ItemRepository->deleteOrResotore($request['id']);
        return response()->json('exito');
    }
}
