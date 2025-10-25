<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Review;
use App\Models\Shop\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    #[Permission('view-review')]
    public function index(Request $request)
    {
        if ($request->type == 'blog') {
            $query = Blog::find($request->model_id);
        } elseif ($request->type == 'product') {
            $query = Product::find($request->model_id);
        } else {
            abort(404);
        }
        if ($request->q) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        return inertia('admin/review/index', [
            'reviews' => $query->reviews,
        ]);
    }

    #[Permission('update-review')]
    public function update(Request $request, Review $review): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $review->update($validatedData);

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'دیدگاه ویرایش شد.']);
    }

    #[Permission('delete-review')]
    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return redirect()->back()
            ->with('message', ['type' => 'success', 'message' => 'دیدگاه حذف شد.']);
    }

    private function validateRequest(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:125',
            'review' => 'required|string|max:2000',
            'rating' => 'required|numeric|max:5|min:1',
            'approve' => 'required|boolean:',
        ]);
    }
}
