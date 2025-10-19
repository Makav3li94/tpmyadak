<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\SendPassSms;
use App\Jobs\SendRegSms;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function phoneStat(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|regex:/(09)[0-9]{9}/|digits:11|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['errs' => $validator->errors()->toArray()]);
        }
        $user = User::where('mobile', $request->mobile)->first();
        if ($user) {
            //            $pass = rand(111111, 999999);
            $pass = mt_rand(ceil(111111 / 100), floor(999999 / 100)) * 100;
            //            dispatch((new SendPassSms($request->mobile, 'fajq9tz6xx83v9a', $user->name, $pass))->onQueue('high'));
            //            $user->update(['password' => Hash::make(123456)]);
            defer(fn () => dispatch((new SendPassSms($request->mobile, 'fajq9tz6xx83v9a', $user->name, $pass))->onQueue('high')));
            defer(fn () => $user->update(['password' => Hash::make($pass)]));

            return response()->json(['user' => 'True', 'statusMessage' => 'رمز یکبار مصرف جدید به گوشی شما ارسال شد.']);
        } else {
            $sms_active = Setting::where('key', 'sms_active')->first();
            $code = 0000;
            if ($sms_active->value == 'yes') {
                //                $code = rand(1111, 9999);
                $code = mt_rand(ceil(1111 / 10), floor(9999 / 10)) * 10;
                //                dispatch((new SendRegSms($request->mobile, '8s60hmgv5tahnlq', $code))->onQueue('high'));
                defer(fn () => dispatch((new SendRegSms($request->mobile, '33j778pu228bj4t', (int) $code))->onQueue('high')));
                //                dispatch((new SendRegSms($request->mobile, '33j778pu228bj4t', (int)$code))->onQueue('high'));
            }
            $code = $code * 1363 + (((int) $request->mobile * 100) / 2);
            if (session()->exists($request->mobile)) {
                session()->forget($request->mobile);
            }
            session()->put($request->mobile, $code);

            return response()->json(['user' => 'False', 'code' => $code, 'mobile' => $request->mobile, 'sms_active' => $sms_active->value]);
        }
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('user/auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $code = session($request->mobile);
        $rqode = ((int) $code - (((int) $request->mobile * 100) / 2)) / 1363;
        if ($request->code != (int) $rqode) {
            return response()->json(['errs' => ['code' => 'کد درست وارد کنید.']]);
        }

        $valid = [
            'name' => 'required|string|max:255',
            'email'=>'required|email'
        ];
        if ($request->isKharej) {
            $valid['mobile'] = 'required|string|unique:users';
        } else {
            $valid['mobile'] = 'required|regex:/(09)[0-9]{9}/|digits:11|numeric|unique:users';
        }
        if ($request->is_page) {
            $valid['email'] = 'nullable|email|unique:users';
        }
        $validator = Validator::make($request->all(), $valid);
        if ($validator->fails()) {
            return response()->json(['errs' => $validator->errors()->toArray()]);
        }
        $user = User::create([
            'name' => $request->name,
            'mobile' => $request->mobile ?? null,
            'email' => $request->email ?? null,
            'familiarity_id' => $request->familiarity_id ?? null,
//            'ref_id' => $request->ref_id ? (($request->ref_id - 73) / 1000) : 0,
            //            'password' => Hash::make($request->password),
            'password' => Hash::make(rand(111111, 999999)),
            'status' => 'active',
//            'is_kharej' => $request->isKharej ? '1' : '0',
            //            'code' => $code,
        ]);
        defer(fn () => notifyAdmin($user->id, $user->name, $user->mobile, 'register', $user->id, 1, 'کاربر جدید ثبت نام کرد'));
//        defer(fn () => notifyUser($user->id, 'profile', $user->id, 0, 'جهت خرید محصول لطفا اطلاعات پروفایل رو کامل کنید.'));
//        defer(fn () => notifyUser($user->id, 'register', $user->id, 0, 'کاربر عزیز به کادویاب خوش امدید.'));
        Auth::login($user, true);
        if ($request->is_page) {
            return redirect()->route('user.dashboard')->with('message', 'ثبت نام موفق');

        } else {
            return back()->with('message', 'ثبت نام موفق');

        }

    }
}
