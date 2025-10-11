<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AdminNotifications extends Notification
{
    use Queueable;

    private array $details;

    public function __construct($details)
    {
        $this->details = $details;
    }

    public function via(): array
    {
        return ['database'];
    }

    public function toDatabase(): array
    {
        return [
            'user_id' => $this->details['user_id'],
            'name' => $this->details['name'],
            'mobile' => $this->details['mobile'],
            'type' => $this->details['type'],
            'type_id' => $this->details['type_id'],
            'status' => $this->details['status'],
            'message' => $this->details['message'],
        ];
    }
}
