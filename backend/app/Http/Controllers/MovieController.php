<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Category;
use Illuminate\Support\Facades\Storage; // Thêm namespace cho Storage facade
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
        {
            $movies = Movie::all();
            return response()->json($movies);
        }

    /**
     * Store a newly created resource in storage.
     */
        public function store(Request $request)
        {
            $request->validate([
                'category_name' => 'required|string|exists:categories,category_name',
                'title' => 'required|string|max:255',
                'poster' => 'required|image',
                'film' => 'nullable|mimes:mp4,ogx,oga,ogv,ogg,webm',
                'price' => 'nullable|numeric',
                'description' => 'required|string'
            ]);
    
            $category = Category::where('category_name', $request->category_name)->firstOrFail();
    
            $posterPath = $this->uploadFile($request->file('poster'), 'images', $request->title);
            $filmPath = $request->hasFile('film') 
                ? $this->uploadFile($request->file('film'), 'films', $request->title)
                : 'no_movie.mp4';
    
            $movie = new Movie();
            $movie->title = $request->title;
            $movie->poster = $posterPath;
            $movie->film = $filmPath;
            $movie->category_id = $category->id;
            $movie->price = $request->price;
            $movie->description = $request->description;
            $movie->save();
    
            return response()->json($movie, 201);
        }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::findOrFail($id);
        return response()->json($movie, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        try {
            Log::info('Request received for update: ', $request->all()); // Log dữ liệu nhận được
            $movie = Movie::findOrFail($id);

            $request->validate([
                'category_name' => 'sometimes|required|string|exists:categories,category_name',
                'title' => 'sometimes|required|string|max:255',
                'price' => 'sometimes|nullable|numeric',
                'description' => 'sometimes|required|string',
                'poster' => 'sometimes|image',
                'film' => 'sometimes|mimes:mp4,ogx,oga,ogv,ogg,webm',
            ]);

            if ($request->has('category_name')) {
                $category = Category::where('category_name', $request->category_name)->firstOrFail();
                $movie->category_id = $category->id;
            }

            if ($request->hasFile('poster')) {
                $movie->poster = $this->uploadFile($request->file('poster'), 'images', $request->title);
            }

            if ($request->hasFile('film')) {
                $movie->film = $this->uploadFile($request->file('film'), 'films', $request->title);
            }

            $movie->fill($request->only(['title', 'price', 'description']));
            $movie->save();
            Log::info('Movie updated successfully: ', $movie->toArray()); // Log dữ liệu sau khi cập nhật

            return response()->json([
                'message' => 'Cập nhật phim thành công.',
                'movie' => $movie
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Không tìm thấy phim hoặc thể loại'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đã xảy ra lỗi khi cập nhật phim'], 500);
        }
    }
    
    private function uploadFile($file, string $folder, string $title)
    {
        $filename = Str::slug($title) . '_' . time() . '.' . $file->getClientOriginalExtension();
        return $file->storeAs($folder, $filename, 'public');
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::findOrFail($id);

        if ($movie->poster && Storage::disk('public')->exists($movie->poster)) {
            Storage::disk('public')->delete($movie->poster);
        }
        
        if ($movie->film && Storage::disk('public')->exists($movie->film) && $movie->film !== 'no_movie.mp4') {
            Storage::disk('public')->delete($movie->film);
        }

        $movie->delete();

        return response()->json([
            'message' => 'Phim đã được xóa thành công'
        ], 200);
    }

    public function filter(Request $request){
        $filters = $request->only(['tag', 'search']);
        $movies = Movie::latest()->filter($filters)->get();

        return response()->json([
            'movies' => $movies
        ], 200);
    }
    public function getFreeMovies(Request $request)
    {
        $freeMovies = Movie::where('price', 0)->orWhereNull('price')->paginate(4);  
        return response()->json($freeMovies);
    }

    public function getPaidMovies(Request $request)
    {
        $paidMovies = Movie::where('price', '>', 0)->paginate(4);
        return response()->json($paidMovies);
    }
    
}
