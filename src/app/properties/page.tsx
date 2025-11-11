import { PropertyCard } from '@/components/PropertyCard';
import { properties } from '@/lib/dummy-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PropertiesPage() {
  const propertiesWithImages = properties.filter(p => 
    PlaceHolderImages.some(img => img.id === p.imageId)
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          All Properties
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Explore our full range of available properties.
        </p>
      </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {propertiesWithImages.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
