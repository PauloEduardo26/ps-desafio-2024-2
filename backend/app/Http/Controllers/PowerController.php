<?php

namespace App\Http\Controllers;

use App\Models\Power;
use App\Http\Requests\StorePowerRequest;
use App\Http\Requests\UpdatePowerRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class PowerController extends Controller
{
    protected $power;
    public function __construct(Power $power) //Metodo construtor
    {
        $this->power = $power;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $power = $this->power->with('mutants')->get();

        return response()->json($power, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePowerRequest $request): JsonResponse
    {
        dd($request);//retorna oque é o request, pode ser usado com $data ou qualquer outra coisa
        $data = $request->validated();
        $power = $this->power->create($data);

        return response()->json($power, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $power = $this->power->findOrFail($id);

        return response()->json($power, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePowerRequest $request, $id): JsonResponse
    {
        $data = $request->validated();
        $power = $this->power->findOrFail($id);
        $power->update($data);

        return response()->json($power, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $power = $this->power->findOrFail($id);
        $power->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
