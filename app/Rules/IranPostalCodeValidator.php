<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IranPostalCodeValidator implements ValidationRule
{
    public function __construct(
        protected ?string $separator = null,
        protected bool $convertPersianNumbers = false
    ) {}


    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = convertPersianNumbers($value);

        $failMessage = 'ir_postal_code';
        $separator   = '';

        if (! is_null($this->separator)) {
            $separator   = separator($this->separator, '-');
            $failMessage = 'ir_postal_code_with_separator';
        }

        if (! preg_match("/\b(?!(\d)\1{3})[13-9]{5}{$separator}[0-9]{5}\b/", $value)) {
            $fail('کد پستی معتبر نیست.');
        }
    }
}
