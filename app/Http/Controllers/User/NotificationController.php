<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->unreadNotifications()->get();

        if (count($notifications) > 0) {
            foreach ($notifications as $notification) {

                $notification['link'] = match ($notification->data['type']) {
                    'ticket' => route('user.tickets.edit', $todo->data['type_id']),
                    'order' => route('user.orders.index', $todo->data['type_id']),
                    default => '',
                };

            }
        }

        return inertia('user/notification/index', [
            'notifications' => $notifications,
        ]);
    }
}
