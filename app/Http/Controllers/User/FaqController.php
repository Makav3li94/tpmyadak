<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Ticket;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function update(Request $request, Ticket $ticket): \Illuminate\Http\RedirectResponse
    {
        if ($ticket->user_id == auth()->id()) {
            request()->validate([
                'question' => 'required|string',
            ]);

            Faq::create([
                'ticket_id' => $ticket->id,
                'question' => $request['question'],
            ]);

            return redirect()->back()->with('message', 'پاسخ با موفقیت ارسال شد.');
        } else {
            abort(404);
        }
    }
}
