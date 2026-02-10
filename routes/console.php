<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('demo:cron')->everyMinute();
