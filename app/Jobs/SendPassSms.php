<?php

namespace App\Jobs;

use App\Models\Traits\SmsableMokhaberat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendPassSms implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, SmsableMokhaberat;

    public $mobile;

    public $pattern;

    public $name;

    public $pass;

    /**
     * Create a new job instance.
     */
    public function __construct($mobile, $pattern, $name, $pass)
    {
        //        $this->setKeys();
        $this->mobile = $mobile;
        $this->pattern = $pattern;
        $this->name = $name;
        $this->pass = $pass;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->sendFastSmsMokhaberat($this->mobile, $this->pattern, ['name' => $this->name, 'pass' => $this->pass]);
    }
}
