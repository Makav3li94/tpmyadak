<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IranBankCardNumberValidator implements ValidationRule
{

    public function __construct(
        protected ?string $separator = null,
        protected bool $convertPersianNumbers = false
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = convertPersianNumbers($value);

        $separator   = '';
        $failMessage = 'ir_bank_card_number';
        $pattern     = "/^[2569]{1}\d{15}$/";

        if (! is_null($this->separator)) {
            $separator   = separator($this->separator, '-');
            $pattern     = "/^[2569]{1}\d{3}{$separator}\d{4}{$separator}\d{4}{$separator}\d{4}$/";
        }

        if (! preg_match($pattern, $value) ||
            ! $this->isValidCardNumber(preg_replace("/{$separator}/", '', $value))
        ) {
            $fail("کارت بانکی معتبر نیست.");
        }
    }

    protected function isValidCardNumber(string $value): bool
    {
        $cardTotal = 0;
        $length    = 16;
        $cardToArr = str_split($value);

        for ($position = 1; $position <= $length; $position++) {
            $digit   = (int) $cardToArr[$position - 1];
            $doubled = $digit * 2;

            $cardTotal += ($position % 2 !== 0)
                ? ($doubled > 9 ? $doubled - 9 : $doubled)
                : $digit;
        }

        return $cardTotal % 10 === 0;
    }
}
