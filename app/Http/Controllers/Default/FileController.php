<?php

namespace App\Http\Controllers\Default;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as Filler;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File as FileRule;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;

class FileController extends Controller
{
    public function show(string $name, string $dir = '')
    {
        $dir == '' ? $path = Storage::disk('public')->path($name) : $path = Storage::disk('public')->path($dir.'/'.$name);

        if (Storage::disk('default')->exists($name)) {
            $path = Storage::disk('default')->path($name);

            return response()->download($path, $name);
        }

        $file = File::where('hash_name', $name)->first();

        return response()->download($path, $file?->upload_name);
    }

    public function store(Request $request)
    {
        $rule = ['required', 'file', 'max:4192'];
        if ($request->filemimes != '') {
            $rule[] = FileRule::types($request->filemimes);
        }

        $request->validate([
            'file' => $rule,
        ]);

        $file = $request->file('file');

        // the `/` its mean that in disk public it will store in root folder
        $dir = $request->dir == '' ? '/' : $request->dir;
        Storage::disk('public')->put($dir, $file);
        $hash_name = $file->hashName();
        if ($request->compress == 'true') {
            $id = uniqid();
            $image_name = rtrim($dir, '/').'-'.$id.'.'.'webp';
            $manager = new ImageManager(new Driver);
            $dir == '' ? $img_path = '/app/public/' : $img_path = '/app/public/'.$dir;
            $img = Filler::get(storage_path($img_path.$hash_name));
            $manager->read($img)->resize(250, 250)->encode(new WebpEncoder(quality: 70))->save(storage_path($img_path.$image_name));
            Storage::disk('public')->delete($dir.$hash_name);
            $hash_name = $image_name;
        } else {
            $id = uniqid();
            $image_name = rtrim($dir, '/').'-'.$id.'.'.'webp';
            $manager = new ImageManager(new Driver);
            $dir == '' ? $img_path = '/app/public/' : $img_path = '/app/public/'.$dir;
            $img = Filler::get(storage_path($img_path.$hash_name));
            $manager->read($img)->encode(new WebpEncoder(quality: 70))->save(storage_path($img_path.$image_name));
            Storage::disk('public')->delete($dir.$hash_name);
            $hash_name = $image_name;
        }
        File::create([
            'upload_name' => $file->getClientOriginalName(),
            'hash_name' => $hash_name,
            'name' => $file->getClientOriginalName(),
            'type' => File::FILE,
        ]);

        return response()->json([
            'id' => Str::ulid(),
            'name_original' => $file->getClientOriginalName(),
            'name' => $hash_name,
            'url' => route('file.show', ['file' => $file->hashName()]),
        ]);
    }
}
