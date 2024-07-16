<?php

namespace App\Service\mail;

use Illuminate\Http\Request;
use App\Repositories\InboxRepository;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;
use App\Mail\SiteMail;
use Illuminate\Support\Facades\Redirect;


class SendMailManagerService 
{
    protected $InboxRepository;
    protected $mail;
    protected $mailManager;
     /**
     * CompanyController constructor.
     *
     * @param UserRepository $UserRepository
     */
    public function __construct(InboxRepository $InboxRepository)
    {   
        $this->InboxRepository = $InboxRepository;
        $this->mail = 'marketing@flexbetta.com.mx';
        $this->mailManager = 'cesar.guzman@flexbetta.com.mx';
    
    }

    public function send($data,$view){
        
        try {
            $data['email_to']=$data['email'];
            $data['email']=$this->mail;
            // Set maximum execution time limit to 60 seconds
            set_time_limit(120);
            $this->InboxRepository->create($data);
            $email = new SiteMail($data,$view);
            $send_mail = Mail::to($data['email'])->bcc($this->mailManager)->send($email);
            return true;
          
          } catch (\Exception $e) {
              return $e->getMessage();
          }

    }
}
