/**
 * Products listing page showing all available t-shirt designs
 */
import MainLayout from "@/components/layout/main-layout";
import ProductCard from "@/components/product/product-card";
import { getProducts } from "@/sanity/lib/api";

export default async function ProductsPage() {
  // Fetch products from Sanity
  const products = await getProducts();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">SICK</span> DESIGNS
        </h1>
        
        <div className="my-8 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All our t-shirts are printed on-demand using eco-friendly methods and organic cotton.
            Each purchase supports our mission to reduce waste in the fashion industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.shortDescription}
              price={product.price}
              image={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 