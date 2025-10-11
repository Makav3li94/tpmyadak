<?php

namespace App\Models\Traits;


use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;
use Ippanel\Client;

trait SmsableMokhaberat
{
    public function sendFastSmsMokhaberat($number, $pattern_code, $input_data)
    {
//        $baseUrl = 'https://edge.ippanel.com/v1';
//        $endpoint = '/api/send';
//        $url = $baseUrl . $endpoint;
//
//        $token = 'HaZvvWgB6NGULeNZOTL6Jkvo37XKMluoT0RN136j2rU=';
//
//        try {
//            $response = Http::withHeaders([
//                'Authorization' => $token,
//                'Content-Type' => 'application/json',
//            ])->post($url, [
//                'sending_type' => 'pattern',
//                'from_number' => '+983000505',
//                'code' => $pattern_code,
//                'recipients' => [
//                    $number
//                ],
//                'params' => $input_data,
//            ]);
//            if ($response->successful()) {
//                return response()->json([
//                    'success' => true,
//                    'data' => $response->json()
//                ]);
//            } else {
//                return response()->json([
//                    'success' => false,
//                    'error' => $response->body()
//                ], $response->status());
//            }
//        } catch (ConnectionException $e) {
//            echo $e->getCode();
//            echo $e->getMessage();
//        }



        $client = new Client("HaZvvWgB6NGULeNZOTL6Jkvo37XKMluoT0RN136j2rU=");

        $sender = "+983000505";
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
                return  $data = $response->getData();
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
