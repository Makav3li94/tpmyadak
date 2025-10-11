<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
class MeliCodeValidator implements ValidationRule
{

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^[0-9]{10}$/', $value)) {
            $fail("کد ملی معتبر نیست.");
        }
        for ($i = 0; $i < 10; $i++) {
            if ($value == str_repeat($i, 10)) {
                $fail("کد ملی معتبر نیست.");
            }
        }
        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += ((10 - $i) * intval(substr($value, $i, 1)));
        }
        $ret = $sum % 11;
        $parity = intval(substr($value, 9, 1));
        if (($ret >= 2 || $ret != $parity) && ($ret < 2 || $ret != 11 - $parity)) {
            $fail("کد ملی معتبر نیست.");
        }
    }
}
