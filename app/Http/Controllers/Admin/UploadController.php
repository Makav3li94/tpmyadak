<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request): \Illuminate\Http\JsonResponse
    {
        $fileName=now()->timestamp.$request->file('file')->getClientOriginalName();
        $path=$request->file('file')->storeAs('tinyupload', $fileName, 'public');

//        $imageName = "post-upload-" . now()->timestamp . "." . $request->imageFile->extension();
//        Storage::disk('public')->put(
//            $imageName,
//            file_get_contents($request->imageFile)
//        );
        return response()->json(['location'=>"/storage/$path"]);

        /*$imgpath = request()->file('file')->store('uploads', 'public');
        return response()->json(['location' => "/storage/$imgpath"]);*/

    }
}
