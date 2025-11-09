<?php

use App\Models\Admin;
use App\Models\User;
use App\Notifications\AdminNotifications;
use App\Notifications\UserNotifications;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Number;

if (! function_exists('splitPascalCase')) {
    function splitPascalCase($string): string
    {
        $word = '';
        // Use a regular expression to insert a space before each capital letter except the first one
        $splitString = preg_replace('/(?<!^)([A-Z])/', ' $1', $string);
        foreach (explode(' ', $splitString) as $index => $s) {
            if ($index == 0) {
                $word .= $s;

                continue;
            }
            $word .= '-'.$s;
        }

        return $word;
    }
}

if (! function_exists('formatIDR')) {
    function formatIDR($number): int|string
    {
        if (! $number) {
            return 0;
        }

        return trim(str_replace(',', '.', str_replace('IDR', '', (Number::currency($number, 'IDR', precision: 0)))));
    }
}

if (! function_exists('formatDate')) {
    function formatDate($date): string
    {
        return \Illuminate\Support\Carbon::parse($date)->format('d-m-Y');
    }
}

if (! function_exists('formatNumZero')) {
    function formatNumZero($n): string
    {
        $max = 3; // 0001

        $number = '';
        foreach (range(0, $max - strlen($n)) as $_) {
            $number .= '0';
        }

        return $number.$n;
    }
}

function notifyAdmin($user_id, $name, $mobile, $type, $type_id, $status, $message = null): void
{
    $details = [
        'user_id' => $user_id,
        'name' => $name,
        'mobile' => $mobile,
        'type' => $type,
        'type_id' => $type_id,
        'status' => $status,
        'message' => $message,
    ];
    $users = Admin::all();
    Notification::send($users, new AdminNotifications($details));
}

function notifyUser($user_id, $type, $type_id, $status, $message = null): void
{
    $details = [
        'user_id' => $user_id,
        'type' => $type,
        'type_id' => $type_id,
        'status' => $status,
        'message' => $message,
    ];
    $user = User::find($user_id);
    Notification::send($user, new UserNotifications($user, $details));
}
function array_mapper($array): array
{
    $mapped_array = [];
    foreach ($array as $key => $item) {
        $mapped_array[] = $item['value'];
    }

    return $mapped_array;
}
function array_labeler($array): array
{
    $labeled_array = [];
    foreach ($array as $key => $item) {
        $labeled_array[] = ['value' => strval($item['id']), 'label' => $item['title']];
    }

    return $labeled_array;
}
function slug_gen($title, $separator = '-'): string
{
    $title = trim($title);
    $title = mb_strtolower($title, 'UTF-8');

    $title = str_replace('‌', $separator, $title);

    $title = preg_replace(
        '/[^a-z0-9_\s\-اآؤئبپتثجچحخدذرزژسشصضطظعغفقكکگلمنوةيإأۀءهی۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩]/u',
        '',
        $title
    );

    $title = preg_replace('/[\s\-_]+/', ' ', $title);
    $title = preg_replace('/[\s_]/', $separator, $title);

    return trim($title, $separator);
}
function convertPersianNumbers(mixed $input, bool $reverseConvert = false): string
{
    $fa_num = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    $ar_num = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    $en_num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return $reverseConvert
        ? str_replace($en_num, $fa_num, (string) $input)
        : str_replace([...$fa_num, ...$ar_num], $en_num, (string) $input);
}
function getIranianPhoneAreaCodes(): array
{
    return [
        '021', // Tehran
        '026', // Alborz
        '025', // Qom
        '011', // Mazandaran
        '013', // Gilan
        '017', // Golestan
        '041', // East Azerbaijan
        '044', // West Azerbaijan
        '045', // Ardabil
        '024', // Zanjan
        '087', // Kurdistan
        '081', // Hamadan
        '083', // Kermanshah
        '084', // Ilam
        '066', // Lorestan
        '061', // Khuzestan
        '038', // Chaharmahal and Bakhtiari
        '074', // Kohgiluyeh and Boyer-Ahmad
        '031', // Isfahan
        '071', // Fars
        '077', // Bushehr
        '076', // Hormozgan
        '034', // Kerman
        '035', // Yazd
        '054', // Sistan and Baluchestan
        '056', // South Khorasan
        '051', // Razavi Khorasan
        '058', // North Khorasan
        '023', // Semnan
        '086', // Markazi
        '028', // Qazvin
    ];
}
function separator(string $input, string $default = '-', ?array $allows = null, bool $reverseConvert = false): string
{
    $allowsMap = ['/', '|', '-', '_', '*', '.', ',', 'space'];
    $replaceMap = [
        '/' => '\/',
        '|' => '\|',
        '*' => '\*',
        '.' => '\.',
        'space' => '\s',
    ];

    if (! is_null($allows)) {
        $invalidValues = array_diff($allows, $allowsMap);

        if (! empty($invalidValues)) {
            throw new \InvalidArgumentException(
                'Invalid delimiter allows parameter. allowed values: '.implode(', ', $allowsMap)
            );
        }
    }

    $value = in_array($input, $allows ?? $allowsMap, true) ? $input : $default;

    if ($reverseConvert) {
        return strtr($value, array_flip($replaceMap));
    }

    return strtr($value, $replaceMap);
}

function queryMapper($query)
{
    return $query->map(function ($item) {
        return [
            'value' => strval($item['id']),
            'label' => $item['title'],
        ];
    })->values()->toArray();
}
if (! function_exists('findSimilarRecord')) {
    function findSimilarRecord($model, $title, &$records, $extraFields = [], $threshold = 75)
    {
        $best = null;
        $bestPercent = 0;

        foreach ($records as $record) {
            similar_text(trim($title), trim($record->title), $percent);
            if ($percent > $bestPercent) {
                $bestPercent = $percent;
                $best = $record;
            }
        }

        if ($best && $bestPercent >= $threshold) {
            return $best;
        }

        $new = $model::create(array_merge([
            'id' => \Str::ulid(),
            'title' => $title,
            'slug' => \Str::slug($title),
        ], $extraFields));

        // این خط باعث آپدیت شدن allCategories / allBrands / allCarModels در فایل اصلی می‌شود
        $records->push($new);

        return $new;
    }
}


if (! function_exists('normalizeText')) {
    function normalizeText($text): array|false|string|null
    {
        return str_replace([' ', '-', '‌'], '', mb_strtolower(trim($text)));
    }
}
