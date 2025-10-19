<?php

namespace App\Models\Traits;

use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;
use Ippanel\Client;

trait SmsableMokhaberat
{
    public function sendFastSmsMokhaberat($number, $pattern_code, $input_data)
    {

        $client = new Client('HaZvvWgB6NGULeNZOTL6Jkvo37XKMluoT0RN136j2rU=');

        $sender = '+983000505';
        //        $sender = "5000125475";
        //        $sender = "10004519";
        try {
            $response = $client->sendPattern(
                $pattern_code,
                $sender,
                $number,
                $input_data
            );
            if ($response->isSuccessful()) {
                // Pattern message sent successfully
                return $data = $response->getData();
                // Process data...
            } else {
                Log::debug('Try === ');
                Log::debug($response->getData());
                Log::debug($response->getMessage());

                return $response->getMessage();
            }
        } catch (GuzzleException $e) {
            Log::debug('Catch  === ');
            Log::debug($e->getCode());
            Log::debug($e->getMessage());
            echo $e->getCode();
            echo $e->getMessage();
        }

    }
}
