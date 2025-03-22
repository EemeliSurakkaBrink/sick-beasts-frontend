/**
 * Products listing page showing all available t-shirt designs
 */
import MainLayout from "@/components/layout/main-layout";
import ProductCard from "@/components/product/product-card";

// Mock product data (will be fetched from API in final implementation)
const products = [
  {
    id: 1,
    name: "Toxic Waste",
    description: "Dark humor meets environmental awareness.",
    price: 29.99,
  },
  {
    id: 2,
    name: "Skate or Die",
    description: "Classic skate slogan with a modern twist.",
    price: 29.99,
  },
  {
    id: 3,
    name: "Recycle Your Politicians",
    description: "A satirical take on political waste.",
    price: 32.99,
  },
  {
    id: 4,
    name: "404: Planet Not Found",
    description: "Tech humor with an environmental message.",
    price: 29.99,
  },
  {
    id: 5,
    name: "Apocalypse Skater",
    description: "Ride through the end times in style.",
    price: 29.99,
  },
  {
    id: 6,
    name: "Plastic Is So Last Century",
    description: "Fighting plastic pollution with humor.",
    price: 32.99,
  },
];

export default function ProductsPage() {
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
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 