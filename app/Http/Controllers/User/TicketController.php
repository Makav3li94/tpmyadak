<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Ticket;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::where('user_id', auth()->id())->orderBy('id', 'desc')->paginate(10);

        return inertia('user/ticket/index', [
            'data' => $tickets,
        ]);
    }

    public function store(Request $request): Application|Redirector|RedirectResponse
    {

        request()->validate([
            'section' => 'required|in:پشتیبانی,مدیریت,مالی',
            'priority' => 'required|in:خیلی مهم,مهم,عادی',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);
        $user = auth()->user();
        $ticket = Ticket::create([
            'user_id' => $user->id,
            'title' => $request['title'],
            'section' => $request['section'],
            'priority' => $request['priority'],
        ]);
        Faq::create([
            'ticket_id' => $ticket->id,
            'question' => $request['description'],
        ]);

//        defer(fn () => $this->notifyAdmin($user->id, $user->name, $user->mobile, 'ticket', $ticket->id, 0, 'کاربر تیکت جدیدی ارسال کرده است.'));

        return redirect(route('user.tickets.index', $ticket->id))->with('message', 'تیکت با موفقیت ارسال شد.');
    }

    public function create(): Response
    {
        return inertia('user/ticket/form');
    }

    public function edit(Ticket $ticket)
    {
        if ($ticket->user_id == auth()->id()) {
            $ticket->faqs()
                ->where('reply', '!=', null)
                ->orWhere('reply', '!=', '')
                ->where('seen', '2')
                ->update(['seen' => '3']);

            return inertia('user/ticket/show', [
                'ticket' => $ticket->load(['faqs', 'user']),
            ]);
        } else {
            abort(404);
        }
    }

    protected function status(Ticket $ticket)
    {
        if ($ticket->user_id == auth()->user()->id) {
            $previous = $ticket->status;
            switch ($previous) {
                case '0':
                    abort(403);
                case '1':
                    $ticket->update(['status' => '0']);
                    if ($ticket->faqs()
                        ->where('reply', null)
                        ->orWhere('reply', '')
                        ->get()
                        ->count() > 0) {
                        $ticket->update(['answer' => '2']);
                        $ticket->faqs()
                            ->where('reply', null)
                            ->orWhere('reply', '')
                            ->update(['reply' => 'مورد رسیدگی شد.', 'seen' => '3']);
                    }
                    break;
            }

            return back()->with('message', 'وضعیت تیکت با موفقیت تغییر کرد.');
        } else {
            abort(403);
        }
    }
}
