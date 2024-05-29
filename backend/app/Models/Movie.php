<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title','poster','film','category_id','price','description'];
    use HasFactory;
    // Local scope
    public function scopeFilter($query, array $filters) {
        if (!empty($filters['tag'])) {
            // Lọc movie dựa trên categories liên kết.
            $query->whereHas('categories', function ($query) use ($filters) {
                $query->where('category_name', 'like', '%' . $filters['tag'] . '%');
            });
        }
    
        if (!empty($filters['search'])) {
            // Tìm kiếm trong cột title hoặc description của bảng movies.
            $query->where(function ($query) use ($filters) {
                $query->where('title', 'like', '%' . $filters['search'] . '%')
                      ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

    //     // Filter by price range
    // if (!empty($filters['price_from']) && !empty($filters['price_to'])) {
    //     $query->whereBetween('price', [$filters['price_from'], $filters['price_to']]);
    // }

    // // Filter by movies that have reviews with a certain rating
    // if (!empty($filters['rating'])) {
    //     $query->whereHas('reviews', function ($query) use ($filters) {
    //         $query->where('rating', '>=', $filters['rating']);
    //     });
    // }

    // // Filter by movies that are in the user's wishlist
    // if (!empty($filters['user_id'])) {
    //     $query->whereHas('wishlists', function ($query) use ($filters) {
    //         $query->where('user_id', $filters['user_id']);
    //     });
    // }


        // Thêm các điều kiện lọc khác ở đây nếu bạn muốn
    }
    public function categories(){
        return $this->belongsToMany(Category::class,'movie_categories');
    }
    public function accesses(){
        return $this->hasMany(MovieAccess::class);
    }
    public function transactions(){
        return $this->hasMany(Transaction::class);
    }
    public function reviews(){
        return $this->hasMany(Review::class);
    }
    public function wishlists(){
        return $this->hasMany(Wishlist::class);
    }
}
