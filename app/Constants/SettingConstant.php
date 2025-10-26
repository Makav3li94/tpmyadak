<?php

namespace App\Constants;

class SettingConstant
{
    public static function all(): array
    {
        return [
            ['key' => 'app_name', 'value' => 'TPM', 'type' => 'text'],
            ['key' => 'app_logo', 'value' => '', 'type' => 'image'],
            ['key' => 'sms_active', 'value' => 'yes', 'type' => 'text'],
            ['key' => 'sms_api_key', 'value' => '', 'type' => 'text'],
        ];
    }
}
