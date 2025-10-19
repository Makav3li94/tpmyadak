<?php

namespace App\Constants;

class SettingConstant
{
    public static function all()
    {
        return [
            ['key' => 'app_name', 'value' => 'TPM', 'type' => 'text'],
            ['key' => 'app_logo', 'value' => '', 'type' => 'image'],
            ['key' => 'sms_active', 'value' => 'no', 'type' => 'text'],
            ['key' => 'sms_api_key', 'value' => '', 'type' => 'text'],
        ];
    }
}
