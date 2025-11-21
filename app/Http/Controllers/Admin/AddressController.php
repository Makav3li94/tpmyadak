<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
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
    #[Permission('create-user')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        Address::create($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس ساخته شد.']);
    }

    #[Permission('update-user')]
    public function update(Request $request, Address $address): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $address->update($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس ویرایش شد.']);
    }

    #[Permission('delete-user')]
    public function destroy(Address $address): RedirectResponse
    {
        $address->delete();

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'آدرس حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'user_id' => 'required|ulid',
            'name' => 'required|string|max:100',
            'postal_code' => ['required', new IranPostalCodeValidator],
            'm_code' => ['required', new MeliCodeValidator],
            'mobile' => ['required', new IranMobileValidator],
            'phone' => ['required', new IranPhoneValidator],
            'address' => 'required|string|max:1000',
        ]);
    }
}
