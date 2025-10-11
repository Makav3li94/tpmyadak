<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class UserNotifications extends Notification
{
    private $user;
    private $details;

    public function __construct($user, $details)
    {
        $this->user = $user;
        $this->details = $details;
    }


    public function via(): array
    {
        return ['database'];
    }

    public function toDatabase(): array
    {

        return [
            'user_id' => $this->user->id,
            'name' => $this->user->name,
            'mobile' => $this->user->mobile,
            'status' => $this->details['status'],
            'type' => $this->details['type'],
            'type_id' => $this->details['type_id'],
            'message' => $this->details['message'],
        ];
    }


}
