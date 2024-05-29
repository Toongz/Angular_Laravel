<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoryController extends Controller
{
    //
    public function getCategoryById($id){
        $category = Category::find($id);
        return response()->json($category);
    }
    public function addCategory(Request $request){
        $category = new Category;
        $category->category_name = $request->category_name;
        $category->save();
        return response()->json($category);
    }
    public function deleteCategory($id){
        $category = Category::find($id);
        $category->delete();
        return response()->json();
    }
    public function getCategories(){
        $categories = Category::all();
        return response()->json($categories);
    }
    
}
