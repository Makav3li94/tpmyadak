<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IranMobileValidator implements ValidationRule
{
    /**
     * Create a new rule instance.
     */
    public function __construct(
        protected string $format = 'all',
        protected bool $convertPersianNumbers = false
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $extendPattern  = '(0[0-5]|1[0-9]|2[0-3]|3[0-9]|9[0-9])\d{7}';
        $formatPatterns = [
            'zero_code' => "00989{$extendPattern}",
            'plus_code' => "\+989{$extendPattern}",
            'code'      => "989{$extendPattern}",
            'zero'      => "09{$extendPattern}",
            'normal'    => "9{$extendPattern}",
            'all'       => "(0|0098|\+98|98)?9{$extendPattern}",
        ];

        $examples = [
            'zero_code' => '00989123456789',
            'plus_code' => '+989123456789',
            'code'      => '989123456789',
            'zero'      => '09123456789',
            'normal'    => '9123456789',
            'all'       => '00989123456789, +989123456789, 989123456789, 09123456789, 9123456789',
        ];



        if (! isset($formatPatterns[$this->format])) {
            throw new \InvalidArgumentException('Invalid format. valid formats are: ' .
                implode(', ', array_keys($formatPatterns))
            );
        }

        $value = convertPersianNumbers($value);
        $pattern = $formatPatterns[$this->format];

        if (! preg_match("/^{$pattern}$/i", $value)) {
            $fail('شماره موبایل معتبر نیست');
        }
    }
}
