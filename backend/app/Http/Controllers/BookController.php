<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BookController extends Controller
{
    private $book;
    public function __construct(Book $book)
    {
        $this->book = $book;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $book = $this->book->with('category')->get();

        return response()->json($book, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->has('file')){
            $path = $request->file('image')->store('books', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $book = $this->book->create($data);
        $id = $book->id;
        $book_category = $this->book->with('category')->findOrFail($id);

        return response()->json($book_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }
}
