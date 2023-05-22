<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProductType extends Model
{
  protected $table = 'product_types';
  public $timestamps = false;
  protected $primaryKey = 'id';


  /**
   * Get the products for this product type.
   */
  public function products()
  {
    return $this->hasMany(Product::class, 'type_id');
  }

}
