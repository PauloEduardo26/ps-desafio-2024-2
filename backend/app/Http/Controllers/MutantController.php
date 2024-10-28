<?php

namespace App\Http\Controllers;

use App\Models\Mutant;
use App\Http\Requests\StoreMutantRequest;
use App\Http\Requests\UpdateMutantRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class MutantController extends Controller
{
    private $mutant;
    public function __construct(Mutant $mutant) //Metodo construtor
    {
        $this->mutant = $mutant;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $mutant = $this->mutant->with('power')->get();

        return response()->json($mutant, Response::HTTP_OK);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMutantRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->has('file')){
            $path = $request->file('image')->store('mutants', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $mutant = $this->mutant->create($data);
        $id = $mutant->id;
        $mutant_power = $this->mutant->with('power')->findOrFail($id);

        return response()->json($mutant_power, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mutant $mutant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mutant $mutant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMutantRequest $request, Mutant $mutant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mutant $mutant)
    {
        //
    }
}
