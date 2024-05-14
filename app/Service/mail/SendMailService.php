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
    protected $mail;
     /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(InboxRepository $InboxRepository)
    {   
        $this->InboxRepository = $InboxRepository;
        $this->mail = 'cesar.guzman@flexbetta.com.mx';
    
    }

    public function send($data){
        
        try {
            // Set maximum execution time limit to 60 seconds
            set_time_limit(120);
            $this->InboxRepository->create($data);
            $email = new SiteMail($data);
            $send_mail = Mail::to($this->mail)->send($email);
            return true;
          
          } catch (\Exception $e) {
          
              return $e->getMessage();
          }

    }
}
