<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $productsPerPage = 25;

    // return Product::with('productType')->paginate($productsPerPage);
    // return ProductResource::collection(Product::with('productType')->paginate($productsPerPage));
    return new ProductCollection(Product::with('productType')->paginate($productsPerPage));



  }
}
