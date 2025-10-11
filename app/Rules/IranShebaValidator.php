<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class IranShebaValidator implements ValidationRule
{

    private const IRAN_IBAN_CODE = '1827'; // (IR = 1827)

    /**
     * Create a new rule instance.
     */
    public function __construct(
        protected bool $withPrefix = true,
        protected ?string $separator = null,
        protected bool $convertPersianNumbers = false
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = Helper::globalConvertPersianNumbers($value, $this->convertPersianNumbers);

        $separator = '';
        $failMessage = 'ir_iban';

        if ($this->separator) {
            $separator = separator($this->separator, 'space');
            $failMessage = 'ir_iban_with_separator';
        }

        $extendPattern = "[0-9]{2}{$separator}([0-9]{4}){$separator}([0-9]{4}){$separator}([0-9]{4}){$separator}([0-9]{4}){$separator}([0-9]{4}){$separator}[0-9]{2}";
        $pattern = $this->withPrefix
            ? "IR{$extendPattern}"
            : $extendPattern;

        if (! preg_match("/^{$pattern}$/", $value) ||
            ! $this->isValidIban(preg_replace("/{$separator}/", '', $value))
        ) {
            $fail("شماره شبا معتبر نیست.");
        }
    }

    /**
     * Check if Sheba number is valid using verify IBAN check digits using MOD-97 algorithm.
     *
     * Formula: [CC][CD][BBAN] => Country Code, Check Digits, Basic Bank Account Number
     */
    protected function isValidIban(string $value): bool
    {
        $checkDigits = substr($value, 2, 2);
        $bban = substr($value, 4);

        if (! str_starts_with($value, 'IR')) {
            $checkDigits = substr($value, 0, 2);
            $bban = substr($value, 2);
        }

        // Move country code and check digits to end
        $iban = $bban . self::IRAN_IBAN_CODE . $checkDigits;

        // Split into chunks and calculate mod-97
        $chunks = str_split($iban, 7);
        $remainder = 0;

        foreach ($chunks as $chunk) {
            $remainder = (int) ($remainder . $chunk) % 97;
        }

        return $remainder === 1;
    }
}
