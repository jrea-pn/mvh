import { Container } from "./";

// Config
const placeholderImage = {
  src: "/images/default-placeholder.webp",
  alt: "Image coming soon",
};

const Products = ({ products, total, loading }) => {
  const totalText = `(${total} product${total != 1 ? "s" : ""})`;
  return (
    <section aria-labelledby="products-heading">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="text-sm text-gray-400 mb-4 mt-1">{totalText}</div>
        <ProductGrid products={products} loading={loading} />
      </Container>
    </section>
  );
};

export default Products;

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return "...loading";
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { id, code, description, brand, packaging, printed, stock } = product;
  return (
    <a key={id} href={"#"} className="group flex flex-col">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={placeholderImage.src}
          alt={placeholderImage.alt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>

      <div className="flex flex-col h-full justify-between">
        <h3 className="mt-4 text-[1rem] text-gray-900 leading-snug md:leading-normal">
          {description}
        </h3>
        <div className="text-gray-500 mt-2">
          <div className="text-sm leading-snug">{brand}</div>
          <div className="text-sm leading-snug">
            {printed == "Yes" ? "Printed" : ""} {packaging}
          </div>
          <div className="text-sm leading-snug">{stock}</div>
          <div className="text-sm leading-snug">{code}</div>
        </div>
      </div>
    </a>
  );
};
