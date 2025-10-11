<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LogReaderController extends Controller
{

    public function getLogs(): \Inertia\Response
    {
        $logs = $this->extracted();

//        $total=count($logs);
//        $per_page = 10;
//
//        $current_page = $request->input("page") ?? 1;
//        $starting_point = ($current_page * $per_page) - $per_page;
//
//        $logs = array_slice($logs, $starting_point, $per_page, true);
//
//
//        $logs = new Paginator($logs, $total, $per_page, $current_page, [
//            'path' => $request->url(),
//            'query' => $request->query(),
//        ]);

        return Inertia::render('admin/errorlogs/Home', [
            'errLogs' => $logs,
        ]);
    }

    private function extracted(): array
    {
        $pattern = "/^\[(?<date>.*)\]\s(?<env>\w+)\.(?<type>\w+):(?<message>.*)/m";

        $fileName = 'laravel.log';
        $content = file_get_contents(storage_path('logs/' . $fileName));
        preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

        $logs = [];
        foreach ($matches as $match) {
            $logs[] = [
                'timestamp' => $match['date'],
                'env' => $match['env'],
                'type' => $match['type'],
                'message' => trim($match['message'])
            ];
        }
        return $logs;
    }

}
