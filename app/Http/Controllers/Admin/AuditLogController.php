<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class AuditLogController extends Controller
{
    public function index(Request $request)
    {
        $logs = Activity::with('causer')
            ->orderByDesc('created_at')
            ->paginate(20);

        return Inertia::render('admin/auditlogs/Home', [
            'logs' => $logs,
        ]);
    }
}
