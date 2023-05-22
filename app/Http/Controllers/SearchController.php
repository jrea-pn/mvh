<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $input = $request->all();

    $brand = $input['filters']['Brand'] ?? [
      "Meadow Vale",
      "Homestyle"
    ];
    $packaging = $input['filters']['Packaging'] ?? [
      "Box",
      "Bag"
    ];
    $printed = $input['filters']['Printed'] ?? [
      "Yes",
      "No"
    ];
    $stock = $input['filters']['Stock'] ?? [
      "In Stock",
      "Out of Stock"
    ];

    $products = Product::with('productType')->get()
      ->whereIn('productType.brand', $brand)
      ->whereIn('productType.packaging', $packaging)
      ->whereIn('productType.printed', $printed)
      ->whereIn('stock', $stock)
    ;

    $filters['brand'] = DB::table('products')
      ->join('product_types', 'products.type_id', '=', 'product_types.id')
      ->select(DB::raw('"Brand" filter, brand value, count(brand) count'))
      ->whereIn('products.id', $products->pluck('id'))
      ->groupBy('brand')
    ;
    $filters['packaging'] = DB::table('products')
      ->join('product_types', 'products.type_id', '=', 'product_types.id')
      ->select(DB::raw('"Packaging" filter, packaging value, count(packaging) count'))
      ->whereIn('products.id', $products->pluck('id'))
      ->groupBy('packaging')
    ;
    $filters['printed'] = DB::table('products')
      ->join('product_types', 'products.type_id', '=', 'product_types.id')
      ->select(DB::raw('"Printed" filter, printed value, count(printed) count'))
      ->whereIn('products.id', $products->pluck('id'))
      ->groupBy('printed')
    ;
    $filters['inStock'] = DB::table('products')
      ->select(DB::raw('"Stock" filter, "In Stock" value, count(stock) count'))
      ->whereIn('products.id', $products->pluck('id'))
      ->where('stock', '>', '0')
    ;
    $filters['outOfStock'] = DB::table('products')
      ->select(DB::raw('"Stock" filter, "Out of Stock" value, count(stock) count'))
      ->whereIn('products.id', $products->pluck('id'))
      ->where('stock', '=', '0')
    ;

    $filters = $filters['brand']
      ->union($filters['packaging'])
      ->union($filters['printed'])
      ->union($filters['inStock'])
      ->union($filters['outOfStock']);

    $products = $products->map(function ($product) {
      return [
        'id' => $product->id,
        'description' => $product->description,
        'code' => $product->code,
        'stock' => $product->stock,
        'packaging' => $product->productType->packaging,
        'printed' => $product->productType->printed,
        'brand' => $product->productType->brand
      ];
    });

    return ['filters' => $filters->get(), 'hits' => $products, 'count' => $products->count()];

  }
}
