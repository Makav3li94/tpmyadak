<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class BackupController extends Controller
{
    protected string $backupPath = 'private/Laravel';

    public function index()
    {
        $realPath = storage_path('app/' . $this->backupPath);

        $files = File::exists($realPath) ? File::files($realPath) : [];

        $backups = collect($files)
            ->filter(fn($file) => $file->getExtension() === 'zip')
            ->map(fn($file) => [
                'name' => $file->getFilename(),
                'size' => $file->getSize(),
                'last_modified' => $file->getMTime(),
                'download_url' => route('admin.backup.download', ['file' => $file->getFilename()]),
            ])
            ->sortByDesc('last_modified')
            ->values();

        return Inertia::render('admin/backup/Home', [
            'backups' => $backups,
        ]);
    }

    public function run()
    {
        Artisan::call('backup:run --only-db');
        return redirect()->back()->with('success', 'Backup success.');
    }

    public function download($file)
    {
        $path = storage_path('app/' . $this->backupPath . '/' . $file);

        if (!file_exists($path)) {
            abort(404, 'بکاپ یافت نشد');
        }

        return response()->download($path);
    }

    public function delete($file)
    {
        $path = storage_path('app/' . $this->backupPath . '/' . $file);

        if (!file_exists($path)) {
            return redirect()->back()->with('error', 'بکاپ قابل حذف نیست.');
        }

        unlink($path);

        return redirect()->back()->with('success', 'بکاپ حذف شد.');
    }
}
