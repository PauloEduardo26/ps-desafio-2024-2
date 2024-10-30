<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Throwable;

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
    public function show($id): JsonResponse
    {
        $book = $this->book->with('category')->findOrFail($id);

        return response()->json($book, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $book = $this->book->with('category')->findOrFail($id);

        if($request->hasFile('image')){
            try{
                $image_name = explode('books/', $book['image']);
                Storage::disk('public')->delete('books/'.$image_name[1]);
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('books', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $book->update($data); 
        return response()->json($book, Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $book = $this->book->findOrFail($id);
        $book->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
