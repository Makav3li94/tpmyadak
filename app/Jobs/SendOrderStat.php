<?php

namespace App\Jobs;

use App\Models\Traits\SmsableMokhaberat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendOrderStat implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, SmsableMokhaberat;

    public $mobile;

    public $pattern;

    public $code;

    /**
     * Create a new job instance.
     */
    public function __construct($mobile, $pattern, $code)
    {
        $this->mobile = $mobile;
        $this->pattern = $pattern;
        $this->code = $code;
        //        $this->setKeys();

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->sendFastSmsMokhaberat($this->mobile, $this->pattern, ['code' => $this->code]);
    }
}
