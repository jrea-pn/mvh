const Products = ({ products, total }) => {
  return (
    <div className="w-auto">
      <div className="text-sm text-gray-400 mb-4 mt-1">{`(${total} product${
        total != 1 ? "s" : ""
      })`}</div>
      {products &&
        products.map((product) => (
          <div key={product.id} className="mb-6">
            <div className="text-xs text-gray-500 leading-none">
              {product.code}
            </div>
            <div>{product.description}</div>
            <div className="flex space-x-6 text-gray-700 mt-0">
              <div className="text-sm">{product.brand}</div>
              <div className="text-sm">
                {product.packaging} -{" "}
                {product.printed == "Yes" ? "Printed" : "Not Printed"}
              </div>
              <div className="text-sm">{product.stock}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
