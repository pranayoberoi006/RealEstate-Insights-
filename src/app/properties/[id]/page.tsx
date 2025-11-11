import Image from 'next/image';
import { notFound } from 'next/navigation';
import { properties } from '@/lib/dummy-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === property.imageId);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          {image && (
            <Image
              src={image.imageUrl}
              alt={property.name}
              width={800}
              height={600}
              className="rounded-lg shadow-lg object-cover w-full aspect-[4/3]"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
              {property.name}
            </h1>
            <p className="text-xl text-muted-foreground">{property.location}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(property.price)}
            </p>
            <Badge variant="secondary" className="text-base">{property.category}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Bedrooms:</p>
              <p>{property.bedrooms}</p>
            </div>
            <div>
              <p className="font-semibold">Area:</p>
              <p>{property.area} sq ft</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline text-2xl font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <Button size="lg">Contact Agent</Button>
        </div>
      </div>
    </div>
  );
}
