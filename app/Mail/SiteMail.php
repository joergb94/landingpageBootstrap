<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
class SiteMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    public $now;

    public function __construct(array $data, String $view)
    {
        $this->data = $data;
        $this->view = $view;
        $this->now = Carbon::now();
    }

    public function build()
    {
        return $this->from('marketing@flexbetta.com.mx')
                ->to($this->data['email'])
                ->subject('Mensaje de Flexbetta-Web ' . $this->now)
                ->view($this->view)
                ->with($this->data);
    }
}
