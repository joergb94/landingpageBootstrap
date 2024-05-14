<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Inbox\InboxCreateRequest;
use App\Repositories\WebSiteRepository;
use App\Service\mail\SendMailService;
use Illuminate\Support\Facades\Redirect;


class WebSiteController extends Controller
{
    protected $WebSiteRepository;
    protected $SendMailService;
     /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(WebSiteRepository $WebSiteRepository, SendMailService $SendMailService)
    {   
        $this->WebSiteRepository = $WebSiteRepository;
        $this->SendMailService = $SendMailService;
    }
    
    public function index(Request $request){

       $data = $this->WebSiteRepository->getWebSite();

      
       return view('website.index',['data'=>$data]);
    }
    

    public function send_mail(InboxCreateRequest $request){
        if ($request->ajax()) { 
            $data = $this->SendMailService->send($request->input());
            return response()->json(Answer( 'success',
                                        'Mensaje Enviado',
                                        'Tu mensaje será rebizado'));
        }
    }
}
