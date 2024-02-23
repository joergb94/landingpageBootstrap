<?php

namespace App\Service\mail;

use Illuminate\Http\Request;
use App\Repositories\InboxRepository;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use App\Mail\SiteMail;
use Illuminate\Support\Facades\Redirect;


class SendMailService 
{
    protected $InboxRepository;
     /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(InboxRepository $InboxRepository)
    {   
        $this->InboxRepository = $InboxRepository;
    
    }

    public function send($data){
        
        try {
            $this->InboxRepository->create($data);
            $email = new SiteMail($data);
            Mail::to('test.email@email.com')->send($email);
            
            return true;
          
          } catch (\Exception $e) {
          
              return $e->getMessage();
          }

    }
}
