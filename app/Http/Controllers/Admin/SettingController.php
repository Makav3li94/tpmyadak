<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    #[Permission('view-setting')]
    public function index()
    {
        return inertia('admin/setting/index', [
            'setting' => Setting::all(),
        ]);
    }

    #[Permission('update-setting')]
    public function update(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string',
            'app_logo' => 'nullable|string',
        ]);

        DB::beginTransaction();

        foreach ($request->except(['app_logo', 'invoice_watermark']) as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? ''],
            );
        }

        foreach ($request->only(['app_logo', 'invoice_watermark']) as $key => $value) {
            if ($value != '') {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value ?? ''],
                );
            }
        }

        DB::commit();

        return redirect()->route('admin.setting.index')
            ->with('message', ['type' => 'success', 'message' => 'تنظیمات ساخته شد.']);
    }
}
