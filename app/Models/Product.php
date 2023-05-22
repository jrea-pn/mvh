<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
  protected $table = 'products';
  public $timestamps = false;
  protected $primaryKey = 'id';

  public function productType()
  {
    return $this->belongsTo(ProductType::class, 'type_id');
  }

  protected function stock(): Attribute
  {
    return new Attribute(
      get: fn(int $value) => ($value > 0) ? 'In Stock' : 'Out of Stock'
    );
  }

}
