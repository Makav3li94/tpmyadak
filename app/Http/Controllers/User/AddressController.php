<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop\Address;
use App\Rules\IranMobileValidator;
use App\Rules\IranPhoneValidator;
use App\Rules\IranPostalCodeValidator;
use App\Rules\MeliCodeValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $addresses = Address::where('user_id', $user->id)->get();

        return inertia('user/address/index', [
                'addresses' => $addresses,
                'user' => $user,
            ]
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateRequest($request);
        $validatedData['user_id'] = auth()->id();
        Address::create($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس ساخته شد.']);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {

        $validatedData = $this->validateRequest($request);
        $validatedData['user_id'] = auth()->id();
        $address->update($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس ویرایش شد.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address): RedirectResponse
    {
        $address->delete();

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:100',
            'postal_code' => ['required', new IranPostalCodeValidator],
            'm_code' => ['required', new MeliCodeValidator],
            'mobile' => ['required', new IranMobileValidator],
            'phone' => ['required', new IranPhoneValidator],
            'address' => 'required|string|max:1000',
        ]);
    }
}
