<?php

namespace App\Console;

use App\Models\WeeklyScraperLog;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('scrape:update-prices-hybrid --limit=10000')
            ->weekly()->saturdays()->at('8:00')
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/scraper.log'));
        $schedule->command('scrape:update-prices-hybrid --limit=10000 --cleanup')
            ->weekly()->wednesdays()->at('8:00')
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/scraper.log'));

        $schedule->call(function () {
            WeeklyScraperLog::truncate();
        })->weekly()->fridays()->at('07:50');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
