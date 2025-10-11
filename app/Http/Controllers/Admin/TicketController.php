<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $query = Ticket::query();
        $query->with('user');
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/ticket/index', [
            'data' => $query->paginate(10),
        ]);
    }

    public function create(){

    }

    public function show(Ticket $ticket): \Inertia\Response
    {
        if ($ticket->faqs()
                ->where('reply', null)
                ->orWhere('reply', '')->get()->count() > 0) {
            $ticket->update(['answer' => '1']);
        }
        $ticket->faqs()->where('seen', '0')->update(['seen' => '1']);
        return Inertia::render('admin/ticket/form', [
            'ticket' => $ticket->load(['faqs', 'user'])->toArray()
        ]);
    }


    public function destroy(Ticket $ticket): \Illuminate\Http\RedirectResponse
    {
        foreach ($ticket->faqs as $faq) {
            if ($faq->user_file && file_exists(public_path($faq->user_file))) {
                unlink(public_path($faq->user_file));
            }
            if ($faq->admin_file && file_exists(public_path($faq->admin_file))) {
                unlink(public_path($faq->admin_file));
            }
        }
        $ticket->faqs()->delete();
        $ticket->delete();
        return redirect()->back()->with('message', 'تیکت با موفقیت بسته شد.');
    }

    public function status(Ticket $ticket): \Illuminate\Http\RedirectResponse
    {
        $previous = $ticket->status;
        switch ($previous) {
            case '0':
                $ticket->update(['status' => '1']);
                break;
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
                        ->update(['reply' => 'مورد رسیدگی شد.', 'seen' => '2', 'admin_id' => auth()->id()]);
                }
                break;
        }
        return back()->with('message', 'وضعیت تیکت با موفقیت به روز شد.');
    }


}
