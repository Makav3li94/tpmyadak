<?php

namespace App\Http\Controllers\Admin;

use App\Attributes\Permission;
use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    #[Permission('view-blog-category')]
    public function index(Request $request): Response
    {
        $query = BlogCategory::query();
        $query->with('parent');
        if ($request->q) {
            // multi columns search
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->q}%");
            });
        }

        $query->orderBy('created_at', 'desc');

        return inertia('admin/blog-category/index', [
            'data' => $query->paginate(10),
        ]);
    }

    #[Permission('create-blog-category')]
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $this->validateRequest($request);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        BlogCategory::create($validatedData);

        return redirect()->route('admin.blog.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'دسته ساخته شد.']);
    }

    #[Permission('update-blog-category')]
    public function update(Request $request, BlogCategory $blogCategory)
    {
        $validatedData = $this->validateRequest($request);
        $validatedData ['slug'] = empty($request->slug) ? Str::slug($request->title) : Str::slug($request->slug);
        $blogCategory->update($validatedData);


        return redirect()->route('admin.blog.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'دسته به روز شد.']);
    }

    #[Permission('delete-blog-category')]
    public function destroy(BlogCategory $blogCategory): RedirectResponse
    {
        $blogCategory->delete();

        return redirect()->route('admin.blog.categories.index')
            ->with('message', ['type' => 'success', 'message' => 'Iدسته حذف شد.']);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function validateRequest(Request $request): array
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'parent_id' => 'nullable|string:',
            'status' => 'nullable|boolean',
        ]);
        return $validatedData;
    }
}
