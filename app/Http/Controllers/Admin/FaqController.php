<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function update(Request $request, $id)
    {

        $request->validate([
            'reply' => 'required',
        ]);
        $ticket = Ticket::find($id);
        $faq = $ticket->faqs()->latest()->first();
        $faq->update([
            'admin_id' => auth()->id(),
            'reply' => $request['reply'],
            'seen' => '2',
            'reply_date' => Carbon::now(),
        ]);

        if ($ticket->faqs()
            ->where('reply', null)
            ->orWhere('reply', '')
            ->get()
            ->count() == 0) {
            $ticket->update(['answer' => '2']);
        }

        return redirect()->back()->with('message', 'پاسخ تیکت با موفقیت ارسال شد.');
    }
}
