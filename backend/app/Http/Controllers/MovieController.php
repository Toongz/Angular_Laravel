<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Category;
use Illuminate\Support\Facades\Storage; // Thêm namespace cho Storage facade
use Illuminate\Support\Str;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $movies = Movie::all();
        return response()->json($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'category_name' => 'required|string|exists:categories,category_name',
            'title' => 'required',
            'poster' => 'required|image',
            'price' => 'nullable|numeric',
            'description' => 'required'
        ]);
        $category = Category::where('category_name',$request->category_name)->first();
        if(!$category){
            return response()->json([
                'message' => 'Không tìm thấy thể loại này'
            ],404);
        }
        if($request->hasFile('poster')){
            $poster = $request->file('poster');
            $posterName = Str::slug($request->title).'_'.time().'.'.$poster->getClientOriginalExtension();
            $posterPath = $poster->storeAs('images',$posterName,'public');
        }

        $movie = new Movie();
        $movie->title = $request->title;
        $movie->poster = $posterPath;
        $movie->category_id = $category->id;
        $movie->price = $request->price;
        $movie->description = $request->description;
        $movie->save();
        return response()->json($movie);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $movie = Movie::findOrFail($id);
        return response()->json( $movie, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // $movie = Movie::findOrFail($id);

        // $request->validate([
        //     'category_name' => 'sometimes|required|string|exists:categories,category_name',
        //     'title' => 'sometimes|required',
        //     'price' => 'sometimes|nullable|numeric',
        //     'description' => 'sometimes|required',
        //     'poster' => 'sometimes|image',
        // ]);
      
        // if ($request->has('category_name')) {
        //     $category = Category::where('category_name', $request->category_name)->first();
           
        //     if (!$category) {
        //         return response()->json([
        //             'message' => 'Không tìm thấy thể loại này'
        //         ], 404);
        //     }
        //     $movie->category_id = $category->id;
        // }
    
        // if ($request->hasFile('poster')) {
        //     if ($movie->poster && Storage::disk('public')->exists($movie->poster)) {
        //         Storage::disk('public')->delete($movie->poster);
        //     }
        //     $poster = $request->file('poster');
        //     $posterName = Str::slug($request->title).'_'.time().'.'.$poster->getClientOriginalExtension();
        //     $posterPath = $poster->storeAs('images', $posterName, 'public');
        //     $movie->poster = $posterPath;
        // }
    
        // if ($request->has('title')) {
        //     $movie->title = $request->title;
        // }
    
        // if ($request->has('price')) {
        //     $movie->price = $request->price;
        // }
    
        // if ($request->has('description')) {
        //     $movie->description = $request->description;
        // }
        //$movie->save();
        $movie = Movie::findOrFail($id);
        $movie->update($request->all());
        return response()->json($movie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $movie = Movie::findOrFail($id); // Nếu không tìm thấy phim này, một lỗi 404 sẽ được ném ra tự động.

        // Xóa poster từ storage nếu có
        if ($movie->poster && Storage::disk('public')->exists($movie->poster)) {
            Storage::disk('public')->delete($movie->poster);
        }
    
        // Xóa bộ phim từ cơ sở dữ liệu
        $movie->delete();
    
        // Bạn có thể chọn trả về thông báo thành công hoặc không trả về gì cả
        return response()->json([
            'message' => 'Phim đã được xóa thành công'
        ]);
    }
}
