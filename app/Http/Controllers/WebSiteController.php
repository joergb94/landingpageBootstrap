<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\WebSiteRepository;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailableName;
use Illuminate\Support\Facades\Redirect;

class WebSiteController extends Controller
{
    
     /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(WebSiteRepository $WebSiteRepository)
    {   
        $this->WebSiteRepository = $WebSiteRepository;
    
    }
    
    public function index(Request $request){

       $data = $this->WebSiteRepository->getWebSite();
     
       return view('website.index',['data'=>$data]);
    }
    

    public function send_mail(Request $request){
        
        try {

            $email = new MailableName($request->input());
            Mail::to('alex.ortega@dedicatedpeople.us')->send($email);

            return Redirect::back()->withSuccess("Send Message");
          
          } catch (\Exception $e) {
          
              return $e->getMessage();
          }

    }
}
