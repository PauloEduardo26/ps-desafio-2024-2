<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    protected $category;
    public function __construct(Category $category)
    {
        $this->category = $category;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $category = $this->category->with('books')->get();
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $category = $this->category->create($data);
        $id = $category->id;
        $category_book = $this->category->with('books')->findOrFail($id);
        
        return response()->json($category_book, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $category = $this->category->findOrFail($id);
        $category->update($data);

        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        $category->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
